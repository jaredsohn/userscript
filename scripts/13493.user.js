// Licence:		GPL2+
// ==UserScript==
// @name		delisub
// @namespace		http://del.icio.us/Tobu
// @description		Quickly subscribe and unsubscribe del.icio.us tags
// @include		http://delicious.com/*/*
// @version		1.1.1
// ==/UserScript==

// TODO:
// * Check whether the subscription exists
// * Implement a GM_setValue cache for the above
// * Refresh said cache (use an iframe to fake a visit to /inbox?)
// * Cherry-pick other's subscriptions
// * Handle subscription-removal crumb
// * Refresh "via" and "unsub" for delicious.com 2.0, flickr edition :(


(function(){


// Common

function $x(xpath, from)
{
    var nodes = [];
    var result = document.evaluate(xpath, from||document, null,
		    XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    for (var item = result.iterateNext(); item; item = result.iterateNext())
	    nodes.push(item);
    return nodes;
}


// Vars and utilities, del.icio.us specific

const blacklist = ['for', 'inbox', 'network', 'popular', 'search',
	'subscriptions', 'tag', 'tags', 'url', 'check',
	'rss', 'doc', 'feeds', 'help', 'login', 'logout'];

var me = '';
var crumb_sub_add = '';
var crumb_sub_del = '';

function subscribe_url() {
	return 'https://secure.delicious.com/settings/subscriptions/add';
}

function browse_subs_url() {
	return 'http://delicious.com/subscriptions/' + encodeURIComponent(me);
}

function message(msg) {
	document.getElementById('delisub-el').textContent = msg;
}

function ensure_crumbs() {
	if (GM_getValue('crumb_owner') == me) {
		crumb_sub_add = GM_getValue('crumb_sub_add', '');
		//crumb_sub_del = GM_getValue('crumb_sub_del', '');
	} else {
		GM_xmlhttpRequest({
			'method': 'GET',
			'url': browse_subs_url(),
			'onload': browse_subs_cb,
			// message happens to still be appropriate
			'onerror': subscribe_error_cb,
		});
	}
}


// Callbacks

function subscribe_error_cb(details) {
	message('Subscription failed (code ' + details.status
		+ '): ' + details.statusText);
}

function subscribe_load_cb(details) {
	if (details.status != 200)
		return subscribe_error_cb(details);
	message('Subscribed!');
}

function subscribe_cb(evt) {
	if (crumb_sub_add == '') {
		message('Unable to get subscription auth token');
		return;
	}

	// We could use a non-ajax way: ?addsub=*%2Ftag
	// GET works on that, what can I say
	var user = evt.currentTarget.getAttribute('user');
	var tag = evt.currentTarget.getAttribute('tag');
	var encoded = '.crumb=' + encodeURIComponent(crumb_sub_add)
		+ '&from=delisub'
		+ '&subtag=' + encodeURIComponent(tag)
		+ '&subuser=' + encodeURIComponent(user);
	GM_xmlhttpRequest({
		'method': 'POST',
		'url': subscribe_url(),
		'headers': {
			'Content-type': 'application/x-www-form-urlencoded'
		},
		'data': encoded,
		'onload': subscribe_load_cb,
		'onerror': subscribe_error_cb,
	});
}

function browse_subs_cb(evt) {
	// Since this is an XHR, no DOM-mangling scripts are run.
	// crumb_sub_del would need regexes then.

	// Can't use a DOMParser since it's not well-formed.
	shim = document.createElement('div');
	shim.innerHTML = evt.responseText;
	crumb_sub_add = $x(
		'//*[@id="addSubscriptionForm"]/input[@name=".crumb"]', shim)[0]
		.getAttribute('value');
	GM_setValue('crumb_sub_add', crumb_sub_add);
	GM_setValue('crumb_owner', me);
}


// Algorithms and data structures

function makeSPPairs(subs, posts) {
	// Data structures are inadequate; a bloomfilter would be ideal

	// subs_t costs cpu, saves memory in posts_t
	var subs_t = {};
	for each (var s in subs) {
		for each (var t in s.tags) {
			if (!(t in subs_t))
				subs_t[t] = [];
			subs_t[t].push(s);
		}
	}

	var posts_t = {};
	for each (var p in posts) {
		p.tags = p.tags.filter(function(t) {
			return t in subs_t;
		});
		for each (var t in p.tags) {
			if (!(t in posts_t))
				posts_t[t] = [];
			posts_t[t].push(p);
		}
	}

	// Now we make the post-sub link
	subs = subs.filter(function(s) {
		if (!s.tags.every(function(t) {
			return t in posts_t;
		})) {
			return false;
		}

		var tags = [].concat(s.tags); // clone
		var sp = posts_t[tags.pop()];
		while (tags.length > 0) {
			var t0 = tags.pop();
			sp = sp.filter(function(p) {
				return p.tags.indexOf(t0) >= 0;
			});
			if (sp.length == 0)
				return false;
		}
		if (s.user) {
			sp = sp.filter(function(p) {
				return p.user == s.user;
			});
			if (sp.length == 0)
				return false;
		}
		for each (var p in sp) {
			if (!('subs' in p))
				p.subs = [];
			p.subs.push(s);
		}
		s.posts = sp;
		return true;
	});

	// Unnecessary as every post is there for a reason
	posts = posts.filter(function(p) {
		return 'subs' in p;
	});

	return [subs, posts];
}


// Page enhancers

function enhanceTagPage(p) {
	if (p.length != 2)
		return;

	var user = p[0];
	var tag = p[1];

	if (user == 'tag' || user == 'popular' || user == me)
		user = '';

	if (blacklist.some(function(b) { return b == user; }))
		return;

	var desc = document.getElementById('actions-list');
	desc.innerHTML += '<li id="delisub-el">'
		+ '<a href="javascript://" id="delisub-subscribe">'
		+ 'Subscribe to <span id="msg-user"></span>\'s '
		+ '<strong><span id="msg-tag"></span></strong>'
		+ '</a></li>';
	document.getElementById('msg-user').textContent = user || 'everyone';
	document.getElementById('msg-tag').textContent = tag;
	a = document.getElementById('delisub-subscribe');
	a.setAttribute('user', user);
	a.setAttribute('tag', tag);
	a.addEventListener('click', subscribe_cb, false);
}

function enhanceSubsPage(p) {
	// The URL may have a "label" at the end
	// Now more consistently called subscription bundles
	if (p.length < 2 || p[0] != 'subscriptions' || p[1] != me)
		return;

	var posts = $x('//li[@class = "post"]');
	var subs = $x('//div[@id = "sidebar"]//a[@title = "unsubscribe"]/..');
	posts = posts.map(function(x) {
		var user = $x('.//a[@class = "user"]', x)[0]
			.textContent.toLowerCase();
		var tags = $x('.//a[@class = "tag"]', x)
			.map(function(x) {
				return x.textContent.toLowerCase();
			});
		return { 'user': user, 'tags': tags, 'node': x, };
	});
	subs = subs.map(function(x) {
		var s = $x('.//a', x)[0].textContent.toLowerCase();
		var l = s.match(/([^/]*)\/(.*)/);
		// del.icio.us quoting rules are lossy,
		// but we could honour double-quotes here
		tags = l[2].split('+').map(decodeURIComponent);
		user = l[1] == '*' ? '' : l[1];
		return { 'user': user, 'tags': tags, 'node': x, };
	});

	var sp = makeSPPairs(subs, posts);
	subs = sp[0];
	posts = sp[1];

	for each (var p in posts) {
		var via = $x('.//div[@class = "meta"]', p.node)[0];
		var first = true;
		for each (var s in p.subs) {
			html = s.node.innerHTML.replace(/&nbsp;/g, '');
			if (first)
				via.innerHTML += ' &mdash; via ' + html;
			else
				via.innerHTML += ' and ' + html;
			first = false;
		}
	}
}


// Entry point

function enhance() {
	var c = document.cookie.match(/(^|;)\s*_user=([^;\s]*)/);
	if (! c)
		return;
	me = decodeURIComponent(c[2]).split(' ')[0];

	// del.icio.us doesn't distinguish url-encoded vs raw
	var p = document.location.pathname.split('/')
		.map(decodeURIComponent)
		.filter(function(x) { return x != ''; });

	ensure_crumbs();
	enhanceTagPage(p);
	enhanceSubsPage(p);
}

enhance();

}());

