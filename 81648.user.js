// ==UserScript==
// @name           TianyaForumFilter_v2
// @namespace      tianya_ff2
// @description    按人名及长度等过滤 tianya.cn 论坛帖子
// @include        http://*.tianya.cn/*forum/*html
// @include        http://*.tianya.cn/*Forum/*html
// @include        http://*.tianya.cn/tianyacity/Content/*html
// @include        http://*.tianya.cn/tianyacity/content/*html
// @exclude        http://*.tianya.cn/*/articleslist*
// @exclude        http://*.tianya.cn/*ListUserArticles.asp*
// ==/UserScript==


var console = {
	log:	GM_log,
	error:	function(x) {
		GM_log('Error: ' + x)
	},
	trace:	function(e) {
		console.error(e);
		if (e.stack)
			console.log('\nstack:\n' + e.stack);
	},
}

var css_black;

function _func(f) {
	return (typeof f == 'function')
		? f: new Function('$_', f.replace(/^=/, 'return '))
}

var proto = {
	toString: function() {
		return 'Array[' + (this._map(function(x) { return x.toString() }).join(', ')) + ']';
	},

	app:	function(x) {
		if (typeof x == 'object')
			for (var i = 0; i < x.length; i++)
				this.push(x[i]);
		else
			this.push(x);
		return this;
	},

	grep:	function(f, not) {
		f = _func(f);

		var r = [];
		for (var j = 0; j < this.length; j++)
			if ( f(this[j]) )
				r.push(this[j]);
			else if (not)
				not.push(this[j]);
		return r;
	},

	_map:	function(f) {
		f = _func(f);

		var r = [];
		for (var j = 0; j < this.length; j++) {
			var x = f(this[j]);
			if (x === undefined || x === null)
				continue;
			r.push(x);
		}
		return r;
	},

	a:	function(x) {
		if (!this[0] || !x) return this;
		if (x._map) {
			var t = this;
			x.forEach(function(c) { t.a(c) });
		} else {
			if (x) this[0].appendChild(x);
		}
		return this;
	},

	at:	function(n, v) {
		if (typeof n == 'string') {
			if (n == 'style') {
				var l = v.split(';');
				for (var i = 0; i < l.length; i++) {
					var k = l[i].split(':');
					var imp = null;
					if (k[1] && k[1].match(/!\s*important/)) {
						k[1] = k[1].replace(/!\s*important/, '');
						imp = 'important';
					}
					k = k._map(function(x) {
						return x.replace(/^\s*/, '').replace(/\s*$/, '');
					});
					if (!k[1])
						this._map(function(x) {
							x.style.removeProperty(k[0]);
						});
					else
						this._map(function(x) {
							x.style.setProperty(k[0], k[1], imp);
						});
				}
				return this;
			}
			if (n[0] == '!') {
				var a = n.substr(1);
				this._map(function(x) {
					var k = (x.getAttribute(a) != 1);
					if (k)	x.setAttribute(a, 1);
					else	x.removeAttribute(a);
				});
				return this;
			}
			switch(v) {
			case undefined:
				return this.length ? this[0].getAttribute(n) : null;
			case '':
			case null:
				this._map(function(x) { x.removeAttribute(n) });
				break;
			default:
				this._map(function(x) { x.setAttribute(n, v) });
			}
		} else for (var i in n) this.at(i, n[i]);

		return this;
	},

	e:	function(evt, f, tf) {
		if (f) switch(evt[0]) {
		case '-':
			evt = evt.substr(1);
			this._map(function(x) { x.removeEventListener(evt, f, tf? true : false) });
			break;
		case '+':
			evt = evt.substr(1);
		default:
			this._map(function(x) {x.addEventListener(evt, f, tf ? true: false)});
		}
		return this;
	},

	f:	function(x) {
		var s = x.substr(1);
		var ret = [];
		switch(x[0]) {
		case '>':
			this._map(function(e) {
				var x = e.childNodes;
				for (var i = 0; i < x.length; i++)
					ret.push(x[i]);
			});
			ret = (s ? ret.f('=' + s) : ret);
			break;
		case '<':
			if (!s)	{
				ret = this._map(function(e) {
					e = e.parentNode;
					if (e) return e;
				});
			} else 
				ret = this._map(function(e) {
					while (e && e.mozMatchesSelector && !e.mozMatchesSelector(s))
						e = e.parentNode;
					if (e && e.mozMatchesSelector)
						return e;
				});
			break;
		case '=':
			ret = this.grep(function(e) { return e.mozMatchesSelector && e.mozMatchesSelector(s) });
			break;
		case '@':
			ret = this._map(function(e) { return e.querySelector(s) });
			break;
		case '&':
			ret = this.f(s);
			if (!ret.length) {
				ret = $('+' + s);
				this.a(ret);
			}
			break;
		default:
			this._map(function(e) {
				ret.app(e.querySelectorAll(x));
			});
		}
		return ret._map(function(x) { return x.wrappedJSObject ? x.wrappedJSObject : x });
	},

	i:	function(a, f) {
		var x = this[0];
		if (f === 0)
			f = x.firstChild;
		if (!f) {
			this.a(a);
			return this;
		} else if (f[0])
			f = f[0];

		if (a.constructor == Array) {
			for (var i = 0; i < a.length; i++)
				x.insertBefore(a[i], f);
		} else
			x.insertBefore(a, f);
		return this;
	},

	item:	function(x) {
		if (x < 0) x += this.length;
		if (x < 0 || x >= this.length) return [];
		return [this[x]];
	},

	r:	function() {
		this._map(function(c) {if (c) { var p = c.parentNode; if (p) p.removeChild(c) }});
		return this;
	},

	txt:	function(t) {
		if (t === undefined)
			return this._map('=$_.textContent').join('');
		else
			this._map(function(x) {x.textContent = t});
		return this;
	},
};

for (var i in proto)
	Array.prototype[i] = proto[i];

function err(p) {
	var e = new Error;
	if (typeof p == 'string') {
		e.message = 'Error: ' + p;
		return e;
	}
	for (var i in p) {
		e[i] = p[i];
	}
	return e;
};

function s2p(a) {
	var h, r = {};
	if (h = a.match(/^(\w[\w\d]*)/))
		r.tag = h[1];

	if (h = a.match(/#(\w[\w\d\-]+)/))
		r.id = h[1];

	if (h = a.match(/\.\w[\w\d\-]*/g))
		r.classes = h._map('=$_.substr(1)');

	if (h = a.match(/\[.*?\]/g)) {
		r.attr = {};
		for (var i = 0; i < h.length; i++) {
			var t = h[i].substr(1, h[i].length - 2)
				.split('=');
			r.attr[t[0]] = t[1];
		}
	}

	return r;
};

function new_header(tag, text) {
	$('head').i($('+' +tag, text));
};

var $ = window.$ = function(x) {
	function ce(tag, txt, attr) {
		if (typeof tag == 'object') {
			tag = arguments[0];
			content = arguments[1];
			attr = arguments[2];
		}

		var r = s2p(tag);
		var s;
		if (r.tag == 'text')
			s = document.createTextNode(txt);
		else {
			s = document.createElement(r.tag);
			if (txt) s.textContent = txt;
		}
		if (r.id) s.id = r.id;
		if (r.classes) s.className = r.classes.join(' ');

		if (r.attr) [s].at(r.attr);
		if (attr) [s].at(attr);

		if (s.wrappedJSObject) s = s.wrappedJSObject;
		return s;
	}

	if (typeof x == 'string') {
		if (x[0] == '+')
			return new Array(ce(x.substr(1), arguments[1], arguments[2]));
		else
			return new Array(document).f(x);
	} else {
		var ret = [];
		for (var i = 0; i < arguments.length; i++) {
			var e = arguments[i];
			if (e.wrappedJSObject) ret.push(e.wrappedJSObject);
			else	ret.push(e);
		}
		return ret;
	}
};

function keys(obj) {
	var ret = [];
	for (var x in obj) ret.push(x);
	return ret;
}

var pref = window.pref = {
	_rec: {},
	_nocache: {},
	_proc: {},
	_handles: {
		load_bool: function(name) {
			pref._rec[name] = (GM_getValue(name) == 1);
		},
		load_int: function(name) {
			var v = parseInt(GM_getValue(name));
			if (v != v) v = 0;
			pref._rec[name] = v;
		},
		load_str: function(name) {
			var v = GM_getValue(name);
			if (v == null) v = '';
			pref._rec[name] = v;
		},
		load_obj: function(name) {
			var v;
			try { v = JSON.parse(GM_getValue(name)); }
			catch(e) { v = null; }
			pref._rec[name] = v;
		},
		save_str: function(name, v) {
			pref._rec[name] = v;
			GM_setValue(name, v);
		},
		save_int: function(name, v) {
			var nv = parseInt(v);
			if (nv != nv) nv = 0;
			pref._rec[name] = nv;
			GM_setValue(name, nv);
		},
		save_bool: function(name, v) {
			v = (v == 1);
			pref._rec[name] = v;
			GM_setValue(name, v ? 1 : 0);
		},
		save_obj: function(name, v) {
			pref._rec[name] = v;
			GM_setValue(name, JSON.stringify(v));
		},
	},

	decl: function(name, type, def_v, func, nocache) {
		var f = pref._handles['save_' + type];
		if (!f) {
			console.error('bad pref type: ' + type);
			return;
		}
		if (func) pref._proc[name] = func;
		if (nocache) pref._nocache[name] = 1;

		var x = GM_getValue(name);
		if (x === null || x === undefined)
			f(name, def_v);

		pref.__defineGetter__(name, function() {
			if (this._rec[name] === undefined || (this._nocache[name]))
				this._handles['load_' + type](name);
			return this._rec[name];
		});
		pref.__defineSetter__(name, function(v) {
			this._handles['save_' + type](name, v);
			if (this._proc[name])
				this._proc[name](v);
		});
	},
}

var ui = {
	panel_button:	function(parm) {
		var btn = $('+span.panel-button' + parm.tag + '-toggle',
				parm.icon, {title: parm.title});
		parm.btn = btn[0];

		btn.e('click', function(e) {ui.panel_show(parm)});
		$('@#panel-btns').a(btn);
		return btn;
	},

	panel_create:	function(parm) {
		var p = $('+div.panel' + parm.tag);
		p.a($('+div.panel-inside')
			.a($('+div.panel-head', parm.title)
				.a($('+span.panel-close', '✗', {
					title: '关闭'
				}).e('click',
					function() {
						ui.panel_hide(p[0], parm.btn);
						$(document.body).at('style', 'text-align:');
					}
				))
			)
			.a(parm.func())
		);
		p[0].btn = parm.btn;
		if (parm.auto_del)
			p[0].auto_del = true;
		p[0]._shown = false;
		$('@body').a(p);
		return p;
	},

	panel_hide: function(p, btn) {
		if (p.auto_del) $(p).r();
		else {
			$(p).at('style', 'display:none');
			p._shown = null;
		}
		$(btn).at('active', '');
	},

	panel_show: function(parm) {
		$('.panel')._map(function(x) {
			if (x.btn != parm.btn) {
				ui.panel_hide(x, x.btn);
			}
		});

		var p = $(parm.tag);
		if (!p.length)
			p = ui.panel_create(parm);
		if (p[0]._shown) {
			p[0]._shown = false;
			ui.panel_hide(p[0], parm.btn);
		} else {
			p[0]._shown = true;
			p.at('style', 'display: block');
			ui.set_panel_pos(p);
			ui.panel_fix(p);
			$(parm.btn).at('active', 1);
		}
	},

	set_panel_pos: function(p) {
		var bar = $('#bar-wrapper');
		if (pref.bar_on_top)
			p.at('style', 'top:' + bar[0].offsetHeight + 'px;bottom:0');
		else
			p.at('style', 'top: 0; bottom:'+bar[0].offsetHeight+'px');
	},

	panel_fix:	function(p) {
		var pi = p.f('@.panel-inside');
		var s = pi.f('@.flex').at('style', 'height:');
		if (!s.length) return;

		var diff = pi[0].clientHeight - p[0].clientHeight + 4;
		s.at('style', 'height:' + (s[0].clientHeight - diff) + 'px');
		if (diff > 0) {
			p.f('.td:last-child, .th:last-child').at('style', 'padding-right: 20px');
		} else {
			p.f('.td:last-child, .th:last-child').at('style', 'padding-right:');
		}
	},

	single_select: function(e) {
		var t = [e.target];
		if (!t.f('=.sel-item').length)
			t = t.f('<.sel-item');
		if (!t.length) return;

		t.f('<').f('>.sel-item[selected]').at('selected', '');
		t.at('selected', 1);
	},

	multi_select: function(e) {
		var t = [e.target];
		var s = 'selected';
		var ls = '_last_sel';
		if (!t.f('=.sel-item').length)
			t = t.f('<.sel-item');

		if (!t.length) return;

		var tb = t.f('<');
		var l = tb.f('>.sel-item');
		var last = tb[0][ls];

		function between() {
			var sel = [];
			var on = 0;
			if (last == t[0]) return [last];

			for (var i = 0; i < l.length; i++) {
				switch(on) {
				case 0:
					if (l[i] == last || l[i] == t[0]) {
						on = 1;
						sel.push(l[i]);
					}
					break;
				case 1:
					sel.push(l[i]);
					if (l[i] == last || l[i] == t[0])
						on = 2;
					break;
				case 2:
					return sel;
				}
			}
			return sel;
		}

		if (!e.ctrlKey) l.at(s, '');

		if (!e.shiftKey || !last || !last.parentNode) {
			if (e.ctrlKey)
				t.at('!' + s);
			else
				t.at(s, 1);

			tb[0][ls] = t[0].getAttribute(s) ? t[0] : null;
		} else {
			between().at(s, 1);
		}
	},

	check_ctrl: function(e) {
		if (!e.ctrlKey) {
			ui.info_box('按住 Ctrl 鍵');
			return false;
		}
		return true;
	},

	text_button: function(tag, text, func, attr) {
		var x = $('+span.text-button'+tag, text);
		if (func)
			x.e('+click', func);
		if (attr) x.at(attr);
		return x;
	},

	toggle_button: function(tag, text, func, value) {
		return $('+span.toggle-button' + tag, text)
			.at('on', value ? 1 : '')
			.e('+click', function(e) {
				$(e.target).at('!on');
				func(e.target, e.target.getAttribute('on'))
			});
	},

	goto_item: function(a) {
		if (!a) return;
		a.scrollIntoView();
		$(a).at('goto', 1);
		setTimeout(function() {
			$(a).at('goto', '');
		}, 3000);
	},

	info_box: function(txt, attr) {
		$('@#info-box').r();
		var b = $('+div#info-box', txt)
			.at(attr)
			.e('click', function() {b.r()});
		$('@body').a(b);
		setTimeout(function() { b.r() }, 5000);
	},

	menu_item: function(x) {
		var m, icon = $('+span.menu-icon'),
			label = $('+span.menu-label');
		if (x.icon) {
			icon.txt(x.icon);
			if (x.icon_attr) icon.at(x.icon_attr);
		}
		label.txt(x.label);
		if (x.label_attr)
			label.at(x.label_attr);

		if (x.href)
			m = $('+a.menu-item', '', {href: x.href});
		else
			m = $('+div.menu-item');

		if (x.func)
			m.e('+click', x.func);

		return m.a(icon).a(label);
	},

	popup_menu: function(menus, anchor, fixed) {
		ui.unpop();
		var m = $('+div.menu-popup.popup');
		for (var i = 0; i < menus.length; i++) {
			menus[i]._map(function(x) {
				m.a(ui.menu_item(x));
			});
			if (i < menus.length - 1)
				m.f('>').item(-1).at('menuend', 1);
		}
		m.at('style', 'position: fixed');
		$('@body').a(m);
		ui.set_anchor(m, anchor, fixed);
		$(window).e('+click', ui.unpop);
		return m;
	},

	unpop: function() {
		$(window).e('-click', ui.unpop);
		$('.popup').r();
	},

	cancel_event: function(e) {
		e.preventDefault();
		e.stopPropagation();
	},

	pos: function(e, fixed) {
		var xy;
		if (fixed) {
			xy = [0, 0];
			if (e.offsetParent) {
				xy = ui.pos(e.offsetParent, true);
				xy[0] -= e.offsetParent.scrollLeft;
				xy[1] -= e.offsetParent.scrollTop;
			}

			xy[0] += e.offsetLeft;
			xy[1] += e.offsetTop;
		} else {
			xy = e.offsetParent ? ui.pos(e.offsetParent) : [0, 0];
			xy[0] += e.offsetLeft;
			xy[1] += e.offsetTop;
		}

		return xy;
	},

	set_anchor: function(m, a, fixed) {
		var xy = ui.pos(a);
		m.at('style', 'position:' + (fixed ? 'fixed' : 'absolute'));
		m.at('style', 'top:' + (xy[1] + a.clientHeight) + 'px; '
			+ 'left:' + xy[0] + 'px;');
		if (fixed &&
			(xy[1] + a.clientHeight + m[0].clientHeight > window.innerHeight))
		{
			m.at('style', 'top:' + (xy[1] - m[0].clientHeight - 4) + 'px');
		}
	},

	text_box: function(a) {
		var m = $('+label'), txt;
		if (a.before) m.a($('+text', a.before));
		m.a(txt = $('+input[type=text]' + a.tag));
		if (a.after) m.a($('+text', a.after));
		if (a.value !== undefined)
			txt[0].value = a.value;
		if (a.func)
			txt.e('change', a.func);
		if (a.size)
			txt[0].size = a.size;
		return a.block ? $('+div').a(m) : m;
	},

	check_box: function(a) {
		var m = $('+label');
		var c = $('+input[type=checkbox]');
		m.a(c).a($('+text', a.label));
		if (a.value) c.at('checked', 1);
		if (a.func) c.e('click', a.func);
		return a.block ? $('+div').a(m) : m;
	},

	popup_window: function(a, anchor, fixed) {
		ui.unpop();
		var w;
		if (a.perm) {
			w = $(a.tag);
			if (w.length)
				return w.f('<.popup-window');				
		}
		w = $('+div.popup-window' + (a.perm ? '' : '.popup'));
		var t = [];
		if (a.title) {
			w.a(t = $('+div.panel-head', a.title).at({
				style: 'text-align: left'
			}));
		}
		w.at(a.attr).a($('+div.popup-inside' + a.tag)
			.a(a.func())
		);
		$('@body').a(w);
		if (anchor)
			ui.set_anchor(w, anchor, fixed);
		if (a.perm)
			t.a($('+span.panel-close', '✗').e('click', function() {
				w.r()
			}));
		else
			$(window).e('+click', ui.unpop);

		return w;
	},

	prefs_group: function(title, items) {
		var g = $('+div.prefs-group');
		g.a($('+div.prefs-title', title));
		g.a($('+div.prefs-body').a(items));
		return g;
	},

	click: function(t) {
		var e = document.createEvent('MouseEvent');
		e.target = t;
		e.initEvent('click', true, true, window, 0, 0, 0, 0, 0,
			false, false, false, false, 1, null);
		t.dispatchEvent(e);
	},
}

function wjo(a) {
	return a.wrappedJSObject ? a.wrappedJSObject : a;
}

var ff = window.ff = {
	n_pages: 0,
	pages: {},
	visits: 0,
	replies: 0,
	lz_list: {},

	prefs_hook: [],

	cols: [	['show', '.n',	'☼'	],
		['hl',	'.n',	'♥'],
		['lz',	'.n',	'♛'],
		['author', '',	'作者',	'.l'],
		['idx',	'.n',	'#'],
		['len',	'.n',	'长度',	'.r'],
		['imgs', '.n',	'图',	'.r']
	],

	url_gen: null,
	go_page: null,

	get_vars: function () { // get vars
		ff.id = unsafeWindow.idArticle;
		if (ff.first_author = unsafeWindow.chrAuthorName)
			ff.lz_list[ff.first_author] = 1;
		ff.stupid_form = (unsafeWindow.jumpPage != null);
	},

	// process DOM
	get_current_page: function (div) {
		if (!div) div = [document.body];

		var pg = {id: null, ids: null, n_pages: 0, idx: 0};
		var idx = div.at('page_idx');
		if (idx)
			pg.idx = idx;
		else
			ff.get_vars('chrAuthorName', 'jumpPage', 'idArticle');

		pg.n_pages = 0;
		var body = $('@body');

		var href = 'http://' + location.host + location.pathname;
		var flat = [];

		function parse_item(a) {
			var n = a.nodeName.toLowerCase();
			switch(n) {
			case '#text':
				var h;
				a = a.textContent.replace(/^[\s　]*/, '').replace(/。{3,}/g, '……');

				if (a.match(/^[\-—_=\+\.。\*－＿＝,，;；:：、～~＋]{8,}.*?分割.*?[\-—_=\+\.。\*－＿＝,，;；:：、～~＋]{8,}$/)) {
					flat.app($('+hr'));
					return;
				}

				if (h = a.match(/^[\-—_=\+\.。\*－＿＝,，;；:：、～~＋]{8,}/)) {
					a = a.replace(h[0], '');
					flat.app($('+hr'));
				}

				if (h = a.match(/[\-—_=\+\.。\*－＿＝,，;；:：、～~＋]{8,}$/)) {
					a = a.replace(h[0], '');
					if (a.length) flat.app($('+p', a));
					flat.app($('+hr'));
					return;
				}
				if (a.length)
					flat.app($('+p', a))

				return;
			case 'div':
				if (!a.mozMatchesSelector('div.vcard, table')) {
					[a].r().f('>')._map(parse_item);
					return;
				}
			case 'table':
				var h, aulink, time, post_idx;
				(a = $(a).r()).f('a[onclick]').r();

				aulink = a.f('a')._map(function(x) {
					return $('+a.author', x.textContent,
						{href:'http://my.tianya.cn/name/'+x.textContent});
				});

				if (h = a.f('.floor').txt().match(/(\d+)/)) {
					post_idx = h[1];
				}

				var t = a.txt().replace(/^\s*/, '')
						.replace(/\s*$/, '')
						.replace(/　+/g, ' ');

				if (!t) {
					console.log('got table, but no author link');
					return;
				}

				if (!(h = t.match(/日期：(\d+-\d+-\d+ \d+:\d+:\d+)/)))
					return;
				time = h[1];

				if (h = t.match(/访问：(\d+).*?回复：(\d+)/)) {
					pg.visits = h[1];
					pg.replies = h[2];
				}

				flat.app(h = $('+div.post-head')
					.a($('+span.post-idx'))
					.a(aulink)
					.a($('+span.timestamp', time)));
				h.post_idx = post_idx;
				return;

			case 'img':
				$(a).r().at({height:'', width:'', onclick:'', onerror:'', onload:'', id:'',
					alt:'', style:'cursor:'});
			case 'embed':
			case 'label':
				break;

			case 'br':
				var x = flat[flat.length - 1];
				if (x && (x.nodeName) && x.nodeName.toLowerCase() == 'br')
					x.multi = 1;
				else
					flat.push(a);
				return;
			case 'a':
				a = $(a).r();
				if (!a[0].href) {
					a.f('>')._map(parse_item);
					return;
				}
				if (a[0].href.match(/wap\.tianya/)) return;

				if (!a.f('img').length)
					a = $('+a', a.textContent, {href: a.href});
				a = $('+p').a(a)[0];
				break;

			default:
				[a].f('>')._map(parse_item);
				return;
			}
			flat.push(a);
		}

		function get_posts() {
			var h;
			if (h = div.f('div.info').txt()
				.match(/(访问|点击)数?：(\d+).*?回复数?：(\d+)/))
			{
				pg.visits = h[2];
				pg.replies = h[3];
			}
			var l = cleanup();
			l._map(parse_item);
		}

		function unflatten() {
			var unflat = [];
			var idx = 0;
			var p = [], pb = [];
			for (var i = 0; i < flat.length; i++) {
				var t = flat[i];
				var n = t.nodeName.toLowerCase();

				if (n == 'p') {
					if (p[0]) pb.a(t);
				} else if (n == 'div') {
					p = $('+div.post').a(t = $(t));
					p.a(pb = $('+div.post-body'));

					p[0].info = p.info = {
						author: t.f('@a').txt(),
						show:	0,
						len:	0,
						imgs:	0,
						hl:	0,
						page:	pg.idx,
					};

					if (!p[0].info.author)
						continue;
					p[0].info.idx = t.post_idx ? t.post_idx : idx ++,

					unflat.app(p);
					t.f('.post-idx').txt(pg.idx + '-' + p.info.idx);

				} else if (n == 'br') {
					if (t.multi && pb[0]) {
						var lastp = pb[0].lastChild;
						if (lastp && lastp.mozMatchesSelector('p')) {
							lastp.className += ' gap';
						}
					}
				} else
					pb.a(t);
			}
			return unflat;
		}
		function cleanup() {
			var t = div.f('title');
			div.f('@head').f('>').r();
			div.f('@head').a(t);
			div.f('p#my_tomy_p, p.fromwap').r();
			div.f('div').grep('=$_.id && $_.id.match(/^(adsp_|tianyaBrand)/)').r();
			$('@body').at({style: 'background-color:', id: ''});

			var l = [];
			if (!l.length)
				l = div.f('#firstAuthor, #pContentDiv.allpost');
			if (l.length <= 1)
				l = div.f('div#pContentDiv.mcon');
			if (!l.length)
				l = div.f('div.vcard, div.post');
			if (!l.length)
				l = div.f('#firstAuthor, #pContentDiv');
			return l;
		}
		function guess_pages() {
			var h, c = div.f('@div.pages, td#pageDivTop');
			if (!c.length) return;

			if (h = c.txt().match(/共(\d+)页/))
				pg.n_pages = h[1];
			if (h = href.match(/(\.s?html)$/))
				h = h[1];
			else {
				console.log('not html file? ' + h[1]);
				return;
			}

			var parts = href.replace(/\.s?html$/, '').split('/');
			if (!pg.n_pages) pg.n_pages = 1;

			c.f('a')._map(function(a) {
				var is_last = a.textContent.match(/末页/);
				var r = a.href.replace(/\.s?html$/, '').split('/');
				for (var i = 0; i < r.length; i++)
					if (parts[i].match(/^\d+$/) && (r[i] != parts[i])) {
						var d = r[i];
						parts[i] = '%';
						if (is_last || d > pg.n_pages)
							pg.n_pages = d;
					}
			});

			pg.url_gen = function(x) {
				if (x < 1 || x > ff.n_pages) return null;
				var r = [];
				for (var i = 0; i < parts.length; i++)
					r.push((parts[i] == '%') ? x : parts[i]);
				return r.join('/') + h;
			};

			if (pg.n_pages > 10000) {
				pg.n_pages = 1;
				return;
			}

			if (!pg.idx)
				for (var i = 1; i <= pg.n_pages; i++)
					if (pg.url_gen(i) == href) {
						pg.idx = i;
						break;
					}
		}

		function get_reply_form() {
			var r = div.f('.respond');
			if (r.length) {
				ff.reply = $('+div#reply').a(r);
				ff.add_reply_button();
			}
			console.log('reply: ' + r);
		}

		function get_pages() {
			if (!ff.id) {
				var x = div.f('@input[name="idArticle"]');
				if (x.length) ff.id = x[0].value;
			}
			var a = div.f('@em.current');
			if (!pg.idx && a.length) {
				var h;
				if (h = a.txt().match(/(\d+)/))
					pg.idx = h[1];
			}
			do {
			if (ff.stupid_form) {
				var apn = div.f('@input[name="apn"]');
				if (!apn.length || !div.f('form[name="pageForm"]').length) {
					console.log('Cannot find pageForm, assuming no replies');
					break;
				}
				pg.ids = apn[0].value.split(',');
				pg.n_pages = pg.ids.length;
				ff.pageform = $('+form#pageform', '', {method: 'post'})
						.a(div.f('form[name="pageForm"]').f('input[type="hidden"]'));

				if (!pg.go_page) pg.go_page = function(x) {
					if (x < 1 || x > ff.n_pages) return;
					ff.pageform[0].pID.value = x;
					$('@body').a(ff.pageform);
					ff.pageform[0].submit();
				}
				if (!pg.url_gen) pg.url_gen = function(x) {
					return 'javascript:ff.go_page(' + x + ');';
				}
				console.log(pg.n_pages);
			} else {
				a = div.f('@input[name="idArticleslist"]');
				if (a.length) {
					pg.ids = a[0].value.replace(/,$/, '').split(',');
					pg.n_pages = pg.ids.length;
					if (!pg.idx && ff.id) {
						for (var i = 0; i < pg.ids.length; i++)
							if (pg.ids[i] == ff.id) {
								pg.idx = i + 1;
								break;
							}
					}
				}
				if (!pg.ids) break;
				pg.url_gen = function(x) {
					var ids = ff.ids;
					if (!ids) {
						console.log('expecting to gen page link, but ids is null');
						return null;
					}
					return href.replace(ff.id, ids[x - 1]);
				}
			}
			} while(0);
			if (pg.n_pages > 10000) { // guessed wrong
				console.log('too many pages: ' + pg.n_pages);
				pg.n_pages = 1;
			}

			if (!pg.n_pages || !pg.idx) {
				console.log('will guess pages');
				guess_pages();
			}
			if (!pg.idx) pg.idx = 1;
			if (!pg.n_pages) pg.n_pages = 1;
			if (!ff.url_gen) ff.url_gen = pg.url_gen;
			if (!pg.go_page) {
				pg.go_page = function(x) { location.href = ff.url_gen(x) };
			}
		}

		get_reply_form();

		div.f('style, script, link, meta').r();
		ff.board_links =
			div.f('@div.guide, div.myplace').f('a')
			._map(function(a) {
				return $('+a.board', a.textContent.replace(/\s+/g, ''),
					{href: a.href})[0]
			});

		ff.title = $('@#adsp_content_title_banner, h1').txt()
				.replace(/\s/g, '')
				.replace(/『.*』/, '');

		get_pages();
		get_posts();

		pg.page = $('+div.page').at('page_idx', pg.idx)
			.a($('+div.page-no', '第' + pg.idx + '页'))
			.a(unflatten());

		pg.page.f('.post')._map(function(p) {
			p.info.len = p.lastChild.textContent.length;
			p.info.imgs = $(p).f('img').length;
		});
		return pg;
	},

	add_reply_button: function() {
		$('@#reply-panel-toggle').r();
		var pbtns = $('@span#panel-btns');
		if (pbtns.length) {
			pbtns.a(ui.panel_button({
				tag:	'#reply-panel',
				icon:	'❞',
				title:	'回复',
				func:	ff.reply_panel
			}))
		}
	},

	// UI items
	main_toolbar: function() {
		var bar = $('@#bar-wrapper');
		var tbtns, pbtns;
		if (!bar.length) {
			$('body')
			.a($('+div#bar-wrapper').a(
				bar = $('+div#main-tools')
				.a(ff.board_links)
				.a($('+span#page-links'))
				.a(tbtns = $('+span#toggle-btns'))
				.a(pbtns = $('+span#panel-btns'))
				.a(ui.text_box({
					tag:	'#leng-limit',
					before:	'限长>',
					value:	pref.length_limit,
					size:	4,
					func:	function(e) {
						var x = e.target;
						if (! x.value.match(/^\d+$/)) {
							x.value = pref.length_limit;
							return;
						}
						pref.length_limit = x.value;
						ff.all_posts()._map(function(p){
							ff.post_set_state(p);
						});
					}
				})))
			);
			tbtns.a(ui.toggle_button(
					'#hl-lz-button',
					'♛',
					function(b, on) {
						b.title = (on ? '':'不') + '高亮楼主';
						pref.hl_lz = on;
						ff.post_update_all();
					},
					pref.hl_lz));

			tbtns.a(ui.toggle_button(
					'#show-all-button',
					'☀',
					function(b, on) {
						b.title = on ? '全显示':'全隐藏';
						pref.show_all = on;
						ff.post_update_all();
					},
					pref.show_all));

			if (ff.reply)
				ff.add_reply_button()
		

			pbtns.a(ui.panel_button({
				tag:	'#prefs-panel',
				icon:	'⚙',
				title:	'选项',
				func:	ff.prefs_panel
			}))
			.a(ui.panel_button({
				tag:	'#post-panel',
				icon:	'♫',
				title:	'帖子',
				func:	ff.post_panel
			}))
		}
		return bar;
	},

	reply_panel: function() {
		return ff.reply;
	},

	page_nav: function() {
		var pl = $('#page-links');
		if (!pl.length){
			return;
		}
		pl.f('>').r();

		var first = 100000, last = -1, loaded = 0;
		for (var i in ff.pages) {
			if (i < first) first = i;
			if (i > last) last = i;
			loaded ++;
		}
		var ret = [];
		if (first > 1)
			ret.app($('+a#prev-page', '«', {href: ff.url_gen(first - 1)})
				.e('click', function(e) { ui.cancel_event(e); ff.go_page(first - 1) }, true)
			);
		ret.app($('+span#all-pages', (loaded > 1
				? '共' + ff.n_pages + '页 看' + loaded + '页'
				: '第' + last + '/' + ff.n_pages + '页')
			).e('click', ff.page_link_window, true)
		);
		if (last < ff.n_pages)
			ret.app($('+a#next-page', '»', {href: ff.url_gen(last * 1+ 1)})
				.e('click', function(e) { ui.cancel_event(e); ff.go_page(last * 1 + 1) }, true)
			);
		pl.a(ret);
	},

	more_ui: [],

	make_ui: function () {
		var b = ff.main_toolbar();
		ff.page_nav();

		['post_width', 'bar_on_top', 'bar_fixed', 'use_black'].forEach(function(x) {
			pref[x] = pref[x];
		});

		ff.more_ui._map(function(f) { f() });
	},

	set_post_width: function(v) {
		if (!v.toString().match(/^\d+$/) ) return null;
		if (v - 10 < 0 ) v = 10;
		ff.add_opt_css('post-width', '#content { max-width:' + v + 'em}');
		return v;
	},

	get_content: function() {
		var content = $('@#content');
		if (!content.length) {
			document.documentElement.lang = 'zh-CN';
			content = $('+div#content')
				.a($('+h1', ff.title))
				.a($('+div#stats'));
			$('body').a(content);
		}
		return content;
	},

	pre_insert: [function(page) {
		page.page.f('div.post')._map (function(p){
			p.innerHTML = p.innerHTML.replace(/&amp;/g, '&');
		})
	}],
	post_insert: [],

	add_page: function(page) {
		function max(a, b) {
			if (b && !a) return b;
			if (a && !b) return a;
			return Math.max(a, b);
		}

		var pg = page.page;
		//hack. sometimes we don't get the first post right...

		ff.visits = max(page.visits, ff.visits);
		ff.replies = max(page.replies, ff.replies);

		if (!ff.n_pages || (ff.n_pages < page.n_pages)) {
			ff.n_pages = page.n_pages;
			ff.ids = page.ids;
			if (!ff.url_gen)
				ff.url_gen = page.url_gen;
			if (!ff.go_page) {
				ff.go_page = page.go_page;
			}
		}

		pg.f('>.post')._map(ff.post_set_lz_info);

		if (ff.pages[page.idx])
			ff.remove_page(page.idx);

		try {
			ff.pre_insert._map(function(x) { x(page) });
		} catch(e) { // insert no matter what
		}

		var ps = pg.f('>.post');
		pg[0]._posts = ps.length;

		ps._map(function(p) {
			ff.post_row(p);
			ff.post_set_state(p);
		});

		pg.e('click', ff.page_click, true);
		var ins = null, have = [];

		for (var i in ff.pages) have.push(i);

		have.sort(function(a,b) { return a - b });

		for (var i = 0; i < have.length; i ++) {
			if (have[i] - page.idx > 0) {
				ins = ff.pages[have[i]].page[0];
				break;
			}
		}
		ff.get_content().i(page.page, ins);
		ff.pages[page.idx] = page;

		try {
			ff.post_insert._map(function(x) { x(page) });
		} catch(e) { // insert no matter what
		}
		
		var tbl = $('@#post-table').f('>.tbody');
		if (tbl.length)
			tbl.a(ps._map('=$_._link'));

		if (ff.visits && ff.replies)
			$('@#stats').txt('访问：'+ff.visits + '　回复：'+ff.replies);
		ff.page_nav();
	},

	remove_page: function(idx) {
		var p = ff.pages[idx];
		if (p) {
			p.page.r();
			p.page.f('>.post')._map(function(x) {
				$(x, x._link).r();
			});
		}
		delete ff.pages[idx];
		ff.page_nav();
	},

	post_row: function(p) {
		var tr = $('+div.tr.post-row.sel-item')[0];
		tr.cell = {};
		ff.cols._map(function(x) {
			var cell;
			$(tr).a(cell = $('+span.td.cell-' + x[0] + (x[3] ? x[3] :'')));
			tr.cell[x[0]] = cell[0];
		});
		var i = p.info;
		var ticks = '　✓✗';
		tr.cell.show.textContent = ticks[i.show];
		//tr.cell.hl.textContent = ticks[i.hl];
		tr.cell.lz.textContent = i.lz ? '♛':'　';
		tr.cell.idx.textContent = $(p.firstChild).f('@.post-idx').txt();
		['author', 'len', 'imgs']._map(function(x) {
			tr.cell[x].textContent = i[x];
		});
		p._link = tr;
		tr._link = p;
		tr.info = p.info;
		return tr;
	},

	post_table: function() {
		var thead, tbody;
		var tbl = $('+div.table#post-table')
			.a(thead = $('+div.thead#post-table-head'))
			.a(tbody = $('+div.tbody.flex#post-table-body')
				.e('click', ui.multi_select)
				.e('dblclick', ff.table_dblclk)
			).e('click', ff.table_click);

		ff.cols.forEach(function(x) {
			var th = $('+span.th.cell-'+ x[0] + x[1], x[2]);
			thead.a(th);
			thead[0][x[0]] = th[0];
		});
		thead.f('.cell-show')[0].sort_v = function(r) {
			return	(r.getAttribute('show') ? 1 : 0) * 10000000 + 
				r.info.page * 10000 +
				r.info.idx * 1;
		};
		thead.f('.cell-idx')[0].sort_v = function(r) {
			return	r.info.page * 10000 +
				r.info.idx *1;
		};
		thead.f('.cell-hl')[0].sort_v = function(r) {
			return	r.info.hl * 1000000 +
				r.info.page * 10000 +
				r.info.idx * 1;
		};
		thead.f('.cell-lz')[0].sort_v = function(r) {
			return	(r.info.lz ? r.info.lz : 3) * 1000000
				- r.info.page * 10000
				- r.info.idx * 1;
		};
		thead.f('.cell-imgs')[0].sort_v = function(r) {
			return	r.info.imgs * 1000 + (r.info.lz? 1 : 0) * 1;
		};
		thead.f('.cell-author')[0].sort_v = function(r) {
			return	r.info.author
				+ (100000000 - r.info.page * 10000 - r.info.idx * 1);
		};

		tbody.a(ff.all_posts()._map(function(p) { return p._link }));
		return tbl;
	},

	all_posts: function() {
		var posts = [];
		for (var pi in ff.pages)
			posts.app(ff.pages[pi].page.f('>.post'));
		return posts;
	},

	post_panel: function() {
		function all_rows() {
			var ret = [];
			var t = $('@#post-table');
			if (!t.length) return ret;
			return t.f('.tr');
		}
		function sel_rows() {
			var ret = [];
			var t = $('@#post-table');
			if (!t.length) return ret;
			return t.f('.tr[selected]');
		}
		return [ ff.post_table(),
			$('+div', '').a([
				ui.text_button('#hl-button', '反选', function() {
					all_rows().at('!selected');
				}),
				ui.text_button('#on-off-button', '开关', function() {
					var s = sel_rows()._map('=$_._link');
					if (!s.length) return;
					var sh = 0, sum = 0;
					s._map(function(p) { sum += p.info.show });
					if (sum < s.length)
						sh = 1;
					else if (sum < s.length *2)
						sh = 2;
					s._map(function(p) {
						p.info.show = sh;
						ff.post_show(p);
					});
				}),
				ui.text_button('#hl-button', '高亮', function() {
					var s = sel_rows(), sum = 0;
					s._map(function(r) { sum += r.info.hl });

					var hl = sum < s.length ? 1 : 0;
					s._map(function(r) { r.info.hl = hl; ff.post_hl(r._link) });
				}),
				ui.text_button('#delete-button', '删除', function(e) {
					if (!ui.check_ctrl(e)) return;
					var s = sel_rows();
					if (!s.length) return;

					var n = s.item(-1)[0].nextSibling;
					s._map(function(r) {
						ff.post_delete(r._link);
					});
					if (!n) n = $('#post-table').f('.sel-item').item(-1)[0];
					if (n) ui.click(n);
				}),
			])
		];
	},

	prefs_panel: function() {
		var ret = [];
		var x = ui.prefs_group('显示', [
			ui.text_box({
				tag:	'#post-width',
				before:	'帖子宽度',
				after:	'字',
				value:	pref.post_width,
				size:	3,
				func:	function(e) {
					var x = e.target;
					if (!x.value.match(/^\d+$/) || x.value < 10) {
						x.value = pref.post_width;
						return;
					}
					ff.set_post_width(pref.post_width = x.value);
				},
				block: 1
			}),
			ui.check_box({
				value: pref.bar_on_top,
				label: '工具条置顶',
				func: function(e) {
					pref.bar_on_top = e.target.checked ? 1 : 0;
				},
				block: 1
			}),
			ui.check_box({
				value: pref.bar_fixed,
				label: '固定工具条',
				func: function(e) {
					pref.bar_fixed = e.target.checked ? 1 : 0;
				},
				block: 1
			}),
			ui.check_box({
				value: pref.use_black,
				label: '黑色界面',
				func: function(e) {
					pref.use_black = e.target.checked ? 1 : 0;
				},
				block: 1
			}),
			ui.check_box({
				value: pref.manual_start,
				label: '手工启动脚本',
				func: function(e) {
					pref.manual_start = e.target.checked ? 1 : 0;
				},
				block: 1
			}),
		]);
		ret.push(x);
		ff.prefs_hook.forEach(function(f) {
			ret.push(f());
		});
		return $('+div.flex').a(ret);
	},

	page_click: function(e) {
		var t = $(e.target);
		if (t.f('=.post-idx').length) {
			var post = t.f('<.post')[0];
			ui.goto_item(post._link);
			return;
		} else if (t.f('=a.author').length) {
			ui.cancel_event(e);
			var m = ui.popup_menu([ff.post_menus, ff.author_menus],
					e.target);
			m[0]._post = t.f('<.post')[0];
			return;
		}
	},

	table_click: function(e) {
		function cell_idx(x) {
			var p = x.f('<');
			var ch = p.f('>');
			for (var i = 0; i < ch.length; i++) {
				if (ch[i] == x[0]) return i;
			}
		}
		function sort_by_header(th, rows) {
			var func, idx, cmp;

			function n(a, b) { return a._sort_by - b._sort_by }
			function s(a, b) { return a._sort_by.localeCompare(b._sort_by) }
			if (func = th[0].sort_v) {
				rows._map(function(x) {
					x._sort_by = func(x);
				});
			} else {
				idx = cell_idx(th);
				if (th.f('=.n').length) {
					rows._map(function(x) {
						x._sort_by = parseInt(x.children[idx].textContent);
					});
				} else {
					rows._map(function(x) {
						x._sort_by = '__' + x.children[idx].textContent;
					});
				}
			}
			rows.sort(th.f('=.n').length ? n : s);
			var dir = !th[0].sor_dir;
			th.f('<').f('>.th')._map(function(x) {delete x.sor_dir});
			if (dir)
				rows.reverse();
			th[0].sor_dir = dir;
			return rows;
		}

		var t = $(e.target).f('=.th');
		if (t.length) {
			var rows = sort_by_header(t, t.f('<.table').f('.tr'));
			t.f('<.table').f('.tbody').a(rows);
			return;
		}

		t = $(e.target).f('=.td');
		if (t.length) {
			var row = t.f('<.tr')[0];

			var s = t.f('=.cell-idx');
			if (s.length) {
				ui.goto_item(row._link);
				return;
			}

			s = t.f('=.cell-show');
			if (s.length) {
				p = row._link;
				p.info.show ++;
				if (p.info.show > 2) p.info.show = 0;
				ff.post_show(p);
				return;
			}

			s = t.f('=.cell-hl');
			if (s.length) {
				row.info.hl = row.info.hl ? 0 : 1;
				ff.post_hl(row._link);
				return;
			}

			s = t.f('=.cell-lz');
			if (s.length) {
				ff.author_toggle_lz(row.info.author);
				return;
			}
		}
	},

	posts_by_author: function(a) {
		return ff.all_posts().grep(function(p) {
			return p.info.author == a
		});
	},

	table_dblclk: function(e) {
		var t = $(e.target).f('<.tr');
		var tb = t.f('<.tbody');
		var l = tb.f('>');
		if (!e.ctrlKey)
			l.at('selected', '');
		l.grep(function(x) {
			return x.info.author == t[0].info.author
		}).at('selected', 1);
	},

	// functions for processing posts
	post_filter: function(p) {
	},

	post_set_lz_info: function(p) {
		p.info.lz = ff.lz_list[p.info.author];
	},

	post_set_state: function(p) {
		ff.post_set_lz_info(p);
		if (p.info.del) {
			ff.post_delete(p);
			return;
		}
		var lnk = wjo(p._link);
		lnk.cell.lz.textContent = '　♛'[p.info.lz ? 1 : 0];
		switch (ff.lz_list[p.info.author]) {
		case 1:
			$(lnk.cell.lz).at('lz', 1);
			ff.post_add_icon(p, '♛', '.lz-icon.fr', { title: '楼主' });
			break;
		case 2:
			$(lnk.cell.lz).at('lz', 2);
			ff.post_add_icon(p, '♛', '.lz-equiv.fr', { title: '准楼主' });
			break;
		default:
			$(lnk.cell.lz).at('lz', '');
			ff.post_remove_icon(p, '.lz-equiv');
		}
		ff.post_filter(p);
		ff.post_show(p);
		ff.post_hl(p);
	},

	post_show: function(p) {
		var show = ((p.info.show == 1) || (
			(p.info.len - pref.length_limit >= 0) &&
				(p.info.show != 2) &&
				((pref.show_all == 1) || p.info.lz)
			)) ? 1 : '';
		var lnk = wjo(p._link);
		lnk.cell.show.textContent = '　✓✗'[p.info.show];
		$(p, lnk).at('show', show);
	},

	post_hl: function(p) {
		var hl = ((p.info.hl == 1) || (p.info.lz && (pref.hl_lz == 1))) ? 1 : '';
		var lnk = wjo(p._link);
		$(p, lnk).at('hl', hl);
		lnk.cell.hl.textContent = (hl ? '♥':'　');
	},

	post_update_all: function() {
		ff.all_posts()._map(function(p) { ff.post_set_state(p) });
	},

	post_delete: function(p) {
		var pg = $(p).f('<');
		var lnk = wjo(p._link);
		$(p, lnk).r();
		delete lnk._link;
		delete p._link;
		if (pg[0] &&! -- pg[0]._posts)
			ff.remove_page(pg.at('page_idx'));
	},

	author_toggle_lz: function(a) {
	try {
		console.log('toggle lz of ' + a + ': ' + ff.lz_list[a]);
		switch (ff.lz_list[a]) {
		case 1:
			return;
		case 2:
			delete ff.lz_list[a];
			break;
		default: ff.lz_list[a] = 2;
		}

		ff.posts_by_author(a)._map(function(p) {
			ff.post_set_state(p);
		});
	} catch(e) { console.log(e) }
	},

	post_add_icon: function(p, icon, tag, attr) {
		var h = $(p).f('>.post-head');
		if (h.f(tag).length) return;
		h.a($('+span.post-icon' + tag, icon, attr));
	},

	post_remove_icon: function(p, icon_tag) {
		var h = $(p).f('>.post-head');
		h.f('>' + icon_tag).r();
	},

	get_menu_post: function(e) {
		return $(e.target).f('<.menu-popup')[0]._post;
	},

	post_menus:	[{
			icon:	'✗',
			icon_attr: {style: 'color: maroon' },
			label:	'隐藏帖子',
			func:	function(e) {
				var p = ff.get_menu_post(e);
				p.info.show = 2;
				ff.post_show(p)
			}
		},
		{
			icon:	'♥',
			icon_attr: { style: 'color: purple' },
			label:	'高亮帖子',
			func:	function(e) {
				var p = ff.get_menu_post(e);
				p.info.hl = p.info.hl ? 0 : 1;
				ff.post_hl(p);
			}
		},
		{
			icon:	'✂',
			label:	'删除帖子',
			label_attr: { style: 'color: maroon' },
			func:	function(e) {
				if (ui.check_ctrl(e))
					ff.post_delete(ff.get_menu_post(e));
			}
		},
	],

	author_menus:	[{
			icon:	'☠',
			icon_attr: {style: 'color: maroon' },
			label:	'不看此人',
			func:	function(e) {
				var p = ff.get_menu_post(e);
				ff.posts_by_author(p.info.author)._map(function(x) {
					x.info.show = 2;
					ff.post_show(x);
				});
			}
		},
		{
			icon:	'❤',
			icon_attr: { style: 'color: red; text-shadow: 0 0 1px black' },
			label:	'高亮作者',
			func:	function(e) {
				var p = ff.get_menu_post(e), sum = 0, hl;
				var ps = ff.posts_by_author(p.info.author);
				ps._map(function(x) { sum += x.info.hl ? 1 : 0 });
				hl = (sum < ps.length ? 1 : '');
				ps._map(function(x) {
					x.info.hl = hl;
					ff.post_hl(x);
				});
			}
		},
		{
			icon:	'♛',
			icon_attr: {style: 'color: green'},
			label:	'楼主待遇',
			func:	function(e) {
				var au = ff.get_menu_post(e).info.author;
				ff.author_toggle_lz(au);
			}
		},
		{
			icon:	'✄',
			icon_attr: {style: 'color: red'},
			label:	'删除此人',
			label_attr: { style: 'color: maroon' },
			func:	function(e) {
				if (ui.check_ctrl(e)) {
					var au = ff.get_menu_post(e).info.author;
					ff.posts_by_author(au)._map(function(x) {
						ff.post_delete(x);
					});
				}
			}
		},
	],

	page_link_window: function(e) {
		ui.cancel_event(e);
		return ui.popup_window({
			title: '分页',
			tag:	'#page-list',
			attr:	{
			},
			func:	function() {
				var l = [];
				for (var i = 1; i <= ff.n_pages; i++) {
					if (ff.pages[i])
						l.push($('+span.subpage', i));
					else
						l.push($('+a.subpage', i, {
							href: ff.url_gen(i)
						}));
				}
				return l;
			},
		}, e.target, true).e('click', function(e) {
			var t = $(e.target);
			if (t.f('=a.subpage').length) {
				ui.cancel_event(e);
				ff.go_page(t.txt());
			} else if (t.f('=span.subpage').length) {
				ui.goto_item(ff.pages[t.txt()].page.f('@.page-no')[0]);
			}
			ui.unpop();
		}, true);
	},

	option_css: {},
	add_opt_css: function(name, content) {
		ff.option_css[name] = content;
		var t = [];
		for (var i in ff.option_css) {
			t.push(ff.option_css[i]);
		}
		$('@head').f('&style#opt-css').txt(t.join(''));
	},
}

function ff_startup() {
	ff.add_opt_css('img-css', 'img {max-width: 100% }');
	pref.decl('post_width', 'int', 45, ff.set_post_width);
	pref.decl('show_all', 'bool', true);
	pref.decl('hl_lz', 'bool', false);
	pref.decl('length_limit', 'int', 0);
	pref.decl('bar_on_top', 'bool', false, function(v) {
		$('#bar-wrapper').at('on_top', v ? 1 : '');
		ui.set_panel_pos($('.panel'));
	});
	pref.decl('bar_fixed', 'bool', true, function(v) {
		$('#main-tools').at('auto_hide', v ? '' : 1)
	});
	pref.decl('use_black', 'bool', false, function(v) {
		ff.add_opt_css('#black-css', v ? css_black : '');
	});
}


// only go to bookmark ever once
var been_to_bookmark = false;

function checkstate(e) {
try {
	var r = $(e.target)[0];
	switch(r.readyState) {
	case 0:
	case 1:	break;
	case 2:	r.content_len = r.getResponseHeader('Content-Length');
		r.reset_timer();
		break;
	case 3: r.reset_timer();
		r.set_progress(r.responseText.length);
		break;
	case 4:	r.reset_timer(true);
		r.finish_up();
	}
} catch(ee) { console.trace(ee) }
}

// the class inheritance is very wrong
var bg_proto = {
	finish_up: function() {
		var r = $(this)[0];
		if (r.progress_bar) {
			r.progress_bar.r();
			delete r.progress_bar;
		}
		if (! r._canceled) {
			var s = r.responseText
				.replace(/\n/g, ' ')
				.replace(/^.*?<body[^>]*>/i, '')
				.replace(/<\/body.*$/, '')
				.replace(/<!--.*?-->/g, '');
			var div = $('+div', '', {page_idx: r.page_idx});
			div[0].innerHTML = s;
			div.f('head, style, link, script').r();
			var pg = ff.get_current_page(div);
			pg.idx = r.page_idx;
			delete ff.bg_loaders[r.page_idx];

			if (pg.page.f('.post').length) {
				ui.info_box('载入第'+r.page_idx +'页');
				check_post_limit(pg);
			} else {
				console.log('载入第'+r.page_idx +'页不成功');
			}
		}
		delete r;
	},

	start_loading: function() {
		var r = $(this)[0];
		var sendstr = null;

		if (ff.stupid_form) {
			var x = ff.pageform.f('#pID');
			if (!x.length) {
				ui.info_box("Don't know how to load page " + r.page_idx);
				return;
			}
			x[0].value = r.page_idx;

			sendstr = ff.pageform.f('input')._map(function(x) {
					return x.name + '=' + encodeURIComponent(x.value)
				}).join('&');

			r.open('POST', location.href, true);
			r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			r.setRequestHeader("Content-length", sendstr.length);
			r.setRequestHeader("Connection", "close");
			r.setRequestHeader("Cache-Control", "public");
		} else {
			r.open('GET', ff.url_gen(r.page_idx), true);
		}

		r.onreadystatechange = checkstate;

		if (document.inputEncoding != 'UTF-8')
			//They can't even do 18030, it's really GBK. Shame.
			r.overrideMimeType("text/html; charset=GB18030");

		r.set_progress(0);
		r.reset_timer();
		r.send(sendstr);
	},

	set_progress: function(p) {
		var r = $(this)[0];
		if (!r.progress_bar) {
			var x = $('+div.loader');
			$(document.body).f('&div#all-loaders').a(x);
			var r = r;
			x.a($('+div.progress-bar').a($('+div.progress-progress')))
			.a($('+div.progress-ctrl')
				.a($('+span.fr', '✗', {style: 'color: maroon', title: '取消'})
					.e('click', function(e) { r.cancel() })
				)
				.a($('+span.fr', '♼', {style: 'color: green', title: '重新载入'})
					.e('click', function(e) { r.restart() })
				)
				.a($('+span', '第'+ r.page_idx + '页'))
			);
			r.progress_bar = x;
		}
		var bar = r.progress_bar.f('div.progress-progress');
		if (p != 0) {
			if (!r.content_len) p = 50;
			else {
				p /= (r.content_len / 100);
				if (p > 100) p = 95;
			}
		}
		bar.at('style', 'width: ' + p + 'px');
	},
	cancel: function() {
		var r = $(this)[0];
		r._canceled = 1;
		r.reset_timer(true);
		if (r.progress_bar)
			r.progress_bar.r();
		delete ff.bg_loaders[r.page_idx];
		r.abort();
	},
	restart: function() {
		var r = $(this)[0];
		ui.info_box('重试页'+r.page_idx);
		r.cancel();
		load_page(r.page_idx);
	},
	reset_timer: function(norestart) {
		var r = $(this)[0];
		if (r._timer) {
			clearTimeout(r._timer);
			delete r._timer;
		}
		if (norestart || r._canceled) return;
		r._timer = setTimeout(function() { r.restart() }, 3000);
	},
}

XMLHttpRequest.prototype = {};

function bgLoader(idx) {
	var r = (new XMLHttpRequest()).wrappedJSObject;
	for (var f in bg_proto)
		r[f] = bg_proto[f];
	r.page_idx = idx;
	r.start_loading();
}

function load_page(idx) {
	console.log('load_page: ' + idx);
	if (!ff.bg_loaders[idx])
		ff.bg_loaders[idx] = new bgLoader(idx);
	else
		console.log('already loading');
}

function check_post_limit(new_pg) {
	var l = $('@#content').f('>.page');
	var sum = 0;
	l._map(function(p) { sum += p._posts });
	sum += new_pg.page.f('>.post').length;

	var del = null;
	if (sum > pref.max_posts) {
		if (del = first_visible_post()) {
			for (var i = 0; i < del.can.length && sum > pref.max_posts; i ++, sum --)
				ff.post_delete(del.can[i]);
		}
	}
	ff.add_page(new_pg);
	if (del) {
		var pos = document.documentElement.scrollTop - del.first.offsetTop;
		document.documentElement.scrollTop += del.pos - pos;
	}
	check_load_bm();
}

function first_visible_post() {
	var l = $('@#content').f('>.page').f('>.post');
	var scroll = document.documentElement.scrollTop;
	var can_del = [], pos = null, first;
	for (var i = 0; i < l.length; i++) {
		if (l[i].offsetTop + l[i].offsetHeight - scroll > 0) {
			first = l[i];
			pos = scroll - first.offsetTop;
			break;
		}
		can_del.push(l[i]);
	}
	if (!first) return null;

	var vis = [], invis = [];
	vis = can_del.grep(function(p) { return p.getAttribute('show') }, invis);
	invis.app(vis);
	return {can:invis, first:first, pos: pos};
}

function add_page_control(pg) {
	var h = pg.page.f('@.page-no');
	h.a($('+span.page-disp', '☀', {title: '开关'}).e('click', function(e) {
			$(e.target).f('<.page').at('!hide');
		})
	).a($('+span.page-reload', '♻', {title: '重新加载'}).e('click', function(e){
			load_page(pg.idx);
		})
	).a($('+span.page-kill', '✘', {title: '删除分页'}).e('click', function(e) {
			if (!ui.check_ctrl(e)) return;
			ff.remove_page(pg.idx);
		})
	)
}

ff.bg_loaders = {};
var old_go_page = null;
pref.decl('use_one_page', 'bool', true, function(v) {
	if (v) {
		if (old_go_page) return;
		old_go_page = ff.go_page;
		ff.go_page = load_page;
	} else {
		if (ff.go_page != load_page) return;
		ff.go_page = old_go_page;
		old_go_page = null;
	}
});
pref.decl('max_posts', 'int', 2000);

function scroll_watch(e) {
	var c = $('#content')[0];
	if (!c) return;
	var page = c.lastChild;
	if (!page || !$(page).f('=.page')) return;
	var y = document.documentElement.scrollTop;
	if (y == 0) return;
	if (page.offsetTop < y + 2 * window.innerHeight) {
		var idx = $(page).at('page_idx') * 1+ 1;
		if (idx > 0 && idx <= ff.n_pages)
			load_page(idx);
	}
}

pref.decl('auto_load_page', 'bool', true, function(v) {
	$(window).e((v ? '+' : '-') + 'scroll', scroll_watch, false);
});

ff.prefs_hook.push(function() {
	var x = ui.prefs_group('一页看帖', [
		ui.check_box({
			label: '启用一页看帖',
			value: pref.use_one_page,
			func: function(e) {
				pref.use_one_page = e.target.checked ? 1 : 0;
			},
			block: 1
		}),
		ui.check_box({
			label: '自动调入下页',
			value: pref.auto_load_page,
			func: function(e) {
				pref.auto_load_page = e.target.checked ? 1 : 0;
			},
			block: 1
		}),
		ui.check_box({
			label: '自动调入书签',
			value: pref.auto_load_bookmark,
			func: function(e) {
				pref.auto_load_bookmark = e.target.checked ? 1 : 0;
			},
			block: 1
		}),
		ui.text_box({
			tag:	'#max-posts',
			before:	'最多保留',
			after:	'帖',
			value:	pref.max_posts,
			size:	4,
			func:	function(e) {
				var x = e.target;
				if (! x.value.match(/^\d+$/)) {
					x.value = pref.max_posts;
					return;
				}
				pref.max_posts = x.value;
			}
		}),
	]);
	return x;
});

// bookmark stuff
pref.decl('auto_load_bookmark', 'bool', true);
pref.decl('all_bookmarks', 'obj', {}, null, true);
ff.post_menus.push({
	icon: '★',
	icon_attr: { style: 'color: yellow; text-shadow: 0 0 1px black' },
	label: '书签',
	func: function(e) {
		var p = ff.get_menu_post(e);
		set_bookmark(p);
	},
});
function get_bookmark_post() {
	return $('.bookmark-icon').f('<.post');
}
function bm_title() {
	return '[' + ff.board_links.item(-1).txt() + ']' + ff.title;
}
function set_bookmark(p) {
	$('@#bookmarked').at('id', '')._map(function(x) {
		ff.post_remove_icon(x, '.bookmark-icon');
	});
	p.id = 'bookmarked';
	ff.post_add_icon(p, '★', '.bookmark-icon', {
		style: 'color: yellow; text-shadow: 0 0 2px black',
		title: '书签'
	});
	var bm = pref.all_bookmarks;
	var title = bm_title();

	if (! bm[title]) bm[title] = {};
	bm[title].url = (ff.stupid_form ? location.href : ff.url_gen(p.info.page));
	bm[title].page = p.info.page;
	bm[title].post = p.info.idx;
	bm[title].lz = ff.lz_list;

	pref.all_bookmarks = bm;
	update_bm_panel();
	been_to_bookmark = true;
}
function remove_bookmark(title) {
	var bm = pref.all_bookmarks;
	delete bm[title];
	pref.all_bookmarks = bm;
}
function bm_panel() {
	var p = $('+div.flex#bm-list').e('click', ui.single_select);
	update_bm_panel(p);
	return p;
}
function update_bm_panel(p) {
	if (!p) p = $('@#bm-list');
	if (!p.length) return;
	p.f('>').r();
	var bm = pref.all_bookmarks;
	var topics = [];
	for (var title in bm) topics.push(title);
	topics.sort();
	var cur = bm_title();
	topics._map(function(title) {
		p.a($('+div.sel-item.bm-item' + (title == cur ? '#cur-bm' : ''),
			title).a(bm_link(bm[title], title)));
	})
}
function bm_link(x, title) {
	return [$('+a', x.page + '-' + x.post, {href: x.url})
		.e('click', function(e) { if (goto_bm(title, x.page, x.post)) ui.cancel_event(e) }, true),
		$('+a', '删除').e('click', function(e) {
			if (!ui.check_ctrl(e)) return;
			var bm = pref.all_bookmarks;
			delete bm[title];
			pref.all_bookmarks = bm;
			update_bm_panel();
		})
	];
}
function goto_bm(title, page, post) {
	console.log('goto bm(' + [title, page, post].join(', ') + ')');
	if (title == bm_title()) { // same topic, just load sub page
		if (!ff.pages[page]) {
			ff.go_page(page);
			return true;
		}
		var p = ff.pages[page].page.f('.post');
		for (var i = 0; i < p.length; i++) {
			if (p[i].info.idx == post) {
				set_bookmark(p[i]);
				ui.goto_item(p[i]);
				break;
			}
		}
		been_to_bookmark = true;
		return true;
	}
	return false;
}
function check_load_bm() {
	if (pref.auto_load_bookmark && !been_to_bookmark) {
		var t = bm_title();
		var bm = pref.all_bookmarks[t];
		if (bm) {
			var need_update = false;
			if (bm.lz)
				for (var a in bm.lz) {
					if (! ff.lz_list[a]) {
						need_update = true;
						ff.lz_list[a] = bm.lz[a];
					}
			}
			if (need_update)
				ff.post_update_all();

			goto_bm(t, bm.page, bm.post);
		}
	}
}
function bm_button() {
	$('@#panel-btns').a(ui.panel_button({
		tag:	'#bm-panel',
		icon:	'★',
		title:	'书签',
		func:	bm_panel,
		auto_del: 1
	}));
}
// end bookmark stuff

// activate pref procs (and walk around stupidity of greasemonkey)

if (pref.use_one_page) {
	['use_one_page', 'auto_load_page', 'all_bookmarks'].forEach(function(x) { pref[x] = pref[x] });
	ff.add_opt_css('loader-progress', '#all-loaders { font-size: small; position: fixed; right: 1ex; top: 2em } .loader { text-align: left; padding: 4px; border: 1px solid transparent } .loader:hover{ background: white; border-color: gray } .progress-bar { border: 1px solid gray; height: 20px; width: 100px;background: rgba(128,128,128,.3) } .loader:not(:hover) .progress-ctrl { display: none; padding: .5ex 0 } .progress-ctrl > span.fr { padding-left: 1ex; cursor: pointer } .progress-progress { background: #cdf; border-right: 1px solid gray; height: 100%; display: inline-block; } .page-reload { color: green } .page-kill { color: red } .page-disp { color: gold } .page-no > span { text-shadow: 0 0 1px black; padding-left: 1em; cursor: pointer } .page[hide] {/* for webkit */} .page[hide] > div.post, .page[hide] > div.post[show] { display: none } .page[hide] .page-disp { color: gray } #bm-panel {width: 20em; word-wrap: break-word} .bm-item { padding: 1ex; text-align: justify; border-bottom: 1px solid #aaa} #bm-panel-toggle {color: gray; background-color: #dda} #bm-panel-toggle:hover, #bm-panel-toggle[active] {background-color: yellow; color: brown} .bm-item > a { padding: 0 1ex; text-decoration: underline; cursor:pointer} #cur-bm { background: #cfc }');
	ff.pre_insert.push(add_page_control);
	ff.post_insert.push(check_load_bm);
	ff.more_ui.push(bm_button);
}

pref.decl('use_img_view', 'bool', false);
pref.decl('img_thumb_size', 'int', 160);

var nocontent = 0;
var img_seen = {};

function set_grid_btn(l) {
	if (l) {
		$('#img-grid-button').at({active: 1, title: '图片：' + l});
	} else {
		$('#img-grid-button').at({active: '', title: '图片：无'});
	}
}

function thumb_load(e) {
	var t = $(e.target);
	var w = t[0].width, h = t[0].height;
	t[0]._orig_w = w;
	t[0]._orig_h = h;
	var ts = pref.img_thumb_size;
	t.at({style: 'max-width:' + ts + 'px; max-height:'+ts + 'px', 'class':'thumb',
		title: w + ' × ' + h});

	if ((w > ts || h > ts) && !img_seen[t[0].src]) {
		img_seen[t[0].src] = 1;
		t[0]._good = 1;
		var a = t.f('<a');
		a.at({href: t[0].src}).e('click', img_click, true);
		set_grid_btn(good_imgs().length);
	}
}

function schedule_thumbnail(x) {
	var b;
	var a = $('+div.img-frame').a(b = $('+a.img-thumb', '', { href: null }));
	$(x).f('<').i(a, x);
	var p = a[0].previousSibling;
	var l;

	if (p && $(p).f('=p:not(.sep)').length && ((l = p.textContent.length) < 240)) {
		p.className = 'caption';
		x._caption = p;
		if (l > 64) {
			[p, b[0]].at('style', 'display: inline-block; vertical-align: top');
			[p].at('style', 'width:' + (l / 8) + 'em; margin-left: 1ex');
		} else {
			[p].at('style', 'margin-top: 1ex');
		}
		a.a(p);
	}

	b.a(x);

	$(x).e('load', thumb_load);
	x.src = x.src;
}

function replace_imgs(pg) {
	pg.page.f('img')._map(schedule_thumbnail);
}


// img viewing stuff
function make_canvas(img) {
	if (img._canvas) return img._canvas;
	var c = $('+canvas');
	var f = $('+a.img-frame', '', {href:img.src}).a(c);
	img._canvas = f[0];

	if (img._caption)
		c.at('title', img._caption.textContent);
	c[0]._img = img;

	var s = pref.img_thumb_size;
	var scale = s / img._orig_w;
	if (scale * img._orig_h > s)
		scale = s / img._orig_h;
	var w = img._orig_w * scale, h = img._orig_h * scale;
	c.at({height: h, width: w});

	setTimeout(function() {c[0].getContext('2d').drawImage(img, 0, 0, w, h)}, 0);
	return img._canvas;
}

function img_grid_click(e) {
	var x = $(e.target);
	if (x.f('=canvas').length) {
		ui.cancel_event(e);
		view_start([x[0]._img]);
	}
	else
		img_grid_off();
}

function img_grid_on() {
	if ($('#img-grid').length) return;
	var l = good_imgs();
	set_grid_btn(l.length);
	if (!l.length) return;
	hide_content(true);
	var grid = $('+div#img-grid', '', {style: 'position: fixed; left: 0; right: 0; top: 0; bottom: 0; overflow-y: auto; background: gray; text-align:center'})
		.e('click', img_grid_click, true);
	$('@body').a(grid);
	grid.a(l._map(make_canvas));
}

function img_grid_off() {
	$('@#img-grid').r();
	hide_content(false);
}

function img_click(e) {
	ui.cancel_event(e);
	var t = [e.target].f('=a');
	if (!t.length)
		t = [e.target].f('<a');
	view_start(t.f('>img'));
}

var content_scroll;
function hide_content(hide) {
	if (hide)
		nocontent ++;
	else
		nocontent --;
	if (hide && (1 == nocontent)) {
		content_scroll = document.documentElement.scrollTop;
		$('@#content').at({style: 'display:none'});
	} else if (!nocontent) {
		$('@#content').at({style: 'display:'});
		document.documentElement.scrollTop = content_scroll;
	}
}

function view_start(im) {
	if (!im.length) return;
	var v = $('@#img-viewer');
	if (!v.length) {
		v = $('+div#img-viewer', '', {
			style: 'position: fixed; top: 0; left: 0; bottom: 0; right: 0; background:#666'
		})
		.e('click', view_click);
		hide_content(true);
		v.a($('+img#viewed', '', 
			{style: 'display: inline-block; max-height: 100%; max-width: 100%; position:fixed; top: 0; bottom: 0; left: 0; right: 0;margin: auto'}
		))
		.a($('+div.img-desc'));
		$('@body').a(v);
		$(window)
			.e('DOMMouseScroll', on_wheel, true)
			.e('keydown', on_key, true);
	}

	v.f('.img-desc').txt(im[0]._caption ? im[0]._caption.textContent : '');
	v.f('#viewed').at({src: im.at('src')});
}

function good_imgs() {
	return $('@#content').f('img').grep(function(x) { return x._good });
}

function find_current_img(list) {
	var im = $('@#viewed');
	if (im.length)
		for (var i = 0; i < list.length; i++)
			if (list[i].src == im[0].src)
				return i;
	return null;
}

function next_img() {
	var l = good_imgs();
	var i = find_current_img(l);
	if (i === null) return;
	if (i < l.length)
		view_start([l[i + 1]]);
}

function prev_img() {
	var l = good_imgs();
	var i = find_current_img(l);
	if (i === null) return;
	if (i > 0) view_start([l[i - 1]]);
}

function view_click(e) {
	if (e.clientX < window.innerWidth * .2)
		prev_img();
	else if (e.clientX > window.innerWidth * .8)
		next_img();
	else
		view_stop();
}

function on_wheel(e) {
	ui.cancel_event(e);
	if (e.detail < 0)
		prev_img();
	else
		next_img();
}

function on_key(e) {
	switch(e.which) {
	case 37:
	case 38:
		ui.cancel_event(e);
		prev_img();
		break;
	case 32:
	case 39:
	case 40:
		ui.cancel_event(e);
		next_img();
		break;
	case 27:
		ui.cancel_event(e);
		view_stop();
		break;
	}
}

function view_stop() {
	$('@#img-viewer').r();
	hide_content(false);
	$(window)
		.e('-DOMMouseScroll', on_wheel, true)
		.e('-keydown', on_key, true);
}

function img_grid_button() {
	ff.add_opt_css('img-css', '.img-thumb, .img-frame { display: inline-block; vertical-align: top} .img-thumb { vertical-align:middle; display: table-cell; text-align: center; overflow: hidden } .img-frame { font-size: small; margin: 3px; padding: 3px; border: 1px solid gray } p.caption {line-height: normal; text-indent: 0; } .img-thumb { width:'+pref.img_thumb_size +'px; max-height:'+pref.img_thumb_size+'px} p.caption { width:'+pref.img_thumb_size+'px} #viewed {-moz-box-shadow: 4px 4px 8px black} #img-grid-button[active] { background-color: lime} canvas { -moz-box-shadow: 2px 2px 5px black } #img-grid, #img-viewer { z-index: 200; padding: 1em } .img-desc { padding: 1ex; opacity: 0; background: black; color: white; position: fixed; bottom: 0; left: 0; right: 0; text-align: center} .img-desc:hover { opacity: .9}');
	return $('@#toggle-btns').a(ui.toggle_button(
		'#img-grid-button', '▦',
		function(b, on) {
			img_grid_on();
		}, 0)
	);
}

ff.prefs_hook.push(function() {
	return ui.prefs_group('图片浏览', [
		ui.check_box({
			label: '启用图片浏览',
			value: pref.use_img_view,
			func: function(e) {
				pref.use_img_view = e.target.checked ? 1 : 0;
			},
			block: 1
		}),
		ui.text_box({
			tag:	'#thumb-size',
			before:	'图标尺寸',
			after:	'像素',
			value:	pref.img_thumb_size,
			size:	4,
			func:	function(e) {
				var x = e.target;
				if (! x.value.match(/^\d+$/)) {
					x.value = pref.img_thumb_size;
					return;
				}
				pref.img_thumb_size = x.value;
			}
		}),
	]);
});

if (pref.use_img_view) {
	ff.more_ui.push(img_grid_button);
	ff.pre_insert.push(replace_imgs);
}
var in_editing = false;
var filter_func = null;

var re_matcher = /["'\[\]\{\}\\.*+?\-^$():\/]/;
var author_tags, tagged, re_names = {};

pref.decl('post_filter_rules', 'obj', []);
pref.decl('author_tags', 'obj', {});

ff.add_opt_css('filter-css', '#filter-panel { min-width: 12em } #r-editor { display: inline-block; position: fixed; bottom: 2em; right: 2em; z-index: 199; margin: auto; padding: 1ex; background: #cdf; text-align: left} .r-item { min-width: 30em; } .r-section { padding-bottom: 1ex; margin-bottom: 1ex; border-bottom: 1px solid #aaa} .r-del { color: maroon;margin-right: 1em } [bad_input] { outline: 2px solid red } #tags-editor {display: table-row } .tag-half { display: table-cell; width: 15em; padding: 2px } .tag-list { width: 100%; height: 20em; border: 1px solid gray} #tag-new { width: 14em } .filter-rule[na] { color: gray } #tag-names, #tag-tags { overflow: auto }');

function load_tags() {
	var tags = pref.author_tags;
	author_tags = {};
	tagged = {};

	for (var x in tags) {
		for (var n in tags[x]) {
			if (n.match(re_matcher)) {
				if (!re_names[n])
					re_names[n] = {'_pat': new RegExp(n) }
				re_names[n][x] = 1;
			} else {
				if (!author_tags[n]) author_tags[n] = {};
				author_tags[n][x] = 1;
			}
		}
	}
}

load_tags();

function author_tag_match(a, t) {
	if (tagged[a]) {
		return author_tags[a][t];
	}
	if (!author_tags[a]) author_tags[a] = {};
	for (var r in re_names) {
		if (!a.match(re_names[r]._pat))
			continue;

		for (var x in re_names[r]) {
			if (x == '_pat') continue;
			author_tags[a][x] = 1;
		}
	}
	tagged[a] = 1;
	return author_tags[a][t] ? true : false;
}

function rules_filter(pg) {
	compile_all_rules();
	if (!filter_func) return;
	pg.page.f('>.post')._map(function(x) {
		filter_func(x, author_tag_match);
	});
}

function empty_rule() {
	return {
		name:'新...',
		board:[],
		post:[],
		use:1,
		stop: 0,
		hl: 0,
		disp: 0,
		use: 1,
	};
}

function rules_panel() {
	var r = pref.post_filter_rules;
	return [
		$('+div.flex#rules-list')
			.a(r._map(rule_list_item))
			.e('click', ui.single_select),
		$('+div').a([
			ui.text_button('', '新规则', function(e) {
				if (in_editing) return;
				in_editing = true;
				var nitem = rule_list_item(empty_rule());
				nitem[0]._new = 1;
				$('#rules-list').a(nitem);
				rules_editor(nitem);
			}),
			ui.text_button('', '编辑', function(e) {
				if (in_editing) return;
				var x = $('#rules-list').f('[selected]');
				if (!x.length) return;
				rules_editor(x);
				in_editing = true;
			}),
			ui.text_button('', '删除', function(e) {
				if (!ui.check_ctrl(e)) return;
				$('#rules-list').f('[selected]').r();
				save_ui_rules();
			}, {style:'color: maroon'}),
			ui.text_button('', '▲', move_up),
			ui.text_button('', '▼', move_down),
			ui.text_button('', '♻', refilter,
				{title: '从新过滤', style:'color: green'}),

			ui.text_button('', '标签', function() {tags_editor() }),
		]),
	];
}

function save_ui_rules() {
	pref.post_filter_rules = $('#rules-list').f('>.filter-rule')._map('=$_._rule');
	compile_all_rules();
}

function refilter() {
	if (!filter_func) return;
	$('.post')._map(function(x) {
		x.info.hl = x.info.show = 0;
		filter_func(x, author_tag_match);
		ff.post_set_state(x);
	})
}

function move_up() {
	if (in_editing) return;
	var sel = $('#rules-list').f('[selected]');
	if (!sel.length) return;
	var up = sel[0].previousSibling;
	if (!up) return;
	sel.f('<').i(sel, up);
	save_ui_rules();
}

function move_down() {
	if (in_editing) return;
	var sel = $('#rules-list').f('[selected]');
	if (!sel.length) return;
	var down = sel[0].nextSibling;
	if (!down) return;
	sel.f('<').i(down, sel);
	save_ui_rules();
}

function rule_list_item(r) {
	var item = $('+div.sel-item.filter-rule')
		.a($('+input[type=checkbox]')
			.at('checked', r.use == 1? 1 : '')
			.e('click', toggle_use)
		).a($('+text', r.name));
	item[0]._rule = r;
	if (!rule_applicable(r))
		item.at('na', 1);
	return item;
}

function toggle_use(e) {
	var t = $(e.target);
	var r = t.f('<.filter-rule');
	r[0]._rule.use = e.target.checked ? 1 : 0;
	save_ui_rules();
}

function filter_ui() {
	$('@#panel-btns').a(ui.panel_button({
		tag:	'#filter-panel',
		icon:	'✔',
		title:	'选帖规则',
		func:	rules_panel,
		auto_del:	1,
	}));

	ff.author_menus.push({
		icon:	'★',
		icon_attr: {style: 'color: orange; text-shadow: 0 0 1px black'},
		label:	'标签...',
		func:	function(e) {
			var p = ff.get_menu_post(e);
			tags_editor(p.info.author);
		}
	});
}

function make_match_statement(a, op, b) {
	var x = a + '.match(' + (new RegExp(b)) + ')';
	if (op == '=~')
		return x;
	return '!' + x;
}

function compile_all_rules() {
	var rs = pref.post_filter_rules.grep(rule_applicable).grep('=$_.use');
	var code = [], txt = false;
	for (var i = 0; i < rs.length; i++) {
		var r = compile_rule(rs[i]);
		if (r[1])
			txt = true;
		code.push(r[0]);
	}
	if (txt)
		code.unshift('var t = p.lastChild.textContent;');

	filter_func = new Function('p, tag_match', code.join('\n'));
}

function compile_rule(r) {
	var conds = ['if (true'];
	var req_txt = false;
	var s;
	for (var i = 0; i < r.post.length; i++) {
		var x = r.post[i];

		switch(x.arg) {
		case 'author':
			switch (x.op) {
			case 'lz':	s = 'p.info.lz == 1'; break;
			case 'notlz':	s = 'p.info.lz != 1'; break;
			case '=~':
			case '!~':	s = make_match_statement('p.info.author', x.op, x.regex);
					break;
			case '==':	s = 'p.info.author == ' + JSON.stringify(x.str);
					break;
			default:	s = '';
					continue;
			}
			break;
		case 'author_tag':
			s = 'tag_match(p.info.author, ' + JSON.stringify(x.tag) + ')';
			if (x.op == '!~')
				s = '!' + s;
			break;
		case 'post_length':
			s = 'p.info.len ' + x.op + x.num;
			break;
		case 'images':
			s = 'p.info.imgs ';
			switch(x.op) {
			case 'zero':	s += '== 0'; break;
			case 'notzero':	s += '!= 0'; break;
			default:
				s = '';
				break;
			}
			break;
		case 'post_content':
			req_txt = true;
			s = make_match_statement('t', x.op, x.regex);
			break;
		}

		if (s) conds.push('(' + s + ')');
	}

	var oper = [];
	var done = false;

makeops: do {
		switch(r.disp - 0) {
		case 1:
		case 2:	oper.push('p.info.show = ' + r.disp + ';'); break;
		case 3:
			oper.push('p.info.del = 1; return;');
			break makeops;
		}

		switch (r.hl - 0) {
		case 1:
		case 2:	oper.push('p.info.hl = ' + r.hl + ';'); break;
		}

		if (r.stop == 1) {
			oper.push('return;');
		}
	} while (0);

	return [conds.join('&&') + ') {' + oper.join('') + '}', req_txt];
}

function tags_editor(name) {
	if (in_editing) return;
	in_editing = true;

	var tags = JSON.parse(JSON.stringify(pref.author_tags));
	var authors = {};
	for (var x in tags) {
		for (var i in tags[x])
			authors[i] = 1;
	}
	var new_item = false;
	var pname, ptag;

	function tags_editor_content() {
		return [
			$('+div.tag-half').a([
				$('+div', '人名').a([
					$('+button', '+').e('click', new_name),
					$('+button', '✗', {style:'color:maroon'}).e('click', del_name)
				]),
				pname = $('+div#tag-names.tag-list').a(
					keys(authors)._map(tag_list_item)
				).e('click', name_click, true)
			]),
			$('+div.tag-half').a([
				$('+div', '标签').a([
					$('+button', '+').e('click', new_tag),
					$('+button', '✗', {style: 'color:maroon'}).e('click', del_tag)
				]),
				ptag = $('+div#tag-tags.tag-list').a(
					keys(tags)._map(tag_list_item)
				).e('click', tag_click, true)
			]),
		];
	}

	function sel_name(a) {
		var n = pname.f('.tag-item');
		var s = null;
		for (var i = 0; i < n.length; i++)
			if (n[i].textContent == a) {
				s = $(n[i]);
				break;
			}
		if (!s) {
			s = tag_list_item(a);
			pname.a(s);
		}
		ui.single_select({target:s[0]});
		pname.f('input[type="checkbox"]').at('style', 'visibility:hidden');
		ptag.f('input[type="checkbox"]').at('style', 'visibility:');
		ptag.f('>.sel-item')._map(function(x) {
			$(x).at('selected', '')
			$(x).f('input[type="checkbox"]')[0].checked
				= tags[x.textContent][a] ? true: false;
		})
	}

	function sel_tag(a) {
		var n = ptag.f('.tag-item');
		var s = null;
		for (var i = 0; i < n.length; i++)
			if (n[i].textContent == a) {
				s = $(n[i]);
				break;
			}
		if (!s) {
			s = tag_list_item(a);
			tags[a] = {};
			ptag.a(s);
		}

		ui.single_select({target:s[0]});

		ptag.f('input[type="checkbox"]').at('style', 'visibility:hidden');
		pname.f('input[type="checkbox"]').at('style', 'visibility:');
		pname.f('>.sel-item')._map(function(x) {
			$(x).at('selected', '');
			$(x).f('input[type="checkbox"]')[0].checked = tags[a][x.textContent] ? true: false;
		})
	}

	function del_name(e) {
		if (!ui.check_ctrl(e)) return;

		var a = pname.f('.sel-item[selected]');
		if (!a.length) return;
		var t = a[0].textContent;
		for (var x in tags)
			delete tags[x][t];
		a.r();
	}

	function del_tag(e){
		if (!ui.check_ctrl(e)) return;

		var a = ptag.f('.sel-item[selected]');
		if (!a.length) return;
		var t = a[0].textContent;
		delete tags[t];
		a.r();
	}

	function name_click(e) {
		var t = $(e.target);
		var ch = t.f('=input')[0];
		if (ch) {
			t = t.f('<.sel-item')[0].textContent;
			var l = ptag.f('[selected]');
			if (!l.length) return;
			l = l[0].textContent;

			if (!ch.checked)
				delete tags[l][t];
			else
				tags[l][t] = 1;
		} else {
			t = t.f('=.sel-item')[0];
			if (t) sel_name(t.textContent);
		}
	}

	function tag_click(e) {
		var t = $(e.target);
		var ch = t.f('=input')[0];
		if (ch) {
			t = t.f('<.sel-item')[0].textContent;
			var l = pname.f('[selected]');
			if (!l.length) return;
			l = l[0].textContent;

			if (!ch.checked)
				delete tags[t][l];
			else
				tags[t][l] = 1;
		} else {
			t = t.f('=.sel-item')[0];
			if (t) sel_tag(t.textContent);
		}
	}

	function new_name() {
		if (new_item) return;
		new_item = true;
		pname.a($('+input[type=text]#tag-new').e('change', function(e) {
			var v = e.target.value;
			if (v.match(re_matcher)) {
				try { new RegExp(v) } catch (ee) {
					ui.goto_item(e.target);
					throw new Error('bad regexp');
				}
			}
			$(e.target).r();
			sel_name(e.target.value);
			new_item = false;
		}));
		$('#tag-new')[0].focus();
	}

	function new_tag() {
		if (new_item) return;
		new_item = true;
		ptag.a($('+input[type=text]#tag-new').e('change', function(e) {
			$(e.target).r();
			sel_tag(e.target.value);
			new_item = false;
		}));
		$('#tag-new')[0].focus();
	}

	function tag_list_item(a) {
		return $('+div.tag-item.sel-item').a([
			$('+input[type=checkbox]'),
			$('+text', a)
		]);
	}

	function save_tags() {
		pref.author_tags = tags;
		load_tags();
	}

	for (var t in tags) {
		for (var i in tags[t]) {
			if (! authors[i]) authors[i] = {};
			authors[i][t] = 1;
		}
	}

	ui.popup_window({
			title:	'标签',
			tag:	'#tags-editor',
			attr:	{style: 'position: fixed; right: 2em; bottom: 2em; z-index: 200; text-align: left; font-size: small'},
			func:	tags_editor_content,
			perm:	true,
	}, null).f('.panel-close').e('click', function() {
		save_tags();
		in_editing = false;
	});
	if (name) sel_name(name);
}

function rule_applicable(r) {
	if (!r.board.length) return true;
	var t = ff.title;
	var b = ff.board_links.item(-1)[0].textContent;
	for (var i = 0; i < r.board.length; i++) {
		var x = r.board[i];
		switch(x.arg) {
		case 'name':
			switch(x.op) {
			case '==':
				if (b == x.str || t == x.str) return true;
				break;
			case '=~':
				var re = new RegExp(x.regex);
				if (b.match(re) || t.match(re)) return true;
				break;
			}
			break;
		case 'url':
			switch (x.op) {
			case 'idx':
				if (location.href.indexOf(x.str) == 0)
					return true;
				break;
			case '=~':
				var re = new RegExp(x.regex);
				if (location.href.match(re)) return true;
			}
		}
	}
	return false;
}

function save_all_rules() {
	pref.post_filter_rules = $('.filter-rule')._map("=$_._rule");
	compile_all_rules();
}

function rules_editor(ritem) {
	var rs = ritem[0]._rule;
	var tmpl_board =
	{ type:	'select', name:	'arg', kids: [
		{ text: '版面名称', value: 'name', onsel:
			{ type:	'select', name:	'op', kids:
				[
					{ text: '==', onsel:
						{ type: 'text', value: '%n', name: 'str' },
					},
					{ text: '=~', onsel:
						{ type: 'text', name: 'regex' }
					}
				],
			},
		},
		{ text: '地址', value: 'url', onsel:
			{ type:	'select', name:	'op', kids:
				[
					{ text: '==', value: 'idx', onsel:
						{ type:	'text', name: 'str', value: '%u', },
					},
					{ text: '=~', onsel:
						{ type: 'text', name: 'regex', },
					}
				]
			},
		},
	]};

	var tmpl_post = 
	{ type:	'select', name:	'arg', kids: [
		{ text: '作者', value: 'author', onsel:
			{ type:	'select', name:	'op', kids: [
				{ text: '是楼主', value: 'lz' },
				{ text: '非楼主', value: 'notlz' },
				{ text: '=', value: '==', onsel:
					{ type: 'text', name: 'str' }
				},
				{ text: '≠', value: '!=', onsel:
					{ type: 'text', name: 'str' }
				},
				{ text: '=~', onsel:
					{ type: 'text', name: 'regex' }
				},
				{ text: '!~', onsel:
					{ type: 'text', name: 'regex' }
				},
			]},
		},
		{ text: '作者标签', value: 'author_tag', onsel:
			{ type: 'select', name: 'op', kids: [
				{ text: '=', value: '==', onsel: 
					{ type: 'select', name: 'tag', choices: '%tag' }
				},
				{ text: '≠', value:'!=', onsel:
					{ type: 'select', name: 'tag', choices: '%tag' }
				},
			]}
		},
		{ text: '帖子长度', value: 'post_length', onsel:
			{ type: 'select', name: 'op', kids: [
				{ text: '≥', value:'>=', onsel:
					{ type: 'text', name: 'num' }
				},
				{ text: '<', value: '<', onsel:
					{ type: 'text', name: 'num' }
				},
			]}
		},
		{ text: '帖子文字', value: 'post_content', onsel:
			{ type: 'select', name: 'op', kids: [
				{ text: '=~', onsel: { type: 'text', name: 'regex' }},
				{ text: '!~', onsel: { type: 'text', name: 'regex' }},
			]}
		},
		{ text: '图片', value: 'images', onsel:
			{ type: 'select', name: 'op', kids: [
				{ text: '有', value: 'notzero'},
				{ text: '无', value: 'zero'},
			]}
		},
		]
	};

	var disp_op =
	{ type: 'select', name: 'disp', kids: [
		{ text: '不变', value: 0 },
		{ text: '显示', value: 1 },
		{ text: '隐藏', value: 2 },
		{ text: '删除', value: 3 },
	]};
	var hl_op = 
	{ type: 'select', name: 'hl', kids: [
		{ text: '不变', value: 0 },
		{ text: '高亮', value: 1 },
		{ text: '正常', value: 2 },
	]};

	function cancel_rule() {
		$('#r-editor').r();
		if (ritem[0]._new)
			ritem.r();
		in_editing = false;
	}

	function save_rule() {
		$('#r-ops').at('bad_input', '');
		$('#r-editor').f('input, select').at('bad_input', '');
	try {
		var ret = ui_to_rule($('#r-ops')[0]);
		ret.name = $('#r-rule-name')[0].value;
		if (!ret.name) ret.name = '新...';
		// no-no-op check
		if ((0 == ret.hl) && (0 == ret.disp) && (0 == ret.stop)) {
			$('#r-ops').at('bad_input', 1);
			throw new Error('至少选择一项');
		}

		ret.board = $('#r-board').f('.rule')._map(ui_to_rule);
		ret.post = $('#r-post').f('.rule')._map(ui_to_rule);
		ret.use = (rs.use == 1 ? rs.use : 0);
		
		ritem.f('<').i(rule_list_item(ret), ritem);
		ritem.r();
		cancel_rule();
		save_all_rules();
	} catch(e) {
		ui.info_box(e.message, {style:'background:red; color: white'});
		throw e;
	}}

	function ui_from_tmpl(t) {
		var ele;
		switch(t.type) {
		case 'select':
			ele = $('+select');
			ele.e('change', function() {select_select(ele)});
			if (t.name) ele[0]._name = t.name;
			if (t.kids)
				ele.a(t.kids._map(ui_from_tmpl));
			else if (t.choices == '%tag') {
				var tags = pref.author_tags;
				for (var x in tags) {
					ele.a($('+option', x));
				}
			}
			break;
		case 'text':
			ele = $('+input[type=text][size=30]');
			if (t.name) ele[0]._name = t.name;
			switch (t.value) {
			case '%n':
				ele[0].value = ff.board_links.item(-1).txt();
				break;
			case '%u':
				ele[0].value = location.href;
				break;
			default:
				ele[0].value = t.value ? t.value : '';
			}
			break;
		default:
			ele = $('+option', t.text);
			if (t.value != undefined) ele[0].value = t.value;
			if (t.onsel)
				ele[0]._onsel = $('+span').a(ui_from_tmpl(t.onsel));
		}
		return ele;
	}
	function validate_text(x) {
		var bad = false;
		switch(x._name) {
		case 'num':
			if (!x.value.match(/^[1-9]\d*$/))
				bad = true;
			break;
		case 'str':
			if (! x.value.length) bad = true;
			break;
		case 'regex':
			if (! x.value.length) bad = true;
			else {
				try {
					var a = new RegExp(x.value);
				} catch(e) {
					bad = true;
				}
			}
		}
		if (bad){
			[x].at('bad_input', 1);
			return false;
		}
		return true;
	}
	function ui_to_rule(r) {
		var ret = {};
		[r].f('input[type="text"], select, input[type="checkbox"]')._map(function(x) {
			if (x.type == 'text' && !validate_text(x))
				throw new Error('输入错误');
			if (x._value !== undefined)
				ret[x._name] = x._value;
			else
				ret[x._name] = x.value;
		});
		return ret;
	}
	function del_button() {
		return $('+button.r-del', '−', {title: '删除'}).e('click', function(e) { $(e.target).f('<.r-item').r()});
	}
	function rule_to_ui(tmpl, r) {
		if (!r) r = {};
		var x = $('+div.r-item.rule').a([del_button(), ui_from_tmpl(tmpl, r)]);
		var sel = x.f('select');
		if (sel.length)
			select_select(sel, r);
		return x;
	}
	function select_select(s, r) {
		if (!s.length) return;

		var i = 0, v = r ? r[s[0]._name] : null;
		var opts = s.f('>option');
		if (!v)
			i = s[0].selectedIndex;
		else {
			for (i = 0; i < opts.length; i++) {
				if (opts[i].value == v || opts[i].textContent == v)
					break;
			}
			if (i == opts.length) i = 0;
		}

		[s[0].nextSibling].r();
		s[0].selectedIndex = i;

		if (opts[i] && opts[i]._onsel) {
			s.f('<').a(opts[i]._onsel);
			opts[i]._onsel.f('input[type="text"]')._map(function(x) {
				if (r && (x._name in r))
					x.value = r[x._name];
			});
			select_select(opts[i]._onsel.f('select'), r);
		}
	}

	var n;
	var ed = $('+div#r-editor').a(
		$('+div', '规则名称：').a([
			n = $('+input[type=text][size=12]#r-rule-name'), 
			$('+button', '取消', {style: 'float:right'})
				.e('click', cancel_rule),
			$('+button', '完成编辑', {style: 'float:right'})
				.e('click', save_rule)
		])
	);
	n[0].value = rs.name;

	var board_rules = $('+fieldset#r-board', '在符合以下任一条件的版面：').a([
		((rs && rs.board) ? rs.board : [])._map(function(x) {
			return rule_to_ui(tmpl_board, x)}),
		$('+div.r-item').a($('+button', '+').e('click', function(e) {
			var x = rule_to_ui(tmpl_board);
			var b = $(e.target).f('<');
			b.f('<').a(x).a(b);
		}))
	]);
	var post_rules = $('+fieldset#r-post', '对满足以下所有条件的帖子：').a([
		((rs && rs.post) ? rs.post : [])._map(function(x) {
			return rule_to_ui(tmpl_post, x)}),
		$('+div.r-item').a($('+button', '+').e('click', function(e) {
			var x = rule_to_ui(tmpl_post);
			var b = $(e.target).f('<');
			b.f('<').a(x).a(b);
		}))
	]);

	var ops = $('+fieldset#r-ops.r-section.rule', '釆取操作：').a([
		$('+label', '显示'),
		$('+span').a(rule_to_ui(disp_op, rs).f('select')),
		$('+label', '　高亮'),
		$('+span').a(rule_to_ui(hl_op, rs).f('select')),
		ui.check_box({
			label: '终止过滤',
			value: rs.stop,
			func: function(e) {
				$(e.target)[0]._value = (e.target.checked ? 1 : 0);
			},
		}).at({title: '满足以上条件的帖子不再用后继规则筛选'}),
	]);

	var c = ops.f('input[type="checkbox"]')[0];
	c._name = 'stop';
	c._value = rs.stop;

	$('@body').a(ed.a([board_rules, post_rules, ops]));
}

ff.more_ui.push(filter_ui);
ff.pre_insert.push(rules_filter);

function start_all() {
	ff_startup();
	var pg = ff.get_current_page();
	$('@body')[0].innerHTML = '';
	ff.add_page(pg);

	$('@head')[0].innerHTML = '<title>'+ff.title+'</title>';
	css_black = (<r><![CDATA[body { background-color: #222}
#stats, .page-no { color: #eee }
h1 { color: #bdb }
.post-body { color: #eee; background-color: #333}
.post-head { background: #444; color: #ccc}
.post-body, .post-head { border-color: #555}
.post[hl] .post-head {
	background: #543
	-moz-linear-gradient(top, rgba(255,255,255,.15), transparent);
	color: white
}
.post[hl] .post-body { background-color: #234; color: white }
.post[hl] .post-head, .post[hl] .post-body { border-color: #456; }
.post a { color: #aff }
.post a:visited { color: #faf }
.post a:hover { color: #ffa }
p.sep {
	border-bottom: 1px solid gray;
}
.lz-icon { color: pink }
.lz-equiv { color: cyan }
]]></r>).toString();
	$('@head').a($('#black-css')); 

	new_header('style.forum-filter#base-css', '');
	new_header('style.forum-filter#opt-css', '');

	$('#base-css').txt((<r><![CDATA[body {
	background: #d8d8d8;
}
.page {
	text-align: justify;
	margin-top: 1em
}
#content {
	width: 100%;
	margin: 3em auto;
}
h1 {
	text-shadow: 2px 2px 5px rgba(0,0,0,0.5);
	color: #242;
	font-size: 150%;
	margin: 1em auto;
}

h1, #stats {
	text-align: center;
}

p {
	word-wrap: break-word;
	text-align: justify;
	text-indent: 2em;
	margin: 0;
	line-height: 170%;
}
hr {	margin: 1em 2em; border: none; border-bottom: 1px solid gray }
p.sep > span { display: none }
p.gap:not(:last-child) {
	margin-bottom: 1em;
}
.post-head, #main-tools, .panel-head, .text-button {
	background: #e0e0ff
		-moz-linear-gradient(top,
		rgba(200,255,255, 0),
		rgba(200,255,255,.1) 45%,
		rgba( 80,120,120,.03) 55%,
		rgba( 80,120,120,0));
	color: #444;
	border: 1px solid #ccf;
}
.panel-head {
	background-color: #ded;
	padding: 0 1ex;
}
.post-head {
	-moz-border-radius-topleft: 4px;
	-moz-border-radius-topright: 4px;
	font-size: small;
}
.fr {
	float: right;
}
.post {
	margin-bottom: 1ex;
}
.post-body {
	padding: 1ex;
	background: #e8e8e8;
	border: 1px solid #ccf;
	border-top: none;
	color: #222;
}
.post-idx, a.author, .timestamp {
	text-align: center;
	display: inline-block;
	padding: .2ex 1ex;
	margin: .2ex 0;
}
.post-idx {
	border-right: 2px groove rgba(0,0,0,0.3)
}
a {
	text-decoration: none;
}
a:hover {
	color: maroon;
}
#page-links {
	cursor: pointer
}
#page-links > *,
a.board {
	display: inline-block;
	font-size: small;
	padding: .2ex 1ex;
	border-right: 2px groove rgba(0,0,0,0.3)
}
#bar-wrapper {
	position: fixed;
	left: 0; right: 0;
	text-align: left;
	z-index: 100;
}
#bar-wrapper:not([on_top]){ bottom: 0; }
#bar-wrapper[on_top] { top: 0; }
#bar-wrapper, #main-tools {
	width: 100%;
	min-height: 1.5em;
}
#bar-wrapper:not(:hover) > #main-tools[auto_hide] {
	display: none;
}
.table, .th, .td {
	display: inline-block;
	cursor: default;
}
.table {
	border: 1px solid #aaa;
}
.thead {
	background: #bbb;
	cursor: default;
}
.thead, .tr {
	border-bottom: 1px solid #aaa;
}
.tr {
	white-space: nowrap;
}
.th {
	border-left: 1px solid #ccc;
	border-right: 1px solid gray;
	text-shadow: 1px 1px #eee;
}
.th, .td {
	overflow: hidden;
	text-align: center;
	padding: 0 2px;
}
.td {
	border: 1px solid transparent;
}
.td:last-child, .th:last-child {
	border-right: none;
}
.sel-item:nth-child(odd) {
	background-color: rgba(0,0,0,0.1);
}
.flex {
	overflow-x: hidden;
	overflow-y: auto;
	background: white;
}
.cell-show, .cell-hl, .cell-lz, .cell-imgs { width: 1em}
.cell-author {width: 8em }
.cell-idx, .cell-len { width: 3em }
.r { text-align: right; }
.l { text-align: left ; }
#panel-btns {
	display: inline-block;
	float: right;
}

.panel-button {
	display: inline-block;
	cursor: default;
	font-size: 120%;
	width: 1.2em;
	height: 1.2em;
	margin: 0 .5ex;
	text-align: center;
	-moz-border-radius: 50%;
	border: 1px solid #bbb;
}
.panel {
	position: fixed;
	right: 0;
	z-index: 99;
	text-align: left;
	border-left: 1px solid #ccf;
	background: #eee;
}
#bar-wrapper, .panel { font-size: small }
#prefs-panel-toggle {
	background-color: #add;
	color: gray;
}
#prefs-panel-toggle[active],
#prefs-panel-toggle:hover {
	background-color: #46f;
	color: gold;
}
#post-panel-toggle {
	background-color: #ecc;
	color: gray;
}
#post-panel-toggle[active],
#post-panel-toggle:hover {
	background-color: #faa;
	color: maroon;
	text-shadow: 0 0 6px red;
}
#reply-panel-toggle {
	background-color: #afa;
}
#reply-panel-toggle[active],
#reply-panel-toggle:hover {
	background-color: lime;
	color: black
}

.sel-item {
	cursor: default
}
.sel-item[selected], .menu-item:hover {
	background-color: #acf;
}

.toggle-button, .text-button {
	display: inline-block;
	-moz-border-radius: 2px;
	text-align: center;
	cursor: pointer;
}
.text-button {
	margin: 2px;
	padding: .2ex .5ex;
	min-width: 2em;
	border: 1px outset #cfd;
}
.toggle-button {
	background-color: transparent;
	border: 1px solid #888;
	color: #444;
	width: 1.2em;
	margin: 0 .5ex;
}
#goggle-btns {
	padding: 0 1em
}
#show-all-button[on] {
	text-shadow: 1px 1px 1px gray;
	color: red;
	background-color: orange;
}
#hl-lz-button[on] {
	text-shadow: 1px 1px 1px gray;
	color: purple;
	background-color: pink;
}
.panel-button, .toggle-button {
	background-image: -moz-linear-gradient(-66deg,
		rgba(255,255,255,.3) 20%,
		rgba(0,0,0,.4) 60%,
		rgba(255,255,255,.4) 80%);
}

.post[hl] > .post-head {
	background: -moz-linear-gradient(top,
	rgba(200,255,255,0.2),
	rgba(200,255,255,0) 40%,
	rgba(80, 70, 30, 0.1) 50%,
	rgba(80, 70, 30, 0)),
	-moz-linear-gradient(left, #ffa 30%, rgba(255,255,176,0.3) 70%, #ffa 90%),
	-moz-repeating-linear-gradient(-30deg, orange 0px, white 3px, orange 6px);
        border-color: #fd8;
        color: 222;
}
.tr[hl][show] {
	background-image: -moz-linear-gradient(
		left, rgb(255,255,200), rgba(255,255,128,0));
}
.post[hl] > .post-body {
	border-color: #fd8;
	background-color: #f8f8f8;
}
.post:not([show]) { display: none }
.post-row:not([show]) { color: gray}
.text-button:hover { background-color: pink }
*[goto] {
	outline-offset: -1px;
	outline: 1px solid red;
}
.tr[show] > .td.cell-hl {
	color: purple;
}
#toggle-btns {
	padding: 0 1em
}
#info-box {
	color: black;
	background: #ffa;
	border: 1px solid gray;
	position: fixed;
	bottom: 2em;
	right: 1em;
	z-index: 1000;
	padding: 1ex;
	font-size: small;
}
.td.cell-show:hover,
.td.cell-hl:hover,
.td.cell-lz:hover,
.td.cell-idx:hover {
	cursor: pointer;
	background: #ccc;
}
.menu-popup {
	background: #ddb;
	border: 1px solid gray;
	top: 1em; left: 1em;
	display: inline-block;
}
.menu-item {
	display: table-row;
	text-align: left;
	font-size: small;
}
.menu-icon, .menu-label {
	display: table-cell;
	padding: .5ex;
	cursor: default;
}
.menu-item[menuend] > .menu-label {
	border-bottom: 1px solid gray;
}
.menu-icon {
	text-align: center;
	padding: .5ex 1ex;
	border-right: 1px solid gray;
	background: rgba(255,255,255,.3);
}
.popup-window, .menu-popup {
	-moz-box-shadow: 2px 2px 4px black;
	position: fixed;
}
#leng-limit {
	background: transparent;
	border: 1px solid transparent;
}
#leng-limit:focus {
	background: white;
	border: 1px solid gray;
}
.post-icon {
	float: right;
	padding: 0 1ex;
	cursor: default;
}
.lz-icon, [show] > [lz='1'] {
	color: maroon;
}
.lz-equiv, [show] > [lz='2'] {
	color: green;
}
#all-pages { display: inline-block }
.popup-inside {
	background-color: #eee;
	border: 1px solid #ccf;
}
.subpage {
	display: inline-block;
	width: 2em;
	padding: 0 .5em;
	text-align: right;
	cursor: pointer;
	border: 1px solid transparent;
}
.subpage:hover {
	border-color: purple;
}
span.subpage {
	background: #cdf;
}
#page-list {
	max-width: 30em;
	max-height: 22em;
	overflow-y: auto;
	padding: 1ex 20px 1ex 1ex;
	text-align: left;
}
.prefs-group {
	border: 1px solid gray;
	margin: 1ex;
}
.prefs-title {
	background: #ccc;
	text-shadow: 1px 1px white;
}
.prefs-body {
	padding: .5ex .5ex .5ex 2ex;
}
.panel-close { color: maroon; float: right; cursor: pointer }
.panel-close:hover {
	color: red;
	text-shadow: 1px 1px 2px black;
}
img { border: none }
#reply-panel {
	width: auto;
	height: 20em;
	position: fixed;
	bottom: 1em;
	left: 0;
	top: auto !important;
	right: auto !important;
}
]]></r>).toString());
ff.make_ui();
}

pref.decl('manual_start', 'bool', false);
if (pref.manual_start) {
	$('@body').a($('+div', '►',
		{style: 'position: fixed; right: 1ex; bottom: 1ex; font-size:200%; color: green; padding: 1ex; border: 1px solid gray; background: rgba(128,128,128,0.5); cursor:pointer', title: '启动脚本'})
		.e('click', start_all));
} else {
	start_all();
}


