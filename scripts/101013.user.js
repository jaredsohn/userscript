// ==UserScript==
// @name          Tumblr Life
// @description   Extends Tumblr dashboard: Adds quick reblog buttons, shortcut keys (requires Minibuffer and LDRize) and session bookmarks.
// @namespace     http://codefairy.org/ns/userscripts
// @include       http://www.tumblr.com/*
// @version       0.5.7
// @license       MIT License
// @work          Greasemonkey
// @work          GreaseKit
// @work          Google Chrome
// ==/UserScript==

new function() {

if (typeof unsafeWindow == 'undefined') unsafeWindow = window;


GM_addStyle([
	'.tumblr-life-item { display:inline; position:relative; margin-left:10px; padding-bottom:5px; }',
	'.tumblr-life-item > a { margin-left:0 !important; }',
	'.tumblr-life-item > ul { display:none; position:absolute; z-index:100; left:0; top:8px; margin-left:-10px !important; padding:5px 0 0; font-size:12px; background-color:#f5f5f5; border-radius:5px; -moz-border-radius:5px; }',
	'.tumblr-life-item a.tumblr-life-reblogging { cursor:text; }',
	'.tumblr-life-item a.tumblr-life-reblogging:hover { color:#a8b1ba !important; }',
	'.tumblr-life-item li { display:block; padding:5px 10px; line-height:1; }',
	'.tumblr-life-item li:first { border-top:none; }',
	'.tumblr-life-item li a { display:block; margin:0!important; }',
	'.tumblr-life-item li input { font-size:12px; }',
	'.tumblr-life-item li input[type="text"] { width:150px; font-size:11px; }',
	'.tumblr-life-item > ul > li:hover { color:#7b8994; cursor:pointer; }',
	'.tumblr-life-item ul ul { margin:5px 0 0!important; padding:5px 10px; font-size:11px; background-color:#ebebeb; border-radius:0 0 5px 5px; -moz-border-radius:0 0 5px 5px; }',
	'.tumblr-life-item ul ul li { padding:0; }',
	'.tumblr-life-item ul ul li label:hover { color:#7b8994; }',
	'.tumblr-life-item ul ul li span.tumblr-life-twitter-edit { display:none; margin-left:7px; padding:1px 6px; cursor:pointer; background-color:#fff; border:1px solid #fdfdfd; border-radius:2px; -moz-border-radius:2px; }',	
	'.tumblr-life-item ul ul li span.tumblr-life-twitter-edit:hover { color:#7b8994; }',	
	'.tumblr-life-success { margin-left:10px; color:#c0c8d3; }',
	'.tumblr-life-fail { color:#c00; }',
	'#tumblr-life-filter { display:none; position:absolute; z-index:100; top:26px; margin:0; padding:0; background-color:#1f354c; }',
	'#tumblr-life-filter li { list-style:none; font-size:16px; }',
	'#tumblr-life-filter li a { display:block; padding:3px 8px 2px; color:#fff; text-decoration:none; }',
	'#tumblr-life-filter li a.current, #tumblr-life-filter li a:hover { color:#dde7f0; }',
	'#tumblr-life-shortcut-key-help kbd { margin-right:5px; padding:0 2px; color:#2c4762; background-color:#d6dcea; border-radius:2px; }'
].join(''));


var TumblrLife = {
	version: '0.5.7',
	config : null,

	setup: function() {
		var self = this;
		this.show_filter();
		this.load_config();

		if (location.pathname == '/preferences') {
			TumblrLife.show_config();
			$X('id("content")/form')[0].addEventListener('submit', this.save_config, false);
			return;
		}

		var posts = $X('id("posts")')[0];
		if (!posts || !(TumblrLife.sessionBookmark.supported || TumblrLife.ReblogMenu.supported)) return;

		posts.addEventListener('DOMNodeInserted', this.setup_handler, false);
		var li = $X('./li[starts-with(@id, "post")]', posts);
		//TumblrLife.sessionBookmark.setup();
		li.forEach(function(li) {
			self.setup_handler({ target: li });
		});
		//TumblrLife.sessionBookmark.save_session(li[0]);
		TumblrLife.minibuffer.setup();

		TumblrLife.show_shortcut_key_help();
	},

	setup_handler: function(e) {
		var target = e.target;
		var tag = target.localName;
		if (tag == 'li' && target.id && target.id != 'new_post') {
			new TumblrLife.ReblogMenu(target);
			//TumblrLife.sessionBookmark.check(target);
		}
	},

	load_config: function() {
		var json = unsafeWindow.localStorage.tumblr_life_config;
		TumblrLife.log('load config: '+json);
		var config = (json) ? JSON.parse(json) : {};
		this.config = extend({
			bookmark_session: 5,
			trim_reblog_info: false
		}, config);
	},

	save_config: function(e) {
		var data = extend(TumblrLife.config, {
			trim_reblog_info: $X('id("tumblr-life-config-trim-reblog-info")')[0].checked
		});
		var json = JSON.stringify(data);
		unsafeWindow.localStorage.tumblr_life_config = json;
		return true;
	},

	show_config: function() {
		var config = this.config;
		var trim_reblog_info = config.trim_reblog_info ? ' checked="checked"' : '';

		var div = document.createElement('div');
		div.id = 'tumblr-life-config';
		div.innerHTML = [
			'<div class="left_column less_vertical_spacing"><a href="http://userscripts.org/scripts/show/59330">Tumblr Life</a></div>',
			'<div class="right_column">',
			'<table border="0" cellspacing="0" cellpadding="0">',
			'<tbody>',
			'<tr>',
			'<td valign="top"><input id="tumblr-life-config-trim-reblog-info" type="checkbox"'+trim_reblog_info+' style="margin-right:5px;"/></td>',
			'<td valign="top"><label for="tumblr-life-config-trim-reblog-info">Trim reblog info</label></td>',
			'</tr>',
			'<tr>',
			'<tr><td colspan="2" height="15"></td></tr>',
			'<td></td>',
			'<td valign="top">',
			'<p style="margin:1px 0 0 0; font:normal 11px \'Lucida Grande\',Arial,sans-serif; color:#777;">',
			'Tumblr Life '+TumblrLife.version+' &copy; 2009- <a href="http://twitter.com/yksk">@yksk</a><br>',
			'<a href="http://userscripts.org/scripts/discuss/59330">Report problem</a>',
			'</p>',
			'</td>',
			'</tr>',
			'</tbody>',
			'</table>',
			'</div>',
			'<div class="clear"></div>'
		].join('');
		$X('id("content")/form/div')[0].appendChild(div);
	},

	show_filter: function() {
		var a = $X('id("nav")/a[1]')[0];
		if (!a) return;

		var current = (/^\/show\/([^\/]+)/.exec(location.pathname) || [])[1] || 'dashboard';
		var filters = ['Dashboard', 'Text', 'Photos', 'Quotes', 'Links', 'Chats', 'Audio', 'Videos'];

		var li = [];
		for (var i = 0, filter; filter = filters[i]; ++i) {
			var f = filter.toLowerCase();
			var href = (f == 'dashboard' ? '/' : '/show/')+f;
			var klass = (f == current) ? ' class="current"' : '';
			li.push('<li><a href="'+href+'"'+klass+'>'+filter+'</a></li>');
		}
		var ul = document.createElement('ul');
		ul.id = 'tumblr-life-filter';
		ul.innerHTML = li.join('');
		ul.addEventListener('mouseout', function(e) {
			if (e.relatedTarget.parentNode.parentNode == ul) return;
			ul.style.display = 'none';
		}, false);
		document.getElementById('header').appendChild(ul);

		a.addEventListener('mouseover', function() {
			var style = ul.style;
			style.right   = (190 + 450 - a.offsetLeft - a.offsetWidth)+'px';
			style.display = 'block';
		}, false);
	},

	show_shortcut_key_help: function() {
		if (!(TumblrLife.minibuffer.supported && (TumblrLife.ReblogMenu.supported || TumblrLife.sessionBookmark.supported))) return;

		var div = document.createElement('div');
		div.id = 'tumblr-life-shortcut-key-help';
		div.className = 'dashboard_nav_item';
		div.style.paddingLeft = 0;
		div.style.position    = 'relative';
		var help = [];
		if (TumblrLife.ReblogMenu.supported)
			help.push([
				'<li><kbd>r</kbd>reblog</li>',
				'<li><kbd>q</kbd>add to queue</li>',
				'<li><kbd>w</kbd>private</li>',
				'<li><kbd>e</kbd>reblog manually</li>',
				'<li><kbd>a</kbd>like, unlike</li>'
			].join(''));
		if (TumblrLife.sessionBookmark.supported)
			help.push([
				'<li><kbd>z</kbd>bookmark</li>',
				'<li><kbd>x</kbd>bookmark and restore last session</li>'
			].join(''));
		div.innerHTML = [
			'<div class="dashboard_nav_title">Shortcut Keys</div>',
			'<ul class="dashboard_subpages">',
			help.join(''),
			'</ul>'
		].join('');
		$X('id("right_column")')[0].appendChild(div);
	},

	id: function(id) {
		return id.replace('post_', '');
	},

	log: function(text) {
		GM_log('[Tumblr Life] '+text);
	}
};


TumblrLife.sessionBookmark = {
	image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAP0lEQVQoU2P4//8/A7kYq+CBExf+o+NRzYNac8+MJeRpBmlUtw2GG0C0ZphGbZc4uAFEa4ZpBLFhBhCtmVgMAJSySjzlt1umAAAAAElFTkSuQmCC',
	data : null,
	page : null,

	supported: /^\/(?:dashboard|show\/[^\/]+)\/?/.test(location.pathname),

	setup: function() {
		var page = /^\/(?:(dashboard)|(show\/[^\/]+)(?:\/\d+)?)/.exec(location.pathname);
		if (!page) return;
		this.page = page[1] || page[2];
		TumblrLife.log('session: '+this.page);

		this.list();
	},

	save_session: function(entry) {
		if (!TumblrLife.sessionBookmark.supported) return;
		var id = entry.id;
		if (id)
			this.save(id);
	},

	storage_name: function() {
		var page = this.page;
		return page ?
			'tumblr_life_session_bookmark'+(page == 'dashboard' ? '' : '_'+page) :
			null;
	},

	check: function(entry) {
		if (!this.page) return;
		var id = TumblrLife.id(entry.id);
		var sessions = this.load();
		for (var i = 0, session; session = sessions[i]; ++i) {
			if (id == session.id) {
				this.show(entry, session.date);
				break;
			}
		}
	},

	save: function(id) {
		id = TumblrLife.id(id);
		var data = this.data || this.load();
		if (!data) return false;
		if (data.length && id == data[0].id) data.shift();
		data.unshift({
			id  : id,
			date: +(new Date)
		});
		data.length = TumblrLife.config.bookmark_session;
		var json = JSON.stringify(data);
		TumblrLife.log('save session bookmark ('+this.page+'): '+json);
		unsafeWindow.localStorage[this.storage_name()] = json;
		return true;
	},

	load: function() {
		if (!this.data) {
			var json = unsafeWindow.localStorage[this.storage_name()];
			TumblrLife.log('load session bookmark ('+this.page+'): '+json);
			this.data = (json) ? JSON.parse(json) : [];
		}
		return this.data;
	},

	list: function() {
		if (!this.page) return;
		var sessions = this.load();
		var li = [];
		for (var i = 0, session; session = sessions[i]; ++i) {
			var id = session.id;
			if (id)
				li.push('<li><a href="'+this.make_session_url(id)+'"><img src="'+this.image+'" width="15" height="13"/>'+this.format_date(session.date)+'</a></li>');
		}
		if (!li.length) return;

		var div = document.createElement('div');
		div.className = 'dashboard_nav_item';
		div.style.paddingLeft = 0;
		div.style.position    = 'relative';
		div.innerHTML = [
			'<div class="dashboard_nav_title">Sessions</div>',
			'<ul class="dashboard_subpages">',
			li.join(''),
			'</ul>'
		].join('');
		$X('id("right_column")')[0].insertBefore(div, $X('//div[@class="dashboard_nav_item"]')[1]);
	},

	make_session_url: function(id) {
		var page = this.page;
		return (page == 'dashboard') ? '/dashboard/2/'+id :
		       (/^show/.test(page))  ? '/'+page+'/2?offset='+id :
		                               null;
	},

	show: function(entry, date) {
		var text = 'Session bookmarked at '+this.format_date(date);

		var li = document.createElement('li');
		li.className = 'tumblr-life-session-bookmark';
		li.innerHTML = [
			'<p>',
			'<span>',
			'<img src="'+this.image+'" width="15" height="13"/>',
			text,
			'</span>',
			'</p>'
		].join('');
		$X('id("posts")')[0].insertBefore(li, entry);
	},

	reload: function(id) {
		location.href = this.make_session_url(TumblrLife.id(id));
	},

	format_date: function(date) {
		date = new Date(date);
		var y = date.getFullYear();
		var m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
		var d = date.getDate();
		d = d+(['st', 'nd', 'rd', 'th'][(/(1?\d)$/.exec(d))[1] - 1] || 'th');
		var h = date.getHours();
		var ampm = ['am', 'pm'][+(h >= 12)];
		h = h % 12;
		var min = date.getMinutes();
		if (min < 10) min = '0'+min;
		return m+' '+d+', '+y+' '+h+':'+min+ampm;
	}
};


TumblrLife.minibuffer = {
	reblogging: {},

	supported: !!window.Minibuffer,

	setup: function() {
		if (!TumblrLife.minibuffer.supported) return;

		if (TumblrLife.ReblogMenu.supported) {
			window.Minibuffer.addShortcutkey({
				key        : 'a',
				description: 'Like',
				command    : function() {
					window.Minibuffer.execute('pinned-or-current-node | like | clear-pin');
				}
			});
			window.Minibuffer.addShortcutkey({
				key        : 'r',
				description: 'Reblog',
				command    : function() {
					window.Minibuffer.execute('pinned-or-current-node | reblog | clear-pin');
				}
			});
			window.Minibuffer.addShortcutkey({
				key        : 'q',
				description: 'Reblog add to queue',
				command    : function() {
					window.Minibuffer.execute('pinned-or-current-node | reblog -q | clear-pin');
				}
			});
			window.Minibuffer.addShortcutkey({
				key        : 'w',
				description: 'Reblog private',
				command    : function() {
					window.Minibuffer.execute('pinned-or-current-node | reblog -p | clear-pin');
				}
			});
			window.Minibuffer.addShortcutkey({
				key        : 'e',
				description: 'Reblog manually',
				command    : function() {
					window.Minibuffer.execute('pinned-or-current-node | reblog -m | clear-pin');
				}
			});

			window.Minibuffer.addCommand({
				name   : 'like',
				command: function(stdin) {
					var entries = stdin, entry;
					if (!stdin.length) {
						entry = window.Minibuffer.execute('current-node');
						if (entry) entries.push(entry);
						else return stdin;
					}
					entries.forEach(function(entry) {
						var a = $X('.//a[contains(@class, "like_button")]', entry)[0],
							status;
						if (a) {
							click(a);
							status = (a.className.indexOf('already_like') == -1) ?
								'Unliked' :
								'Liked';
							window.Minibuffer.status('like'+entry.id, status, 100);
						}
					});
					return stdin;
				}
			});
			window.Minibuffer.addCommand({
				name   : 'reblog',
				command: function(stdin) {
					var args = this.args;
					var entries = stdin;
					if (!stdin.length) {
						var entry = window.Minibuffer.execute('current-node');
						if (entry) entries.push(entry);
						else return stdin;
					}
					entries.forEach(function(entry) {
						var item;
						switch (args[0]) {
							case '-q':
								item = $X('.//li[@class="tumblr-life-add-to-queue"]', entry)[0];
								break;
							case '-p':
								item = $X('.//li[@class="tumblr-life-private"]', entry)[0];
								break;
							case '-m':
								item = $X('.//a[@class="tumblr-life-reblog-manually"]', entry)[0];
								break;
							default:
								item = $X('.//div[@class="tumblr-life-item"]/a[text()="reblog"]', entry)[0];
						}
						if (item) {
							if (args[0] != '-m') {
								var id = entry.id;
								TumblrLife.minibuffer.reblogging[id] = true;
								window.Minibuffer.status('reblog'+id, 'Reblogging...');
								click(item);
							}
							else // Firefox
								window.open(item.href);
						}
					});
					return stdin;
				}
			});
		}

		if (TumblrLife.sessionBookmark.supported) {
			window.Minibuffer.addShortcutkey({
				key        : 'z',
				description: 'Bookmark',
				command    : function() {
					window.Minibuffer.execute('pinned-or-current-node | bookmark | clear-pin');
				}
			});
			window.Minibuffer.addShortcutkey({
				key        : 'x',
				description: 'Restore',
				command    : function() {
					window.Minibuffer.execute('pinned-or-current-node | restore | clear-pin');
				}
			});

			window.Minibuffer.addCommand({
				name   : 'bookmark',
				command: function(stdin) {
					var entries = stdin;
					if (!stdin.length) {
						var entry = window.Minibuffer.execute('current-node');
						if (entry) entries.push(entry);
						else return stdin;
					}
					entries.forEach(function(entry) {
						var id = entry.id;
						if (TumblrLife.sessionBookmark.save(id)) {
							($X('.//li[text()="bookmark"]', entry)[0] || {}).innerHTML = 'bookmarked';
							window.Minibuffer.status('bookmark'+id, 'Bookmarked', 100);
						}
					});
					return stdin;
				}
			});
			window.Minibuffer.addCommand({
				name   : 'restore',
				command: function(stdin) {
					var entries = stdin, entry;
					if (!stdin.length) {
						entry = window.Minibuffer.execute('current-node');
						if (entry) entries.push(entry);
						else return stdin;
					}
					entry = entries.pop();
					var id = entry.id;
					var session_bookmark = TumblrLife.sessionBookmark;
					if (session_bookmark.save(id)) {
						window.Minibuffer.status('restore'+id, 'Reloading...');
						session_bookmark.reload(id);
					}
					return stdin;
				}
			});
		}
	},

	complete: function(id) {
		var reblogging = this.reblogging;
		if (window.Minibuffer && reblogging[id]) {
			window.Minibuffer.status('reblog'+id, 'Reblogged', 100);
			delete reblogging[id];
		}
	}
};


TumblrLife.ReblogMenu = function(container) {
	this.container = container;
	this.id = TumblrLife.id(container.id);
	this.show();
};

TumblrLife.ReblogMenu.supported = /^\/(?:dashboard|likes|show\/[^\/]+)\/?/.test(location.pathname);

TumblrLife.ReblogMenu.prototype = {
	reblogging  : false,
	reblogged   : false,
	container   : null,
	menu        : null,
	label       : null,
	itemlist    : null,
	id          : null,
	reblogged_id: null,
	custom_tweet: '',

	show: function() {
		var self = this;
		var link = $X('./div[@class="post_controls"]/a[text()="reblog"]', this.container)[0];
		if (!link) return;
		var href = link.href;
		var div = this.menu = document.createElement('div');
		div.className = 'tumblr-life-item';
		var a = this.label = document.createElement('a');
		a.href = href;
		a.innerHTML = 'reblog';
		div.appendChild(a);

		var ul = this.itemlist();
		div.appendChild(ul);

		a.addEventListener('click', function(e) {
			e.preventDefault();
			self.reblog();
		}, false);
		var timer;
		div.addEventListener('mouseover', function(e) {
			if (self.reblogging || self.reblogged) return;
			ul.style.display = 'block';
		}, false);
		div.addEventListener('mouseout', function(e) {
			ul.style.display = 'none';
		}, false);

		link.parentNode.replaceChild(div, link);
	},

	itemlist: function() {
		var self = this;
		var enable_twitter = this.twitter();
		var twitter = enable_twitter ?
			'<li><label><input type="checkbox" value="" class="tumblr-life-twitter"/> Send to Twitter</label><span class="tumblr-life-twitter-edit">edit</span></li>' :
			'';
		var ul = this.itemlist = document.createElement('ul');
		ul.innerHTML = [
			'<li class="tumblr-life-add-to-queue">add to queue</li>',
			'<li class="tumblr-life-private">private</li>',
			'<li><a href="'+this.label.href+'" target="_blank" class="tumblr-life-reblog-manually">reblog manually</a></li>',
			'<li>bookmark</li>',
			'<ul class="option">',
			'<li><input type="text" value="" placeholder="tags" class="tumblr-life-tags" onkeydown="event.stopPropagation()"/></li>',
			twitter,
			'</ul>'
		].join('');
		$X('./li[@class]', ul).forEach(function(li) {
			var klass = li.className;
			var filter = self['filter_'+klass.slice(12)];
			if (filter)
				li.addEventListener('click', function() {
					self.reblog(filter);
				}, false);
		});
		$X('./li[text()="bookmark"]', ul)[0].addEventListener('click', function(e) {
			if (TumblrLife.sessionBookmark.save(self.id))
				e.target.innerHTML = 'bookmarked';
		}, false);

		if (enable_twitter) {
			var edit = $X('.//span[@class="tumblr-life-twitter-edit"]', ul)[0];
			$X('.//input[@class="tumblr-life-twitter"]', ul)[0].addEventListener('change', function(e) {
				edit.style.display = (e.target.checked) ? 'inline-block' : 'none';
			}, false);
			edit.addEventListener('click', function () {
				self.set_custom_tweet();
			}, false);
		}
		return ul;
	},

	filter: function(param, params) {
		var twitter;
		switch (param.name) {
			case 'preview_post': return false;
			case 'post[tags]':
				param.value = $X('.//input[@class="tumblr-life-tags"]', this.itemlist)[0].value;
				return true;
			case 'send_to_twitter':
				twitter = ($X('.//input[@class="tumblr-life-twitter"]', this.itemlist)[0] || {}).checked;
				return (twitter) ? !!(param.value = '1') : false;
			case 'custom_tweet':
				twitter = ($X('.//input[@class="tumblr-life-twitter"]', this.itemlist)[0] || {}).checked;
				return (twitter) ? !!(param.value = this.custom_tweet) : false;
			case 'post[two]':
				var type = params['post[type]'];
				if (TumblrLife.config.trim_reblog_info) {
					var value = param.value;
					if (type == 'regular' || type == 'photo' || type == 'video')
						param.value = this.trim_reblog_info(value);
					else if (type == 'quote')
						param.value = value.replace(/ \(via <a.*?<\/a>\)/g, '').trim();
				}
				return true;
			case 'post[three]':
				if (TumblrLife.config.trim_reblog_info && params['post[type]'] == 'link')
					param.value = this.trim_reblog_info(value);
				return true;
			default: return true;
		}
	},

	'filter_private': function(param) {
		if (param.name == 'post[state]') param.value = 'private';
	},

	'filter_add-to-queue': function(param) {
		if (param.name == 'post[state]') param.value = '2';
	},

	twitter: function() {
		var item = $X('//a[@class="dashboard_switch_blog_menu_item"][last()]')[0];
		if (!item) return false;
		return (item.style.backgroundImage.indexOf('twitter_favicon') != -1);
	},

	set_custom_tweet: function() {
		this.custom_tweet = window.prompt('140 letters limit (empty to default)', ' [URL]') || '';
	},

	// @http://github.com/to/tombloo/blob/master/xpi/chrome/content/library/20_Tumblr.js
	trim_reblog_info: function(value) {
		if (!TumblrLife.config.trim_reblog_info) return value;
		value = value
			.replace(/<p><\/p>/g, '')
			.replace(/<p><a[^<]+<\/a>:<\/p>/g, '');
		return (function loop(all, content) {
			return content.replace(/<blockquote>([\s\S]+)<\/blockquote>/gm, loop);
		})(null, value).trim();
	},

	reblog: function(filter) {
		var self = this;
		var label = this.label;
		var url = label.href;
		if (this.reblogging || this.reblogged) return;

		this.reblogging = true;
		label.className = 'tumblr-life-reblogging';
		label.innerHTML = 'reblogging...';
		this.itemlist.style.display = 'none';
		
		var xhr = new XMLHttpRequest;
		xhr.open('GET', url, true);
		xhr.onload = function() {
			var params = self.param(xhr.responseText, filter);

			xhr.open('POST', url, true);
			xhr.onload = function() {
				self.complete();
			};
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.send(params);
		};
		xhr.onerror = function() {
			self.reblogging = false;
			label.className = '';
			alert('Reblog Failed: '+e.target.status);
			label.innerHTML = '<span class="tumblr-life-fail">reblog</span>';
		};
		xhr.send();
	},

	complete: function() {
		var self = this;
		var id = this.id;
		this.reblogging = false;
		this.reblogged = true;
		execute('increment_note_count(' + id + ')');
		TumblrLife.minibuffer.complete('post_'+id);
		this.label.innerHTML = 'reblogged';

		var primary = $X('//li[contains(@class, "is_mine")]//a[@class="post_avatar"]')[0];
		if (!primary && !(/^\/dashboard/.test(location.pathname)))
			primary = $X('//div[@class="dashboard_nav_item"][1]//a')[0];
		if (!primary ||	!(primary = (/http:\/\/([^.]+)\.tumblr\.com/.exec(primary.href) || [])[1])) {
			this.show_reblogged();
			return;
		}
		var xhr = new XMLHttpRequest;
		xhr.open('GET', '/tumblelog/'+primary);
		xhr.onload = function() {
			var control = $X(
				'//div[@class="post_info"][contains(a[1]/@href, "/'+id+'")]/preceding-sibling::div[@class="post_controls"]',
				createDocumentFromString(xhr.responseText)
			)[0];
			if (control)
				self.reblogged_id = TumblrLife.id($X('..', control)[0].id);
			self.show_reblogged(control);
		};
		xhr.onerror = function() {
			self.ahow_reblogged();
		};
		xhr.send();
	},

	show_reblogged: function(control) {
		this.label.className = '';
		if (!control) {
			control = document.createElement('span');
			control.className = 'tumblr-life-success';
			control.innerHTML = 'reblogged';
			control = [control];
		}
		else {
			var redirect_to = TumblrLife.sessionBookmark.make_session_url(this.id);
			control.removeChild($X('./a[1]', control)[0]); // notes
			$X('.//input[@name="redirect_to"]', control)[0].value = redirect_to;
			var edit = $X('./a[text()="edit"]', control)[0];
			edit.href   = '/edit/'+this.reblogged_id+'?redirect_to='+encodeURIComponent(redirect_to);
			edit.target = '_blank';
			control = document.importNode(control, true).childNodes;
		}
		var menu = this.menu;
		var controls = menu.parentNode;
		for (var i = 0, c; c = control[i]; ++i)
			controls.insertBefore(c, menu);
		controls.removeChild(menu);
	},

	param: function(html, filter) {
		var self = this;
		var param_list = $X(
			'id("edit_post")//*[self::input or self::textarea or self::select]',
			createDocumentFromString(html)
		);
		var q = [];
		var params = {};
		param_list.forEach(function(param) {
			params[param.name] = param.value;
		});
		param_list.forEach(function(param) {
			if (self.filter(param, params) !== false) {
				if (typeof filter != 'function' || filter(param, params) !== false)
					q.push(encodeURIComponent(param.name)+'='+encodeURIComponent(param.value));
			}
		});
		return q.join('&');
	}
};


TumblrLife.setup();


function extend(target, options) {
	for (var k in options) target[k] = options[k];
	return target;
}

function click(target) {
	var e = document.createEvent('MouseEvent');
	e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	target.dispatchEvent(e);
}

function execute(code) {
	location.href = 'javascript:' + code;
}


// http://gist.github.com/198443
// via http://github.com/hatena/hatena-bookmark-xul/blob/master/chrome/content/common/05-HTMLDocumentCreator.js
function createDocumentFromString(source){
	var doc = document.implementation.createHTMLDocument ?
			document.implementation.createHTMLDocument('hogehoge') :
			document.implementation.createDocument(null, 'html', null);
	var range = document.createRange();
	range.selectNodeContents(document.documentElement);
	var fragment = range.createContextualFragment(source);
	var headChildNames = {title: true, meta: true, link: true, script: true, style: true, /*object: true,*/ base: true/*, isindex: true,*/};
	var child, head = doc.getElementsByTagName('head')[0] || doc.createElement('head'),
	           body = doc.getElementsByTagName('body')[0] || doc.createElement('body');
	while ((child = fragment.firstChild)) {
		if (
			(child.nodeType === doc.ELEMENT_NODE && !(child.nodeName.toLowerCase() in headChildNames)) || 
			(child.nodeType === doc.TEXT_NODE &&/\S/.test(child.nodeValue))
		   )
			break;
		head.appendChild(child);
	}
	body.appendChild(fragment);
	doc.documentElement.appendChild(head);
	doc.documentElement.appendChild(body);
	return doc;
}

// http://gist.github.com/3242
function $X (exp, context) {
	context || (context = document);
	var expr = (context.ownerDocument || context).createExpression(exp, function (prefix) {
		return document.createNSResolver(context.documentElement || context).lookupNamespaceURI(prefix) ||
			context.namespaceURI || document.documentElement.namespaceURI || "";
	});

	var result = expr.evaluate(context, XPathResult.ANY_TYPE, null);
		switch (result.resultType) {
			case XPathResult.STRING_TYPE : return result.stringValue;
			case XPathResult.NUMBER_TYPE : return result.numberValue;
			case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
			case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
				// not ensure the order.
				var ret = [], i = null;
				while (i = result.iterateNext()) ret.push(i);
				return ret;
		}
	return null;
}

};