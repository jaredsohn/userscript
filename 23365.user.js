﻿// ==UserScript==
// @name           ReblogCommand
// @namespace      http://white.s151.xrea.com/
// @include        http://*
// @include        https://*
// @exclude        http://www.tumblr.com/share
// ==/UserScript==

(function() {

	const ALLOW_OWN_DOMAIN = true;

var boot = function() {
	var $X = window.Minibuffer.$X;
	var D  = window.Minibuffer.D;
	var createDocumentFromString  = window.Minibuffer.createDocumentFromString;

// ----------------------------------------------------------------------------
// Reblog
// ----------------------------------------------------------------------------

	function isTumblrDashboardURL(url) {
		return url.match("^http://www\\.tumblr\\.com/dashboard") ? true : false;
	}

	function isTumblrUserURL(url) {
		return url.match("^https?://[^.]+\\.tumblr\\.com/post/(\\d+)") ||
			// tumblr allow to use own domain. but this is risky.
			// $X('id("tumblr_controls")[self::iframe]', Boolean)
			(ALLOW_OWN_DOMAIN && url.match("^https?://[^/]+/post/(\\d+)")) ? true : false;
	}

	function isLdrOrFldrURL(url) {
		return url.indexOf('http://reader.livedoor.com/reader/') == 0 ||
		       url.indexOf('http://reader.livedoor.com/public/') == 0 ||
		       url.indexOf('http://fastladder.com/reader/') == 0 ||
		       url.indexOf('http://fastladder.com/public/') == 0;
	}

	function getIDByPermalink(url) {
		if (isTumblrUserURL(url)) {
			return RegExp.$1;
		}
		// return what ?
		return false;
	}

	function getURLByID(id, token) {
		if (token) return "http://www.tumblr.com/reblog/" + id + "/" + token + "?redirect_to=/dashboard";
		return "http://www.tumblr.com/reblog/" + id;
	}

	// copy from tombloo
	function unescapeHTML(s) {
		return s.replace(/&quot;/g, '"')
		        .replace(/&lt;/g, '<')
		        .replace(/&gt;/g, '>')
		        .replace(/&amp;/g, '&');
}

	// copy from tombloo
	function getReblogToken(url) {
		url = unescapeHTML(url);
		if (/&pid=([^&]*)&rk=([^&"]*)/.test(url) || /\/reblog\/([^\/]+)\/([^?]*)/.test(url))
			return {
				id    : RegExp.$1,
				token : RegExp.$2
			};
	}

	function parseParams(doc) {
		var elms = $X('id("edit_post")//*[name()="INPUT" or name()="TEXTAREA" or name()="SELECT"]', doc);
		var params = {};
		elms.forEach(function(elm) {
			params[elm.name] = elm.value;
		});
		return params;
	}

	function createPostData(params) {
		var arr = [];
		for (var param in params) {
		if (param != "preview_post" && param != "send_to_twitter") {
				arr.push(encodeURIComponent(param));
				arr.push("=");
				arr.push(encodeURIComponent(params[param]));
				arr.push("&");
			}
		}
		return arr.join('');
	}

	function reblog(aURL) {
		var id = getIDByPermalink(aURL);
		var d;
		with (D()) {
			d = Deferred();
			if (!id) {
				wait(0).next(function() { d.call(); });
				return d;
			}
		}
		window.Minibuffer.status('ReblogCommand'+id, 'Reblog ...');
		d = D();
		var url = aURL;
		d.xhttp.get(url).
		next(function(res) {
			var token = getReblogToken(res.responseText.match('iframe src="((?:\\"|[^"])*)"')[1]);
			url = getURLByID(token.id, token.token);
			return d.xhttp.get(url);
		}).
		next(function(res) {
			return d.xhttp.post(url, createPostData( parseParams( createDocumentFromString(res.responseText))));
		}).
		next(function() { window.Minibuffer.status('ReblogCommand'+id, 'Reblog ... done.', 100); d.call()}).
		error(function() {
			if (confirm('reblog manually ? \n' + url)) reblogManually(url);
			d.call();
		});
		return d;
	}

	function reblogManually(aURL) {
		var url = aURL;
		var d = D();
		d.xhttp.get(url).
		next(function(res) {
			var token = getReblogToken(res.responseText.match('iframe src="((?:\\"|[^"])*)"')[1]);
			url = getURLByID(token.id, token.token);
			GM_openInTab(url);
		});
	}

	function spClearPins(url) {
		unsafeWindow.pin.remove(url);
	}

// ----------------------------------------------------------------------------
// Command
// ----------------------------------------------------------------------------

	function getTargetCommand() {
		var target_cmd = '';
		if (isLdrOrFldrURL(window.location.href)) {
			target_cmd = 'pinned-or-current-link';
		} else if (isTumblrUserURL(window.location.href)) {
			target_cmd = 'location';
		} else if (window.LDRize) {
			target_cmd = 'pinned-or-current-link';
		} else {
			target_cmd = 'location';
		}
		return target_cmd;
	}

	window.Minibuffer.addShortcutkey({
		key: 't',
		description: 'Reblog',
		command: function() {
			var target_cmd = getTargetCommand();
			var clear_pin  = '';
			if (isLdrOrFldrURL(window.location.href)) {
				if (!window.Minibuffer.execute('pinned-or-current-link').filter(isTumblrUserURL).length) {
					target_cmd = 'current-link';
					clear_pin = '';
				} else {
					clear_pin = '-c';
				}
			} else {
				clear_pin = (target_cmd == 'pinned-or-current-link') ? ' | clear-pin' : '';
			}
			window.Minibuffer.execute(target_cmd + ' | reblog ' + clear_pin);
		}});

	window.Minibuffer.addShortcutkey({
		key: 'T',
		description: 'Reblog manually',
		command: function() {
			var target_cmd = getTargetCommand();
			var clear_pin = (target_cmd == 'pinned-or-current-link') ? ' | clear-pin' : '';
			window.Minibuffer.execute(target_cmd + ' | reblog -m' + clear_pin );
		}});

	window.Minibuffer.addCommand({
		name: 'reblog',
		command: function(stdin) {
			var args = this.args;
			var urls = [];
			if (!stdin.length) {
				if (isTumblrDashboardURL(window.location.href.toString())) {
					var link = window.Minibuffer.execute('current-link');
					if (link) urls = [link.toString()];
				} else {
					// command line is just 'reblog'
					urls = [window.location.href];
				}
			} else if (isLdrOrFldrURL(window.location.href)) {
				var tmp = [];
				stdin.forEach(function(url, index) { tmp[index] = url; });
				urls = tmp;
			} else if (stdin.every(function(a) { return typeof a == 'string' })) {
				// command line is 'location | reblog'
				urls = stdin;
			} else if (stdin.every(function(a) { return a && a.nodeName == 'A'; })) {
				// command line is 'pinned-or-current-link | reblog'
				urls = stdin.map(function(node) { return node.href; });
			}

			// reblog
			if (args.length == 1 && args[0] == '-m') {
				urls.forEach(reblogManually);
			} else {
				urls = urls.filter(isTumblrUserURL);
				if (isLdrOrFldrURL(window.location.href) && args.length == 1 && args[0] == '-c') {
					urls.forEach(spClearPins);
				}
				if (!urls.length) return stdin;
				var lst = urls.map(reblog);
				if (lst.length > 1) {
					with (D()) {
						parallel(lst).wait(2).
						next(function() { window.Minibuffer.status('ReblogCommand','Everything is OK', 1000); });
					}
				}
			}
			return stdin;
		}
	});
};
	if (document.body.id == 'tinymce')
		return;

	if (window.Minibuffer) {
		boot();
	} else {
		window.addEventListener('GM_MinibufferLoaded', boot, false);
	}

})();
