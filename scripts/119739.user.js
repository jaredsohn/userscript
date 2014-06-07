// ==UserScript==
// @name          Tumblr Life
// @description   Extends Tumblr Dashboard
// @namespace     http://codefairy.org/ns/userscripts
// @include       http://www.tumblr.com/*
// @version       1.0 Pre 7
// @license       MIT License
// @work          Greasemonkey
// @work          GreaseKit
// @work          Google Chrome
// @work          Opera
// ==/UserScript==

(function(w, content_window, d) {


var GM_addStyle = w.GM_addStyle || function(css) {
	var style = d.createElement('style');
	style.textContent = css;
	d.getElementsByTagName('head')[0].appendChild(style);
};

var greaseKit = (
	w === content_window &&
	navigator.userAgent.indexOf('Chrome') == -1 &&
	navigator.userAgent.indexOf('Safari') != -1
);


GM_addStyle([
	'.tumblrlife-menu { display:inline; position:relative; margin-left:10px; padding-bottom:5px; }',
	'.tumblrlife-menu > a { margin-left:0 !important; }',
	'.tumblrlife-menu:hover:after { display:block; position:absolute; bottom:0; left:50%; width:0; height:0; margin-left:-5px; border-top-width:0; border-right-width:5px; border-bottom-width:5px; border-left-width:5px; border-color:#eee transparent; border-style:solid; content:""; }',
	'.tumblrlife-menu > div { display:none; position:absolute; overflow:hidden; z-index:100; width:150px; margin: 5px 0 0 -10px !important; padding:5px 0 0; font-size:12px; background-color:#eee; border-radius:3px; -webkit-box-shadow: 0 2px 2px rgba(0,0,0,0.25); box-shadow: 0 2px 2px rgba(0,0,0,0.25); }',
	'.tumblrlife-menu:hover > div { display: block; }',

	'li.post.tumblrlife-reblogging .tumblrlife-menu:hover:after, li.post.tumblrlife-reblogged .tumblrlife-menu:hover:after { display:none; }',
	'li.post.tumblrlife-reblogging .tumblrlife-menu > div, li.post.tumblrlife-reblogged .tumblrlife-menu > div { display:none; }',
	'li.post.tumblrlife-reblogging .tumblrlife-menu a { cursor:text; }',
	'li.post.tumblrlife-reblogging .tumblrlife-menu a:hover { color:#a8b1ba !important; }',

	'.tumblrlife-menu ul { margin:0 !important; padding:0; border-bottom:1px solid #d8d6d6; }',

	'.tumblrlife-menu li, .tumblrlife-menu li a { color:#777 !important; }',
	'.tumblrlife-menu li:hover, .tumblrlife-menu li a:hover { color:#7b8994 !important; }',
	'.tumblrlife-menu li { display:block; padding:5px 10px; line-height:1; }',
	'.tumblrlife-menu li a { display:block; margin:0 !important; }',
	'.tumblrlife-menu ul > li:hover { color:#7b8994; cursor:pointer; }',
	'.tumblrlife-menu ul ul { margin:0!important; padding:0;  }',
	'.tumblrlife-menu div div { padding:3px 9px 5px; background-color:#fff; border-radius:0 0 3px 3px; }',
	'.tumblrlife-menu div div input { width:132px; height:17px; padding:0; font-size:11px; color:#888; border:none; }',

	'.tumblrlife-fail { color:#c00; }',

	'#tumblrlife-filter.nav_item { display:none; position:absolute; z-index:100; top:0; left:0; margin:0; padding:0; }',
	'#nav > div:hover #tumblrlife-filter { display:block; }',
	'#tumblrlife-filter li { list-style:none; font-size:16px; text-align:left; }',
	'#tumblrlife-filter li a { display:block; padding:3px 8px 2px; color:#fff; text-decoration:none; text-transform: capitalize; }',
	'html:lang(ja) #tumblrlife-filter li a { font-size:14px; }',
	'#tumblrlife-filter li a:first-child { text-transform: none; }',
	'#tumblrlife-filter li a.current, #tumblrlife-filter li a:hover { color:inherit !important; }',

	'#tumblrlife-shortcut-key-help { position:relative !important; padding-left:0 !important; }',
	'#tumblrlife-shortcut-key-help kbd { margin-right:7px; padding:0 3px; font-family:Courier,monospace; background-color:rgba(255, 255, 255, 0.1); border-radius:2px; }'
].join(''));


var tumblrLife = {
	position        : 0,
	data            : null,
	postContainer   : null,
	posts           : null,
	currentPost     : null,
	dashboard       : false,
	paginate        : false,
	setup           : setup,
	handleEvent     : handleEvent,
	getId           : getId,
	eachPost        : eachPost,
	getPosition     : getPosition,
	updatePosition  : updatePosition,
	next            : next,
	reblog          : reblog,
	like            : like,
	reblogAddToQueue: reblogAddToQueue,
	reblogPrivate   : reblogPrivate,
	reblogManually  : reblogManually,
	fixPosition     : fixPosition,
	showShortcutHelp: showShortcutHelp
};

var post_id = /post_(\d+)/,
	post_selector = 'li.post[id]:not(#new_post)',
	next_selector = '#pagination a:last-child',
	post_margin_top = 7;

function setup() {
	var post_container = this.postContainer = d.getElementById('posts');
	this.dashboard = !!post_container;

	tumblrLife.appendFilter();

	if (this.dashboard) {
		this.posts =  Array.prototype.slice.call(post_container.querySelectorAll(post_selector));
		this.paginate = d.body.className.indexOf('with_auto_paginate') != -1;

		this.eachPost(function(post) {
			tumblrLife.Menu.start(post);
		});

		d.addEventListener('keydown', this, false);
		this.showShortcutHelp();
		post_container.addEventListener('DOMNodeInserted', this, false);

		if (!this.paginate) {
			this.fixPosition();
			w.addEventListener('resize', this, false);
		}
		tumblrLife.fixPagenation.setup();
	}
}

var shortcuts = {
	/* J */ 74: 'getPosition',
	/* K */ 75: 'getPosition',
	/* R */ 82: 'reblog',
	/* A */ 65: 'like',
	/* Q */ 81: 'reblogAddToQueue',
	/* W */ 87: 'reblogPrivate',
	/* E */ 69: 'reblogManually'
};

function handleEvent(e) {
	var target = e.target;

	switch (e.type) {
	case 'resize':
		this.fixPosition();
		break;
	case 'keydown':
		var node_name = target.nodeName,
			command = shortcuts[e.which];
		if (
			command &&
			node_name != 'INPUT' && node_name != 'TEXTAREA' &&
			!e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey
		) {
			switch (command) {
			case 'getPosition':
			case 'like':
				tumblrLife[command](e);
				break;
			default:
				if (tumblrLife.currentPost.className.indexOf('tumblrlife-reblog') == -1) {
					tumblrLife[command](e);
					// tumblrLife.next();
				}
			}
		}
		break;

	case 'DOMNodeInserted':
		tumblrLife.Menu.start(target);

		target.nodeName == 'LI' && target.className.indexOf('post') != -1 && this.posts.push(target);
		break;
	}
}

function eachPost(callback) {
	var posts = this.posts;
	for (var i = 0, post; post = posts[i]; ++i) {
		if (callback(post, i) === false) {
			break;
		}
	}
}

function getId(container) {
	return (post_id.exec(container.id) || [])[1];
}

function getPosition() {
	var self = this,
		y = w.scrollY + post_margin_top,
		post,
		position = this.position;

	post = this.posts[position + 1];
	if (post && post.offsetTop == y) {
		this.updatePosition(post, position + 1);
		return;
	}
	post = this.posts[position - 1];
	if (post && post.offsetTop == y) {
		this.updatePosition(post, position - 1);
		return;
	}

	tumblrLife.eachPost(function(post, i) {
		if (post.offsetTop == y) {
			self.updatePosition(post, i);
			return false;
		}
	});
}

function updatePosition(post, i) {
	this.position = i;
	this.currentPost = post;
}

function next() {
	var post = this.posts[this.position + 1];
	if (post) {
		this.updatePosition(post, this.position + 1);

		w.scrollTo(w.pageXOffset, post.offsetTop - post_margin_top);
	}
}

function showShortcutHelp() {
	var container = d.getElementById('right_column');
	if (container) {
		var div = d.createElement('div');
		div.id = 'tumblrlife-shortcut-key-help';
		div.className = 'dashboard_nav_item';

		var li = [
			'<li><kbd>R</kbd>reblog</li>',
			'<li><kbd>A</kbd>like, unlike</li>',
			'<li><kbd>Q</kbd>add to queue</li>',
			'<li><kbd>W</kbd>private</li>',
			'<li><kbd>E</kbd>reblog manually</li>'
		];
		div.innerHTML = [
			'<div class="dashboard_nav_title">Shortcut Keys</div>',
			'<ul class="dashboard_subpages">',
			li.join(''),
			'</ul>'
		].join('');

		container.appendChild(div);
	}
}

function reblog() {
	click(this.currentPost.querySelector('a.tumblrlife-reblog'));
}

function like() {
	click(this.currentPost.querySelector('a.like_button'));
}

function reblogAddToQueue() {
	click(this.currentPost.querySelector('li.tumblrlife-reblog-add-to-queue'));
}

function reblogPrivate() {
	click(this.currentPost.querySelector('li.tumblrlife-reblog-private'));
}

function reblogManually() {
	w.open(this.currentPost.querySelector('a.tumblrlife-reblog-manually'));
}

function fixPosition() {
	var post = this.posts[this.posts.length - 1],
		body = d.body,
		height = body.offsetHeight - w.innerHeight - post.offsetTop + post_margin_top;
	if (height < 0) {
		body.style.marginBottom = height * -1 + 'px';
	}
}


tumblrLife.fixPagenation = {
	setup: fixPagenationSetup
};

var fix_pagenation_show_page = /(?:\/tumblelog\/[-\w]+)?\/show\/\w+/;

function fixPagenationSetup() {
	var path = fix_pagenation_show_page.exec(location.pathname);
	if (path) {
		var post = tumblrLife.posts[tumblrLife.posts.length - 1],
			a = d.querySelector(next_selector);
		a.href = path[0] + '?offset=' + getId(post);

		if (tumblrLife.paginate) {
			execute(function() {
				if (window.next_page) {
					var next = document.querySelector('#pagination a:last-child');
					next && (window.next_page = next.href);

					var __process_auto_paginator_response = window._process_auto_paginator_response;
					window._process_auto_paginator_response = function(transport) {
						window.history.replaceState && window.history.replaceState('auto_paginator_response', '', window.next_page);

						__process_auto_paginator_response(transport);

						var post = document.querySelector('li.post[id]:not(#new_post):last-child');
						if (post) {
							var path = /(?:\/tumblelog\/[-\w]+)?\/show\/\w+/.exec(location.href),
								id = /post_(\d+)/.exec(post.id)[1];
							window.next_page = transport.responseText.match('id="next_page_link" href="') ?
								path[0] + '?offset=' + id :
								false;
						}
					};
				}
			});
		}
	}
	else if (tumblrLife.paginate) {
		execute(function() {
			var __process_auto_paginator_response = window._process_auto_paginator_response;
			window._process_auto_paginator_response = function(transport) {
				window.history.replaceState && window.history.replaceState('auto_paginator_response', '', window.next_page);

				__process_auto_paginator_response(transport);
			};
		});
	}
}


tumblrLife.appendFilter = appendFilter;

var append_filter_filters = ['dashboard', 'text', 'photos', 'quotes', 'links', 'chats', 'audio', 'videos'],
	append_filter_current_filter = (/^\/show\/([^\/]+)/.exec(location.pathname) || [])[1] || append_filter_filters[0];

function appendFilter() {
	var container = d.querySelector('#nav');
	if (!container) {
		return;
	}

	var a = container.querySelector('a'),
		div = d.createElement('div'),
		ul = d.createElement('ul'),
		li = [],
		i = 0, filter, title;
	for (; filter = append_filter_filters[i]; ++i) {
		href = (filter == 'dashboard' ? '' : 'show/') + filter;
		klass = filter == append_filter_current_filter ? ' class="current"' : '';
		title = filter == 'dashboard' ? a.querySelector('div').innerHTML : filter;
		li[i] = '<li><a href="/' + href + '"' + klass + '>' + title + '</a></li>';
	}

	div.className = a.className;
	div.innerHTML = a.innerHTML;
	ul.id = 'tumblrlife-filter';
	ul.className = 'nav_item active';
	ul.innerHTML = li.join('');
	div.appendChild(ul);
	container.replaceChild(div, a);
}


tumblrLife.Menu = menuInitialize;
tumblrLife.Menu.start = menuStart;
tumblrLife.Menu.prototype = {
	container      : null,
	reblogContainer: null,
	menuContainer  : null,
	id             : null,
	postURL        : null,
	reblogging     : false,
	handleEvent    : menuHandleEvent,
	append         : menuAppend,
	reblog         : menuReblog,
	reblogFail     : menuReblogFail,
	query          : menuQuery
};

function menuInitialize(container) {
	this.container = container;
	this.id = tumblrLife.getId(container);

	this.append();
}

function menuStart(target) {
	if (
		target.nodeName == 'LI' &&
		target.className.indexOf('is_mine') == -1
	) {
		new tumblrLife.Menu(target);
	}
}

function menuHandleEvent(e) {
	if (e.target.nodeName == 'INPUT') {
		return;
	}
	switch (e.type) {
	case 'click':
		if (this.reblogging) {
			e.preventDefault();
		}
		else {
			var state = e.target.className.slice(18);
			if (state != 'manually') {
				e.preventDefault();
				this.reblog(state);
			}
		}
		break;
	}
}

var menu_template_menu = [
	'<ul>',
	'<li class="tumblrlife-reblog-add-to-queue">add to queue</li>',
	'<li class="tumblrlife-reblog-private">private</li>',
	'<li><a href="${href}" target="_blank" class="tumblrlife-reblog-manually">reblog manually</a></li>',
	'</ul>',
	'<div>',
	'<input type="text" value="" placeholder="tags" class="tumblrlife-tags" onkeydown="event.stopPropagation()"/>',
	'</div>'
].join('');

function menuAppend() {
	var original = this.reblogContainer = this.container.querySelector('div.post_controls > a[href*="/reblog/"]'),
		container, div;
	this.postURL = original.href;
	container = this.menuContainer = d.createElement('div');
	container.className = 'tumblrlife-menu';
	container.addEventListener('click', this, false);

	div = d.createElement('div');
	div.innerHTML = template(menu_template_menu, {
		href: this.postURL
	});

	container.appendChild(div);
	original.parentNode.insertBefore(container, original);
	container.insertBefore(original, div);
	original.className = 'tumblrlife-reblog';
}

function menuReblog(state) {
	var self = this,
		container = this.container,
		menu_container = this.menuContainer,
		fail = function() { return self.reblogFail(); };

	if (this.reblogging) {
		return;
	}

	this.reblogging = true;
	container.className += ' tumblrlife-reblogging';
	this.reblogContainer.innerHTML = 'reblogging...';

	get(this.postURL,
		function() {
			post(self.postURL, self.query(this.responseText, state),
				function(data) {
					var id = self.id;
					self.reblogging = false;
					container.className = container.className.replace('tumblrlife-reblogging', 'tumblrlife-reblogged');
					menu_container.removeEventListener('click', self, false);
					menu_container.innerHTML = 'reblogged' + (state ? {
						'add-to-queue': ' (queue)',
						'private'     : ' (private)'
					}[state] : '');

					execute('window.increment_note_count(' + id + ')');

					if (!state) {
						get('/dashboard', function() {
							var container = createDocumentFromString(this.responseText)
								.querySelector('div.post_info > a[href*="/post/' + id + '"]')
								.parentNode.parentNode;

							menu_container.innerHTML = '<a href="' + container.querySelector('a.permalink').href + '" target="_blank">reblogged</a>';
						});
					}
				},
				fail
			);
		},
		fail
	);
}

function menuReblogFail() {
	this.reblogging = false;
	this.container.className = this.container.className.replace(' tumblrlife-reblogging', '');
	this.reblogContainer.innerHTML = '<span class="tumblrlife-fail">reblog</span>';
	if (confirm('Reblog failed. Open the reblog page?')) {
		w.open(this.postURL);
	}
}

function menuQuery(html, state) {
	var options, queries = {}, i, o;

	options = createDocumentFromString(html).querySelectorAll('#edit_post input, #edit_post textarea, #edit_post select');
	for (i = 0; o = options[i]; ++i) {
		if (o.type) {
			switch (o.type.toLowerCase()) {
			case 'checkbox':
			case 'radio':
				o.checked && (queries[o.name] = o.value);
				break;
			default:
				queries[o.name] = o.value;
			}
		}
	}

	queries['post[state]'] = {
		'add-to-queue': '2',
		'private'     : 'private'
	}[state] || '0';

	queries['post[tags]'] = this.menuContainer.querySelector('input.tumblrlife-tags').value;
	delete queries['preview_post'];

	trimReblogInfo(queries);

	return queries;
}


// https://github.com/to/tombloo/blob/master/xpi/chrome/content/library/20_Tumblr.js
function trimReblogInfo(queries) {
	function trimQuote(entry) {
		entry = entry.replace(/<p><\/p>/g, '').replace(/<p><a[^<]+<\/a>:<\/p>/g, '');
		entry = (function loop(_, contents) {
			return contents.replace(/<blockquote>(([\n\r]|.)+)<\/blockquote>/gm, loop);
		})(null, entry);
		return entry.trim();
	}

	switch (queries['post[type]']) {
	case 'link':
		queries['post[three]'] = trimQuote(queries['post[three]']);
		break;
	case 'regular':
	case 'photo':
	case 'video':
		queries['post[two]'] = trimQuote(queries['post[two]']);
		break;
	case 'quote':
		queries['post[two]'] = queries['post[two]'].replace(/ \(via <a.*?<\/a>\)/g, '').trim();
		break;
	}
}

var template_variable = /\$\{([^\}]+)\}/g;

function template(str, data) {
	return str.replace(template_variable, function(_, v) {
		return data[v] ? data[v] : '';
	});
}

function param(data) {
	var ret = [], k, v;
	for (k in data) {
		v = data[k];
		v && ret.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
	}
	return ret.join('&');
}

function get(url, onload, onerror) {
	ajax('GET', url, null, onload, onerror);
}

function post(url, data, onload, onerror) {
	ajax('POST', url, data, onload, onerror);
}

function ajax(method, url, data, onload, onerror) {
	data = data ? param(data) : data;

	var xhr = new XMLHttpRequest;
	xhr.open(method, url, true);
	xhr.onload = onload;
	xhr.onerror = onerror;
	if (method == 'POST') {
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	}
	xhr.send(data);
}

function execute(code) {
	if (greaseKit) {
		typeof code == 'function' ?
			code() :
			eval(code);
	}
	else {
		typeof code == 'function' && (code = '(' + code.toString() + ')()');
		location.href = 'javascript:void(' + code + ')';
	}
}

function click(target) {
	if (target) {
		var e = d.createEvent('MouseEvent');
		e.initMouseEvent('click', true, true, w, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		target.dispatchEvent(e);
	}
}

// http://gist.github.com/198443
function createDocumentFromString(source){
	var doc;
	if (d.implementation.createHTMLDocument) {
		doc = d.implementation.createHTMLDocument('title');
	} else {
		doc = d.cloneNode(false);
		if (doc) {
			doc.appendChild(doc.importNode(d.documentElement, false));
		} else {
			doc = d.implementation.createDocument(null, 'html', null);
		}
	}
	var range = d.createRange();
	range.selectNodeContents(d.documentElement);
	var fragment = range.createContextualFragment(source);
	var headChildNames = {title: true, meta: true, link: true, script: true, style: true, /*object: true,*/ base: true/*, isindex: true,*/};
	var child,
		head = doc.getElementsByTagName('head')[0] || doc.createElement('head'),
		body = doc.getElementsByTagName('body')[0] || doc.createElement('body');
	while ((child = fragment.firstChild)) {
		if (
			(child.nodeType === doc.ELEMENT_NODE && !(child.nodeName.toLowerCase() in headChildNames)) ||
			(child.nodeType === doc.TEXT_NODE && (/\S/.test(child.nodeValue)))
		)
			break;
		head.appendChild(child);
	}
	body.appendChild(fragment);
	doc.documentElement.appendChild(head);
	doc.documentElement.appendChild(body);
	return doc;
}


tumblrLife.setup();


})(this, this.unsafeWindow || this, document);