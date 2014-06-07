// ==UserScript==
// @name	Tieba Common
// @namespace	http://gera2ld.blog.163.com/
// @author	Gerald <gera2ld@163.com>
// @description	百度贴吧用户脚本公共库 - Gerald倾情打造
// ==/UserScript==
function notice(e, t) {
	GM_getValue("notice", 0) < e && (alert(t), GM_setValue("notice", e))
}
var $ = unsafeWindow.$, PageData = unsafeWindow.PageData, utils = window.utils;
utils || function () {
	function e() {
		o = {},
		document.addEventListener("keydown", function (e) {
			if (e.target == document.body) {
				var t,
				n = [];
				e.ctrlKey && n.push("c"),
				e.altKey && n.push("a"),
				e.shiftKey && n.push("s"),
				e.metaKey && n.push("m"),
				n.push(String.fromCharCode(e.keyCode)),
				n = n.join("-").toLowerCase(),
				(t = o[n]) && (e.preventDefault(), t())
			}
		}, !1)
	}
	var t = {},
	n = [],
	o = null,
	r = {
		common : "https://gitcafe.com/Gerald/UserJS/wiki/Lib-TiebaCommon",
		advanced : "https://gitcafe.com/Gerald/UserJS/wiki/TiebaAdvanced#高级用法"
	};
	utils = window.utils = {
		wait : function (e, o, i, r) {
			function a() {
				e[o] ? (delete t[s], l.forEach(function (t) {
						t(e[o])
					})) : setTimeout(a, r)
			}
			var s = n.indexOf(e);
			0 > s && (s = n.length, n.push(e)),
			s += "." + o;
			var l = t[s];
			l ? r = 0 : (r || (r = 500), l = t[s] = []),
			l.push(i),
			r && a()
		},
		hook : function (e, t, n) {
			var o;
			e && (o = e[t]) && (o.hooked || (e[t] = function () {
					var e,
					t,
					n = this,
					o = arguments,
					i = o.callee,
					r = void 0,
					a = !1;
					for (i.hookStop = function () {
						a = !0
					}, t = 0; t < i.hook_before.length; t++)
						if (r = i.hook_before[t].apply(n, [i, o]), a)
							return r;
					for (r = i.hook_func.apply(n, o), t = 0; t < i.hook_after.length; t++)
						if (e = i.hook_after[t].apply(n, [i, r, o]), void 0 !== e && (r = e), a)
							return r;
					return r
				}, e[t].hook_func = o, o = e[t], o.hooked = !0, o.hook_after = [], o.hook_before = []), e = o.hook_after, (t = n.after) && (t.concat ? o.hook_after = e.concat(t) : e.push(t)), e = o.hook_before, (t = n.before) && (t.concat ? o.hook_before = e.concat(t) : e.push(t)))
		},
		addStyle : function (e) {
			var t = document.createElement("style");
			return t.innerHTML = e || "",
			document.head.appendChild(t),
			$ && (t = $(t)),
			t
		},
		getObj : function (e, t) {
			var n = localStorage.getItem("ge_" + e),
			o = void 0,
			i = o;
			if (n)
				try {
					i = JSON.parse(n)
				} catch (r) {}

			return i == o && t != o && (i = utils.setObj(e, t)),
			i
		},
		setObj : function (e, t) {
			return localStorage.setItem("ge_" + e, JSON.stringify(t)),
			t
		},
		addButton : function (e, t, n, o) {
			if (o || (o = {}), n) {
				var i,
				r = o.keys;
				for (r && r.length || (r = ["mousedown", "mouseup"]), i = 0; i < r.length; i++)
					if (t[r[i]]) {
						t[r[i]].call(t, n);
						break
					}
			}
			return e = $(e),
			o.after ? t.insertAfter(e.children(o.after)) : o.before ? t.insertBefore(e.children(o.before)) : t.appendTo(e),
			t
		},
		addTButton : function (e, t) {
			var n = $("div.edui-btn-toolbar").first();
			return t && e.click(t),
			e.appendTo($('<div class="edui-btn edui-btn-bold" unselectable="on" onmousedown="return false">').prependTo(n))
		},
		addSButton : function (e) {
			var t = $('<a href="#" class="ui_btn ui_btn_m poster_submit">').insertBefore(".poster_draft_status").html("<span><em>" + e + "</em></span>");
			return t
		},
		addPopup : function (e, t, n) {
			var o = $('<div class=ge_panel_p title="">').appendTo(e).click(function (e) {
					e.stopPropagation(),
					["A", "BUTTON"].indexOf(e.target.tagName) >= 0 && e.preventDefault()
				}).hide();
			return o.holder = e,
			o.arrow = $("<div class=ge_arrow>").appendTo(o).html("<span>◆</span><span>◆</span>"),
			o.panel = $("<div class=ge_panel>").appendTo(o),
			o.onclose = function () {
				o.hide(),
				$(document).unbind("click", o.onclose)
			},
			o.onopen = function (t, i, r) {
				t = e.offset(),
				i = o.button.offset(),
				o.show(),
				$(document).click(o.onclose),
				n && n(o),
				r = Math.min(i.left - t.left - 50, $(document.body).innerWidth() - t.left - o.panel.outerWidth() - 20),
				o.css({
					left : r,
					bottom : e.innerHeight() - i.top + t.top
				}),
				o.arrow.css({
					left : i.left - t.left - r
				})
			},
			o.ontoggle = function (e) {
				e.preventDefault(),
				o.button = $(e.target),
				o.is(":visible") ? o.onclose() : setTimeout(o.onopen, 0)
			},
			t && t.click(o.ontoggle),
			o
		},
		bindProp : function (e, t, n, o, i, r) {
			return e.prop(t, utils.getObj(n, o)),
			r || (r = ["change"]),
			r.forEach(function (o) {
				e.bind(o, function (o) {
					utils.setObj(n, this[t]),
					i && e.each(function (e, t) {
						i.call(t, o)
					})
				})
			}),
			e
		},
		shortcut : function (t, n) {
			o || e(),
			t = t.toLowerCase();
			var i = [];
			"--" == t.slice(-2) ? (i.push("-"), t = t.slice(0, -2).split("-")) : t = t.split("-"),
			(t.indexOf("m") >= 0 || t.indexOf("meta") >= 0) && i.unshift("m"),
			(t.indexOf("s") >= 0 || t.indexOf("shift") >= 0) && i.unshift("s"),
			(t.indexOf("a") >= 0 || t.indexOf("alt") >= 0) && i.unshift("a"),
			(t.indexOf("c") >= 0 || t.indexOf("ctrl") >= 0) && i.unshift("c"),
			t = t.join("-"),
			n ? o[t] = n : delete o[t]
		},
		list : function (e, t, n, o) {
			var i = {};
			return i.last = 0,
			i.load = function (e, n) {
				return void 0 == e && (e = t ? utils.getObj(t, 0) : 0),
				0 > e || !i.length ? e = 0 : e >= i.length && (e = i.length - 1),
				t && !n && utils.setObj(t, e),
				i.cur = i.list[i.last = e],
				i
			},
			i.push = function (e) {
				return e || (e = n()),
				i.list.push(e),
				i.save(),
				i.length - 1
			},
			i.pop = function (e) {
				var t = i.list.splice(e, 1)[0];
				return i.save(),
				i.load(e),
				t
			},
			i.save = function () {
				e && utils.setObj(e, i.list),
				t && utils.setObj(t, i.last)
			},
			i.list = e ? utils.getObj(e, []) : [],
			i.__defineGetter__("length", function () {
				return i.list.length
			}),
			!i.length && o && (o.concat ? (i.list = o.concat(), i.save()) : i.push()),
			i
		},
		getLink : function (e, t) {
			t = t || {};
			var n = r[e];
			n && (t.href = n),
			t.target || (t.target = "_blank"),
			e = t.html || "",
			delete e.html,
			n = ["<a"];
			for (i in t)
				n.push(i + '="' + t[i] + '"');
			return n.join(" ") + ">" + e + "</a>"
		},
		popup : {
			dialog : function () {
				var e = document.createElement("div");
				return e.id = "ge_popup",
				document.body.appendChild(e),
				e.addEventListener("click", function (e) {
					e.stopPropagation()
				}, !1),
				e
			}
			(),
			show : function (e) {
				var t = this,
				n = t.dialog;
				t.hide(),
				t.obj = e,
				n.className = e.className || "",
				n.innerHTML = e.html,
				e.init && e.init(n),
				n.style.display = "block",
				n.style.top = (innerHeight - n.offsetHeight) / 2 + "px",
				n.style.left = (innerWidth - n.offsetWidth) / 2 + "px",
				document.addEventListener("click", t._hide = t.hide.bind(this), !1)
			},
			hide : function () {
				var e = this,
				t = e.obj,
				n = e.dialog;
				t && (t.dispose && t.dispose(n), n.style.display = "none", e.obj = null, document.removeEventListener("click", e._hide, !1))
			}
		}
	},
	utils.addStyle(".ge_x{clear:both;}#ge_popup{z-index:10006;font:normal normal 400 12px/18px 宋体;position:fixed;background:white;border:1px solid silver;box-shadow:5px 5px 7px #333;text-align:left;}.ge_mask{background:#000;opacity:0.6;position:fixed;top:0;bottom:0;left:0;right:0;z-index:999;display:none;}.ge_panel_p{position:relative;z-index:888;height:1px;}.ge_panel{position:absolute;background:#eee;border:1px solid black;padding:10px;border-radius:10px;z-index:888;bottom:0;}.ge_arrow{position:relative;}.ge_arrow>span{position:absolute;line-height:1;bottom:-0.5em;}.ge_arrow>span:last-child{color:#eee;bottom:-0.4em;z-index:999;}.ge_sbtn{background:#77f;color:white;border-radius:3px;border:1px solid;border:none;margin:2px;cursor:pointer;text-align:center;}span.ge_sbtn{padding:2px 3px;}.ge_disabled{background:gray;cursor:default;}.ge_rsep{margin-right:10px;}.ge_opt{padding:20px;border-radius:5px;}.ge_opt fieldset{border:1px solid silver;border-radius:5px;padding:5px;}.ge_opt textarea{min-height:100px;width:100%;}")
}
();
