// ==UserScript==
// @name           TumblrTagCommand
// @namespace      http://whym.github.com
// @description    Minibuffer command for tagging Tumblr posts. Type 'p' to mark/unmark a post and type 'g' to tag. Requires Minibuffer, LDRize & Autopagerize.
// @include        http://www.tumblr.com/dashboard*
// @include        http://www.tumblr.com/show/*
// @include        http://www.tumblr.com/drafts*
// @include        http://www.tumblr.com/queue*
// @include        http://www.tumblr.com/tumblelog/*
// @include        http://*.tumblr.com/tagged/*
// @include        http://*.tumblr.com/post/*
// @include        http://*.tumblr.com/private/*
// @include        http://*.tumblr.com/search/*
// @include        http://*.tumblr.com/page/*
// @include        http://*.tumblr.com/archive/*
// @include        http://*.tumblr.com/
// @version        0.0.6
// ==/UserScript==

// most parts are copied from ReblogCommand
// http://coderepos.org/share/browser/lang/javascript/userscripts/reblogcommand.user.js

(function() {

	const KEY_TAG       = 'g';
	const KEY_TAG_ALL   = 'G';
	const COMMAND_TAG   = 'tumblr-tag-add';
	const COMMAND_POSTS = 'tumblr-posts';
	const ALLOW_OWN_DOMAIN = true;
	const REGEXP_SEPARATOR = /,/;
	const SEPARATOR = ',';

var boot = function() {
	var $X = window.Minibuffer.$X;
	var D  = window.Minibuffer.D;
	var createDocumentFromString  = window.Minibuffer.createDocumentFromString;

// ----------------------------------------------------------------------------
// Tumblr Tag
// ----------------------------------------------------------------------------

	function parseTagList(args) {
		var ret = [];
		if ( !(args instanceof Array) ) {
			args = [args];
		}
		args.forEach(function(x){
			x = (''+x).trim();
			if (x.length > 0) {
				ret = ret.concat(x.split(REGEXP_SEPARATOR).map(function(x){return x.trim();}));
			}
		});
		return ret;
	}
			  
	Array.prototype.uniq = function() {
		var ret = [];
		var result = this.reduce(function(res, item) {
			if (!res.found[item]) {
				res.values.push(item);
				res.found[item] = 1;
				ret.push(item);
			};
			return res;
		}, { values: [], found: {}});
		return ret;
	};
	Array.prototype.remove = function(x) {
		var removed = {};
		if ( x instanceof Array ) {
			x.forEach(function(x){
				removed[x] = 1;
			});
		} else {
			removed[x] = 1;
		}
		return this.filter(function(item) {
			return !removed[item];
		});
	};
	if ( String.prototype.trim == undefined ) {
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/, '');
		};
	}

	function isTumblrDashboardURL(url) {
		return url.match("^http://www\\.tumblr\\.com/dashboard") ? true : false;
	}

	function isTumblrUserURL(url) {
		return url.match("^https?://[^.]+\\.tumblr\\.com/(post|private)/(\\d+)") ||
			// tumblr allow to use own domain. but this is risky.
			// $X('id("tumblr_controls")[self::iframe]', Boolean)
			(ALLOW_OWN_DOMAIN && url.match("^https?://[^/]+/(post|private)/(\\d+)")) ? true : false;
	}
	
	function getIDByPermalink(url) {
		if (isTumblrUserURL(url)) {
			return RegExp.$2;
		}
		// return what ?
		return false;
	}

	function getURLByID(id, token) {
		return "http://www.tumblr.com/edit/" + id + "?redirect_to=/dashboard";
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
		if (/&pid=([^&]*)&rk=([^&\"]*)/.test(url) || /\/reblog\/([^\/]+)\/([^?]*)/.test(url))
			return {
				id    : RegExp.$1,
				token : RegExp.$2
			};
	}

	function parseParams(doc) {
		// name() returns in lower case on fx3.6
		var elms = $X('id("edit_post")//*[translate(name(),"input", "INPUT") ="INPUT" or translate(name(),"textarea", "TEXTAREA")="TEXTAREA" or translate(name(),"select", "SELECT")="SELECT"]', doc);
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

	function edittags(aURL, appends, removes) {
		var id = getIDByPermalink(aURL);
		var d;
		with (D()) {
			d = Deferred();
			if (!id) {
				wait(0).next(function() { d.call(); });
				return d;
			}
		}
		var message = '';
		if (appends.length > 0) {
			message += 'Adding '+appends.join(SEPARATOR);
		}
		if (removes.length > 0) {
			message += (message.length > 0 ? ', removing ': 'Removing ')+removes.join(SEPARATOR);
		}
		window.Minibuffer.status(COMMAND_TAG+id, message+' ...');
		d = D();
		var url = aURL;
		var editd = d.xhttp.get(url).
		next(function(res) {
			var token = getReblogToken(res.responseText.match('iframe src="((?:\\"|[^"])*)"')[1]);
			url = getURLByID(token.id, token.token);
			return d.xhttp.get(url);
		}).
		next(function(res) {
			var params = parseParams(createDocumentFromString(res.responseText));
			params['post[tags]'] = parseTagList(params['post[tags]']).concat(appends).remove(removes).uniq().join(SEPARATOR);
			//if(!confirm(params['post[tags]'])){return d;}
			if (!params.form_key)
				editd.fail("invalid params");
			return d.xhttp.post(url, createPostData( params ));
		}).
		next(function(res) {
			if (res.status == 200) {
				if ( ! res.finalUrl.match( /^http:\/\/www\.tumblr\.com\/dashboard/ ) )
					editd.fail("unexpected response: " + res.finalUrl);
				else
					window.Minibuffer.status(COMMAND_TAG+id, message+' ... done.', 100);
			} else {
				window.Minibuffer.status(COMMAND_TAG+id, message+' ... error '+res.status+' .', 100);
				editd.fail(res.status + 'in adding tag');
			}
			d.call();
		}).
		error(function(res) {
			window.Minibuffer.status(COMMAND_TAG+id, message+' ... error.', 100);
			if (confirm('error: '+res+', edit manually ? \n' + url))
				editTagManually(url);
			d.call();
		});
		return d;
	}

	function editTagManually(aURL) {
		var url = aURL;
		if (url.match(/\/edit\//)) {
			GM_openInTab(url);
			return;
		}
		var d = D();
		d.xhttp.get(url).
		next(function(res) {
			var token = getReblogToken(res.responseText.match('iframe src="((?:\\"|[^"])*)"')[1]);
			url = getURLByID(token.id, token.token);
			GM_openInTab(url);
		});
	}


// ----------------------------------------------------------------------------
// Command
// ----------------------------------------------------------------------------

	function getTargetCommand() {
		var target_cmd = '';
		if (isTumblrUserURL(window.location.href)) {
	        target_cmd = 'location';
	    } else if (window.LDRize) {
	        target_cmd = 'pinned-or-current-link';
	    } else {
	        target_cmd = 'location';
	    }
	    return target_cmd;
	}
	
	window.Minibuffer.addShortcutkey({
		key: KEY_TAG,
		description: 'Tag Tumblr posts',
		command: function() {
			var target_cmd = getTargetCommand();
			var clear_pin  = (target_cmd == 'pinned-or-current-link') ? ' | clear-pin' : '';
			var tags = prompt("Input new tags and the tags to be deleted.\n(ex. To add 'picture' and remove 'pict', use 'picture,-pict'.)");
			window.Minibuffer.execute(target_cmd + ' | '+[COMMAND_TAG, tags].join(' ')+clear_pin);
		}
	});
	
	window.Minibuffer.addShortcutkey({
		key: KEY_TAG_ALL,
		description: 'Tag all Tumblr posts in screen',
		command: function() {
			var target_cmd = 'tumblr-posts';
			var tags = prompt("Input new tags and the tags to be deleted.\n(ex. To add 'picture' and remove 'pict', use 'picture,-pict'.)");
			window.Minibuffer.execute(target_cmd + ' | '+[COMMAND_TAG, tags].join(' '));
		}
	});

	window.Minibuffer.addCommand({
		name: COMMAND_POSTS,
		command: function(stdin) {
			var linkx = window.LDRize.getSiteinfo().link;
			var parax = window.LDRize.getSiteinfo().paragraph;
			var getfirst = function(x){
				return x[0] != undefined ? x[0] : x;
			};
			var items = $X(parax).map(function(i){ return getfirst($X(linkx, i));});
			return items;
		}
	});


	window.Minibuffer.addCommand({
		name: COMMAND_TAG,
		command: function(stdin) {
			var args = parseTagList(this.args.join(' '));
			var urls = [];
			if (!stdin.length) {
				if (isTumblrDashboardURL(window.location.href.toString())) {
					var link = window.Minibuffer.execute('current-link');
					if (link) urls = [link.toString()];
				} else {
					// command line is just 'tumblr-tag-add'
					urls = [window.location.href];
				}
			} else {
				urls = [];
				stdin.forEach(function(a){
					if (a && typeof a == 'string') {
						// command line is 'location | tumblr-tag-add'
						urls.push(a);
					} else if (a && a.nodeName && a.href && a.nodeName == 'A') {
						// command line is 'pinned-or-current-link | tumblr-tag-add'
						urls.push(a.href);
					} else {
						window.Minibuffer.status(COMMAND_TAG, 'Unsupported input: ' + a, 1000);
					}
				});
			}
			
			if (urls.length == 0){
				window.Minibuffer.status(COMMAND_TAG, 'no input ', 1000);
				return null;
			}
			
			// edit tags
			if (args.length >= 1) {
				var removes = [];
				var appends = [];
				args.forEach(function(x){
					if (x.charAt(0) == '-') {
						removes.push(x.substr(1));
					} else {
						if (x.charAt(0) == '+')
							x = x.substr(1);
						appends.push(x);
					}
				});
				appends = parseTagList(appends).uniq();
				removes = parseTagList(removes).uniq();
				urls = urls.filter(isTumblrUserURL);
				if (!urls.length) return stdin;
				var lst = urls.map(function(x){return edittags(x, appends, removes);});
				if (lst.length > 1) {
					with (D()) {
						parallel(lst).wait(2).
						next(function() { window.Minibuffer.status(COMMAND_TAG, 'Everything is OK', 1000); });
					}
				}
				return stdin;
			} else {
				window.Minibuffer.status(COMMAND_TAG, 'No tag is specified', 1000);
				return null;
			}
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
