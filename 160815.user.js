// ==UserScript==
// @name           Travian4 Plus Tool Hacked
// @namespace      http://userscripts.org/scripts/show/63218
// @version        10.0.5.6
// @author         [script by ww_start_t], [css by Dream1]
// @copyright      Team: [ww_start_t and Dream1]
// @license        Creative Commons
// @description    Varios Tools For Travian v4
// @include        http://*t*.travian.*/*
// ==/UserScript==

/****************************************************

Original script not issued, this script is under update
This script is full compatible with other scripts.

*****************************************************/
(function () {
    (function (a, b) { function cg(a) { return d.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1 } function cd(a) { if (!bZ[a]) { var b = d("<" + a + ">").appendTo("body"), c = b.css("display"); b.remove(); if (c === "none" || c === "") c = "block"; bZ[a] = c } return bZ[a] } function cc(a, b) { var c = {}; d.each(cb.concat.apply([], cb.slice(0, b)), function () { c[this] = a }); return c } function bY() { try { return new a.ActiveXObject("Microsoft.XMLHTTP") } catch (b) { } } function bX() { try { return new a.XMLHttpRequest } catch (b) { } } function bW() { d(a).unload(function () { for (var a in bU) bU[a](0, 1) }) } function bQ(a, c) { a.dataFilter && (c = a.dataFilter(c, a.dataType)); var e = a.dataTypes, f = {}, g, h, i = e.length, j, k = e[0], l, m, n, o, p; for (g = 1; g < i; g++) { if (g === 1) for (h in a.converters) typeof h === "string" && (f[h.toLowerCase()] = a.converters[h]); l = k, k = e[g]; if (k === "*") k = l; else if (l !== "*" && l !== k) { m = l + " " + k, n = f[m] || f["* " + k]; if (!n) { p = b; for (o in f) { j = o.split(" "); if (j[0] === l || j[0] === "*") { p = f[j[1] + " " + k]; if (p) { o = f[o], o === !0 ? n = p : p === !0 && (n = o); break } } } } !n && !p && d.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c))) } } return c } function bP(a, c, d) { var e = a.contents, f = a.dataTypes, g = a.responseFields, h, i, j, k; for (i in g) i in d && (c[g[i]] = d[i]); while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type")); if (h) for (i in e) if (e[i] && e[i].test(h)) { f.unshift(i); break } if (f[0] in d) j = f[0]; else { for (i in d) { if (!f[0] || a.converters[i + " " + f[0]]) { j = i; break } k || (k = i) } j = j || k } if (j) { j !== f[0] && f.unshift(j); return d[j] } } function bO(a, b, c, e) { if (d.isArray(b) && b.length) d.each(b, function (b, f) { c || bq.test(a) ? e(a, f) : bO(a + "[" + (typeof f === "object" || d.isArray(f) ? b : "") + "]", f, c, e) }); else if (c || b == null || typeof b !== "object") e(a, b); else if (d.isArray(b) || d.isEmptyObject(b)) e(a, ""); else for (var f in b) bO(a + "[" + f + "]", b[f], c, e) } function bN(a, c, d, e, f, g) { f = f || c.dataTypes[0], g = g || {}, g[f] = !0; var h = a[f], i = 0, j = h ? h.length : 0, k = a === bH, l; for (; i < j && (k || !l) ; i++) l = h[i](c, d, e), typeof l === "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = bN(a, c, d, e, l, g))); (k || !l) && !g["*"] && (l = bN(a, c, d, e, "*", g)); return l } function bM(a) { return function (b, c) { typeof b !== "string" && (c = b, b = "*"); if (d.isFunction(c)) { var e = b.toLowerCase().split(bB), f = 0, g = e.length, h, i, j; for (; f < g; f++) h = e[f], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c) } } } function bo(a, b, c) { var e = b === "width" ? bi : bj, f = b === "width" ? a.offsetWidth : a.offsetHeight; if (c === "border") return f; d.each(e, function () { c || (f -= parseFloat(d.css(a, "padding" + this)) || 0), c === "margin" ? f += parseFloat(d.css(a, "margin" + this)) || 0 : f -= parseFloat(d.css(a, "border" + this + "Width")) || 0 }); return f } function ba(a, b) { b.src ? d.ajax({ url: b.src, async: !1, dataType: "script" }) : d.globalEval(b.text || b.textContent || b.innerHTML || ""), b.parentNode && b.parentNode.removeChild(b) } function _(a) { return "getElementsByTagName" in a ? a.getElementsByTagName("*") : "querySelectorAll" in a ? a.querySelectorAll("*") : [] } function $(a, b) { if (b.nodeType === 1) { var c = b.nodeName.toLowerCase(); b.clearAttributes(), b.mergeAttributes(a); if (c === "object") b.outerHTML = a.outerHTML; else if (c !== "input" || a.type !== "checkbox" && a.type !== "radio") { if (c === "option") b.selected = a.defaultSelected; else if (c === "input" || c === "textarea") b.defaultValue = a.defaultValue } else a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value); b.removeAttribute(d.expando) } } function Z(a, b) { if (b.nodeType === 1 && d.hasData(a)) { var c = d.expando, e = d.data(a), f = d.data(b, e); if (e = e[c]) { var g = e.events; f = f[c] = d.extend({}, e); if (g) { delete f.handle, f.events = {}; for (var h in g) for (var i = 0, j = g[h].length; i < j; i++) d.event.add(b, h + (g[h][i].namespace ? "." : "") + g[h][i].namespace, g[h][i], g[h][i].data) } } } } function Y(a, b) { return d.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a } function O(a, b, c) { if (d.isFunction(b)) return d.grep(a, function (a, d) { var e = !!b.call(a, d, a); return e === c }); if (b.nodeType) return d.grep(a, function (a, d) { return a === b === c }); if (typeof b === "string") { var e = d.grep(a, function (a) { return a.nodeType === 1 }); if (J.test(b)) return d.filter(b, e, !c); b = d.filter(b, e) } return d.grep(a, function (a, e) { return d.inArray(a, b) >= 0 === c }) } function N(a) { return !a || !a.parentNode || a.parentNode.nodeType === 11 } function F(a, b) { return (a && a !== "*" ? a + "." : "") + b.replace(r, "`").replace(s, "&") } function E(a) { var b, c, e, f, g, h, i, j, k, l, m, n, o, q = [], r = [], s = d._data(this, "events"); if (a.liveFired !== this && s && s.live && !a.target.disabled && (!a.button || a.type !== "click")) { a.namespace && (n = new RegExp("(^|\\.)" + a.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)")), a.liveFired = this; var t = s.live.slice(0); for (i = 0; i < t.length; i++) g = t[i], g.origType.replace(p, "") === a.type ? r.push(g.selector) : t.splice(i--, 1); f = d(a.target).closest(r, a.currentTarget); for (j = 0, k = f.length; j < k; j++) { m = f[j]; for (i = 0; i < t.length; i++) { g = t[i]; if (m.selector === g.selector && (!n || n.test(g.namespace)) && !m.elem.disabled) { h = m.elem, e = null; if (g.preType === "mouseenter" || g.preType === "mouseleave") a.type = g.preType, e = d(a.relatedTarget).closest(g.selector)[0]; (!e || e !== h) && q.push({ elem: h, handleObj: g, level: m.level }) } } } for (j = 0, k = q.length; j < k; j++) { f = q[j]; if (c && f.level > c) break; a.currentTarget = f.elem, a.data = f.handleObj.data, a.handleObj = f.handleObj, o = f.handleObj.origHandler.apply(f.elem, arguments); if (o === !1 || a.isPropagationStopped()) { c = f.level, o === !1 && (b = !1); if (a.isImmediatePropagationStopped()) break } } return b } } function C(a, c, e) { var f = d.extend({}, e[0]); f.type = a, f.originalEvent = {}, f.liveFired = b, d.event.handle.call(c, f), f.isDefaultPrevented() && e[0].preventDefault() } function w() { return !0 } function v() { return !1 } function g(a) { for (var b in a) if (b !== "toJSON") return !1; return !0 } function f(a, c, f) { if (f === b && a.nodeType === 1) { f = a.getAttribute("data-" + c); if (typeof f === "string") { try { f = f === "true" ? !0 : f === "false" ? !1 : f === "null" ? null : d.isNaN(f) ? e.test(f) ? d.parseJSON(f) : f : parseFloat(f) } catch (g) { } d.data(a, c, f) } else f = b } return f } var c = a.document, d = function () { function I() { if (!d.isReady) { try { c.documentElement.doScroll("left") } catch (a) { setTimeout(I, 1); return } d.ready() } } var d = function (a, b) { return new d.fn.init(a, b, g) }, e = a.jQuery, f = a.$, g, h = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/, i = /\S/, j = /^\s+/, k = /\s+$/, l = /\d/, m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, n = /^[\],:{}\s]*$/, o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, q = /(?:^|:|,)(?:\s*\[)+/g, r = /(webkit)[ \/]([\w.]+)/, s = /(opera)(?:.*version)?[ \/]([\w.]+)/, t = /(msie) ([\w.]+)/, u = /(mozilla)(?:.*? rv:([\w.]+))?/, v = navigator.userAgent, w, x = !1, y, z = "then done fail isResolved isRejected promise".split(" "), A, B = Object.prototype.toString, C = Object.prototype.hasOwnProperty, D = Array.prototype.push, E = Array.prototype.slice, F = String.prototype.trim, G = Array.prototype.indexOf, H = {}; d.fn = d.prototype = { constructor: d, init: function (a, e, f) { var g, i, j, k; if (!a) return this; if (a.nodeType) { this.context = this[0] = a, this.length = 1; return this } if (a === "body" && !e && c.body) { this.context = c, this[0] = c.body, this.selector = "body", this.length = 1; return this } if (typeof a === "string") { g = h.exec(a); if (!g || !g[1] && e) return !e || e.jquery ? (e || f).find(a) : this.constructor(e).find(a); if (g[1]) { e = e instanceof d ? e[0] : e, k = e ? e.ownerDocument || e : c, j = m.exec(a), j ? d.isPlainObject(e) ? (a = [c.createElement(j[1])], d.fn.attr.call(a, e, !0)) : a = [k.createElement(j[1])] : (j = d.buildFragment([g[1]], [k]), a = (j.cacheable ? d.clone(j.fragment) : j.fragment).childNodes); return d.merge(this, a) } i = c.getElementById(g[2]); if (i && i.parentNode) { if (i.id !== g[2]) return f.find(a); this.length = 1, this[0] = i } this.context = c, this.selector = a; return this } if (d.isFunction(a)) return f.ready(a); a.selector !== b && (this.selector = a.selector, this.context = a.context); return d.makeArray(a, this) }, selector: "", jquery: "1.5.1", length: 0, size: function () { return this.length }, toArray: function () { return E.call(this, 0) }, get: function (a) { return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a] }, pushStack: function (a, b, c) { var e = this.constructor(); d.isArray(a) ? D.apply(e, a) : d.merge(e, a), e.prevObject = this, e.context = this.context, b === "find" ? e.selector = this.selector + (this.selector ? " " : "") + c : b && (e.selector = this.selector + "." + b + "(" + c + ")"); return e }, each: function (a, b) { return d.each(this, a, b) }, ready: function (a) { d.bindReady(), y.done(a); return this }, eq: function (a) { return a === -1 ? this.slice(a) : this.slice(a, +a + 1) }, first: function () { return this.eq(0) }, last: function () { return this.eq(-1) }, slice: function () { return this.pushStack(E.apply(this, arguments), "slice", E.call(arguments).join(",")) }, map: function (a) { return this.pushStack(d.map(this, function (b, c) { return a.call(b, c, b) })) }, end: function () { return this.prevObject || this.constructor(null) }, push: D, sort: [].sort, splice: [].splice }, d.fn.init.prototype = d.fn, d.extend = d.fn.extend = function () { var a, c, e, f, g, h, i = arguments[0] || {}, j = 1, k = arguments.length, l = !1; typeof i === "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i !== "object" && !d.isFunction(i) && (i = {}), k === j && (i = this, --j); for (; j < k; j++) if ((a = arguments[j]) != null) for (c in a) { e = i[c], f = a[c]; if (i === f) continue; l && f && (d.isPlainObject(f) || (g = d.isArray(f))) ? (g ? (g = !1, h = e && d.isArray(e) ? e : []) : h = e && d.isPlainObject(e) ? e : {}, i[c] = d.extend(l, h, f)) : f !== b && (i[c] = f) } return i }, d.extend({ noConflict: function (b) { a.$ = f, b && (a.jQuery = e); return d }, isReady: !1, readyWait: 1, ready: function (a) { a === !0 && d.readyWait--; if (!d.readyWait || a !== !0 && !d.isReady) { if (!c.body) return setTimeout(d.ready, 1); d.isReady = !0; if (a !== !0 && --d.readyWait > 0) return; y.resolveWith(c, [d]), d.fn.trigger && d(c).trigger("ready").unbind("ready") } }, bindReady: function () { if (!x) { x = !0; if (c.readyState === "complete") return setTimeout(d.ready, 1); if (c.addEventListener) c.addEventListener("DOMContentLoaded", A, !1), a.addEventListener("load", d.ready, !1); else if (c.attachEvent) { c.attachEvent("onreadystatechange", A), a.attachEvent("onload", d.ready); var b = !1; try { b = a.frameElement == null } catch (e) { } c.documentElement.doScroll && b && I() } } }, isFunction: function (a) { return d.type(a) === "function" }, isArray: Array.isArray || function (a) { return d.type(a) === "array" }, isWindow: function (a) { return a && typeof a === "object" && "setInterval" in a }, isNaN: function (a) { return a == null || !l.test(a) || isNaN(a) }, type: function (a) { return a == null ? String(a) : H[B.call(a)] || "object" }, isPlainObject: function (a) { if (!a || d.type(a) !== "object" || a.nodeType || d.isWindow(a)) return !1; if (a.constructor && !C.call(a, "constructor") && !C.call(a.constructor.prototype, "isPrototypeOf")) return !1; var c; for (c in a) { } return c === b || C.call(a, c) }, isEmptyObject: function (a) { for (var b in a) return !1; return !0 }, error: function (a) { throw a }, parseJSON: function (b) { if (typeof b !== "string" || !b) return null; b = d.trim(b); if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) return a.JSON && a.JSON.parse ? a.JSON.parse(b) : (new Function("return " + b))(); d.error("Invalid JSON: " + b) }, parseXML: function (b, c, e) { a.DOMParser ? (e = new DOMParser, c = e.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b)), e = c.documentElement, (!e || !e.nodeName || e.nodeName === "parsererror") && d.error("Invalid XML: " + b); return c }, noop: function () { }, globalEval: function (a) { if (a && i.test(a)) { var b = c.head || c.getElementsByTagName("head")[0] || c.documentElement, e = c.createElement("script"); d.support.scriptEval() ? e.appendChild(c.createTextNode(a)) : e.text = a, b.insertBefore(e, b.firstChild), b.removeChild(e) } }, nodeName: function (a, b) { return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase() }, each: function (a, c, e) { var f, g = 0, h = a.length, i = h === b || d.isFunction(a); if (e) { if (i) { for (f in a) if (c.apply(a[f], e) === !1) break } else for (; g < h;) if (c.apply(a[g++], e) === !1) break } else if (i) { for (f in a) if (c.call(a[f], f, a[f]) === !1) break } else for (var j = a[0]; g < h && c.call(j, g, j) !== !1; j = a[++g]) { } return a }, trim: F ? function (a) { return a == null ? "" : F.call(a) } : function (a) { return a == null ? "" : (a + "").replace(j, "").replace(k, "") }, makeArray: function (a, b) { var c = b || []; if (a != null) { var e = d.type(a); a.length == null || e === "string" || e === "function" || e === "regexp" || d.isWindow(a) ? D.call(c, a) : d.merge(c, a) } return c }, inArray: function (a, b) { if (b.indexOf) return b.indexOf(a); for (var c = 0, d = b.length; c < d; c++) if (b[c] === a) return c; return -1 }, merge: function (a, c) { var d = a.length, e = 0; if (typeof c.length === "number") for (var f = c.length; e < f; e++) a[d++] = c[e]; else while (c[e] !== b) a[d++] = c[e++]; a.length = d; return a }, grep: function (a, b, c) { var d = [], e; c = !!c; for (var f = 0, g = a.length; f < g; f++) e = !!b(a[f], f), c !== e && d.push(a[f]); return d }, map: function (a, b, c) { var d = [], e; for (var f = 0, g = a.length; f < g; f++) e = b(a[f], f, c), e != null && (d[d.length] = e); return d.concat.apply([], d) }, guid: 1, proxy: function (a, c, e) { arguments.length === 2 && (typeof c === "string" ? (e = a, a = e[c], c = b) : c && !d.isFunction(c) && (e = c, c = b)), !c && a && (c = function () { return a.apply(e || this, arguments) }), a && (c.guid = a.guid = a.guid || c.guid || d.guid++); return c }, access: function (a, c, e, f, g, h) { var i = a.length; if (typeof c === "object") { for (var j in c) d.access(a, j, c[j], f, g, e); return a } if (e !== b) { f = !h && f && d.isFunction(e); for (var k = 0; k < i; k++) g(a[k], c, f ? e.call(a[k], k, g(a[k], c)) : e, h); return a } return i ? g(a[0], c) : b }, now: function () { return (new Date).getTime() }, _Deferred: function () { var a = [], b, c, e, f = { done: function () { if (!e) { var c = arguments, g, h, i, j, k; b && (k = b, b = 0); for (g = 0, h = c.length; g < h; g++) i = c[g], j = d.type(i), j === "array" ? f.done.apply(f, i) : j === "function" && a.push(i); k && f.resolveWith(k[0], k[1]) } return this }, resolveWith: function (d, f) { if (!e && !b && !c) { c = 1; try { while (a[0]) a.shift().apply(d, f) } catch (g) { throw g } finally { b = [d, f], c = 0 } } return this }, resolve: function () { f.resolveWith(d.isFunction(this.promise) ? this.promise() : this, arguments); return this }, isResolved: function () { return c || b }, cancel: function () { e = 1, a = []; return this } }; return f }, Deferred: function (a) { var b = d._Deferred(), c = d._Deferred(), e; d.extend(b, { then: function (a, c) { b.done(a).fail(c); return this }, fail: c.done, rejectWith: c.resolveWith, reject: c.resolve, isRejected: c.isResolved, promise: function (a) { if (a == null) { if (e) return e; e = a = {} } var c = z.length; while (c--) a[z[c]] = b[z[c]]; return a } }), b.done(c.cancel).fail(b.cancel), delete b.cancel, a && a.call(b, b); return b }, when: function (a) { var b = arguments.length, c = b <= 1 && a && d.isFunction(a.promise) ? a : d.Deferred(), e = c.promise(); if (b > 1) { var f = E.call(arguments, 0), g = b, h = function (a) { return function (b) { f[a] = arguments.length > 1 ? E.call(arguments, 0) : b, --g || c.resolveWith(e, f) } }; while (b--) a = f[b], a && d.isFunction(a.promise) ? a.promise().then(h(b), c.reject) : --g; g || c.resolveWith(e, f) } else c !== a && c.resolve(a); return e }, uaMatch: function (a) { a = a.toLowerCase(); var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || []; return { browser: b[1] || "", version: b[2] || "0" } }, sub: function () { function a(b, c) { return new a.fn.init(b, c) } d.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.subclass = this.subclass, a.fn.init = function b(b, c) { c && c instanceof d && !(c instanceof a) && (c = a(c)); return d.fn.init.call(this, b, c, e) }, a.fn.init.prototype = a.fn; var e = a(c); return a }, browser: {} }), y = d._Deferred(), d.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) { H["[object " + b + "]"] = b.toLowerCase() }), w = d.uaMatch(v), w.browser && (d.browser[w.browser] = !0, d.browser.version = w.version), d.browser.webkit && (d.browser.safari = !0), G && (d.inArray = function (a, b) { return G.call(b, a) }), i.test("آ ") && (j = /^[\s\xA0]+/, k = /[\s\xA0]+$/), g = d(c), c.addEventListener ? A = function () { c.removeEventListener("DOMContentLoaded", A, !1), d.ready() } : c.attachEvent && (A = function () { c.readyState === "complete" && (c.detachEvent("onreadystatechange", A), d.ready()) }); return d }(); (function () { d.support = {}; var b = c.createElement("div"); b.style.display = "none", b.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>"; var e = b.getElementsByTagName("*"), f = b.getElementsByTagName("a")[0], g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = b.getElementsByTagName("input")[0]; if (e && e.length && f) { d.support = { leadingWhitespace: b.firstChild.nodeType === 3, tbody: !b.getElementsByTagName("tbody").length, htmlSerialize: !!b.getElementsByTagName("link").length, style: /red/.test(f.getAttribute("style")), hrefNormalized: f.getAttribute("href") === "/a", opacity: /^0.55$/.test(f.style.opacity), cssFloat: !!f.style.cssFloat, checkOn: i.value === "on", optSelected: h.selected, deleteExpando: !0, optDisabled: !1, checkClone: !1, noCloneEvent: !0, noCloneChecked: !0, boxModel: null, inlineBlockNeedsLayout: !1, shrinkWrapBlocks: !1, reliableHiddenOffsets: !0 }, i.checked = !0, d.support.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, d.support.optDisabled = !h.disabled; var j = null; d.support.scriptEval = function () { if (j === null) { var b = c.documentElement, e = c.createElement("script"), f = "script" + d.now(); try { e.appendChild(c.createTextNode("window." + f + "=1;")) } catch (g) { } b.insertBefore(e, b.firstChild), a[f] ? (j = !0, delete a[f]) : j = !1, b.removeChild(e), b = e = f = null } return j }; try { delete b.test } catch (k) { d.support.deleteExpando = !1 } !b.addEventListener && b.attachEvent && b.fireEvent && (b.attachEvent("onclick", function l() { d.support.noCloneEvent = !1, b.detachEvent("onclick", l) }), b.cloneNode(!0).fireEvent("onclick")), b = c.createElement("div"), b.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>"; var m = c.createDocumentFragment(); m.appendChild(b.firstChild), d.support.checkClone = m.cloneNode(!0).cloneNode(!0).lastChild.checked, d(function () { var a = c.createElement("div"), b = c.getElementsByTagName("body")[0]; if (b) { a.style.width = a.style.paddingLeft = "1px", b.appendChild(a), d.boxModel = d.support.boxModel = a.offsetWidth === 2, "zoom" in a.style && (a.style.display = "inline", a.style.zoom = 1, d.support.inlineBlockNeedsLayout = a.offsetWidth === 2, a.style.display = "", a.innerHTML = "<div style='width:4px;'></div>", d.support.shrinkWrapBlocks = a.offsetWidth !== 2), a.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>"; var e = a.getElementsByTagName("td"); d.support.reliableHiddenOffsets = e[0].offsetHeight === 0, e[0].style.display = "", e[1].style.display = "none", d.support.reliableHiddenOffsets = d.support.reliableHiddenOffsets && e[0].offsetHeight === 0, a.innerHTML = "", b.removeChild(a).style.display = "none", a = e = null } }); var n = function (a) { var b = c.createElement("div"); a = "on" + a; if (!b.attachEvent) return !0; var d = a in b; d || (b.setAttribute(a, "return;"), d = typeof b[a] === "function"), b = null; return d }; d.support.submitBubbles = n("submit"), d.support.changeBubbles = n("change"), b = e = f = null } })(); var e = /^(?:\{.*\}|\[.*\])$/; d.extend({ cache: {}, uuid: 0, expando: "jQuery" + (d.fn.jquery + Math.random()).replace(/\D/g, ""), noData: { embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0 }, hasData: function (a) { a = a.nodeType ? d.cache[a[d.expando]] : a[d.expando]; return !!a && !g(a) }, data: function (a, c, e, f) { if (d.acceptData(a)) { var g = d.expando, h = typeof c === "string", i, j = a.nodeType, k = j ? d.cache : a, l = j ? a[d.expando] : a[d.expando] && d.expando; if ((!l || f && l && !k[l][g]) && h && e === b) return; l || (j ? a[d.expando] = l = ++d.uuid : l = d.expando), k[l] || (k[l] = {}, j || (k[l].toJSON = d.noop)); if (typeof c === "object" || typeof c === "function") f ? k[l][g] = d.extend(k[l][g], c) : k[l] = d.extend(k[l], c); i = k[l], f && (i[g] || (i[g] = {}), i = i[g]), e !== b && (i[c] = e); if (c === "events" && !i[c]) return i[g] && i[g].events; return h ? i[c] : i } }, removeData: function (b, c, e) { if (d.acceptData(b)) { var f = d.expando, h = b.nodeType, i = h ? d.cache : b, j = h ? b[d.expando] : d.expando; if (!i[j]) return; if (c) { var k = e ? i[j][f] : i[j]; if (k) { delete k[c]; if (!g(k)) return } } if (e) { delete i[j][f]; if (!g(i[j])) return } var l = i[j][f]; d.support.deleteExpando || i != a ? delete i[j] : i[j] = null, l ? (i[j] = {}, h || (i[j].toJSON = d.noop), i[j][f] = l) : h && (d.support.deleteExpando ? delete b[d.expando] : b.removeAttribute ? b.removeAttribute(d.expando) : b[d.expando] = null) } }, _data: function (a, b, c) { return d.data(a, b, c, !0) }, acceptData: function (a) { if (a.nodeName) { var b = d.noData[a.nodeName.toLowerCase()]; if (b) return b !== !0 && a.getAttribute("classid") === b } return !0 } }), d.fn.extend({ data: function (a, c) { var e = null; if (typeof a === "undefined") { if (this.length) { e = d.data(this[0]); if (this[0].nodeType === 1) { var g = this[0].attributes, h; for (var i = 0, j = g.length; i < j; i++) h = g[i].name, h.indexOf("data-") === 0 && (h = h.substr(5), f(this[0], h, e[h])) } } return e } if (typeof a === "object") return this.each(function () { d.data(this, a) }); var k = a.split("."); k[1] = k[1] ? "." + k[1] : ""; if (c === b) { e = this.triggerHandler("getData" + k[1] + "!", [k[0]]), e === b && this.length && (e = d.data(this[0], a), e = f(this[0], a, e)); return e === b && k[1] ? this.data(k[0]) : e } return this.each(function () { var b = d(this), e = [k[0], c]; b.triggerHandler("setData" + k[1] + "!", e), d.data(this, a, c), b.triggerHandler("changeData" + k[1] + "!", e) }) }, removeData: function (a) { return this.each(function () { d.removeData(this, a) }) } }), d.extend({ queue: function (a, b, c) { if (a) { b = (b || "fx") + "queue"; var e = d._data(a, b); if (!c) return e || []; !e || d.isArray(c) ? e = d._data(a, b, d.makeArray(c)) : e.push(c); return e } }, dequeue: function (a, b) { b = b || "fx"; var c = d.queue(a, b), e = c.shift(); e === "inprogress" && (e = c.shift()), e && (b === "fx" && c.unshift("inprogress"), e.call(a, function () { d.dequeue(a, b) })), c.length || d.removeData(a, b + "queue", !0) } }), d.fn.extend({ queue: function (a, c) { typeof a !== "string" && (c = a, a = "fx"); if (c === b) return d.queue(this[0], a); return this.each(function (b) { var e = d.queue(this, a, c); a === "fx" && e[0] !== "inprogress" && d.dequeue(this, a) }) }, dequeue: function (a) { return this.each(function () { d.dequeue(this, a) }) }, delay: function (a, b) { a = d.fx ? d.fx.speeds[a] || a : a, b = b || "fx"; return this.queue(b, function () { var c = this; setTimeout(function () { d.dequeue(c, b) }, a) }) }, clearQueue: function (a) { return this.queue(a || "fx", []) } }); var h = /[\n\t\r]/g, i = /\s+/, j = /\r/g, k = /^(?:href|src|style)$/, l = /^(?:button|input)$/i, m = /^(?:button|input|object|select|textarea)$/i, n = /^a(?:rea)?$/i, o = /^(?:radio|checkbox)$/i; d.props = { "for": "htmlFor", "class": "className", readonly: "readOnly", maxlength: "maxLength", cellspacing: "cellSpacing", rowspan: "rowSpan", colspan: "colSpan", tabindex: "tabIndex", usemap: "useMap", frameborder: "frameBorder" }, d.fn.extend({ attr: function (a, b) { return d.access(this, a, b, !0, d.attr) }, removeAttr: function (a, b) { return this.each(function () { d.attr(this, a, ""), this.nodeType === 1 && this.removeAttribute(a) }) }, addClass: function (a) { if (d.isFunction(a)) return this.each(function (b) { var c = d(this); c.addClass(a.call(this, b, c.attr("class"))) }); if (a && typeof a === "string") { var b = (a || "").split(i); for (var c = 0, e = this.length; c < e; c++) { var f = this[c]; if (f.nodeType === 1) if (f.className) { var g = " " + f.className + " ", h = f.className; for (var j = 0, k = b.length; j < k; j++) g.indexOf(" " + b[j] + " ") < 0 && (h += " " + b[j]); f.className = d.trim(h) } else f.className = a } } return this }, removeClass: function (a) { if (d.isFunction(a)) return this.each(function (b) { var c = d(this); c.removeClass(a.call(this, b, c.attr("class"))) }); if (a && typeof a === "string" || a === b) { var c = (a || "").split(i); for (var e = 0, f = this.length; e < f; e++) { var g = this[e]; if (g.nodeType === 1 && g.className) if (a) { var j = (" " + g.className + " ").replace(h, " "); for (var k = 0, l = c.length; k < l; k++) j = j.replace(" " + c[k] + " ", " "); g.className = d.trim(j) } else g.className = "" } } return this }, toggleClass: function (a, b) { var c = typeof a, e = typeof b === "boolean"; if (d.isFunction(a)) return this.each(function (c) { var e = d(this); e.toggleClass(a.call(this, c, e.attr("class"), b), b) }); return this.each(function () { if (c === "string") { var f, g = 0, h = d(this), j = b, k = a.split(i); while (f = k[g++]) j = e ? j : !h.hasClass(f), h[j ? "addClass" : "removeClass"](f) } else if (c === "undefined" || c === "boolean") this.className && d._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : d._data(this, "__className__") || "" }) }, hasClass: function (a) { var b = " " + a + " "; for (var c = 0, d = this.length; c < d; c++) if ((" " + this[c].className + " ").replace(h, " ").indexOf(b) > -1) return !0; return !1 }, val: function (a) { if (!arguments.length) { var c = this[0]; if (c) { if (d.nodeName(c, "option")) { var e = c.attributes.value; return !e || e.specified ? c.value : c.text } if (d.nodeName(c, "select")) { var f = c.selectedIndex, g = [], h = c.options, i = c.type === "select-one"; if (f < 0) return null; for (var k = i ? f : 0, l = i ? f + 1 : h.length; k < l; k++) { var m = h[k]; if (m.selected && (d.support.optDisabled ? !m.disabled : m.getAttribute("disabled") === null) && (!m.parentNode.disabled || !d.nodeName(m.parentNode, "optgroup"))) { a = d(m).val(); if (i) return a; g.push(a) } } if (i && !g.length && h.length) return d(h[f]).val(); return g } if (o.test(c.type) && !d.support.checkOn) return c.getAttribute("value") === null ? "on" : c.value; return (c.value || "").replace(j, "") } return b } var n = d.isFunction(a); return this.each(function (b) { var c = d(this), e = a; if (this.nodeType === 1) { n && (e = a.call(this, b, c.val())), e == null ? e = "" : typeof e === "number" ? e += "" : d.isArray(e) && (e = d.map(e, function (a) { return a == null ? "" : a + "" })); if (d.isArray(e) && o.test(this.type)) this.checked = d.inArray(c.val(), e) >= 0; else if (d.nodeName(this, "select")) { var f = d.makeArray(e); d("option", this).each(function () { this.selected = d.inArray(d(this).val(), f) >= 0 }), f.length || (this.selectedIndex = -1) } else this.value = e } }) } }), d.extend({ attrFn: { val: !0, css: !0, html: !0, text: !0, data: !0, width: !0, height: !0, offset: !0 }, attr: function (a, c, e, f) { if (!a || a.nodeType === 3 || a.nodeType === 8 || a.nodeType === 2) return b; if (f && c in d.attrFn) return d(a)[c](e); var g = a.nodeType !== 1 || !d.isXMLDoc(a), h = e !== b; c = g && d.props[c] || c; if (a.nodeType === 1) { var i = k.test(c); if (c === "selected" && !d.support.optSelected) { var j = a.parentNode; j && (j.selectedIndex, j.parentNode && j.parentNode.selectedIndex) } if ((c in a || a[c] !== b) && g && !i) { h && (c === "type" && l.test(a.nodeName) && a.parentNode && d.error("type property can't be changed"), e === null ? a.nodeType === 1 && a.removeAttribute(c) : a[c] = e); if (d.nodeName(a, "form") && a.getAttributeNode(c)) return a.getAttributeNode(c).nodeValue; if (c === "tabIndex") { var o = a.getAttributeNode("tabIndex"); return o && o.specified ? o.value : m.test(a.nodeName) || n.test(a.nodeName) && a.href ? 0 : b } return a[c] } if (!d.support.style && g && c === "style") { h && (a.style.cssText = "" + e); return a.style.cssText } h && a.setAttribute(c, "" + e); if (!a.attributes[c] && (a.hasAttribute && !a.hasAttribute(c))) return b; var p = !d.support.hrefNormalized && g && i ? a.getAttribute(c, 2) : a.getAttribute(c); return p === null ? b : p } h && (a[c] = e); return a[c] } }); var p = /\.(.*)$/, q = /^(?:textarea|input|select)$/i, r = /\./g, s = / /g, t = /[^\w\s.|`]/g, u = function (a) { return a.replace(t, "\\$&") }; d.event = { add: function (c, e, f, g) { if (c.nodeType !== 3 && c.nodeType !== 8) { try { d.isWindow(c) && (c !== a && !c.frameElement) && (c = a) } catch (h) { } if (f === !1) f = v; else if (!f) return; var i, j; f.handler && (i = f, f = i.handler), f.guid || (f.guid = d.guid++); var k = d._data(c); if (!k) return; var l = k.events, m = k.handle; l || (k.events = l = {}), m || (k.handle = m = function () { return typeof d !== "undefined" && !d.event.triggered ? d.event.handle.apply(m.elem, arguments) : b }), m.elem = c, e = e.split(" "); var n, o = 0, p; while (n = e[o++]) { j = i ? d.extend({}, i) : { handler: f, data: g }, n.indexOf(".") > -1 ? (p = n.split("."), n = p.shift(), j.namespace = p.slice(0).sort().join(".")) : (p = [], j.namespace = ""), j.type = n, j.guid || (j.guid = f.guid); var q = l[n], r = d.event.special[n] || {}; if (!q) { q = l[n] = []; if (!r.setup || r.setup.call(c, g, p, m) === !1) c.addEventListener ? c.addEventListener(n, m, !1) : c.attachEvent && c.attachEvent("on" + n, m) } r.add && (r.add.call(c, j), j.handler.guid || (j.handler.guid = f.guid)), q.push(j), d.event.global[n] = !0 } c = null } }, global: {}, remove: function (a, c, e, f) { if (a.nodeType !== 3 && a.nodeType !== 8) { e === !1 && (e = v); var g, h, i, j, k = 0, l, m, n, o, p, q, r, s = d.hasData(a) && d._data(a), t = s && s.events; if (!s || !t) return; c && c.type && (e = c.handler, c = c.type); if (!c || typeof c === "string" && c.charAt(0) === ".") { c = c || ""; for (h in t) d.event.remove(a, h + c); return } c = c.split(" "); while (h = c[k++]) { r = h, q = null, l = h.indexOf(".") < 0, m = [], l || (m = h.split("."), h = m.shift(), n = new RegExp("(^|\\.)" + d.map(m.slice(0).sort(), u).join("\\.(?:.*\\.)?") + "(\\.|$)")), p = t[h]; if (!p) continue; if (!e) { for (j = 0; j < p.length; j++) { q = p[j]; if (l || n.test(q.namespace)) d.event.remove(a, r, q.handler, j), p.splice(j--, 1) } continue } o = d.event.special[h] || {}; for (j = f || 0; j < p.length; j++) { q = p[j]; if (e.guid === q.guid) { if (l || n.test(q.namespace)) f == null && p.splice(j--, 1), o.remove && o.remove.call(a, q); if (f != null) break } } if (p.length === 0 || f != null && p.length === 1) (!o.teardown || o.teardown.call(a, m) === !1) && d.removeEvent(a, h, s.handle), g = null, delete t[h] } if (d.isEmptyObject(t)) { var w = s.handle; w && (w.elem = null), delete s.events, delete s.handle, d.isEmptyObject(s) && d.removeData(a, b, !0) } } }, trigger: function (a, c, e) { var f = a.type || a, g = arguments[3]; if (!g) { a = typeof a === "object" ? a[d.expando] ? a : d.extend(d.Event(f), a) : d.Event(f), f.indexOf("!") >= 0 && (a.type = f = f.slice(0, -1), a.exclusive = !0), e || (a.stopPropagation(), d.event.global[f] && d.each(d.cache, function () { var b = d.expando, e = this[b]; e && e.events && e.events[f] && d.event.trigger(a, c, e.handle.elem) })); if (!e || e.nodeType === 3 || e.nodeType === 8) return b; a.result = b, a.target = e, c = d.makeArray(c), c.unshift(a) } a.currentTarget = e; var h = d._data(e, "handle"); h && h.apply(e, c); var i = e.parentNode || e.ownerDocument; try { e && e.nodeName && d.noData[e.nodeName.toLowerCase()] || e["on" + f] && e["on" + f].apply(e, c) === !1 && (a.result = !1, a.preventDefault()) } catch (j) { } if (!a.isPropagationStopped() && i) d.event.trigger(a, c, i, !0); else if (!a.isDefaultPrevented()) { var k, l = a.target, m = f.replace(p, ""), n = d.nodeName(l, "a") && m === "click", o = d.event.special[m] || {}; if ((!o._default || o._default.call(e, a) === !1) && !n && !(l && l.nodeName && d.noData[l.nodeName.toLowerCase()])) { try { l[m] && (k = l["on" + m], k && (l["on" + m] = null), d.event.triggered = !0, l[m]()) } catch (q) { } k && (l["on" + m] = k), d.event.triggered = !1 } } }, handle: function (c) { var e, f, g, h, i, j = [], k = d.makeArray(arguments); c = k[0] = d.event.fix(c || a.event), c.currentTarget = this, e = c.type.indexOf(".") < 0 && !c.exclusive, e || (g = c.type.split("."), c.type = g.shift(), j = g.slice(0).sort(), h = new RegExp("(^|\\.)" + j.join("\\.(?:.*\\.)?") + "(\\.|$)")), c.namespace = c.namespace || j.join("."), i = d._data(this, "events"), f = (i || {})[c.type]; if (i && f) { f = f.slice(0); for (var l = 0, m = f.length; l < m; l++) { var n = f[l]; if (e || h.test(n.namespace)) { c.handler = n.handler, c.data = n.data, c.handleObj = n; var o = n.handler.apply(this, k); o !== b && (c.result = o, o === !1 && (c.preventDefault(), c.stopPropagation())); if (c.isImmediatePropagationStopped()) break } } } return c.result }, props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "), fix: function (a) { if (a[d.expando]) return a; var e = a; a = d.Event(e); for (var f = this.props.length, g; f;) g = this.props[--f], a[g] = e[g]; a.target || (a.target = a.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), !a.relatedTarget && a.fromElement && (a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement); if (a.pageX == null && a.clientX != null) { var h = c.documentElement, i = c.body; a.pageX = a.clientX + (h && h.scrollLeft || i && i.scrollLeft || 0) - (h && h.clientLeft || i && i.clientLeft || 0), a.pageY = a.clientY + (h && h.scrollTop || i && i.scrollTop || 0) - (h && h.clientTop || i && i.clientTop || 0) } a.which == null && (a.charCode != null || a.keyCode != null) && (a.which = a.charCode != null ? a.charCode : a.keyCode), !a.metaKey && a.ctrlKey && (a.metaKey = a.ctrlKey), !a.which && a.button !== b && (a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0); return a }, guid: 1e8, proxy: d.proxy, special: { ready: { setup: d.bindReady, teardown: d.noop }, live: { add: function (a) { d.event.add(this, F(a.origType, a.selector), d.extend({}, a, { handler: E, guid: a.handler.guid })) }, remove: function (a) { d.event.remove(this, F(a.origType, a.selector), a) } }, beforeunload: { setup: function (a, b, c) { d.isWindow(this) && (this.onbeforeunload = c) }, teardown: function (a, b) { this.onbeforeunload === b && (this.onbeforeunload = null) } } } }, d.removeEvent = c.removeEventListener ? function (a, b, c) { a.removeEventListener && a.removeEventListener(b, c, !1) } : function (a, b, c) { a.detachEvent && a.detachEvent("on" + b, c) }, d.Event = function (a) { if (!this.preventDefault) return new d.Event(a); a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? w : v) : this.type = a, this.timeStamp = d.now(), this[d.expando] = !0 }, d.Event.prototype = { preventDefault: function () { this.isDefaultPrevented = w; var a = this.originalEvent; a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1) }, stopPropagation: function () { this.isPropagationStopped = w; var a = this.originalEvent; a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0) }, stopImmediatePropagation: function () { this.isImmediatePropagationStopped = w, this.stopPropagation() }, isDefaultPrevented: v, isPropagationStopped: v, isImmediatePropagationStopped: v }; var x = function (a) { var b = a.relatedTarget; try { if (b !== c && !b.parentNode) return; while (b && b !== this) b = b.parentNode; b !== this && (a.type = a.data, d.event.handle.apply(this, arguments)) } catch (e) { } }, y = function (a) { a.type = a.data, d.event.handle.apply(this, arguments) }; d.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function (a, b) { d.event.special[a] = { setup: function (c) { d.event.add(this, b, c && c.selector ? y : x, a) }, teardown: function (a) { d.event.remove(this, b, a && a.selector ? y : x) } } }), d.support.submitBubbles || (d.event.special.submit = { setup: function (a, b) { if (this.nodeName && this.nodeName.toLowerCase() !== "form") d.event.add(this, "click.specialSubmit", function (a) { var b = a.target, c = b.type; (c === "submit" || c === "image") && d(b).closest("form").length && C("submit", this, arguments) }), d.event.add(this, "keypress.specialSubmit", function (a) { var b = a.target, c = b.type; (c === "text" || c === "password") && d(b).closest("form").length && a.keyCode === 13 && C("submit", this, arguments) }); else return !1 }, teardown: function (a) { d.event.remove(this, ".specialSubmit") } }); if (!d.support.changeBubbles) { var z, A = function (a) { var b = a.type, c = a.value; b === "radio" || b === "checkbox" ? c = a.checked : b === "select-multiple" ? c = a.selectedIndex > -1 ? d.map(a.options, function (a) { return a.selected }).join("-") : "" : a.nodeName.toLowerCase() === "select" && (c = a.selectedIndex); return c }, B = function B(a) { var c = a.target, e, f; if (q.test(c.nodeName) && !c.readOnly) { e = d._data(c, "_change_data"), f = A(c), (a.type !== "focusout" || c.type !== "radio") && d._data(c, "_change_data", f); if (e === b || f === e) return; if (e != null || f) a.type = "change", a.liveFired = b, d.event.trigger(a, arguments[1], c) } }; d.event.special.change = { filters: { focusout: B, beforedeactivate: B, click: function (a) { var b = a.target, c = b.type; (c === "radio" || c === "checkbox" || b.nodeName.toLowerCase() === "select") && B.call(this, a) }, keydown: function (a) { var b = a.target, c = b.type; (a.keyCode === 13 && b.nodeName.toLowerCase() !== "textarea" || a.keyCode === 32 && (c === "checkbox" || c === "radio") || c === "select-multiple") && B.call(this, a) }, beforeactivate: function (a) { var b = a.target; d._data(b, "_change_data", A(b)) } }, setup: function (a, b) { if (this.type === "file") return !1; for (var c in z) d.event.add(this, c + ".specialChange", z[c]); return q.test(this.nodeName) }, teardown: function (a) { d.event.remove(this, ".specialChange"); return q.test(this.nodeName) } }, z = d.event.special.change.filters, z.focus = z.beforeactivate } c.addEventListener && d.each({ focus: "focusin", blur: "focusout" }, function (a, b) { function c(a) { a = d.event.fix(a), a.type = b; return d.event.handle.call(this, a) } d.event.special[b] = { setup: function () { this.addEventListener(a, c, !0) }, teardown: function () { this.removeEventListener(a, c, !0) } } }), d.each(["bind", "one"], function (a, c) { d.fn[c] = function (a, e, f) { if (typeof a === "object") { for (var g in a) this[c](g, e, a[g], f); return this } if (d.isFunction(e) || e === !1) f = e, e = b; var h = c === "one" ? d.proxy(f, function (a) { d(this).unbind(a, h); return f.apply(this, arguments) }) : f; if (a === "unload" && c !== "one") this.one(a, e, f); else for (var i = 0, j = this.length; i < j; i++) d.event.add(this[i], a, h, e); return this } }), d.fn.extend({ unbind: function (a, b) { if (typeof a !== "object" || a.preventDefault) for (var e = 0, f = this.length; e < f; e++) d.event.remove(this[e], a, b); else for (var c in a) this.unbind(c, a[c]); return this }, delegate: function (a, b, c, d) { return this.live(b, c, d, a) }, undelegate: function (a, b, c) { return arguments.length === 0 ? this.unbind("live") : this.die(b, null, c, a) }, trigger: function (a, b) { return this.each(function () { d.event.trigger(a, b, this) }) }, triggerHandler: function (a, b) { if (this[0]) { var c = d.Event(a); c.preventDefault(), c.stopPropagation(), d.event.trigger(c, b, this[0]); return c.result } }, toggle: function (a) { var b = arguments, c = 1; while (c < b.length) d.proxy(a, b[c++]); return this.click(d.proxy(a, function (e) { var f = (d._data(this, "lastToggle" + a.guid) || 0) % c; d._data(this, "lastToggle" + a.guid, f + 1), e.preventDefault(); return b[f].apply(this, arguments) || !1 })) }, hover: function (a, b) { return this.mouseenter(a).mouseleave(b || a) } }); var D = { focus: "focusin", blur: "focusout", mouseenter: "mouseover", mouseleave: "mouseout" }; d.each(["live", "die"], function (a, c) { d.fn[c] = function (a, e, f, g) { var h, i = 0, j, k, l, m = g || this.selector, n = g ? this : d(this.context); if (typeof a === "object" && !a.preventDefault) { for (var o in a) n[c](o, e, a[o], m); return this } d.isFunction(e) && (f = e, e = b), a = (a || "").split(" "); while ((h = a[i++]) != null) { j = p.exec(h), k = "", j && (k = j[0], h = h.replace(p, "")); if (h === "hover") { a.push("mouseenter" + k, "mouseleave" + k); continue } l = h, h === "focus" || h === "blur" ? (a.push(D[h] + k), h = h + k) : h = (D[h] || h) + k; if (c === "live") for (var q = 0, r = n.length; q < r; q++) d.event.add(n[q], "live." + F(h, m), { data: e, selector: m, handler: f, origType: h, origHandler: f, preType: l }); else n.unbind("live." + F(h, m), f) } return this } }), d.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function (a, b) { d.fn[b] = function (a, c) { c == null && (c = a, a = null); return arguments.length > 0 ? this.bind(b, a, c) : this.trigger(b) }, d.attrFn && (d.attrFn[b] = !0) }), function () { function u(a, b, c, d, e, f) { for (var g = 0, h = d.length; g < h; g++) { var i = d[g]; if (i) { var j = !1; i = i[a]; while (i) { if (i.sizcache === c) { j = d[i.sizset]; break } if (i.nodeType === 1) { f || (i.sizcache = c, i.sizset = g); if (typeof b !== "string") { if (i === b) { j = !0; break } } else if (k.filter(b, [i]).length > 0) { j = i; break } } i = i[a] } d[g] = j } } } function t(a, b, c, d, e, f) { for (var g = 0, h = d.length; g < h; g++) { var i = d[g]; if (i) { var j = !1; i = i[a]; while (i) { if (i.sizcache === c) { j = d[i.sizset]; break } i.nodeType === 1 && !f && (i.sizcache = c, i.sizset = g); if (i.nodeName.toLowerCase() === b) { j = i; break } i = i[a] } d[g] = j } } } var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, e = 0, f = Object.prototype.toString, g = !1, h = !0, i = /\\/g, j = /\W/;[0, 0].sort(function () { h = !1; return 0 }); var k = function (b, d, e, g) { e = e || [], d = d || c; var h = d; if (d.nodeType !== 1 && d.nodeType !== 9) return []; if (!b || typeof b !== "string") return e; var i, j, n, o, q, r, s, t, u = !0, w = k.isXML(d), x = [], y = b; do { a.exec(""), i = a.exec(y); if (i) { y = i[3], x.push(i[1]); if (i[2]) { o = i[3]; break } } } while (i); if (x.length > 1 && m.exec(b)) if (x.length === 2 && l.relative[x[0]]) j = v(x[0] + x[1], d); else { j = l.relative[x[0]] ? [d] : k(x.shift(), d); while (x.length) b = x.shift(), l.relative[b] && (b += x.shift()), j = v(b, j) } else { !g && x.length > 1 && d.nodeType === 9 && !w && l.match.ID.test(x[0]) && !l.match.ID.test(x[x.length - 1]) && (q = k.find(x.shift(), d, w), d = q.expr ? k.filter(q.expr, q.set)[0] : q.set[0]); if (d) { q = g ? { expr: x.pop(), set: p(g) } : k.find(x.pop(), x.length === 1 && (x[0] === "~" || x[0] === "+") && d.parentNode ? d.parentNode : d, w), j = q.expr ? k.filter(q.expr, q.set) : q.set, x.length > 0 ? n = p(j) : u = !1; while (x.length) r = x.pop(), s = r, l.relative[r] ? s = x.pop() : r = "", s == null && (s = d), l.relative[r](n, s, w) } else n = x = [] } n || (n = j), n || k.error(r || b); if (f.call(n) === "[object Array]") if (u) if (d && d.nodeType === 1) for (t = 0; n[t] != null; t++) n[t] && (n[t] === !0 || n[t].nodeType === 1 && k.contains(d, n[t])) && e.push(j[t]); else for (t = 0; n[t] != null; t++) n[t] && n[t].nodeType === 1 && e.push(j[t]); else e.push.apply(e, n); else p(n, e); o && (k(o, h, e, g), k.uniqueSort(e)); return e }; k.uniqueSort = function (a) { if (r) { g = h, a.sort(r); if (g) for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1) } return a }, k.matches = function (a, b) { return k(a, null, null, b) }, k.matchesSelector = function (a, b) { return k(b, null, null, [a]).length > 0 }, k.find = function (a, b, c) { var d; if (!a) return []; for (var e = 0, f = l.order.length; e < f; e++) { var g, h = l.order[e]; if (g = l.leftMatch[h].exec(a)) { var j = g[1]; g.splice(1, 1); if (j.substr(j.length - 1) !== "\\") { g[1] = (g[1] || "").replace(i, ""), d = l.find[h](g, b, c); if (d != null) { a = a.replace(l.match[h], ""); break } } } } d || (d = typeof b.getElementsByTagName !== "undefined" ? b.getElementsByTagName("*") : []); return { set: d, expr: a } }, k.filter = function (a, c, d, e) { var f, g, h = a, i = [], j = c, m = c && c[0] && k.isXML(c[0]); while (a && c.length) { for (var n in l.filter) if ((f = l.leftMatch[n].exec(a)) != null && f[2]) { var o, p, q = l.filter[n], r = f[1]; g = !1, f.splice(1, 1); if (r.substr(r.length - 1) === "\\") continue; j === i && (i = []); if (l.preFilter[n]) { f = l.preFilter[n](f, j, d, i, e, m); if (f) { if (f === !0) continue } else g = o = !0 } if (f) for (var s = 0; (p = j[s]) != null; s++) if (p) { o = q(p, f, s, j); var t = e ^ !!o; d && o != null ? t ? g = !0 : j[s] = !1 : t && (i.push(p), g = !0) } if (o !== b) { d || (j = i), a = a.replace(l.match[n], ""); if (!g) return []; break } } if (a === h) if (g == null) k.error(a); else break; h = a } return j }, k.error = function (a) { throw "Syntax error, unrecognized expression: " + a }; var l = k.selectors = { order: ["ID", "NAME", "TAG"], match: { ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/, ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/, TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/, CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/, POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/, PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/ }, leftMatch: {}, attrMap: { "class": "className", "for": "htmlFor" }, attrHandle: { href: function (a) { return a.getAttribute("href") }, type: function (a) { return a.getAttribute("type") } }, relative: { "+": function (a, b) { var c = typeof b === "string", d = c && !j.test(b), e = c && !d; d && (b = b.toLowerCase()); for (var f = 0, g = a.length, h; f < g; f++) if (h = a[f]) { while ((h = h.previousSibling) && h.nodeType !== 1) { } a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b } e && k.filter(b, a, !0) }, ">": function (a, b) { var c, d = typeof b === "string", e = 0, f = a.length; if (d && !j.test(b)) { b = b.toLowerCase(); for (; e < f; e++) { c = a[e]; if (c) { var g = c.parentNode; a[e] = g.nodeName.toLowerCase() === b ? g : !1 } } } else { for (; e < f; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b); d && k.filter(b, a, !0) } }, "": function (a, b, c) { var d, f = e++, g = u; typeof b === "string" && !j.test(b) && (b = b.toLowerCase(), d = b, g = t), g("parentNode", b, f, a, d, c) }, "~": function (a, b, c) { var d, f = e++, g = u; typeof b === "string" && !j.test(b) && (b = b.toLowerCase(), d = b, g = t), g("previousSibling", b, f, a, d, c) } }, find: { ID: function (a, b, c) { if (typeof b.getElementById !== "undefined" && !c) { var d = b.getElementById(a[1]); return d && d.parentNode ? [d] : [] } }, NAME: function (a, b) { if (typeof b.getElementsByName !== "undefined") { var c = [], d = b.getElementsByName(a[1]); for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]); return c.length === 0 ? null : c } }, TAG: function (a, b) { if (typeof b.getElementsByTagName !== "undefined") return b.getElementsByTagName(a[1]) } }, preFilter: { CLASS: function (a, b, c, d, e, f) { a = " " + a[1].replace(i, "") + " "; if (f) return a; for (var g = 0, h; (h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1)); return !1 }, ID: function (a) { return a[1].replace(i, "") }, TAG: function (a, b) { return a[1].replace(i, "").toLowerCase() }, CHILD: function (a) { if (a[1] === "nth") { a[2] || k.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, ""); var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]); a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0 } else a[2] && k.error(a[0]); a[0] = e++; return a }, ATTR: function (a, b, c, d, e, f) { var g = a[1] = a[1].replace(i, ""); !f && l.attrMap[g] && (a[1] = l.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(i, ""), a[2] === "~=" && (a[4] = " " + a[4] + " "); return a }, PSEUDO: function (b, c, d, e, f) { if (b[1] === "not") if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) b[3] = k(b[3], null, null, c); else { var g = k.filter(b[3], c, d, !0 ^ f); d || e.push.apply(e, g); return !1 } else if (l.match.POS.test(b[0]) || l.match.CHILD.test(b[0])) return !0; return b }, POS: function (a) { a.unshift(!0); return a } }, filters: { enabled: function (a) { return a.disabled === !1 && a.type !== "hidden" }, disabled: function (a) { return a.disabled === !0 }, checked: function (a) { return a.checked === !0 }, selected: function (a) { a.parentNode && a.parentNode.selectedIndex; return a.selected === !0 }, parent: function (a) { return !!a.firstChild }, empty: function (a) { return !a.firstChild }, has: function (a, b, c) { return !!k(c[3], a).length }, header: function (a) { return /h\d/i.test(a.nodeName) }, text: function (a) { return "text" === a.getAttribute("type") }, radio: function (a) { return "radio" === a.type }, checkbox: function (a) { return "checkbox" === a.type }, file: function (a) { return "file" === a.type }, password: function (a) { return "password" === a.type }, submit: function (a) { return "submit" === a.type }, image: function (a) { return "image" === a.type }, reset: function (a) { return "reset" === a.type }, button: function (a) { return "button" === a.type || a.nodeName.toLowerCase() === "button" }, input: function (a) { return /input|select|textarea|button/i.test(a.nodeName) } }, setFilters: { first: function (a, b) { return b === 0 }, last: function (a, b, c, d) { return b === d.length - 1 }, even: function (a, b) { return b % 2 === 0 }, odd: function (a, b) { return b % 2 === 1 }, lt: function (a, b, c) { return b < c[3] - 0 }, gt: function (a, b, c) { return b > c[3] - 0 }, nth: function (a, b, c) { return c[3] - 0 === b }, eq: function (a, b, c) { return c[3] - 0 === b } }, filter: { PSEUDO: function (a, b, c, d) { var e = b[1], f = l.filters[e]; if (f) return f(a, c, b, d); if (e === "contains") return (a.textContent || a.innerText || k.getText([a]) || "").indexOf(b[3]) >= 0; if (e === "not") { var g = b[3]; for (var h = 0, i = g.length; h < i; h++) if (g[h] === a) return !1; return !0 } k.error(e) }, CHILD: function (a, b) { var c = b[1], d = a; switch (c) { case "only": case "first": while (d = d.previousSibling) if (d.nodeType === 1) return !1; if (c === "first") return !0; d = a; case "last": while (d = d.nextSibling) if (d.nodeType === 1) return !1; return !0; case "nth": var e = b[2], f = b[3]; if (e === 1 && f === 0) return !0; var g = b[0], h = a.parentNode; if (h && (h.sizcache !== g || !a.nodeIndex)) { var i = 0; for (d = h.firstChild; d; d = d.nextSibling) d.nodeType === 1 && (d.nodeIndex = ++i); h.sizcache = g } var j = a.nodeIndex - f; return e === 0 ? j === 0 : j % e === 0 && j / e >= 0 } }, ID: function (a, b) { return a.nodeType === 1 && a.getAttribute("id") === b }, TAG: function (a, b) { return b === "*" && a.nodeType === 1 || a.nodeName.toLowerCase() === b }, CLASS: function (a, b) { return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1 }, ATTR: function (a, b) { var c = b[1], d = l.attrHandle[c] ? l.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c), e = d + "", f = b[2], g = b[4]; return d == null ? f === "!=" : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1 }, POS: function (a, b, c, d) { var e = b[2], f = l.setFilters[e]; if (f) return f(a, c, b, d) } } }, m = l.match.POS, n = function (a, b) { return "\\" + (b - 0 + 1) }; for (var o in l.match) l.match[o] = new RegExp(l.match[o].source + /(?![^\[]*\])(?![^\(]*\))/.source), l.leftMatch[o] = new RegExp(/(^(?:.|\r|\n)*?)/.source + l.match[o].source.replace(/\\(\d+)/g, n)); var p = function (a, b) { a = Array.prototype.slice.call(a, 0); if (b) { b.push.apply(b, a); return b } return a }; try { Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType } catch (q) { p = function (a, b) { var c = 0, d = b || []; if (f.call(a) === "[object Array]") Array.prototype.push.apply(d, a); else if (typeof a.length === "number") for (var e = a.length; c < e; c++) d.push(a[c]); else for (; a[c]; c++) d.push(a[c]); return d } } var r, s; c.documentElement.compareDocumentPosition ? r = function (a, b) { if (a === b) { g = !0; return 0 } if (!a.compareDocumentPosition || !b.compareDocumentPosition) return a.compareDocumentPosition ? -1 : 1; return a.compareDocumentPosition(b) & 4 ? -1 : 1 } : (r = function (a, b) { var c, d, e = [], f = [], h = a.parentNode, i = b.parentNode, j = h; if (a === b) { g = !0; return 0 } if (h === i) return s(a, b); if (!h) return -1; if (!i) return 1; while (j) e.unshift(j), j = j.parentNode; j = i; while (j) f.unshift(j), j = j.parentNode; c = e.length, d = f.length; for (var k = 0; k < c && k < d; k++) if (e[k] !== f[k]) return s(e[k], f[k]); return k === c ? s(a, f[k], -1) : s(e[k], b, 1) }, s = function (a, b, c) { if (a === b) return c; var d = a.nextSibling; while (d) { if (d === b) return -1; d = d.nextSibling } return 1 }), k.getText = function (a) { var b = "", c; for (var d = 0; a[d]; d++) c = a[d], c.nodeType === 3 || c.nodeType === 4 ? b += c.nodeValue : c.nodeType !== 8 && (b += k.getText(c.childNodes)); return b }, function () { var a = c.createElement("div"), d = "script" + (new Date).getTime(), e = c.documentElement; a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (l.find.ID = function (a, c, d) { if (typeof c.getElementById !== "undefined" && !d) { var e = c.getElementById(a[1]); return e ? e.id === a[1] || typeof e.getAttributeNode !== "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : [] } }, l.filter.ID = function (a, b) { var c = typeof a.getAttributeNode !== "undefined" && a.getAttributeNode("id"); return a.nodeType === 1 && c && c.nodeValue === b }), e.removeChild(a), e = a = null }(), function () { var a = c.createElement("div"); a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (l.find.TAG = function (a, b) { var c = b.getElementsByTagName(a[1]); if (a[1] === "*") { var d = []; for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]); c = d } return c }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute !== "undefined" && a.firstChild.getAttribute("href") !== "#" && (l.attrHandle.href = function (a) { return a.getAttribute("href", 2) }), a = null }(), c.querySelectorAll && function () { var a = k, b = c.createElement("div"), d = "__sizzle__"; b.innerHTML = "<p class='TEST'></p>"; if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) { k = function (b, e, f, g) { e = e || c; if (!g && !k.isXML(e)) { var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b); if (h && (e.nodeType === 1 || e.nodeType === 9)) { if (h[1]) return p(e.getElementsByTagName(b), f); if (h[2] && l.find.CLASS && e.getElementsByClassName) return p(e.getElementsByClassName(h[2]), f) } if (e.nodeType === 9) { if (b === "body" && e.body) return p([e.body], f); if (h && h[3]) { var i = e.getElementById(h[3]); if (!i || !i.parentNode) return p([], f); if (i.id === h[3]) return p([i], f) } try { return p(e.querySelectorAll(b), f) } catch (j) { } } else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") { var m = e, n = e.getAttribute("id"), o = n || d, q = e.parentNode, r = /^\s*[+~]/.test(b); n ? o = o.replace(/'/g, "\\$&") : e.setAttribute("id", o), r && q && (e = e.parentNode); try { if (!r || q) return p(e.querySelectorAll("[id='" + o + "'] " + b), f) } catch (s) { } finally { n || m.removeAttribute("id") } } } return a(b, e, f, g) }; for (var e in a) k[e] = a[e]; b = null } }(), function () { var a = c.documentElement, b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector, d = !1; try { b.call(c.documentElement, "[test!='']:sizzle") } catch (e) { d = !0 } b && (k.matchesSelector = function (a, c) { c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']"); if (!k.isXML(a)) try { if (d || !l.match.PSEUDO.test(c) && !/!=/.test(c)) return b.call(a, c) } catch (e) { } return k(c, null, null, [a]).length > 0 }) }(), function () { var a = c.createElement("div"); a.innerHTML = "<div class='test e'></div><div class='test'></div>"; if (a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) { a.lastChild.className = "e"; if (a.getElementsByClassName("e").length === 1) return; l.order.splice(1, 0, "CLASS"), l.find.CLASS = function (a, b, c) { if (typeof b.getElementsByClassName !== "undefined" && !c) return b.getElementsByClassName(a[1]) }, a = null } }(), c.documentElement.contains ? k.contains = function (a, b) { return a !== b && (a.contains ? a.contains(b) : !0) } : c.documentElement.compareDocumentPosition ? k.contains = function (a, b) { return !!(a.compareDocumentPosition(b) & 16) } : k.contains = function () { return !1 }, k.isXML = function (a) { var b = (a ? a.ownerDocument || a : 0).documentElement; return b ? b.nodeName !== "HTML" : !1 }; var v = function (a, b) { var c, d = [], e = "", f = b.nodeType ? [b] : b; while (c = l.match.PSEUDO.exec(a)) e += c[0], a = a.replace(l.match.PSEUDO, ""); a = l.relative[a] ? a + "*" : a; for (var g = 0, h = f.length; g < h; g++) k(a, f[g], d); return k.filter(e, d) }; d.find = k, d.expr = k.selectors, d.expr[":"] = d.expr.filters, d.unique = k.uniqueSort, d.text = k.getText, d.isXMLDoc = k.isXML, d.contains = k.contains }(); var G = /Until$/, H = /^(?:parents|prevUntil|prevAll)/, I = /,/, J = /^.[^:#\[\.,]*$/, K = Array.prototype.slice, L = d.expr.match.POS, M = { children: !0, contents: !0, next: !0, prev: !0 }; d.fn.extend({ find: function (a) { var b = this.pushStack("", "find", a), c = 0; for (var e = 0, f = this.length; e < f; e++) { c = b.length, d.find(a, this[e], b); if (e > 0) for (var g = c; g < b.length; g++) for (var h = 0; h < c; h++) if (b[h] === b[g]) { b.splice(g--, 1); break } } return b }, has: function (a) { var b = d(a); return this.filter(function () { for (var a = 0, c = b.length; a < c; a++) if (d.contains(this, b[a])) return !0 }) }, not: function (a) { return this.pushStack(O(this, a, !1), "not", a) }, filter: function (a) { return this.pushStack(O(this, a, !0), "filter", a) }, is: function (a) { return !!a && d.filter(a, this).length > 0 }, closest: function (a, b) { var c = [], e, f, g = this[0]; if (d.isArray(a)) { var h, i, j = {}, k = 1; if (g && a.length) { for (e = 0, f = a.length; e < f; e++) i = a[e], j[i] || (j[i] = d.expr.match.POS.test(i) ? d(i, b || this.context) : i); while (g && g.ownerDocument && g !== b) { for (i in j) h = j[i], (h.jquery ? h.index(g) > -1 : d(g).is(h)) && c.push({ selector: i, elem: g, level: k }); g = g.parentNode, k++ } } return c } var l = L.test(a) ? d(a, b || this.context) : null; for (e = 0, f = this.length; e < f; e++) { g = this[e]; while (g) { if (l ? l.index(g) > -1 : d.find.matchesSelector(g, a)) { c.push(g); break } g = g.parentNode; if (!g || !g.ownerDocument || g === b) break } } c = c.length > 1 ? d.unique(c) : c; return this.pushStack(c, "closest", a) }, index: function (a) { if (!a || typeof a === "string") return d.inArray(this[0], a ? d(a) : this.parent().children()); return d.inArray(a.jquery ? a[0] : a, this) }, add: function (a, b) { var c = typeof a === "string" ? d(a, b) : d.makeArray(a), e = d.merge(this.get(), c); return this.pushStack(N(c[0]) || N(e[0]) ? e : d.unique(e)) }, andSelf: function () { return this.add(this.prevObject) } }), d.each({ parent: function (a) { var b = a.parentNode; return b && b.nodeType !== 11 ? b : null }, parents: function (a) { return d.dir(a, "parentNode") }, parentsUntil: function (a, b, c) { return d.dir(a, "parentNode", c) }, next: function (a) { return d.nth(a, 2, "nextSibling") }, prev: function (a) { return d.nth(a, 2, "previousSibling") }, nextAll: function (a) { return d.dir(a, "nextSibling") }, prevAll: function (a) { return d.dir(a, "previousSibling") }, nextUntil: function (a, b, c) { return d.dir(a, "nextSibling", c) }, prevUntil: function (a, b, c) { return d.dir(a, "previousSibling", c) }, siblings: function (a) { return d.sibling(a.parentNode.firstChild, a) }, children: function (a) { return d.sibling(a.firstChild) }, contents: function (a) { return d.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : d.makeArray(a.childNodes) } }, function (a, b) { d.fn[a] = function (c, e) { var f = d.map(this, b, c), g = K.call(arguments); G.test(a) || (e = c), e && typeof e === "string" && (f = d.filter(e, f)), f = this.length > 1 && !M[a] ? d.unique(f) : f, (this.length > 1 || I.test(e)) && H.test(a) && (f = f.reverse()); return this.pushStack(f, a, g.join(",")) } }), d.extend({ filter: function (a, b, c) { c && (a = ":not(" + a + ")"); return b.length === 1 ? d.find.matchesSelector(b[0], a) ? [b[0]] : [] : d.find.matches(a, b) }, dir: function (a, c, e) { var f = [], g = a[c]; while (g && g.nodeType !== 9 && (e === b || g.nodeType !== 1 || !d(g).is(e))) g.nodeType === 1 && f.push(g), g = g[c]; return f }, nth: function (a, b, c, d) { b = b || 1; var e = 0; for (; a; a = a[c]) if (a.nodeType === 1 && ++e === b) break; return a }, sibling: function (a, b) { var c = []; for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a); return c } }); var P = / jQuery\d+="(?:\d+|null)"/g, Q = /^\s+/, R = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, S = /<([\w:]+)/, T = /<tbody/i, U = /<|&#?\w+;/, V = /<(?:script|object|embed|option|style)/i, W = /checked\s*(?:[^=]|=\s*.checked.)/i, X = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area: [1, "<map>", "</map>"], _default: [0, "", ""] }; X.optgroup = X.option, X.tbody = X.tfoot = X.colgroup = X.caption = X.thead, X.th = X.td, d.support.htmlSerialize || (X._default = [1, "div<div>", "</div>"]), d.fn.extend({ text: function (a) { if (d.isFunction(a)) return this.each(function (b) { var c = d(this); c.text(a.call(this, b, c.text())) }); if (typeof a !== "object" && a !== b) return this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a)); return d.text(this) }, wrapAll: function (a) { if (d.isFunction(a)) return this.each(function (b) { d(this).wrapAll(a.call(this, b)) }); if (this[0]) { var b = d(a, this[0].ownerDocument).eq(0).clone(!0); this[0].parentNode && b.insertBefore(this[0]), b.map(function () { var a = this; while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild; return a }).append(this) } return this }, wrapInner: function (a) { if (d.isFunction(a)) return this.each(function (b) { d(this).wrapInner(a.call(this, b)) }); return this.each(function () { var b = d(this), c = b.contents(); c.length ? c.wrapAll(a) : b.append(a) }) }, wrap: function (a) { return this.each(function () { d(this).wrapAll(a) }) }, unwrap: function () { return this.parent().each(function () { d.nodeName(this, "body") || d(this).replaceWith(this.childNodes) }).end() }, append: function () { return this.domManip(arguments, !0, function (a) { this.nodeType === 1 && this.appendChild(a) }) }, prepend: function () { return this.domManip(arguments, !0, function (a) { this.nodeType === 1 && this.insertBefore(a, this.firstChild) }) }, before: function () { if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) { this.parentNode.insertBefore(a, this) }); if (arguments.length) { var a = d(arguments[0]); a.push.apply(a, this.toArray()); return this.pushStack(a, "before", arguments) } }, after: function () { if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) { this.parentNode.insertBefore(a, this.nextSibling) }); if (arguments.length) { var a = this.pushStack(this, "after", arguments); a.push.apply(a, d(arguments[0]).toArray()); return a } }, remove: function (a, b) { for (var c = 0, e; (e = this[c]) != null; c++) if (!a || d.filter(a, [e]).length) !b && e.nodeType === 1 && (d.cleanData(e.getElementsByTagName("*")), d.cleanData([e])), e.parentNode && e.parentNode.removeChild(e); return this }, empty: function () { for (var a = 0, b; (b = this[a]) != null; a++) { b.nodeType === 1 && d.cleanData(b.getElementsByTagName("*")); while (b.firstChild) b.removeChild(b.firstChild) } return this }, clone: function (a, b) { a = a == null ? !1 : a, b = b == null ? a : b; return this.map(function () { return d.clone(this, a, b) }) }, html: function (a) { if (a === b) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(P, "") : null; if (typeof a !== "string" || V.test(a) || !d.support.leadingWhitespace && Q.test(a) || X[(S.exec(a) || ["", ""])[1].toLowerCase()]) d.isFunction(a) ? this.each(function (b) { var c = d(this); c.html(a.call(this, b, c.html())) }) : this.empty().append(a); else { a = a.replace(R, "<$1></$2>"); try { for (var c = 0, e = this.length; c < e; c++) this[c].nodeType === 1 && (d.cleanData(this[c].getElementsByTagName("*")), this[c].innerHTML = a) } catch (f) { this.empty().append(a) } } return this }, replaceWith: function (a) { if (this[0] && this[0].parentNode) { if (d.isFunction(a)) return this.each(function (b) { var c = d(this), e = c.html(); c.replaceWith(a.call(this, b, e)) }); typeof a !== "string" && (a = d(a).detach()); return this.each(function () { var b = this.nextSibling, c = this.parentNode; d(this).remove(), b ? d(b).before(a) : d(c).append(a) }) } return this.pushStack(d(d.isFunction(a) ? a() : a), "replaceWith", a) }, detach: function (a) { return this.remove(a, !0) }, domManip: function (a, c, e) { var f, g, h, i, j = a[0], k = []; if (!d.support.checkClone && arguments.length === 3 && typeof j === "string" && W.test(j)) return this.each(function () { d(this).domManip(a, c, e, !0) }); if (d.isFunction(j)) return this.each(function (f) { var g = d(this); a[0] = j.call(this, f, c ? g.html() : b), g.domManip(a, c, e) }); if (this[0]) { i = j && j.parentNode, d.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? f = { fragment: i } : f = d.buildFragment(a, this, k), h = f.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild; if (g) { c = c && d.nodeName(g, "tr"); for (var l = 0, m = this.length, n = m - 1; l < m; l++) e.call(c ? Y(this[l], g) : this[l], f.cacheable || m > 1 && l < n ? d.clone(h, !0, !0) : h) } k.length && d.each(k, ba) } return this } }), d.buildFragment = function (a, b, e) { var f, g, h, i = b && b[0] ? b[0].ownerDocument || b[0] : c; a.length === 1 && typeof a[0] === "string" && a[0].length < 512 && i === c && a[0].charAt(0) === "<" && !V.test(a[0]) && (d.support.checkClone || !W.test(a[0])) && (g = !0, h = d.fragments[a[0]], h && (h !== 1 && (f = h))), f || (f = i.createDocumentFragment(), d.clean(a, i, f, e)), g && (d.fragments[a[0]] = h ? f : 1); return { fragment: f, cacheable: g } }, d.fragments = {}, d.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (a, b) { d.fn[a] = function (c) { var e = [], f = d(c), g = this.length === 1 && this[0].parentNode; if (g && g.nodeType === 11 && g.childNodes.length === 1 && f.length === 1) { f[b](this[0]); return this } for (var h = 0, i = f.length; h < i; h++) { var j = (h > 0 ? this.clone(!0) : this).get(); d(f[h])[b](j), e = e.concat(j) } return this.pushStack(e, a, f.selector) } }), d.extend({ clone: function (a, b, c) { var e = a.cloneNode(!0), f, g, h; if ((!d.support.noCloneEvent || !d.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !d.isXMLDoc(a)) { $(a, e), f = _(a), g = _(e); for (h = 0; f[h]; ++h) $(f[h], g[h]) } if (b) { Z(a, e); if (c) { f = _(a), g = _(e); for (h = 0; f[h]; ++h) Z(f[h], g[h]) } } return e }, clean: function (a, b, e, f) { b = b || c, typeof b.createElement === "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c); var g = []; for (var h = 0, i; (i = a[h]) != null; h++) { typeof i === "number" && (i += ""); if (!i) continue; if (typeof i !== "string" || U.test(i)) { if (typeof i === "string") { i = i.replace(R, "<$1></$2>"); var j = (S.exec(i) || ["", ""])[1].toLowerCase(), k = X[j] || X._default, l = k[0], m = b.createElement("div"); m.innerHTML = k[1] + i + k[2]; while (l--) m = m.lastChild; if (!d.support.tbody) { var n = T.test(i), o = j === "table" && !n ? m.firstChild && m.firstChild.childNodes : k[1] === "<table>" && !n ? m.childNodes : []; for (var p = o.length - 1; p >= 0; --p) d.nodeName(o[p], "tbody") && !o[p].childNodes.length && o[p].parentNode.removeChild(o[p]) } !d.support.leadingWhitespace && Q.test(i) && m.insertBefore(b.createTextNode(Q.exec(i)[0]), m.firstChild), i = m.childNodes } } else i = b.createTextNode(i); i.nodeType ? g.push(i) : g = d.merge(g, i) } if (e) for (h = 0; g[h]; h++) !f || !d.nodeName(g[h], "script") || g[h].type && g[h].type.toLowerCase() !== "text/javascript" ? (g[h].nodeType === 1 && g.splice.apply(g, [h + 1, 0].concat(d.makeArray(g[h].getElementsByTagName("script")))), e.appendChild(g[h])) : f.push(g[h].parentNode ? g[h].parentNode.removeChild(g[h]) : g[h]); return g }, cleanData: function (a) { var b, c, e = d.cache, f = d.expando, g = d.event.special, h = d.support.deleteExpando; for (var i = 0, j; (j = a[i]) != null; i++) { if (j.nodeName && d.noData[j.nodeName.toLowerCase()]) continue; c = j[d.expando]; if (c) { b = e[c] && e[c][f]; if (b && b.events) { for (var k in b.events) g[k] ? d.event.remove(j, k) : d.removeEvent(j, k, b.handle); b.handle && (b.handle.elem = null) } h ? delete j[d.expando] : j.removeAttribute && j.removeAttribute(d.expando), delete e[c] } } } }); var bb = /alpha\([^)]*\)/i, bc = /opacity=([^)]*)/, bd = /-([a-z])/ig, be = /([A-Z])/g, bf = /^-?\d+(?:px)?$/i, bg = /^-?\d/, bh = { position: "absolute", visibility: "hidden", display: "block" }, bi = ["Left", "Right"], bj = ["Top", "Bottom"], bk, bl, bm, bn = function (a, b) { return b.toUpperCase() }; d.fn.css = function (a, c) { if (arguments.length === 2 && c === b) return this; return d.access(this, a, c, !0, function (a, c, e) { return e !== b ? d.style(a, c, e) : d.css(a, c) }) }, d.extend({ cssHooks: { opacity: { get: function (a, b) { if (b) { var c = bk(a, "opacity", "opacity"); return c === "" ? "1" : c } return a.style.opacity } } }, cssNumber: { zIndex: !0, fontWeight: !0, opacity: !0, zoom: !0, lineHeight: !0 }, cssProps: { "float": d.support.cssFloat ? "cssFloat" : "styleFloat" }, style: function (a, c, e, f) { if (a && a.nodeType !== 3 && a.nodeType !== 8 && a.style) { var g, h = d.camelCase(c), i = a.style, j = d.cssHooks[h]; c = d.cssProps[h] || h; if (e === b) { if (j && "get" in j && (g = j.get(a, !1, f)) !== b) return g; return i[c] } if (typeof e === "number" && isNaN(e) || e == null) return; typeof e === "number" && !d.cssNumber[h] && (e += "px"); if (!j || !("set" in j) || (e = j.set(a, e)) !== b) try { i[c] = e } catch (k) { } } }, css: function (a, c, e) { var f, g = d.camelCase(c), h = d.cssHooks[g]; c = d.cssProps[g] || g; if (h && "get" in h && (f = h.get(a, !0, e)) !== b) return f; if (bk) return bk(a, c, g) }, swap: function (a, b, c) { var d = {}; for (var e in b) d[e] = a.style[e], a.style[e] = b[e]; c.call(a); for (e in b) a.style[e] = d[e] }, camelCase: function (a) { return a.replace(bd, bn) } }), d.curCSS = d.css, d.each(["height", "width"], function (a, b) { d.cssHooks[b] = { get: function (a, c, e) { var f; if (c) { a.offsetWidth !== 0 ? f = bo(a, b, e) : d.swap(a, bh, function () { f = bo(a, b, e) }); if (f <= 0) { f = bk(a, b, b), f === "0px" && bm && (f = bm(a, b, b)); if (f != null) return f === "" || f === "auto" ? "0px" : f } if (f < 0 || f == null) { f = a.style[b]; return f === "" || f === "auto" ? "0px" : f } return typeof f === "string" ? f : f + "px" } }, set: function (a, b) { if (!bf.test(b)) return b; b = parseFloat(b); if (b >= 0) return b + "px" } } }), d.support.opacity || (d.cssHooks.opacity = { get: function (a, b) { return bc.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : "" }, set: function (a, b) { var c = a.style; c.zoom = 1; var e = d.isNaN(b) ? "" : "alpha(opacity=" + b * 100 + ")", f = c.filter || ""; c.filter = bb.test(f) ? f.replace(bb, e) : c.filter + " " + e } }), c.defaultView && c.defaultView.getComputedStyle && (bl = function (a, c, e) { var f, g, h; e = e.replace(be, "-$1").toLowerCase(); if (!(g = a.ownerDocument.defaultView)) return b; if (h = g.getComputedStyle(a, null)) f = h.getPropertyValue(e), f === "" && !d.contains(a.ownerDocument.documentElement, a) && (f = d.style(a, e)); return f }), c.documentElement.currentStyle && (bm = function (a, b) { var c, d = a.currentStyle && a.currentStyle[b], e = a.runtimeStyle && a.runtimeStyle[b], f = a.style; !bf.test(d) && bg.test(d) && (c = f.left, e && (a.runtimeStyle.left = a.currentStyle.left), f.left = b === "fontSize" ? "1em" : d || 0, d = f.pixelLeft + "px", f.left = c, e && (a.runtimeStyle.left = e)); return d === "" ? "auto" : d }), bk = bl || bm, d.expr && d.expr.filters && (d.expr.filters.hidden = function (a) { var b = a.offsetWidth, c = a.offsetHeight; return b === 0 && c === 0 || !d.support.reliableHiddenOffsets && (a.style.display || d.css(a, "display")) === "none" }, d.expr.filters.visible = function (a) { return !d.expr.filters.hidden(a) }); var bp = /%20/g, bq = /\[\]$/, br = /\r?\n/g, bs = /#.*$/, bt = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, bu = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, bv = /(?:^file|^widget|\-extension):$/, bw = /^(?:GET|HEAD)$/, bx = /^\/\//, by = /\?/, bz = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, bA = /^(?:select|textarea)/i, bB = /\s+/, bC = /([?&])_=[^&]*/, bD = /(^|\-)([a-z])/g, bE = function (a, b, c) { return b + c.toUpperCase() }, bF = /^([\w\+\.\-]+:)\/\/([^\/?#:]*)(?::(\d+))?/, bG = d.fn.load, bH = {}, bI = {}, bJ, bK; try { bJ = c.location.href } catch (bL) { bJ = c.createElement("a"), bJ.href = "", bJ = bJ.href } bK = bF.exec(bJ.toLowerCase()), d.fn.extend({ load: function (a, c, e) { if (typeof a !== "string" && bG) return bG.apply(this, arguments); if (!this.length) return this; var f = a.indexOf(" "); if (f >= 0) { var g = a.slice(f, a.length); a = a.slice(0, f) } var h = "GET"; c && (d.isFunction(c) ? (e = c, c = b) : typeof c === "object" && (c = d.param(c, d.ajaxSettings.traditional), h = "POST")); var i = this; d.ajax({ url: a, type: h, dataType: "html", data: c, complete: function (a, b, c) { c = a.responseText, a.isResolved() && (a.done(function (a) { c = a }), i.html(g ? d("<div>").append(c.replace(bz, "")).find(g) : c)), e && i.each(e, [c, b, a]) } }); return this }, serialize: function () { return d.param(this.serializeArray()) }, serializeArray: function () { return this.map(function () { return this.elements ? d.makeArray(this.elements) : this }).filter(function () { return this.name && !this.disabled && (this.checked || bA.test(this.nodeName) || bu.test(this.type)) }).map(function (a, b) { var c = d(this).val(); return c == null ? null : d.isArray(c) ? d.map(c, function (a, c) { return { name: b.name, value: a.replace(br, "\r\n") } }) : { name: b.name, value: c.replace(br, "\r\n") } }).get() } }), d.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) { d.fn[b] = function (a) { return this.bind(b, a) } }), d.each(["get", "post"], function (a, c) { d[c] = function (a, e, f, g) { d.isFunction(e) && (g = g || f, f = e, e = b); return d.ajax({ type: c, url: a, data: e, success: f, dataType: g }) } }), d.extend({ getScript: function (a, c) { return d.get(a, b, c, "script") }, getJSON: function (a, b, c) { return d.get(a, b, c, "json") }, ajaxSetup: function (a, b) { b ? d.extend(!0, a, d.ajaxSettings, b) : (b = a, a = d.extend(!0, d.ajaxSettings, b)); for (var c in { context: 1, url: 1 }) c in b ? a[c] = b[c] : c in d.ajaxSettings && (a[c] = d.ajaxSettings[c]); return a }, ajaxSettings: { url: bJ, isLocal: bv.test(bK[1]), global: !0, type: "GET", contentType: "application/x-www-form-urlencoded", processData: !0, async: !0, accepts: { xml: "application/xml, text/xml", html: "text/html", text: "text/plain", json: "application/json, text/javascript", "*": "*/*" }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText" }, converters: { "* text": a.String, "text html": !0, "text json": d.parseJSON, "text xml": d.parseXML } }, ajaxPrefilter: bM(bH), ajaxTransport: bM(bI), ajax: function (a, c) { function v(a, c, l, n) { if (r !== 2) { r = 2, p && clearTimeout(p), o = b, m = n || "", u.readyState = a ? 4 : 0; var q, t, v, w = l ? bP(e, u, l) : b, x, y; if (a >= 200 && a < 300 || a === 304) { if (e.ifModified) { if (x = u.getResponseHeader("Last-Modified")) d.lastModified[k] = x; if (y = u.getResponseHeader("Etag")) d.etag[k] = y } if (a === 304) c = "notmodified", q = !0; else try { t = bQ(e, w), c = "success", q = !0 } catch (z) { c = "parsererror", v = z } } else { v = c; if (!c || a) c = "error", a < 0 && (a = 0) } u.status = a, u.statusText = c, q ? h.resolveWith(f, [t, c, u]) : h.rejectWith(f, [u, c, v]), u.statusCode(j), j = b, s && g.trigger("ajax" + (q ? "Success" : "Error"), [u, e, q ? t : v]), i.resolveWith(f, [u, c]), s && (g.trigger("ajaxComplete", [u, e]), --d.active || d.event.trigger("ajaxStop")) } } typeof a === "object" && (c = a, a = b), c = c || {}; var e = d.ajaxSetup({}, c), f = e.context || e, g = f !== e && (f.nodeType || f instanceof d) ? d(f) : d.event, h = d.Deferred(), i = d._Deferred(), j = e.statusCode || {}, k, l = {}, m, n, o, p, q, r = 0, s, t, u = { readyState: 0, setRequestHeader: function (a, b) { r || (l[a.toLowerCase().replace(bD, bE)] = b); return this }, getAllResponseHeaders: function () { return r === 2 ? m : null }, getResponseHeader: function (a) { var c; if (r === 2) { if (!n) { n = {}; while (c = bt.exec(m)) n[c[1].toLowerCase()] = c[2] } c = n[a.toLowerCase()] } return c === b ? null : c }, overrideMimeType: function (a) { r || (e.mimeType = a); return this }, abort: function (a) { a = a || "abort", o && o.abort(a), v(0, a); return this } }; h.promise(u), u.success = u.done, u.error = u.fail, u.complete = i.done, u.statusCode = function (a) { if (a) { var b; if (r < 2) for (b in a) j[b] = [j[b], a[b]]; else b = a[u.status], u.then(b, b) } return this }, e.url = ((a || e.url) + "").replace(bs, "").replace(bx, bK[1] + "//"), e.dataTypes = d.trim(e.dataType || "*").toLowerCase().split(bB), e.crossDomain || (q = bF.exec(e.url.toLowerCase()), e.crossDomain = q && (q[1] != bK[1] || q[2] != bK[2] || (q[3] || (q[1] === "http:" ? 80 : 443)) != (bK[3] || (bK[1] === "http:" ? 80 : 443)))), e.data && e.processData && typeof e.data !== "string" && (e.data = d.param(e.data, e.traditional)), bN(bH, e, c, u); if (r === 2) return !1; s = e.global, e.type = e.type.toUpperCase(), e.hasContent = !bw.test(e.type), s && d.active++ === 0 && d.event.trigger("ajaxStart"); if (!e.hasContent) { e.data && (e.url += (by.test(e.url) ? "&" : "?") + e.data), k = e.url; if (e.cache === !1) { var w = d.now(), x = e.url.replace(bC, "$1_=" + w); e.url = x + (x === e.url ? (by.test(e.url) ? "&" : "?") + "_=" + w : "") } } if (e.data && e.hasContent && e.contentType !== !1 || c.contentType) l["Content-Type"] = e.contentType; e.ifModified && (k = k || e.url, d.lastModified[k] && (l["If-Modified-Since"] = d.lastModified[k]), d.etag[k] && (l["If-None-Match"] = d.etag[k])), l.Accept = e.dataTypes[0] && e.accepts[e.dataTypes[0]] ? e.accepts[e.dataTypes[0]] + (e.dataTypes[0] !== "*" ? ", */*; q=0.01" : "") : e.accepts["*"]; for (t in e.headers) u.setRequestHeader(t, e.headers[t]); if (e.beforeSend && (e.beforeSend.call(f, u, e) === !1 || r === 2)) { u.abort(); return !1 } for (t in { success: 1, error: 1, complete: 1 }) u[t](e[t]); o = bN(bI, e, c, u); if (o) { u.readyState = 1, s && g.trigger("ajaxSend", [u, e]), e.async && e.timeout > 0 && (p = setTimeout(function () { u.abort("timeout") }, e.timeout)); try { r = 1, o.send(l, v) } catch (y) { status < 2 ? v(-1, y) : d.error(y) } } else v(-1, "No Transport"); return u }, param: function (a, c) { var e = [], f = function (a, b) { b = d.isFunction(b) ? b() : b, e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b) }; c === b && (c = d.ajaxSettings.traditional); if (d.isArray(a) || a.jquery && !d.isPlainObject(a)) d.each(a, function () { f(this.name, this.value) }); else for (var g in a) bO(g, a[g], c, f); return e.join("&").replace(bp, "+") } }), d.extend({ active: 0, lastModified: {}, etag: {} }); var bR = d.now(), bS = /(\=)\?(&|$)|()\?\?()/i; d.ajaxSetup({ jsonp: "callback", jsonpCallback: function () { return d.expando + "_" + bR++ } }), d.ajaxPrefilter("json jsonp", function (b, c, e) { var f = typeof b.data === "string"; if (b.dataTypes[0] === "jsonp" || c.jsonpCallback || c.jsonp != null || b.jsonp !== !1 && (bS.test(b.url) || f && bS.test(b.data))) { var g, h = b.jsonpCallback = d.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, i = a[h], j = b.url, k = b.data, l = "$1" + h + "$2", m = function () { a[h] = i, g && d.isFunction(i) && a[h](g[0]) }; b.jsonp !== !1 && (j = j.replace(bS, l), b.url === j && (f && (k = k.replace(bS, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function (a) { g = [a] }, e.then(m, m), b.converters["script json"] = function () { g || d.error(h + " was not called"); return g[0] }, b.dataTypes[0] = "json"; return "script" } }), d.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /javascript|ecmascript/ }, converters: { "text script": function (a) { d.globalEval(a); return a } } }), d.ajaxPrefilter("script", function (a) { a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1) }), d.ajaxTransport("script", function (a) { if (a.crossDomain) { var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement; return { send: function (f, g) { d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function (a, c) { if (!d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success") }, e.insertBefore(d, e.firstChild) }, abort: function () { d && d.onload(0, 1) } } } }); var bT = d.now(), bU, bV; d.ajaxSettings.xhr = a.ActiveXObject ? function () { return !this.isLocal && bX() || bY() } : bX, bV = d.ajaxSettings.xhr(), d.support.ajax = !!bV, d.support.cors = bV && "withCredentials" in bV, bV = b, d.support.ajax && d.ajaxTransport(function (a) { if (!a.crossDomain || d.support.cors) { var c; return { send: function (e, f) { var g = a.xhr(), h, i; a.username ? g.open(a.type, a.url, a.async, a.username, a.password) : g.open(a.type, a.url, a.async); if (a.xhrFields) for (i in a.xhrFields) g[i] = a.xhrFields[i]; a.mimeType && g.overrideMimeType && g.overrideMimeType(a.mimeType), (!a.crossDomain || a.hasContent) && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest"); try { for (i in e) g.setRequestHeader(i, e[i]) } catch (j) { } g.send(a.hasContent && a.data || null), c = function (e, i) { var j, k, l, m, n; try { if (c && (i || g.readyState === 4)) { c = b, h && (g.onreadystatechange = d.noop, delete bU[h]); if (i) g.readyState !== 4 && g.abort(); else { j = g.status, l = g.getAllResponseHeaders(), m = {}, n = g.responseXML, n && n.documentElement && (m.xml = n), m.text = g.responseText; try { k = g.statusText } catch (o) { k = "" } j || !a.isLocal || a.crossDomain ? j === 1223 && (j = 204) : j = m.text ? 200 : 404 } } } catch (p) { i || f(-1, p) } m && f(j, k, m, l) }, a.async && g.readyState !== 4 ? (bU || (bU = {}, bW()), h = bT++, g.onreadystatechange = bU[h] = c) : c() }, abort: function () { c && c(0, 1) } } } }); var bZ = {}, b$ = /^(?:toggle|show|hide)$/, b_ = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, ca, cb = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]]; d.fn.extend({ show: function (a, b, c) { var e, f; if (a || a === 0) return this.animate(cc("show", 3), a, b, c); for (var g = 0, h = this.length; g < h; g++) e = this[g], f = e.style.display, !d._data(e, "olddisplay") && f === "none" && (f = e.style.display = ""), f === "" && d.css(e, "display") === "none" && d._data(e, "olddisplay", cd(e.nodeName)); for (g = 0; g < h; g++) { e = this[g], f = e.style.display; if (f === "" || f === "none") e.style.display = d._data(e, "olddisplay") || "" } return this }, hide: function (a, b, c) { if (a || a === 0) return this.animate(cc("hide", 3), a, b, c); for (var e = 0, f = this.length; e < f; e++) { var g = d.css(this[e], "display"); g !== "none" && !d._data(this[e], "olddisplay") && d._data(this[e], "olddisplay", g) } for (e = 0; e < f; e++) this[e].style.display = "none"; return this }, _toggle: d.fn.toggle, toggle: function (a, b, c) { var e = typeof a === "boolean"; d.isFunction(a) && d.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || e ? this.each(function () { var b = e ? a : d(this).is(":hidden"); d(this)[b ? "show" : "hide"]() }) : this.animate(cc("toggle", 3), a, b, c); return this }, fadeTo: function (a, b, c, d) { return this.filter(":hidden").css("opacity", 0).show().end().animate({ opacity: b }, a, c, d) }, animate: function (a, b, c, e) { var f = d.speed(b, c, e); if (d.isEmptyObject(a)) return this.each(f.complete); return this[f.queue === !1 ? "each" : "queue"](function () { var b = d.extend({}, f), c, e = this.nodeType === 1, g = e && d(this).is(":hidden"), h = this; for (c in a) { var i = d.camelCase(c); c !== i && (a[i] = a[c], delete a[c], c = i); if (a[c] === "hide" && g || a[c] === "show" && !g) return b.complete.call(this); if (e && (c === "height" || c === "width")) { b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY]; if (d.css(this, "display") === "inline" && d.css(this, "float") === "none") if (d.support.inlineBlockNeedsLayout) { var j = cd(this.nodeName); j === "inline" ? this.style.display = "inline-block" : (this.style.display = "inline", this.style.zoom = 1) } else this.style.display = "inline-block" } d.isArray(a[c]) && ((b.specialEasing = b.specialEasing || {})[c] = a[c][1], a[c] = a[c][0]) } b.overflow != null && (this.style.overflow = "hidden"), b.curAnim = d.extend({}, a), d.each(a, function (c, e) { var f = new d.fx(h, b, c); if (b$.test(e)) f[e === "toggle" ? g ? "show" : "hide" : e](a); else { var i = b_.exec(e), j = f.cur(); if (i) { var k = parseFloat(i[2]), l = i[3] || (d.cssNumber[c] ? "" : "px"); l !== "px" && (d.style(h, c, (k || 1) + l), j = (k || 1) / f.cur() * j, d.style(h, c, j + l)), i[1] && (k = (i[1] === "-=" ? -1 : 1) * k + j), f.custom(j, k, l) } else f.custom(j, e, "") } }); return !0 }) }, stop: function (a, b) { var c = d.timers; a && this.queue([]), this.each(function () { for (var a = c.length - 1; a >= 0; a--) c[a].elem === this && (b && c[a](!0), c.splice(a, 1)) }), b || this.dequeue(); return this } }), d.each({ slideDown: cc("show", 1), slideUp: cc("hide", 1), slideToggle: cc("toggle", 1), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (a, b) { d.fn[a] = function (a, c, d) { return this.animate(b, a, c, d) } }), d.extend({ speed: function (a, b, c) { var e = a && typeof a === "object" ? d.extend({}, a) : { complete: c || !c && b || d.isFunction(a) && a, duration: a, easing: c && b || b && !d.isFunction(b) && b }; e.duration = d.fx.off ? 0 : typeof e.duration === "number" ? e.duration : e.duration in d.fx.speeds ? d.fx.speeds[e.duration] : d.fx.speeds._default, e.old = e.complete, e.complete = function () { e.queue !== !1 && d(this).dequeue(), d.isFunction(e.old) && e.old.call(this) }; return e }, easing: { linear: function (a, b, c, d) { return c + d * a }, swing: function (a, b, c, d) { return (-Math.cos(a * Math.PI) / 2 + .5) * d + c } }, timers: [], fx: function (a, b, c) { this.options = b, this.elem = a, this.prop = c, b.orig || (b.orig = {}) } }), d.fx.prototype = { update: function () { this.options.step && this.options.step.call(this.elem, this.now, this), (d.fx.step[this.prop] || d.fx.step._default)(this) }, cur: function () { if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop]; var a, b = d.css(this.elem, this.prop); return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a }, custom: function (a, b, c) { function g(a) { return e.step(a) } var e = this, f = d.fx; this.startTime = d.now(), this.start = a, this.end = b, this.unit = c || this.unit || (d.cssNumber[this.prop] ? "" : "px"), this.now = this.start, this.pos = this.state = 0, g.elem = this.elem, g() && d.timers.push(g) && !ca && (ca = setInterval(f.tick, f.interval)) }, show: function () { this.options.orig[this.prop] = d.style(this.elem, this.prop), this.options.show = !0, this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), d(this.elem).show() }, hide: function () { this.options.orig[this.prop] = d.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0) }, step: function (a) { var b = d.now(), c = !0; if (a || b >= this.options.duration + this.startTime) { this.now = this.end, this.pos = this.state = 1, this.update(), this.options.curAnim[this.prop] = !0; for (var e in this.options.curAnim) this.options.curAnim[e] !== !0 && (c = !1); if (c) { if (this.options.overflow != null && !d.support.shrinkWrapBlocks) { var f = this.elem, g = this.options; d.each(["", "X", "Y"], function (a, b) { f.style["overflow" + b] = g.overflow[a] }) } this.options.hide && d(this.elem).hide(); if (this.options.hide || this.options.show) for (var h in this.options.curAnim) d.style(this.elem, h, this.options.orig[h]); this.options.complete.call(this.elem) } return !1 } var i = b - this.startTime; this.state = i / this.options.duration; var j = this.options.specialEasing && this.options.specialEasing[this.prop], k = this.options.easing || (d.easing.swing ? "swing" : "linear"); this.pos = d.easing[j || k](this.state, i, 0, 1, this.options.duration), this.now = this.start + (this.end - this.start) * this.pos, this.update(); return !0 } }, d.extend(d.fx, { tick: function () { var a = d.timers; for (var b = 0; b < a.length; b++) a[b]() || a.splice(b--, 1); a.length || d.fx.stop() }, interval: 13, stop: function () { clearInterval(ca), ca = null }, speeds: { slow: 600, fast: 200, _default: 400 }, step: { opacity: function (a) { d.style(a.elem, "opacity", a.now) }, _default: function (a) { a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = (a.prop === "width" || a.prop === "height" ? Math.max(0, a.now) : a.now) + a.unit : a.elem[a.prop] = a.now } } }), d.expr && d.expr.filters && (d.expr.filters.animated = function (a) { return d.grep(d.timers, function (b) { return a === b.elem }).length }); var ce = /^t(?:able|d|h)$/i, cf = /^(?:body|html)$/i; "getBoundingClientRect" in c.documentElement ? d.fn.offset = function (a) { var b = this[0], c; if (a) return this.each(function (b) { d.offset.setOffset(this, a, b) }); if (!b || !b.ownerDocument) return null; if (b === b.ownerDocument.body) return d.offset.bodyOffset(b); try { c = b.getBoundingClientRect() } catch (e) { } var f = b.ownerDocument, g = f.documentElement; if (!c || !d.contains(g, b)) return c ? { top: c.top, left: c.left } : { top: 0, left: 0 }; var h = f.body, i = cg(f), j = g.clientTop || h.clientTop || 0, k = g.clientLeft || h.clientLeft || 0, l = i.pageYOffset || d.support.boxModel && g.scrollTop || h.scrollTop, m = i.pageXOffset || d.support.boxModel && g.scrollLeft || h.scrollLeft, n = c.top + l - j, o = c.left + m - k; return { top: n, left: o } } : d.fn.offset = function (a) { var b = this[0]; if (a) return this.each(function (b) { d.offset.setOffset(this, a, b) }); if (!b || !b.ownerDocument) return null; if (b === b.ownerDocument.body) return d.offset.bodyOffset(b); d.offset.initialize(); var c, e = b.offsetParent, f = b, g = b.ownerDocument, h = g.documentElement, i = g.body, j = g.defaultView, k = j ? j.getComputedStyle(b, null) : b.currentStyle, l = b.offsetTop, m = b.offsetLeft; while ((b = b.parentNode) && b !== i && b !== h) { if (d.offset.supportsFixedPosition && k.position === "fixed") break; c = j ? j.getComputedStyle(b, null) : b.currentStyle, l -= b.scrollTop, m -= b.scrollLeft, b === e && (l += b.offsetTop, m += b.offsetLeft, d.offset.doesNotAddBorder && (!d.offset.doesAddBorderForTableAndCells || !ce.test(b.nodeName)) && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), f = e, e = b.offsetParent), d.offset.subtractsBorderForOverflowNotVisible && c.overflow !== "visible" && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), k = c } if (k.position === "relative" || k.position === "static") l += i.offsetTop, m += i.offsetLeft; d.offset.supportsFixedPosition && k.position === "fixed" && (l += Math.max(h.scrollTop, i.scrollTop), m += Math.max(h.scrollLeft, i.scrollLeft)); return { top: l, left: m } }, d.offset = { initialize: function () { var a = c.body, b = c.createElement("div"), e, f, g, h, i = parseFloat(d.css(a, "marginTop")) || 0, j = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>"; d.extend(b.style, { position: "absolute", top: 0, left: 0, margin: 0, border: 0, width: "1px", height: "1px", visibility: "hidden" }), b.innerHTML = j, a.insertBefore(b, a.firstChild), e = b.firstChild, f = e.firstChild, h = e.nextSibling.firstChild.firstChild, this.doesNotAddBorder = f.offsetTop !== 5, this.doesAddBorderForTableAndCells = h.offsetTop === 5, f.style.position = "fixed", f.style.top = "20px", this.supportsFixedPosition = f.offsetTop === 20 || f.offsetTop === 15, f.style.position = f.style.top = "", e.style.overflow = "hidden", e.style.position = "relative", this.subtractsBorderForOverflowNotVisible = f.offsetTop === -5, this.doesNotIncludeMarginInBodyOffset = a.offsetTop !== i, a.removeChild(b), a = b = e = f = g = h = null, d.offset.initialize = d.noop }, bodyOffset: function (a) { var b = a.offsetTop, c = a.offsetLeft; d.offset.initialize(), d.offset.doesNotIncludeMarginInBodyOffset && (b += parseFloat(d.css(a, "marginTop")) || 0, c += parseFloat(d.css(a, "marginLeft")) || 0); return { top: b, left: c } }, setOffset: function (a, b, c) { var e = d.css(a, "position"); e === "static" && (a.style.position = "relative"); var f = d(a), g = f.offset(), h = d.css(a, "top"), i = d.css(a, "left"), j = e === "absolute" && d.inArray("auto", [h, i]) > -1, k = {}, l = {}, m, n; j && (l = f.position()), m = j ? l.top : parseInt(h, 10) || 0, n = j ? l.left : parseInt(i, 10) || 0, d.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : f.css(k) } }, d.fn.extend({ position: function () { if (!this[0]) return null; var a = this[0], b = this.offsetParent(), c = this.offset(), e = cf.test(b[0].nodeName) ? { top: 0, left: 0 } : b.offset(); c.top -= parseFloat(d.css(a, "marginTop")) || 0, c.left -= parseFloat(d.css(a, "marginLeft")) || 0, e.top += parseFloat(d.css(b[0], "borderTopWidth")) || 0, e.left += parseFloat(d.css(b[0], "borderLeftWidth")) || 0; return { top: c.top - e.top, left: c.left - e.left } }, offsetParent: function () { return this.map(function () { var a = this.offsetParent || c.body; while (a && (!cf.test(a.nodeName) && d.css(a, "position") === "static")) a = a.offsetParent; return a }) } }), d.each(["Left", "Top"], function (a, c) { var e = "scroll" + c; d.fn[e] = function (c) { var f = this[0], g; if (!f) return null; if (c !== b) return this.each(function () { g = cg(this), g ? g.scrollTo(a ? d(g).scrollLeft() : c, a ? c : d(g).scrollTop()) : this[e] = c }); g = cg(f); return g ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : d.support.boxModel && g.document.documentElement[e] || g.document.body[e] : f[e] } }), d.each(["Height", "Width"], function (a, c) { var e = c.toLowerCase(); d.fn["inner" + c] = function () { return this[0] ? parseFloat(d.css(this[0], e, "padding")) : null }, d.fn["outer" + c] = function (a) { return this[0] ? parseFloat(d.css(this[0], e, a ? "margin" : "border")) : null }, d.fn[e] = function (a) { var f = this[0]; if (!f) return a == null ? null : this; if (d.isFunction(a)) return this.each(function (b) { var c = d(this); c[e](a.call(this, b, c[e]())) }); if (d.isWindow(f)) { var g = f.document.documentElement["client" + c]; return f.document.compatMode === "CSS1Compat" && g || f.document.body["client" + c] || g } if (f.nodeType === 9) return Math.max(f.documentElement["client" + c], f.body["scroll" + c], f.documentElement["scroll" + c], f.body["offset" + c], f.documentElement["offset" + c]); if (a === b) { var h = d.css(f, e), i = parseFloat(h); return d.isNaN(i) ? h : i } return this.css(e, typeof a === "string" ? a : a + "px") } }), a.jQuery = a.$ = d })(window);
    (function(a,b){function c(b,c){var e=b.nodeName.toLowerCase();if("area"===e){c=b.parentNode;e=c.name;if(!b.href||!e||c.nodeName.toLowerCase()!=="map")return false;b=a("img[usemap=#"+e+"]")[0];return!!b&&d(b)}return(/input|select|textarea|button|object/.test(e)?!b.disabled:"a"==e?b.href||c:c)&&d(b)}function d(b){return!a(b).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)}).length}a.ui=a.ui||{};if(!a.ui.version){a.extend(a.ui,{version:"1.8.13",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});a.fn.extend({_focus:a.fn.focus,focus:function(b,c){return typeof b==="number"?this.each(function(){var d=this;setTimeout(function(){a(d).focus();c&&c.call(d)},b)}):this._focus.apply(this,arguments)},scrollParent:function(){var b;b=a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!b.length?a(document):b},zIndex:function(c){if(c!==b)return this.css("zIndex",c);if(this.length){c=a(this[0]);for(var d;c.length&&c[0]!==document;){d=c.css("position");if(d==="absolute"||d==="relative"||d==="fixed"){d=parseInt(c.css("zIndex"),10);if(!isNaN(d)&&d!==0)return d}c=c.parent()}}return 0},disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}});a.each(["Width","Height"],function(c,d){function e(b,c,d,e){a.each(f,function(){c-=parseFloat(a.curCSS(b,"padding"+this,true))||0;if(d)c-=parseFloat(a.curCSS(b,"border"+this+"Width",true))||0;if(e)c-=parseFloat(a.curCSS(b,"margin"+this,true))||0});return c}var f=d==="Width"?["Left","Right"]:["Top","Bottom"],g=d.toLowerCase(),h={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(c){if(c===b)return h["inner"+d].call(this);return this.each(function(){a(this).css(g,e(this,c)+"px")})};a.fn["outer"+d]=function(b,c){if(typeof b!=="number")return h["outer"+d].call(this,b);return this.each(function(){a(this).css(g,e(this,b,true,c)+"px")})}});a.extend(a.expr[":"],{data:function(b,c,d){return!!a.data(b,d[3])},focusable:function(b){return c(b,!isNaN(a.attr(b,"tabindex")))},tabbable:function(b){var d=a.attr(b,"tabindex"),e=isNaN(d);return(e||d>=0)&&c(b,!e)}});a(function(){var b=document.body,c=b.appendChild(c=document.createElement("div"));a.extend(c.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});a.support.minHeight=c.offsetHeight===100;a.support.selectstart="onselectstart"in c;b.removeChild(c).style.display="none"});a.extend(a.ui,{plugin:{add:function(b,c,d){b=a.ui[b].prototype;for(var e in d){b.plugins[e]=b.plugins[e]||[];b.plugins[e].push([c,d[e]])}},call:function(a,b,c){if((b=a.plugins[b])&&a.element[0].parentNode)for(var d=0;d<b.length;d++)a.options[b[d][0]]&&b[d][1].apply(a.element,c)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(b,c){if(a(b).css("overflow")==="hidden")return false;c=c&&c==="left"?"scrollLeft":"scrollTop";var d=false;if(b[c]>0)return true;b[c]=1;d=b[c]>0;b[c]=0;return d},isOverAxis:function(a,b,c){return a>b&&a<b+c},isOver:function(b,c,d,e,f,g){return a.ui.isOverAxis(b,d,f)&&a.ui.isOverAxis(c,e,g)}})}})(jQuery);(function(a,b){if(a.cleanData){var c=a.cleanData;a.cleanData=function(b){for(var d=0,e;(e=b[d])!=null;d++)a(e).triggerHandler("remove");c(b)}}else{var d=a.fn.remove;a.fn.remove=function(b,c){return this.each(function(){if(!c)if(!b||a.filter(b,[this]).length)a("*",this).add([this]).each(function(){a(this).triggerHandler("remove")});return d.call(a(this),b,c)})}}a.widget=function(b,c,d){var e=b.split(".")[0],f;b=b.split(".")[1];f=e+"-"+b;if(!d){d=c;c=a.Widget}a.expr[":"][f]=function(c){return!!a.data(c,b)};a[e]=a[e]||{};a[e][b]=function(a,b){arguments.length&&this._createWidget(a,b)};c=new c;c.options=a.extend(true,{},c.options);a[e][b].prototype=a.extend(true,c,{namespace:e,widgetName:b,widgetEventPrefix:a[e][b].prototype.widgetEventPrefix||b,widgetBaseClass:f},d);a.widget.bridge(b,a[e][b])};a.widget.bridge=function(c,d){a.fn[c]=function(f){var h=typeof f==="string",i=Array.prototype.slice.call(arguments,1),j=this;f=!h&&i.length?a.extend.apply(null,[true,f].concat(i)):f;if(h&&f.charAt(0)==="_")return j;h?this.each(function(){var d=a.data(this,c),e=d&&a.isFunction(d[f])?d[f].apply(d,i):d;if(e!==d&&e!==b){j=e;return false}}):this.each(function(){var b=a.data(this,c);b?b.option(f||{})._init():a.data(this,c,new d(f,this))});return j}};a.Widget=function(a,b){arguments.length&&this._createWidget(a,b)};a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(b,c){a.data(c,this.widgetName,this);this.element=a(c);this.options=a.extend(true,{},this.options,this._getCreateOptions(),b);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()});this._create();this._trigger("create");this._init()},_getCreateOptions:function(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")},widget:function(){return this.element},option:function(c,d){var e=c;if(arguments.length===0)return a.extend({},this.options);if(typeof c==="string"){if(d===b)return this.options[c];e={};e[c]=d}this._setOptions(e);return this},_setOptions:function(b){var c=this;a.each(b,function(a,b){c._setOption(a,b)});return this},_setOption:function(a,b){this.options[a]=b;if(a==="disabled")this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",b);return this},enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(b,c,d){var e=this.options[b];c=a.Event(c);c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase();d=d||{};if(c.originalEvent){b=a.event.props.length;for(var f;b;){f=a.event.props[--b];c[f]=c.originalEvent[f]}}this.element.trigger(c,d);return!(a.isFunction(e)&&e.call(this.element[0],c,d)===false||c.isDefaultPrevented())}}})(jQuery);(function(a){var b=false;a(document).mousedown(function(){b=false});a.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var b=this;this.element.bind("mousedown."+this.widgetName,function(a){return b._mouseDown(a)}).bind("click."+this.widgetName,function(d){if(true===a.data(d.target,b.widgetName+".preventClickEvent")){a.removeData(d.target,b.widgetName+".preventClickEvent");d.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)},_mouseDown:function(c){if(!b){this._mouseStarted&&this._mouseUp(c);this._mouseDownEvent=c;var e=this,f=c.which==1,g=typeof this.options.cancel=="string"?a(c.target).parents().add(c.target).filter(this.options.cancel).length:false;if(!f||g||!this._mouseCapture(c))return true;this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet)this._mouseDelayTimer=setTimeout(function(){e.mouseDelayMet=true},this.options.delay);if(this._mouseDistanceMet(c)&&this._mouseDelayMet(c)){this._mouseStarted=this._mouseStart(c)!==false;if(!this._mouseStarted){c.preventDefault();return true}}true===a.data(c.target,this.widgetName+".preventClickEvent")&&a.removeData(c.target,this.widgetName+".preventClickEvent");this._mouseMoveDelegate=function(a){return e._mouseMove(a)};this._mouseUpDelegate=function(a){return e._mouseUp(a)};a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);c.preventDefault();return b=true}},_mouseMove:function(b){if(a.browser.msie&&!(document.documentMode>=9)&&!b.button)return this._mouseUp(b);if(this._mouseStarted){this._mouseDrag(b);return b.preventDefault()}if(this._mouseDistanceMet(b)&&this._mouseDelayMet(b))(this._mouseStarted=this._mouseStart(this._mouseDownEvent,b)!==false)?this._mouseDrag(b):this._mouseUp(b);return!this._mouseStarted},_mouseUp:function(b){a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;b.target==this._mouseDownEvent.target&&a.data(b.target,this.widgetName+".preventClickEvent",true);this._mouseStop(b)}return false},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true}})})(jQuery);(function(a){a.widget("ui.draggable",a.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false},_create:function(){if(this.options.helper=="original"&&!/^(?:r|a|f)/.test(this.element.css("position")))this.element[0].style.position="relative";this.options.addClasses&&this.element.addClass("ui-draggable");this.options.disabled&&this.element.addClass("ui-draggable-disabled");this._mouseInit()},destroy:function(){if(this.element.data("draggable")){this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");this._mouseDestroy();return this}},_mouseCapture:function(b){var c=this.options;if(this.helper||c.disabled||a(b.target).is(".ui-resizable-handle"))return false;this.handle=this._getHandle(b);if(!this.handle)return false;a(c.iframeFix===true?"iframe":c.iframeFix).each(function(){a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(a(this).offset()).appendTo("body")});return true},_mouseStart:function(b){var c=this.options;this.helper=this._createHelper(b);this._cacheHelperProportions();if(a.ui.ddmanager)a.ui.ddmanager.current=this;this._cacheMargins();this.cssPosition=this.helper.css("position");this.scrollParent=this.helper.scrollParent();this.offset=this.positionAbs=this.element.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this.position=this._generatePosition(b);this.originalPageX=b.pageX;this.originalPageY=b.pageY;c.cursorAt&&this._adjustOffsetFromHelper(c.cursorAt);c.containment&&this._setContainment();if(this._trigger("start",b)===false){this._clear();return false}this._cacheHelperProportions();a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b);this.helper.addClass("ui-draggable-dragging");this._mouseDrag(b,true);return true},_mouseDrag:function(b,c){this.position=this._generatePosition(b);this.positionAbs=this._convertPositionTo("absolute");if(!c){c=this._uiHash();if(this._trigger("drag",b,c)===false){this._mouseUp({});return false}this.position=c.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";a.ui.ddmanager&&a.ui.ddmanager.drag(this,b);return false},_mouseStop:function(b){var c=false;if(a.ui.ddmanager&&!this.options.dropBehaviour)c=a.ui.ddmanager.drop(this,b);if(this.dropped){c=this.dropped;this.dropped=false}if((!this.element[0]||!this.element[0].parentNode)&&this.options.helper=="original")return false;if(this.options.revert=="invalid"&&!c||this.options.revert=="valid"&&c||this.options.revert===true||a.isFunction(this.options.revert)&&this.options.revert.call(this.element,c)){var d=this;a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){d._trigger("stop",b)!==false&&d._clear()})}else this._trigger("stop",b)!==false&&this._clear();return false},_mouseUp:function(b){this.options.iframeFix===true&&a("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)});return a.ui.mouse.prototype._mouseUp.call(this,b)},cancel:function(){this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear();return this},_getHandle:function(b){var c=!this.options.handle||!a(this.options.handle,this.element).length?true:false;a(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==b.target)c=true});return c},_createHelper:function(b){var c=this.options;b=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[b])):c.helper=="clone"?this.element.clone().removeAttr("id"):this.element;b.parents("body").length||b.appendTo(c.appendTo=="parent"?this.element[0].parentNode:c.appendTo);b[0]!=this.element[0]&&!/(fixed|absolute)/.test(b.css("position"))&&b.css("position","absolute");return b},_adjustOffsetFromHelper:function(b){if(typeof b=="string")b=b.split(" ");if(a.isArray(b))b={left:+b[0],top:+b[1]||0};if("left"in b)this.offset.click.left=b.left+this.margins.left;if("right"in b)this.offset.click.left=this.helperProportions.width-b.right+this.margins.left;if("top"in b)this.offset.click.top=b.top+this.margins.top;if("bottom"in b)this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])){b.left+=this.scrollParent.scrollLeft();b.top+=this.scrollParent.scrollTop()}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)b={top:0,left:0};return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.element.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var b=this.options;if(b.containment=="parent")b.containment=this.helper[0].parentNode;if(b.containment=="document"||b.containment=="window")this.containment=[(b.containment=="document"?0:a(window).scrollLeft())-this.offset.relative.left-this.offset.parent.left,(b.containment=="document"?0:a(window).scrollTop())-this.offset.relative.top-this.offset.parent.top,(b.containment=="document"?0:a(window).scrollLeft())+a(b.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(b.containment=="document"?0:a(window).scrollTop())+(a(b.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(b.containment)&&b.containment.constructor!=Array){b=a(b.containment);var c=b[0];if(c){b.offset();var d=a(c).css("overflow")!="hidden";this.containment=[(parseInt(a(c).css("borderLeftWidth"),10)||0)+(parseInt(a(c).css("paddingLeft"),10)||0),(parseInt(a(c).css("borderTopWidth"),10)||0)+(parseInt(a(c).css("paddingTop"),10)||0),(d?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-(parseInt(a(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(d?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),10)||0)-(parseInt(a(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom];this.relative_container=b}}else if(b.containment.constructor==Array)this.containment=b.containment},_convertPositionTo:function(b,c){if(!c)c=this.position;b=b=="absolute"?1:-1;var d=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(d[0].tagName);return{top:c.top+this.offset.relative.top*b+this.offset.parent.top*b-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:d.scrollTop())*b),left:c.left+this.offset.relative.left*b+this.offset.parent.left*b-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:d.scrollLeft())*b)}},_generatePosition:function(b){var c=this.options,d=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(d[0].tagName),f=b.pageX,g=b.pageY;if(this.originalPosition){var h;if(this.containment){if(this.relative_container){h=this.relative_container.offset();h=[this.containment[0]+h.left,this.containment[1]+h.top,this.containment[2]+h.left,this.containment[3]+h.top]}else h=this.containment;if(b.pageX-this.offset.click.left<h[0])f=h[0]+this.offset.click.left;if(b.pageY-this.offset.click.top<h[1])g=h[1]+this.offset.click.top;if(b.pageX-this.offset.click.left>h[2])f=h[2]+this.offset.click.left;if(b.pageY-this.offset.click.top>h[3])g=h[3]+this.offset.click.top}if(c.grid){g=this.originalPageY+Math.round((g-this.originalPageY)/c.grid[1])*c.grid[1];g=h?!(g-this.offset.click.top<h[1]||g-this.offset.click.top>h[3])?g:!(g-this.offset.click.top<h[1])?g-c.grid[1]:g+c.grid[1]:g;f=this.originalPageX+Math.round((f-this.originalPageX)/c.grid[0])*c.grid[0];f=h?!(f-this.offset.click.left<h[0]||f-this.offset.click.left>h[2])?f:!(f-this.offset.click.left<h[0])?f-c.grid[0]:f+c.grid[0]:f}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:d.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:d.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging");this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove();this.helper=null;this.cancelHelperRemoval=false},_trigger:function(b,c,d){d=d||this._uiHash();a.ui.plugin.call(this,b,[c,d]);if(b=="drag")this.positionAbs=this._convertPositionTo("absolute");return a.Widget.prototype._trigger.call(this,b,c,d)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}});a.extend(a.ui.draggable,{version:"1.8.13"});a.ui.plugin.add("draggable","connectToSortable",{start:function(b,c){var d=a(this).data("draggable"),e=d.options,f=a.extend({},c,{item:d.element});d.sortables=[];a(e.connectToSortable).each(function(){var c=a.data(this,"sortable");if(c&&!c.options.disabled){d.sortables.push({instance:c,shouldRevert:c.options.revert});c.refreshPositions();c._trigger("activate",b,f)}})},stop:function(b,c){var d=a(this).data("draggable"),e=a.extend({},c,{item:d.element});a.each(d.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;d.cancelHelperRemoval=true;this.instance.cancelHelperRemoval=false;if(this.shouldRevert)this.instance.options.revert=true;this.instance._mouseStop(b);this.instance.options.helper=this.instance.options._helper;d.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})}else{this.instance.cancelHelperRemoval=false;this.instance._trigger("deactivate",b,e)}})},drag:function(b,c){var d=a(this).data("draggable"),e=this;a.each(d.sortables,function(){this.instance.positionAbs=d.positionAbs;this.instance.helperProportions=d.helperProportions;this.instance.offset.click=d.offset.click;if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;this.instance.currentItem=a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",true);this.instance.options._helper=this.instance.options.helper;this.instance.options.helper=function(){return c.helper[0]};b.target=this.instance.currentItem[0];this.instance._mouseCapture(b,true);this.instance._mouseStart(b,true,true);this.instance.offset.click.top=d.offset.click.top;this.instance.offset.click.left=d.offset.click.left;this.instance.offset.parent.left-=d.offset.parent.left-this.instance.offset.parent.left;this.instance.offset.parent.top-=d.offset.parent.top-this.instance.offset.parent.top;d._trigger("toSortable",b);d.dropped=this.instance.element;d.currentItem=d.element;this.instance.fromOutside=d}this.instance.currentItem&&this.instance._mouseDrag(b)}else if(this.instance.isOver){this.instance.isOver=0;this.instance.cancelHelperRemoval=true;this.instance.options.revert=false;this.instance._trigger("out",b,this.instance._uiHash(this.instance));this.instance._mouseStop(b,true);this.instance.options.helper=this.instance.options._helper;this.instance.currentItem.remove();this.instance.placeholder&&this.instance.placeholder.remove();d._trigger("fromSortable",b);d.dropped=false}})}});a.ui.plugin.add("draggable","cursor",{start:function(){var b=a("body"),c=a(this).data("draggable").options;if(b.css("cursor"))c._cursor=b.css("cursor");b.css("cursor",c.cursor)},stop:function(){var b=a(this).data("draggable").options;b._cursor&&a("body").css("cursor",b._cursor)}});a.ui.plugin.add("draggable","opacity",{start:function(b,c){b=a(c.helper);c=a(this).data("draggable").options;if(b.css("opacity"))c._opacity=b.css("opacity");b.css("opacity",c.opacity)},stop:function(b,c){b=a(this).data("draggable").options;b._opacity&&a(c.helper).css("opacity",b._opacity)}});a.ui.plugin.add("draggable","scroll",{start:function(){var b=a(this).data("draggable");if(b.scrollParent[0]!=document&&b.scrollParent[0].tagName!="HTML")b.overflowOffset=b.scrollParent.offset()},drag:function(b){var c=a(this).data("draggable"),d=c.options,e=false;if(c.scrollParent[0]!=document&&c.scrollParent[0].tagName!="HTML"){if(!d.axis||d.axis!="x")if(c.overflowOffset.top+c.scrollParent[0].offsetHeight-b.pageY<d.scrollSensitivity)c.scrollParent[0].scrollTop=e=c.scrollParent[0].scrollTop+d.scrollSpeed;else if(b.pageY-c.overflowOffset.top<d.scrollSensitivity)c.scrollParent[0].scrollTop=e=c.scrollParent[0].scrollTop-d.scrollSpeed;if(!d.axis||d.axis!="y")if(c.overflowOffset.left+c.scrollParent[0].offsetWidth-b.pageX<d.scrollSensitivity)c.scrollParent[0].scrollLeft=e=c.scrollParent[0].scrollLeft+d.scrollSpeed;else if(b.pageX-c.overflowOffset.left<d.scrollSensitivity)c.scrollParent[0].scrollLeft=e=c.scrollParent[0].scrollLeft-d.scrollSpeed}else{if(!d.axis||d.axis!="x")if(b.pageY-a(document).scrollTop()<d.scrollSensitivity)e=a(document).scrollTop(a(document).scrollTop()-d.scrollSpeed);else if(a(window).height()-(b.pageY-a(document).scrollTop())<d.scrollSensitivity)e=a(document).scrollTop(a(document).scrollTop()+d.scrollSpeed);if(!d.axis||d.axis!="y")if(b.pageX-a(document).scrollLeft()<d.scrollSensitivity)e=a(document).scrollLeft(a(document).scrollLeft()-d.scrollSpeed);else if(a(window).width()-(b.pageX-a(document).scrollLeft())<d.scrollSensitivity)e=a(document).scrollLeft(a(document).scrollLeft()+d.scrollSpeed)}e!==false&&a.ui.ddmanager&&!d.dropBehaviour&&a.ui.ddmanager.prepareOffsets(c,b)}});a.ui.plugin.add("draggable","snap",{start:function(){var b=a(this).data("draggable"),c=b.options;b.snapElements=[];a(c.snap.constructor!=String?c.snap.items||":data(draggable)":c.snap).each(function(){var c=a(this),e=c.offset();this!=b.element[0]&&b.snapElements.push({item:this,width:c.outerWidth(),height:c.outerHeight(),top:e.top,left:e.left})})},drag:function(b,c){for(var d=a(this).data("draggable"),e=d.options,f=e.snapTolerance,g=c.offset.left,h=g+d.helperProportions.width,i=c.offset.top,j=i+d.helperProportions.height,k=d.snapElements.length-1;k>=0;k--){var l=d.snapElements[k].left,m=l+d.snapElements[k].width,n=d.snapElements[k].top,o=n+d.snapElements[k].height;if(l-f<g&&g<m+f&&n-f<i&&i<o+f||l-f<g&&g<m+f&&n-f<j&&j<o+f||l-f<h&&h<m+f&&n-f<i&&i<o+f||l-f<h&&h<m+f&&n-f<j&&j<o+f){if(e.snapMode!="inner"){var p=Math.abs(n-j)<=f,q=Math.abs(o-i)<=f,r=Math.abs(l-h)<=f,s=Math.abs(m-g)<=f;if(p)c.position.top=d._convertPositionTo("relative",{top:n-d.helperProportions.height,left:0}).top-d.margins.top;if(q)c.position.top=d._convertPositionTo("relative",{top:o,left:0}).top-d.margins.top;if(r)c.position.left=d._convertPositionTo("relative",{top:0,left:l-d.helperProportions.width}).left-d.margins.left;if(s)c.position.left=d._convertPositionTo("relative",{top:0,left:m}).left-d.margins.left}var t=p||q||r||s;if(e.snapMode!="outer"){p=Math.abs(n-i)<=f;q=Math.abs(o-j)<=f;r=Math.abs(l-g)<=f;s=Math.abs(m-h)<=f;if(p)c.position.top=d._convertPositionTo("relative",{top:n,left:0}).top-d.margins.top;if(q)c.position.top=d._convertPositionTo("relative",{top:o-d.helperProportions.height,left:0}).top-d.margins.top;if(r)c.position.left=d._convertPositionTo("relative",{top:0,left:l}).left-d.margins.left;if(s)c.position.left=d._convertPositionTo("relative",{top:0,left:m-d.helperProportions.width}).left-d.margins.left}if(!d.snapElements[k].snapping&&(p||q||r||s||t))d.options.snap.snap&&d.options.snap.snap.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item}));d.snapElements[k].snapping=p||q||r||s||t}else{d.snapElements[k].snapping&&d.options.snap.release&&d.options.snap.release.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item}));d.snapElements[k].snapping=false}}}});a.ui.plugin.add("draggable","stack",{start:function(){var b=a(this).data("draggable").options;b=a.makeArray(a(b.stack)).sort(function(b,c){return(parseInt(a(b).css("zIndex"),10)||0)-(parseInt(a(c).css("zIndex"),10)||0)});if(b.length){var c=parseInt(b[0].style.zIndex)||0;a(b).each(function(a){this.style.zIndex=c+a});this[0].style.zIndex=c+b.length}}});a.ui.plugin.add("draggable","zIndex",{start:function(b,c){b=a(c.helper);c=a(this).data("draggable").options;if(b.css("zIndex"))c._zIndex=b.css("zIndex");b.css("zIndex",c.zIndex)},stop:function(b,c){b=a(this).data("draggable").options;b._zIndex&&a(c.helper).css("zIndex",b._zIndex)}})})(jQuery);(function(a){a.widget("ui.droppable",{widgetEventPrefix:"drop",options:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect"},_create:function(){var b=this.options,c=b.accept;this.isover=0;this.isout=1;this.accept=a.isFunction(c)?c:function(a){return a.is(c)};this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};a.ui.ddmanager.droppables[b.scope]=a.ui.ddmanager.droppables[b.scope]||[];a.ui.ddmanager.droppables[b.scope].push(this);b.addClasses&&this.element.addClass("ui-droppable")},destroy:function(){for(var b=a.ui.ddmanager.droppables[this.options.scope],c=0;c<b.length;c++)b[c]==this&&b.splice(c,1);this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");return this},_setOption:function(b,c){if(b=="accept")this.accept=a.isFunction(c)?c:function(a){return a.is(c)};a.Widget.prototype._setOption.apply(this,arguments)},_activate:function(b){var c=a.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass);c&&this._trigger("activate",b,this.ui(c))},_deactivate:function(b){var c=a.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass);c&&this._trigger("deactivate",b,this.ui(c))},_over:function(b){var c=a.ui.ddmanager.current;if(!(!c||(c.currentItem||c.element)[0]==this.element[0]))if(this.accept.call(this.element[0],c.currentItem||c.element)){this.options.hoverClass&&this.element.addClass(this.options.hoverClass);this._trigger("over",b,this.ui(c))}},_out:function(b){var c=a.ui.ddmanager.current;if(!(!c||(c.currentItem||c.element)[0]==this.element[0]))if(this.accept.call(this.element[0],c.currentItem||c.element)){this.options.hoverClass&&this.element.removeClass(this.options.hoverClass);this._trigger("out",b,this.ui(c))}},_drop:function(b,c){var d=c||a.ui.ddmanager.current;if(!d||(d.currentItem||d.element)[0]==this.element[0])return false;var e=false;this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var b=a.data(this,"droppable");if(b.options.greedy&&!b.options.disabled&&b.options.scope==d.options.scope&&b.accept.call(b.element[0],d.currentItem||d.element)&&a.ui.intersect(d,a.extend(b,{offset:b.element.offset()}),b.options.tolerance)){e=true;return false}});if(e)return false;if(this.accept.call(this.element[0],d.currentItem||d.element)){this.options.activeClass&&this.element.removeClass(this.options.activeClass);this.options.hoverClass&&this.element.removeClass(this.options.hoverClass);this._trigger("drop",b,this.ui(d));return this.element}return false},ui:function(a){return{draggable:a.currentItem||a.element,helper:a.helper,position:a.position,offset:a.positionAbs}}});a.extend(a.ui.droppable,{version:"1.8.13"});a.ui.intersect=function(b,c,d){if(!c.offset)return false;var e=(b.positionAbs||b.position.absolute).left,f=e+b.helperProportions.width,g=(b.positionAbs||b.position.absolute).top,h=g+b.helperProportions.height,i=c.offset.left,j=i+c.proportions.width,k=c.offset.top,l=k+c.proportions.height;switch(d){case"fit":return i<=e&&f<=j&&k<=g&&h<=l;case"intersect":return i<e+b.helperProportions.width/2&&f-b.helperProportions.width/2<j&&k<g+b.helperProportions.height/2&&h-b.helperProportions.height/2<l;case"pointer":return a.ui.isOver((b.positionAbs||b.position.absolute).top+(b.clickOffset||b.offset.click).top,(b.positionAbs||b.position.absolute).left+(b.clickOffset||b.offset.click).left,k,i,c.proportions.height,c.proportions.width);case"touch":return(g>=k&&g<=l||h>=k&&h<=l||g<k&&h>l)&&(e>=i&&e<=j||f>=i&&f<=j||e<i&&f>j);default:return false}};a.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(b,c){var d=a.ui.ddmanager.droppables[b.options.scope]||[],e=c?c.type:null,f=(b.currentItem||b.element).find(":data(droppable)").andSelf(),g=0;a:for(;g<d.length;g++)if(!(d[g].options.disabled||b&&!d[g].accept.call(d[g].element[0],b.currentItem||b.element))){for(var h=0;h<f.length;h++)if(f[h]==d[g].element[0]){d[g].proportions.height=0;continue a}d[g].visible=d[g].element.css("display")!="none";if(d[g].visible){e=="mousedown"&&d[g]._activate.call(d[g],c);d[g].offset=d[g].element.offset();d[g].proportions={width:d[g].element[0].offsetWidth,height:d[g].element[0].offsetHeight}}}},drop:function(b,c){var d=false;a.each(a.ui.ddmanager.droppables[b.options.scope]||[],function(){if(this.options){if(!this.options.disabled&&this.visible&&a.ui.intersect(b,this,this.options.tolerance))d=d||this._drop.call(this,c);if(!this.options.disabled&&this.visible&&this.accept.call(this.element[0],b.currentItem||b.element)){this.isout=1;this.isover=0;this._deactivate.call(this,c)}}});return d},drag:function(b,c){b.options.refreshPositions&&a.ui.ddmanager.prepareOffsets(b,c);a.each(a.ui.ddmanager.droppables[b.options.scope]||[],function(){if(!(this.options.disabled||this.greedyChild||!this.visible)){var e=a.ui.intersect(b,this,this.options.tolerance);if(e=!e&&this.isover==1?"isout":e&&this.isover==0?"isover":null){var f;if(this.options.greedy){var g=this.element.parents(":data(droppable):eq(0)");if(g.length){f=a.data(g[0],"droppable");f.greedyChild=e=="isover"?1:0}}if(f&&e=="isover"){f.isover=0;f.isout=1;f._out.call(f,c)}this[e]=1;this[e=="isout"?"isover":"isout"]=0;this[e=="isover"?"_over":"_out"].call(this,c);if(f&&e=="isout"){f.isout=0;f.isover=1;f._over.call(f,c)}}}})}}})(jQuery);(function(a){a.widget("ui.resizable",a.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,containment:false,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1e3},_create:function(){var b=this,c=this.options;this.element.addClass("ui-resizable");a.extend(this,{_aspectRatio:!!c.aspectRatio,aspectRatio:c.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:c.helper||c.ghost||c.animate?c.helper||"ui-resizable-helper":null});if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){/relative/.test(this.element.css("position"))&&a.browser.opera&&this.element.css({position:"relative",top:"auto",left:"auto"});this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")}));this.element=this.element.parent().data("resizable",this.element.data("resizable"));this.elementIsWrapper=true;this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});this.originalResizeStyle=this.originalElement.css("resize");this.originalElement.css("resize","none");this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));this.originalElement.css({margin:this.originalElement.css("margin")});this._proportionallyResize()}this.handles=c.handles||(!a(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"});if(this.handles.constructor==String){if(this.handles=="all")this.handles="n,e,s,w,se,sw,ne,nw";var d=this.handles.split(",");this.handles={};for(var e=0;e<d.length;e++){var f=a.trim(d[e]),g=a('<div class="ui-resizable-handle '+("ui-resizable-"+f)+'"></div>');/sw|se|ne|nw/.test(f)&&g.css({zIndex:++c.zIndex});"se"==f&&g.addClass("ui-icon ui-icon-gripsmall-diagonal-se");this.handles[f]=".ui-resizable-"+f;this.element.append(g)}}this._renderAxis=function(b){b=b||this.element;for(var c in this.handles){if(this.handles[c].constructor==String)this.handles[c]=a(this.handles[c],this.element).show();if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var d=a(this.handles[c],this.element),e=0;e=/sw|ne|nw|se|n|s/.test(c)?d.outerHeight():d.outerWidth();d=["padding",/ne|nw|n/.test(c)?"Top":/se|sw|s/.test(c)?"Bottom":/^e$/.test(c)?"Right":"Left"].join("");b.css(d,e);this._proportionallyResize()}a(this.handles[c])}};this._renderAxis(this.element);this._handles=a(".ui-resizable-handle",this.element).disableSelection();this._handles.mouseover(function(){if(!b.resizing){if(this.className)var a=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);b.axis=a&&a[1]?a[1]:"se"}});if(c.autoHide){this._handles.hide();a(this.element).addClass("ui-resizable-autohide").hover(function(){if(!c.disabled){a(this).removeClass("ui-resizable-autohide");b._handles.show()}},function(){if(!c.disabled)if(!b.resizing){a(this).addClass("ui-resizable-autohide");b._handles.hide()}})}this._mouseInit()},destroy:function(){this._mouseDestroy();var b=function(b){a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};if(this.elementIsWrapper){b(this.element);var c=this.element;c.after(this.originalElement.css({position:c.css("position"),width:c.outerWidth(),height:c.outerHeight(),top:c.css("top"),left:c.css("left")})).remove()}this.originalElement.css("resize",this.originalResizeStyle);b(this.originalElement);return this},_mouseCapture:function(b){var c=false;for(var d in this.handles)if(a(this.handles[d])[0]==b.target)c=true;return!this.options.disabled&&c},_mouseStart:function(c){var e=this.options,f=this.element.position(),g=this.element;this.resizing=true;this.documentScroll={top:a(document).scrollTop(),left:a(document).scrollLeft()};if(g.is(".ui-draggable")||/absolute/.test(g.css("position")))g.css({position:"absolute",top:f.top,left:f.left});a.browser.opera&&/relative/.test(g.css("position"))&&g.css({position:"relative",top:"auto",left:"auto"});this._renderProxy();f=b(this.helper.css("left"));var h=b(this.helper.css("top"));if(e.containment){f+=a(e.containment).scrollLeft()||0;h+=a(e.containment).scrollTop()||0}this.offset=this.helper.offset();this.position={left:f,top:h};this.size=this._helper?{width:g.outerWidth(),height:g.outerHeight()}:{width:g.width(),height:g.height()};this.originalSize=this._helper?{width:g.outerWidth(),height:g.outerHeight()}:{width:g.width(),height:g.height()};this.originalPosition={left:f,top:h};this.sizeDiff={width:g.outerWidth()-g.width(),height:g.outerHeight()-g.height()};this.originalMousePosition={left:c.pageX,top:c.pageY};this.aspectRatio=typeof e.aspectRatio=="number"?e.aspectRatio:this.originalSize.width/this.originalSize.height||1;e=a(".ui-resizable-"+this.axis).css("cursor");a("body").css("cursor",e=="auto"?this.axis+"-resize":e);g.addClass("ui-resizable-resizing");this._propagate("start",c);return true},_mouseDrag:function(a){var b=this.helper,c=this.originalMousePosition,d=this._change[this.axis];if(!d)return false;c=d.apply(this,[a,a.pageX-c.left||0,a.pageY-c.top||0]);if(this._aspectRatio||a.shiftKey)c=this._updateRatio(c,a);c=this._respectSize(c,a);this._propagate("resize",a);b.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize();this._updateCache(c);this._trigger("resize",a,this.ui());return false},_mouseStop:function(b){this.resizing=false;var c=this.options,d=this;if(this._helper){var e=this._proportionallyResizeElements,f=e.length&&/textarea/i.test(e[0].nodeName);e=f&&a.ui.hasScroll(e[0],"left")?0:d.sizeDiff.height;f=f?0:d.sizeDiff.width;f={width:d.helper.width()-f,height:d.helper.height()-e};e=parseInt(d.element.css("left"),10)+(d.position.left-d.originalPosition.left)||null;var g=parseInt(d.element.css("top"),10)+(d.position.top-d.originalPosition.top)||null;c.animate||this.element.css(a.extend(f,{top:g,left:e}));d.helper.height(d.size.height);d.helper.width(d.size.width);this._helper&&!c.animate&&this._proportionallyResize()}a("body").css("cursor","auto");this.element.removeClass("ui-resizable-resizing");this._propagate("stop",b);this._helper&&this.helper.remove();return false},_updateCache:function(a){this.offset=this.helper.offset();if(c(a.left))this.position.left=a.left;if(c(a.top))this.position.top=a.top;if(c(a.height))this.size.height=a.height;if(c(a.width))this.size.width=a.width},_updateRatio:function(a){var b=this.position,c=this.size,d=this.axis;if(a.height)a.width=c.height*this.aspectRatio;else if(a.width)a.height=c.width/this.aspectRatio;if(d=="sw"){a.left=b.left+(c.width-a.width);a.top=null}if(d=="nw"){a.top=b.top+(c.height-a.height);a.left=b.left+(c.width-a.width)}return a},_respectSize:function(a){var b=this.options,d=this.axis,e=c(a.width)&&b.maxWidth&&b.maxWidth<a.width,f=c(a.height)&&b.maxHeight&&b.maxHeight<a.height,g=c(a.width)&&b.minWidth&&b.minWidth>a.width,h=c(a.height)&&b.minHeight&&b.minHeight>a.height;if(g)a.width=b.minWidth;if(h)a.height=b.minHeight;if(e)a.width=b.maxWidth;if(f)a.height=b.maxHeight;var i=this.originalPosition.left+this.originalSize.width,j=this.position.top+this.size.height,k=/sw|nw|w/.test(d);d=/nw|ne|n/.test(d);if(g&&k)a.left=i-b.minWidth;if(e&&k)a.left=i-b.maxWidth;if(h&&d)a.top=j-b.minHeight;if(f&&d)a.top=j-b.maxHeight;if((b=!a.width&&!a.height)&&!a.left&&a.top)a.top=null;else if(b&&!a.top&&a.left)a.left=null;return a},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var b=this.helper||this.element,c=0;c<this._proportionallyResizeElements.length;c++){var d=this._proportionallyResizeElements[c];if(!this.borderDif){var e=[d.css("borderTopWidth"),d.css("borderRightWidth"),d.css("borderBottomWidth"),d.css("borderLeftWidth")],f=[d.css("paddingTop"),d.css("paddingRight"),d.css("paddingBottom"),d.css("paddingLeft")];this.borderDif=a.map(e,function(a,b){a=parseInt(a,10)||0;b=parseInt(f[b],10)||0;return a+b})}a.browser.msie&&(a(b).is(":hidden")||a(b).parents(":hidden").length)||d.css({height:b.height()-this.borderDif[0]-this.borderDif[2]||0,width:b.width()-this.borderDif[1]-this.borderDif[3]||0})}},_renderProxy:function(){var b=this.options;this.elementOffset=this.element.offset();if(this._helper){this.helper=this.helper||a('<div style="overflow:hidden;"></div>');var c=a.browser.msie&&a.browser.version<7,d=c?1:0;c=c?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+c,height:this.element.outerHeight()+c,position:"absolute",left:this.elementOffset.left-d+"px",top:this.elementOffset.top-d+"px",zIndex:++b.zIndex});this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(a,b){return{width:this.originalSize.width+b}},w:function(a,b){return{left:this.originalPosition.left+b,width:this.originalSize.width-b}},n:function(a,b,c){return{top:this.originalPosition.top+c,height:this.originalSize.height-c}},s:function(a,b,c){return{height:this.originalSize.height+c}},se:function(b,c,d){return a.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[b,c,d]))},sw:function(b,c,d){return a.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[b,c,d]))},ne:function(b,c,d){return a.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[b,c,d]))},nw:function(b,c,d){return a.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[b,c,d]))}},_propagate:function(b,c){a.ui.plugin.call(this,b,[c,this.ui()]);b!="resize"&&this._trigger(b,c,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}});a.extend(a.ui.resizable,{version:"1.8.13"});a.ui.plugin.add("resizable","alsoResize",{start:function(){var b=a(this).data("resizable").options,c=function(b){a(b).each(function(){var b=a(this);b.data("resizable-alsoresize",{width:parseInt(b.width(),10),height:parseInt(b.height(),10),left:parseInt(b.css("left"),10),top:parseInt(b.css("top"),10),position:b.css("position")})})};if(typeof b.alsoResize=="object"&&!b.alsoResize.parentNode)if(b.alsoResize.length){b.alsoResize=b.alsoResize[0];c(b.alsoResize)}else a.each(b.alsoResize,function(a){c(a)});else c(b.alsoResize)},resize:function(b,c){var d=a(this).data("resizable");b=d.options;var e=d.originalSize,f=d.originalPosition,g={height:d.size.height-e.height||0,width:d.size.width-e.width||0,top:d.position.top-f.top||0,left:d.position.left-f.left||0},h=function(b,e){a(b).each(function(){var b=a(this),f=a(this).data("resizable-alsoresize"),h={},i=e&&e.length?e:b.parents(c.originalElement[0]).length?["width","height"]:["width","height","top","left"];a.each(i,function(a,b){if((a=(f[b]||0)+(g[b]||0))&&a>=0)h[b]=a||null});if(a.browser.opera&&/relative/.test(b.css("position"))){d._revertToRelativePosition=true;b.css({position:"absolute",top:"auto",left:"auto"})}b.css(h)})};typeof b.alsoResize=="object"&&!b.alsoResize.nodeType?a.each(b.alsoResize,function(a,b){h(a,b)}):h(b.alsoResize)},stop:function(){var b=a(this).data("resizable"),c=b.options,d=function(b){a(b).each(function(){var b=a(this);b.css({position:b.data("resizable-alsoresize").position})})};if(b._revertToRelativePosition){b._revertToRelativePosition=false;typeof c.alsoResize=="object"&&!c.alsoResize.nodeType?a.each(c.alsoResize,function(a){d(a)}):d(c.alsoResize)}a(this).removeData("resizable-alsoresize")}});a.ui.plugin.add("resizable","animate",{stop:function(b){var c=a(this).data("resizable"),d=c.options,e=c._proportionallyResizeElements,f=e.length&&/textarea/i.test(e[0].nodeName),g=f&&a.ui.hasScroll(e[0],"left")?0:c.sizeDiff.height;f={width:c.size.width-(f?0:c.sizeDiff.width),height:c.size.height-g};g=parseInt(c.element.css("left"),10)+(c.position.left-c.originalPosition.left)||null;var h=parseInt(c.element.css("top"),10)+(c.position.top-c.originalPosition.top)||null;c.element.animate(a.extend(f,h&&g?{top:h,left:g}:{}),{duration:d.animateDuration,easing:d.animateEasing,step:function(){var d={width:parseInt(c.element.css("width"),10),height:parseInt(c.element.css("height"),10),top:parseInt(c.element.css("top"),10),left:parseInt(c.element.css("left"),10)};e&&e.length&&a(e[0]).css({width:d.width,height:d.height});c._updateCache(d);c._propagate("resize",b)}})}});a.ui.plugin.add("resizable","containment",{start:function(){var c=a(this).data("resizable"),e=c.element,f=c.options.containment;if(e=f instanceof a?f.get(0):/parent/.test(f)?e.parent().get(0):f){c.containerElement=a(e);if(/document/.test(f)||f==document){c.containerOffset={left:0,top:0};c.containerPosition={left:0,top:0};c.parentData={element:a(document),left:0,top:0,width:a(document).width(),height:a(document).height()||document.body.parentNode.scrollHeight}}else{var g=a(e),h=[];a(["Top","Right","Left","Bottom"]).each(function(a,c){h[a]=b(g.css("padding"+c))});c.containerOffset=g.offset();c.containerPosition=g.position();c.containerSize={height:g.innerHeight()-h[3],width:g.innerWidth()-h[1]};f=c.containerOffset;var i=c.containerSize.height,j=c.containerSize.width;j=a.ui.hasScroll(e,"left")?e.scrollWidth:j;i=a.ui.hasScroll(e)?e.scrollHeight:i;c.parentData={element:e,left:f.left,top:f.top,width:j,height:i}}}},resize:function(b){var c=a(this).data("resizable"),d=c.options,e=c.containerOffset,f=c.position;b=c._aspectRatio||b.shiftKey;var g={top:0,left:0},h=c.containerElement;if(h[0]!=document&&/static/.test(h.css("position")))g=e;if(f.left<(c._helper?e.left:0)){c.size.width+=c._helper?c.position.left-e.left:c.position.left-g.left;if(b)c.size.height=c.size.width/d.aspectRatio;c.position.left=d.helper?e.left:0}if(f.top<(c._helper?e.top:0)){c.size.height+=c._helper?c.position.top-e.top:c.position.top;if(b)c.size.width=c.size.height*d.aspectRatio;c.position.top=c._helper?e.top:0}c.offset.left=c.parentData.left+c.position.left;c.offset.top=c.parentData.top+c.position.top;d=Math.abs((c._helper?c.offset.left-g.left:c.offset.left-g.left)+c.sizeDiff.width);e=Math.abs((c._helper?c.offset.top-g.top:c.offset.top-e.top)+c.sizeDiff.height);f=c.containerElement.get(0)==c.element.parent().get(0);g=/relative|absolute/.test(c.containerElement.css("position"));if(f&&g)d-=c.parentData.left;if(d+c.size.width>=c.parentData.width){c.size.width=c.parentData.width-d;if(b)c.size.height=c.size.width/c.aspectRatio}if(e+c.size.height>=c.parentData.height){c.size.height=c.parentData.height-e;if(b)c.size.width=c.size.height*c.aspectRatio}},stop:function(){var b=a(this).data("resizable"),c=b.options,d=b.containerOffset,e=b.containerPosition,f=b.containerElement,g=a(b.helper),h=g.offset(),i=g.outerWidth()-b.sizeDiff.width;g=g.outerHeight()-b.sizeDiff.height;b._helper&&!c.animate&&/relative/.test(f.css("position"))&&a(this).css({left:h.left-e.left-d.left,width:i,height:g});b._helper&&!c.animate&&/static/.test(f.css("position"))&&a(this).css({left:h.left-e.left-d.left,width:i,height:g})}});a.ui.plugin.add("resizable","ghost",{start:function(){var b=a(this).data("resizable"),c=b.options,d=b.size;b.ghost=b.originalElement.clone();b.ghost.css({opacity:.25,display:"block",position:"relative",height:d.height,width:d.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof c.ghost=="string"?c.ghost:"");b.ghost.appendTo(b.helper)},resize:function(){var b=a(this).data("resizable");b.ghost&&b.ghost.css({position:"relative",height:b.size.height,width:b.size.width})},stop:function(){var b=a(this).data("resizable");b.ghost&&b.helper&&b.helper.get(0).removeChild(b.ghost.get(0))}});a.ui.plugin.add("resizable","grid",{resize:function(){var b=a(this).data("resizable"),c=b.options,d=b.size,e=b.originalSize,f=b.originalPosition,g=b.axis;c.grid=typeof c.grid=="number"?[c.grid,c.grid]:c.grid;var h=Math.round((d.width-e.width)/(c.grid[0]||1))*(c.grid[0]||1);c=Math.round((d.height-e.height)/(c.grid[1]||1))*(c.grid[1]||1);if(/^(se|s|e)$/.test(g)){b.size.width=e.width+h;b.size.height=e.height+c}else if(/^(ne)$/.test(g)){b.size.width=e.width+h;b.size.height=e.height+c;b.position.top=f.top-c}else{if(/^(sw)$/.test(g)){b.size.width=e.width+h;b.size.height=e.height+c}else{b.size.width=e.width+h;b.size.height=e.height+c;b.position.top=f.top-c}b.position.left=f.left-h}}});var b=function(a){return parseInt(a,10)||0},c=function(a){return!isNaN(parseInt(a,10))}})(jQuery);(function(a){a.widget("ui.selectable",a.ui.mouse,{options:{appendTo:"body",autoRefresh:true,distance:0,filter:"*",tolerance:"touch"},_create:function(){var b=this;this.element.addClass("ui-selectable");this.dragged=false;var c;this.refresh=function(){c=a(b.options.filter,b.element[0]);c.each(function(){var b=a(this),c=b.offset();a.data(this,"selectable-item",{element:this,$element:b,left:c.left,top:c.top,right:c.left+b.outerWidth(),bottom:c.top+b.outerHeight(),startselected:false,selected:b.hasClass("ui-selected"),selecting:b.hasClass("ui-selecting"),unselecting:b.hasClass("ui-unselecting")})})};this.refresh();this.selectees=c.addClass("ui-selectee");this._mouseInit();this.helper=a("<div class='ui-selectable-helper'></div>")},destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item");this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");this._mouseDestroy();return this},_mouseStart:function(b){var c=this;this.opos=[b.pageX,b.pageY];if(!this.options.disabled){var d=this.options;this.selectees=a(d.filter,this.element[0]);this._trigger("start",b);a(d.appendTo).append(this.helper);this.helper.css({left:b.clientX,top:b.clientY,width:0,height:0});d.autoRefresh&&this.refresh();this.selectees.filter(".ui-selected").each(function(){var d=a.data(this,"selectable-item");d.startselected=true;if(!b.metaKey){d.$element.removeClass("ui-selected");d.selected=false;d.$element.addClass("ui-unselecting");d.unselecting=true;c._trigger("unselecting",b,{unselecting:d.element})}});a(b.target).parents().andSelf().each(function(){var d=a.data(this,"selectable-item");if(d){var e=!b.metaKey||!d.$element.hasClass("ui-selected");d.$element.removeClass(e?"ui-unselecting":"ui-selected").addClass(e?"ui-selecting":"ui-unselecting");d.unselecting=!e;d.selecting=e;(d.selected=e)?c._trigger("selecting",b,{selecting:d.element}):c._trigger("unselecting",b,{unselecting:d.element});return false}})}},_mouseDrag:function(b){var c=this;this.dragged=true;if(!this.options.disabled){var d=this.options,e=this.opos[0],f=this.opos[1],g=b.pageX,h=b.pageY;if(e>g){var i=g;g=e;e=i}if(f>h){i=h;h=f;f=i}this.helper.css({left:e,top:f,width:g-e,height:h-f});this.selectees.each(function(){var i=a.data(this,"selectable-item");if(!(!i||i.element==c.element[0])){var j=false;if(d.tolerance=="touch")j=!(i.left>g||i.right<e||i.top>h||i.bottom<f);else if(d.tolerance=="fit")j=i.left>e&&i.right<g&&i.top>f&&i.bottom<h;if(j){if(i.selected){i.$element.removeClass("ui-selected");i.selected=false}if(i.unselecting){i.$element.removeClass("ui-unselecting");i.unselecting=false}if(!i.selecting){i.$element.addClass("ui-selecting");i.selecting=true;c._trigger("selecting",b,{selecting:i.element})}}else{if(i.selecting)if(b.metaKey&&i.startselected){i.$element.removeClass("ui-selecting");i.selecting=false;i.$element.addClass("ui-selected");i.selected=true}else{i.$element.removeClass("ui-selecting");i.selecting=false;if(i.startselected){i.$element.addClass("ui-unselecting");i.unselecting=true}c._trigger("unselecting",b,{unselecting:i.element})}if(i.selected)if(!b.metaKey&&!i.startselected){i.$element.removeClass("ui-selected");i.selected=false;i.$element.addClass("ui-unselecting");i.unselecting=true;c._trigger("unselecting",b,{unselecting:i.element})}}}});return false}},_mouseStop:function(b){var c=this;this.dragged=false;a(".ui-unselecting",this.element[0]).each(function(){var e=a.data(this,"selectable-item");e.$element.removeClass("ui-unselecting");e.unselecting=false;e.startselected=false;c._trigger("unselected",b,{unselected:e.element})});a(".ui-selecting",this.element[0]).each(function(){var e=a.data(this,"selectable-item");e.$element.removeClass("ui-selecting").addClass("ui-selected");e.selecting=false;e.selected=true;e.startselected=true;c._trigger("selected",b,{selected:e.element})});this._trigger("stop",b);this.helper.remove();return false}});a.extend(a.ui.selectable,{version:"1.8.13"})})(jQuery);(function(a){a.widget("ui.sortable",a.ui.mouse,{widgetEventPrefix:"sort",options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:"auto",cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3},_create:function(){var a=this.options;this.containerCache={};this.element.addClass("ui-sortable");this.refresh();this.floating=this.items.length?a.axis==="x"||/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")):false;this.offset=this.element.offset();this._mouseInit()},destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");this._mouseDestroy();for(var a=this.items.length-1;a>=0;a--)this.items[a].item.removeData("sortable-item");return this},_setOption:function(b,c){if(b==="disabled"){this.options[b]=c;this.widget()[c?"addClass":"removeClass"]("ui-sortable-disabled")}else a.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(b,c){if(this.reverting)return false;if(this.options.disabled||this.options.type=="static")return false;this._refreshItems(b);var d=null,e=this;a(b.target).parents().each(function(){if(a.data(this,"sortable-item")==e){d=a(this);return false}});if(a.data(b.target,"sortable-item")==e)d=a(b.target);if(!d)return false;if(this.options.handle&&!c){var f=false;a(this.options.handle,d).find("*").andSelf().each(function(){if(this==b.target)f=true});if(!f)return false}this.currentItem=d;this._removeCurrentsFromItems();return true},_mouseStart:function(b,c,d){c=this.options;var e=this;this.currentContainer=this;this.refreshPositions();this.helper=this._createHelper(b);this._cacheHelperProportions();this._cacheMargins();this.scrollParent=this.helper.scrollParent();this.offset=this.currentItem.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};this.helper.css("position","absolute");this.cssPosition=this.helper.css("position");a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this._generatePosition(b);this.originalPageX=b.pageX;this.originalPageY=b.pageY;c.cursorAt&&this._adjustOffsetFromHelper(c.cursorAt);this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};this.helper[0]!=this.currentItem[0]&&this.currentItem.hide();this._createPlaceholder();c.containment&&this._setContainment();if(c.cursor){if(a("body").css("cursor"))this._storedCursor=a("body").css("cursor");a("body").css("cursor",c.cursor)}if(c.opacity){if(this.helper.css("opacity"))this._storedOpacity=this.helper.css("opacity");this.helper.css("opacity",c.opacity)}if(c.zIndex){if(this.helper.css("zIndex"))this._storedZIndex=this.helper.css("zIndex");this.helper.css("zIndex",c.zIndex)}if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML")this.overflowOffset=this.scrollParent.offset();this._trigger("start",b,this._uiHash());this._preserveHelperProportions||this._cacheHelperProportions();if(!d)for(d=this.containers.length-1;d>=0;d--)this.containers[d]._trigger("activate",b,e._uiHash(this));if(a.ui.ddmanager)a.ui.ddmanager.current=this;a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b);this.dragging=true;this.helper.addClass("ui-sortable-helper");this._mouseDrag(b);return true},_mouseDrag:function(b){this.position=this._generatePosition(b);this.positionAbs=this._convertPositionTo("absolute");if(!this.lastPositionAbs)this.lastPositionAbs=this.positionAbs;if(this.options.scroll){var c=this.options,d=false;if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){if(this.overflowOffset.top+this.scrollParent[0].offsetHeight-b.pageY<c.scrollSensitivity)this.scrollParent[0].scrollTop=d=this.scrollParent[0].scrollTop+c.scrollSpeed;else if(b.pageY-this.overflowOffset.top<c.scrollSensitivity)this.scrollParent[0].scrollTop=d=this.scrollParent[0].scrollTop-c.scrollSpeed;if(this.overflowOffset.left+this.scrollParent[0].offsetWidth-b.pageX<c.scrollSensitivity)this.scrollParent[0].scrollLeft=d=this.scrollParent[0].scrollLeft+c.scrollSpeed;else if(b.pageX-this.overflowOffset.left<c.scrollSensitivity)this.scrollParent[0].scrollLeft=d=this.scrollParent[0].scrollLeft-c.scrollSpeed}else{if(b.pageY-a(document).scrollTop()<c.scrollSensitivity)d=a(document).scrollTop(a(document).scrollTop()-c.scrollSpeed);else if(a(window).height()-(b.pageY-a(document).scrollTop())<c.scrollSensitivity)d=a(document).scrollTop(a(document).scrollTop()+c.scrollSpeed);if(b.pageX-a(document).scrollLeft()<c.scrollSensitivity)d=a(document).scrollLeft(a(document).scrollLeft()-c.scrollSpeed);else if(a(window).width()-(b.pageX-a(document).scrollLeft())<c.scrollSensitivity)d=a(document).scrollLeft(a(document).scrollLeft()+c.scrollSpeed)}d!==false&&a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b)}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";for(c=this.items.length-1;c>=0;c--){d=this.items[c];var e=d.item[0],f=this._intersectsWithPointer(d);if(f)if(e!=this.currentItem[0]&&this.placeholder[f==1?"next":"prev"]()[0]!=e&&!a.ui.contains(this.placeholder[0],e)&&(this.options.type=="semi-dynamic"?!a.ui.contains(this.element[0],e):true)){this.direction=f==1?"down":"up";if(this.options.tolerance=="pointer"||this._intersectsWithSides(d))this._rearrange(b,d);else break;this._trigger("change",b,this._uiHash());break}}this._contactContainers(b);a.ui.ddmanager&&a.ui.ddmanager.drag(this,b);this._trigger("sort",b,this._uiHash());this.lastPositionAbs=this.positionAbs;return false},_mouseStop:function(b,c){if(b){a.ui.ddmanager&&!this.options.dropBehaviour&&a.ui.ddmanager.drop(this,b);if(this.options.revert){var d=this;c=d.placeholder.offset();d.reverting=true;a(this.helper).animate({left:c.left-this.offset.parent.left-d.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:c.top-this.offset.parent.top-d.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){d._clear(b)})}else this._clear(b,c);return false}},cancel:function(){var b=this;if(this.dragging){this._mouseUp({target:null});this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var c=this.containers.length-1;c>=0;c--){this.containers[c]._trigger("deactivate",null,b._uiHash(this));if(this.containers[c].containerCache.over){this.containers[c]._trigger("out",null,b._uiHash(this));this.containers[c].containerCache.over=0}}}if(this.placeholder){this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]);this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove();a.extend(this,{helper:null,dragging:false,reverting:false,_noFinalSort:null});this.domPosition.prev?a(this.domPosition.prev).after(this.currentItem):a(this.domPosition.parent).prepend(this.currentItem)}return this},serialize:function(b){var c=this._getItemsAsjQuery(b&&b.connected),d=[];b=b||{};a(c).each(function(){var c=(a(b.item||this).attr(b.attribute||"id")||"").match(b.expression||/(.+)[-=_](.+)/);if(c)d.push((b.key||c[1]+"[]")+"="+(b.key&&b.expression?c[1]:c[2]))});!d.length&&b.key&&d.push(b.key+"=");return d.join("&")},toArray:function(b){var c=this._getItemsAsjQuery(b&&b.connected),d=[];b=b||{};c.each(function(){d.push(a(b.item||this).attr(b.attribute||"id")||"")});return d},_intersectsWith:function(a){var b=this.positionAbs.left,c=b+this.helperProportions.width,d=this.positionAbs.top,e=d+this.helperProportions.height,f=a.left,g=f+a.width,h=a.top,i=h+a.height,j=this.offset.click.top,k=this.offset.click.left;j=d+j>h&&d+j<i&&b+k>f&&b+k<g;return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>a[this.floating?"width":"height"]?j:f<b+this.helperProportions.width/2&&c-this.helperProportions.width/2<g&&h<d+this.helperProportions.height/2&&e-this.helperProportions.height/2<i},_intersectsWithPointer:function(b){var c=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,b.top,b.height);b=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,b.left,b.width);c=c&&b;b=this._getDragVerticalDirection();var d=this._getDragHorizontalDirection();if(!c)return false;return this.floating?d&&d=="right"||b=="down"?2:1:b&&(b=="down"?2:1)},_intersectsWithSides:function(b){var c=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,b.top+b.height/2,b.height);b=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,b.left+b.width/2,b.width);var d=this._getDragVerticalDirection(),e=this._getDragHorizontalDirection();return this.floating&&e?e=="right"&&b||e=="left"&&!b:d&&(d=="down"&&c||d=="up"&&!c)},_getDragVerticalDirection:function(){var a=this.positionAbs.top-this.lastPositionAbs.top;return a!=0&&(a>0?"down":"up")},_getDragHorizontalDirection:function(){var a=this.positionAbs.left-this.lastPositionAbs.left;return a!=0&&(a>0?"right":"left")},refresh:function(a){this._refreshItems(a);this.refreshPositions();return this},_connectWith:function(){var a=this.options;return a.connectWith.constructor==String?[a.connectWith]:a.connectWith},_getItemsAsjQuery:function(b){var c=[],d=[],e=this._connectWith();if(e&&b)for(b=e.length-1;b>=0;b--)for(var f=a(e[b]),g=f.length-1;g>=0;g--){var h=a.data(f[g],"sortable");if(h&&h!=this&&!h.options.disabled)d.push([a.isFunction(h.options.items)?h.options.items.call(h.element):a(h.options.items,h.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),h])}d.push([a.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):a(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);for(b=d.length-1;b>=0;b--)d[b][0].each(function(){c.push(this)});return a(c)},_removeCurrentsFromItems:function(){for(var a=this.currentItem.find(":data(sortable-item)"),b=0;b<this.items.length;b++)for(var c=0;c<a.length;c++)a[c]==this.items[b].item[0]&&this.items.splice(b,1)},_refreshItems:function(b){this.items=[];this.containers=[this];var c=this.items,d=[[a.isFunction(this.options.items)?this.options.items.call(this.element[0],b,{item:this.currentItem}):a(this.options.items,this.element),this]],e=this._connectWith();if(e)for(var f=e.length-1;f>=0;f--)for(var g=a(e[f]),h=g.length-1;h>=0;h--){var i=a.data(g[h],"sortable");if(i&&i!=this&&!i.options.disabled){d.push([a.isFunction(i.options.items)?i.options.items.call(i.element[0],b,{item:this.currentItem}):a(i.options.items,i.element),i]);this.containers.push(i)}}for(f=d.length-1;f>=0;f--){b=d[f][1];e=d[f][0];h=0;for(g=e.length;h<g;h++){i=a(e[h]);i.data("sortable-item",b);c.push({item:i,instance:b,width:0,height:0,left:0,top:0})}}},refreshPositions:function(b){if(this.offsetParent&&this.helper)this.offset.parent=this._getParentOffset();for(var c=this.items.length-1;c>=0;c--){var d=this.items[c];if(!(d.instance!=this.currentContainer&&this.currentContainer&&d.item[0]!=this.currentItem[0])){var e=this.options.toleranceElement?a(this.options.toleranceElement,d.item):d.item;if(!b){d.width=e.outerWidth();d.height=e.outerHeight()}e=e.offset();d.left=e.left;d.top=e.top}}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(c=this.containers.length-1;c>=0;c--){e=this.containers[c].element.offset();this.containers[c].containerCache.left=e.left;this.containers[c].containerCache.top=e.top;this.containers[c].containerCache.width=this.containers[c].element.outerWidth();this.containers[c].containerCache.height=this.containers[c].element.outerHeight()}return this},_createPlaceholder:function(b){var c=b||this,d=c.options;if(!d.placeholder||d.placeholder.constructor==String){var e=d.placeholder;d.placeholder={element:function(){var b=a(document.createElement(c.currentItem[0].nodeName)).addClass(e||c.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];if(!e)b.style.visibility="hidden";return b},update:function(a,b){if(!(e&&!d.forcePlaceholderSize)){b.height()||b.height(c.currentItem.innerHeight()-parseInt(c.currentItem.css("paddingTop")||0,10)-parseInt(c.currentItem.css("paddingBottom")||0,10));b.width()||b.width(c.currentItem.innerWidth()-parseInt(c.currentItem.css("paddingLeft")||0,10)-parseInt(c.currentItem.css("paddingRight")||0,10))}}}}c.placeholder=a(d.placeholder.element.call(c.element,c.currentItem));c.currentItem.after(c.placeholder);d.placeholder.update(c,c.placeholder)},_contactContainers:function(b){for(var c=null,d=null,e=this.containers.length-1;e>=0;e--)if(!a.ui.contains(this.currentItem[0],this.containers[e].element[0]))if(this._intersectsWith(this.containers[e].containerCache)){if(!(c&&a.ui.contains(this.containers[e].element[0],c.element[0]))){c=this.containers[e];d=e}}else if(this.containers[e].containerCache.over){this.containers[e]._trigger("out",b,this._uiHash(this));this.containers[e].containerCache.over=0}if(c)if(this.containers.length===1){this.containers[d]._trigger("over",b,this._uiHash(this));this.containers[d].containerCache.over=1}else if(this.currentContainer!=this.containers[d]){c=1e4;e=null;for(var f=this.positionAbs[this.containers[d].floating?"left":"top"],g=this.items.length-1;g>=0;g--)if(a.ui.contains(this.containers[d].element[0],this.items[g].item[0])){var h=this.items[g][this.containers[d].floating?"left":"top"];if(Math.abs(h-f)<c){c=Math.abs(h-f);e=this.items[g]}}if(e||this.options.dropOnEmpty){this.currentContainer=this.containers[d];e?this._rearrange(b,e,null,true):this._rearrange(b,null,this.containers[d].element,true);this._trigger("change",b,this._uiHash());this.containers[d]._trigger("change",b,this._uiHash(this));this.options.placeholder.update(this.currentContainer,this.placeholder);this.containers[d]._trigger("over",b,this._uiHash(this));this.containers[d].containerCache.over=1}}},_createHelper:function(b){var c=this.options;b=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[b,this.currentItem])):c.helper=="clone"?this.currentItem.clone():this.currentItem;b.parents("body").length||a(c.appendTo!="parent"?c.appendTo:this.currentItem[0].parentNode)[0].appendChild(b[0]);if(b[0]==this.currentItem[0])this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")};if(b[0].style.width==""||c.forceHelperSize)b.width(this.currentItem.width());if(b[0].style.height==""||c.forceHelperSize)b.height(this.currentItem.height());return b},_adjustOffsetFromHelper:function(b){if(typeof b=="string")b=b.split(" ");if(a.isArray(b))b={left:+b[0],top:+b[1]||0};if("left"in b)this.offset.click.left=b.left+this.margins.left;if("right"in b)this.offset.click.left=this.helperProportions.width-b.right+this.margins.left;if("top"in b)this.offset.click.top=b.top+this.margins.top;if("bottom"in b)this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])){b.left+=this.scrollParent.scrollLeft();b.top+=this.scrollParent.scrollTop()}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)b={top:0,left:0};return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.currentItem.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var b=this.options;if(b.containment=="parent")b.containment=this.helper[0].parentNode;if(b.containment=="document"||b.containment=="window")this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(b.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a(b.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(b.containment)){var c=a(b.containment)[0];b=a(b.containment).offset();var d=a(c).css("overflow")!="hidden";this.containment=[b.left+(parseInt(a(c).css("borderLeftWidth"),10)||0)+(parseInt(a(c).css("paddingLeft"),10)||0)-this.margins.left,b.top+(parseInt(a(c).css("borderTopWidth"),10)||0)+(parseInt(a(c).css("paddingTop"),10)||0)-this.margins.top,b.left+(d?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-(parseInt(a(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,b.top+(d?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),10)||0)-(parseInt(a(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(b,c){if(!c)c=this.position;b=b=="absolute"?1:-1;var d=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(d[0].tagName);return{top:c.top+this.offset.relative.top*b+this.offset.parent.top*b-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:d.scrollTop())*b),left:c.left+this.offset.relative.left*b+this.offset.parent.left*b-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:d.scrollLeft())*b)}},_generatePosition:function(b){var c=this.options,d=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(d[0].tagName);if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0]))this.offset.relative=this._getRelativeOffset();var f=b.pageX,g=b.pageY;if(this.originalPosition){if(this.containment){if(b.pageX-this.offset.click.left<this.containment[0])f=this.containment[0]+this.offset.click.left;if(b.pageY-this.offset.click.top<this.containment[1])g=this.containment[1]+this.offset.click.top;if(b.pageX-this.offset.click.left>this.containment[2])f=this.containment[2]+this.offset.click.left;if(b.pageY-this.offset.click.top>this.containment[3])g=this.containment[3]+this.offset.click.top}if(c.grid){g=this.originalPageY+Math.round((g-this.originalPageY)/c.grid[1])*c.grid[1];g=this.containment?!(g-this.offset.click.top<this.containment[1]||g-this.offset.click.top>this.containment[3])?g:!(g-this.offset.click.top<this.containment[1])?g-c.grid[1]:g+c.grid[1]:g;f=this.originalPageX+Math.round((f-this.originalPageX)/c.grid[0])*c.grid[0];f=this.containment?!(f-this.offset.click.left<this.containment[0]||f-this.offset.click.left>this.containment[2])?f:!(f-this.offset.click.left<this.containment[0])?f-c.grid[0]:f+c.grid[0]:f}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:d.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:d.scrollLeft())}},_rearrange:function(a,b,c,d){c?c[0].appendChild(this.placeholder[0]):b.item[0].parentNode.insertBefore(this.placeholder[0],this.direction=="down"?b.item[0]:b.item[0].nextSibling);this.counter=this.counter?++this.counter:1;var e=this,f=this.counter;window.setTimeout(function(){f==e.counter&&e.refreshPositions(!d)},0)},_clear:function(b,c){this.reverting=false;var d=[];!this._noFinalSort&&this.currentItem[0].parentNode&&this.placeholder.before(this.currentItem);this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var e in this._storedCSS)if(this._storedCSS[e]=="auto"||this._storedCSS[e]=="static")this._storedCSS[e]="";this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();this.fromOutside&&!c&&d.push(function(a){this._trigger("receive",a,this._uiHash(this.fromOutside))});if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!c)d.push(function(a){this._trigger("update",a,this._uiHash())});if(!a.ui.contains(this.element[0],this.currentItem[0])){c||d.push(function(a){this._trigger("remove",a,this._uiHash())});for(e=this.containers.length-1;e>=0;e--)if(a.ui.contains(this.containers[e].element[0],this.currentItem[0])&&!c){d.push(function(a){return function(b){a._trigger("receive",b,this._uiHash(this))}}.call(this,this.containers[e]));d.push(function(a){return function(b){a._trigger("update",b,this._uiHash(this))}}.call(this,this.containers[e]))}}for(e=this.containers.length-1;e>=0;e--){c||d.push(function(a){return function(b){a._trigger("deactivate",b,this._uiHash(this))}}.call(this,this.containers[e]));if(this.containers[e].containerCache.over){d.push(function(a){return function(b){a._trigger("out",b,this._uiHash(this))}}.call(this,this.containers[e]));this.containers[e].containerCache.over=0}}this._storedCursor&&a("body").css("cursor",this._storedCursor);this._storedOpacity&&this.helper.css("opacity",this._storedOpacity);if(this._storedZIndex)this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex);this.dragging=false;if(this.cancelHelperRemoval){if(!c){this._trigger("beforeStop",b,this._uiHash());for(e=0;e<d.length;e++)d[e].call(this,b);this._trigger("stop",b,this._uiHash())}return false}c||this._trigger("beforeStop",b,this._uiHash());this.placeholder[0].parentNode.removeChild(this.placeholder[0]);this.helper[0]!=this.currentItem[0]&&this.helper.remove();this.helper=null;if(!c){for(e=0;e<d.length;e++)d[e].call(this,b);this._trigger("stop",b,this._uiHash())}this.fromOutside=false;return true},_trigger:function(){a.Widget.prototype._trigger.apply(this,arguments)===false&&this.cancel()},_uiHash:function(b){var c=b||this;return{helper:c.helper,placeholder:c.placeholder||a([]),position:c.position,originalPosition:c.originalPosition,offset:c.positionAbs,item:c.currentItem,sender:b?b.element:null}}});a.extend(a.ui.sortable,{version:"1.8.13"})})(jQuery);jQuery.effects||function(a,b){function c(b){var c;if(b&&b.constructor==Array&&b.length==3)return b;if(c=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b))return[parseInt(c[1],10),parseInt(c[2],10),parseInt(c[3],10)];if(c=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b))return[parseFloat(c[1])*2.55,parseFloat(c[2])*2.55,parseFloat(c[3])*2.55];if(c=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(b))return[parseInt(c[1],16),parseInt(c[2],16),parseInt(c[3],16)];if(c=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(b))return[parseInt(c[1]+c[1],16),parseInt(c[2]+c[2],16),parseInt(c[3]+c[3],16)];if(/rgba\(0, 0, 0, 0\)/.exec(b))return j.transparent;return j[a.trim(b).toLowerCase()]}function d(b,d){var e;do{e=a.curCSS(b,d);if(e!=""&&e!="transparent"||a.nodeName(b,"body"))break;d="backgroundColor"}while(b=b.parentNode);return c(e)}function e(){var a=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,b={},c,d;if(a&&a.length&&a[0]&&a[a[0]])for(var e=a.length;e--;){c=a[e];if(typeof a[c]=="string"){d=c.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()});b[d]=a[c]}}else for(c in a)if(typeof a[c]==="string")b[c]=a[c];return b}function f(b){var c,d;for(c in b){d=b[c];if(d==null||a.isFunction(d)||c in l||/scrollbar/.test(c)||!/color/i.test(c)&&isNaN(parseFloat(d)))delete b[c]}return b}function g(a,b){var c={_:0},d;for(d in b)if(a[d]!=b[d])c[d]=b[d];return c}function h(b,c,d,e){if(typeof b=="object"){e=c;d=null;c=b;b=c.effect}if(a.isFunction(c)){e=c;d=null;c={}}if(typeof c=="number"||a.fx.speeds[c]){e=d;d=c;c={}}if(a.isFunction(d)){e=d;d=null}c=c||{};d=d||c.duration;d=a.fx.off?0:typeof d=="number"?d:d in a.fx.speeds?a.fx.speeds[d]:a.fx.speeds._default;e=e||c.complete;return[b,c,d,e]}function i(b){if(!b||typeof b==="number"||a.fx.speeds[b])return true;if(typeof b==="string"&&!a.effects[b])return true;return false}a.effects={};a.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","borderColor","color","outlineColor"],function(b,e){a.fx.step[e]=function(a){if(!a.colorInit){a.start=d(a.elem,e);a.end=c(a.end);a.colorInit=true}a.elem.style[e]="rgb("+Math.max(Math.min(parseInt(a.pos*(a.end[0]-a.start[0])+a.start[0],10),255),0)+","+Math.max(Math.min(parseInt(a.pos*(a.end[1]-a.start[1])+a.start[1],10),255),0)+","+Math.max(Math.min(parseInt(a.pos*(a.end[2]-a.start[2])+a.start[2],10),255),0)+")"}});var j={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]},k=["add","remove","toggle"],l={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};a.effects.animateClass=function(b,c,d,h){if(a.isFunction(d)){h=d;d=null}return this.queue(function(){var i=a(this),j=i.attr("style")||" ",l=f(e.call(this)),o,q=i.attr("class");a.each(k,function(a,c){b[c]&&i[c+"Class"](b[c])});o=f(e.call(this));i.attr("class",q);i.animate(g(l,o),{queue:false,duration:c,easding:d,complete:function(){a.each(k,function(a,c){b[c]&&i[c+"Class"](b[c])});if(typeof i.attr("style")=="object"){i.attr("style").cssText="";i.attr("style").cssText=j}else i.attr("style",j);h&&h.apply(this,arguments);a.dequeue(this)}})})};a.fn.extend({_addClass:a.fn.addClass,addClass:function(b,c,d,e){return c?a.effects.animateClass.apply(this,[{add:b},c,d,e]):this._addClass(b)},_removeClass:a.fn.removeClass,removeClass:function(b,c,d,e){return c?a.effects.animateClass.apply(this,[{remove:b},c,d,e]):this._removeClass(b)},_toggleClass:a.fn.toggleClass,toggleClass:function(c,d,e,f,g){return typeof d=="boolean"||d===b?e?a.effects.animateClass.apply(this,[d?{add:c}:{remove:c},e,f,g]):this._toggleClass(c,d):a.effects.animateClass.apply(this,[{toggle:c},d,e,f])},switchClass:function(b,c,d,e,f){return a.effects.animateClass.apply(this,[{add:c,remove:b},d,e,f])}});a.extend(a.effects,{version:"1.8.13",save:function(a,b){for(var c=0;c<b.length;c++)b[c]!==null&&a.data("ec.storage."+b[c],a[0].style[b[c]])},restore:function(a,b){for(var c=0;c<b.length;c++)b[c]!==null&&a.css(b[c],a.data("ec.storage."+b[c]))},setMode:function(a,b){if(b=="toggle")b=a.is(":hidden")?"show":"hide";return b},getBaseline:function(a,b){var c;switch(a[0]){case"top":c=0;break;case"middle":c=.5;break;case"bottom":c=1;break;default:c=a[0]/b.height}switch(a[1]){case"left":a=0;break;case"center":a=.5;break;case"right":a=1;break;default:a=a[1]/b.width}return{x:a,y:c}},createWrapper:function(b){if(b.parent().is(".ui-effects-wrapper"))return b.parent();var c={width:b.outerWidth(true),height:b.outerHeight(true),"float":b.css("float")},d=a("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0});b.wrap(d);d=b.parent();if(b.css("position")=="static"){d.css({position:"relative"});b.css({position:"relative"})}else{a.extend(c,{position:b.css("position"),zIndex:b.css("z-index")});a.each(["top","left","bottom","right"],function(a,d){c[d]=b.css(d);if(isNaN(parseInt(c[d],10)))c[d]="auto"});b.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})}return d.css(c).show()},removeWrapper:function(a){if(a.parent().is(".ui-effects-wrapper"))return a.parent().replaceWith(a);return a},setTransition:function(b,c,d,e){e=e||{};a.each(c,function(a,c){unit=b.cssUnit(c);if(unit[0]>0)e[c]=unit[0]*d+unit[1]});return e}});a.fn.extend({effect:function(b){var c=h.apply(this,arguments),d={options:c[1],duration:c[2],callback:c[3]};c=d.options.mode;var e=a.effects[b];if(a.fx.off||!e)return c?this[c](d.duration,d.callback):this.each(function(){d.callback&&d.callback.call(this)});return e.call(this,d)},_show:a.fn.show,show:function(a){if(i(a))return this._show.apply(this,arguments);else{var b=h.apply(this,arguments);b[1].mode="show";return this.effect.apply(this,b)}},_hide:a.fn.hide,hide:function(a){if(i(a))return this._hide.apply(this,arguments);else{var b=h.apply(this,arguments);b[1].mode="hide";return this.effect.apply(this,b)}},__toggle:a.fn.toggle,toggle:function(b){if(i(b)||typeof b==="boolean"||a.isFunction(b))return this.__toggle.apply(this,arguments);else{var c=h.apply(this,arguments);c[1].mode="toggle";return this.effect.apply(this,c)}},cssUnit:function(b){var c=this.css(b),d=[];a.each(["em","px","%","pt"],function(a,b){if(c.indexOf(b)>0)d=[parseFloat(c),b]});return d}});a.easing.jswing=a.easing.swing;a.extend(a.easing,{def:"easeOutQuad",swing:function(b,c,d,e,f){return a.easing[a.easing.def](b,c,d,e,f)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b+c;return-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b+c;return d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b+c;return-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b*b+c;return d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return b==0?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){if(b==0)return c;if(b==e)return c+d;if((b/=e/2)<1)return d/2*Math.pow(2,10*(b-1))+c;return d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){if((b/=e/2)<1)return-d/2*(Math.sqrt(1-b*b)-1)+c;return d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){a=1.70158;var f=0,g=d;if(b==0)return c;if((b/=e)==1)return c+d;f||(f=e*.3);if(g<Math.abs(d)){g=d;a=f/4}else a=f/(2*Math.PI)*Math.asin(d/g);return-(g*Math.pow(2,10*(b-=1))*Math.sin((b*e-a)*2*Math.PI/f))+c},easeOutElastic:function(a,b,c,d,e){a=1.70158;var f=0,g=d;if(b==0)return c;if((b/=e)==1)return c+d;f||(f=e*.3);if(g<Math.abs(d)){g=d;a=f/4}else a=f/(2*Math.PI)*Math.asin(d/g);return g*Math.pow(2,-10*b)*Math.sin((b*e-a)*2*Math.PI/f)+d+c},easeInOutElastic:function(a,b,c,d,e){a=1.70158;var f=0,g=d;if(b==0)return c;if((b/=e/2)==2)return c+d;f||(f=e*.3*1.5);if(g<Math.abs(d)){g=d;a=f/4}else a=f/(2*Math.PI)*Math.asin(d/g);if(b<1)return-.5*g*Math.pow(2,10*(b-=1))*Math.sin((b*e-a)*2*Math.PI/f)+c;return g*Math.pow(2,-10*(b-=1))*Math.sin((b*e-a)*2*Math.PI/f)*.5+d+c},easeInBack:function(a,c,d,e,f,g){if(g==b)g=1.70158;return e*(c/=f)*c*((g+1)*c-g)+d},easeOutBack:function(a,c,d,e,f,g){if(g==b)g=1.70158;return e*((c=c/f-1)*c*((g+1)*c+g)+1)+d},easeInOutBack:function(a,c,d,e,f,g){if(g==b)g=1.70158;if((c/=f/2)<1)return e/2*c*c*(((g*=1.525)+1)*c-g)+d;return e/2*((c-=2)*c*(((g*=1.525)+1)*c+g)+2)+d},easeInBounce:function(b,c,d,e,f){return e-a.easing.easeOutBounce(b,f-c,0,e,f)+d},easeOutBounce:function(a,b,c,d,e){return(b/=e)<1/2.75?d*7.5625*b*b+c:b<2/2.75?d*(7.5625*(b-=1.5/2.75)*b+.75)+c:b<2.5/2.75?d*(7.5625*(b-=2.25/2.75)*b+.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+.984375)+c},easeInOutBounce:function(b,c,d,e,f){if(c<f/2)return a.easing.easeInBounce(b,c*2,0,e,f)*.5+d;return a.easing.easeOutBounce(b,c*2-f,0,e,f)*.5+e*.5+d}})}(jQuery);(function(a){a.effects.blind=function(b){return this.queue(function(){var c=a(this),e=["position","top","bottom","left","right"],f=a.effects.setMode(c,b.options.mode||"hide"),g=b.options.direction||"vertical";a.effects.save(c,e);c.show();var h=a.effects.createWrapper(c).css({overflow:"hidden"}),i=g=="vertical"?"height":"width";g=g=="vertical"?h.height():h.width();f=="show"&&h.css(i,0);var j={};j[i]=f=="show"?g:0;h.animate(j,b.duration,b.options.easing,function(){f=="hide"&&c.hide();a.effects.restore(c,e);a.effects.removeWrapper(c);b.callback&&b.callback.apply(c[0],arguments);c.dequeue()})})}})(jQuery);(function(a){a.effects.bounce=function(b){return this.queue(function(){var c=a(this),e=["position","top","bottom","left","right"],f=a.effects.setMode(c,b.options.mode||"effect"),g=b.options.direction||"up",h=b.options.distance||20,i=b.options.times||5,j=b.duration||250;/show|hide/.test(f)&&e.push("opacity");a.effects.save(c,e);c.show();a.effects.createWrapper(c);var k=g=="up"||g=="down"?"top":"left";g=g=="up"||g=="left"?"pos":"neg";h=b.options.distance||(k=="top"?c.outerHeight({margin:true})/3:c.outerWidth({margin:true})/3);if(f=="show")c.css("opacity",0).css(k,g=="pos"?-h:h);if(f=="hide")h/=i*2;f!="hide"&&i--;if(f=="show"){var l={opacity:1};l[k]=(g=="pos"?"+=":"-=")+h;c.animate(l,j/2,b.options.easing);h/=2;i--}for(l=0;l<i;l++){var m={},n={};m[k]=(g=="pos"?"-=":"+=")+h;n[k]=(g=="pos"?"+=":"-=")+h;c.animate(m,j/2,b.options.easing).animate(n,j/2,b.options.easing);h=f=="hide"?h*2:h/2}if(f=="hide"){l={opacity:0};l[k]=(g=="pos"?"-=":"+=")+h;c.animate(l,j/2,b.options.easing,function(){c.hide();a.effects.restore(c,e);a.effects.removeWrapper(c);b.callback&&b.callback.apply(this,arguments)})}else{m={};n={};m[k]=(g=="pos"?"-=":"+=")+h;n[k]=(g=="pos"?"+=":"-=")+h;c.animate(m,j/2,b.options.easing).animate(n,j/2,b.options.easing,function(){a.effects.restore(c,e);a.effects.removeWrapper(c);b.callback&&b.callback.apply(this,arguments)})}c.queue("fx",function(){c.dequeue()});c.dequeue()})}})(jQuery);(function(a){a.effects.clip=function(b){return this.queue(function(){var c=a(this),e=["position","top","bottom","left","right","height","width"],f=a.effects.setMode(c,b.options.mode||"hide"),g=b.options.direction||"vertical";a.effects.save(c,e);c.show();var h=a.effects.createWrapper(c).css({overflow:"hidden"});h=c[0].tagName=="IMG"?h:c;var i={size:g=="vertical"?"height":"width",position:g=="vertical"?"top":"left"};g=g=="vertical"?h.height():h.width();if(f=="show"){h.css(i.size,0);h.css(i.position,g/2)}var j={};j[i.size]=f=="show"?g:0;j[i.position]=f=="show"?0:g/2;h.animate(j,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){f=="hide"&&c.hide();a.effects.restore(c,e);a.effects.removeWrapper(c);b.callback&&b.callback.apply(c[0],arguments);c.dequeue()}})})}})(jQuery);(function(a){a.effects.drop=function(b){return this.queue(function(){var c=a(this),e=["position","top","bottom","left","right","opacity"],f=a.effects.setMode(c,b.options.mode||"hide"),g=b.options.direction||"left";a.effects.save(c,e);c.show();a.effects.createWrapper(c);var h=g=="up"||g=="down"?"top":"left";g=g=="up"||g=="left"?"pos":"neg";var i=b.options.distance||(h=="top"?c.outerHeight({margin:true})/2:c.outerWidth({margin:true})/2);if(f=="show")c.css("opacity",0).css(h,g=="pos"?-i:i);var j={opacity:f=="show"?1:0};j[h]=(f=="show"?g=="pos"?"+=":"-=":g=="pos"?"-=":"+=")+i;c.animate(j,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){f=="hide"&&c.hide();a.effects.restore(c,e);a.effects.removeWrapper(c);b.callback&&b.callback.apply(this,arguments);c.dequeue()}})})}})(jQuery);(function(a){a.effects.explode=function(b){return this.queue(function(){var c=b.options.pieces?Math.round(Math.sqrt(b.options.pieces)):3,e=b.options.pieces?Math.round(Math.sqrt(b.options.pieces)):3;b.options.mode=b.options.mode=="toggle"?a(this).is(":visible")?"hide":"show":b.options.mode;var f=a(this).show().css("visibility","hidden"),g=f.offset();g.top-=parseInt(f.css("marginTop"),10)||0;g.left-=parseInt(f.css("marginLeft"),10)||0;for(var h=f.outerWidth(true),i=f.outerHeight(true),j=0;j<c;j++)for(var k=0;k<e;k++)f.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-k*(h/e),top:-j*(i/c)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:h/e,height:i/c,left:g.left+k*(h/e)+(b.options.mode=="show"?(k-Math.floor(e/2))*(h/e):0),top:g.top+j*(i/c)+(b.options.mode=="show"?(j-Math.floor(c/2))*(i/c):0),opacity:b.options.mode=="show"?0:1}).animate({left:g.left+k*(h/e)+(b.options.mode=="show"?0:(k-Math.floor(e/2))*(h/e)),top:g.top+j*(i/c)+(b.options.mode=="show"?0:(j-Math.floor(c/2))*(i/c)),opacity:b.options.mode=="show"?1:0},b.duration||500);setTimeout(function(){b.options.mode=="show"?f.css({visibility:"visible"}):f.css({visibility:"visible"}).hide();b.callback&&b.callback.apply(f[0]);f.dequeue();a("div.ui-effects-explode").remove()},b.duration||500)})}})(jQuery);(function(a){a.effects.fade=function(b){return this.queue(function(){var c=a(this),e=a.effects.setMode(c,b.options.mode||"hide");c.animate({opacity:e},{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){b.callback&&b.callback.apply(this,arguments);c.dequeue()}})})}})(jQuery);(function(a){a.effects.fold=function(b){return this.queue(function(){var c=a(this),e=["position","top","bottom","left","right"],f=a.effects.setMode(c,b.options.mode||"hide"),g=b.options.size||15,h=!!b.options.horizFirst,i=b.duration?b.duration/2:a.fx.speeds._default/2;a.effects.save(c,e);c.show();var j=a.effects.createWrapper(c).css({overflow:"hidden"}),k=f=="show"!=h,l=k?["width","height"]:["height","width"];k=k?[j.width(),j.height()]:[j.height(),j.width()];var m=/([0-9]+)%/.exec(g);if(m)g=parseInt(m[1],10)/100*k[f=="hide"?0:1];if(f=="show")j.css(h?{height:0,width:g}:{height:g,width:0});h={};m={};h[l[0]]=f=="show"?k[0]:g;m[l[1]]=f=="show"?k[1]:0;j.animate(h,i,b.options.easing).animate(m,i,b.options.easing,function(){f=="hide"&&c.hide();a.effects.restore(c,e);a.effects.removeWrapper(c);b.callback&&b.callback.apply(c[0],arguments);c.dequeue()})})}})(jQuery);(function(a){a.effects.highlight=function(b){return this.queue(function(){var c=a(this),e=["backgroundImage","backgroundColor","opacity"],f=a.effects.setMode(c,b.options.mode||"show"),g={backgroundColor:c.css("backgroundColor")};if(f=="hide")g.opacity=0;a.effects.save(c,e);c.show().css({backgroundImage:"none",backgroundColor:b.options.color||"#ffff99"}).animate(g,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){f=="hide"&&c.hide();a.effects.restore(c,e);f=="show"&&!a.support.opacity&&this.style.removeAttribute("filter");b.callback&&b.callback.apply(this,arguments);c.dequeue()}})})}})(jQuery);(function(a){a.effects.pulsate=function(b){return this.queue(function(){var c=a(this),e=a.effects.setMode(c,b.options.mode||"show");times=(b.options.times||5)*2-1;duration=b.duration?b.duration/2:a.fx.speeds._default/2;isVisible=c.is(":visible");animateTo=0;if(!isVisible){c.css("opacity",0).show();animateTo=1}if(e=="hide"&&isVisible||e=="show"&&!isVisible)times--;for(e=0;e<times;e++){c.animate({opacity:animateTo},duration,b.options.easing);animateTo=(animateTo+1)%2}c.animate({opacity:animateTo},duration,b.options.easing,function(){animateTo==0&&c.hide();b.callback&&b.callback.apply(this,arguments)});c.queue("fx",function(){c.dequeue()}).dequeue()})}})(jQuery);(function(a){a.effects.puff=function(b){return this.queue(function(){var c=a(this),e=a.effects.setMode(c,b.options.mode||"hide"),f=parseInt(b.options.percent,10)||150,g=f/100,h={height:c.height(),width:c.width()};a.extend(b.options,{fade:true,mode:e,percent:e=="hide"?f:100,from:e=="hide"?h:{height:h.height*g,width:h.width*g}});c.effect("scale",b.options,b.duration,b.callback);c.dequeue()})};a.effects.scale=function(b){return this.queue(function(){var c=a(this),e=a.extend(true,{},b.options),f=a.effects.setMode(c,b.options.mode||"effect"),g=parseInt(b.options.percent,10)||(parseInt(b.options.percent,10)==0?0:f=="hide"?0:100),h=b.options.direction||"both",i=b.options.origin;if(f!="effect"){e.origin=i||["middle","center"];e.restore=true}i={height:c.height(),width:c.width()};c.from=b.options.from||(f=="show"?{height:0,width:0}:i);g={y:h!="horizontal"?g/100:1,x:h!="vertical"?g/100:1};c.to={height:i.height*g.y,width:i.width*g.x};if(b.options.fade){if(f=="show"){c.from.opacity=0;c.to.opacity=1}if(f=="hide"){c.from.opacity=1;c.to.opacity=0}}e.from=c.from;e.to=c.to;e.mode=f;c.effect("size",e,b.duration,b.callback);c.dequeue()})};a.effects.size=function(b){return this.queue(function(){var c=a(this),e=["position","top","bottom","left","right","width","height","overflow","opacity"],f=["position","top","bottom","left","right","overflow","opacity"],g=["width","height","overflow"],h=["fontSize"],i=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],j=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],k=a.effects.setMode(c,b.options.mode||"effect"),l=b.options.restore||false,m=b.options.scale||"both",n=b.options.origin,o={height:c.height(),width:c.width()};c.from=b.options.from||o;c.to=b.options.to||o;if(n){n=a.effects.getBaseline(n,o);c.from.top=(o.height-c.from.height)*n.y;c.from.left=(o.width-c.from.width)*n.x;c.to.top=(o.height-c.to.height)*n.y;c.to.left=(o.width-c.to.width)*n.x}var p={from:{y:c.from.height/o.height,x:c.from.width/o.width},to:{y:c.to.height/o.height,x:c.to.width/o.width}};if(m=="box"||m=="both"){if(p.from.y!=p.to.y){e=e.concat(i);c.from=a.effects.setTransition(c,i,p.from.y,c.from);c.to=a.effects.setTransition(c,i,p.to.y,c.to)}if(p.from.x!=p.to.x){e=e.concat(j);c.from=a.effects.setTransition(c,j,p.from.x,c.from);c.to=a.effects.setTransition(c,j,p.to.x,c.to)}}if(m=="content"||m=="both")if(p.from.y!=p.to.y){e=e.concat(h);c.from=a.effects.setTransition(c,h,p.from.y,c.from);c.to=a.effects.setTransition(c,h,p.to.y,c.to)}a.effects.save(c,l?e:f);c.show();a.effects.createWrapper(c);c.css("overflow","hidden").css(c.from);if(m=="content"||m=="both"){i=i.concat(["marginTop","marginBottom"]).concat(h);j=j.concat(["marginLeft","marginRight"]);g=e.concat(i).concat(j);c.find("*[width]").each(function(){child=a(this);l&&a.effects.save(child,g);var c={height:child.height(),width:child.width()};child.from={height:c.height*p.from.y,width:c.width*p.from.x};child.to={height:c.height*p.to.y,width:c.width*p.to.x};if(p.from.y!=p.to.y){child.from=a.effects.setTransition(child,i,p.from.y,child.from);child.to=a.effects.setTransition(child,i,p.to.y,child.to)}if(p.from.x!=p.to.x){child.from=a.effects.setTransition(child,j,p.from.x,child.from);child.to=a.effects.setTransition(child,j,p.to.x,child.to)}child.css(child.from);child.animate(child.to,b.duration,b.options.easing,function(){l&&a.effects.restore(child,g)})})}c.animate(c.to,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){c.to.opacity===0&&c.css("opacity",c.from.opacity);k=="hide"&&c.hide();a.effects.restore(c,l?e:f);a.effects.removeWrapper(c);b.callback&&b.callback.apply(this,arguments);c.dequeue()}})})}})(jQuery);(function(a){a.effects.shake=function(b){return this.queue(function(){var c=a(this),e=["position","top","bottom","left","right"];a.effects.setMode(c,b.options.mode||"effect");var f=b.options.direction||"left",g=b.options.distance||20,h=b.options.times||3,i=b.duration||b.options.duration||140;a.effects.save(c,e);c.show();a.effects.createWrapper(c);var j=f=="up"||f=="down"?"top":"left",k=f=="up"||f=="left"?"pos":"neg";f={};var l={},m={};f[j]=(k=="pos"?"-=":"+=")+g;l[j]=(k=="pos"?"+=":"-=")+g*2;m[j]=(k=="pos"?"-=":"+=")+g*2;c.animate(f,i,b.options.easing);for(g=1;g<h;g++)c.animate(l,i,b.options.easing).animate(m,i,b.options.easing);c.animate(l,i,b.options.easing).animate(f,i/2,b.options.easing,function(){a.effects.restore(c,e);a.effects.removeWrapper(c);b.callback&&b.callback.apply(this,arguments)});c.queue("fx",function(){c.dequeue()});c.dequeue()})}})(jQuery);(function(a){a.effects.slide=function(b){return this.queue(function(){var c=a(this),e=["position","top","bottom","left","right"],f=a.effects.setMode(c,b.options.mode||"show"),g=b.options.direction||"left";a.effects.save(c,e);c.show();a.effects.createWrapper(c).css({overflow:"hidden"});var h=g=="up"||g=="down"?"top":"left";g=g=="up"||g=="left"?"pos":"neg";var i=b.options.distance||(h=="top"?c.outerHeight({margin:true}):c.outerWidth({margin:true}));if(f=="show")c.css(h,g=="pos"?isNaN(i)?"-"+i:-i:i);var j={};j[h]=(f=="show"?g=="pos"?"+=":"-=":g=="pos"?"-=":"+=")+i;c.animate(j,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){f=="hide"&&c.hide();a.effects.restore(c,e);a.effects.removeWrapper(c);b.callback&&b.callback.apply(this,arguments);c.dequeue()}})})}})(jQuery);(function(a){a.effects.transfer=function(b){return this.queue(function(){var c=a(this),e=a(b.options.to),f=e.offset();e={top:f.top,left:f.left,height:e.innerHeight(),width:e.innerWidth()};f=c.offset();var g=a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(b.options.className).css({top:f.top,left:f.left,height:c.innerHeight(),width:c.innerWidth(),position:"absolute"}).animate(e,b.duration,b.options.easing,function(){g.remove();b.callback&&b.callback.apply(c[0],arguments);c.dequeue()})})}})(jQuery);(function(a){a.widget("ui.accordion",{options:{active:0,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()}},_create:function(){var b=this,c=b.options;b.running=0;b.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");b.headers=b.element.find(c.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){c.disabled||a(this).addClass("ui-state-hover")}).bind("mouseleave.accordion",function(){c.disabled||a(this).removeClass("ui-state-hover")}).bind("focus.accordion",function(){c.disabled||a(this).addClass("ui-state-focus")}).bind("blur.accordion",function(){c.disabled||a(this).removeClass("ui-state-focus")});b.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");if(c.navigation){var d=b.element.find("a").filter(c.navigationFilter).eq(0);if(d.length){var e=d.closest(".ui-accordion-header");b.active=e.length?e:d.closest(".ui-accordion-content").prev()}}b.active=b._findActive(b.active||c.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");b.active.next().addClass("ui-accordion-content-active");b._createIcons();b.resize();b.element.attr("role","tablist");b.headers.attr("role","tab").bind("keydown.accordion",function(a){return b._keydown(a)}).next().attr("role","tabpanel");b.headers.not(b.active||"").attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).next().hide();b.active.length?b.active.attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}):b.headers.eq(0).attr("tabIndex",0);a.browser.safari||b.headers.find("a").attr("tabIndex",-1);c.event&&b.headers.bind(c.event.split(" ").join(".accordion ")+".accordion",function(a){b._clickHandler.call(b,a,this);a.preventDefault()})},_createIcons:function(){var b=this.options;if(b.icons){a("<span></span>").addClass("ui-icon "+b.icons.header).prependTo(this.headers);this.active.children(".ui-icon").toggleClass(b.icons.header).toggleClass(b.icons.headerSelected);this.element.addClass("ui-accordion-icons")}},_destroyIcons:function(){this.headers.children(".ui-icon").remove();this.element.removeClass("ui-accordion-icons")},destroy:function(){var b=this.options;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex");this.headers.find("a").removeAttr("tabIndex");this._destroyIcons();var c=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");if(b.autoHeight||b.fillHeight)c.css("height","");return a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments);b=="active"&&this.activate(c);if(b=="icons"){this._destroyIcons();c&&this._createIcons()}if(b=="disabled")this.headers.add(this.headers.next())[c?"addClass":"removeClass"]("ui-accordion-disabled ui-state-disabled")},_keydown:function(b){if(!(this.options.disabled||b.altKey||b.ctrlKey)){var c=a.ui.keyCode,d=this.headers.length,e=this.headers.index(b.target),f=false;switch(b.keyCode){case c.RIGHT:case c.DOWN:f=this.headers[(e+1)%d];break;case c.LEFT:case c.UP:f=this.headers[(e-1+d)%d];break;case c.SPACE:case c.ENTER:this._clickHandler({target:b.target},b.target);b.preventDefault()}if(f){a(b.target).attr("tabIndex",-1);a(f).attr("tabIndex",0);f.focus();return false}return true}},resize:function(){var b=this.options,c;if(b.fillSpace){if(a.browser.msie){var d=this.element.parent().css("overflow");this.element.parent().css("overflow","hidden")}c=this.element.parent().height();a.browser.msie&&this.element.parent().css("overflow",d);this.headers.each(function(){c-=a(this).outerHeight(true)});this.headers.next().each(function(){a(this).height(Math.max(0,c-a(this).innerHeight()+a(this).height()))}).css("overflow","auto")}else if(b.autoHeight){c=0;this.headers.next().each(function(){c=Math.max(c,a(this).height("").height())}).height(c)}return this},activate:function(a){this.options.active=a;a=this._findActive(a)[0];this._clickHandler({target:a},a);return this},_findActive:function(b){return b?typeof b==="number"?this.headers.filter(":eq("+b+")"):this.headers.not(this.headers.not(b)):b===false?a([]):this.headers.filter(":eq(0)")},_clickHandler:function(b,c){var d=this.options;if(!d.disabled)if(b.target){b=a(b.currentTarget||c);c=b[0]===this.active[0];d.active=d.collapsible&&c?false:this.headers.index(b);if(!(this.running||!d.collapsible&&c)){var e=this.active;i=b.next();g=this.active.next();h={options:d,newHeader:c&&d.collapsible?a([]):b,oldHeader:this.active,newContent:c&&d.collapsible?a([]):i,oldContent:g};var f=this.headers.index(this.active[0])>this.headers.index(b[0]);this.active=c?a([]):b;this._toggle(i,g,h,c,f);e.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);if(!c){b.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected);b.next().addClass("ui-accordion-content-active")}}}else if(d.collapsible){this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);this.active.next().addClass("ui-accordion-content-active");var g=this.active.next(),h={options:d,newHeader:a([]),oldHeader:d.active,newContent:a([]),oldContent:g},i=this.active=a([]);this._toggle(i,g,h)}},_toggle:function(b,c,d,e,f){var g=this,h=g.options;g.toShow=b;g.toHide=c;g.data=d;var i=function(){if(g)return g._completed.apply(g,arguments)};g._trigger("changestart",null,g.data);g.running=c.size()===0?b.size():c.size();if(h.animated){d={};d=h.collapsible&&e?{toShow:a([]),toHide:c,complete:i,down:f,autoHeight:h.autoHeight||h.fillSpace}:{toShow:b,toHide:c,complete:i,down:f,autoHeight:h.autoHeight||h.fillSpace};if(!h.proxied)h.proxied=h.animated;if(!h.proxiedDuration)h.proxiedDuration=h.duration;h.animated=a.isFunction(h.proxied)?h.proxied(d):h.proxied;h.duration=a.isFunction(h.proxiedDuration)?h.proxiedDuration(d):h.proxiedDuration;e=a.ui.accordion.animations;var j=h.duration,k=h.animated;if(k&&!e[k]&&!a.easing[k])k="slide";e[k]||(e[k]=function(a){this.slide(a,{easing:k,duration:j||700})});e[k](d)}else{if(h.collapsible&&e)b.toggle();else{c.hide();b.show()}i(true)}c.prev().attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).blur();b.prev().attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}).focus()},_completed:function(a){this.running=a?0:--this.running;if(!this.running){this.options.clearStyle&&this.toShow.add(this.toHide).css({height:"",overflow:""});this.toHide.removeClass("ui-accordion-content-active");if(this.toHide.length)this.toHide.parent()[0].className=this.toHide.parent()[0].className;this._trigger("change",null,this.data)}}});a.extend(a.ui.accordion,{version:"1.8.13",animations:{slide:function(b,c){b=a.extend({easing:"swing",duration:300},b,c);if(b.toHide.size())if(b.toShow.size()){var d=b.toShow.css("overflow"),e=0,f={},g={},h;c=b.toShow;h=c[0].style.width;c.width(parseInt(c.parent().width(),10)-parseInt(c.css("paddingLeft"),10)-parseInt(c.css("paddingRight"),10)-(parseInt(c.css("borderLeftWidth"),10)||0)-(parseInt(c.css("borderRightWidth"),10)||0));a.each(["height","paddingTop","paddingBottom"],function(c,d){g[d]="hide";c=(""+a.css(b.toShow[0],d)).match(/^([\d+-.]+)(.*)$/);f[d]={value:c[1],unit:c[2]||"px"}});b.toShow.css({height:0,overflow:"hidden"}).show();b.toHide.filter(":hidden").each(b.complete).end().filter(":visible").animate(g,{step:function(a,c){if(c.prop=="height")e=c.end-c.start===0?0:(c.now-c.start)/(c.end-c.start);b.toShow[0].style[c.prop]=e*f[c.prop].value+f[c.prop].unit},duration:b.duration,easing:b.easing,complete:function(){b.autoHeight||b.toShow.css("height","");b.toShow.css({width:h,overflow:d});b.complete()}})}else b.toHide.animate({height:"hide",paddingTop:"hide",paddingBottom:"hide"},b);else b.toShow.animate({height:"show",paddingTop:"show",paddingBottom:"show"},b)},bounceslide:function(a){this.slide(a,{easing:a.down?"easeOutBounce":"swing",duration:a.down?1e3:200})}}})})(jQuery);(function(a){var b=0;a.widget("ui.autocomplete",{options:{appendTo:"body",autoFocus:false,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null},pending:0,_create:function(){var b=this,c=this.element[0].ownerDocument,d;this.element.addClass("ui-autocomplete-input").attr("autocomplete","off").attr({role:"textbox","aria-autocomplete":"list","aria-haspopup":"true"}).bind("keydown.autocomplete",function(c){if(!(b.options.disabled||b.element.attr("readonly"))){d=false;var e=a.ui.keyCode;switch(c.keyCode){case e.PAGE_UP:b._move("previousPage",c);break;case e.PAGE_DOWN:b._move("nextPage",c);break;case e.UP:b._move("previous",c);c.preventDefault();break;case e.DOWN:b._move("next",c);c.preventDefault();break;case e.ENTER:case e.NUMPAD_ENTER:if(b.menu.active){d=true;c.preventDefault()};case e.TAB:if(!b.menu.active)return;b.menu.select(c);break;case e.ESCAPE:b.element.val(b.term);b.close(c);break;default:clearTimeout(b.searching);b.searching=setTimeout(function(){if(b.term!=b.element.val()){b.selectedItem=null;b.search(null,c)}},b.options.delay);break}}}).bind("keypress.autocomplete",function(a){if(d){d=false;a.preventDefault()}}).bind("focus.autocomplete",function(){if(!b.options.disabled){b.selectedItem=null;b.previous=b.element.val()}}).bind("blur.autocomplete",function(a){if(!b.options.disabled){clearTimeout(b.searching);b.closing=setTimeout(function(){b.close(a);b._change(a)},150)}});this._initSource();this.response=function(){return b._response.apply(b,arguments)};this.menu=a("<ul></ul>").addClass("ui-autocomplete").appendTo(a(this.options.appendTo||"body",c)[0]).mousedown(function(c){var d=b.menu.element[0];a(c.target).closest(".ui-menu-item").length||setTimeout(function(){a(document).one("mousedown",function(c){c.target!==b.element[0]&&c.target!==d&&!a.ui.contains(d,c.target)&&b.close()})},1);setTimeout(function(){clearTimeout(b.closing)},13)}).menu({focus:function(a,c){c=c.item.data("item.autocomplete");false!==b._trigger("focus",a,{item:c})&&/^key/.test(a.originalEvent.type)&&b.element.val(c.value)},selected:function(a,d){var e=d.item.data("item.autocomplete"),g=b.previous;if(b.element[0]!==c.activeElement){b.element.focus();b.previous=g;setTimeout(function(){b.previous=g;b.selectedItem=e},1)}false!==b._trigger("select",a,{item:e})&&b.element.val(e.value);b.term=b.element.val();b.close(a);b.selectedItem=e},blur:function(){b.menu.element.is(":visible")&&b.element.val()!==b.term&&b.element.val(b.term)}}).zIndex(this.element.zIndex()+1).css({top:0,left:0}).hide().data("menu");a.fn.bgiframe&&this.menu.element.bgiframe()},destroy:function(){this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");this.menu.element.remove();a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments);b==="source"&&this._initSource();if(b==="appendTo")this.menu.element.appendTo(a(c||"body",this.element[0].ownerDocument)[0]);b==="disabled"&&c&&this.xhr&&this.xhr.abort()},_initSource:function(){var c=this,e,f;if(a.isArray(this.options.source)){e=this.options.source;this.source=function(b,c){c(a.ui.autocomplete.filter(e,b.term))}}else if(typeof this.options.source==="string"){f=this.options.source;this.source=function(e,h){c.xhr&&c.xhr.abort();c.xhr=a.ajax({url:f,data:e,dataType:"json",autocompleteRequest:++b,success:function(a){this.autocompleteRequest===b&&h(a)},error:function(){this.autocompleteRequest===b&&h([])}})}}else this.source=this.options.source},search:function(a,b){a=a!=null?a:this.element.val();this.term=this.element.val();if(a.length<this.options.minLength)return this.close(b);clearTimeout(this.closing);if(this._trigger("search",b)!==false)return this._search(a)},_search:function(a){this.pending++;this.element.addClass("ui-autocomplete-loading");this.source({term:a},this.response)},_response:function(a){if(!this.options.disabled&&a&&a.length){a=this._normalize(a);this._suggest(a);this._trigger("open")}else this.close();this.pending--;this.pending||this.element.removeClass("ui-autocomplete-loading")},close:function(a){clearTimeout(this.closing);if(this.menu.element.is(":visible")){this.menu.element.hide();this.menu.deactivate();this._trigger("close",a)}},_change:function(a){this.previous!==this.element.val()&&this._trigger("change",a,{item:this.selectedItem})},_normalize:function(b){if(b.length&&b[0].label&&b[0].value)return b;return a.map(b,function(b){if(typeof b==="string")return{label:b,value:b};return a.extend({label:b.label||b.value,value:b.value||b.label},b)})},_suggest:function(b){var c=this.menu.element.empty().zIndex(this.element.zIndex()+1);this._renderMenu(c,b);this.menu.deactivate();this.menu.refresh();c.show();this._resizeMenu();c.position(a.extend({of:this.element},this.options.position));this.options.autoFocus&&this.menu.next(new a.Event("mouseover"))},_resizeMenu:function(){var a=this.menu.element;a.outerWidth(Math.max(a.width("").outerWidth(),this.element.outerWidth()))},_renderMenu:function(b,c){var d=this;a.each(c,function(a,c){d._renderItem(b,c)})},_renderItem:function(b,c){return a("<li></li>").data("item.autocomplete",c).append(a("<a></a>").text(c.label)).appendTo(b)},_move:function(a,b){if(this.menu.element.is(":visible"))if(this.menu.first()&&/^previous/.test(a)||this.menu.last()&&/^next/.test(a)){this.element.val(this.term);this.menu.deactivate()}else this.menu[a](b);else this.search(null,b)},widget:function(){return this.menu.element}});a.extend(a.ui.autocomplete,{escapeRegex:function(a){return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},filter:function(b,c){var d=new RegExp(a.ui.autocomplete.escapeRegex(c),"i");return a.grep(b,function(a){return d.test(a.label||a.value||a)})}})})(jQuery);(function(a){a.widget("ui.menu",{_create:function(){var b=this;this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox","aria-activedescendant":"ui-active-menuitem"}).click(function(c){if(a(c.target).closest(".ui-menu-item a").length){c.preventDefault();b.select(c)}});this.refresh()},refresh:function(){var b=this;this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","menuitem").children("a").addClass("ui-corner-all").attr("tabindex",-1).mouseenter(function(c){b.activate(c,a(this).parent())}).mouseleave(function(){b.deactivate()})},activate:function(a,b){this.deactivate();if(this.hasScroll()){var c=b.offset().top-this.element.offset().top,d=this.element.scrollTop(),e=this.element.height();if(c<0)this.element.scrollTop(d+c);else c>=e&&this.element.scrollTop(d+c-e+b.height())}this.active=b.eq(0).children("a").addClass("ui-state-hover").attr("id","ui-active-menuitem").end();this._trigger("focus",a,{item:b})},deactivate:function(){if(this.active){this.active.children("a").removeClass("ui-state-hover").removeAttr("id");this._trigger("blur");this.active=null}},next:function(a){this.move("next",".ui-menu-item:first",a)},previous:function(a){this.move("prev",".ui-menu-item:last",a)},first:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},last:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},move:function(a,b,c){if(this.active){a=this.active[a+"All"](".ui-menu-item").eq(0);a.length?this.activate(c,a):this.activate(c,this.element.children(b))}else this.activate(c,this.element.children(b))},nextPage:function(b){if(this.hasScroll())if(!this.active||this.last())this.activate(b,this.element.children(".ui-menu-item:first"));else{var c=this.active.offset().top,d=this.element.height(),e=this.element.children(".ui-menu-item").filter(function(){var b=a(this).offset().top-c-d+a(this).height();return b<10&&b>-10});e.length||(e=this.element.children(".ui-menu-item:last"));this.activate(b,e)}else this.activate(b,this.element.children(".ui-menu-item").filter(!this.active||this.last()?":first":":last"))},previousPage:function(b){if(this.hasScroll())if(!this.active||this.first())this.activate(b,this.element.children(".ui-menu-item:last"));else{var c=this.active.offset().top,d=this.element.height();result=this.element.children(".ui-menu-item").filter(function(){var b=a(this).offset().top-c+d-a(this).height();return b<10&&b>-10});result.length||(result=this.element.children(".ui-menu-item:first"));this.activate(b,result)}else this.activate(b,this.element.children(".ui-menu-item").filter(!this.active||this.first()?":last":":first"))},hasScroll:function(){return this.element.height()<this.element[a.fn.prop?"prop":"attr"]("scrollHeight")},select:function(a){this._trigger("selected",a,{item:this.active})}})})(jQuery);(function(a){var b,c=function(b){a(":ui-button",b.target.form).each(function(){var b=a(this).data("button");setTimeout(function(){b.refresh()},1)})},d=function(b){var c=b.name,d=b.form,e=a([]);if(c)e=d?a(d).find("[name='"+c+"']"):a("[name='"+c+"']",b.ownerDocument).filter(function(){return!this.form});return e};a.widget("ui.button",{options:{disabled:null,text:true,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",c);if(typeof this.options.disabled!=="boolean")this.options.disabled=this.element.attr("disabled");this._determineButtonType();this.hasTitle=!!this.buttonElement.attr("title");var e=this,g=this.options,h=this.type==="checkbox"||this.type==="radio",i="ui-state-hover"+(!h?" ui-state-active":"");if(g.label===null)g.label=this.buttonElement.html();if(this.element.is(":disabled"))g.disabled=true;this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role","button").bind("mouseenter.button",function(){if(!g.disabled){a(this).addClass("ui-state-hover");this===b&&a(this).addClass("ui-state-active")}}).bind("mouseleave.button",function(){g.disabled||a(this).removeClass(i)}).bind("focus.button",function(){a(this).addClass("ui-state-focus")}).bind("blur.button",function(){a(this).removeClass("ui-state-focus")}).bind("click.button",function(a){g.disabled&&a.stopImmediatePropagation()});h&&this.element.bind("change.button",function(){e.refresh()});if(this.type==="checkbox")this.buttonElement.bind("click.button",function(){if(g.disabled)return false;a(this).toggleClass("ui-state-active");e.buttonElement.attr("aria-pressed",e.element[0].checked)});else if(this.type==="radio")this.buttonElement.bind("click.button",function(){if(g.disabled)return false;a(this).addClass("ui-state-active");e.buttonElement.attr("aria-pressed",true);var b=e.element[0];d(b).not(b).map(function(){return a(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed",false)});else{this.buttonElement.bind("mousedown.button",function(){if(g.disabled)return false;a(this).addClass("ui-state-active");b=this;a(document).one("mouseup",function(){b=null})}).bind("mouseup.button",function(){if(g.disabled)return false;a(this).removeClass("ui-state-active")}).bind("keydown.button",function(b){if(g.disabled)return false;if(b.keyCode==a.ui.keyCode.SPACE||b.keyCode==a.ui.keyCode.ENTER)a(this).addClass("ui-state-active")}).bind("keyup.button",function(){a(this).removeClass("ui-state-active")});this.buttonElement.is("a")&&this.buttonElement.keyup(function(b){b.keyCode===a.ui.keyCode.SPACE&&a(this).click()})}this._setOption("disabled",g.disabled)},_determineButtonType:function(){this.type=this.element.is(":checkbox")?"checkbox":this.element.is(":radio")?"radio":this.element.is("input")?"input":"button";if(this.type==="checkbox"||this.type==="radio"){var a=this.element.parents().filter(":last"),b="label[for="+this.element.attr("id")+"]";this.buttonElement=a.find(b);if(!this.buttonElement.length){a=a.length?a.siblings():this.element.siblings();this.buttonElement=a.filter(b);if(!this.buttonElement.length)this.buttonElement=a.find(b)}this.element.addClass("ui-helper-hidden-accessible");(a=this.element.is(":checked"))&&this.buttonElement.addClass("ui-state-active");this.buttonElement.attr("aria-pressed",a)}else this.buttonElement=this.element},widget:function(){return this.buttonElement},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible");this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());this.hasTitle||this.buttonElement.removeAttr("title");a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments);if(b==="disabled")c?this.element.attr("disabled",true):this.element.removeAttr("disabled");this._resetButton()},refresh:function(){var b=this.element.is(":disabled");b!==this.options.disabled&&this._setOption("disabled",b);if(this.type==="radio")d(this.element[0]).each(function(){a(this).is(":checked")?a(this).button("widget").addClass("ui-state-active").attr("aria-pressed",true):a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed",false)});else if(this.type==="checkbox")this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed",true):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed",false)},_resetButton:function(){if(this.type==="input")this.options.label&&this.element.val(this.options.label);else{var b=this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"),c=a("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),d=this.options.icons,e=d.primary&&d.secondary,f=[];if(d.primary||d.secondary){if(this.options.text)f.push("ui-button-text-icon"+(e?"s":d.primary?"-primary":"-secondary"));d.primary&&b.prepend("<span class='ui-button-icon-primary ui-icon "+d.primary+"'></span>");d.secondary&&b.append("<span class='ui-button-icon-secondary ui-icon "+d.secondary+"'></span>");if(!this.options.text){f.push(e?"ui-button-icons-only":"ui-button-icon-only");this.hasTitle||b.attr("title",c)}}else f.push("ui-button-text-only");b.addClass(f.join(" "))}}});a.widget("ui.buttonset",{options:{items:":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(b,c){b==="disabled"&&this.buttons.button("option",b,c);a.Widget.prototype._setOption.apply(this,arguments)},refresh:function(){this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass("ui-corner-left").end().filter(":last").addClass("ui-corner-right").end().end()},destroy:function(){this.element.removeClass("ui-buttonset");this.buttons.map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy");a.Widget.prototype.destroy.call(this)}})})(jQuery);(function(a,d){function c(){this.debug=false;this._curInst=null;this._keyEvent=false;this._disabledInputs=[];this._inDialog=this._datepickerShowing=false;this._mainDivId="ui-datepicker-div";this._inlineClass="ui-datepicker-inline";this._appendClass="ui-datepicker-append";this._triggerClass="ui-datepicker-trigger";this._dialogClass="ui-datepicker-dialog";this._disableClass="ui-datepicker-disabled";this._unselectableClass="ui-datepicker-unselectable";this._currentClass="ui-datepicker-current-day";this._dayOverClass="ui-datepicker-days-cell-over";this.regional=[];this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:false,showMonthAfterYear:false,yearSuffix:""};this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,yearRange:"c-10:c+10",showOtherMonths:false,selectOtherMonths:false,showWeek:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:true,showButtonPanel:false,autoSize:false};a.extend(this._defaults,this.regional[""]);this.dpDiv=f(a('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}function f(b){return b.delegate("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a","mouseout",function(){a(this).removeClass("ui-state-hover");this.className.indexOf("ui-datepicker-prev")!=-1&&a(this).removeClass("ui-datepicker-prev-hover");this.className.indexOf("ui-datepicker-next")!=-1&&a(this).removeClass("ui-datepicker-next-hover")}).delegate("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a","mouseover",function(){if(!a.datepicker._isDisabledDatepicker(i.inline?b.parent()[0]:i.input[0])){a(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");a(this).addClass("ui-state-hover");this.className.indexOf("ui-datepicker-prev")!=-1&&a(this).addClass("ui-datepicker-prev-hover");this.className.indexOf("ui-datepicker-next")!=-1&&a(this).addClass("ui-datepicker-next-hover")}})}function g(b,c){a.extend(b,c);for(var e in c)if(c[e]==null||c[e]==d)b[e]=c[e];return b}a.extend(a.ui,{datepicker:{version:"1.8.13"}});var e=(new Date).getTime(),i;a.extend(c.prototype,{markerClassName:"hasDatepicker",log:function(){this.debug&&console.log.apply("",arguments)},_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(a){g(this._defaults,a||{});return this},_attachDatepicker:function(b,h){var j=null;for(var l in this._defaults){var o=b.getAttribute("date:"+l);if(o){j=j||{};try{j[l]=eval(o)}catch(n){j[l]=o}}}l=b.nodeName.toLowerCase();o=l=="div"||l=="span";if(!b.id){this.uuid+=1;b.id="dp"+this.uuid}var k=this._newInst(a(b),o);k.settings=a.extend({},h||{},j||{});if(l=="input")this._connectDatepicker(b,k);else o&&this._inlineDatepicker(b,k)},_newInst:function(b,c){return{id:b[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1"),input:b,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:c,dpDiv:!c?this.dpDiv:f(a('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}},_connectDatepicker:function(b,c){var d=a(b);c.append=a([]);c.trigger=a([]);if(!d.hasClass(this.markerClassName)){this._attachments(d,c);d.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(a,b,d){c.settings[b]=d}).bind("getData.datepicker",function(a,b){return this._get(c,b)});this._autoSize(c);a.data(b,"datepicker",c)}},_attachments:function(b,c){var d=this._get(c,"appendText"),e=this._get(c,"isRTL");c.append&&c.append.remove();if(d){c.append=a('<span class="'+this._appendClass+'">'+d+"</span>");b[e?"before":"after"](c.append)}b.unbind("focus",this._showDatepicker);c.trigger&&c.trigger.remove();d=this._get(c,"showOn");if(d=="focus"||d=="both")b.focus(this._showDatepicker);if(d=="button"||d=="both"){d=this._get(c,"buttonText");var f=this._get(c,"buttonImage");c.trigger=a(this._get(c,"buttonImageOnly")?a("<img/>").addClass(this._triggerClass).attr({src:f,alt:d,title:d}):a('<button type="button"></button>').addClass(this._triggerClass).html(f==""?d:a("<img/>").attr({src:f,alt:d,title:d})));b[e?"before":"after"](c.trigger);c.trigger.click(function(){a.datepicker._datepickerShowing&&a.datepicker._lastInput==b[0]?a.datepicker._hideDatepicker():a.datepicker._showDatepicker(b[0]);return false})}},_autoSize:function(a){if(this._get(a,"autoSize")&&!a.inline){var b=new Date(2009,11,20),c=this._get(a,"dateFormat");if(c.match(/[DM]/)){var d=function(a){for(var b=0,c=0,d=0;d<a.length;d++)if(a[d].length>b){b=a[d].length;c=d}return c};b.setMonth(d(this._get(a,c.match(/MM/)?"monthNames":"monthNamesShort")));b.setDate(d(this._get(a,c.match(/DD/)?"dayNames":"dayNamesShort"))+20-b.getDay())}a.input.attr("size",this._formatDate(a,b).length)}},_inlineDatepicker:function(b,c){var d=a(b);if(!d.hasClass(this.markerClassName)){d.addClass(this.markerClassName).append(c.dpDiv).bind("setData.datepicker",function(a,b,d){c.settings[b]=d}).bind("getData.datepicker",function(a,b){return this._get(c,b)});a.data(b,"datepicker",c);this._setDate(c,this._getDefaultDate(c),true);this._updateDatepicker(c);this._updateAlternate(c);c.dpDiv.show()}},_dialogDatepicker:function(b,c,d,e,f){b=this._dialogInst;if(!b){this.uuid+=1;this._dialogInput=a('<input type="text" id="'+("dp"+this.uuid)+'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');this._dialogInput.keydown(this._doKeyDown);a("body").append(this._dialogInput);b=this._dialogInst=this._newInst(this._dialogInput,false);b.settings={};a.data(this._dialogInput[0],"datepicker",b)}g(b.settings,e||{});c=c&&c.constructor==Date?this._formatDate(b,c):c;this._dialogInput.val(c);this._pos=f?f.length?f:[f.pageX,f.pageY]:null;if(!this._pos)this._pos=[document.documentElement.clientWidth/2-100+(document.documentElement.scrollLeft||document.body.scrollLeft),document.documentElement.clientHeight/2-150+(document.documentElement.scrollTop||document.body.scrollTop)];this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px");b.settings.onSelect=d;this._inDialog=true;this.dpDiv.addClass(this._dialogClass);this._showDatepicker(this._dialogInput[0]);a.blockUI&&a.blockUI(this.dpDiv);a.data(this._dialogInput[0],"datepicker",b);return this},_destroyDatepicker:function(b){var c=a(b),d=a.data(b,"datepicker");if(c.hasClass(this.markerClassName)){var e=b.nodeName.toLowerCase();a.removeData(b,"datepicker");if(e=="input"){d.append.remove();d.trigger.remove();c.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)}else if(e=="div"||e=="span")c.removeClass(this.markerClassName).empty()}},_enableDatepicker:function(b){var c=a(b),d=a.data(b,"datepicker");if(c.hasClass(this.markerClassName)){var e=b.nodeName.toLowerCase();if(e=="input"){b.disabled=false;d.trigger.filter("button").each(function(){this.disabled=false}).end().filter("img").css({opacity:"1.0",cursor:""})}else if(e=="div"||e=="span"){c=c.children("."+this._inlineClass);c.children().removeClass("ui-state-disabled");c.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")}this._disabledInputs=a.map(this._disabledInputs,function(a){return a==b?null:a})}},_disableDatepicker:function(b){var c=a(b),d=a.data(b,"datepicker");if(c.hasClass(this.markerClassName)){var e=b.nodeName.toLowerCase();if(e=="input"){b.disabled=true;d.trigger.filter("button").each(function(){this.disabled=true}).end().filter("img").css({opacity:"0.5",cursor:"default"})}else if(e=="div"||e=="span"){c=c.children("."+this._inlineClass);c.children().addClass("ui-state-disabled");c.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled","disabled")}this._disabledInputs=a.map(this._disabledInputs,function(a){return a==b?null:a});this._disabledInputs[this._disabledInputs.length]=b}},_isDisabledDatepicker:function(a){if(!a)return false;for(var b=0;b<this._disabledInputs.length;b++)if(this._disabledInputs[b]==a)return true;return false},_getInst:function(b){try{return a.data(b,"datepicker")}catch(c){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(b,c,e){var f=this._getInst(b);if(arguments.length==2&&typeof c=="string")return c=="defaults"?a.extend({},a.datepicker._defaults):f?c=="all"?a.extend({},f.settings):this._get(f,c):null;var h=c||{};if(typeof c=="string"){h={};h[c]=e}if(f){this._curInst==f&&this._hideDatepicker();var i=this._getDateDatepicker(b,true),j=this._getMinMaxDate(f,"min"),k=this._getMinMaxDate(f,"max");g(f.settings,h);if(j!==null&&h.dateFormat!==d&&h.minDate===d)f.settings.minDate=this._formatDate(f,j);if(k!==null&&h.dateFormat!==d&&h.maxDate===d)f.settings.maxDate=this._formatDate(f,k);this._attachments(a(b),f);this._autoSize(f);this._setDate(f,i);this._updateAlternate(f);this._updateDatepicker(f)}},_changeDatepicker:function(a,b,c){this._optionDatepicker(a,b,c)},_refreshDatepicker:function(a){(a=this._getInst(a))&&this._updateDatepicker(a)},_setDateDatepicker:function(a,b){if(a=this._getInst(a)){this._setDate(a,b);this._updateDatepicker(a);this._updateAlternate(a)}},_getDateDatepicker:function(a,b){(a=this._getInst(a))&&!a.inline&&this._setDateFromField(a,b);return a?this._getDate(a):null},_doKeyDown:function(b){var c=a.datepicker._getInst(b.target),d=true,e=c.dpDiv.is(".ui-datepicker-rtl");c._keyEvent=true;if(a.datepicker._datepickerShowing)switch(b.keyCode){case 9:a.datepicker._hideDatepicker();d=false;break;case 13:d=a("td."+a.datepicker._dayOverClass+":not(."+a.datepicker._currentClass+")",c.dpDiv);d[0]?a.datepicker._selectDay(b.target,c.selectedMonth,c.selectedYear,d[0]):a.datepicker._hideDatepicker();return false;case 27:a.datepicker._hideDatepicker();break;case 33:a.datepicker._adjustDate(b.target,b.ctrlKey?-a.datepicker._get(c,"stepBigMonths"):-a.datepicker._get(c,"stepMonths"),"M");break;case 34:a.datepicker._adjustDate(b.target,b.ctrlKey?+a.datepicker._get(c,"stepBigMonths"):+a.datepicker._get(c,"stepMonths"),"M");break;case 35:if(b.ctrlKey||b.metaKey)a.datepicker._clearDate(b.target);d=b.ctrlKey||b.metaKey;break;case 36:if(b.ctrlKey||b.metaKey)a.datepicker._gotoToday(b.target);d=b.ctrlKey||b.metaKey;break;case 37:if(b.ctrlKey||b.metaKey)a.datepicker._adjustDate(b.target,e?+1:-1,"D");d=b.ctrlKey||b.metaKey;if(b.originalEvent.altKey)a.datepicker._adjustDate(b.target,b.ctrlKey?-a.datepicker._get(c,"stepBigMonths"):-a.datepicker._get(c,"stepMonths"),"M");break;case 38:if(b.ctrlKey||b.metaKey)a.datepicker._adjustDate(b.target,-7,"D");d=b.ctrlKey||b.metaKey;break;case 39:if(b.ctrlKey||b.metaKey)a.datepicker._adjustDate(b.target,e?-1:+1,"D");d=b.ctrlKey||b.metaKey;if(b.originalEvent.altKey)a.datepicker._adjustDate(b.target,b.ctrlKey?+a.datepicker._get(c,"stepBigMonths"):+a.datepicker._get(c,"stepMonths"),"M");break;case 40:if(b.ctrlKey||b.metaKey)a.datepicker._adjustDate(b.target,+7,"D");d=b.ctrlKey||b.metaKey;break;default:d=false}else if(b.keyCode==36&&b.ctrlKey)a.datepicker._showDatepicker(this);else d=false;if(d){b.preventDefault();b.stopPropagation()}},_doKeyPress:function(b){var c=a.datepicker._getInst(b.target);if(a.datepicker._get(c,"constrainInput")){c=a.datepicker._possibleChars(a.datepicker._get(c,"dateFormat"));var e=String.fromCharCode(b.charCode==d?b.keyCode:b.charCode);return b.ctrlKey||b.metaKey||e<" "||!c||c.indexOf(e)>-1}},_doKeyUp:function(b){b=a.datepicker._getInst(b.target);if(b.input.val()!=b.lastVal)try{if(a.datepicker.parseDate(a.datepicker._get(b,"dateFormat"),b.input?b.input.val():null,a.datepicker._getFormatConfig(b))){a.datepicker._setDateFromField(b);a.datepicker._updateAlternate(b);a.datepicker._updateDatepicker(b)}}catch(c){a.datepicker.log(c)}return true},_showDatepicker:function(b){b=b.target||b;if(b.nodeName.toLowerCase()!="input")b=a("input",b.parentNode)[0];if(!(a.datepicker._isDisabledDatepicker(b)||a.datepicker._lastInput==b)){var c=a.datepicker._getInst(b);a.datepicker._curInst&&a.datepicker._curInst!=c&&a.datepicker._curInst.dpDiv.stop(true,true);var d=a.datepicker._get(c,"beforeShow");g(c.settings,d?d.apply(b,[b,c]):{});c.lastVal=null;a.datepicker._lastInput=b;a.datepicker._setDateFromField(c);if(a.datepicker._inDialog)b.value="";if(!a.datepicker._pos){a.datepicker._pos=a.datepicker._findPos(b);a.datepicker._pos[1]+=b.offsetHeight}var e=false;a(b).parents().each(function(){e|=a(this).css("position")=="fixed";return!e});if(e&&a.browser.opera){a.datepicker._pos[0]-=document.documentElement.scrollLeft;a.datepicker._pos[1]-=document.documentElement.scrollTop}d={left:a.datepicker._pos[0],top:a.datepicker._pos[1]};a.datepicker._pos=null;c.dpDiv.empty();c.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});a.datepicker._updateDatepicker(c);d=a.datepicker._checkOffset(c,d,e);c.dpDiv.css({position:a.datepicker._inDialog&&a.blockUI?"static":e?"fixed":"absolute",display:"none",left:d.left+"px",top:d.top+"px"});if(!c.inline){d=a.datepicker._get(c,"showAnim");var f=a.datepicker._get(c,"duration"),h=function(){var b=c.dpDiv.find("iframe.ui-datepicker-cover");if(b.length){var d=a.datepicker._getBorders(c.dpDiv);b.css({left:-d[0],top:-d[1],width:c.dpDiv.outerWidth(),height:c.dpDiv.outerHeight()})}};c.dpDiv.zIndex(a(b).zIndex()+1);a.datepicker._datepickerShowing=true;a.effects&&a.effects[d]?c.dpDiv.show(d,a.datepicker._get(c,"showOptions"),f,h):c.dpDiv[d||"show"](d?f:null,h);if(!d||!f)h();c.input.is(":visible")&&!c.input.is(":disabled")&&c.input.focus();a.datepicker._curInst=c}}},_updateDatepicker:function(b){var c=a.datepicker._getBorders(b.dpDiv);i=b;b.dpDiv.empty().append(this._generateHTML(b));var d=b.dpDiv.find("iframe.ui-datepicker-cover");d.length&&d.css({left:-c[0],top:-c[1],width:b.dpDiv.outerWidth(),height:b.dpDiv.outerHeight()});b.dpDiv.find("."+this._dayOverClass+" a").mouseover();c=this._getNumberOfMonths(b);d=c[1];b.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");d>1&&b.dpDiv.addClass("ui-datepicker-multi-"+d).css("width",17*d+"em");b.dpDiv[(c[0]!=1||c[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi");b.dpDiv[(this._get(b,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl");b==a.datepicker._curInst&&a.datepicker._datepickerShowing&&b.input&&b.input.is(":visible")&&!b.input.is(":disabled")&&b.input[0]!=document.activeElement&&b.input.focus();if(b.yearshtml){var e=b.yearshtml;setTimeout(function(){e===b.yearshtml&&b.yearshtml&&b.dpDiv.find("select.ui-datepicker-year:first").replaceWith(b.yearshtml);e=b.yearshtml=null},0)}},_getBorders:function(a){var b=function(a){return{thin:1,medium:2,thick:3}[a]||a};return[parseFloat(b(a.css("border-left-width"))),parseFloat(b(a.css("border-top-width")))]},_checkOffset:function(b,c,d){var e=b.dpDiv.outerWidth(),f=b.dpDiv.outerHeight(),g=b.input?b.input.outerWidth():0,h=b.input?b.input.outerHeight():0,i=document.documentElement.clientWidth+a(document).scrollLeft(),j=document.documentElement.clientHeight+a(document).scrollTop();c.left-=this._get(b,"isRTL")?e-g:0;c.left-=d&&c.left==b.input.offset().left?a(document).scrollLeft():0;c.top-=d&&c.top==b.input.offset().top+h?a(document).scrollTop():0;c.left-=Math.min(c.left,c.left+e>i&&i>e?Math.abs(c.left+e-i):0);c.top-=Math.min(c.top,c.top+f>j&&j>f?Math.abs(f+h):0);return c},_findPos:function(b){for(var c=this._get(this._getInst(b),"isRTL");b&&(b.type=="hidden"||b.nodeType!=1||a.expr.filters.hidden(b));)b=b[c?"previousSibling":"nextSibling"];b=a(b).offset();return[b.left,b.top]},_hideDatepicker:function(b){var c=this._curInst;if(!(!c||b&&c!=a.data(b,"datepicker")))if(this._datepickerShowing){b=this._get(c,"showAnim");var d=this._get(c,"duration"),e=function(){a.datepicker._tidyDialog(c);this._curInst=null};a.effects&&a.effects[b]?c.dpDiv.hide(b,a.datepicker._get(c,"showOptions"),d,e):c.dpDiv[b=="slideDown"?"slideUp":b=="fadeIn"?"fadeOut":"hide"](b?d:null,e);b||e();if(b=this._get(c,"onClose"))b.apply(c.input?c.input[0]:null,[c.input?c.input.val():"",c]);this._datepickerShowing=false;this._lastInput=null;if(this._inDialog){this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});if(a.blockUI){a.unblockUI();a("body").append(this.dpDiv)}}this._inDialog=false}},_tidyDialog:function(a){a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(b){if(a.datepicker._curInst){b=a(b.target);b[0].id!=a.datepicker._mainDivId&&b.parents("#"+a.datepicker._mainDivId).length==0&&!b.hasClass(a.datepicker.markerClassName)&&!b.hasClass(a.datepicker._triggerClass)&&a.datepicker._datepickerShowing&&!(a.datepicker._inDialog&&a.blockUI)&&a.datepicker._hideDatepicker()}},_adjustDate:function(b,c,d){b=a(b);var e=this._getInst(b[0]);if(!this._isDisabledDatepicker(b[0])){this._adjustInstDate(e,c+(d=="M"?this._get(e,"showCurrentAtPos"):0),d);this._updateDatepicker(e)}},_gotoToday:function(b){b=a(b);var c=this._getInst(b[0]);if(this._get(c,"gotoCurrent")&&c.currentDay){c.selectedDay=c.currentDay;c.drawMonth=c.selectedMonth=c.currentMonth;c.drawYear=c.selectedYear=c.currentYear}else{var d=new Date;c.selectedDay=d.getDate();c.drawMonth=c.selectedMonth=d.getMonth();c.drawYear=c.selectedYear=d.getFullYear()}this._notifyChange(c);this._adjustDate(b)},_selectMonthYear:function(b,c,d){b=a(b);var e=this._getInst(b[0]);e._selectingMonthYear=false;e["selected"+(d=="M"?"Month":"Year")]=e["draw"+(d=="M"?"Month":"Year")]=parseInt(c.options[c.selectedIndex].value,10);this._notifyChange(e);this._adjustDate(b)},_clickMonthYear:function(b){var c=this._getInst(a(b)[0]);c.input&&c._selectingMonthYear&&setTimeout(function(){c.input.focus()},0);c._selectingMonthYear=!c._selectingMonthYear},_selectDay:function(b,c,d,e){var f=a(b);if(!(a(e).hasClass(this._unselectableClass)||this._isDisabledDatepicker(f[0]))){f=this._getInst(f[0]);f.selectedDay=f.currentDay=a("a",e).html();f.selectedMonth=f.currentMonth=c;f.selectedYear=f.currentYear=d;this._selectDate(b,this._formatDate(f,f.currentDay,f.currentMonth,f.currentYear))}},_clearDate:function(b){b=a(b);this._getInst(b[0]);this._selectDate(b,"")},_selectDate:function(b,c){b=this._getInst(a(b)[0]);c=c!=null?c:this._formatDate(b);b.input&&b.input.val(c);this._updateAlternate(b);var d=this._get(b,"onSelect");if(d)d.apply(b.input?b.input[0]:null,[c,b]);else b.input&&b.input.trigger("change");if(b.inline)this._updateDatepicker(b);else{this._hideDatepicker();this._lastInput=b.input[0];typeof b.input[0]!="object"&&b.input.focus();this._lastInput=null}},_updateAlternate:function(b){var c=this._get(b,"altField");if(c){var d=this._get(b,"altFormat")||this._get(b,"dateFormat"),e=this._getDate(b),f=this.formatDate(d,e,this._getFormatConfig(b));a(c).each(function(){a(this).val(f)})}},noWeekends:function(a){a=a.getDay();return[a>0&&a<6,""]},iso8601Week:function(a){a=new Date(a.getTime());a.setDate(a.getDate()+4-(a.getDay()||7));var b=a.getTime();a.setMonth(0);a.setDate(1);return Math.floor(Math.round((b-a)/864e5)/7)+1},parseDate:function(b,c,d){if(b==null||c==null)throw"Invalid arguments";c=typeof c=="object"?c.toString():c+"";if(c=="")return null;var e=(d?d.shortYearCutoff:null)||this._defaults.shortYearCutoff;e=typeof e!="string"?e:(new Date).getFullYear()%100+parseInt(e,10);for(var f=(d?d.dayNamesShort:null)||this._defaults.dayNamesShort,g=(d?d.dayNames:null)||this._defaults.dayNames,h=(d?d.monthNamesShort:null)||this._defaults.monthNamesShort,i=(d?d.monthNames:null)||this._defaults.monthNames,j=d=-1,k=-1,l=-1,m=false,n=function(a){(a=s+1<b.length&&b.charAt(s+1)==a)&&s++;return a},o=function(a){var b=n(a);a=new RegExp("^\\d{1,"+(a=="@"?14:a=="!"?20:a=="y"&&b?4:a=="o"?3:2)+"}");a=c.substring(r).match(a);if(!a)throw"Missing number at position "+r;r+=a[0].length;return parseInt(a[0],10)},p=function(b,d,e){b=a.map(n(b)?e:d,function(a,b){return[[b,a]]}).sort(function(a,b){return-(a[1].length-b[1].length)});var f=-1;a.each(b,function(a,b){a=b[1];if(c.substr(r,a.length).toLowerCase()==a.toLowerCase()){f=b[0];r+=a.length;return false}});if(f!=-1)return f+1;else throw"Unknown name at position "+r},q=function(){if(c.charAt(r)!=b.charAt(s))throw"Unexpected literal at position "+r;r++},r=0,s=0;s<b.length;s++)if(m)if(b.charAt(s)=="'"&&!n("'"))m=false;else q();else switch(b.charAt(s)){case"d":k=o("d");break;case"D":p("D",f,g);break;case"o":l=o("o");break;case"m":j=o("m");break;case"M":j=p("M",h,i);break;case"y":d=o("y");break;case"@":var t=new Date(o("@"));d=t.getFullYear();j=t.getMonth()+1;k=t.getDate();break;case"!":t=new Date((o("!")-this._ticksTo1970)/1e4);d=t.getFullYear();j=t.getMonth()+1;k=t.getDate();break;case"'":if(n("'"))q();else m=true;break;default:q()}if(d==-1)d=(new Date).getFullYear();else if(d<100)d+=(new Date).getFullYear()-(new Date).getFullYear()%100+(d<=e?0:-100);if(l>-1){j=1;k=l;do{e=this._getDaysInMonth(d,j-1);if(k<=e)break;j++;k-=e}while(1)}t=this._daylightSavingAdjust(new Date(d,j-1,k));if(t.getFullYear()!=d||t.getMonth()+1!=j||t.getDate()!=k)throw"Invalid date";return t},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*1e7,formatDate:function(a,b,c){if(!b)return"";var d=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,e=(c?c.dayNames:null)||this._defaults.dayNames,f=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort;c=(c?c.monthNames:null)||this._defaults.monthNames;var g=function(b){(b=l+1<a.length&&a.charAt(l+1)==b)&&l++;return b},h=function(a,b,c){b=""+b;if(g(a))for(;b.length<c;)b="0"+b;return b},i=function(a,b,c,d){return g(a)?d[b]:c[b]},j="",k=false;if(b)for(var l=0;l<a.length;l++)if(k)if(a.charAt(l)=="'"&&!g("'"))k=false;else j+=a.charAt(l);else switch(a.charAt(l)){case"d":j+=h("d",b.getDate(),2);break;case"D":j+=i("D",b.getDay(),d,e);break;case"o":j+=h("o",(b.getTime()-(new Date(b.getFullYear(),0,0)).getTime())/864e5,3);break;case"m":j+=h("m",b.getMonth()+1,2);break;case"M":j+=i("M",b.getMonth(),f,c);break;case"y":j+=g("y")?b.getFullYear():(b.getYear()%100<10?"0":"")+b.getYear()%100;break;case"@":j+=b.getTime();break;case"!":j+=b.getTime()*1e4+this._ticksTo1970;break;case"'":if(g("'"))j+="'";else k=true;break;default:j+=a.charAt(l)}return j},_possibleChars:function(a){for(var b="",c=false,d=function(b){(b=e+1<a.length&&a.charAt(e+1)==b)&&e++;return b},e=0;e<a.length;e++)if(c)if(a.charAt(e)=="'"&&!d("'"))c=false;else b+=a.charAt(e);else switch(a.charAt(e)){case"d":case"m":case"y":case"@":b+="0123456789";break;case"D":case"M":return null;case"'":if(d("'"))b+="'";else c=true;break;default:b+=a.charAt(e)}return b},_get:function(a,b){return a.settings[b]!==d?a.settings[b]:this._defaults[b]},_setDateFromField:function(a,b){if(a.input.val()!=a.lastVal){var c=this._get(a,"dateFormat"),d=a.lastVal=a.input?a.input.val():null,e,f;e=f=this._getDefaultDate(a);var g=this._getFormatConfig(a);try{e=this.parseDate(c,d,g)||f}catch(h){this.log(h);d=b?"":d}a.selectedDay=e.getDate();a.drawMonth=a.selectedMonth=e.getMonth();a.drawYear=a.selectedYear=e.getFullYear();a.currentDay=d?e.getDate():0;a.currentMonth=d?e.getMonth():0;a.currentYear=d?e.getFullYear():0;this._adjustInstDate(a)}},_getDefaultDate:function(a){return this._restrictMinMax(a,this._determineDate(a,this._get(a,"defaultDate"),new Date))},_determineDate:function(b,c,d){var e=function(a){var b=new Date;b.setDate(b.getDate()+a);return b},f=function(c){try{return a.datepicker.parseDate(a.datepicker._get(b,"dateFormat"),c,a.datepicker._getFormatConfig(b))}catch(d){}var e=(c.toLowerCase().match(/^c/)?a.datepicker._getDate(b):null)||new Date,f=e.getFullYear(),g=e.getMonth();e=e.getDate();for(var h=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,i=h.exec(c);i;){switch(i[2]||"d"){case"d":case"D":e+=parseInt(i[1],10);break;case"w":case"W":e+=parseInt(i[1],10)*7;break;case"m":case"M":g+=parseInt(i[1],10);e=Math.min(e,a.datepicker._getDaysInMonth(f,g));break;case"y":case"Y":f+=parseInt(i[1],10);e=Math.min(e,a.datepicker._getDaysInMonth(f,g));break}i=h.exec(c)}return new Date(f,g,e)};if(c=(c=c==null||c===""?d:typeof c=="string"?f(c):typeof c=="number"?isNaN(c)?d:e(c):new Date(c.getTime()))&&c.toString()=="Invalid Date"?d:c){c.setHours(0);c.setMinutes(0);c.setSeconds(0);c.setMilliseconds(0)}return this._daylightSavingAdjust(c)},_daylightSavingAdjust:function(a){if(!a)return null;a.setHours(a.getHours()>12?a.getHours()+2:0);return a},_setDate:function(a,b,c){var d=!b,e=a.selectedMonth,f=a.selectedYear;b=this._restrictMinMax(a,this._determineDate(a,b,new Date));a.selectedDay=a.currentDay=b.getDate();a.drawMonth=a.selectedMonth=a.currentMonth=b.getMonth();a.drawYear=a.selectedYear=a.currentYear=b.getFullYear();if((e!=a.selectedMonth||f!=a.selectedYear)&&!c)this._notifyChange(a);this._adjustInstDate(a);if(a.input)a.input.val(d?"":this._formatDate(a))},_getDate:function(a){return!a.currentYear||a.input&&a.input.val()==""?null:this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay))},_generateHTML:function(b){var c=new Date;c=this._daylightSavingAdjust(new Date(c.getFullYear(),c.getMonth(),c.getDate()));var d=this._get(b,"isRTL"),f=this._get(b,"showButtonPanel"),g=this._get(b,"hideIfNoPrevNext"),h=this._get(b,"navigationAsDateFormat"),i=this._getNumberOfMonths(b),j=this._get(b,"showCurrentAtPos"),k=this._get(b,"stepMonths"),l=i[0]!=1||i[1]!=1,m=this._daylightSavingAdjust(!b.currentDay?new Date(9999,9,9):new Date(b.currentYear,b.currentMonth,b.currentDay)),n=this._getMinMaxDate(b,"min"),o=this._getMinMaxDate(b,"max");j=b.drawMonth-j;var p=b.drawYear;if(j<0){j+=12;p--}if(o){var q=this._daylightSavingAdjust(new Date(o.getFullYear(),o.getMonth()-i[0]*i[1]+1,o.getDate()));for(q=n&&q<n?n:q;this._daylightSavingAdjust(new Date(p,j,1))>q;){j--;if(j<0){j=11;p--}}}b.drawMonth=j;b.drawYear=p;q=this._get(b,"prevText");q=!h?q:this.formatDate(q,this._daylightSavingAdjust(new Date(p,j-k,1)),this._getFormatConfig(b));q=this._canAdjustMonth(b,-1,p,j)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_'+e+".datepicker._adjustDate('#"+b.id+"', -"+k+", 'M');\" title=\""+q+'"><span class="ui-icon ui-icon-circle-triangle-'+(d?"e":"w")+'">'+q+"</span></a>":g?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+q+'"><span class="ui-icon ui-icon-circle-triangle-'+(d?"e":"w")+'">'+q+"</span></a>";var r=this._get(b,"nextText");r=!h?r:this.formatDate(r,this._daylightSavingAdjust(new Date(p,j+k,1)),this._getFormatConfig(b));g=this._canAdjustMonth(b,+1,p,j)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_'+e+".datepicker._adjustDate('#"+b.id+"', +"+k+", 'M');\" title=\""+r+'"><span class="ui-icon ui-icon-circle-triangle-'+(d?"w":"e")+'">'+r+"</span></a>":g?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+r+'"><span class="ui-icon ui-icon-circle-triangle-'+(d?"w":"e")+'">'+r+"</span></a>";k=this._get(b,"currentText");r=this._get(b,"gotoCurrent")&&b.currentDay?m:c;k=!h?k:this.formatDate(k,r,this._getFormatConfig(b));h=!b.inline?'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_'+e+'.datepicker._hideDatepicker();">'+this._get(b,"closeText")+"</button>":"";f=f?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(d?h:"")+(this._isInRange(b,r)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_'+e+".datepicker._gotoToday('#"+b.id+"');\">"+k+"</button>":"")+(d?"":h)+"</div>":"";h=parseInt(this._get(b,"firstDay"),10);h=isNaN(h)?0:h;k=this._get(b,"showWeek");r=this._get(b,"dayNames");this._get(b,"dayNamesShort");var s=this._get(b,"dayNamesMin"),t=this._get(b,"monthNames"),u=this._get(b,"monthNamesShort"),v=this._get(b,"beforeShowDay"),w=this._get(b,"showOtherMonths"),x=this._get(b,"selectOtherMonths");this._get(b,"calculateWeek");for(var y=this._getDefaultDate(b),z="",A=0;A<i[0];A++){for(var B="",C=0;C<i[1];C++){var D=this._daylightSavingAdjust(new Date(p,j,b.selectedDay)),E=" ui-corner-all",F="";if(l){F+='<div class="ui-datepicker-group';if(i[1]>1)switch(C){case 0:F+=" ui-datepicker-group-first";E=" ui-corner-"+(d?"right":"left");break;case i[1]-1:F+=" ui-datepicker-group-last";E=" ui-corner-"+(d?"left":"right");break;default:F+=" ui-datepicker-group-middle";E="";break}F+='">'}F+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+E+'">'+(/all|left/.test(E)&&A==0?d?g:q:"")+(/all|right/.test(E)&&A==0?d?q:g:"")+this._generateMonthYearHeader(b,j,p,n,o,A>0||C>0,t,u)+'</div><table class="ui-datepicker-calendar"><thead><tr>';var G=k?'<th class="ui-datepicker-week-col">'+this._get(b,"weekHeader")+"</th>":"";for(E=0;E<7;E++){var H=(E+h)%7;G+="<th"+((E+h+6)%7>=5?' class="ui-datepicker-week-end"':"")+'><span title="'+r[H]+'">'+s[H]+"</span></th>"}F+=G+"</tr></thead><tbody>";G=this._getDaysInMonth(p,j);if(p==b.selectedYear&&j==b.selectedMonth)b.selectedDay=Math.min(b.selectedDay,G);E=(this._getFirstDayOfMonth(p,j)-h+7)%7;G=l?6:Math.ceil((E+G)/7);H=this._daylightSavingAdjust(new Date(p,j,1-E));for(var I=0;I<G;I++){F+="<tr>";var J=!k?"":'<td class="ui-datepicker-week-col">'+this._get(b,"calculateWeek")(H)+"</td>";for(E=0;E<7;E++){var K=v?v.apply(b.input?b.input[0]:null,[H]):[true,""],L=H.getMonth()!=j,M=L&&!x||!K[0]||n&&H<n||o&&H>o;J+='<td class="'+((E+h+6)%7>=5?" ui-datepicker-week-end":"")+(L?" ui-datepicker-other-month":"")+(H.getTime()==D.getTime()&&j==b.selectedMonth&&b._keyEvent||y.getTime()==H.getTime()&&y.getTime()==D.getTime()?" "+this._dayOverClass:"")+(M?" "+this._unselectableClass+" ui-state-disabled":"")+(L&&!w?"":" "+K[1]+(H.getTime()==m.getTime()?" "+this._currentClass:"")+(H.getTime()==c.getTime()?" ui-datepicker-today":""))+'"'+((!L||w)&&K[2]?' title="'+K[2]+'"':"")+(M?"":' onclick="DP_jQuery_'+e+".datepicker._selectDay('#"+b.id+"',"+H.getMonth()+","+H.getFullYear()+', this);return false;"')+">"+(L&&!w?"&#xa0;":M?'<span class="ui-state-default">'+H.getDate()+"</span>":'<a class="ui-state-default'+(H.getTime()==c.getTime()?" ui-state-highlight":"")+(H.getTime()==m.getTime()?" ui-state-active":"")+(L?" ui-priority-secondary":"")+'" href="#">'+H.getDate()+"</a>")+"</td>";H.setDate(H.getDate()+1);H=this._daylightSavingAdjust(H)}F+=J+"</tr>"}j++;if(j>11){j=0;p++}F+="</tbody></table>"+(l?"</div>"+(i[0]>0&&C==i[1]-1?'<div class="ui-datepicker-row-break"></div>':""):"");B+=F}z+=B}z+=f+(a.browser.msie&&parseInt(a.browser.version,10)<7&&!b.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':"");b._keyEvent=false;return z},_generateMonthYearHeader:function(a,b,c,d,f,g,h,i){var j=this._get(a,"changeMonth"),k=this._get(a,"changeYear"),l=this._get(a,"showMonthAfterYear"),m='<div class="ui-datepicker-title">',n="";if(g||!j)n+='<span class="ui-datepicker-month">'+h[b]+"</span>";else{h=d&&d.getFullYear()==c;var o=f&&f.getFullYear()==c;n+='<select class="ui-datepicker-month" onchange="DP_jQuery_'+e+".datepicker._selectMonthYear('#"+a.id+"', this, 'M');\" onclick=\"DP_jQuery_"+e+".datepicker._clickMonthYear('#"+a.id+"');\">";for(var p=0;p<12;p++)if((!h||p>=d.getMonth())&&(!o||p<=f.getMonth()))n+='<option value="'+p+'"'+(p==b?' selected="selected"':"")+">"+i[p]+"</option>";n+="</select>"}l||(m+=n+(g||!(j&&k)?"&#xa0;":""));if(!a.yearshtml){a.yearshtml="";if(g||!k)m+='<span class="ui-datepicker-year">'+c+"</span>";else{i=this._get(a,"yearRange").split(":");var q=(new Date).getFullYear();h=function(a){a=a.match(/c[+-].*/)?c+parseInt(a.substring(1),10):a.match(/[+-].*/)?q+parseInt(a,10):parseInt(a,10);return isNaN(a)?q:a};b=h(i[0]);i=Math.max(b,h(i[1]||""));b=d?Math.max(b,d.getFullYear()):b;i=f?Math.min(i,f.getFullYear()):i;for(a.yearshtml+='<select class="ui-datepicker-year" onchange="DP_jQuery_'+e+".datepicker._selectMonthYear('#"+a.id+"', this, 'Y');\" onclick=\"DP_jQuery_"+e+".datepicker._clickMonthYear('#"+a.id+"');\">";b<=i;b++)a.yearshtml+='<option value="'+b+'"'+(b==c?' selected="selected"':"")+">"+b+"</option>";a.yearshtml+="</select>";m+=a.yearshtml;a.yearshtml=null}}m+=this._get(a,"yearSuffix");if(l)m+=(g||!(j&&k)?"&#xa0;":"")+n;m+="</div>";return m},_adjustInstDate:function(a,b,c){var d=a.drawYear+(c=="Y"?b:0),e=a.drawMonth+(c=="M"?b:0);b=Math.min(a.selectedDay,this._getDaysInMonth(d,e))+(c=="D"?b:0);d=this._restrictMinMax(a,this._daylightSavingAdjust(new Date(d,e,b)));a.selectedDay=d.getDate();a.drawMonth=a.selectedMonth=d.getMonth();a.drawYear=a.selectedYear=d.getFullYear();if(c=="M"||c=="Y")this._notifyChange(a)},_restrictMinMax:function(a,b){var c=this._getMinMaxDate(a,"min");a=this._getMinMaxDate(a,"max");b=c&&b<c?c:b;return b=a&&b>a?a:b},_notifyChange:function(a){var b=this._get(a,"onChangeMonthYear");if(b)b.apply(a.input?a.input[0]:null,[a.selectedYear,a.selectedMonth+1,a])},_getNumberOfMonths:function(a){a=this._get(a,"numberOfMonths");return a==null?[1,1]:typeof a=="number"?[1,a]:a},_getMinMaxDate:function(a,b){return this._determineDate(a,this._get(a,b+"Date"),null)},_getDaysInMonth:function(a,b){return 32-this._daylightSavingAdjust(new Date(a,b,32)).getDate()},_getFirstDayOfMonth:function(a,b){return(new Date(a,b,1)).getDay()},_canAdjustMonth:function(a,b,c,d){var e=this._getNumberOfMonths(a);c=this._daylightSavingAdjust(new Date(c,d+(b<0?b:e[0]*e[1]),1));b<0&&c.setDate(this._getDaysInMonth(c.getFullYear(),c.getMonth()));return this._isInRange(a,c)},_isInRange:function(a,b){var c=this._getMinMaxDate(a,"min");a=this._getMinMaxDate(a,"max");return(!c||b.getTime()>=c.getTime())&&(!a||b.getTime()<=a.getTime())},_getFormatConfig:function(a){var b=this._get(a,"shortYearCutoff");b=typeof b!="string"?b:(new Date).getFullYear()%100+parseInt(b,10);return{shortYearCutoff:b,dayNamesShort:this._get(a,"dayNamesShort"),dayNames:this._get(a,"dayNames"),monthNamesShort:this._get(a,"monthNamesShort"),monthNames:this._get(a,"monthNames")}},_formatDate:function(a,b,c,d){if(!b){a.currentDay=a.selectedDay;a.currentMonth=a.selectedMonth;a.currentYear=a.selectedYear}b=b?typeof b=="object"?b:this._daylightSavingAdjust(new Date(d,c,b)):this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));return this.formatDate(this._get(a,"dateFormat"),b,this._getFormatConfig(a))}});a.fn.datepicker=function(b){if(!this.length)return this;if(!a.datepicker.initialized){a(document).mousedown(a.datepicker._checkExternalClick).find("body").append(a.datepicker.dpDiv);a.datepicker.initialized=true}var c=Array.prototype.slice.call(arguments,1);if(typeof b=="string"&&(b=="isDisabled"||b=="getDate"||b=="widget"))return a.datepicker["_"+b+"Datepicker"].apply(a.datepicker,[this[0]].concat(c));if(b=="option"&&arguments.length==2&&typeof arguments[1]=="string")return a.datepicker["_"+b+"Datepicker"].apply(a.datepicker,[this[0]].concat(c));return this.each(function(){typeof b=="string"?a.datepicker["_"+b+"Datepicker"].apply(a.datepicker,[this].concat(c)):a.datepicker._attachDatepicker(this,b)})};a.datepicker=new c;a.datepicker.initialized=false;a.datepicker.uuid=(new Date).getTime();a.datepicker.version="1.8.13";window["DP_jQuery_"+e]=a})(jQuery);(function(a,b){var c={buttons:true,height:true,maxHeight:true,maxWidth:true,minHeight:true,minWidth:true,width:true},d={maxHeight:true,maxWidth:true,minHeight:true,minWidth:true},e=a.attrFn||{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true,click:true};a.widget("ui.dialog",{options:{autoOpen:true,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:{my:"center",at:"center",collision:"fit",using:function(b){var c=a(this).css(b).offset().top;c<0&&a(this).css("top",b.top-c)}},resizable:true,show:null,stack:true,title:"",width:300,zIndex:1e3},_create:function(){this.originalTitle=this.element.attr("title");if(typeof this.originalTitle!=="string")this.originalTitle="";this.options.title=this.options.title||this.originalTitle;var b=this,c=b.options,d=c.title||"&#160;",e=a.ui.dialog.getTitleId(b.element),f=(b.uiDialog=a("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+c.dialogClass).css({zIndex:c.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(d){if(c.closeOnEscape&&d.keyCode&&d.keyCode===a.ui.keyCode.ESCAPE){b.close(d);d.preventDefault()}}).attr({role:"dialog","aria-labelledby":e}).mousedown(function(a){b.moveToTop(false,a)});b.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(f);var g=(b.uiDialogTitlebar=a("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(f),h=a('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){h.addClass("ui-state-hover")},function(){h.removeClass("ui-state-hover")}).focus(function(){h.addClass("ui-state-focus")}).blur(function(){h.removeClass("ui-state-focus")}).click(function(a){b.close(a);return false}).appendTo(g);(b.uiDialogTitlebarCloseText=a("<span></span>")).addClass("ui-icon ui-icon-closethick").text(c.closeText).appendTo(h);a("<span></span>").addClass("ui-dialog-title").attr("id",e).html(d).prependTo(g);if(a.isFunction(c.beforeclose)&&!a.isFunction(c.beforeClose))c.beforeClose=c.beforeclose;g.find("*").add(g).disableSelection();c.draggable&&a.fn.draggable&&b._makeDraggable();c.resizable&&a.fn.resizable&&b._makeResizable();b._createButtons(c.buttons);b._isOpen=false;a.fn.bgiframe&&f.bgiframe()},_init:function(){this.options.autoOpen&&this.open()},destroy:function(){var a=this;a.overlay&&a.overlay.destroy();a.uiDialog.hide();a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");a.uiDialog.remove();a.originalTitle&&a.element.attr("title",a.originalTitle);return a},widget:function(){return this.uiDialog},close:function(b){var c=this,d,e;if(false!==c._trigger("beforeClose",b)){c.overlay&&c.overlay.destroy();c.uiDialog.unbind("keypress.ui-dialog");c._isOpen=false;if(c.options.hide)c.uiDialog.hide(c.options.hide,function(){c._trigger("close",b)});else{c.uiDialog.hide();c._trigger("close",b)}a.ui.dialog.overlay.resize();if(c.options.modal){d=0;a(".ui-dialog").each(function(){if(this!==c.uiDialog[0]){e=a(this).css("z-index");isNaN(e)||(d=Math.max(d,e))}});a.ui.dialog.maxZ=d}return c}},isOpen:function(){return this._isOpen},moveToTop:function(b,c){var d=this,e=d.options;if(e.modal&&!b||!e.stack&&!e.modal)return d._trigger("focus",c);if(e.zIndex>a.ui.dialog.maxZ)a.ui.dialog.maxZ=e.zIndex;if(d.overlay){a.ui.dialog.maxZ+=1;d.overlay.$el.css("z-index",a.ui.dialog.overlay.maxZ=a.ui.dialog.maxZ)}b={scrollTop:d.element.attr("scrollTop"),scrollLeft:d.element.attr("scrollLeft")};a.ui.dialog.maxZ+=1;d.uiDialog.css("z-index",a.ui.dialog.maxZ);d.element.attr(b);d._trigger("focus",c);return d},open:function(){if(!this._isOpen){var b=this,c=b.options,d=b.uiDialog;b.overlay=c.modal?new a.ui.dialog.overlay(b):null;b._size();b._position(c.position);d.show(c.show);b.moveToTop(true);c.modal&&d.bind("keypress.ui-dialog",function(b){if(b.keyCode===a.ui.keyCode.TAB){var c=a(":tabbable",this),d=c.filter(":first");c=c.filter(":last");if(b.target===c[0]&&!b.shiftKey){d.focus(1);return false}else if(b.target===d[0]&&b.shiftKey){c.focus(1);return false}}});a(b.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus();b._isOpen=true;b._trigger("open");return b}},_createButtons:function(b){var c=this,d=false,f=a("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),h=a("<div></div>").addClass("ui-dialog-buttonset").appendTo(f);c.uiDialog.find(".ui-dialog-buttonpane").remove();typeof b==="object"&&b!==null&&a.each(b,function(){return!(d=true)});if(d){a.each(b,function(b,d){d=a.isFunction(d)?{click:d,text:b}:d;var f=a('<button type="button"></button>').click(function(){d.click.apply(c.element[0],arguments)}).appendTo(h);a.each(d,function(a,b){if(a!=="click")a in e?f[a](b):f.attr(a,b)});a.fn.button&&f.button()});f.appendTo(c.uiDialog)}},_makeDraggable:function(){function b(a){return{position:a.position,offset:a.offset}}var c=this,d=c.options,e=a(document),f;c.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(e,g){f=d.height==="auto"?"auto":a(this).height();a(this).height(a(this).height()).addClass("ui-dialog-dragging");c._trigger("dragStart",e,b(g))},drag:function(a,d){c._trigger("drag",a,b(d))},stop:function(g,k){d.position=[k.position.left-e.scrollLeft(),k.position.top-e.scrollTop()];a(this).removeClass("ui-dialog-dragging").height(f);c._trigger("dragStop",g,b(k));a.ui.dialog.overlay.resize()}})},_makeResizable:function(c){function d(a){return{originalPosition:a.originalPosition,originalSize:a.originalSize,position:a.position,size:a.size}}c=c===b?this.options.resizable:c;var e=this,f=e.options,g=e.uiDialog.css("position");c=typeof c==="string"?c:"n,e,s,w,se,sw,ne,nw";e.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:e.element,maxWidth:f.maxWidth,maxHeight:f.maxHeight,minWidth:f.minWidth,minHeight:e._minHeight(),handles:c,start:function(b,c){a(this).addClass("ui-dialog-resizing");e._trigger("resizeStart",b,d(c))},resize:function(a,b){e._trigger("resize",a,d(b))},stop:function(b,c){a(this).removeClass("ui-dialog-resizing");f.height=a(this).height();f.width=a(this).width();e._trigger("resizeStop",b,d(c));a.ui.dialog.overlay.resize()}}).css("position",g).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var a=this.options;return a.height==="auto"?a.minHeight:Math.min(a.minHeight,a.height)},_position:function(b){var c=[],d=[0,0],e;if(b){if(typeof b==="string"||typeof b==="object"&&"0"in b){c=b.split?b.split(" "):[b[0],b[1]];if(c.length===1)c[1]=c[0];a.each(["left","top"],function(a,b){if(+c[a]===c[a]){d[a]=c[a];c[a]=b}});b={my:c.join(" "),at:c.join(" "),offset:d.join(" ")}}b=a.extend({},a.ui.dialog.prototype.options.position,b)}else b=a.ui.dialog.prototype.options.position;(e=this.uiDialog.is(":visible"))||this.uiDialog.show();this.uiDialog.css({top:0,left:0}).position(a.extend({of:window},b));e||this.uiDialog.hide()},_setOptions:function(b){var e=this,g={},h=false;a.each(b,function(a,b){e._setOption(a,b);if(a in c)h=true;if(a in d)g[a]=b});h&&this._size();this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",g)},_setOption:function(b,c){var d=this,e=d.uiDialog;switch(b){case"beforeclose":b="beforeClose";break;case"buttons":d._createButtons(c);break;case"closeText":d.uiDialogTitlebarCloseText.text(""+c);break;case"dialogClass":e.removeClass(d.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+c);break;case"disabled":c?e.addClass("ui-dialog-disabled"):e.removeClass("ui-dialog-disabled");break;case"draggable":var f=e.is(":data(draggable)");f&&!c&&e.draggable("destroy");!f&&c&&d._makeDraggable();break;case"position":d._position(c);break;case"resizable":(f=e.is(":data(resizable)"))&&!c&&e.resizable("destroy");f&&typeof c==="string"&&e.resizable("option","handles",c);!f&&c!==false&&d._makeResizable(c);break;case"title":a(".ui-dialog-title",d.uiDialogTitlebar).html(""+(c||"&#160;"));break}a.Widget.prototype._setOption.apply(d,arguments)},_size:function(){var b=this.options,c,d,e=this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0});if(b.minWidth>b.width)b.width=b.minWidth;c=this.uiDialog.css({height:"auto",width:b.width}).height();d=Math.max(0,b.minHeight-c);if(b.height==="auto")if(a.support.minHeight)this.element.css({minHeight:d,height:"auto"});else{this.uiDialog.show();b=this.element.css("height","auto").height();e||this.uiDialog.hide();this.element.height(Math.max(b,d))}else this.element.height(Math.max(b.height-c,0));this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())}});a.extend(a.ui.dialog,{version:"1.8.13",uuid:0,maxZ:0,getTitleId:function(a){a=a.attr("id");if(!a){this.uuid+=1;a=this.uuid}return"ui-dialog-title-"+a},overlay:function(b){this.$el=a.ui.dialog.overlay.create(b)}});a.extend(a.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(a){return a+".dialog-overlay"}).join(" "),create:function(b){if(this.instances.length===0){setTimeout(function(){a.ui.dialog.overlay.instances.length&&a(document).bind(a.ui.dialog.overlay.events,function(b){if(a(b.target).zIndex()<a.ui.dialog.overlay.maxZ)return false})},1);a(document).bind("keydown.dialog-overlay",function(c){if(b.options.closeOnEscape&&c.keyCode&&c.keyCode===a.ui.keyCode.ESCAPE){b.close(c);c.preventDefault()}});a(window).bind("resize.dialog-overlay",a.ui.dialog.overlay.resize)}var c=(this.oldInstances.pop()||a("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});a.fn.bgiframe&&c.bgiframe();this.instances.push(c);return c},destroy:function(b){var c=a.inArray(b,this.instances);c!=-1&&this.oldInstances.push(this.instances.splice(c,1)[0]);this.instances.length===0&&a([document,window]).unbind(".dialog-overlay");b.remove();var d=0;a.each(this.instances,function(){d=Math.max(d,this.css("z-index"))});this.maxZ=d},height:function(){var b,c;if(a.browser.msie&&a.browser.version<7){b=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);c=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);return b<c?a(window).height()+"px":b+"px"}else return a(document).height()+"px"},width:function(){var b,c;if(a.browser.msie&&a.browser.version<7){b=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);c=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);return b<c?a(window).width()+"px":b+"px"}else return a(document).width()+"px"},resize:function(){var b=a([]);a.each(a.ui.dialog.overlay.instances,function(){b=b.add(this)});b.css({width:0,height:0}).css({width:a.ui.dialog.overlay.width(),height:a.ui.dialog.overlay.height()})}});a.extend(a.ui.dialog.overlay.prototype,{destroy:function(){a.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);(function(a){a.ui=a.ui||{};var b=/left|center|right/,c=/top|center|bottom/,d=a.fn.position,e=a.fn.offset;a.fn.position=function(e){if(!e||!e.of)return d.apply(this,arguments);e=a.extend({},e);var g=a(e.of),h=g[0],i=(e.collision||"flip").split(" "),j=e.offset?e.offset.split(" "):[0,0],k,l,m;if(h.nodeType===9){k=g.width();l=g.height();m={top:0,left:0}}else if(h.setTimeout){k=g.width();l=g.height();m={top:g.scrollTop(),left:g.scrollLeft()}}else if(h.preventDefault){e.at="left top";k=l=0;m={top:e.of.pageY,left:e.of.pageX}}else{k=g.outerWidth();l=g.outerHeight();m=g.offset()}a.each(["my","at"],function(){var a=(e[this]||"").split(" ");if(a.length===1)a=b.test(a[0])?a.concat(["center"]):c.test(a[0])?["center"].concat(a):["center","center"];a[0]=b.test(a[0])?a[0]:"center";a[1]=c.test(a[1])?a[1]:"center";e[this]=a});if(i.length===1)i[1]=i[0];j[0]=parseInt(j[0],10)||0;if(j.length===1)j[1]=j[0];j[1]=parseInt(j[1],10)||0;if(e.at[0]==="right")m.left+=k;else if(e.at[0]==="center")m.left+=k/2;if(e.at[1]==="bottom")m.top+=l;else if(e.at[1]==="center")m.top+=l/2;m.left+=j[0];m.top+=j[1];return this.each(function(){var b=a(this),c=b.outerWidth(),d=b.outerHeight(),f=parseInt(a.curCSS(this,"marginLeft",true))||0,g=parseInt(a.curCSS(this,"marginTop",true))||0,h=c+f+(parseInt(a.curCSS(this,"marginRight",true))||0),p=d+g+(parseInt(a.curCSS(this,"marginBottom",true))||0),q=a.extend({},m),r;if(e.my[0]==="right")q.left-=c;else if(e.my[0]==="center")q.left-=c/2;if(e.my[1]==="bottom")q.top-=d;else if(e.my[1]==="center")q.top-=d/2;q.left=Math.round(q.left);q.top=Math.round(q.top);r={left:q.left-f,top:q.top-g};a.each(["left","top"],function(b,f){a.ui.position[i[b]]&&a.ui.position[i[b]][f](q,{targetWidth:k,targetHeight:l,elemWidth:c,elemHeight:d,collisionPosition:r,collisionWidth:h,collisionHeight:p,offset:j,my:e.my,at:e.at})});a.fn.bgiframe&&b.bgiframe();b.offset(a.extend(q,{using:e.using}))})};a.ui.position={fit:{left:function(b,c){var d=a(window);d=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft();b.left=d>0?b.left-d:Math.max(b.left-c.collisionPosition.left,b.left)},top:function(b,c){var d=a(window);d=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop();b.top=d>0?b.top-d:Math.max(b.top-c.collisionPosition.top,b.top)}},flip:{left:function(b,c){if(c.at[0]!=="center"){var d=a(window);d=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft();var e=c.my[0]==="left"?-c.elemWidth:c.my[0]==="right"?c.elemWidth:0,f=c.at[0]==="left"?c.targetWidth:-c.targetWidth,g=-2*c.offset[0];b.left+=c.collisionPosition.left<0?e+f+g:d>0?e+f+g:0}},top:function(b,c){if(c.at[1]!=="center"){var d=a(window);d=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop();var e=c.my[1]==="top"?-c.elemHeight:c.my[1]==="bottom"?c.elemHeight:0,f=c.at[1]==="top"?c.targetHeight:-c.targetHeight,g=-2*c.offset[1];b.top+=c.collisionPosition.top<0?e+f+g:d>0?e+f+g:0}}}};if(!a.offset.setOffset){a.offset.setOffset=function(b,c){if(/static/.test(a.curCSS(b,"position")))b.style.position="relative";var d=a(b),e=d.offset(),f=parseInt(a.curCSS(b,"top",true),10)||0,g=parseInt(a.curCSS(b,"left",true),10)||0;e={top:c.top-e.top+f,left:c.left-e.left+g};"using"in c?c.using.call(b,e):d.css(e)};a.fn.offset=function(b){var c=this[0];if(!c||!c.ownerDocument)return null;if(b)return this.each(function(){a.offset.setOffset(this,b)});return e.call(this)}}})(jQuery);(function(a,b){a.widget("ui.progressbar",{options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()});this.valueDiv=a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);this.oldValue=this._value();this._refreshValue()},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");this.valueDiv.remove();a.Widget.prototype.destroy.apply(this,arguments)},value:function(a){if(a===b)return this._value();this._setOption("value",a);return this},_setOption:function(b,c){if(b==="value"){this.options.value=c;this._refreshValue();this._value()===this.options.max&&this._trigger("complete")}a.Widget.prototype._setOption.apply(this,arguments)},_value:function(){var a=this.options.value;if(typeof a!=="number")a=0;return Math.min(this.options.max,Math.max(this.min,a))},_percentage:function(){return 100*this._value()/this.options.max},_refreshValue:function(){var a=this.value(),b=this._percentage();if(this.oldValue!==a){this.oldValue=a;this._trigger("change")}this.valueDiv.toggle(a>this.min).toggleClass("ui-corner-right",a===this.options.max).width(b.toFixed(0)+"%");this.element.attr("aria-valuenow",a)}});a.extend(a.ui.progressbar,{version:"1.8.13"})})(jQuery);(function(a){a.widget("ui.slider",a.ui.mouse,{widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){var b=this,c=this.options,d=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),e=c.values&&c.values.length||1,f=[];this._mouseSliding=this._keySliding=false;this._animateOff=true;this._handleIndex=null;this._detectOrientation();this._mouseInit();this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all"+(c.disabled?" ui-slider-disabled ui-disabled":""));this.range=a([]);if(c.range){if(c.range===true){if(!c.values)c.values=[this._valueMin(),this._valueMin()];if(c.values.length&&c.values.length!==2)c.values=[c.values[0],c.values[0]]}this.range=a("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+(c.range==="min"||c.range==="max"?" ui-slider-range-"+c.range:""))}for(var g=d.length;g<e;g+=1)f.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>");this.handles=d.add(a(f.join("")).appendTo(b.element));this.handle=this.handles.eq(0);this.handles.add(this.range).filter("a").click(function(a){a.preventDefault()}).hover(function(){c.disabled||a(this).addClass("ui-state-hover")},function(){a(this).removeClass("ui-state-hover")}).focus(function(){if(c.disabled)a(this).blur();else{a(".ui-slider .ui-state-focus").removeClass("ui-state-focus");a(this).addClass("ui-state-focus")}}).blur(function(){a(this).removeClass("ui-state-focus")});this.handles.each(function(b){a(this).data("index.ui-slider-handle",b)});this.handles.keydown(function(c){var d=true,e=a(this).data("index.ui-slider-handle"),f,g,h;if(!b.options.disabled){switch(c.keyCode){case a.ui.keyCode.HOME:case a.ui.keyCode.END:case a.ui.keyCode.PAGE_UP:case a.ui.keyCode.PAGE_DOWN:case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:d=false;if(!b._keySliding){b._keySliding=true;a(this).addClass("ui-state-active");f=b._start(c,e);if(f===false)return}break}h=b.options.step;f=b.options.values&&b.options.values.length?g=b.values(e):g=b.value();switch(c.keyCode){case a.ui.keyCode.HOME:g=b._valueMin();break;case a.ui.keyCode.END:g=b._valueMax();break;case a.ui.keyCode.PAGE_UP:g=b._trimAlignValue(f+(b._valueMax()-b._valueMin())/5);break;case a.ui.keyCode.PAGE_DOWN:g=b._trimAlignValue(f-(b._valueMax()-b._valueMin())/5);break;case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:if(f===b._valueMax())return;g=b._trimAlignValue(f+h);break;case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(f===b._valueMin())return;g=b._trimAlignValue(f-h);break}b._slide(c,e,g);return d}}).keyup(function(c){var d=a(this).data("index.ui-slider-handle");if(b._keySliding){b._keySliding=false;b._stop(c,d);b._change(c,d);a(this).removeClass("ui-state-active")}});this._refreshValue();this._animateOff=false},destroy:function(){this.handles.remove();this.range.remove();this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");this._mouseDestroy();return this},_mouseCapture:function(b){var c=this.options,d,e,f,g,h;if(c.disabled)return false;this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};this.elementOffset=this.element.offset();d=this._normValueFromMouse({x:b.pageX,y:b.pageY});e=this._valueMax()-this._valueMin()+1;g=this;this.handles.each(function(b){var c=Math.abs(d-g.values(b));if(e>c){e=c;f=a(this);h=b}});if(c.range===true&&this.values(1)===c.min){h+=1;f=a(this.handles[h])}if(this._start(b,h)===false)return false;this._mouseSliding=true;g._handleIndex=h;f.addClass("ui-state-active").focus();c=f.offset();this._clickOffset=!a(b.target).parents().andSelf().is(".ui-slider-handle")?{left:0,top:0}:{left:b.pageX-c.left-f.width()/2,top:b.pageY-c.top-f.height()/2-(parseInt(f.css("borderTopWidth"),10)||0)-(parseInt(f.css("borderBottomWidth"),10)||0)+(parseInt(f.css("marginTop"),10)||0)};this.handles.hasClass("ui-state-hover")||this._slide(b,h,d);return this._animateOff=true},_mouseStart:function(){return true},_mouseDrag:function(a){var b=this._normValueFromMouse({x:a.pageX,y:a.pageY});this._slide(a,this._handleIndex,b);return false},_mouseStop:function(a){this.handles.removeClass("ui-state-active");this._mouseSliding=false;this._stop(a,this._handleIndex);this._change(a,this._handleIndex);this._clickOffset=this._handleIndex=null;return this._animateOff=false},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(a){var b;if(this.orientation==="horizontal"){b=this.elementSize.width;a=a.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)}else{b=this.elementSize.height;a=a.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)}b=a/b;if(b>1)b=1;if(b<0)b=0;if(this.orientation==="vertical")b=1-b;a=this._valueMax()-this._valueMin();return this._trimAlignValue(this._valueMin()+b*a)},_start:function(a,b){var c={handle:this.handles[b],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(b);c.values=this.values()}return this._trigger("start",a,c)},_slide:function(a,b,c){var d;if(this.options.values&&this.options.values.length){d=this.values(b?0:1);if(this.options.values.length===2&&this.options.range===true&&(b===0&&c>d||b===1&&c<d))c=d;if(c!==this.values(b)){d=this.values();d[b]=c;a=this._trigger("slide",a,{handle:this.handles[b],value:c,values:d});this.values(b?0:1);a!==false&&this.values(b,c,true)}}else if(c!==this.value()){a=this._trigger("slide",a,{handle:this.handles[b],value:c});a!==false&&this.value(c)}},_stop:function(a,b){var c={handle:this.handles[b],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(b);c.values=this.values()}this._trigger("stop",a,c)},_change:function(a,b){if(!this._keySliding&&!this._mouseSliding){var c={handle:this.handles[b],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(b);c.values=this.values()}this._trigger("change",a,c)}},value:function(a){if(arguments.length){this.options.value=this._trimAlignValue(a);this._refreshValue();this._change(null,0)}else return this._value()},values:function(b,c){var d,e,f;if(arguments.length>1){this.options.values[b]=this._trimAlignValue(c);this._refreshValue();this._change(null,b)}else if(arguments.length)if(a.isArray(arguments[0])){d=this.options.values;e=arguments[0];for(f=0;f<d.length;f+=1){d[f]=this._trimAlignValue(e[f]);this._change(null,f)}this._refreshValue()}else return this.options.values&&this.options.values.length?this._values(b):this.value();else return this._values()},_setOption:function(b,c){var d,e=0;if(a.isArray(this.options.values))e=this.options.values.length;a.Widget.prototype._setOption.apply(this,arguments);switch(b){case"disabled":if(c){this.handles.filter(".ui-state-focus").blur();this.handles.removeClass("ui-state-hover");this.handles.attr("disabled","disabled");this.element.addClass("ui-disabled")}else{this.handles.removeAttr("disabled");this.element.removeClass("ui-disabled")}break;case"orientation":this._detectOrientation();this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);this._refreshValue();break;case"value":this._animateOff=true;this._refreshValue();this._change(null,0);this._animateOff=false;break;case"values":this._animateOff=true;this._refreshValue();for(d=0;d<e;d+=1)this._change(null,d);this._animateOff=false;break}},_value:function(){var a=this.options.value;return a=this._trimAlignValue(a)},_values:function(a){var b,c;if(arguments.length){b=this.options.values[a];return b=this._trimAlignValue(b)}else{b=this.options.values.slice();for(c=0;c<b.length;c+=1)b[c]=this._trimAlignValue(b[c]);return b}},_trimAlignValue:function(a){if(a<=this._valueMin())return this._valueMin();if(a>=this._valueMax())return this._valueMax();var b=this.options.step>0?this.options.step:1,c=(a-this._valueMin())%b;alignValue=a-c;if(Math.abs(c)*2>=b)alignValue+=c>0?b:-b;return parseFloat(alignValue.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var b=this.options.range,c=this.options,d=this,e=!this._animateOff?c.animate:false,f,g={},h,i,j,k;if(this.options.values&&this.options.values.length)this.handles.each(function(b){f=(d.values(b)-d._valueMin())/(d._valueMax()-d._valueMin())*100;g[d.orientation==="horizontal"?"left":"bottom"]=f+"%";a(this).stop(1,1)[e?"animate":"css"](g,c.animate);if(d.options.range===true)if(d.orientation==="horizontal"){if(b===0)d.range.stop(1,1)[e?"animate":"css"]({left:f+"%"},c.animate);if(b===1)d.range[e?"animate":"css"]({width:f-h+"%"},{queue:false,duration:c.animate})}else{if(b===0)d.range.stop(1,1)[e?"animate":"css"]({bottom:f+"%"},c.animate);if(b===1)d.range[e?"animate":"css"]({height:f-h+"%"},{queue:false,duration:c.animate})}h=f});else{i=this.value();j=this._valueMin();k=this._valueMax();f=k!==j?(i-j)/(k-j)*100:0;g[d.orientation==="horizontal"?"left":"bottom"]=f+"%";this.handle.stop(1,1)[e?"animate":"css"](g,c.animate);if(b==="min"&&this.orientation==="horizontal")this.range.stop(1,1)[e?"animate":"css"]({width:f+"%"},c.animate);if(b==="max"&&this.orientation==="horizontal")this.range[e?"animate":"css"]({width:100-f+"%"},{queue:false,duration:c.animate});if(b==="min"&&this.orientation==="vertical")this.range.stop(1,1)[e?"animate":"css"]({height:f+"%"},c.animate);if(b==="max"&&this.orientation==="vertical")this.range[e?"animate":"css"]({height:100-f+"%"},{queue:false,duration:c.animate})}}});a.extend(a.ui.slider,{version:"1.8.13"})})(jQuery);(function(a,b){function c(){return++e}function d(){return++f}var e=0,f=0;a.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:false,cookie:null,collapsible:false,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(true)},_setOption:function(a,b){if(a=="selected")this.options.collapsible&&b==this.options.selected||this.select(b);else{this.options[a]=b;this._tabify()}},_tabId:function(a){return a.title&&a.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF-]/g,"")||this.options.idPrefix+c()},_sanitizeSelector:function(a){return a.replace(/:/g,"\\:")},_cookie:function(){var b=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+d());return a.cookie.apply(null,[b].concat(a.makeArray(arguments)))},_ui:function(a,b){return{tab:a,panel:b,index:this.anchors.index(a)}},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var b=a(this);b.html(b.data("label.tabs")).removeData("label.tabs")})},_tabify:function(c){function d(b,c){b.css("display","");!a.support.opacity&&c.opacity&&b[0].style.removeAttribute("filter")}var e=this,f=this.options,g=/^#.+/;this.list=this.element.find("ol,ul").eq(0);this.lis=a(" > li:has(a[href])",this.list);this.anchors=this.lis.map(function(){return a("a",this)[0]});this.panels=a([]);this.anchors.each(function(b,c){var d=a(c).attr("href"),h=d.split("#")[0],i;if(h&&(h===location.toString().split("#")[0]||(i=a("base")[0])&&h===i.href)){d=c.hash;c.href=d}if(g.test(d))e.panels=e.panels.add(e.element.find(e._sanitizeSelector(d)));else if(d&&d!=="#"){a.data(c,"href.tabs",d);a.data(c,"load.tabs",d.replace(/#.*$/,""));d=e._tabId(c);c.href="#"+d;c=e.element.find("#"+d);if(!c.length){c=a(f.panelTemplate).attr("id",d).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(e.panels[b-1]||e.list);c.data("destroy.tabs",true)}e.panels=e.panels.add(c)}else f.disabled.push(b)});if(c){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.lis.addClass("ui-state-default ui-corner-top");this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");if(f.selected===b){location.hash&&this.anchors.each(function(a,b){if(b.hash==location.hash){f.selected=a;return false}});if(typeof f.selected!=="number"&&f.cookie)f.selected=parseInt(e._cookie(),10);if(typeof f.selected!=="number"&&this.lis.filter(".ui-tabs-selected").length)f.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"));f.selected=f.selected||(this.lis.length?0:-1)}else if(f.selected===null)f.selected=-1;f.selected=f.selected>=0&&this.anchors[f.selected]||f.selected<0?f.selected:0;f.disabled=a.unique(f.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"),function(a){return e.lis.index(a)}))).sort();a.inArray(f.selected,f.disabled)!=-1&&f.disabled.splice(a.inArray(f.selected,f.disabled),1);this.panels.addClass("ui-tabs-hide");this.lis.removeClass("ui-tabs-selected ui-state-active");if(f.selected>=0&&this.anchors.length){e.element.find(e._sanitizeSelector(e.anchors[f.selected].hash)).removeClass("ui-tabs-hide");this.lis.eq(f.selected).addClass("ui-tabs-selected ui-state-active");e.element.queue("tabs",function(){e._trigger("show",null,e._ui(e.anchors[f.selected],e.element.find(e._sanitizeSelector(e.anchors[f.selected].hash))[0]))});this.load(f.selected)}a(window).bind("unload",function(){e.lis.add(e.anchors).unbind(".tabs");e.lis=e.anchors=e.panels=null})}else f.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"));this.element[f.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible");f.cookie&&this._cookie(f.selected,f.cookie);c=0;for(var h;h=this.lis[c];c++)a(h)[a.inArray(c,f.disabled)!=-1&&!a(h).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled");f.cache===false&&this.anchors.removeData("cache.tabs");this.lis.add(this.anchors).unbind(".tabs");if(f.event!=="mouseover"){var i=function(a,b){b.is(":not(.ui-state-disabled)")&&b.addClass("ui-state-"+a)},j=function(a,b){b.removeClass("ui-state-"+a)};this.lis.bind("mouseover.tabs",function(){i("hover",a(this))});this.lis.bind("mouseout.tabs",function(){j("hover",a(this))});this.anchors.bind("focus.tabs",function(){i("focus",a(this).closest("li"))});this.anchors.bind("blur.tabs",function(){j("focus",a(this).closest("li"))})}var k,l;if(f.fx)if(a.isArray(f.fx)){k=f.fx[0];l=f.fx[1]}else k=l=f.fx;var m=l?function(b,c){a(b).closest("li").addClass("ui-tabs-selected ui-state-active");c.hide().removeClass("ui-tabs-hide").animate(l,l.duration||"normal",function(){d(c,l);e._trigger("show",null,e._ui(b,c[0]))})}:function(b,c){a(b).closest("li").addClass("ui-tabs-selected ui-state-active");c.removeClass("ui-tabs-hide");e._trigger("show",null,e._ui(b,c[0]))},n=k?function(a,b){b.animate(k,k.duration||"normal",function(){e.lis.removeClass("ui-tabs-selected ui-state-active");b.addClass("ui-tabs-hide");d(b,k);e.element.dequeue("tabs")})}:function(a,b){e.lis.removeClass("ui-tabs-selected ui-state-active");b.addClass("ui-tabs-hide");e.element.dequeue("tabs")};this.anchors.bind(f.event+".tabs",function(){var b=this,c=a(b).closest("li"),d=e.panels.filter(":not(.ui-tabs-hide)"),g=e.element.find(e._sanitizeSelector(b.hash));if(c.hasClass("ui-tabs-selected")&&!f.collapsible||c.hasClass("ui-state-disabled")||c.hasClass("ui-state-processing")||e.panels.filter(":animated").length||e._trigger("select",null,e._ui(this,g[0]))===false){this.blur();return false}f.selected=e.anchors.index(this);e.abort();if(f.collapsible)if(c.hasClass("ui-tabs-selected")){f.selected=-1;f.cookie&&e._cookie(f.selected,f.cookie);e.element.queue("tabs",function(){n(b,d)}).dequeue("tabs");this.blur();return false}else if(!d.length){f.cookie&&e._cookie(f.selected,f.cookie);e.element.queue("tabs",function(){m(b,g)});e.load(e.anchors.index(this));this.blur();return false}f.cookie&&e._cookie(f.selected,f.cookie);if(g.length){d.length&&e.element.queue("tabs",function(){n(b,d)});e.element.queue("tabs",function(){m(b,g)});e.load(e.anchors.index(this))}else throw"jQuery UI Tabs: Mismatching fragment identifier.";a.browser.msie&&this.blur()});this.anchors.bind("click.tabs",function(){return false})},_getIndex:function(a){if(typeof a=="string")a=this.anchors.index(this.anchors.filter("[href$="+a+"]"));return a},destroy:function(){var b=this.options;this.abort();this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.anchors.each(function(){var b=a.data(this,"href.tabs");if(b)this.href=b;var c=a(this).unbind(".tabs");a.each(["href","load","cache"],function(a,b){c.removeData(b+".tabs")})});this.lis.unbind(".tabs").add(this.panels).each(function(){a.data(this,"destroy.tabs")?a(this).remove():a(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")});b.cookie&&this._cookie(null,b.cookie);return this},add:function(c,d,e){if(e===b)e=this.anchors.length;var f=this,g=this.options;d=a(g.tabTemplate.replace(/#\{href\}/g,c).replace(/#\{label\}/g,d));c=!c.indexOf("#")?c.replace("#",""):this._tabId(a("a",d)[0]);d.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);var h=f.element.find("#"+c);h.length||(h=a(g.panelTemplate).attr("id",c).data("destroy.tabs",true));h.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");if(e>=this.lis.length){d.appendTo(this.list);h.appendTo(this.list[0].parentNode)}else{d.insertBefore(this.lis[e]);h.insertBefore(this.panels[e])}g.disabled=a.map(g.disabled,function(a){return a>=e?++a:a});this._tabify();if(this.anchors.length==1){g.selected=0;d.addClass("ui-tabs-selected ui-state-active");h.removeClass("ui-tabs-hide");this.element.queue("tabs",function(){f._trigger("show",null,f._ui(f.anchors[0],f.panels[0]))});this.load(0)}this._trigger("add",null,this._ui(this.anchors[e],this.panels[e]));return this},remove:function(b){b=this._getIndex(b);var c=this.options,d=this.lis.eq(b).remove(),e=this.panels.eq(b).remove();if(d.hasClass("ui-tabs-selected")&&this.anchors.length>1)this.select(b+(b+1<this.anchors.length?1:-1));c.disabled=a.map(a.grep(c.disabled,function(a){return a!=b}),function(a){return a>=b?--a:a});this._tabify();this._trigger("remove",null,this._ui(d.find("a")[0],e[0]));return this},enable:function(b){b=this._getIndex(b);var c=this.options;if(a.inArray(b,c.disabled)!=-1){this.lis.eq(b).removeClass("ui-state-disabled");c.disabled=a.grep(c.disabled,function(a){return a!=b});this._trigger("enable",null,this._ui(this.anchors[b],this.panels[b]));return this}},disable:function(a){a=this._getIndex(a);var b=this.options;if(a!=b.selected){this.lis.eq(a).addClass("ui-state-disabled");b.disabled.push(a);b.disabled.sort();this._trigger("disable",null,this._ui(this.anchors[a],this.panels[a]))}return this},select:function(a){a=this._getIndex(a);if(a==-1)if(this.options.collapsible&&this.options.selected!=-1)a=this.options.selected;else return this;this.anchors.eq(a).trigger(this.options.event+".tabs");return this},load:function(b){b=this._getIndex(b);var c=this,d=this.options,e=this.anchors.eq(b)[0],f=a.data(e,"load.tabs");this.abort();if(!f||this.element.queue("tabs").length!==0&&a.data(e,"cache.tabs"))this.element.dequeue("tabs");else{this.lis.eq(b).addClass("ui-state-processing");if(d.spinner){var g=a("span",e);g.data("label.tabs",g.html()).html(d.spinner)}this.xhr=a.ajax(a.extend({},d.ajaxOptions,{url:f,success:function(f,g){c.element.find(c._sanitizeSelector(e.hash)).html(f);c._cleanup();d.cache&&a.data(e,"cache.tabs",true);c._trigger("load",null,c._ui(c.anchors[b],c.panels[b]));try{d.ajaxOptions.success(f,g)}catch(k){}},error:function(a,f){c._cleanup();c._trigger("load",null,c._ui(c.anchors[b],c.panels[b]));try{d.ajaxOptions.error(a,f,b,e)}catch(g){}}}));c.element.dequeue("tabs");return this}},abort:function(){this.element.queue([]);this.panels.stop(false,true);this.element.queue("tabs",this.element.queue("tabs").splice(-2,2));if(this.xhr){this.xhr.abort();delete this.xhr}this._cleanup();return this},url:function(a,b){this.anchors.eq(a).removeData("cache.tabs").data("load.tabs",b);return this},length:function(){return this.anchors.length}});a.extend(a.ui.tabs,{version:"1.8.13"});a.extend(a.ui.tabs.prototype,{rotation:null,rotate:function(a,b){var c=this,d=this.options,e=c._rotate||(c._rotate=function(b){clearTimeout(c.rotation);c.rotation=setTimeout(function(){var a=d.selected;c.select(++a<c.anchors.length?a:0)},a);b&&b.stopPropagation()});b=c._unrotate||(c._unrotate=!b?function(a){a.clientX&&c.rotate(null)}:function(){t=d.selected;e()});if(a){this.element.bind("tabsshow",e);this.anchors.bind(d.event+".tabs",b);e()}else{clearTimeout(c.rotation);this.element.unbind("tabsshow",e);this.anchors.unbind(d.event+".tabs",b);delete this._rotate;delete this._unrotate}return this}})})(jQuery);
    function allInOneOpera() {
        notRunYet = false;
        var travian3 = ID('side_navi');
        var khtmlFL = /khtml/i.test(navigator.appVersion);
        var RTL = document.defaultView.getComputedStyle(document.body, null).getPropertyValue('direction');
        var dragObj = new Object(), x, y, elem, par;
        dragObj.zIndex = 10000;
        var MySPD = 1;
        var merchant_speed = 1;
        if (/[xyz]3|speed/i.test(location.hostname)) { merchant_speed = 3 / 2; MySPD = 2; };
        if (/[xyz]2|t1/i.test(location.hostname)) { merchant_speed = 1; MySPD = 2; };
        if (/[xyz]5/i.test(location.hostname)) { merchant_speed = 5 / 2; MySPD = 2; };
        if (/[xyz]10/i.test(location.hostname)) { merchant_speed = 10 / 2; MySPD = 4; };
        if (typeof uneval == 'undefined' || typeof uneval == null || !uneval) { function uneval(v) { return '[' + v + ']'; }; };
        function ID(id) { return document.getElementById(id) };
        function exp(href) { return document.location.href.match(href) };
        function xpath(path) { return document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); };
        function CLASS(str, m) { return (typeof m == 'undefined' ? document : m).getElementsByClassName(str); };
        function C(value) { return parseInt(value) };
        function ReLoadTime(Time) { var p = Time.split(":"); return (p[0] * 86400) + (p[1] * 3600) + (p[2] * 60) + (p[3] * 1); };
        function ReLoadTimeUp(Time) { var p = Time.split(":"); return (p[0] * 3600) + (p[1] * 60) + (p[2] * 1); };
        function MakeNum(value) { return value.toString().replace(/\d(?=(\d{3})+(\D|$))/g, "$&,"); }
        function Time(x, y) { return format(Math.abs(Math.round(x / y))); };
        function Create(tagName, attr, ihtml, append, appendTo) { var a = document.createElement(tagName); if (attr && attr != null) { for (var i in attr) if (attr.hasOwnProperty(i)) { a.setAttribute(i, attr[i]); }; }; if (ihtml && !ihtml == null) { a.innerHTML = ihtml; }; if (append && !append == null) { for (i = 0; i < append.length; i++) { a.appendChild(append[i]); }; }; if (appendTo && !appendTo == null) { return appendTo.appendChild(a); } else { return a; } };
        function appThis(element, Append) { if (Append && Append != null) { for (x = 0; x < Append.length; x++) { element.appendChild(Append[x]); }; }; };
        function cData(data) { return document.createTextNode(data); };
        function TAG(str, m) { return (typeof m == 'undefined' ? document : m).getElementsByTagName(str); };
        function addAttr(elm, attr) { var a = elm; for (var i in attr) if (attr.hasOwnProperty(i)) { a.setAttribute(i, attr[i]); }; };
        function $t(iHTML) { return document.createTextNode(iHTML); };
        function getTimeNow() { if (ID('tp1').innerHTML.match(/\?/)) { var hrs = new Date().getHours(), min = new Date().getMinutes(), sec = new Date().getSeconds(), timeNow = hrs + ':' + min + ':' + sec; } else { timeNow = ID('tp1').innerHTML }; return timeNow; };
        function CulTime(time) { timer = C(C(ReLoadTimeUp(time)) + C(ReLoadTimeUp(getTimeNow()))); hh = Math.floor(C(timer / 3600)) % 24; mm = Math.floor(C(timer / 60)) % 60; ss = Math.floor(timer) % 60; if (hh < 10) { hh = '0' + hh; }; if (mm < 10) { mm = '0' + mm; }; if (ss < 10) { ss = '0' + ss; }; timer = hh + ':' + mm + ':' + ss; return timer; };
        function EndTime(time) { timer = C(C(ReLoadTimeUp(time)) - C(ReLoadTimeUp(getTimeNow()))); hh = Math.floor(C(timer / 3600)) % 24; mm = Math.floor(C(timer / 60)) % 60; ss = Math.floor(timer) % 60; if (hh < 10) { hh = '0' + hh; }; if (mm < 10) { mm = '0' + mm; }; if (ss < 10) { ss = '0' + ss; }; timer = hh + ':' + mm + ':' + ss; return HMS_To_DHMS(timer); };
        function DHMS_To_HMS(dhms) { var dd = dhms.split(':')[0]; dd = C(dd) > 0 ? C(dd * 24) : dd; var hh = dhms.split(':')[1].split(':')[0], mm = dhms.split(':')[2].split(':')[0], ss = dhms.split(':')[3]; hh = C(dd + hh); return (hh + ':' + mm + ':' + ss); };
        function HMS_To_DHMS(hms) { hms = hms.toString(); var h = hms.split(':')[0]; hh = Math.floor(h) % 24; dd = C(h - hh) / 24; var mm = hms.split(':')[1].split(':')[0], ss = hms.split(':')[2]; return (dd + ':' + hh + ':' + mm + ':' + ss); };
        function Count_Down_Timer() { for (i = 0; i < CLASS('count_down_timer').length; i++) { if (!(CLASS('count_down_timer')[i].innerHTML == '0:00:00:00')) { CLASS('count_down_timer')[i].innerHTML = format(ReLoadTime(CLASS('count_down_timer')[i].innerHTML) - 1); }; }; return setTimeout(Count_Down_Timer, 1000); };
        function set_Title(value) { $('#T4_mHelp').css('display', ''); $('#T4_mHelp').html(value); };
        function $xf(xpath, xpt, startnode, aDoc) {
            var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
            var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
            var XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
            var XPResult = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
            if (!aDoc) aDoc = document;
            if (!startnode) startnode = document;
            var xpres = XPFirst;
            switch (xpt) {
                case 'i': xpres = XPIterator; break;
                case 'l': xpres = XPList; break;
                case 'r': xpres = XPResult; break;
            };
            var ret = aDoc.evaluate(xpath, startnode, null, xpres, null);
            return (xpres == XPFirst ? ret.singleNodeValue : ret);
        };
        function $at(aElem, att) { if (att !== undefined) { for (var xi = 0; xi < att.length; xi++) { aElem.setAttribute(att[xi][0], att[xi][1]); if (att[xi][0].toUpperCase() == 'TITLE') aElem.setAttribute('alt', att[xi][1]); }; }; }; //Acr111-addAttributes
        function $a(iHTML, att) { return $ee('A', iHTML, att); }
        function $e(nElem, att) { var Elem = document.createElement(nElem); $at(Elem, att); return Elem; };
        function $ee(nElem, oElem, att) { var Elem = $e(nElem, att); if (oElem !== undefined) if (typeof (oElem) == 'object') Elem.appendChild(oElem); else Elem.innerHTML = oElem; return Elem; };
        function GM_addStyle(css) {
            var head = document.getElementsByTagName('head')[0];
            if (head) {
                var style = document.createElement("style");
                style.type = "text/css";
                style.appendChild($t(css));
                head.appendChild(style);
            }
        };
        for (i = 0; i < xpath('//div[@class="list"]/ul/li').snapshotLength; i++) {
            if (exp(/spieler/)) {
                $("div.list ul:eq(0) li:eq(" + i + ") a:eq(0)").each(function () {
                    this.href = this.href.replace(/&uid=\d+/, '');
                });
            }
        };
        var About = {
            Version: { Now: '10.0.5.6', New: '10.0.5.7' },
            Script: { Page: 'http://userscripts.org/scripts/show/63218', Download: 'http://userscripts.org/scripts/source/63218.user.js' }
        };
        if (travian3) {
            $('<span style="position: absolute; left: 10px; top: 5px; font-size: 10.5px; z-index: 10000;"><u>T4Plus</u> <b id="this.version">' + About.Version.Now + '</b></span>')
			.appendTo($('#ltime'));
        } else {
            $('<span style="position: absolute; left: 10px; top: 30px; font-size: 10.5px; z-index: 10000;"><u>T4Plus</u> <b id="this.version">' + About.Version.Now + '</b></span>')
			.appendTo($('#logoutContainer'));
        }

        NoteIMG = {
            nIMG: 'data:image/png;base64,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',
            Line: "data:image/gif;base64,R0lGODlhFwAQAIABAODg4AAAACH5BAEAAAEALAAAAAAXABAAQAIVjI+py+0Po5y02ouz3rxjAIbiSIIFADs%3D",
            Note: "data:image/gif;base64,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"
        };
        bau_img = 'data:image/gif;base64,R0lGODlhEAAQAHcAACH5BAEAAAAALAAAAAAQABAAh////yQQB0xMV3d0lH8zDo+Mr8C/0s+EGNXT5P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhQAAEIHEjwAAGCCAsSCJAwoUGGDRVCjDjQoACKCA0MuIhxoEaOGAsAKCDAQEgEAlKeNEByZYGXIBEWQMDyZcuEM2vCjEjT5s2GPlVSTCm0YUAAOw%3D%3D';
        cssString = '.TMbuildingtags{' +
			'background-image:none !important;' +
			'background-color:white;' +
			'border:1px solid black;' +
			'border-radius: 2em 2em 2em 2em;' +
			'padding-top: 3px;' +
			'font-family: Arial,Helvetica,Verdana,sans-serif;' +
			'font-size:9pt !important;' +
			'font-weight:bold;' +
			'text-align:center;' +
			'position:absolute;' +
			'line-height:15px !important;' +
			'width:20px !important;' +
			'height:19px !important;' +
			'cursor:pointer;' +
			'z-index:100;}' +
			'A.TMbuildingtags:link,A.TMbuildingtags:visited{color:black;};';

        cssString += 'table.t4_set td {text-align: center; padding: 1.25px;} table.t4_set {border-radius: 5px 5px 5px 5px;} .t4_set {width: auto; border: 1px solid gray; position: absolute; top: 20px; left: 400px; z-index: 10900; box-shadow: 0px 0px 2px 1px black;}' +
			'#t4tools { background-color: rgba(255, 255, 255, 0.8); border-radius: 5px 5px 5px 5px; box-shadow: 0px 1px 2px 0px black; position: absolute; left:: ' + (RTL == "ltr" ? "300" : "100") + 'px; top: 66px; z-index: 10000;} #t4tools img {padding: 5px;}' +
			'.bList {width: auto;border:1px solid black;}' +
			'#res_needed td {padding: 1px 2px 1px;}' +
			'div#TBL_D1_RES, div#TBL_D2_RES {z-index: 10000; background-color:rgba(205, 205, 205, 0.75); padding-left:4px; padding-right:4px; padding-bottom:4px; border: 1px solid black; border-radius: 5px 5px 5px 5px; box-shadow: 0px 0px 5px 0px black;}' +
			'table.front_res_table {width:auto;background-color:transparent;}' +
			'td.res_header {text-align:center;width:auto;background-color:white;}' +
			'table.front_res_table td table {width: auto; z-index: 10000;float:left;background-color:transparent; border-collapse: collapse;}' +
			'div.RES_drag {height: 25px;}' +
			'#T4_mHelp .xt4Style td {padding: 0px 2px 0px;}' +
			'.tblInfo td {padding: 2px; text-align: ' + (RTL == "rtl" ? "right" : "left") + ';}' +
			'#TrDis table {width: auto; border-collapse: collapse;} #TrDis table td {padding: 0px 2px; border: 1px solid silver;} #TrDis table th {padding: 4px 4px 4px; border: 1px solid silver;}' +
			'#sMR td.sub span.reportInfo {float: ' + (DIR() == "rtl" ? "left" : "right") + '} a.reportInfoIcon {float: ' + (DIR() == "rtl" ? "left" : "right") + '}' +
			'#sMR {background-color: rgba(205, 205, 205, 0.75); box-shadow: 0px 0px 5px 0px black; border: 1px solid black;left: 500px;position: absolute;top: 175px;z-index: 10000; border-radius: 5px; padding-left: 6px; padding-right: 6px; padding-bottom: 6px;}' +
			'#_page {background-color: white; text-align: center;}' +
			'#btn_cls {float: ' + (RTL == "rtl" ? "left" : "right") + ';}' +
			'div#vlls_state {z-index:10000;border:1px solid;border-radius:5px;box-shadow:0px 0px 3px 1px black;}' +
			'#crop_fields tbody tr td {padding: 2px 2px 2px;}' +
			'#elep_fields tbody tr td {padding: 2px 2px 2px;}' +
                    'span.villst img {height: 14px; padding: 0px 2px; width: 16px; font-family: tahoma;}' +
        'span.villst {border: 1px solid black; background-color: #F7EBBE; border-' + (RTL == 'rtl' ? 'right' : 'left') + ': 1px solid #F7EBBE; z-index: 1000; width: auto; height: 14px; text-align: center;font-family: tahoma;}' +
			'#tableres h1 {font-size:12px;color:#333;text-align:center;} #tableres { background-color:rgba(255,255,255,0.9);border-radius:5px 5px 5px 5px;padding:5px;margin:4px auto;width:100%;box-shadow:0 0 2px #222; }' +
			'#timeres, #tdttotal {font-size:10pt; font-weight:bold; border-collapse:collapse; border:1px solid silver; padding:2px; text-align:center; width:16.66%;}' +
			'.tdtotal {font-size:10pt; font-weight:bold; background-color:#FFF6B5; border-collapse:collapse; border:1px solid silver; padding:2px; text-align:center;}' +
			'.trimn {border-collapse:collapse; border:1px solid silver; text-align:center;}' +
			'#restable {line-height:16px; border-collapse:collapse; width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:"white"; padding:2px; margin:1px;}' +
			'#res1, #res2, #res3, #res4, .tdimg {font-size:10pt; border-collapse:collapse; border:1px solid silver; padding:2px; text-align:center; width:16.66%;}' +
			'.res_State {position: absolute; z-index: 99; top: 23px; width: 107px; background-color: rgba(255, 255, 255, 0.8); border-radius: 0px 0px 7px 7px; text-align: center; box-shadow: 0px 1px 1px 0px black;}' +
			'.ACS td {padding: 3px; font-size: 12px;}' +
			'#content h1 {top: 20px} div#w7Window {background-color: rgba(205, 205, 205, 0.75);border: 1px solid black;border-radius: 5px 5px 5px 5px;box-shadow: 0 0 10px black;padding-bottom: 6px;padding-left: 6px;padding-right: 6px;}' +
			"div#xblock {display: none; padding-right: 6px; padding-left: 6px; padding-bottom: 6px; border: 1px solid black; border-radius: 5px 5px 5px 5px; z-index: 10000; background-color: rgba(205, 205, 205, 0.75); position: relative; box-shadow: 0px 0px 10px black;}" +
			"div#xblock textarea { background-image: url(" + NoteIMG.Line + "); background-repeat: repeat; border: 1px solid black; height: 256px; width: 265px;}" +
			"div#xblock div.btn { background-color: white;border-bottom: 1px solid;border-left: 1px solid;border-right: 1px solid;text-align: center;}" +
			'table.acc_tbl td{padding: 1.5px;} #acc_r1 td, #acc_r2 td, #acc_r3 td {padding: 3.5px; background-color: white; border: 1px solid silver; text-align: center;} #acc_r1, #acc_r2, #acc_r3 {background-color: transparent; width: auto; border-collapse: collapse;}' +
			'#hlink { background-color:rgba(255,255,255,0.9);border-radius:5px 5px 5px 5px;padding:5px;margin:4px auto;width:100%;box-shadow:0 0 2px #222; }' +
			'#hlink h1 {font-size:12px;color:#333;text-align:center; border-bottom: 1px solid black;height:25px;}' +
			'#hlink span.edit {float:right;cursor:pointer;}' +
			'#hlink ul {margin:0;padding:0;}' +
			'#hlink li {list-style:none;padding-left:5px;} #hlink li a {color:#555;}' +
			'#hlink input {font-size:9px;} #hlink input.name {width:30px;}' +
			'#TrXw td{padding: 1px 2px 1px;} #TrXs td{padding: 1px 2px 1px;}' +
			'.bList {border: 1px solid black; width: auto; box-shadow: 0px 0px 5px 0px black;}' +
			'#TBL_INF {width: auto; border: 1px solid gray; float:' + (RTL == "ltr" ? "left" : "right") + '; margin:' + (RTL == "ltr" ? "170px -300px 0" : "0") + '0;}' +
			'div#build.gid17 .destination {float:' + (RTL == "ltr" ? "right" : "left") + '; width:224px; margin:' + (RTL == "ltr" ? "0" : "-170px 0 0") + ';}' +
			'#TBL_INF tbody tr td {padding: 2px 2px 2px;}' +
			'#CxS td{padding: 1px; font-size: 12.5px;}' +
			'.mbList { background-color: rgba(255, 255, 255, 0.7); border-radius: 0px 0px 5px 5px; box-shadow: ' + (RTL == "ltr" ? "2" : "-2") + 'px 2px 5px 0px black; position: absolute; top: 67px; width: auto; }\n.mbList img {width: 80px; height: 80px; cursor: pointer; border-radius: 5px 5px 5px 5px;}';

        cssString += '#side_info a.active {color: red;}' +
			'#dreambox h1 {font-size:12px;color:#333;text-align:center;}' +
			'#dreambox {width: 105%;}' +
			'#dreambox span.edit {float:right;cursor:pointer;}' +
			'#dreambox li {list-style:none;padding-left:5px;} #dreambox li a {color:#555;}' +
			'#llist thead tr td {background-color: transparent; border-bottom: 1px solid; padding: 0px; width: 190px;}' +
			'#llist tbody tr td {background-color: transparent; padding: 0px 2px;}' +
			'#llist tbody tr td a {color: black; font-size: 11.5px;} #llist { background-color: rgba(255,255,255,0.9); border-radius: 5px 5px 5px 5px; padding: 5px; margin:4px auto; width: 100%; box-shadow:0 0 2px #222; } #llist tbody tr td {background-color: transparent;}' +
			'div#t4tools ul { border-top:1px solid; }' +
			'div#t4tools div#move {cursor: move; width:125px; background-color: rgba(45, 155, 205, 0.3); height: 10px; border-radius: 5px 5px 0px 0px;}' +
			'table#report_surround thead th, table#report_surround thead td{text-align:right;} table#report_surround thead td.sent{width:25%;font-weight:bold;} table#report_surround td.report_content{padding:15px 28px 0;} table#report_surround td.report_content table{margin-bottom:20px;}' +
			'table#report_surround td.report_content table thead td{text-align:center;} table#report_surround td.report_content table .units th{text-align:center;width:17%;} table#report_surround td.report_content table.support .s7{padding:0;} table#report_surround td.report_content img.bigArrow{background:url(../../img/report/bigArrow-rtl.png);' +
			'width:42px;height:25px;}.ie6  table#report_surround td.report_content img.bigArrow{background:url(../../img/report/bigArrow-rtl.gif);} table#report_surround td.report_content .boxes.trade, table#report_surround td.report_content .boxes.support{height:65px;width:187px;margin-bottom:5px;}' +
			'table#report_surround td.report_content table.support .s7 .boxes{width:216px;} table#report_surround td.report_content .trade .boxes-contents, table#report_surround td.report_content .support .boxes-contents{padding:4px;height:100%;} table#report_surround td.report_content .boxes .headline{margin-bottom:5px;}' +
			'td.report_content table .units th, td.report_content table .units td{border-top:1px solid #ccc;border-right:1px solid #ccc;} td.report_content table tbody.last th, td.report_content table tbody.last td{border-bottom:1px solid #ccc;} td.report_content table td.last, td.report_content table tbody.last th.last{border-left:1px solid #ccc;}' +
			'table#report_surround td.report_content table .units td{width:7.2%;text-align:center;padding-right:2px;padding-left:2px;} table#report_surround td.report_content table tbody.infos td div{margin-top:6px;margin-bottom:6px;line-height:16px;} table#report_surround td.report_content table tbody.infos td img{float:right;margin-left:10px;}' +
			'table#report_surround td.report_content table tbody.infos td img.clock{margin-left:10px;} td.report_content div.role{color:#fff;padding:2px;line-height:20px;} td.report_content td.role{padding:0;vertical-align:top;} td.report_content table#attacker tbody.goods div.res{float:right;width:100%;}' +
			'td.report_content table#attacker tbody.goods div.carry{float:right;width:100%;margin-top:10px;} td.report_content table#attacker tbody.goods div.cranny{float:left;margin-right:20px;} td.report_content table#attacker tbody.goods div.cranny img{float:right;}' +
			'table#report_surround td.report_content tbody.infos td{text-align:right;} .none2{color:#C0C0C0;font-weight:bold;} .none{text-align:center;} table#report_surround .header{margin:5px 0;float:right;} .theader th{background:#efefef;} #subject .text, #subject .text table.coordinates td{font-weight:bold;}' +
			'table#report_surround .rArea{float:right;margin-left:25px;} table#report_surround .rArea img, table#report_surround .carry{margin-left:10px;}';

        if (travian3) {
            cssString += "" +
				".res_State {font-size: 9pt; position: absolute; z-index: 99; top: 16px; width: 86px; background-color: rgba(255, 255, 255, 0.8); border-radius: 0px 0px 7px 7px; text-align: center; box-shadow: 0px 1px 1px 0px black; margin:0 21px 0 4px;}" +
				'.mbList {top:146px;}' +
				'.village1 h1 {font-size: 16px;}' +
				'#content.village2 h1 {font-size: 16px; top:60px;}';
        }
        GM_addStyle(cssString);

        var uSpeed = 'data:image/gif;base64,R0lGODlhGgAQAPcAAAAAAAICAgQEBAYGBgkJCQ0NDRAQEBISEhYWFhkZGR0dHR8fHyIiIiQkJCYmJigoKCsrKy4uLjMzMzU1NTc3Nzg4OD4+PkFBQUdHR0tLS01NTU9PT1JSUldXV1lZWV5eXmJiYmVlZWdnZ2hoaHFxcXNzc3R0dHd3d3l5eYGBgYKCgoSEhIaGhomJiYqKioyMjI2NjY+Pj5CQkJGRkZWVlZqampubm5ycnKGhoaampqioqKurq6+vr7Ozs7S0tLW1tbi4uLm5ub6+vr+/v8PDw8fHx8nJycrKyszMzM7Ozs/Pz9HR0dLS0tfX193d3d7e3uDg4OHh4eLi4uPj4+Tk5Ofn5+jo6Onp6erq6uzs7O/v7/Dw8PLy8vPz8/T09PX19fb29vj4+Pn5+fv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAaABAAAAj/AP8J/FcFQwMcZwYqXMhw4AkAAApoGYhFCJGGGGFAhGCFyQ0QCgQMiPEE48IuKToQEWFAQAAKJSwI0ADE5EIzQSASaAHm3xUXABoMaYhCBpmBYiQkgFGgAIswAn0YAPCizMIIAEI4EcgDgI1/RS4AyLBEIBMMHo4qrOIBwIIjWhgw+CIwjIoCCXII9NKTIRkaBwpYAKBjIBgkGyCSmGLzn5IHACJ4+RdlhswADigIaFCk8ZQVSf5ZURBxxI8rXGg0nbGlsUAxLAQcqKHQSIQAGqS4FtgDsgjGAqmYAKCAx5jdUj4EhaJwxwEBJrjsNgNjQlmFTDgAqJBl9z/pDMOkBEDQJCAAOw==';
        var imghero = "data:image/gif;base64,R0lGODlhEAAQANU/AM+qcPCrU/fDcOJXD/Xamt5UBPRtJtO5gq9ZAdywWa51F/mMKv/91ON6Gv/wtNyHJ7SEM/qXR//++v/99P73xqltKvjow/eENsZZB/11CPeVNuW3bOxsA/zXquLPpv/97NxhAf//3MacSv3x1MxMAf7z4v/np//23c+ZOvavY8deF9NTCePDg+nQif2+du2JOeHbs8uXY+/do+Tpwch5H+vr1NBuHdt4Ec2BMfzu1/v28dGBOdnAmuW8e/327P///yH5BAEAAD8ALAAAAAAQABAAAAamwJ9w+JtQGMQksSSjTJRJSSdB+ECXrkdgdBVOOhFOgyAhSiSMNMW1yIACjmNJUoOxBPhAG3QLbHoHHj8zGw8LGogNHCAgChAAFj8fDgENCxcXBgMFKxWQZZImKZmaKyQqADmgRQwmEQacGAg7XEkhBC8FJLIIOCdKDAI2GA8oCgg0kUQTDiIVMRY5BxAKPKuSLSI8OkI+BCIHVkMTMgQ+RCcEHk8/QQA7";
        var imgatti = "data:image/gif;base64,R0lGODlhEAAQAOYAAJoxM5EqLocoK8BKTre6vsnKy6mqq/T58nu0X1qNQOTv3srivFN8OU1zNVuGPnGiUFqAQXqnXJG9c4yyc4Kla+rz5FqEPVF3N0xuNGqYSoKtZIWvaIClZoivbZnAfpq9gcfcuNnozsXatevv4vH06vj49KGhoJ2dnNjUwevj1uamSNKeUuKrW7+RT7SKTeizZLOMVKOCUamPaa2VcsashtnBnamXfMSxlsOJN7KEQ+fWv9HLw7Kro/Ls5qmop7KNeqRuX71vZrJVTqlSTbtMTOrq6unp6eXl5ePj4+Li4t3d3dra2tjY2NbW1tDQ0M7OzsrKysnJycjIyMbGxsXFxcPDw729vbu7u7m5ubi4uLa2trW1tbOzs66urqurq6mpqaWlpaOjo6KiopOTk////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGQALAAAAAAQABAAAAengFlWWmSFhlJXXIZkYFFFUYtNSklii2RdVUdPhV1JS16WhSZTSFBPVEhjoYZfS0xYRlsFq4ZhTU4ntIsEBig/QENBJZY1MDcpPkICAgBEI6EzLywxQQECAQM9ljw5LTo2CwkNCQgVizIrODuFFRkYDhoKiy4qNIsRDRYRILqFGvkZJIgwR2sDAwYWHnjoMEFeqA8NIFi4kGHDBA2rQnCgQILMgQOFAgEAOw==";
        var imgattc = "data:image/gif;base64,R0lGODlhEAAQAPcAAAEBAxEYIyktMxIXHictNMnKy1x4kig8TVd4k0JYajFRaUlrhhklLVZnc0ZleElpfGB+j4eXoExTV0VldV15hxsjJ1R4iEdhbU1pdnCLmHCDjCs7Qp+ts0hfZ05ueU1nb0lhaVRud5Oip0pqc5qxuG58gE5VV2tydExnbmJ9hBEVFm+Ch7jEx7C4ulVkZ3+Tl3uFh7m+v77O0Wdtbougo5yqrIqcnrPDxYiQkY6YmbC7vK+6uyswMMvY2MDMzL/Ly3B3d2BmZj9DQz5CQi0wMM7a2s3Z2cPPz73IyLvGxrG8vJukpFNYWMTPz5CYmI6Wlo2VlX6FhX2EhGhublleXs7Z2Tw/Pzs+PikrK52kpJGXlx0eHr/Fxc7a2aawr6avrnN6eW1ycYKHhl9nZTw/PlxhXVNYU4mNiaGhoOamSNKeUr+RT7SKTeizZLOMVKmPaa2VcsashtnBncSxlsOJN7KEQ9HLw7KrowMCAerq6unp6eXl5ePj4+Li4t3d3dra2tjY2NbW1s7OzsrKysnJycjIyMbGxsXFxcPDw729vbu7u7m5ubi4uLa2trW1tbOzs66urqurq6mpqaWlpaOjo6KiopOTkwAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJgALAAAAAAQABAAAAjfABklaoSpoMFCih4ZxDSJUB5CCwP56VNpISZIiPYIKgipz59IFguiMcRnkKBDfCyFNCjpD6BFehwVKBhBRkhKMVqcMFNmTIASJkJymSEAwIADChoQSGBQjps5O0JsYLDAAAISLDgshNPmUgUMDoqIOfPCSxaDd+qswWNhgoYuVHT8IAPmCKY3aujYUfGAQpMvQYoUyQEDCSY2aeJg8jDiRhEfVnAUyQAhjMUPKXpUgSJkiAQQF7TYNYiCRhEjW6Jg4uFiBZMlCzuIEGyloBMiWIBIWWijhuArBpNMeaIkIAA7";
        var Send_attack = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wcGETotXvSOywAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAACI0lEQVQokW3Lz0uTcQDH8c/3eR5jublfkZZrTNuWUTktDULE6FJ2KfKUB1uSByMaj0H3/oJ67BJEoOJBuoV16hBkOJY/xqPo09A9OpvP1G26Z9uzZ25j+3YMoje8jm+Eo4d0XkrRpKoHKKX4n6RaDMxLKRqOHlJGL9WwtqtD3M6PZ/IlP/4po5UfibG8sLarQy9VwTSZWZ6rFRBJ6IgktDcZ7e+U0cr+iKIJEaVAuGoBjWaWJ5RSrG4m/CtbKUGtWqwXm+tpZ6t5DAAVY3khohSIlc2pHedPjfm8jkkOAHze5qmceoQlWZnYrnMSQojQYGCgHJVQzSlodZt5n9cxBQAMAKTlRf9Vt03s9lh5LbWD1VgWxQqFoZxEt8fGX3PbxVR0wQ8A3La82THzfvqVz8m5rj8I8PJ+AXvpGMJyC9pd5+A9rePbzOvwarzy++GIbYUVxt8e2BrPinPB5VvHueRg2tiJuLwOk4GFWjEgu/alf11O79wbHB5uu3Q5xAHAGVPF1Ww3WCRpExfaZtF3tw8cy0JamIW0IcNhr7c0GSsuAOAS0o9A8OsnQYomSLFEVUIY9WQx3sJyddiIFWP7B2lL9ojYjJ8/TvTcPrayN7y20NKvfVKrUTx78XLUc6Vrci64fFOnDdk7A4OPe3t7fi6Ggvf3DjVSyyn9XJkxoVqtYejJKO9t75oCAKPp+QDHnYDT5RIBfB8aeWqd/vBOKDFG/AFEDxKNtU2dSAAAAABJRU5ErkJggg%3D%3D';
        var Send_resource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAMCAYAAAC5tzfZAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wcGEgE3nWIm0AAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAABO0lEQVQokX2Qv0tCURTHP9efkFTLoyLQhtTASVpqFiJabGtrtf6AQKKtJaS9waHGBh3EhgYlAhch0DsVZBJmWEmkYA49sttg7+Uz6Tudc8/9cDgfoZTCyP7u9m/zk9brEy6hSCSzwnhzDAJrkXkLkE4VcAn+xDEMpFMFc+gP+LirPFi2ANiMQsoaR8eX+AM+mp0e9/UGuYsi5ZsO8VhUjYSKstqHy2W67Rc2N1ZZiSyzGJ5GV8ICikERAFe5QzU1G6DZqCBlDYDr27pFhm0UYCQcngMgFPRatpnQ+emBBTDqQfDPTZpm2v838VhU2QDOTvbU82PbMmw2Kpa+KKvoqm/evrTgVl+fOpl8iY9Om3FPj27nzfwsZc0063basYsheztb66r1rpv9xJiLUNDLjDZJJl9C8zhJJLPiG9UDhfU4C7tHAAAAAElFTkSuQmCC';
        var IMG_open = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFPBSgJRFD3WLALbjDomiBYWVESLmIqMkSyiTVCbFn1BLfydXNQPFLRuE5IIUhBMrSQhkjAEzanZ5EIdtXffzDgOZBuF49z7zjuHM/fN8/R6PYzyE04vVHqmZFk+Zk/FWs8zXDGkrT7F4OJVVeW8wP6ykiQlD+aB0KTJVn+gvH1DKdRxRv2SBMz63Hy5LCn1ev1ojPXJaDSKoBe4zqjIqCVUPnXEI8BuzBRQTWvE0R7aSxrSCp1OBwSjO47Dbbn/bkYXrnp5WgQIVm/rBMMw0G63ucFNToUoihyLEdFl8PKhQ9dN7G/JpoZpBSo4uhPYSzgJ2gMJqJ4LM8Ow2O9tHTdotVowOsDdvZNgJjSQgHHvVSfBzqbMNdyAilazyV0TG8MThIMih92ThrQ8QZMSsMWHRyfBVMA9g5rmJIivy1zjJLAM1laHn4LfJ3LYva3rD7H7zxf9F+caIuEy94rKV4OTYb8XC+wYV2IB3j+XNBTZMQ7yfQM6y1qthmJRR6Nhbih6vXhic7gNmAaapvF3H+RpTqT1yCfnWbZWsC5P3kqoWJcnZfXpIfySZ9Tr/CvAAFL4JRqBf1s8AAAAAElFTkSuQmCC';
        var star = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3AIKCCQGqs3Q2wAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAACjUlEQVQokX1TzWtUdxQ99/cx8968mcnXNPFzpCoo2mJCEwgigqBYoVAXkkXrshtdZOHOhStBxHWLC9E/wI1d1IBQWyitqCiBLLRUEk2axEQTJ+PMvHkz773fcSGaaCAH7uZwD+fCOVdIYi1YsUoEhkAqnXGKDaA+J0RgoginkhgnUbV2I7FZxwiyjVBGfMGA6uRrXdf3oJ0DQPifnrnO2ZGBsixmXa4cV90FUvaDkgHFoq4tasZDzfqsWLPO2VG6RCfdujsHLrSOxlF71Hr6N5AdAvSxqcrLizLXtc39YlCzHogiBD0ktpIYNBq98FagrYA1fRpMvkOoOxYnbHb8rxTBMC8d+hKRqczgct7nV2K5yXjosxkUbVZZoAnkDSzzmWhWeidvO/z7uIHMUXdz+Lj6WQpxy/x+l/mVCQ5toivuKGuUducQlH1ke2rI9HWjNUe8HFvGm/9ayB9R9w/9qK5Ymy4CgKQrxpuawcCT+zwVTfH7rdbt2l5W+GLAIIlKiCstdOyI0Xj7Ful2fb2rjxfh3Cx8pvKxJLHOLS1J/+QTnN23zf1QKBRk/i4RLdTB/GZs6W/B3/LmVdqhR7XhLeST9vuomiJIXLtUchMH+vHI64SEswFc3MBCjsnMq3mM34ow90/QK02OgrJztSQ+iaY4JEjiiFbgI5xuYU5cNRjUVzNthNMPw8NPx/Q3e1+Yg0On0zMZ2vOrOft0CHUMBd2eD/D0/2q986C69PUgbwKsHRhQN148557xP5JjlTEJvh1BASRXp66kOp278Pe1UvPBHXWOke5iE3mG8NiE+rBXf2mCZMlkPhWTePYod+LPX72f2NABSTCEZrgqXDuy9iVZsZI6KtOTbPiKH/AOLY1Ti+grqtUAAAAASUVORK5CYII%3D';
        var starx = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3AILCgcau11I/gAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAACbElEQVQokX2TT0hUcRDHP799b3ff+nRd3Vo1QztIJgkaGUSHiqioLLASkwohkqAORt06CNFBoj/oIREvRceM6OLBisQOSUKpUZZppMWatYq7rv921femg5ia4RfmMsx3vsPMfJWIsBxWUDk0hW6BpWWKxRpw/JvQFHp0ktLZOCUMK+daZP0/7dzhCGVeB9u0DEZco6odHRsQfCvHXKU8Z2NqBl7TIiv2i2rLZiuCC8HJqHISUgYh5bGCSl+lbAkpykmqyw92H/tjk1QZiTRjk6xBmhUl68dXhjLzqdcJKQMbLw78lk2m2BS5dQIkgtMAGeEsNkeJkNzXgrv5AaSUU1NRREwPvuem30u+Mkg3kkjzePB6TBYW5QePjSv6kUDHbXjVDgmlNJVf5p4WkLhe30DicAs7NgvewgLYtBNSCsDMAk8OTPXAlzsQbAd/CW8qarnlMfgNoLW28jxjLy+/wXj/AIG5n6SacfBlw1Q/TPZDzinYeBDyyniWvoEWbCYwrov6+yQzKmFgkMKOVi7ty+d0YD3qUwNM9IH4YUsx+PIIzaZR5XLzlHUyu0COKAVouDGiISqdcWpj3RB8Ad1R5qe/oyeMwbZiyL1Au9PPeQLSu3AqnwgRZRNnPjaBUwGRLuhRjKcepyFhhumux+xuq2P7nk52nazjommra0t39olNWM2hoc18hrYPTGacoebQCZqAiSPHuP/uLbnNjRwYuot5pYYkRGQpRlHDnVQ/PMfMozquSpQUGSdRwhgyjmOxbrQXMz6IayVZhNdPONx4g0oZwxQRJIwm4SXi8lDLLWkFlZqzcBjZa1txEX8AvGoXJ4Yn4tIAAAAASUVORK5CYII%3D';
        var msgC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3AIHBRYAVGxqEQAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAByUlEQVQ4jaWTv4riUBTGfy52sTEaETEJOOWWERER1MJ3mCfQwuex0CfwHRR2AoOFkHLBxkK08H9AtEhu7nWLHQNZZraZW51zP87H73zcm3o8HnznpAHG4/HAcZxXoPlx/w5MHMcZAnieNwASuud5k16vN0yNRqNfhmG0u90umUwGgNvtxuVy4Xg8AmAYBrquJ/TpdMrxeHz7AbQty0LTNGazGZ7ncTgcME2TSqUCgGmaHA4HPM9jNpuhaRqWZQG001JKpJQopeh0OvFuSqlEbds2tm3H/XMuHUURQgiUUriuSzabJZvNYppmwmCz2eD7Pr7v02q1EEIQRRFpIQRCCKSUNJvNeEhKmahLpRKlUinun3NpIQRhGKKUYj6fxwTFYjFBsNvtYoJGo0EYhn8NwjAkCAKUUtTr9S8zKBQKFAqFuA+CgDAMkwSLxSImyOfzCYPT6RQT1Gq1JMHToFqtfkmg6zq6rsf9cy4O8X9P+jMtEaIQAtd1OZ/PAORyOcrlMi8vLwCsViu2221Cjw2iKGK/37NcLrnf7wBompbI4bn/v3oURaSllG/r9fo3MBmNRu8A/X6/eb1eX9fr9eCDePiZDvxMffc7/wE/BFaShkSgLAAAAABJRU5ErkJggg%3D%3D';
        var save = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAOtJREFUeNqkk00OREAQhavFRpwCC7dwCjcQkZ6lw0xzHG5hY2llI8KOHlWT7jDjL/GSSlfa+6pKN0xKCWVZvgGAw32JIAherCgKAn3fv01WVUUFEJYI2rZNcaZ5nqFtW13AxARHRzCO40PQcRwIwxA8z9MFADs3TSOnaZJRFG3WdeBemqaUox8542zMcRwplLqu2zzXY2OoPM9zWi3L0ntKay/Byyh0GKgkSS4PDf0oAx7I/Lt9IXaNnPNr+Nd4VEzDjLHDDnsdld9cX0uWZZfvOQzDprOo65q7rgt93986qMX//baf/FUfAQYAebClEg6zbdUAAAAASUVORK5CYII%3D';
        var save_over = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABBUlEQVR42qSTPY6DMBCFn4GCM6Sj8DXoOAYlIHIVKpo1IG7ijmtQuaGnwA3g2WKFNwFCstqRLNsz883zLyMidF331fd9jg+Ncy7CMLx7GxhF0acspJQ/Qm3bklKK5nkmY8xlW5aFlFKklKK2bcnbqrmuiyRJXqoFQYA4jnG73TAMAwDAwuu6AgCapkGapmia5glO0xRlWaIoCutz7MBxDmpaa2it7Xwcx6e4VSYi29d1DSKC7/tgjNnYY56FGWMwxgAAsiy7POktzy77sdpfzNs7hBCniXmev4f3ia+KncJ7hTPFA6y1RlVVb/c5TdMvzDkXUso8iqLDPV68bXDOBfvPr/oeABDOp7HLPwD8AAAAAElFTkSuQmCC';
        var CloseAIMG = 'data:image/gif;base64,R0lGODlhDwAPAHcAACH5BAEAAAAALAAAAAAPAA8Ah0D/QED/QEZGRrKysri4uOHh4ePj4+bm5ujo6Orq6vDw8PT09Pf39/v7+////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAh1AAEAIECwoEECAgc6WMiwoQOEBBxKXEjQQYMGAy5qzNjgYUQGAwQMYEAy5EiPDhYsMLlSpEqUCmKaFBlTAcoCOAuYzFkApYGfMwf8NIDywAGTR0UaRYnAJIKnTlEmSDBgqtWqCVA2sMp1akeIExsiFHiwrMCAADs%3D';
        var CloseBIMG = 'data:image/gif;base64,R0lGODlhDwAPAHcAACH5BAEAAAAALAAAAAAPAA8Ah0D/QED/QEZGRpycnLKysuHh4ePj4+bm5ujo6Orq6vDw8PT09Pf39/v7+////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhyAAEAGECwoMEBAgcWWMiwYQGEAwo4mEixooOHERs0IKCxI8cGGCUSEECAgcmRJUNORLkApYMFIRUocICSpAOZIRnStNmQYAEDBna6BBrygNCjB1S6RHA0ZAKaDhJIhZogZIOnUrNGBQnRoVeEAg+KFRgQADs%3D';
        var MinAIMG = 'data:image/gif;base64,R0lGODlhDwAPAHcAACH5BAEAAAAALAAAAAAPAA8Ah0D/QED/QFlZWbi4uOHh4ePj4+bm5ujo6Orq6vDw8PT09Pf39/v7+////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhvAAEAGECwoMEBAgc2WMiwYQOEAxxKXEiwAYOLGDMyeBhxgYCPIEEu4NhAQciTCkgmEJCgpcuVCUgSEECgps2ZBEgWEFCgp8+dBUgaEGCgqNGhBkgeOBnyAEkEUKNKRUCSwVSpGyFObIhQ4MGvAgMCADs%3D';
        var MinBIMG = 'data:image/gif;base64,R0lGODlhDwAPAHcAACH5BAEAAAAALAAAAAAPAA8Ah0D/QED/QEZGRpycnOHh4ePj4+rq6vv7+////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhgAAEAGECwoMEBAgcSWMiwIQGEAwggmEixIoKHEQ9o3MjxAEaJAkKKFHmRIMiRI0tGRCDA4sSWH1lebCgzZssCOHHWNCnTJUyeKFPGdFnx4wEDSJMm9QjRoVOEAg9KFRgQADs%3D';
        var MaxAIMG = 'data:image/gif;base64,R0lGODlhDwAPAHcAACH5BAEAAAAALAAAAAAPAA8Ah0D/QED/QEZGRrKysri4uOHh4ePj4+bm5ujo6Orq6vDw8PT09Pf39/v7+////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhrAAEAIECwoEECAgc6WMiwoQOEBBxKXEjQQYOLGDM2eBiRgcePIBlwdLCgpMmTC0YqWMmypYKRBWLKnFlgpAEDA3LqHHBz5IEDAoIKFfBzJAIEO3UeHZmgqdOnCUY2gPp0I8SJDREKPMhVYEAAOw%3D%3D';
        var MaxBIMG = 'data:image/gif;base64,R0lGODlhDwAPAHcAACH5BAEAAAAALAAAAAAPAA8Ah0D/QED/QEZGRpycnLKysuHh4ePj4+bm5ujo6Orq6vDw8PT09Pf39/v7+////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhzAAEAGECwoMEBAgcWWMiwYQGEAwo4mEixooOHERto3MixAcYCDEKKHMng44KTKFMu+KigpcuXCj4utDiRIcECBhwQ2MmTgAMDHw84EEC0qAAHBz4i0NlzpwMEHxMIpXkgwccGCbJq1eoRosOvCAUeHCswIAA7';
        var trans = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wMEBBIvqMNOnQAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAAGklEQVQYlWN89unTfgYCgImQglFFDAwMDAwAndcDm9V2mYsAAAAASUVORK5CYII%3D';
        var updateIcon = 'data:image/png;base64,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%3D';
        var uSpeed = "data:image/gif;base64,R0lGODlhGgAQAPcAAAAAAAICAgQEBAYGBgkJCQ0NDRAQEBISEhYWFhkZGR0dHR8fHyIiIiQkJCYmJigoKCsrKy4uLjMzMzU1NTc3Nzg4OD4+PkFBQUdHR0tLS01NTU9PT1JSUldXV1lZWV5eXmJiYmVlZWdnZ2hoaHFxcXNzc3R0dHd3d3l5eYGBgYKCgoSEhIaGhomJiYqKioyMjI2NjY+Pj5CQkJGRkZWVlZqampubm5ycnKGhoaampqioqKurq6+vr7Ozs7S0tLW1tbi4uLm5ub6+vr+/v8PDw8fHx8nJycrKyszMzM7Ozs/Pz9HR0dLS0tfX193d3d7e3uDg4OHh4eLi4uPj4+Tk5Ofn5+jo6Onp6erq6uzs7O/v7/Dw8PLy8vPz8/T09PX19fb29vj4+Pn5+fv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAaABAAAAj/AP8J/FcFQwMcZwYqXMhw4AkAAApoGYhFCJGGGGFAhGCFyQ0QCgQMiPEE48IuKToQEWFAQAAKJSwI0ADE5EIzQSASaAHm3xUXABoMaYhCBpmBYiQkgFGgAIswAn0YAPCizMIIAEI4EcgDgI1/RS4AyLBEIBMMHo4qrOIBwIIjWhgw+CIwjIoCCXII9NKTIRkaBwpYAKBjIBgkGyCSmGLzn5IHACJ4+RdlhswADigIaFCk8ZQVSf5ZURBxxI8rXGg0nbGlsUAxLAQcqKHQSIQAGqS4FtgDsgjGAqmYAKCAx5jdUj4EhaJwxwEBJrjsNgNjQlmFTDgAqJBl9z/pDMOkBEDQJCAAOw==";
        var xR = 'data:image/png;base64,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%3D%3D';
        var xM = 'data:image/png;base64,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%3D%3D';
        var xA = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3AMUAgYAZC2/BAAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAANlElEQVRYhaWYeYxd1X3HP+fc++7bZ968N/uMZ7E9w9h4wTsYsFkCAZMSA8EpWAFMClEgpSVtIG2JakVKaIgEagOEsEShUglLGyNcMAYSMMEbxtjGGx6PZ/Fsb5b33sy8edtdzukfA2ZpFTnqT7rS1ZXu+X70++n8zvd3hNaaPyM2ZIssz04kfyCmD+MUenCLUwjlAAItTfyhKkLhCorB1cTilT8P+tgPvHC2AuIsgFodeDw13HeVPfo6wfxbBP02plWGNCN4shKkNbOYyiPccXQphW2PUPCqKJV9k2D9jSTi5iYJv/l/Abnw1tT44OXZ3mdIiA8xwnUYoXlgVYGQCGmA8j77QUq0Aq08hLJx8j3I6aMU7Skyob8i1rKeeNS8GfjtnwvUWijx0Fjfzm/Esg8RiMxBRM9Fy3KE8BB4SKmRAvj00QoUoMDxNFqDxkRrDU6S0vg+0oUYwbn3k6hv3eaDdWcLtCabc3fkup8g4u7EqlgJgUaE8DCkh5SgFExkXbJ5k1TGwVMaNBiGoLrCIhryKI9+BucpAQrsyUPk0x9RrP0n6mavfdnv47o/CaTgknzOeXui8zFi8hC+qkuQRgiBjWmAbXt09Ws+HpCkMgqEBDRSCjSSUskhNZXFl89QX22yZGk985p9aM/B8QTgwyt0UUruIFt5Pw0dV77sN78I9QWggk2m+8jLsSaex6pdhzR8GFIhhUfPkGbvEcgWJD4TDAmgAY3nQTY7ycneAaY+eoXFTpr2FTEG9TmIc65h/ZoQFRGF4woUPnTpNLnBV8nV/Jim+ZduMz9XPvnpi6PYPnb6g1gTz+GvvhRpWDMwUrH3sOLN96HoSAIW+MxPYcB2FcnRFMPJIZZ1hFh76VJ2ZIo89UYfHbUnOb7vQ156VzAwCqbhInEwAs0E4ysw+x9gfLj3auCmL2RIQcPISG5A9t5JWbwds6wDAxdpKHYetDnWZ+L3SQzjs9QqpSmVHIaGRxkf6eG+by/FcwvEamYxkspy36a/4eKKAH2N5zN31VUEAlEuW+LSXKMo2BKt/NijWxjLJWi86AnKgogzGXIcBnLJVwhaYEbbZ3aRCYe74FjvF2GU0niepli0OdXdTSE7zD0b5xGMxaicuwAzFqd9yUKu+PpatoyASrQRDPgJ+iV/OGAxntFIpcCzseLnE3F2k+regoLbPwXyj6cKRAv/RTC+FGFIpPQYGXfYfQQs64swICgWS5zs6SFk2dx+XRuJWU34Y4mZLa4V08kh0m6CYmwhfstPsVjEUw4+U7HnZBSkQoocwkigg4twep4kV+QZANNV/CI7tJ1Gn42yapGuC0Jz4ITGZ4J5pkwzvWVicpKunj7OmRVh3Zo6KhubkYEg2lMIQ5JNp0j39bDhqgWcv6SNziFFIZvkVE+JgD+Izx+lMhxiRVsI25OU1S0jdfgJxk8fItq++C/NXJ47AvZejLLZCGEhdIHUhKJ/zMA/cyLgeaC1JpVO09vTx2Xn17B8QTVl1TUIy49WCq0hO5Yi3d+L0mAGLBYuamDligB2yaZ3YIrk6DAHj/ey72CE+S1tSAFSFZAyTP/Rl2luX7xMdPZM6kRyPeGaa8Gqwi9t3v7IoHdYYBr6k1LB8EiS5FCS669oor21nGBFJUYgAHomc6mBJJnkAD5LEiqvIhSOIKSB1hpDCqQhMA2JlAa2ozDtXjI9b1CcyOA5JdJZWPztDzGLuSksYaONGBIPVwkyWYEUGq01tu3QNzBEYTrNpg0LqY0bhKvrQIgzMOmhMVLDAwSCFuWV1fisMIiZ7i2EQGnwHIXjKMAF4WM6q5hO9qNlEImgzMwwmkwj3UInwoiAlAgB2QJMTUsQgkKhSNepbkw9xb13LKG+0pyBQYCeKWN6KMV4fy/BcIhn99VhBeIMDY1RLBbwPJfJyUmmcoIbHwmx6ekqHMowDIOA30YYINCIQBUPH97I6PAA0vDG8DRoJUArbBtKjiKXL9B5qpfGGj93b1xMIBghWFmHnmkXaKUY6zvN+GAPkYogiZo63vhggife8VNdU43rCApFj4KOcd+Lfo4l89TVxHn07UqmSiGKhSLCn0D4K9gy/i2OpJrwJXdjegqQFgqTmTNSM50rMTTUzUUrKrlk5TnkJgaJVdbMdFJmMjPW001mdIxIRRnllfWASTJVYtu+PG8fClF0A2RLLpaQ9E+UmJ62eX77ETZctZDN26rIZtcRCV2DIWHVeW1EP3qVQHkeEyQajUShvSz5osfO94/R4OskkmvnmZ9t44Zbb0AICQYoVzPW10d+eoqyeDnRRB1gzKwhoHNwEssMgNBo18H1NFlbIAClNb976yiVFWHmza3Bam2mc8xPz/aDaKWxCwrT5wNySfJ9TyNRWOM2t/uOUd8R49Tu4xzaneb9Qx/z8FP/QllVNSPdXRQmJwlEQ0QTdQhhgBBIKdFaoJQiPTqA5xZYv9pkTmOAf30pB5FGZKGff7wpQincwIPPdWINRtHxZmZNFihXmqKswsw486nHREgfWoARlQRiQQpTLvOWxpm7sI6fP3GEybFJpifzuMUsoWiUcKJqBgaJpxyGTp2iUJRc1Liff75nipKvmbse6qQ1XsONF3hs3zPCPyzfzabVC/A3+Gmtrebe1wxK0sBTCs/zUIn5SF8gjDYjeE6JUslBWoJQIoQ9WWLscBIr4LJpVTn9p5OETIeyWIxIZRVCmJ/0KI+ju97jtYcfpFDMcOvaFN/9SQ9PvnCCJ78fYP1Kh93HFIuDH/C1NSFO7j/KyXdfZ+NFk8yuD+HzPJRW2NqjtqYaWVEeJp2vAu0gECitKWtNIKTANCWFvnGynsvVt/6Enz6+FW0EiccqCFomls/A81zS4yc4b3kZInuKod37uWNVEb9wefTFDF+9cy8NkUkeeeAChk+lGe2bIFLZgChNUDXayYaG00R0kZJToq42jpiatvU7//0Uyyt+g6ctPGHgKdi5pZeoO4nPp/n1fj/H7CYiwSA+leXuO6+kmC9xbkcLhs/i+GnNlcth5V09tMk9/PI7gtYV5+AE53LwpE1ztSBq92JP9HN89yAdl1/AnsFWtry/hL+/zsdNjyexc+Mcf/H7D5nRsO8xf82qu6cm/oNgQIE2CVqC8iXn8tjvSgymi9TXVrFh+XmEgn76+od45oWDHDt6gmuuWs0tt97K8lWzODQwjGF00z3i8u77aRrby8kP9FObymOnoHNwivZVjSxY04QUWS5e2MSaC01+8Eg/npbYhUmAUyawr7W5gb7kKjqsXbiGxs7brGgp8sONrewbWYgViFIeDWMYklAoQk1VJd/9zu2sWL6ITGaKd/7wRwYGh3GLWZxAB2/s3cplF05wcP8oq69o4We/7ubQoTQbu3KsvbiGRLNk+7Z/59+2hThdXEb9wg5Of/AxwH9K4NlZ9dUUAmuYLICensazFdNZlxr/CItbFdHyWoQwSaXShEJ+rr/uGs5bPJ8jR7rYuvV1JsYHuHD1MqoDWcrKIhxINXCwq8gPnx2ip3uKa69sYI++gbvevJgXtw1xaH+Bb71yG/tLN5NobiLd18mschsgbWzevBnTFL2+YMX6ro9PUGn0YHsBtDYRXo4yhsl6IYYmDJYvW8jCc9uYzhV4553ddHadIBGPc8VXL6e1qYH6mmo6+1KkCwZxxrji2gt48+QcFiUmKcaXkDE62HpAsu7SHPds+Aq/3/EhdbOb6d3zGju2PH5/rLxs55mpw3HRe/btZ2rvfcytyuB6M/7fEC5KKdy6mxBNf0FXZy+HD3+E9hwWzGth0XlLEVrzy189w9FjXfhirRhVi9jzxm9ZGDtOMdjMWCZAW9VpPvSuZ2g4zcqGXqbdFny18ympEuvmhSce+NvbFlRUVAx+fgxakyu6O/bt2Er41I+IRiVK+vFcjVt00Hhoq47OfBMZPZuOBatoaJ7NyeOdPPr0M4StMJdevJzyimr2Hu6nb7TEe+/tIuv4IFiD8JeBL4Jp1WKVRohHJ4jX17K6QY3/9Ed/3RINh3L/ay4Dzk9PFXe/t/0l5Klf0FI1jadDCGNm8sQQCE/jahMVmUO2GOSVtz+mdU4tjbNq8SsbnU+TCEyztaudAyOVfLDrj6QLAqwwhhEC4dFYmyDSdg5fW1TJj7/3zVWGlO9/YQz6UryayuTW7d31DoUTT9EeOY7wV6CFH40CLRF4oIoo20HhwxAOWmmKRYXyFEIYM7aibykfjcbZ+e5b5KZzKGnROqeN+PwVrG2P8tDf3fJ1KeUrnxc3Nm/e/GWg50JB6+PahqZvjOs5nBzSmBOHsXQOw7TQCFxX4boS2zNRLtiugetIwAemD6SJ1g7nJlIUdDm2fxZjyT4sv0m4bRHXrZjlPnjvLeullFu/LG5++cMn8UI0HBhYe9EF7/W1tLDr9+fSdfoVWvzHCFkay5IoGTrjGiWgjRnjhlafWBmbfDbDsrIShbbLOHYwjDAtvveVtvTNN1w9Twgx+n8Jn82F1XtF272wu3eAQweOMDX4AcbUhzSJowSkjWGaOK7GAdAC5dlk8nHGzRYi9RdQPns1SxbPo76mCssn7wSe+lNiZwMEUA9c7ip+NZXNBZNjGUZGUiSTSRDOmSsi21aEI1Hq62qoqUmQiJVTFgmUgNuA589G6H8AxQ+FgCDNay4AAAAASUVORK5CYII%3D';
        var Setting = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACK1JREFUeNqsVwtQVOcVPnvv7rIg4b0IiCCIyvKoCtSmUbFqrXHU6sZHaMdBbWo6mWkTjaEq+EzAIRaTMSapnThl8rBRUTCdxrRNwmNRpKCTovJeQYF9L7vs7t33q+e/uZusiMi0vTNndvfe//7fd17f+ZcHU7y2bd8RmZiQeEIkEhUnJCSIkmckwbRp04CmaZDfuwc9Pb2yk394cyUu9R19vWIvRVG7vV5vklgsBo1GAzwePvB6a+0OxwFc14/r/GRf3hSw6QNlh/4oEAh2STdugPm5OcCjKFAoldDa+i/8VEFfX1/je6dP7cC1hvLjb/YlJSQmLFu+FMRxceD3+xGcB06nE/r778HX9Q2gUAxnnnn/vT5Cgv8k8H0Hymry8/IQez0LbGWsUN/YBLLmZujq7KxkGMtws6ypBde636io7Js3d25CYeES6Lh9F65fbwWMBGvx0+MhNzsLkpOT4IOzf+7B9SI052QE6P2lB2vyC/Kkm6QbYXTUAAajERoQvLe3V/9W1YktuEaHZkZj9pbsf35GYhKCL0aCMvB6PIBRA7PZTDyGru4uaKivZ4NO0xTZP2wyAiTs6Hk+gm+AB0MjYLVZoalJBnK5XIHgW3HNEAk5mgtNGBERcZSEveN2JwtOUTRbHyaTCV4/emQNiVDQ/sbAF2pi8MM1PywokG56bgPcfzCEm4wBhXmMjY0BxmL5hgPXoNnQPGghmOvp8XFiUKvVbM4pigd8Pp8tPrwG0e4EGfltJQ/GR4B/8PCx2vy8hetJzgcG72MIGXC5nODxemHr5k1AU9S6iMhIqDpRKQ16T0CKzWyxAEEkBIj3QqEg2GPtRKEeH4FQHo/iwAcR3ITV6wCnwwl6/SgW3nXY9JyUbL6OrA1+kRDg03y2rb4F57M18KRGo8YVXXV+3gJQqtQwNmYGu8MFDocD7IQEtpFGq4Ov6htZMK6Kv7u8HpdqcHAA4rHvBQI+kkDj0+D3+SYlQOjxy49XXhGL49empsyEjNnpbN7Dw8MR2AkuNAcSIWlAYYGBgUHAZINSoag7dKiMdIIXLXb3nr11RUVFS6Ojo6FfLmfzLwoJATWKUHt7O9uKLCBbHxRUHi8PIQXM58K+9sVf72QX1Dc0wSCGnxRP6qw0BHaBx+1inw0NDYNIJGTTMGbQSZ+ifed3lx7a9kbpgTOr1q5fOm9uBvwb+59ECBWTJZGeng5ZEgn7WyCgQaVUw+W6ugGuDVkCQovF1FRzqXaZBBeGhorYwFgsDPZ7H+h0GvY32TQyIgIWzJ8Pt9rbICsnGz4OX7Y55sjnUs8coPN/kAVtHZ1gt9vQ7Kz3MVFR7HtsgaIedPf0QHd3N+rB13uDU/AUWtrekn2nM+dJCmfPSQc3ei2XD0BvT3d9W1vrJQFfwMMo+NNSZm7ZuGHD8qi46fDqN27Ys3YltKkYaB9SQYpbBa9m+GBIo4fm6y2KyMjIGKyU0GlhYeiMhQXDom754E9n9uHXB1wbu3hcK0ahpSCJt2fPzihMTk6Gjo4OOFS2/2m8r+dEhJR0zNbNm4/1Ltq15rfPLoO7OjuoGQe4/RTcvDcI62g5+O42as+cPftLrjYoHFzhqA1WTi9MHHBAwPw0mV5EEsmNGy3XWyVZObkYrpmMxdRy7VpzNd5XBeQ2dEVxjHXFS1UlaxbDba0dVBY7uH1+8KBFhEeBbNgAjW+X/AzX3kdTEvIMwyg5DdBw0m0KVsXgJiVkotGS0CI48SCKR+LHi3np3dnp2Xn9Fet/DFflRlBaHCywG/10+3mgwDkR5jXBJv2Xn+07fKQI33EEYfgfO3CCtYQLC8OBkzDZyf2Y37yThuDy8vXPsOAqxo7gwIJ7EFyJ4F79AHy1LRskknmZs+LFmX+vb6idDHiiCEwoVLH7zhcvypxb/fLyhfDFOHAvgqtxTngMD+BUngBong9+lL8Adv61D9r1PjCZzVd0x9Zt4fIPU5Hih57FlJzbvnx+TnXZswvhar+BzXkwuM5shGGtEiS3qv9p0KlBgAKz8cN2GKMi4C/bl8KyeWkb4w7WXRwX6cem4CHw6NfOFa9YOL9694psuHDXwFa71/89uN5sAKV6BIwflhXdbv7yaphQMOtvguw0QXwa/H5VDvxDboFfLEgGtdUr0UlW5dpkFy5NlJKJUsCPLqu7+GJhgXRtbjJc7BxFcOcE4MNgvFD5vO1O002u4BLnvnPj5ic7noa3GrVgRS2ZFRUGW7Nj4FRDJzR29dfpy6UB6X5sBOjo0tqaPasXS3+amQgXu0ZB8zjwTyu22O42t+E76kCn8HJWFFzptaZ6qXAghx6H2wMjFg/8alEqaDAS2gkiQT/keWntJQJemBEPNei5xjoxuLOrpcJU/8nnHLiT0xK/raX2RmjukmwPX5gaIopk42t3TU4iQIAWl9We3fWTRUUr0fNHwbEvGQsoVA/A2XntuP7T8o84gXIEeUNIuJkbn7WG5CyRuGlhqjD0ySQCBKbFrnnhYunqBVhwweB+1nMGDyQjygFw3JFV6M8f/5gDt48rqu8UdTISLyAJrc0n0WevzrM2na8JtKFojjgKH+DOmPNvW+178Psj/eA2qGUIfo6TWCsHOP7yBhRUdXLnHkbRI9Nqh8GKwmtFJRg2OeBytxFKVmXhHwIBe6oKEKDUFhtQOJYIOLFgcM+oSqaq2v4Kl/PHgU9KwoYkbEhCybjgldpbwGOMTWTABVIQxiv4+ZasmXFRGjsfnLiFGY/hQ4p7qHKqZtXJHXtwzTA3lLxT+DflfyQd/JBUUVg0shqCEXmnTFNV/DI+Hw3oACYKMhLKLtfyRGEpeKJmj05e7fAXqlO7DnJDyThFcJhgwKUkvvbRaaE4+RmXbqRFVVX8O27PsQABMutj0WZwk5DiRqaRK7ixyfR8iiQCU9bM1RHrULASCrhzmpBTSB/XZvb/wvNH1JU7xgs4x+z/g0P/3+s/AgwAdGqB/H5XELMAAAAASUVORK5CYII=';
        var bIMG = 'data:image/gif;base64,R0lGODlhCgAQALMIACQQB3d0lM+EGH8zDtXT5MC/0kxMV4+Mr////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAgALAAAAAAKABAAAAQxEMmJxKDTAlzHxhrXGSJSBKR4ptSBHEbREkY9F/B97OlB4LucD8iT/II5CdI2qTEpEQA7';
        var refr = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAuJJREFUeNqkU8lPE1EY/6ad6dAOSwttLcUolIrAASPVWEncIulBjVESl+jZg4l/ggdvnkz06EU8FA9iNMaIYvRgmhASUw2NQJQuLBZZOixtp515s/k9iojRxIOT/ObNm2/9fQtjmib8z8PS14n+pft4hP4ijyNuIzhEEYOJhq4TTdNAU9VfDnRdj4Fphi5F/CFFqWTEsgw8eTcP54837hbXiSebk8nsQlkydJhA8fefESz0hd6i6HV4YGg2ziAlqaCCIutAI6nEYATO6gv6HLvPHPZ02lgzgsECvzlQFcUPhtZzOuwN5ZYkqKoCIIqKxgQG32YKo+OL1VJZCa6KcmvkgHs/A/pF0zCcSGczA0L6mr18ML9SwtRNePRyKm5D1pqiACrF57Lrb17FZsqySgLikhTc5ea70OaIjnXYqAFRlJ6GaraeRk1kxBTeRx8+m6jkiE4sFuYjMvMlpnLdHf7ane4aVkGdYyh9UaEgy21WC+PQTANSmeU1XdNuYPS7iHi5WITC6hrNciidWeZRpwl1A2hzELGVgVTWjLyqmRvfRgmpcFwU+xFFCrTFMSmfj1pZVpA0s5YDg+oJW20ksvxhuSDX6gzLe9yCkp3LncLIQxzPw+Z8UIR9vjqnKBtgBbWENl+3d+H97DdxUgQu7WppwlqRozg03TJmgjI42dcTwjPs7mxtRR2Yy4oreB+hsooDQmLTX2YSVU4hmbUK6UBv2F6zwxXBWoQwVUiVGNh3oTeULFvAEOyQHJ9Oos1TOo0bDpDnmlwsPY4PDn9y1NlT83xd0jwULjZePleDxYN1Kw9jBSu46h0wFn0eJ5JEo88XX9+q1KAwcAUs3va0svds+fODUqezLSBAS7NN8ftMOkwGDoXdYsKCAdBx/Wooca+fmk1qixNRhm4jwzD0B62qh7G7GsDTLkC1n2NI3gBv1zVo2NP2x5qJU5PGyJ2b2x3YEA6EHcH8Y4vpxmm0fD8EGADFhK0+biwMlwAAAABJRU5ErkJggg%3D%3D';
        var PN = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wgdChYDrijjdAAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAACU0lEQVQ4jZ2SsU8TARTGf3ft9XrXEgoBi6IWBasxRCcTFWKCMQwmGkcTHfwD/BccTBiYSGR2McbowoKbkYWBGAOBhGpIBKGlyF1p6bX0ene9a88BKGIZjN/08vLe73358gRfG/f5Ty3MTRE8LApmEoCwEABAz5WZ+bpDXWzw6G4/bWERgIAiAzA01A+wDwA4c64LJRSiZjnUXRE9V2Y4qTDxZol0psirl6OEFBmrViNQPzItHhbp1QJW2SXc3olu1PG0Mk9G+nl2q5eZ+Szvp1PsGjax7ihypLl25ODj53VU+ScBSUXTitxLSGyvFejpbqPhVJidzdAIhnn84BJWvsTFvp7jgKWVIooqYVUNMls5rrafB2B500CUo+imxeKiRn6rhFmxeTt85TgAwKq6JOIKiXiC17ObZNIGyxkTOejx96GWDBRVIhFXANguugDcud3H5PMbPBzsoVBy6FQFng6dYiB2BGg68C2Ts70x1rImWnaXd2Oj3Lw/CHsWI990ym4A3TARk1GuX4i2Ai53RGkTRAzbpSsWAqBmRankHbIl6yCPCrm8w6Nr3a2A0zEFPFgr2EQkgReTX+j78J0Ns0YqaxBXJNqDAoWqy/yPUiugKgqs5vfwBDBdn5Vdm1TRxvEgEgAJAftg1hVPyOBTaps9T0SVZIqWA4AcBFkQ8RqQrXgExf0P/GXWWgG65TLYESaiSHTGO9jcsUmly9j1AILoHh/+Q82eKskYdgNwGRsZIJmIMDW3zsT0BhDCxUev1HH8BlSrTYDga+P+wtzUCex/02+Ma/vfRtDi1QAAAABJRU5ErkJggg==';
        var send_image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAYAAAB24g05AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wsIFjoO3PNzDgAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAABRklEQVQokY2RO0sDURBGz727N2vvnxBS2Nj56AVfiIra2FspKVIaEYvFWkFQECslhW8NsRDF0iaF4J/Q2mzunbFxY1R8fNUwcM4MM0bUa6U6gaoC4MUhIviW5+U1EEJARGiFmBACqkq1VMcQGQC7Ux+hMn2MtRYAS5PIZACoKqqKF9euq6U627Vh8tiuRNi9HmVl6qjdzLfJN+qENy/GcM59CFwcSAqBvZsJVmdOAFifv2Bj4RQRaQsPl2tsXY6TOKEQ+w+BNU3iyOOiFvu3k6zNnpGlRbK0yN5iDVXlYOmK7dowkc34GnNw368+ODBdzA+ek6VFbG830nimUH78BrTB9yPGQQoYA3MdcJ4sLf4oABQgNsYwO1D/BnfWv8WIej17GGK07+6TRBrP/xN0vgygmfZofoOk/GT+EtivjaT8ZP47HeANRVCkIU1WB7kAAAAASUVORK5CYII%3D';
        var send_imgdel1 = 'data:image/gif;base64,R0lGODlhEAAQAPcAAAAAAJoIBZQ2LZ8xKZw+NqMDAa0NCaEVDqkfGbwFArsKB7oPCrIVC7IUDbgSDrcYEqslGq8iHb8kFrgkHKYvJKc1LLU+Lb4/MLBFM5hKQZVWT55gWaRMQqpZSaNjWrpgUqxyZqlyaqV9d8IHBcwEA80GBM8KBcMVDc8bD8YbEdQOD9MSCdURD9YREdUSEdYYEtQeFNkWE9oYEtgeFdkfFtwcFMElGtAjFd0gFt4jF90mFd4rHcIyIOAjF+ElGOEnGeIoGeIpGuIrG+AtG+MvG+QpGuQrGuUsGuYvGuYuG+MwHOcwGuc0HugxHOgyHek1Huo2H+w5H+Q1Iuk7I+w4IO46Ie89IfA/IshHKc9LK8JJOsVNO8tONsxIMdJCKeBHJelFJO1BI+9FJO5JMfBAIvFBI/FCI/NEJPFFJvRHJfdNJ/hNKPpSKfpTK8JcTclcRsxcSM1pVsN9dtB+cK6Jg7aQiM+ZktSViNWjmcOrp8S2s8W9u8i4tNanodqxqNqxqtqxrOC+udPFw9nS0NjT0t/c2+TKxebQyujSzuPd2+Pe3enV0O3e2+vj4ezl4+ro5+7o5+zr6+/t7fHk4fDs6/bt6vTt7PXu7fPy8fXy8fX19Pf29/n08vr29fr6+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAjcAP8JHEjw3585dw4J9AMnDh5OBPucmNImyyVLXcagEfNmksBAC1asYYMFEiULUq6UMcNlEaIHJs6o+VJHIB8KOqpYueJlAokoacCA2DRwEAEUUKhUWYKETJgOkgo+2sBAyZOkVTAoKigwk4AAQ5o4YfKBq0A5BQwEMXIkCRE3lQraSTACR48bKYAUEaKF0UBACkjIqAHDg4YGOXz8uCDQkI0SLGK84CAJk4gDM3BIaNRpyw4WLVxUSDRQTwYIIf454kFDhYoIggpqKiTQE50BDhDkMVsw0h5CvAcGBAA7';
        var send_imgdel = 'data:image/gif;base64,R0lGODlhLQAUAPcAAAAAAHHQAJoIBZQ2LZ8xKZw+NqMDAa0NCaEVDqkfGbwFArsKB7oPCrIVC7IUDbgSDrcYEqslGq8iHb8kFrgkHKYvJKc1LLU+Lb4/MLBFM5hKQZVWT55gWaRMQqpZSaNjWrpgUqxyZqlyaqV9d8IHBcwEA80GBM8KBcMVDc8bD8YbEdQOD9MSCdURD9YREdUSEdYYEtQeFNkWE9oYEtgeFdkfFtwcFMElGtAjFd0gFt4jF90mFd4rHcIyIOAjF+ElGOEnGeIoGeIpGuIrG+AtG+MvG+QpGuQrGuUsGuYvGuYuG+MwHOcwGuc0HugxHOgyHek1Huo2H+w5H+Q1Iuk7I+w4IO46Ie89IfA/IshHKc9LK8JJOsVNO8tONsxIMdJCKeBHJelFJO1BI+9FJO5JMfBAIvFBI/FCI/NEJPFFJvRHJfdNJ/hNKPpSKfpTK8JcTclcRsxcSM1pVsN9dtB+cK6Jg7aQiM+ZktSViNWjmcOrp8S2s8i4tNanodqxqNqxqtqxrOC+ucrKyszMzM/Pz9PFw9LS0tnS0NjY2Nra2tzc3OTKxebQyujSzuPd2+Pe3enV0ODg4OLi4uTk5OXm5Obm5ufn5+ro5+jo6Onp6evr6+zs7O7t7e7v7e/v7/Hk4fHx8fPy8fPz8/T09PX19fb29vf29/n08vj4+Pn5+fr6+vz8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAtABQAAAj/AP8J/BegoMGDCBMqXBhg4MCCriJKnEixosWLrgo+xMhx4h86eBh1jMiqIcGRrvzEkZPn1MQ+KKi40YLSVMMArXLq3LnTC5k0Y+B8yhmIAQs2bbLwXNqKVSlOBZuymkq16tQLU7CYOdMFUiMIJ9CsAWPHqtmppCwVZLWqrdu3bvlU2GHlCpYvFEpIURMmhCm4gNuOmlSwrarDiBMjPlQgRZQqVpgkKSPGAyfFmBGDklRQVSpUoEOLFn2JQ4MlUB5byfBotGvRniIV/Gyqtu3buE0NEEDEyZMmIHILtx27IKpSpJIrX858joEDQo4gUVLkDfPryzfJDmBqlKjv4MOH2r+jgEQOHzhUBDEyZIv49+A1KSpIShSo+/jz4we0oMQMGzF8sIEDOvwABAb6JXhfJokUNAoonkQo4YQRLnKDCS3IAEMHnIQyAgI05DABhSRGiAkiBYHSySYstugii1zw0IILL1jgSIt7aBCBCC/2uIkmkxhSECeaZGLkkUga2UMNK6wgQSFJRimlkZMgIiRBmFRCSSVcdullHQQ8kIAeXnaJZJldUhJJIoSYFEAkisQp55x01mnnnVYOMohJBAVgCCF6Biqonn8OauihegoiiEYO9cnQo5Ai5FBAADs=';
        var send_imgpro = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAntJREFUSEuVlU1ME1EQx1dOHD169OjRo0eP3rTGLV5Mjdui3lCaQEy01bAtfiDRlIgEwbYkxBAwVVGCgZqI8WsNcjBNlYMJoYRaWNq1ZVtWVv6bvGa7fbv7mOSlzb7Z/29m3szbA5yLtQnR43DZbeGMXztr2eXeYa9VUz/F4zdVN92G/ZO+0MGuWyNjiYm5yvLvnIyluxjxm3z1Yfua+HSa9905xAQ9I0ROTL5YyGvav5obxGn/9ZxUuHClP+AI7RZHn6ys5l2zYQ2kIJe2eu6Pp6jQQOeDc+t5eZNVjNWvXFH/Xu4aCDdAUe+Xs1/W7ERyuZwuSZKezWapLtjDsrOPUmbjdLt4pA4N3x2b0TSNemapVEoXBMEQFEVRDwaDTboej0dHUE52e2Bi0QD6fKFWdJadM8TMZhUnwbiVeGZeUtH9HObMqe2tQGRJyheLxXQsFgPDmGneHz1fLJUVpwwJQFEUnQSAZ7Ty2umo1Zrq9Uc69oCRS3udVHaKEsJYKB8axwzGe25NA58dTdvhBbGbw6Dvd/aQJcBoFPxPp9N6MpmsZ08Lfm1d3vK2i6c4jMT8+++OGZoFkCnEYcjY3J14TvasUDDq113f4FSG5eDJiBBfa0OR0aFpDSXe/KnPIe/vOfpt6VfBCQoxKwDZmLvUmjHRw5Hh6Bpum6uh4XuVbZXarTgvwGjlAhAgLFTAavgI3OhNTDXdp7gA+oeeL1WrNdtLgKXsZh/A4s/eZoyBpxmgndcfP8z8XJH3K271RxmRmS3MHIDX33vs0ej06sLnHwramRW+sVkqfl3MFkfGZ4tNZ8byNW67GD2M2eED0TDL8gbEsw1fBQrkP6+jTExmIuLUAAAAAElFTkSuQmCC';
        var send_imgequ = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAflJREFUSEtjZCAAwpPbHUBK/jExgGlcgOkfwwGQHMefHycWLmz8QchcFHn/+HqB8qZ5Sxat3vvtzoNn70H4PwEAU7d2y9HvVa0LtobGd0kQZWlIcpvH2k1HXv358/cXIUvwyW/be+ZNUmF/Kl5LK1rnz3389BVB3xDrkDfvP31o6Vu+EaulqcUTY1++ev+OWMOIVff1248vmeVTG1AsBYX35l2nnhNrCKnqjp+5/jYorVUDbmlD95Idf/78oSjOCDmic+rq82AL4+PrOUApi5AGSuV37DvzA5T6GUD5jJhkP2XKlP9nzpzBijdu3Pj/5s2beN0EsgOcp0NT2hM+fvr6mZAPAgMD/9vY2ODEIMfgAz9+/voRltJWALSwLQOYkr4SsvDzZ4JuwmvE7z9/focmt1YwgDI6MXmP0iB9/vL9h7C01gAGUJbYd/gCQR9SGqQgO+DFXe+MdddpHaSzFm1/Dc+HoSktBmcv3n5DyFJy5UFRBoo6lNKmqH5Oz7fvPyhLGVhcBKoE6joWrcMoT0EFQP+s9Rd//vxFtUIAZNnClbuvgzM8NgCytLh25qTrtx5TXGOAghHkM5yWITsgLKXDYvr8rU+PnLz6GZSciY27t+8+fTx9/ubHect3fcSIM2Jq4/D0dgVQ3glNbW8gBoeltkag1ApYLAEAIKtp4+xd+jMAAAAASUVORK5CYII=';
        var send_imghour = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAA8FJREFUSEudlUtsG2UQx01PPXLkyJEjR46coPQCQjjlgoJIUtITLRWkQoIEVCflWYFUAVEfJKpUoZICgUBUlAqJIkobmkdBVuq68Wu9tnfX6/V6n971n5kPOfL60USMtLI8+3l+8/jP54diu9ihkZkn+UhrX0x8DrJ9rdiv/G5/4N6Ym3vX3S1u5P2zw5MPT7x3/uL85RX7Xqao84NdrH1u4cffnbcSXy3Fhz94ZE/QF0amDywsXq8EQeh3Mnzfh240IFd05IsaspKKgqyhrNbQsBy0WmEkpZ9WVtVXjp0eeyD0ROLCubxEETssDANUdR3ZfAkFqYJyWYWqaNAUFUpFRVGuIEPvJPq0bTsCVfV67eQnl77vCx07/ulL5Ype7fxFMwgooILtrARN0+HZFkLXRmA16DHFZ+jY5Lchl1SktyXqghmBWrbbODJxZioC5X7/cPWm3Hmy1QIUzaDsZXiOg3q9TnAZDaOGgMBNhhLMNk2Uya8pClRKKp2lM9TiTvtjNak9fzjx2A506sOLy0EQRGbmek1kCxXU9BpavicC5wsScvkCfAK2PBeuZWErlcbt9Q1oqgoaJM1XodmqCDnjDnv/zOU1ARwentzPyuoWoWE6YjauWUeTAFyN2yDRyGWRhGs7oqJCsQSTkmmLpkotvU9V+n4zEnL52qrL6o/xnvWTvW5YAugxkNonoK6DkKrNFSvYTKZQNxs9y1IzLaQzNIYuIDPETsdHZ1426qSALmvYHrZzJZqZge8WvgE1A/dTdxE2faFGnapkXzabjfyypFSRKZRBaxXxu57vDo1OHyXg9DgpyeoGBmEIqVTFa0ePIXnnjgi+nb6HkJTLs2LrBtqOR6Ipgtahp3JSfDM+kjgR40Xv3r32advxhXBk2r3/gmcigdi3uLiI8fFxPHPwIJaWVyhJDZxst8llvTZ0OPFcjFfi2m/rPRXuQF1f3CgcfH3zb9iOC78ZUMsC4XvjzQlKSMPsuTk89fSBnla24zBj57r7+IsryZ6UOhycMQe/dXtTyD5HN05OUoTvxs01VOh629pKie+DbHb+Z2VnD+OjJx//ayNFizTY+gmk08fiGQTkkfHoIrfN65NnP6J29ai1ncL/BfKfwDun5q/03Kd8AZye/XbD8/zIJcCg7qe9CrtVyLC5r39JioXvZww9/vaXnyXv5vUHtXcv77iNXNlAWGcCQ6Onnvj8wpJ0/c9/TJbzXgB8RqvWjVtrW8b5S1eNnpn1LbHLeejVmUd5d+JjM1N7eYbGEi9G/hX6QP4F7nAoMfND3esAAAAASUVORK5CYII=';
        var send_imgall = 'data:;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKvSURBVHjaYmQgAMKT2x1A9D8mBgd86pj+MRwA0Rx/fpxYuLDxBy51jNgE/ePrBTSU5adoa8oHWZlq/gSJKctLCuCz8O7D5x9A9MUr9znOXry97/atV8mrF5a9IOQhhpDkNo+1m468+vPn76//FIBte8+8SSrsT8VrWUXr/LmPn756/59K4M37Tx9a+pZvxGpZavHE2Jev3r/7T2Xw9duPL5nlUxtQLAuN75LYvOvU8/80AsfPXH8blNaqAU5cIEJbR2qBp5ORML7gPnDgAENjYyOKmKOjI1gchEFsXMDCWEPIXF9tOdjC+Ph6Dl1NRXtmZmZWfBZOnDiRoaGhgeHChQsM5AB9TUVNUOpn+sHCYaGvo/gDn+IPHz6AfdHf38+wcOFCsixUUZL6zsHCYcD0j5FBQVSInwWf4g0bNjAEBASAMYhNDpCRFOH8z/jfABiH/zlYWJiZ8CneuHEjg7+/P4OCggKDgIAAWcHKzMzEDEw/HEz//zM8ePf+0y98wQnyFSgOQQkDxCcnWN+8/fyVkZnhBgvjH5YLt+89Y5OREsUbnPn5+XAHFBYWguOTFHD91kPW/z9ZTzCByrvzV+89whec8fHxDA4ODmAMspycYL1z//k3eNkamtJiACxw32DLtPv378cQu3//PhifP3/+//v378EYxMYFQMUlqIxGcUFR/Zyeb99/fKZ2KQOqBOo6Fq2DV2MwxtsHj2tmLt5+79ev3z8YqAT+/v33e+nafXcvXr+bBE+tMMbFiwf/SAhpLDh+8a6wnIy4uogwHwcllj159vpD/4z1uw4cv+i3cWHjB7yKw1I6LKbP3/r0yMmrn5+/fP+B2OB7++7Tx9Pnb36ct3zXR4w4w1fjw5sX6e0K////M/j/n8mAGF8xMvy78YeR4cK6WdU3cKkBCDAAO5kcKaybJQ4AAAAASUVORK5CYII=';

        var imgc = [];
        imgc['1'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABkCAYAAADOtM0JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhDQTg5QzY5QjBFOTExRTA4RkFEQUUwNkI3RUU3RTM4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhDQTg5QzZBQjBFOTExRTA4RkFEQUUwNkI3RUU3RTM4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OENBODlDNjdCMEU5MTFFMDhGQURBRTA2QjdFRTdFMzgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OENBODlDNjhCMEU5MTFFMDhGQURBRTA2QjdFRTdFMzgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5cQGkwAAAx90lEQVR42uy9eZxcZ3nn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%3D';
        imgc['2'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABkCAYAAADOtM0JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdDMDY3NDg1QjBFOTExRTBBMEUzRjk5RUZFOUQ5OTQyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdDMDY3NDg2QjBFOTExRTBBMEUzRjk5RUZFOUQ5OTQyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0MwNjc0ODNCMEU5MTFFMEEwRTNGOTlFRkU5RDk5NDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0MwNjc0ODRCMEU5MTFFMEEwRTNGOTlFRkU5RDk5NDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5R4djlAAAfm0lEQVR42ux7CZBlZ3nd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';
        imgc['3'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABkCAYAAADOtM0JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVBMURBMjdCQjBFOTExRTA5MEIwRDQ1RDUwREE0NkYwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVBMURBMjdDQjBFOTExRTA5MEIwRDQ1RDUwREE0NkYwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUExREEyNzlCMEU5MTFFMDkwQjBENDVENTBEQTQ2RjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUExREEyN0FCMEU5MTFFMDkwQjBENDVENTBEQTQ2RjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7cnmTYAAAsu0lEQVR42ux9B3Rc5Z3v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';
        imgc['4'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABkCAYAAADOtM0JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkEyMEY3ODREQjBFOTExRTBCMjJDODkxNUEwQ0VCRDdCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkEyMEY3ODRFQjBFOTExRTBCMjJDODkxNUEwQ0VCRDdCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTIwRjc4NEJCMEU5MTFFMEIyMkM4OTE1QTBDRUJEN0IiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTIwRjc4NENCMEU5MTFFMEIyMkM4OTE1QTBDRUJEN0IiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz69btSyAAAcNUlEQVR42uxceXAb13n/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';
        var progressImgs = new Array();
        progressImgs[0] = "data:image/png;base64,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%3D";
        progressImgs[1] = "data:image/png;base64,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";
        progressImgs[2] = "data:image/png;base64,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%3D%3D";
        var img = {
            attack: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wcGETotXvSOywAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAACI0lEQVQokW3Lz0uTcQDH8c/3eR5jublfkZZrTNuWUTktDULE6FJ2KfKUB1uSByMaj0H3/oJ67BJEoOJBuoV16hBkOJY/xqPo09A9OpvP1G26Z9uzZ25j+3YMoje8jm+Eo4d0XkrRpKoHKKX4n6RaDMxLKRqOHlJGL9WwtqtD3M6PZ/IlP/4po5UfibG8sLarQy9VwTSZWZ6rFRBJ6IgktDcZ7e+U0cr+iKIJEaVAuGoBjWaWJ5RSrG4m/CtbKUGtWqwXm+tpZ6t5DAAVY3khohSIlc2pHedPjfm8jkkOAHze5qmceoQlWZnYrnMSQojQYGCgHJVQzSlodZt5n9cxBQAMAKTlRf9Vt03s9lh5LbWD1VgWxQqFoZxEt8fGX3PbxVR0wQ8A3La82THzfvqVz8m5rj8I8PJ+AXvpGMJyC9pd5+A9rePbzOvwarzy++GIbYUVxt8e2BrPinPB5VvHueRg2tiJuLwOk4GFWjEgu/alf11O79wbHB5uu3Q5xAHAGVPF1Ww3WCRpExfaZtF3tw8cy0JamIW0IcNhr7c0GSsuAOAS0o9A8OsnQYomSLFEVUIY9WQx3sJyddiIFWP7B2lL9ojYjJ8/TvTcPrayN7y20NKvfVKrUTx78XLUc6Vrci64fFOnDdk7A4OPe3t7fi6Ggvf3DjVSyyn9XJkxoVqtYejJKO9t75oCAKPp+QDHnYDT5RIBfB8aeWqd/vBOKDFG/AFEDxKNtU2dSAAAAABJRU5ErkJggg%3D%3D',
            sendRes: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAMCAYAAAC5tzfZAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wcGEgE3nWIm0AAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAABO0lEQVQokX2Qv0tCURTHP9efkFTLoyLQhtTASVpqFiJabGtrtf6AQKKtJaS9waHGBh3EhgYlAhch0DsVZBJmWEmkYA49sttg7+Uz6Tudc8/9cDgfoZTCyP7u9m/zk9brEy6hSCSzwnhzDAJrkXkLkE4VcAn+xDEMpFMFc+gP+LirPFi2ANiMQsoaR8eX+AM+mp0e9/UGuYsi5ZsO8VhUjYSKstqHy2W67Rc2N1ZZiSyzGJ5GV8ICikERAFe5QzU1G6DZqCBlDYDr27pFhm0UYCQcngMgFPRatpnQ+emBBTDqQfDPTZpm2v838VhU2QDOTvbU82PbMmw2Kpa+KKvoqm/evrTgVl+fOpl8iY9Om3FPj27nzfwsZc0063basYsheztb66r1rpv9xJiLUNDLjDZJJl9C8zhJJLPiG9UDhfU4C7tHAAAAAElFTkSuQmCC'
        };

        var css = "#T4_mHelp{" +
					"position:absolute;" +
					"padding: 4px;" +
					"border: solid 1px #00C000;" +
					"background-color: rgba(200, 200, 200, 0.7);" +
					"box-shadow: 0px 0px 2px 1px black;" +
					"border-radius: 5px;" +
					"}";
        var div = document.createElement("div");
        div.id = "T4_mHelp";
        div.setAttribute("style", css.split('{')[1].split('}')[0] + 'display: none;');
        document.body.appendChild(div);

        if (!ID('l1')) { XundefinedX(); };

        var Script = Create('script', { type: 'text/javascript' });
        Script.innerHTML = GM_setValue + GM_getValue + LanguagePack + SubLanguage + DIR + displayMSG + cSpeed + encode + decode + xpath + NewMathPercent + New_Math + Time + format + ReLoadTime + cData + Create + ID + CLASS + TAG + C + rmv + MakeNum + FindBefore + FindNext + htmltocontext + Handle + sh + getXQR + GM_addStyle + pTime + XPS_Cul + tChange + cLang + setting + X_CE_Change + xtr + OnChange + TroopType + Distance + get_xy + FindNext + hMove + getXtime + gTimeD + checkD + favThis + AllyCalculation + Map_Check + Map_Coordx + SaveAsLink + AttackDist + sHide + svnIMG + NoteText + MakeDrag + getPosition;
        var target = TAG('head')[0].getElementsByTagName('script')[0];
        target.parentNode.insertBefore(Script, target);

        //#########	Resource Timer #########

        var ResSplit = ["'l1': ", "'l2': ", "'l3': ", "'l4': "];
        var MyRes = [];
        var pro = [];
        var per = [];
        var GM_Time = [];
        var MyPer = [];
        if (travian3) {
            pro[0] = document.getElementById('l4').getAttribute("title") / 3600;
            pro[1] = document.getElementById('l3').getAttribute("title") / 3600;
            pro[2] = document.getElementById('l2').getAttribute("title") / 3600;
            pro[3] = document.getElementById('l1').getAttribute("title") / 3600;
        } else {
            pro[0] = xpath("//div[@class='bodyWrapper']/script").snapshotItem(0).innerHTML.split(ResSplit[0])[1].split(',')[0] / 3600;
            pro[1] = xpath("//div[@class='bodyWrapper']/script").snapshotItem(0).innerHTML.split(ResSplit[1])[1].split(',')[0] / 3600;
            pro[2] = xpath("//div[@class='bodyWrapper']/script").snapshotItem(0).innerHTML.split(ResSplit[2])[1].split(',')[0] / 3600;
            pro[3] = xpath("//div[@class='bodyWrapper']/script").snapshotItem(0).innerHTML.split(ResSplit[3])[1].split('}')[0] / 3600;
        };
        for (i = 0; i < 4; i++) {
            MyRes[i] = C(ID('l' + (i + 1)).innerHTML.split('/')[0]) - C((pro[i] < 0 ? '0' : ID('l' + (i + 1)).innerHTML.split('/')[1]));
            GM_Time[i] = Time(MyRes[i], pro[i]);
        };
        if (travian3) {
            for (i = 0; i < 4; i++) {
                document.getElementById('resWrap').getElementsByClassName('r' + (i + 1))[0].parentNode.innerHTML += '' +
    				'<div class="res_State" id="resource_state[' + i + ']"></div>';
            };
            function ResourcePlusTimer() { for (i = 0; i < 4; i++) { ID('resource_state[' + i + ']').innerHTML += '<b id="xTimer[' + (i + 1) + ']" style="color: ' + ((pro[i] < 0) ? "red" : "black") + ';">' + GM_Time[i] + '</b><br>'; }; };
            function ResourcePercent() { for (i = 0; i < 4; i++) { MyPer[i] = NewMathPercent(C(ID('l' + (4 - i)).innerHTML.split('/')[0]) / C(ID('l' + (4 - i)).innerHTML.split('/')[1]) * 100); ID('resource_state[' + i + ']').innerHTML += '<span id="xPer[' + (i + 1) + ']">%' + MyPer[i] + '</span><br>'; }; };
        } else {
            for (i = 0; i < 4; i++) {
                ID('res').getElementsByTagName('li')[i].getElementsByClassName('bar-bg')[0].innerHTML += '' +
                    '<div class="res_State" id="resource_state[' + i + ']"></div>';
            };

            function ResourcePlusTimer() { for (i = 0; i < 4; i++) { ID('resource_state[' + i + ']').innerHTML += '<b id="xTimer[' + (i + 1) + ']" style="color: ' + ((pro[i] < 0) ? "red" : "black") + ';">' + GM_Time[i] + '</b><br>'; }; };
            function ResourcePercent() { for (i = 0; i < 4; i++) { MyPer[i] = NewMathPercent(ID('l' + (i + 1)).innerHTML.split('/')[0] / ID('l' + (i + 1)).innerHTML.split('/')[1] * 100); ID('resource_state[' + i + ']').innerHTML += '<span id="xPer[' + (i + 1) + ']">%' + MyPer[i] + '</span><br>'; }; };
        }
        function ResourcePrud() { for (i = 0; i < 4; i++) { ID('resource_state[' + i + ']').innerHTML += '' + C(pro[i] * 3600) + ''; }; };

        function ReTime() {
            for (i = 0; i < 4; i++) {
                if (ID('xTimer[' + (i + 1) + ']')) {
                    if (ID('xTimer[' + (i + 1) + ']').innerHTML.match(/0:00:00/)) { } else {
                        ID('xTimer[' + (i + 1) + ']').innerHTML = format(ReLoadTime(ID('xTimer[' + (i + 1) + ']').innerHTML) - 1);
                    }
                };
                if (ID('mTimer[' + (i + 1) + ']')) {
                    if (ID('mTimer[' + (i + 1) + ']').innerHTML.match(/0:00:00/)) { } else {
                        ID('mTimer[' + (i + 1) + ']').innerHTML = format(ReLoadTime(ID('mTimer[' + (i + 1) + ']').innerHTML) - 1);
                    }
                };
                if (ID('xPer[' + (i + 1) + ']')) {
                    if (travian3) {
                        ID('xPer[' + (i + 1) + ']').innerHTML = '%' + NewMathPercent(C(ID('l' + (4 - i)).innerHTML.split('/')[0]) / C(ID('l' + (4 - i)).innerHTML.split('/')[1]) * 100) + '';
                    } else {
                        ID('xPer[' + (i + 1) + ']').innerHTML = '%' + NewMathPercent(ID('l' + (i + 1)).innerHTML.split('/')[0] / ID('l' + (i + 1)).innerHTML.split('/')[1] * 100) + '';
                    }
                };
            };
            return setTimeout(ReTime, 1000);
        };

        //######### End Resource Timer	#########

        function LanguagePack() {
            if (GM_getValue('MyLang')) return GM_getValue('MyLang'); else return 'en';
        };
        function SubLanguage(sLang, oType) {
            /* thanks to:
            1=Arabic by ww_start_t
            2=Bulgarian by Userbg
            3=SimpChinese by Chen Chen
            4=German by Oski1983
            5=English by ww_start_t
            6=Spanish by msdn_bg
            7=Persian by ilqar
            8=French by armanda
            9=Hungary by Mauro van der Gun‏
            10=indonesian by elberthomax
            11=Italian by Incub0
            12=Deutch by Richárd Kővári‏
            13=Russian by Serj_LV
            14=Slovak by Zapo
            15=Turkish by ByKaan
            16=TradChinese by Chen Chen */
            var subLang = [], LNG;             /* [0]             [1]                    [2]                      [3]               [4]          [5]                      [6]             [7]        [8]          [9]              [10]             [11]               [12]                   [13]                     [14]                    [15]                 [16]                    [17]           [18]       [19]    [20]    [21]   [22]    [23]       [24]          [25]                      [26]                       [27]                    [28]                           [29]                                            [30]                                                       [31]                            [32]            [33]         [34]         [35]       [36]       [37]             [38]	                            [39]	               [40]	         [41]          	[42]	       [43]	       [44]           [45]	             [46]                     [47]                    [48]                          [49]                                        [50]                                                [51]                                  [52]              [53]                          [54]                   [55]      [56]     [57]     [58]    [59]     [60]       [61]       [62]    [63]     [64]      [65]       [66]      [67]           [68]        [69]     [70]     [71] */
            if (sLang == 'ar') subLang['ar'] = ['الإعدادات', 'دفتر الملاحظات', 'إظهار قائمة المباني', 'إخفاء قائمة المباني', 'حفظ', 'ارسال موارد الى: ', 'ارسال قوات الى: ', 'الروابط', 'إضافة', 'عنوان الرابط:', 'أسم الرابط:', 'حذف الرابط:', 'الروابط المساعده', 'حساب تطوير الموارد', 'محاكي المعركة المطور', 'حساب المسافة', 'بحث عن القرى القمحية', 'بحث عن الفيله', 'نصف القطر', 'بدأ', 'المسح', 'من', 'الى', 'أكتمل', 'تحديث', 'لديك أخر اصدار', 'قد يكون لديك نسخة تجريبية!', 'يوجد أصدار جديد!', 'هل تريد تثبيتة...؟', 'عرض رمز ارسال رسالة بجانب كل لاعب', 'اظهار جدول معلومات حول الهجوم في نقطة التجمع', 'عرض رموز ارسال قوات و موارد بجانب كل قرى اللاعبين', 'قوة الهجوم', 'قوة الدفاع', 'الخسائر', 'معلومات', 'الفائدة', 'الخسائر', 'جميع الواحات', 'أظهار تحديد الكل للرسائل والتقارير', 'تحديد الكل', 'العاصمة', 'مجموع الموارد', 'المجموع', 'السرعة', 'تصوير التقرير', 'الرابط يظهر هنا', 'عرض مستويات المباني', 'عرض خصائص السوق', 'اظهار وقت وصول التجار في السوق', 'عرض معلومات اللاعب والتحالف عند مرور الماوس عليه', 'اظهار معلومات القوات عند مرور الماوس عليه', 'عرض شريط الموارد', 'شريط الموارد', 'أظهار جدول ترقية حقول الموارد', "بدون ظل", "أزرق", "أحمر", "أسود", "أصفر", "عادي", "كبير جداً", "كبير", "متوسط", "صغير", 'برتقالي', 'أخضر', 'أحمر غامق', 'أزرق غامق', 'يسار', 'متوسط', 'يمين'];
            if (sLang == 'bg') subLang['bg'] = ['Настройки', 'Тефтерче', 'Покажи лист със сгради', 'Скрий лист със сгради', 'Запази', 'Изпрати ресурс до: ', 'Изпрати армия до: ', 'Връзки', 'Добави', 'Адрес на връзка:', 'Име на връзка:', 'Изтрий връзка:', 'Полезни връзки', 'Ресурсен калкулатор', 'Разширен симулатор битки', 'Калкулатор за разстояния', 'Търсачка ресурсни полета', 'Търсачка на слонове', 'Радиус', 'Старт', 'Сканирай', 'От', 'До', 'Процента', "Обнови", "Имате най-новата версия!", "Може би имате бета версия", "Има нова версия", "Исате ли да я инсталирате..?", 'Виж икона изпрати съобщения', 'Покажи информация за атаката', 'Покажи изпрати Армия/Ресурс', 'Атакуващ', 'Защитник', 'Загуби', "Информация", "Печалба", "Загуби", "Всеки оазис", 'Покажи маркирай всички съобщения бутона', 'Избери всички', 'Столица', 'Общо ресурс', 'Общо', 'Скорост', 'Хвани Доклада', 'Докладвай връзка...', 'Покажи нивото в центъра', 'Виж информация в пазара', 'Виж разстояние и време на търговците в пазара', 'Пояснения за Играч/Клан', 'Пояснения за войската', 'Покажи ресурсния бар', 'Ресурс бар', 'Покажи Таблица с ресурсни полета'];
            if (sLang == 'cn') subLang['cn'] = ['设置', '记事本', '显示建筑列表', '隐藏建筑列表', '保存', '将资源发送到：', '派军队到：', '链接', '添加', '链接地址：', '链接名称：', '删除链接：', '帮助链接', '资源发展计算器', '扩展战斗模拟器', '距离计算器', '农田查找器', '大象查找器', '半径', '开始', '扫描', '从', '到', '百分比', '更新', '你目前是最新版本！', '你可以选择测试Beta版本', '有新版本可用', '你是否要安装？', '查看已发送信息图标', '显示攻击信息表', '显示派出的军队/资源', '攻击方', '防御方', '损失', '信息', '利润', '损失', '任何绿洲', '显示选择所有的消息和报告的选项', '全选', '首都', '共有资源', '总计', '服务器速度', '截取报告', '报告链接…', '显示中心数目', '显示市场的信息', '在市场内显示距离和事件', '为正在行军的玩家和联盟的部队显示辅助提示', '显示军队辅助提示', '显示资源统计柱状图', '资源统计柱状图', '显示资源田升级表', "没有阴影", "蓝色", "红色", "黑色", '黄色', '正常', "非常大", "大", "中", "小", '橘黄色', '绿色', '深红色', '深蓝色', '左', '中', '右'];
            if (sLang == 'de') subLang['de'] = ['Einstellungen', 'Notizblock', 'Zeige Gebäudeliste', 'Verstecke Gebäudeliste', 'Speichern', 'sende Rohstoffe zu: ', 'sende Truppen zu: ', 'Links', 'Hinzufügen', 'Link URL:', 'Link Name:', 'Link löschen:', 'Hilfelinks', 'Rohstoff Ausbildungsrechner', 'Erweiterter Kampsimulator', 'Entfernungsrechner', 'Getreidefinder', 'Elefantenfinder', 'Radius', 'Start', 'Scan', 'Von', 'Zu', 'Prozent', "update", "Sie haben die aktuelle Version!", "You may have a Beta Version", "Neue Version verfügbar", "wollen sie diese installieren..?", 'Zeige Nachrichten Icon', 'Zeige Infotabelle über Angriffe', 'Zeige Rohstoffe/Truppen senden', 'Angreifer', 'Verteidiger', 'Verluste', "Information", "Gewinn", "Verlust", "Jede Oase", 'Zeige alle Nachriten/Berichte auswählen', 'Alle auswählen', 'Hauptdorf', 'Total Rohstoffe', 'Total', 'Geschwindigkeit', 'Bereichte erfassen', 'Berichtelink...', 'Zeige Nummer Zentriert', 'Zeige Marktplatzinformationen', 'Zeige Entfernung und Zeit der Händler im Marktplatz', 'Zeige Tooltip für Spieler/Alianz', 'Zeite Truppentooltip', 'Zeige Rohstoffleiste', 'Rohstoffleiste', 'Zeige Upgradetabelle für Rohstofffelder'];
            if (sLang == 'en') subLang['en'] = ['Setting', 'NoteBook', 'Show Buildings List', 'Hide Buildings List', 'Save', 'send resource to: ', 'send army to: ', 'Links', 'Add', 'Link URL:', 'Link Name:', 'Delete Link:', 'help links', 'resource development calculator', 'Extended Combat Simulator', 'distance calculator', 'Crop Finder', 'Elephant Finder', 'Radius', 'Start', 'Scan', 'From', 'To', 'Percent', "update", "You have a latest version!", "You may have a beta version", "new version available", "do you want to install it..?", 'View send message icon', 'Show table info about attack', 'Show send Army/Resource', 'Attacker', 'Defender', 'Losses', "information", "profit", "Losses", "Any oasis", 'Show select all the messages and reports', 'Select All', 'Capital', 'Total Resource', 'Total', 'Speed', 'Capture Report', 'Report Link...', 'Show center number', 'View marketplace information', 'View distance and time for merchants in market place', 'Show tooltips for player/alliance', 'View troops tooltips', 'Show Resource bar', 'Resource bar', 'Show resource fields upgrade table', "No Shadow", "Blue", "Red", "Black", "Yellow", "Normal", "Very Large", "Large", "Medium", "Small", 'Orange', 'Green', 'Dark Red', 'Dark Blue', 'Left', 'Center', 'Right'];
            if (sLang == 'es') subLang['es'] = ['ajustes', 'Cuaderno', 'Mostrar una lista de edificios', 'Ocultar la lista de los edificios', 'ahorrar', "Envoyer des ressources pour:", "Envoyer une armée: ", 'Links', 'Añadir', 'URL del enlace: ', ' Link Name:', 'Eliminar Link: ', 'Ayudar a los enlaces', 'resource development calculator', 'Simulador de combate avanzado', 'Calculadora del tiempo del recorrido', 'Crop Finder', 'Elephant Finder', 'radio', 'comienzo', 'escanear', 'de', 'a', 'por ciento', "actualizar", "Usted tiene una versión más reciente", "Usted puede tener una versión beta", "nueva versión disponible", "¿quieres instalarlo ..?", "Vista de icono enviar un mensaje", "mostrar la tabla de información de ataque", "iconos de vista de enviar ataque / recurso", "Atacante", "defensor", "pérdidas", "información", "beneficio", "pérdidas", 'cualquier oasis', 'Mostrar, seleccionar todos los mensajes e informes', 'seleccionar todo', 'El Capital', 'de los recursos Total', 'Total', 'Speed', 'Capture Report', 'Enlace Informe ... '];
            if (sLang == 'fa') subLang['fa'] = ['تنظیمات', 'دفترچه یادداشت', 'نمایش لیست ساختمانها', 'پنهان کردن لیست ساختمانها', 'ذخیره', 'ارسال منابع به: ', 'ارسال نیرو به: ', 'پیوندها', 'اضاف کردن', 'آدرس لینک :', 'نام لینک:', 'حذف لینک:', 'لینکهای کمکی', 'محاسبه گر توسعه منابع ', 'شبیه ساز نبرد توسعه یافته', 'محاسبه گر مسافت', 'گندم یاب', 'فیل یاب', 'شعاع', 'شروع', 'اسکن کن', 'از', 'به', 'در صد', "به روز کردن", "شما آخرین نسخه را در دست دارید!", "ممکن است شما نسخه بتا را داشته باشید", "نسخه جدید در دسترس است", "آیا شما می خواهید نصب کنید انرا..?", 'نمایش آیکون ارسال پیام', 'نمایش جدول اطلاعات حمله', 'نمایش ارسال ارتش/منابع', 'مهاجم', 'مدافع', 'تلفات', "اطلاعات", "پروفایل", "تلفات", "همه واحه ها", 'نمایش باكس انتخاب همه پیامها و گزارشات', 'انتخاب همه', 'سرمایه', 'منابع مجموع', 'مجموع', 'سرعت', 'ضبط گزارش', 'گزارش لینک ...'];
            if (sLang == 'fr') subLang['fr'] = ['Paramètres', 'portable', 'Afficher une liste de bâtiments', 'Cacher la liste des bâtiments', 'Enregistrer', 'Envoyer des ressources pour: ', "De l'envoi d'une armée pour: ", 'Liens', 'Ajouter', 'lien URL:', 'Nom du lien:', 'Supprimer le lien:', 'Aide liens', 'Calculateur développement de ressources', 'Simulateur de combat amélioré', 'distance calculator', 'Crop Finder', 'Elephant Finder', 'rayon', 'démarrage', 'scan', 'à partir de', 'à', 'pour cent', "update", "Vous avez une nouvelle version!", "Vous pouvez avoir une version bêta", "nouvelle version disponible", "voulez-vous de l'installer ..?", "Vue en icône envoyer un message", "show table sur Info attaque", "icônes envoyer attaque / ressource", "Attaquant", "défenseur", "Pertes", 'informations', 'les bénéfices', 'pertes', 'toute oasis', 'Voir, sélectionner tous les messages et les rapports', 'Sélectionner tout', 'capital', 'total des ressources', 'total', 'vitesse', 'Capturez rapport', 'Rapporter un lien ...'];
            if (sLang == 'hk') subLang['hk'] = ['設定', '筆記本', '顯示建築單', '隱藏建築單', '儲存', '送資源： ', '指派軍隊： ', '相關連結', '添加', '連結網址：', '連結名稱：', '刪除連接：', '幫助連結', '資源建設計算器', '進階戰鬥模擬器', '距離計算器', '搜索神田', '搜索大象', '範圍', '開始', '掃描', '從', '到', '百分比', "更新", "最新版本！", "測試版本", "要安裝嗎?", '發送訊息圖示', '顯示攻擊訊息', '顯示輸送軍隊/資源', '攻擊', '防禦', '損失', "訊息", "收穫", "損失", "隨意綠洲", '顯示訊息和報告(選擇)', '全選', '資金', '資源總計', '總計', '速度', '捕獲報告', '報告連結...', '顯示等級數字', '市場訊息', '市場商人距離和時間', '顯示玩家/聯盟圖示', '軍隊圖示', '顯示資源欄', '資源欄', '顯示資源建設升級'];
            if (sLang == 'hu') subLang['hu'] = ['Beállítások', 'Jegyzetek', 'Épületlista megjelenítése', 'Épületlista elrejtése', 'Mentés', 'nyersanyag küldése ide: ', 'egységek küldése ide: ', 'Linkek', 'Hozzáadás', 'Link URL:', 'Link Név:', 'Link törlése:', 'hasznos linkek', 'nyersanyag fejlődés kalkulátor', 'Bővített harcszimulátor', 'távolság kalkulátor', 'Búzakereső', 'Elefántkeresp', 'Sugár', 'Start', 'Keresés', '-tól', '-ig', 'Százalék', "frissítés", "A legújabb verzióval rendelkezel!", "Lehet, hogy béta verzióval rendelkezel", "elérhető egy újabb frissítés", "telepíted?", 'üzenetküldés ikon megjelenítése', 'Támadás táblázatba kiíratása', 'Egység/nyersanyag küldés megjelenítése', 'Támadó', 'Védő', 'Veszteségek', "információ", "profit", "Veszteségek", 'Minden oázis', 'Tekintse meg, válassza az összes üzenetek és jelentések', 'Az összes kijelölése', 'tőke', 'Összes Erőforrás', 'teljes', 'sebesség', 'Capture jelentés', 'Jelentés Link ...'];
            if (sLang == 'id') subLang['id'] = ['Pengaturan', 'Catatan', 'Tampilkan Daftar Bangunan', 'Sembunyikan Daftar Bangunan', 'Simpan', 'kirim sumber daya ke:', 'kirim tentara ke: ', ' Link ', ' Tambahkan Link URL ', ': ', ' Nama Link: ', ' Hapus Link: ', ' link bantuan ', ' kalkulator pengembangan sumber daya ', ' Simulator Tempur ', 'kalkulator jarak ', 'Pencari Crop', ' Pencari Gajah', ' Radius ', ' Mulai ', ' Scan ', ' Dari ', ' Ke ', ' Persen ', "update", "Anda memiliki versi terbaru!", "Anda mungkin memiliki versi beta", "versi baru tersedia", "Anda ingin menginstalnya ..?", 'Tampilkan ikon pesan', 'Tampilkan Info tabel tentang serangan', 'Tampilkan mengirim pasukan / Sumber Daya', 'Penyerang ', ' Pembela', ' Kerugian ', " informasi ", " keuntungan ", " Rugi ", " Setiap oasis ", ' Tampilkan memilih semua pesan dan laporan ', ' Pilih Semua ', ' Ibu kota ', ' Jumlah Sumber Daya ', ' Jumlah ', ' Kecepatan ​​', ' Simpan Laporan ', ' Link Laporkan ... ', ' Tampilkan nomor pusat ', ' Melihat informasi pasar ', ' View jarak dan waktu bagi pedagang di pasar ', ' Tampilkan tooltips untuk pemain / aliansi ', ' tampilkan tooltip pasukan ', ' Tampilkan bar Sumber Daya ', ' bar Sumber Daya ', ' Tampilkan tabel upgrade lahan sumberdaya ', "Tidak ada bayangan", "Biru", "Merah", "Hitam", " Kuning ", " Normal ", " Sangat Besar ", " besar ", " Sedang ", " Kecil ", 'Orange', 'Hijau', 'Merah Tua', 'Biru Tua', 'Kiri', 'tengah', 'Kanan'];
            if (sLang == 'it') subLang['it'] = ['Impostazioni', 'notebook', 'Lista Mostra Buildings', 'Nascondi List Buildings', 'Salva', 'inviare risorsa:', 'inviare truppe a:', 'Link', 'Aggiungi', 'URL del link : ', ' Nome del link: ', ' Cancella link: ', ' help links ', ' calcolatore sviluppo delle risorse ', ' Estesa simulatore di combattimento ', ' calcolatore della distanza ', ' Crop Finder ', ' Elephant Finder ', ' Radius ', 'Start', 'Scan', 'Da', 'To', 'percentuale', "update", "Hai una versione più recente!", "Si può avere una versione beta", "nuova versione", "vuoi installarlo ..? ", 'Guarda inviare icona del messaggio', 'info tavolo Mostra informazioni attacco', 'Mostra inviare Esercito / Resource', 'Attaccante', 'Defender', 'perdite', " informazione ", "profitto", "perdite", "Ogni oasi", 'Mostra selezionare tutti i messaggi e le relazioni', 'Seleziona tutto', 'Capitale', 'Risorse totali', 'Totali', 'Velocità??', 'Capture report', 'Link Rapporto ...', 'numero del centro Show', 'informazioni di mercato View', 'Vedi la distanza e il tempo per i commercianti in piazza del mercato', 'Mostra suggerimenti per il giocatore / alleanza', 'Visualizza le truppe ', ' Mostra la barra delle risorse ', ' barra Risorse ', ' Mostra i campi di risorse aggiornare la tabella '];
            if (sLang == 'nl') subLang['nl'] = ['Instellingen', 'Kladblok', 'Laat gebouwen lijst zien', 'Verberg gebouwen lijst', 'Opslaan', 'stuur grondstoffen naar: ', 'stuur troepen naar: ', 'Links', 'Toevoegen', 'Link URL:', 'Link naam:', 'Verwijder link:', 'help links', 'grondstoffen voor ontwikkelingen calculator', 'Uitgebreide veldslagsimulator', 'afstand calculator', 'Graandorp zoeker', 'Olifant zoeker', 'Straal', 'Start', 'Scan', 'Van', 'Naar', 'Procent', "Update", "Je hebt de laatste versie!", "Je hebt misschien een bèta versie", "nieuwe versie beschikbaar", "wil je deze installeren?", 'Laat stuur bericht icoon zien', 'Laat informatie tabel over de aanval zien', 'Laat stuur leger/grondstoffen iconen zien', 'Aanvallen', 'Verdediger', 'Verliezen', "Informatie", "Opbrengst", "Verliezen", 'elke oase', 'Bekijk, selecteer alle berichten en rapporten', 'Alles selecteren', 'hoofdstad', 'Totaal Resource', 'totaal', 'snelheid', 'Capture Report', 'Meld Link ...'];
            if (sLang == 'ru') subLang['ru'] = ['Настройки', 'Блокнот', 'Показать список зданий', 'Спрятать список зданий', 'Сохранить', 'отослать ресурсы в: ', 'направить войска в: ', 'Ссылки', 'Добавить', 'URL ссылки:', 'Название ссылки:', 'Удалить ссылку:', 'Полезные ссылки', 'Калькулятор развития ресурсов', 'Расширенный симулятор сражений', 'Калькулятор расстояний', 'Поиск зерна', 'Поиск слонов', 'Радиус', 'Старт', 'Сканирование', 'сейчас', 'будет', 'Процент', 'обновление', 'У Вас последняя версия!', 'У вас тестовая версия', 'Доступна новая версия', 'вы хотите установить её ?', 'Показывать иконку отправки сообщения', 'Показывать таблицу информации об атаке', 'Показывать иконку отослать Ресурсы/Войска', 'Нападение', 'Оборона', 'Потери', 'информация', 'бонус', 'Потери', 'Любой оазис', 'Показать выбор всех сообщений и отчетов', 'Выбрать всё', 'Столица', 'Всего ресурсов', 'Всего', 'скорость', 'Опубликовать отчет', 'Ссылка на отчет…', 'Показывать уровни полей/зданий', 'Дополнительные функции на рынке', 'Показывать расстояние и время движения на рынке', 'Показывать подсказки по игроку/альянсу', 'Показывать подсказки по войскам', 'Показывать таблицу ресурсов', 'Таблица ресурсов', 'Показывать таблицу улучшения полей'];
            if (sLang == 'sk') subLang['sk'] = ['Nastavenie', 'Poznámky', 'Zobraziť zoznam prác', 'Skryť zoznam prác', 'Uložiť', 'poslať suroviny do: ', 'poslať armádu do: ', 'Odkaz', 'Pridať', 'Odkaz URL:', 'Názov odkazu:', 'Zmazať odkaz:', 'Helpodkazy', 'Kalkulačka rozvoju surovín', 'Rozšírený bojový simulátor', 'Kalkulačka vzdialeností', 'Vyhľadávač Crop', 'Vyhľadávač Slonov', 'Rádius', 'Štart', 'Scan', 'Z', 'Do', 'Percent', "obnoviť", "Máte poslednú verziu!", "Je možné mať betaverziu", "nová verzia dostupná", "chcete to nainštalovať..?", 'Zobraziť ikonu poslať správu', 'Zobraziť tabuľku informácií oútoku', 'Zobraziť poslať armádu/suroviny', 'Útočník', 'Obranca', 'Straty', "informácie", "zisk", "Straty", "Každé oázy", 'Zobraziť vyberte všetky správy a hlásenia', 'Vybrať všetko', 'Hlavná dedina', 'Všetky suroviny', 'Total', 'Rýchlosť', 'Zachytiť Hlásenie', 'Odkaz Hlásenia...', 'Zobraziť center číslo', 'Zobraziť informácie obchodníka', 'Zobraziť vzdialenosť ačas pre obchodníkov na trhu', 'Zobraziť popisky pre hráčov/aliancie ', 'Zobraziť vojsk tipy', 'Zobraziť tabuľku surovín', 'Tabuľka surovín', 'Zobraziť tabuľku pre upgrade surovinových polí'];
            if (sLang == 'th') subLang['th'] = ['ตั้งค่า', 'สมุดบันทึก', 'แสดงรายการสิ่งก่อสร้าง', 'ซ่อนรายการสิ่งก่อสร้าง', 'Save', 'ส่งทรัพยากรถึง: ', 'ส่งกองทัพถึง: ', 'Links', 'เพิ่ม', 'Link URL:', 'Link Name:', 'Delete Link:', 'help links', 'resource development calculator', 'Extended Combat Simulator', 'distance calculator', 'Crop Finder', 'Elephant Finder', 'รัศมี', 'เริ่ม', 'ค้นหา', 'จาก', 'ถึง', 'เปอร์เซ็นต์', "update", "เป็นเวอร์ชั่นล่าสุดแล้ว!", "เป็นเวอร์ชั่นทดสอบ", "มีเวอร์ชั่นที่ใหม่กว่านี้", "ต้องการติดตั้งทันที..?", 'แสดง icon ส่งจดหมาย', 'แสดงตารางข้อมูลการโจมตี', 'แสดงการส่งกองทัพ/ทรัพยากร', 'ผู้โจมตี', 'ผู้ป้องกัน', 'พ่ายแพ้', "ข้อมูล", "กำไร", "พ่ายแพ้", "โอเอซิสอื่น", 'แสดง เลือกทั้งหมด ในหน้ารายงานและจดหมาย', 'เลือกทั้งหมด', 'เมืองหลวง', 'ทรัพยากรทั้งหมด', 'ทั้งหมด', 'Speed', 'Capture Report', 'Report Link...', 'แสดงระดับสิ่งก่อสร้าง', 'แสดงข้อมูลตลาดสินค้า', 'แสดงระยะทางและเวลาขนส่งในตลาดสินค้า', 'แสดง tooltips สำหรับผู้เล่น/พันธมิตร', 'แสดง tooltips ของทหาร', 'แสดงแถบ Resource bar', 'Resource bar', 'แสดงตารางอัพเกรดทุ่งทรัพยากร'];
            if (sLang == 'tr') subLang['tr'] = ['Ayarlar', 'Not Defteri', 'Bina listesini Göster', 'Bina listesini Gizle', 'Kaydet', 'e hammadde gönder', 'e asker gönder', 'Kısa Yollar', 'Ekle', 'URL Yolu:', 'Kısa yol ismi:', 'Kısa yolu sil:', 'Yardım kısa yolları', 'Hammadde gelişim hesaplayıcısı', 'Gelişmiş savaş Simülatörü', 'Mesafe hesaplayıcı', 'Tarla arayıcı', 'Fil arayıcı', 'Yarıçap', 'Başla', 'Tara', 'Başlangıç', 'Bitiş', 'yüzde', "güncelle", "En son sürüme sahipsiniz!", "Beta sürümüne sahip olabilirsiniz", "Yeni sürüm var.", "Yüklemek ister misiniz..?", 'Mesaj Gönder resmi görünsün', 'Saldırı hakkında bilgi tablosunu göster', 'Asker/Hammadde gönder', 'i göster', 'Saldıran', 'Savunan', 'Kayıplar', "bilgi", "kazançlar", "Kayıplar", "Herhangi bir vaha", 'Bütün mesajları / raporları seçmeyi göster', 'Hepsini seç', 'Başkent', 'Bütün Kaynaklar', 'Toplam', 'Hız', 'Rapor yakala', 'Rapor kısa yolu...', 'Merkez numaralandırmayı göster', 'Pazar bilgisini gör', 'Pazar', 'da satıcının Mesafe ve ulaşım bilgisini gör', 'Oyuncu/Birlik için ipucunu göster', 'Askerler için ipucunu gör', 'Hammadde çubuğunu göster', 'Hammadde çubuğunu', 'Hammadde alanları yükseltme tablosunu göster', "Gölgesiz", "Mavi", "Kırmızı", "Siyah", "Sarı", "Normal", "Çok Büyük", "Büyük", "Orta", "Küçük", 'Turuncu', 'Yeşil', 'Koyu Kırmızı', 'Koyu Mavi', 'Sol', 'orta', 'Sağ'];
            if (sLang == 'tw') subLang['tw'] = ['設置', '記事本', '顯示建築列表', '隱藏建築列表', '保存', '將資源發送到：', '派軍隊到：', '鏈接', '添加', '鏈接地址：', '鏈接名稱：', '刪除鏈接：', '幫助鏈接', '資源發展計算器', '擴展戰鬥模擬器', '距離計算器', '農田查找器', '大象查找器', '半徑', '開始', '掃描', '從', '到', '百分比', '更新', '你目前是最新版本！ ', '你可以選擇測試Beta版本', '有新版本可用', '你是否要安裝？ ', '查看已發送信息圖標', '顯示攻擊信息表', '顯示派出的軍隊/資源', '攻擊方', '防禦方', '損失', '信息', '利潤', '損失', '任何綠洲', '顯示選擇所有的消息和報告的選項', '全選', '首都', '共有資源', '總計', '伺服器速度', '截取報告', '報告鏈接…', '顯示中心數目', '顯示市場的信息', '在市場內顯示距離和事件', '為正在行軍的玩家和聯盟的部隊顯示輔助提示', '顯示軍隊輔助提示', '顯示資源統計柱狀圖', '資源統計柱狀圖', '顯示資源田升級表', "没有阴影", "蓝色", "红色", "黑色", "黄色", "正常", "非常大", "大", "中", "小", '橘黄色', '绿色', '深红色', '深蓝色', '左', '中', '右'];
            LNG = '' + subLang[sLang][oType] + ''.toString();
            if (LNG == ('undefined' || null || '' || 'null' || 'NaN')) { LNG = SubLanguage('en', oType); } else { LNG = subLang[sLang][oType]; };
            return LNG;
        };
        function NewMathPercent(x) {
            if (x.toString().match(/\d*.\d{4}/)) { return x.toString().match(/\d*.\d{4}/); } else
                if (x.toString().match(/\d*.\d{3}/)) { return x.toString().match(/\d*.\d{3}/); } else
                    if (x.toString().match(/\d*.\d{2}/)) { return x.toString().match(/\d*.\d{2}/); } else
                        if (x.toString().match(/\d*.\d{1}/)) { return x.toString().match(/\d*.\d{1}/); } else { return x; };
        };
        function New_Math(x) {
            if (x.toString().match(/\d*.\d{2}/)) { return x.toString().match(/\d*.\d{2}/); } else
                if (x.toString().match(/\d*.\d{1}/)) { return x.toString().match(/\d*.\d{1}/); } else { return x; };
        };
        var AddUpdate = function () {
            function update() {
                $.ajax({
                    url: About.Script.Page,
                    success: function (data) {
                        var vers = $(data).find('div#summary p').eq(1).text().split('Version:')[1];
                        var GetVersion = C(vers.replace(/\./g, ''));
                        var VersionNow = C(About.Version.Now.replace(/\./g, ''));
                        if (GetVersion == VersionNow) { alert(SubLanguage(LanguagePack(), 25)); } else
                            if (GetVersion < VersionNow) { alert(SubLanguage(LanguagePack(), 26)); } else
                                if (GetVersion > VersionNow) {
                                    var ask = window.confirm('' + SubLanguage(LanguagePack(), 27) + '\n' + SubLanguage(LanguagePack(), 28) + '\n' + About.Version.Now + ' --> ' + vers + ' ?');
                                    if (ask) { location.href = About.Script.Download; };
                                };
                    },
                    error: function (ex) {
                        alert('cannot connect to userscripts.org:\nError: ' + ex.status);
                    }
                });
            };
            var img = Create('img', { id: 'blur' });
            img.src = updateIcon;
            $(img).hover(function () { displayMSG('<font style="text-shadow: 2px 2px 3px white; font-weight: bold;">' + SubLanguage(LanguagePack(), 24) + ' Travian4 Plus Tool hacked</font>'); }, function () { sHide(); });
            img.addEventListener('click', update, true);
            img.setAttribute('style', 'cursor: pointer;');
            ID('t4tools').getElementsByTagName('ul')[0].appendChild(img);
        };
        var z = getPosition('t4tools', '100px_300px').split('_'), x = '100px', y = '50px';
        if (z) { x = z[1]; y = z[0]; };
        var move = FromHex('03c06406907602006906403d02206d06f07606502203e02606e06207307003b03c02f06406907603e');
        var pos; if (RTL == 'rtl') { pos = 'right'; } else { pos = 'left'; };
        var div = Create('div', { id: 't4tools', style: 'position:absolute;top:' + y + ';left:' + x + ';' });
        $(div).append(move);
        $(div).append('<ul style="padding: 0px; margin: 0px;"></ul>');

        ID('logo').parentNode.insertBefore(div, ID('logo'));
        MakeDrag(ID('t4tools').getElementsByTagName('div')[0], ID('t4tools'));

        var bCost = [[0], [[0, 0, 0, 0, 0, 0], [40, 100, 50, 60, 1, 2], [65, 165, 85, 100, 1, 3], [110, 280, 140, 165, 2, 4], [185, 465, 235, 280, 2, 5], [310, 780, 390, 465, 2, 6], [520, 1300, 650, 780, 3, 8], [870, 2170, 1085, 1300, 4, 10], [1450, 3625, 1810, 2175, 4, 12], [2420, 6050, 3025, 3630, 5, 14], [4040, 10105, 5050, 6060, 6, 16], [6750, 16870, 8435, 10125, 7, 18], [11270, 28175, 14090, 16905, 9, 20], [18820, 47055, 23525, 28230, 11, 22], [31430, 78580, 39290, 47150, 13, 24], [52490, 131230, 65615, 78740, 15, 26], [87660, 219155, 109575, 131490, 18, 29], [146395, 365985, 182995, 219590, 22, 32], [244480, 611195, 305600, 366715, 27, 35], [408280, 1020695, 510350, 612420, 32, 38], [681825, 1704565, 852280, 1022740, 38, 41], [1138650, 2846620, 1423310, 1707970, 38, 44], [1901540, 4753855, 2376925, 2852315, 38, 47], [3175575, 7938935, 3969470, 4763360, 38, 50], [5303210, 13258025, 6629015, 7954815, 38, 53], [8856360, 22140900, 11070450, 13284540, 38, 56]], [[0, 0, 0, 0, 0, 0], [80, 40, 80, 50, 1, 2], [135, 65, 135, 85, 1, 3], [225, 110, 225, 140, 2, 4], [375, 185, 375, 235, 2, 5], [620, 310, 620, 390, 2, 6], [1040, 520, 1040, 650, 3, 8], [1735, 870, 1735, 1085, 4, 10], [2900, 1450, 2900, 1810, 4, 12], [4840, 2420, 4840, 3025, 5, 14], [8080, 4040, 8080, 5050, 6, 16], [13500, 6750, 13500, 8435, 7, 18], [22540, 11270, 22540, 14090, 9, 20], [37645, 18820, 37645, 23525, 11, 22], [62865, 31430, 62865, 39290, 13, 24], [104985, 52490, 104985, 65615, 15, 26], [175320, 87660, 175320, 109575, 18, 29], [292790, 146395, 292790, 182995, 22, 32], [488955, 244480, 488955, 305600, 27, 35], [816555, 408280, 816555, 510350, 32, 38], [1363650, 681825, 1363650, 852280, 38, 41], [2277295, 1138650, 2277295, 1423310, 38, 44], [3803085, 1901540, 3803085, 2376925, 38, 47], [6351150, 3175575, 6351150, 3969470, 38, 50], [10606420, 5303210, 10606420, 6629015, 38, 53], [17712720, 8856360, 17712720, 11070450, 38, 56]], [[0, 0, 0, 0, 0, 0], [100, 80, 30, 60, 1, 3], [165, 135, 50, 100, 1, 5], [280, 225, 85, 165, 2, 7], [465, 375, 140, 280, 2, 9], [780, 620, 235, 465, 2, 11], [1300, 1040, 390, 780, 3, 13], [2170, 1735, 650, 1300, 4, 15], [3625, 2900, 1085, 2175, 4, 17], [6050, 4840, 1815, 3630, 5, 19], [10105, 8080, 3030, 6060, 6, 21], [16870, 13500, 5060, 10125, 7, 24], [28175, 22540, 8455, 16905, 9, 27], [47055, 37645, 14115, 28230, 11, 30], [78580, 62865, 23575, 47150, 13, 33], [131230, 104985, 39370, 78740, 15, 36], [219155, 175320, 65745, 131490, 18, 39], [365985, 292790, 109795, 219590, 22, 42], [611195, 488955, 183360, 366715, 27, 45], [1020695, 816555, 306210, 612420, 32, 48], [1704565, 1363650, 511370, 1022740, 38, 51], [2846620, 2277295, 853985, 1707970, 38, 54], [4753855, 3803085, 1426155, 2852315, 38, 57], [7938935, 6351150, 2381680, 4763360, 38, 60], [13258025, 10606420, 3977410, 7954815, 38, 63], [22140900, 17712720, 6642270, 13284540, 38, 66]], [[0, 0, 0, 0, 0, 0], [70, 90, 70, 20, 1, 0], [115, 150, 115, 35, 1, 0], [195, 250, 195, 55, 2, 0], [325, 420, 325, 95, 2, 0], [545, 700, 545, 155, 2, 0], [910, 1170, 910, 260, 3, 1], [1520, 1950, 1520, 435, 4, 2], [2535, 3260, 2535, 725, 4, 3], [4235, 5445, 4235, 1210, 5, 4], [7070, 9095, 7070, 2020, 6, 5], [11810, 15185, 11810, 3375, 7, 6], [19725, 25360, 19725, 5635, 9, 7], [32940, 42350, 32940, 9410, 11, 8], [55005, 70720, 55005, 15715, 13, 9], [91860, 118105, 91860, 26245, 15, 10], [153405, 197240, 153405, 43830, 18, 12], [256190, 329385, 256190, 73195, 22, 14], [427835, 550075, 427835, 122240, 27, 16], [714485, 918625, 714485, 204140, 32, 18], [1193195, 1534105, 1193195, 340915, 38, 20], [1992635, 2561960, 1992635, 569325, 38, 22], [3327700, 4278470, 3327700, 950770, 38, 24], [5557255, 7145045, 5557255, 1587785, 38, 26], [9280620, 11932225, 9280620, 2651605, 38, 28], [15498630, 19926810, 15498630, 4428180, 38, 30]], [[0, 0, 0, 0, 0, 0], [520, 380, 290, 90, 1, 4], [935, 685, 520, 160, 1, 6], [1685, 1230, 940, 290, 2, 8], [3035, 2215, 1690, 525, 2, 10], [5460, 3990, 3045, 945, 2, 12]], [[0, 0, 0, 0, 0, 0], [440, 480, 320, 50, 1, 3], [790, 865, 575, 90, 1, 5], [1425, 1555, 1035, 160, 2, 7], [2565, 2800, 1865, 290, 2, 9], [4620, 5040, 3360, 525, 2, 11]], [[0, 0, 0, 0, 0, 0], [200, 450, 510, 120, 1, 6], [360, 810, 920, 215, 1, 9], [650, 1460, 1650, 390, 2, 12], [1165, 2625, 2975, 700, 2, 15], [2100, 4725, 5355, 1260, 2, 18]], [[0, 0, 0, 0, 0, 0], [500, 440, 380, 1240, 1, 3], [900, 790, 685, 2230, 1, 5], [1620, 1425, 1230, 4020, 2, 7], [2915, 2565, 2215, 7230, 2, 9], [5250, 4620, 3990, 13015, 2, 11]], [[0, 0, 0, 0, 0, 0], [1200, 1480, 870, 1600, 1, 4], [2160, 2665, 1565, 2880, 1, 6], [3890, 4795, 2820, 5185, 2, 8], [7e3, 8630, 5075, 9330, 2, 10], [12595, 15535, 9135, 16795, 2, 12]], [[0, 0, 0, 0, 0, 0], [130, 160, 90, 40, 1, 1], [165, 205, 115, 50, 1, 2], [215, 260, 145, 65, 2, 3], [275, 335, 190, 85, 2, 4], [350, 430, 240, 105, 2, 5], [445, 550, 310, 135, 3, 6], [570, 705, 395, 175, 4, 7], [730, 900, 505, 225, 4, 8], [935, 1155, 650, 290, 5, 9], [1200, 1475, 830, 370, 6, 10], [1535, 1890, 1065, 470, 7, 12], [1965, 2420, 1360, 605, 9, 14], [2515, 3095, 1740, 775, 11, 16], [3220, 3960, 2230, 990, 13, 18], [4120, 5070, 2850, 1270, 15, 20], [5275, 6490, 3650, 1625, 18, 22], [6750, 8310, 4675, 2075, 22, 24], [8640, 10635, 5980, 2660, 27, 26], [11060, 13610, 7655, 3405, 32, 28], [14155, 17420, 9800, 4355, 38, 30]], [[0, 0, 0, 0, 0, 0], [80, 100, 70, 20, 1, 1], [100, 130, 90, 25, 1, 2], [130, 165, 115, 35, 2, 3], [170, 210, 145, 40, 2, 4], [215, 270, 190, 55, 2, 5], [275, 345, 240, 70, 3, 6], [350, 440, 310, 90, 4, 7], [450, 565, 395, 115, 4, 8], [575, 720, 505, 145, 5, 9], [740, 920, 645, 185, 6, 10], [945, 1180, 825, 235, 7, 12], [1210, 1510, 1060, 300, 9, 14], [1545, 1935, 1355, 385, 11, 16], [1980, 2475, 1735, 495, 13, 18], [2535, 3170, 2220, 635, 15, 20], [3245, 4055, 2840, 810, 18, 22], [4155, 5190, 3635, 1040, 22, 24], [5315, 6645, 4650, 1330, 27, 26], [6805, 8505, 5955, 1700, 32, 28], [8710, 10890, 7620, 2180, 38, 30]], [[0, 0, 0, 0, 0, 0], [170, 200, 380, 130, 2, 4], [220, 255, 485, 165, 3, 6], [280, 330, 625, 215, 3, 8], [355, 420, 795, 275, 4, 10], [455, 535, 1020, 350, 5, 12], [585, 685, 1305, 445, 6, 15], [750, 880, 1670, 570, 7, 18], [955, 1125, 2140, 730, 9, 21], [1225, 1440, 2740, 935, 10, 24], [1570, 1845, 3505, 1200, 12, 27], [2005, 2360, 4485, 1535, 15, 30], [2570, 3020, 5740, 1965, 18, 33], [3290, 3870, 7350, 2515, 21, 36], [4210, 4950, 9410, 3220, 26, 39], [5390, 6340, 12045, 4120, 31, 42], [6895, 8115, 15415, 5275, 37, 46], [8825, 10385, 19730, 6750, 44, 50], [11300, 13290, 25255, 8640, 53, 54], [14460, 17015, 32325, 11060, 64, 58], [18510, 21780, 41380, 14155, 77, 62]], [[0, 0, 0, 0, 0, 0], [180, 250, 500, 160, 2, 4], [230, 320, 640, 205, 3, 6], [295, 410, 820, 260, 3, 8], [375, 525, 1050, 335, 4, 10], [485, 670, 1340, 430, 5, 12], [620, 860, 1720, 550, 6, 15], [790, 1100, 2200, 705, 7, 18], [1015, 1405, 2815, 900, 9, 21], [1295, 1800, 3605, 1155, 10, 24], [1660, 2305, 4610, 1475, 12, 27], [2125, 2950, 5905, 1890, 15, 30], [2720, 3780, 7555, 2420, 18, 33], [3480, 4835, 9670, 3095, 21, 36], [4455, 6190, 12380, 3960, 26, 39], [5705, 7925, 15845, 5070, 31, 42], [7300, 10140, 20280, 6490, 37, 46], [9345, 12980, 25960, 8310, 44, 50], [11965, 16615, 33230, 10635, 53, 54], [15315, 21270, 42535, 13610, 64, 58], [19600, 27225, 54445, 17420, 77, 62]], [[0, 0, 0, 0, 0, 0], [1750, 2250, 1530, 240, 1, 1], [2240, 2880, 1960, 305, 1, 2], [2865, 3685, 2505, 395, 2, 3], [3670, 4720, 3210, 505, 2, 4], [4700, 6040, 4105, 645, 2, 5], [6015, 7730, 5255, 825, 3, 6], [7695, 9895, 6730, 1055, 4, 7], [9850, 12665, 8615, 1350, 4, 8], [12610, 16215, 11025, 1730, 5, 9], [16140, 20755, 14110, 2215, 6, 10], [20660, 26565, 18065, 2835, 7, 12], [26445, 34e3, 23120, 3625, 9, 14], [33850, 43520, 29595, 4640, 11, 16], [43330, 55705, 37880, 5940, 13, 18], [55460, 71305, 48490, 7605, 15, 20], [70990, 91270, 62065, 9735, 18, 22], [90865, 116825, 79440, 12460, 22, 24], [116305, 149540, 101685, 15950, 27, 26], [148875, 191410, 130160, 20415, 32, 28], [190560, 245005, 166600, 26135, 38, 30]], [[0, 0, 0, 0, 0, 0], [70, 40, 60, 20, 2, 2], [90, 50, 75, 25, 3, 3], [115, 65, 100, 35, 3, 4], [145, 85, 125, 40, 4, 5], [190, 105, 160, 55, 5, 6], [240, 135, 205, 70, 6, 8], [310, 175, 265, 90, 7, 10], [395, 225, 340, 115, 9, 12], [505, 290, 430, 145, 10, 14], [645, 370, 555, 185, 12, 16], [825, 470, 710, 235, 15, 18], [1060, 605, 905, 300, 18, 20], [1355, 775, 1160, 385, 21, 22], [1735, 990, 1485, 495, 26, 24], [2220, 1270, 1900, 635, 31, 26], [2840, 1625, 2435, 810, 37, 29], [3635, 2075, 3115, 1040, 44, 32], [4650, 2660, 3990, 1330, 53, 35], [5955, 3405, 5105, 1700, 64, 38], [7620, 4355, 6535, 2180, 77, 41]], [[0, 0, 0, 0, 0, 0], [110, 160, 90, 70, 1, 1], [140, 205, 115, 90, 1, 2], [180, 260, 145, 115, 2, 3], [230, 335, 190, 145, 2, 4], [295, 430, 240, 190, 2, 5], [380, 550, 310, 240, 3, 6], [485, 705, 395, 310, 4, 7], [620, 900, 505, 395, 4, 8], [795, 1155, 650, 505, 5, 9], [1015, 1475, 830, 645, 6, 10], [1300, 1890, 1065, 825, 7, 12], [1660, 2420, 1360, 1060, 9, 14], [2130, 3095, 1740, 1355, 11, 16], [2725, 3960, 2230, 1735, 13, 18], [3485, 5070, 2850, 2220, 15, 20], [4460, 6490, 3650, 2840, 18, 22], [5710, 8310, 4675, 3635, 22, 24], [7310, 10635, 5980, 4650, 27, 26], [9360, 13610, 7655, 5955, 32, 28], [11980, 17420, 9800, 7620, 38, 30]], [[0, 0, 0, 0, 0, 0], [80, 70, 120, 70, 4, 4], [100, 90, 155, 90, 4, 6], [130, 115, 195, 115, 5, 8], [170, 145, 250, 145, 6, 10], [215, 190, 320, 190, 7, 12], [275, 240, 410, 240, 9, 15], [350, 310, 530, 310, 11, 18], [450, 395, 675, 395, 13, 21], [575, 505, 865, 505, 15, 24], [740, 645, 1105, 645, 19, 27], [945, 825, 1415, 825, 22, 30], [1210, 1060, 1815, 1060, 27, 33], [1545, 1355, 2320, 1355, 32, 38], [1980, 1735, 2970, 1735, 39, 41], [2535, 2220, 3805, 2220, 46, 44], [3245, 2840, 4870, 2840, 55, 48], [4155, 3635, 6230, 3635, 67, 52], [5315, 4650, 7975, 4650, 80, 56], [6805, 5955, 10210, 5955, 96, 60], [8710, 7620, 13065, 7620, 115, 64]], [[0, 0, 0, 0, 0, 0], [180, 130, 150, 80, 5, 3], [230, 165, 190, 100, 6, 5], [295, 215, 245, 130, 7, 7], [375, 275, 315, 170, 8, 9], [485, 350, 405, 215, 10, 11], [620, 445, 515, 275, 12, 13], [790, 570, 660, 350, 14, 15], [1015, 730, 845, 450, 17, 17], [1295, 935, 1080, 575, 21, 19], [1660, 1200, 1385, 740, 25, 21], [2125, 1535, 1770, 945, 30, 24], [2720, 1965, 2265, 1210, 36, 27], [3480, 2515, 2900, 1545, 43, 30], [4455, 3220, 3715, 1980, 51, 33], [5705, 4120, 4755, 2535, 62, 36], [7300, 5275, 6085, 3245, 74, 39], [9345, 6750, 7790, 4155, 89, 42], [11965, 8640, 9970, 5315, 106, 45], [15315, 11060, 12760, 6805, 128, 48], [19600, 14155, 16335, 8710, 153, 51]], [[0, 0, 0, 0, 0, 0], [210, 140, 260, 120, 1, 4], [270, 180, 335, 155, 1, 6], [345, 230, 425, 195, 2, 8], [440, 295, 545, 250, 2, 10], [565, 375, 700, 320, 2, 12], [720, 480, 895, 410, 3, 15], [925, 615, 1145, 530, 4, 18], [1180, 790, 1465, 675, 4, 21], [1515, 1010, 1875, 865, 5, 24], [1935, 1290, 2400, 1105, 6, 27], [2480, 1655, 3070, 1415, 7, 30], [3175, 2115, 3930, 1815, 9, 33], [4060, 2710, 5030, 2320, 11, 36], [5200, 3465, 6435, 2970, 13, 39], [6655, 4435, 8240, 3805, 15, 42], [8520, 5680, 10545, 4870, 18, 46], [10905, 7270, 13500, 6230, 22, 50], [13955, 9305, 17280, 7975, 27, 54], [17865, 11910, 22120, 10210, 32, 58], [22865, 15245, 28310, 13065, 38, 62]], [[0, 0, 0, 0, 0, 0], [260, 140, 220, 100, 2, 5], [335, 180, 280, 130, 3, 8], [425, 230, 360, 165, 3, 11], [545, 295, 460, 210, 4, 14], [700, 375, 590, 270, 5, 17], [895, 480, 755, 345, 6, 20], [1145, 615, 970, 440, 7, 23], [1465, 790, 1240, 565, 9, 26], [1875, 1010, 1585, 720, 10, 29], [2400, 1290, 2030, 920, 12, 32], [3070, 1655, 2595, 1180, 15, 36], [3930, 2115, 3325, 1510, 18, 40], [5030, 2710, 4255, 1935, 21, 44], [6435, 3465, 5445, 2475, 26, 48], [8240, 4435, 6970, 3170, 31, 52], [10545, 5680, 8925, 4055, 37, 56], [13500, 7270, 11425, 5190, 44, 60], [17280, 9305, 14620, 6645, 53, 64], [22120, 11910, 18715, 8505, 64, 68], [28310, 15245, 23955, 10890, 77, 72]], [[0, 0, 0, 0, 0, 0], [460, 510, 600, 320, 4, 3], [590, 655, 770, 410, 4, 5], [755, 835, 985, 525, 5, 7], [965, 1070, 1260, 670, 6, 9], [1235, 1370, 1610, 860, 7, 11], [1580, 1750, 2060, 1100, 9, 13], [2025, 2245, 2640, 1405, 11, 15], [2590, 2870, 3380, 1800, 13, 17], [3315, 3675, 4325, 2305, 15, 19], [4245, 4705, 5535, 2950, 19, 21], [5430, 6020, 7085, 3780, 22, 24], [6950, 7705, 9065, 4835, 27, 27], [8900, 9865, 11605, 6190, 32, 30], [11390, 12625, 14855, 7925, 39, 33], [14580, 16165, 19015, 10140, 46, 36], [18660, 20690, 24340, 12980, 55, 39], [23885, 26480, 31155, 16615, 67, 42], [30570, 33895, 39875, 21270, 80, 45], [39130, 43385, 51040, 27225, 96, 48], [50090, 55535, 65335, 34845, 115, 51]], [[0, 0, 0, 0, 0, 0], [220, 160, 90, 40, 5, 4], [280, 205, 115, 50, 6, 6], [360, 260, 145, 65, 7, 8], [460, 335, 190, 85, 8, 10], [590, 430, 240, 105, 10, 12], [755, 550, 310, 135, 12, 15], [970, 705, 395, 175, 14, 18], [1240, 900, 505, 225, 17, 21], [1585, 1155, 650, 290, 21, 24], [2030, 1475, 830, 370, 25, 27], [2595, 1890, 1065, 470, 30, 30], [3325, 2420, 1360, 605, 36, 33], [4255, 3095, 1740, 775, 43, 36], [5445, 3960, 2230, 990, 51, 39], [6970, 5070, 2850, 1270, 62, 42], [8925, 6490, 3650, 1625, 74, 46], [11425, 8310, 4675, 2075, 89, 50], [14620, 10635, 5980, 2660, 106, 54], [18715, 13610, 7655, 3405, 128, 58], [23955, 17420, 9800, 4355, 153, 62]], [[0, 0, 0, 0, 0, 0], [40, 50, 30, 10, 1, 0], [50, 65, 40, 15, 1, 0], [65, 80, 50, 15, 2, 0], [85, 105, 65, 20, 2, 0], [105, 135, 80, 25, 2, 0], [135, 170, 105, 35, 3, 1], [175, 220, 130, 45, 4, 2], [225, 280, 170, 55, 4, 3], [290, 360, 215, 70, 5, 4], [370, 460, 275, 90, 6, 5]], [[0, 0, 0, 0, 0, 0], [1250, 1110, 1260, 600, 6, 4], [1600, 1420, 1615, 770, 7, 6], [2050, 1820, 2065, 985, 9, 8], [2620, 2330, 2640, 1260, 10, 10], [3355, 2980, 3380, 1610, 12, 12], [4295, 3815, 4330, 2060, 15, 15], [5500, 4880, 5540, 2640, 18, 18], [7035, 6250, 7095, 3380, 21, 21], [9005, 8e3, 9080, 4325, 26, 24], [11530, 10240, 11620, 5535, 31, 27], [14755, 13105, 14875, 7085, 37, 30], [18890, 16775, 19040, 9065, 45, 33], [24180, 21470, 24370, 11605, 53, 36], [30950, 27480, 31195, 14855, 64, 39], [39615, 35175, 39930, 19015, 77, 42], [50705, 45025, 51110, 24340, 92, 46], [64905, 57635, 65425, 31155, 111, 50], [83075, 73770, 83740, 39875, 133, 54], [106340, 94430, 107190, 51040, 160, 58], [136115, 120870, 137200, 65335, 192, 62]], [[0, 0, 0, 0, 0, 0], [580, 460, 350, 180, 2, 1], [740, 590, 450, 230, 3, 2], [950, 755, 575, 295, 3, 3], [1215, 965, 735, 375, 4, 4], [1555, 1235, 940, 485, 5, 5], [1995, 1580, 1205, 620, 6, 6], [2550, 2025, 1540, 790, 7, 7], [3265, 2590, 1970, 1015, 9, 8], [4180, 3315, 2520, 1295, 11, 9], [5350, 4245, 3230, 1660, 12, 10], [6845, 5430, 4130, 2125, 15, 12], [8765, 6950, 5290, 2720, 18, 14], [11220, 8900, 6770, 3480, 21, 16], [14360, 11390, 8665, 4455, 26, 18], [18380, 14580, 11090, 5705, 31, 20], [23530, 18660, 14200, 7300, 37, 22], [30115, 23885, 18175, 9345, 44, 24], [38550, 30570, 23260, 11965, 53, 26], [49340, 39130, 29775, 15315, 64, 28], [63155, 50090, 38110, 19600, 77, 30]], [[0, 0, 0, 0, 0, 0], [550, 800, 750, 250, 6, 1], [705, 1025, 960, 320, 7, 2], [900, 1310, 1230, 410, 9, 3], [1155, 1680, 1575, 525, 10, 4], [1475, 2145, 2015, 670, 12, 5], [1890, 2750, 2575, 860, 15, 6], [2420, 3520, 3300, 1100, 18, 7], [3095, 4505, 4220, 1405, 21, 8], [3965, 5765, 5405, 1800, 26, 9], [5075, 7380, 6920, 2305, 31, 10], [6495, 9445, 8855, 2950, 37, 12], [8310, 12090, 11335, 3780, 45, 14], [10640, 15475, 14505, 4835, 53, 16], [13615, 19805, 18570, 6190, 64, 18], [17430, 25355, 23770, 7925, 77, 20], [22310, 32450, 30425, 10140, 92, 22], [28560, 41540, 38940, 12980, 111, 24], [36555, 53170, 49845, 16615, 133, 26], [46790, 68055, 63805, 21270, 160, 28], [59890, 87110, 81670, 27225, 192, 30]], [[0, 0, 0, 0, 0, 0], [2880, 2740, 2580, 990, 7, 4], [3630, 3450, 3250, 1245, 9, 6], [4570, 4350, 4095, 1570, 10, 8], [5760, 5480, 5160, 1980, 12, 10], [7260, 6905, 6505, 2495, 15, 12], [9145, 8700, 8195, 3145, 18, 15], [11525, 10965, 10325, 3960, 21, 18], [14520, 13815, 13010, 4990, 26, 21], [18295, 17405, 16390, 6290, 31, 24], [23055, 21930, 20650, 7925, 37, 27], [29045, 27635, 26020, 9985, 45, 30], [36600, 34820, 32785, 12580, 53, 33], [46115, 43875, 41310, 15850, 64, 36], [58105, 55280, 52050, 19975, 77, 39], [73210, 69655, 65585, 25165, 92, 42], [92245, 87760, 82640, 31710, 111, 46], [116230, 110580, 104125, 39955, 133, 50], [146450, 139330, 131195, 50340, 160, 54], [184530, 175560, 165305, 63430, 192, 58], [232505, 221205, 208285, 79925, 230, 62]], [[0, 0, 0, 0, 0, 0], [1400, 1330, 1200, 400, 4, 3], [1790, 1700, 1535, 510, 4, 5], [2295, 2180, 1965, 655, 5, 7], [2935, 2790, 2515, 840, 6, 9], [3760, 3570, 3220, 1075, 7, 11], [4810, 4570, 4125, 1375, 9, 13], [6155, 5850, 5280, 1760, 11, 15], [7880, 7485, 6755, 2250, 13, 17], [10090, 9585, 8645, 2880, 15, 19], [12915, 12265, 11070, 3690, 19, 21], [16530, 15700, 14165, 4720, 22, 24], [21155, 20100, 18135, 6045, 27, 27], [27080, 25725, 23210, 7735, 32, 30], [34660, 32930, 29710, 9905, 39, 33], [44370, 42150, 38030, 12675, 46, 36], [56790, 53950, 48680, 16225, 55, 39], [72690, 69060, 62310, 20770, 67, 42], [93045, 88395, 79755, 26585, 80, 45], [119100, 113145, 102085, 34030, 96, 48], [152445, 144825, 130670, 43555, 115, 51]], [[0, 0, 0, 0, 0, 0], [630, 420, 780, 360, 1, 4], [805, 540, 1e3, 460, 1, 6], [1030, 690, 1280, 590, 2, 8], [1320, 880, 1635, 755, 2, 10], [1690, 1125, 2095, 965, 2, 12], [2165, 1445, 2680, 1235, 3, 15], [2770, 1845, 3430, 1585, 4, 18], [3545, 2365, 4390, 2025, 4, 21], [4540, 3025, 5620, 2595, 5, 24], [5810, 3875, 7195, 3320, 6, 27], [7440, 4960, 9210, 4250, 7, 30], [9520, 6345, 11785, 5440, 9, 33], [12185, 8125, 15085, 6965, 11, 36], [15600, 10400, 19310, 8915, 13, 39], [19965, 13310, 24720, 11410, 15, 42], [25555, 17035, 31640, 14605, 18, 46], [32710, 21810, 40500, 18690, 22, 50], [41870, 27915, 51840, 23925, 27, 54], [53595, 35730, 66355, 30625, 32, 58], [68600, 45735, 84935, 39200, 38, 62]], [[0, 0, 0, 0, 0, 0], [780, 420, 660, 300, 2, 5], [1e3, 540, 845, 385, 3, 8], [1280, 690, 1080, 490, 3, 11], [1635, 880, 1385, 630, 4, 14], [2095, 1125, 1770, 805, 5, 17], [2680, 1445, 2270, 1030, 6, 20], [3430, 1845, 2905, 1320, 7, 23], [4390, 2365, 3715, 1690, 9, 26], [5620, 3025, 4755, 2160, 10, 29], [7195, 3875, 6085, 2765, 12, 32], [9210, 4960, 7790, 3540, 15, 36], [11785, 6345, 9975, 4535, 18, 40], [15085, 8125, 12765, 5805, 21, 44], [19310, 10400, 16340, 7430, 26, 48], [24720, 13310, 20915, 9505, 31, 52], [31640, 17035, 26775, 12170, 37, 56], [40500, 21810, 34270, 15575, 44, 60], [51840, 27915, 43865, 19940, 53, 64], [66355, 35730, 56145, 25520, 64, 68], [84935, 45735, 71870, 32665, 77, 72]], [[0, 0, 0, 0, 0, 0], [70, 90, 170, 70, 1, 0], [90, 115, 220, 90, 1, 0], [115, 145, 280, 115, 2, 0], [145, 190, 355, 145, 2, 0], [190, 240, 455, 190, 2, 0], [240, 310, 585, 240, 3, 1], [310, 395, 750, 310, 4, 2], [395, 505, 955, 395, 4, 3], [505, 650, 1225, 505, 5, 4], [645, 830, 1570, 645, 6, 5], [825, 1065, 2005, 825, 7, 6], [1060, 1360, 2570, 1060, 9, 7], [1355, 1740, 3290, 1355, 11, 8], [1735, 2230, 4210, 1735, 13, 9], [2220, 2850, 5390, 2220, 15, 10], [2840, 3650, 6895, 2840, 18, 12], [3635, 4675, 8825, 3635, 22, 14], [4650, 5980, 11300, 4650, 27, 16], [5955, 7655, 14460, 5955, 32, 18], [7620, 9800, 18510, 7620, 38, 20]], [[0, 0, 0, 0, 0, 0], [120, 200, 0, 80, 1, 0], [155, 255, 0, 100, 1, 0], [195, 330, 0, 130, 2, 0], [250, 420, 0, 170, 2, 0], [320, 535, 0, 215, 2, 0], [410, 685, 0, 275, 3, 1], [530, 880, 0, 350, 4, 2], [675, 1125, 0, 450, 4, 3], [865, 1440, 0, 575, 5, 4], [1105, 1845, 0, 740, 6, 5], [1415, 2360, 0, 945, 7, 6], [1815, 3020, 0, 1210, 9, 7], [2320, 3870, 0, 1545, 11, 8], [2970, 4950, 0, 1980, 13, 9], [3805, 6340, 0, 2535, 15, 10], [4870, 8115, 0, 3245, 18, 12], [6230, 10385, 0, 4155, 22, 14], [7975, 13290, 0, 5315, 27, 16], [10210, 17015, 0, 6805, 32, 18], [13065, 21780, 0, 8710, 38, 20]], [[0, 0, 0, 0, 0, 0], [160, 100, 80, 60, 1, 0], [205, 130, 100, 75, 1, 0], [260, 165, 130, 100, 2, 0], [335, 210, 170, 125, 2, 0], [430, 270, 215, 160, 2, 0], [550, 345, 275, 205, 3, 1], [705, 440, 350, 265, 4, 2], [900, 565, 450, 340, 4, 3], [1155, 720, 575, 430, 5, 4], [1475, 920, 740, 555, 6, 5], [1890, 1180, 945, 710, 7, 6], [2420, 1510, 1210, 905, 9, 7], [3095, 1935, 1545, 1160, 11, 8], [3960, 2475, 1980, 1485, 13, 9], [5070, 3170, 2535, 1900, 15, 10], [6490, 4055, 3245, 2435, 18, 12], [8310, 5190, 4155, 3115, 22, 14], [10635, 6645, 5315, 3990, 27, 16], [13610, 8505, 6805, 5105, 32, 18], [17420, 10890, 8710, 6535, 38, 20]], [[0, 0, 0, 0, 0, 0], [155, 130, 125, 70, 1, 2], [200, 165, 160, 90, 1, 3], [255, 215, 205, 115, 2, 4], [325, 275, 260, 145, 2, 5], [415, 350, 335, 190, 2, 6], [535, 445, 430, 240, 3, 8], [680, 570, 550, 310, 4, 10], [875, 730, 705, 395, 4, 12], [1115, 935, 900, 505, 5, 14], [1430, 1200, 1155, 645, 6, 16], [1830, 1535, 1475, 825, 7, 18], [2340, 1965, 1890, 1060, 9, 20], [3e3, 2515, 2420, 1355, 11, 22], [3840, 3220, 3095, 1735, 13, 24], [4910, 4120, 3960, 2220, 15, 26], [6290, 5275, 5070, 2840, 18, 29], [8050, 6750, 6490, 3635, 22, 32], [10300, 8640, 8310, 4650, 27, 35], [13185, 11060, 10635, 5955, 32, 38], [16880, 14155, 13610, 7620, 38, 41]], [[0, 0, 0, 0, 0, 0], [1460, 930, 1250, 1740, 5, 6], [2045, 1300, 1750, 2435, 6, 9], [2860, 1825, 2450, 3410, 7, 12], [4005, 2550, 3430, 4775, 8, 15], [5610, 3575, 4800, 6685, 10, 18], [7850, 5e3, 6725, 9360, 12, 22], [10995, 7e3, 9410, 13100, 14, 26], [15390, 9805, 13175, 18340, 17, 30], [21545, 13725, 18445, 25680, 21, 34], [30165, 19215, 25825, 35950, 25, 38]], [[0, 0, 0, 0, 0, 0], [80, 120, 70, 90, 1, 4], [100, 155, 90, 115, 1, 6], [130, 195, 115, 145, 2, 8], [170, 250, 145, 190, 2, 10], [215, 320, 190, 240, 2, 12], [275, 410, 240, 310, 3, 15], [350, 530, 310, 395, 4, 18], [450, 675, 395, 505, 4, 21], [575, 865, 505, 650, 5, 24], [740, 1105, 645, 830, 6, 27], [945, 1415, 825, 1065, 7, 30], [1210, 1815, 1060, 1360, 9, 33], [1545, 2320, 1355, 1740, 11, 36], [1980, 2970, 1735, 2230, 13, 39], [2535, 3805, 2220, 2850, 15, 42], [3245, 4870, 2840, 3650, 18, 46], [4155, 6230, 3635, 4675, 22, 50], [5315, 7975, 4650, 5980, 27, 54], [6805, 10210, 5955, 7655, 32, 58], [8710, 13065, 7620, 9800, 38, 62]], [[0, 0, 0, 0, 0, 0], [700, 670, 700, 240, 1, 2], [930, 890, 930, 320, 1, 3], [1240, 1185, 1240, 425, 2, 4], [1645, 1575, 1645, 565, 2, 5], [2190, 2095, 2190, 750, 2, 6], [2915, 2790, 2915, 1e3, 3, 8], [3875, 3710, 3875, 1330, 4, 10], [5155, 4930, 5155, 1765, 4, 12], [6855, 6560, 6855, 2350, 5, 14], [9115, 8725, 9115, 3125, 6, 16], [12125, 11605, 12125, 4155, 7, 18], [16125, 15435, 16125, 5530, 9, 20], [21445, 20525, 21445, 7350, 11, 22], [28520, 27300, 28520, 9780, 13, 24], [37935, 36310, 37935, 13005, 15, 24], [50450, 48290, 50450, 17300, 18, 27], [67100, 64225, 67100, 23005, 22, 30], [89245, 85420, 89245, 30600, 27, 33], [118695, 113605, 118695, 40695, 32, 36], [157865, 151095, 157865, 54125, 37, 39]], [[0, 0, 0, 0, 0, 0, 0], [650, 800, 450, 200, 1, 1], [830, 1025, 575, 255, 1, 2], [1065, 1310, 735, 330, 2, 3], [1365, 1680, 945, 420, 2, 4], [1745, 2145, 1210, 535, 2, 5], [2235, 2750, 1545, 685, 3, 6], [2860, 3520, 1980, 880, 4, 7], [3660, 4505, 2535, 1125, 4, 8], [4685, 5765, 3245, 1440, 5, 9], [5995, 7380, 4150, 1845, 6, 10], [7675, 9445, 5315, 2360, 7, 12], [9825, 12090, 6800, 3020, 9, 14], [12575, 15475, 8705, 3870, 11, 16], [16095, 19805, 11140, 4950, 13, 18], [20600, 25355, 14260, 6340, 15, 20], [26365, 32450, 18255, 8115, 18, 22], [33750, 41540, 23365, 10385, 22, 24], [43200, 53170, 29910, 13290, 27, 26], [55295, 68055, 38280, 17015, 32, 28], [70780, 87110, 49e3, 21780, 38, 30]], [[0, 0, 0, 0, 0, 0], [400, 500, 350, 100, 1], [510, 640, 450, 130, 1, 2], [655, 820, 575, 165, 2, 3], [840, 1050, 735, 210, 2, 4], [1075, 1340, 940, 270, 2, 5], [1375, 1720, 1205, 345, 3, 6], [1760, 2200, 1540, 440, 4, 7], [2250, 2815, 1970, 565, 4, 8], [2880, 3605, 2520, 720, 5, 9], [3690, 4610, 3230, 920, 6, 10], [4720, 5905, 4130, 1180, 7, 12], [6045, 7555, 5290, 1510, 9, 14], [7735, 9670, 6770, 1935, 11, 16], [9905, 12380, 8665, 2475, 13, 18], [12675, 15845, 11090, 3170, 15, 20], [16225, 20280, 14200, 4055, 18, 22], [20770, 25960, 18175, 5190, 22, 24], [26585, 33230, 23260, 6645, 27, 26], [34030, 42535, 29775, 8505, 32, 28], [43555, 54445, 38110, 10890, 38, 30]], [[0, 0, 0, 0, 0, 0], [66700, 69050, 72200, 13200, 0, 1], [68535, 70950, 74185, 13565, 0, 2], [70420, 72900, 76225, 13935, 0, 3], [72355, 74905, 78320, 14320, 0, 4], [74345, 76965, 80475, 14715, 0, 5], [76390, 79080, 82690, 15120, 0, 6], [78490, 81255, 84965, 15535, 0, 7], [80650, 83490, 87300, 15960, 0, 8], [82865, 85785, 89700, 16400, 0, 9], [85145, 88145, 92165, 16850, 0, 10], [87485, 90570, 94700, 17315, 0, 12], [89895, 93060, 97305, 17790, 0, 14], [92365, 95620, 99980, 18280, 0, 16], [94905, 98250, 102730, 18780, 0, 18], [97515, 100950, 105555, 19300, 0, 20], [100195, 103725, 108460, 19830, 0, 22], [102950, 106580, 111440, 20375, 0, 24], [105785, 109510, 114505, 20935, 0, 26], [108690, 112520, 117655, 21510, 0, 28], [111680, 115615, 120890, 22100, 0, 30], [114755, 118795, 124215, 22710, 0, 33], [117910, 122060, 127630, 23335, 0, 36], [121150, 125420, 131140, 23975, 0, 39], [124480, 128870, 134745, 24635, 0, 42], [127905, 132410, 138455, 25315, 0, 45], [131425, 136055, 142260, 26010, 0, 48], [135035, 139795, 146170, 26725, 0, 51], [138750, 143640, 150190, 27460, 0, 54], [142565, 147590, 154320, 28215, 0, 57], [146485, 151650, 158565, 28990, 0, 60], [150515, 155820, 162925, 29785, 0, 64], [154655, 160105, 167405, 30605, 0, 68], [158910, 164505, 172010, 31450, 0, 72], [163275, 169030, 176740, 32315, 0, 76], [167770, 173680, 181600, 33200, 0, 80], [172380, 178455, 186595, 34115, 0, 84], [177120, 183360, 191725, 35055, 0, 88], [181995, 188405, 197e3, 36015, 0, 92], [186995, 193585, 202415, 37005, 0, 96], [192140, 198910, 207985, 38025, 0, 100], [197425, 204380, 213705, 39070, 0, 105], [202855, 21e4, 219580, 40145, 0, 110], [208430, 215775, 225620, 41250, 0, 115], [214165, 221710, 231825, 42385, 0, 120], [220055, 227805, 238200, 43550, 0, 125], [226105, 234070, 244750, 44745, 0, 130], [232320, 240505, 251480, 45975, 0, 135], [238710, 247120, 258395, 47240, 0, 140], [245275, 253915, 265500, 48540, 0, 145], [252020, 260900, 272800, 49875, 0, 150], [258950, 268075, 280305, 51245, 0, 156], [266070, 275445, 288010, 52655, 0, 162], [273390, 283020, 295930, 54105, 0, 168], [280905, 290805, 304070, 55590, 0, 174], [288630, 298800, 312430, 57120, 0, 180], [296570, 307020, 321025, 58690, 0, 186], [304725, 315460, 329850, 60305, 0, 192], [313105, 324135, 338925, 61965, 0, 198], [321715, 333050, 348245, 63670, 0, 204], [330565, 342210, 357820, 65420, 0, 210], [339655, 351620, 367660, 67220, 0, 217], [348995, 361290, 377770, 69065, 0, 224], [358590, 371225, 388160, 70965, 0, 231], [368450, 381435, 398835, 72915, 0, 238], [378585, 391925, 409800, 74920, 0, 245], [388995, 402700, 421070, 76985, 0, 252], [399695, 413775, 432650, 79100, 0, 259], [410685, 425155, 444550, 81275, 0, 266], [421980, 436845, 456775, 83510, 0, 273], [433585, 448860, 469335, 85805, 0, 280], [445505, 461205, 482240, 88165, 0, 288], [457760, 473885, 495505, 90590, 0, 296], [470345, 486920, 509130, 93080, 0, 304], [483280, 500310, 523130, 95640, 0, 312], [496570, 514065, 537520, 98270, 0, 320], [510225, 528205, 552300, 100975, 0, 328], [524260, 542730, 567490, 103750, 0, 336], [538675, 557655, 583095, 106605, 0, 344], [553490, 572990, 599130, 109535, 0, 352], [568710, 588745, 615605, 112550, 0, 360], [584350, 604935, 632535, 115645, 0, 369], [600420, 621575, 649930, 118825, 0, 378], [616930, 638665, 667800, 122090, 0, 387], [633895, 656230, 686165, 125450, 0, 396], [651330, 674275, 705035, 128900, 0, 405], [669240, 692820, 724425, 132445, 0, 414], [687645, 711870, 744345, 136085, 0, 423], [706555, 731445, 764815, 139830, 0, 432], [725985, 751560, 785850, 143675, 0, 441], [745950, 772230, 807460, 147625, 0, 450], [766460, 793465, 829665, 151685, 0, 460], [787540, 815285, 852480, 155855, 0, 470], [809195, 837705, 875920, 160140, 0, 480], [831450, 860745, 900010, 164545, 0, 490], [854315, 884415, 924760, 169070, 0, 500], [877810, 908735, 950190, 173720, 0, 510], [901950, 933725, 976320, 178495, 0, 520], [926750, 959405, 1e6, 183405, 0, 530], [952235, 985785, 1e6, 188450, 0, 540], [1e6, 1e6, 1e6, 193630, 0, 550]], [[0, 0, 0, 0, 0, 0], [780, 420, 660, 540, 4, 5], [1e3, 540, 845, 690, 4, 8], [1280, 690, 1080, 885, 5, 11], [1635, 880, 1385, 1130, 6, 14], [2095, 1125, 1770, 1450, 7, 17], [2680, 1445, 2270, 1855, 9, 20], [3430, 1845, 2905, 2375, 11, 23], [4390, 2365, 3715, 3040, 13, 26], [5620, 3025, 4755, 3890, 15, 29], [7195, 3875, 6085, 4980, 19, 31], [9210, 4960, 7790, 6375, 22, 35], [11785, 6345, 9975, 8160, 27, 39], [15085, 8125, 12765, 10445, 32, 43], [19310, 10400, 16340, 13370, 39, 47], [24720, 13310, 20915, 17115, 46, 51], [31640, 17035, 26775, 21905, 55, 55], [40500, 21810, 34270, 28040, 67, 59], [51840, 27915, 43865, 35890, 80, 63], [66355, 35730, 56145, 45940, 96, 67], [84935, 45735, 71870, 58800, 115, 71]]];

        function VillageMap() {
            var z = getPosition('TBL_D1_RES', '600px_150px');
            x = z.split('_')[1];
            y = z.split('_')[0];
            var Div = Create('div', { style: 'position: absolute; top: ' + y + '; left: ' + x + ';', id: 'TBL_D1_RES' });
            Div.align = 'center';
            var drgDIV = Create('div', { class: 'RES_drag' });
            drgDIV.innerHTML = '<img style="padding: 0px 0px 3px;  float: ' + (RTL == "rtl" ? "left" : "right") + '; cursor: pointer;" src="' + svnIMG(1) + '" />';
            MakeDrag(drgDIV, Div);

            var TBL = Create('table', { cellspacing: '2', class: 'front_res_table' });
            var TR = Create('tr');
            var TD = Create('td', { style: 'background-color:transparent;' });
            var border = ['border-top: 1px solid black;', 'border-left: 1px solid black;', 'border-right: 1px solid black;']
            for (i = 0; i < 4; i++) {
                var Table = Create('table', { cellspacing: '2' });
                Table.innerHTML = '<thead><tr><td class="res_header" style="' + border[0] + (i == 0 ? border[1] : '') + (i == 3 ? border[2] : '') + '"><img src="img/x.gif" class="r' + (i + 1) + '" /></td></tr></thead><tbody id="t4p_' + (i + 1) + '"></tbody>';
                TD.appendChild(Table);
            };

            TBL.appendChild(TD);
            TBL.appendChild(TR);
            Div.appendChild(drgDIV);
            Div.appendChild(TBL);
            document.body.appendChild(Div);
            fieldsOfVillage = {
                'f1': [3, 3, 0, 3, 3, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //9 crop
                'f2': [2, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //3-4-5-6
                'f3': [0, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-4-4-6
                'f4': [0, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-5-3-6
                'f5': [0, 3, 0, 2, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //5-3-4-6
                'f6': [3, 3, 0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3], //15 crop
                'f7': [0, 3, 3, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-4-3-7
                'f8': [2, 3, 3, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //3-4-4-7
                'f9': [2, 3, 3, 0, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-3-4-7
                'f10': [2, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //3-5-4-6
                'f11': [2, 0, 0, 2, 0, 3, 3, 2, 2, 1, 1, 2, 0, 3, 3, 1, 3, 3], //4-3-5-6
                'f12': [0, 3, 0, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1]  //5-4-3-6
            };
            var gid, TypeName, ImageClass, Level, Name, typeOfVillage = ID('village_map').getAttribute('class');
            for (i = 0; i < 18; i++) {
                gid = fieldsOfVillage[typeOfVillage][i] + 1;
                TypeName = gid;
                ImageClass = '';
                Level = ID('rx').getElementsByTagName('area')[i].alt.match(/\d+/);
                Name = $('map#rx area').eq(i).attr('alt');

                var Color = [];
                var TypeU;
                var CountTime = [];
                var img = [];
                var available = '';
                if (bCost[TypeName][Level]) {
                    if (bCost[TypeName][C(Level) + 1]) {
                        var wood = C(C(ID('l1').innerHTML) - C(bCost[TypeName][C(Level) + 1][0]));
                        var clay = C(C(ID('l2').innerHTML) - C(bCost[TypeName][C(Level) + 1][1]));
                        var iron = C(C(ID('l3').innerHTML) - C(bCost[TypeName][C(Level) + 1][2]));
                        var crop = C(C(ID('l4').innerHTML) - C(bCost[TypeName][C(Level) + 1][3]));

                        var NPC = C(C(crop) + C(iron) + C(clay) + C(wood));
                        var NPC_href = '<a href="build.php?t=3&gid=17&r1=' +
            C(bCost[TypeName][C(Level) + 1][0]) + '&r2=' +
            C(bCost[TypeName][C(Level) + 1][1]) + '&r3=' +
            C(bCost[TypeName][C(Level) + 1][2]) + '&r4=' +
            C(bCost[TypeName][C(Level) + 1][3]) + '"><img src="img/x.gif" class="npc" /></a>';

                        if (NPC > 0) { Color[5] = 'travian_NPC'; } else { Color[5] = 'red'; };

                        for (b = 0; b < 4; b++) { img[(b + 1)] = '<img src="img/x.gif" class="r' + (b + 1) + '" />'; Color[(b + 1)] = 'darkgreen'; };
                        if (wood < 0) { Color[1] = 'gray'; CountTime[1] = '<font style="font-size: 11px" class="xbTime">' + Time(wood, pro[0]) + '</font><br>'; } else { wood = '+' + wood + '<br>'; CountTime[1] = ''; };
                        if (clay < 0) { Color[2] = 'gray'; CountTime[2] = '<font style="font-size: 11px" class="xbTime">' + Time(clay, pro[1]) + '</font><br>'; } else { clay = '+' + clay + '<br>'; CountTime[2] = ''; };
                        if (iron < 0) { Color[3] = 'gray'; CountTime[3] = '<font style="font-size: 11px" class="xbTime">' + Time(iron, pro[2]) + '</font><br>'; } else { iron = '+' + iron + '<br>'; CountTime[3] = ''; };
                        if (crop < 0) { Color[4] = 'gray'; CountTime[4] = '<font style="font-size: 11px" class="xbTime">' + Time(crop, pro[3]) + '</font><br>'; } else { crop = '+' + crop + '<br>'; CountTime[4] = ''; };

                        var xCrop = C(C(bCost[TypeName][Level][5])) + ' -->' + C(C(bCost[TypeName][C(Level) + 1][5])) + ' =[+' + C(C(bCost[TypeName][C(Level) + 1][5]) - C(bCost[TypeName][Level][5])) + ']';
                        var pnx = C(C(bCost[TypeName][Level][4])) + ' -->' + C(C(bCost[TypeName][C(Level) + 1][4]))
                        var X = '<tr>' +
            '<td class="bList" id="T4x_B' + TypeName + '' + Level + '"><center><a href="build.php?gid=' + TypeName + '">' + Name + '</a></center><br>' +
            '<a href="build.php?gid=' + TypeName + '"><img src="' + imgc[TypeName] + '" title="' + Name + '" style="float: ' + (RTL == "rtl" ? "left" : "right") + ';" /></a>' +
            '<span style="float: left;">' +
            '' + img[1] + ' <font color="' + Color[1] + '" style="font-size: 11.5px">' + wood + '</font> ' + CountTime[1] + ' ' +
            '' + img[2] + ' <font color="' + Color[2] + '" style="font-size: 11.5px">' + clay + '</font> ' + CountTime[2] + ' ' +
            '' + img[3] + ' <font color="' + Color[3] + '" style="font-size: 11.5px">' + iron + '</font> ' + CountTime[3] + ' ' +
            '' + img[4] + ' <font color="' + Color[4] + '" style="font-size: 11.5px">' + crop + '</font> ' + CountTime[4] + ' ' +
            '' + available +
            '<hr style="margin: 5px;">' +
            '' + NPC_href + '--><font color="' + Color[5] + '" style="font-size: 11.5px">' + NPC + '</font><br>' +
            '<img src="img/x.gif" class="r5" /> <font style="font-size: 11px" color="red">' + xCrop + '</font><br>' +
            '<img alt="itemCategory itemCategory_artWork" class="itemCategory itemCategory_artWork" src="img/x.gif"> <font style="font-size: 11px" color="blue">' + pnx + '</font>' +
            '</span>' +
            '</td></tr>';
                    } else {
                        var X = '';
                    };
                    if (!ID('T4x_B' + TypeName + '' + Level + '')) {
                        ID('t4p_' + TypeName + '').innerHTML += X;
                    };
                }
            }
            $('.RES_drag img').bind('click', function () { $('#TBL_D1_RES').remove(); GM_setValue('setting[23]', 'false'); });
            $('.RES_drag img').hover(function () { this.src = svnIMG(2); }, function () { this.src = svnIMG(1) });
        };

        //######### Center Number #########
        function centerNumber() {
            //return;
            var dorf = 0;

            fieldsOfVillage = {
                'f1': [3, 3, 0, 3, 3, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //9 crop
                'f2': [2, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //3-4-5-6
                'f3': [0, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-4-4-6
                'f4': [0, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-5-3-6
                'f5': [0, 3, 0, 2, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //5-3-4-6
                'f6': [3, 3, 0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3], //15 crop
                'f7': [0, 3, 3, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-4-3-7
                'f8': [2, 3, 3, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //3-4-4-7
                'f9': [2, 3, 3, 0, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-3-4-7
                'f10': [2, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //3-5-4-6
                'f11': [2, 0, 0, 2, 0, 3, 3, 2, 2, 1, 1, 2, 0, 3, 3, 1, 3, 3], //4-3-5-6
                'f12': [0, 3, 0, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1]  //5-4-3-6
            };
            //		'f99':	'Natarian village',
            // ›› Main.
            function TM_ShowMainBuildingNumbers() {
                var gid;
                var countArray, checkWW = false;
                var mapOffset = 1;
                // ›› Map1 holds building names, level and building spot IDs in area elements (2 are duplicate walls to be ignored).

                // active buildings
                var bldText = $xf('//script[contains(text(),"bld=")]');
                var bldArr = new Array(41);
                if (bldText) {
                    eval(bldText.innerHTML);
                    for (var i = 0; i < bld.length; i++) bldArr[bld[i]['aid']] = bld[i]['stufe'];
                }
                var mapInfo = ID('clickareas') || ID('map2');
                if (mapInfo) {
                    countArray = 22;
                    dorf = 2;
                    mapOffset = 19;
                    var levels = TAG('DIV', ID('levels'));
                    var lRef = 0;
                } else {
                    mapInfo = ID('rx');
                    if (mapInfo) {
                        countArray = 18;
                        dorf = 1;
                        var dtop = travian3 ? 67 : 25;
                        var dleft = travian3 ? (RTL == 'ltr' ? 6 : 225) : (RTL == 'ltr' ? -10 : 190);
                    }
                }
                if (!(mapInfo)) return
                var areaElements = TAG('area', mapInfo);
                var imageElements = TAG('img', ID('village_map'));
                var BuildingLevel, smallDIV, coords;
                if (dorf == 2) {
                    if (countArray > imageElements.length - 1) {
                        checkWW = true;
                        countArray = areaElements.length;
                    }
                    if (travian3) {
                        // tables for T4 from Qusai Abu Hilal قصي أبو هلال
                        bCost[13] = [//smithy (T4) gid = 13
							[0, 0, 0, 0, 0, 0],
							[180, 250, 500, 160, 2, 4],  //to lvl 1: 180 250 500 160 4 OK
							[230, 320, 640, 205, 3, 6],  //to lvl 2: 230 320 640 205 2 OK
							[295, 410, 820, 260, 3, 8],  //to lvl 3: 295 410 820 260 2 OK
							[375, 525, 1050, 335, 4, 10],//to lvl 4: 375 525 1050 335 2 OK
							[485, 670, 1340, 430, 5, 12],//to lvl 5: 485 670 1340 430 2 OK
							[620, 860, 1720, 550, 6, 15],//to lvl 6: 620 860 1720 550 3 OK
							[790, 1100, 2200, 705, 7, 18],   //to lvl 07: // 790 1100 2200 705 3
							[1015, 1405, 2815, 900, 9, 21],  //to lvl 08: // 1015 1405 2815 900 3
							[1295, 1800, 3605, 1155, 10, 24],//to lvl 09: 1295 1800 3605 1155 3 OK
							[1660, 2305, 4610, 1475, 12, 27],//to lvl 10: // 1660 2305 4610 1475 3 OK
							[2125, 2950, 5905, 1890, 15, 30],//to lvl 11: // 2125 2950 5905 1890 3 OK
							[2720, 3780, 7555, 2420, 18, 33],//to lvl 12: // 2720 3780 7555 2420 3
							[3480, 4835, 9670, 3095, 21, 36],//to lvl 13: // 3480 4835 9670 3095 3 OK
							[4455, 6190, 12380, 3960, 26, 39], //to lvl 14: // 4455 6190 12380 3960 3 OK
							[5705, 7925, 15845, 5070, 31, 42], //to lvl 15: // 5705 7925 15845 5070 3 OK
							[7300, 10140, 20280, 6490, 37, 46],//to lvl 16: // 7300 10140 20280 6490 4 OK
							[9345, 12980, 25960, 8310, 44, 50],//to lvl 17: // 9345 12980 25960 8310 4 OK
							[11965, 16615, 33230, 10635, 53, 54],//to lvl 18: // 11965 16615 33230 10635 4 OK
							[15315, 21270, 42535, 13610, 64, 58], //to lvl 19: //  15315 21270 42535 13610 OK
							[19600, 27225, 54445, 17420, 77, 62]  //to lvl 20: //  19600 27225 54445 17420 4
                        ];
                        bCost[36] = [//trapperCost gid = 36
							[0, 0, 0, 0, 0, 0],
							[80, 120, 70, 90, 1, 4],    // To lvl 1: OK
							[100, 155, 90, 115, 1, 6],  // To lvl 2: OK
							[130, 195, 115, 145, 2, 8], // To lvl 3: OK
							[170, 250, 145, 190, 2, 10],// To lvl 4: OK
							[215, 320, 190, 240, 2, 12],// To lvl 5: OK
							[275, 410, 240, 310, 3, 15],// To lvl 6: OK
							[350, 530, 310, 395, 4, 18],// To lvl 7: OK
							[450, 675, 395, 505, 4, 21],// To lvl 8: OK
							[575, 865, 505, 650, 5, 24],// To lvl 9: OK
							[740, 1105, 645, 830, 6, 27],    // To lvl 10: OK
							[945, 1415, 825, 1065, 7, 30], // To lvl 11: OK
							[1210, 1815, 1060, 1360, 9, 33], // To lvl 12: OK
							[1545, 2320, 1355, 1740, 11, 36],// To lvl 13: OK
							[1980, 2970, 1735, 2230, 13, 39],// To lvl 14: OK
							[2535, 3805, 2220, 2850, 15, 42],// To lvl 15: OK
							[3245, 4870, 2840, 3650, 18, 46],// To lvl 16: OK
							[4155, 6230, 3635, 4675, 22, 50],// To lvl 17: OK
							[5315, 7975, 4650, 5980, 27, 54],// To lvl 18: OK
							[6805, 10210, 5955, 7655, 32, 58],// To lvl 19: OK
							[8710, 13065, 7620, 9800, 38, 62] // To lvl 20: OK
                        ];
                    }
                }
                for (var i = 0; i < countArray; i++) {
                    BuildingLevel = /\d+/.exec(areaElements[i].alt);
                    if (!BuildingLevel) BuildingLevel = /\d+/.exec(areaElements[i].title);
                    if (!BuildingLevel) continue;



                    if (dorf == 2) {
                        gid = parseInt(/(\d+)\S*$/.exec(imageElements[i].getAttribute('class'))[1]);
                        if (checkWW) {
                            if (travian3 && i == 6) gid = 40;
                            if (!travian3 && i == 8) gid = 40;
                        }
                        smallDIV = levels[lRef++];
                    }
                    if (dorf == 1) {
                        var typeOfVillage = ID('village_map').getAttribute('class');
                        gid = fieldsOfVillage[typeOfVillage][i] + 1;
                        smallDIV = ID('rx').appendChild($ee('a', BuildingLevel[0], [['class', 'TMbuildingtags'], ['href', areaElements[i].href]]));
                    }
                    if (dorf == 1) {
                        coords = areaElements[i].coords.split(',');
                        smallDIV.style.top = parseInt(coords[1]) + dtop + 'px';
                        smallDIV.style.left = parseInt(coords[0]) + dleft + 'px';
                        smallDIV.style.visibility = "visible";
                    } else smallDIV.className += ' ' + 'TMbuildingtags';
                    if (bldArr[i + mapOffset]) {
                        if (khtmlFL) {
                            var y = 0;
                            setInterval(function (x) {
                                return function () {
                                    if (y > 0) { x.style.color = 'white'; y = 0; } else { x.style.color = 'black'; y = 1; }
                                }
                            }(smallDIV), 1000);
                        } else smallDIV.style.textDecoration = 'blink';
                        BuildingLevel[0] = bldArr[i + mapOffset];
                    }
                    try {
                        var resneed = bCost[gid][parseInt(BuildingLevel[0]) + 1];

                    } catch (err) {
                        //			alert( gid +' /// '+ BuildingLevel +' /// '+ getMaxLevel(gid));
                        continue;
                    }

                    //	color
                    if ((GM_getValue("setting2[2]") == ('null' || null)) || !GM_getValue("setting2[2]")) {
                        GM_setValue('setting2[2]', '#A0F0A0');
                    }
                    if ((GM_getValue("setting2[3]") == ('null' || null)) || !GM_getValue("setting2[3]")) {
                        GM_setValue('setting2[3]', '#FFB8F0');
                    }
                    if ((GM_getValue("setting2[1]") == ('null' || null)) || !GM_getValue("setting2[1]")) {
                        GM_setValue('setting2[1]', '#F8FFC8');
                    }
                    if ((GM_getValue("setting2[4]") == ('null' || null)) || !GM_getValue("setting2[4]")) {
                        GM_setValue('setting2[4]', '#FFC84B');
                    }
                    if ((GM_getValue("setting2[5]") == ('null' || null)) || !GM_getValue("setting2[5]")) {
                        GM_setValue('setting2[5]', '#FA5A00');
                    }

                    if (travian3) {
                        var rWood = document.getElementById('l4').firstChild.nodeValue.split('/');
                        var rClay = document.getElementById('l3').firstChild.nodeValue.split('/');
                        var rIron = document.getElementById('l2').firstChild.nodeValue.split('/');
                        var rCrop = document.getElementById('l1').firstChild.nodeValue.split('/');
                    } else {
                        var rWood = document.getElementById('l1').firstChild.nodeValue.split('/');
                        var rClay = document.getElementById('l2').firstChild.nodeValue.split('/');
                        var rIron = document.getElementById('l3').firstChild.nodeValue.split('/');
                        var rCrop = document.getElementById('l4').firstChild.nodeValue.split('/');
                    }
                    var reswood = parseInt(rWood[0]);
                    var resclay = parseInt(rClay[0]);
                    var resiron = parseInt(rIron[0]);
                    var rescrop = parseInt(rCrop[0]);
                    var capWood = parseInt(rWood[1]);
                    var capCrop = parseInt(rCrop[1]);

                    if (parseInt(BuildingLevel[0]) == getMaxLevel(gid)) {
                        smallDIV.style.backgroundColor = GM_getValue('setting2[2]');
                    } else if (resneed[0] > capWood || resneed[1] > capWood || resneed[2] > capWood || resneed[3] > capCrop) {
                        smallDIV.style.backgroundColor = GM_getValue('setting2[3]');
                    } else if ((reswood + resclay + resiron + rescrop) >= (resneed[0] + resneed[1] + resneed[2] + resneed[3])) {
                        if (reswood >= resneed[0] && resclay >= resneed[1] && resiron >= resneed[2] && rescrop >= resneed[3]) {
                            smallDIV.style.backgroundColor = GM_getValue('setting2[1]');
                        } else {
                            smallDIV.style.backgroundColor = GM_getValue('setting2[4]');
                        }
                    } else if (parseInt(resneed[0]) > reswood ||
                        parseInt(resneed[1]) > resclay ||
                        parseInt(resneed[2]) > resiron ||
                        parseInt(resneed[3]) > rescrop) {
                        smallDIV.style.backgroundColor = GM_getValue('setting2[5]');
                    }
                }
            }


            function getMaxLevel(gid) {
                if (travian3) {
                    var m1 = $('div.village1 h1, div.village1 h2').text();
                } else {
                    var m1 = $('div#villageList div:eq(1) ul li[class*=" active"] a').html();
                }
                var maxLevel;
                switch (gid) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        if (GM_getValue("mainVillage") == m1) {
                            maxLevel = 25;
                        } else {
                            maxLevel = 10;
                        };
                        break;
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        maxLevel = 5;
                        break;
                    case 23:
                        maxLevel = 10;
                        break;
                    case 40:
                        maxLevel = 100;
                        break;
                    default:
                        maxLevel = 20;
                }
                return (maxLevel)
            }

            TM_ShowMainBuildingNumbers();
        }
        //######### End Center Number #########

        function xtr(type, value) {
            //0-att 1-def1 2-def2 3-lumber 4-clay 5-iron 6-crop 7-food 8-speed 9-load
            unit = [];
            unit[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];   // hero
            unit[1] = [40, 35, 50, 120, 100, 180, 40, 1, 6, 40];    // Legionnaire
            unit[2] = [30, 65, 35, 100, 130, 160, 70, 1, 5, 20];    // Praetorian
            unit[3] = [70, 40, 25, 150, 160, 210, 80, 1, 7, 50];    // Imperian
            unit[4] = [0, 20, 10, 140, 160, 20, 40, 2, 16, 0];  // Equites Legati
            unit[5] = [120, 65, 50, 550, 440, 320, 100, 3, 14, 100];    // Equites Imperatoris
            unit[6] = [180, 80, 105, 550, 640, 800, 180, 4, 10, 70];    // Equites Caesaris
            unit[7] = [60, 30, 75, 900, 360, 500, 70, 3, 4, 0]; // Battering Ram
            unit[8] = [75, 60, 10, 950, 1350, 600, 90, 6, 3, 0];    // Fire catapult
            unit[9] = [50, 40, 30, 30750, 27200, 45000, 37500, 4, 4, 0];    // Senator
            unit[10] = [0, 80, 80, 5800, 5300, 7200, 5500, 1, 5, 1600]; // Settler
            unit[11] = [40, 20, 5, 95, 75, 40, 40, 1, 7, 60];   // Clubswinger
            unit[12] = [10, 35, 60, 145, 70, 85, 40, 1, 7, 40]; // Spearfighter
            unit[13] = [60, 30, 30, 130, 120, 170, 70, 1, 6, 50];   // Axefighter
            unit[14] = [0, 10, 5, 160, 100, 50, 50, 1, 9, 0];   // Scout
            unit[15] = [55, 100, 40, 370, 270, 290, 75, 2, 10, 110];    // Paladin
            unit[16] = [150, 50, 75, 450, 515, 480, 80, 3, 9, 80];  // Teuton Knight
            unit[17] = [65, 30, 80, 1000, 300, 350, 70, 3, 4, 0];   // Ram
            unit[18] = [50, 60, 10, 900, 1200, 600, 60, 6, 3, 0];   // Catapult
            unit[19] = [40, 60, 40, 35500, 26600, 25000, 27200, 4, 4, 0];   // Chief
            unit[20] = [10, 80, 80, 7200, 5500, 5800, 6500, 1, 5, 1600];    // Settler
            unit[21] = [15, 40, 50, 100, 130, 55, 30, 1, 7, 35];    // Phalanx
            unit[22] = [65, 35, 20, 140, 150, 185, 60, 1, 6, 45];   // Swordfighter
            unit[23] = [0, 20, 10, 170, 150, 20, 40, 2, 17, 0]; // Pathfinder
            unit[24] = [90, 25, 40, 350, 450, 230, 60, 2, 19, 75];  // Theutates Thunder
            unit[25] = [45, 115, 55, 360, 330, 280, 120, 2, 16, 35];    // Druidrider
            unit[26] = [140, 50, 165, 500, 620, 675, 170, 3, 13, 65];   // Haeduan
            unit[27] = [50, 30, 105, 950, 555, 330, 75, 3, 4, 0];   // Ram
            unit[28] = [70, 45, 10, 960, 1450, 630, 90, 6, 3, 0];   // Trebuchet
            unit[29] = [40, 50, 50, 30750, 45400, 31000, 37500, 4, 5, 0];   // Chieftain
            unit[30] = [0, 80, 80, 5500, 7000, 5300, 4900, 1, 5, 1600]; // Settler
            unit[31] = [10, 25, 10, 0, 0, 0, 0, 1, 20, 0];  // Rat
            unit[32] = [20, 35, 40, 0, 0, 0, 0, 1, 20, 0];  // Spider
            unit[33] = [60, 40, 60, 0, 0, 0, 0, 1, 20, 0];  // Serpent
            unit[34] = [80, 66, 50, 0, 0, 0, 0, 1, 20, 0];  // Bat
            unit[35] = [50, 70, 33, 0, 0, 0, 0, 2, 20, 0];  // Wild boar
            unit[36] = [100, 80, 70, 0, 0, 0, 0, 2, 20, 0]; // Wolf
            unit[37] = [250, 140, 200, 0, 0, 0, 0, 3, 20, 0];   // Bear
            unit[38] = [450, 380, 240, 0, 0, 0, 0, 3, 20, 0];   // Crocodile
            unit[39] = [200, 170, 250, 0, 0, 0, 0, 3, 20, 0];   // Tiger
            unit[40] = [600, 440, 520, 0, 0, 0, 0, 5, 20, 0];   // Elephant
            if (unit[type]) {
                return unit[type][value]
            } else {
                return unit[0][value];
            };
        };
        function TroopType(Num) {
            var unitType = [];
            unitType[1] = 'i';
            unitType[2] = 'i';
            unitType[3] = 'i';
            unitType[4] = 'c';
            unitType[5] = 'c';
            unitType[6] = 'c';
            unitType[7] = 'i';
            unitType[8] = 'i';
            unitType[9] = 'i';
            unitType[10] = 'i';
            unitType[11] = 'i';
            unitType[12] = 'i';
            unitType[13] = 'i';
            unitType[14] = 'i';
            unitType[15] = 'c';
            unitType[16] = 'c';
            unitType[17] = 'i';
            unitType[18] = 'i';
            unitType[19] = 'i';
            unitType[20] = 'i';
            unitType[21] = 'i';
            unitType[22] = 'i';
            unitType[23] = 'c';
            unitType[24] = 'c';
            unitType[25] = 'c';
            unitType[26] = 'c';
            unitType[27] = 'i';
            unitType[28] = 'i';
            unitType[29] = 'i';
            unitType[30] = 'i';
            unitType[31] = 'c';
            unitType[32] = 'c';
            unitType[33] = 'c';
            unitType[34] = 'c';
            unitType[35] = 'c';
            unitType[36] = 'c';
            unitType[37] = 'c';
            unitType[38] = 'c';
            unitType[39] = 'c';
            unitType[40] = 'c';
            if (unitType[Num]) {
                return unitType[Num];
            } else {
                return unitType[0];
            };
        };
        function hMove(access) {

            var str = "<table cellspacing='0' style='width: auto;' class='xt4Style'><thead><tr><td colspan='3'><img src='img/x.gif' class='unit u" + access + "'><span> " + CLASS('unit u' + access)[0].alt + "</span>:</td></thead>";
            str = str + "<tbody><tr><td><img src='img/x.gif' class='att_all'><span> " + xtr(access, 0) + "</span></td>";
            str = str + "<td><img src='img/x.gif' class='def_i'><span> " + xtr(access, 1) + "</span></td>";
            str = str + "<td><img src='img/x.gif' class='def_c'><span> " + xtr(access, 2) + "</span></td></tr>";

            str = str + "<tr><td><img src='img/x.gif' class='r5'><span> " + xtr(access, 7) + "</span></td>";
            str = str + "<td><img src='" + uSpeed + "' ><span> " + C(xtr(access, 8) * MySPD) + "</span></td>";
            str = str + "<td><img src='img/x.gif' class='carry'><span> " + xtr(access, 9) + "</span></td><tr>";

            str = str + "<tr><td colspan='3' style='border-top: 1px dotted;'>";
            str = str + "<img src='img/x.gif' class='r1' /><span> " + xtr(access, 3) + "</span>&nbsp;";
            str = str + "<img src='img/x.gif' class='r2' /><span> " + xtr(access, 4) + "</span>&nbsp;";
            str = str + "<img src='img/x.gif' class='r3' /><span> " + xtr(access, 5) + "</span>&nbsp;";
            str = str + "<img src='img/x.gif' class='r4' /><span> " + xtr(access, 6) + "</span></td></tr>";

            ID("T4_mHelp").innerHTML = str;
            $("#T4_mHelp").stop(true, true).fadeIn(333);
        };
        function pTime(sec, oType, tr) {
            if (oType == 'sec') {
                if (!tr) {
                    var dd = sec.split(':')[0];
                    var hh = sec.split(':')[1].split(':')[0];
                    var mm = sec.split(':')[2].split(':')[0];
                    var ss = sec.split(':')[3];
                    if (!dd == ('0' || '00' || 0 || 00)) { if (dd > 0) dd = C(dd * 86400); else { dd = 0; }; } else { dd = 0; };
                    if (!hh == ('0' || '00' || 0 || 00)) { if (hh > 0) hh = C(hh * 3600); else { hh = 0; }; } else { hh = 0; };
                    if (!mm == ('0' || '00' || 0 || 00)) { if (mm > 0) mm = C(mm * 60); else { mm = 0; }; } else { mm = 0; };
                    if (!ss == ('0' || '00' || 0 || 00)) { if (ss > 0) ss = C(ss % 60); else { ss = 0; }; } else { ss = 0; };
                    return C(C(dd) + C(hh) + C(mm) + C(ss));
                } else {
                    var hh = sec.split(':')[0];
                    var mm = sec.split(':')[1].split(':')[0];
                    var ss = sec.split(':')[2];
                    if (!hh == ('0' || '00' || 0 || 00)) { if (hh > 0) hh = C(hh * 3600); else { hh = 0; }; } else { hh = 0; };
                    if (!mm == ('0' || '00' || 0 || 00)) { if (mm > 0) mm = C(mm * 60); else { mm = 0; }; } else { mm = 0; };
                    if (!ss == ('0' || '00' || 0 || 00)) { if (ss > 0) ss = C(ss % 60); else { ss = 0; }; } else { ss = 0; };
                    return C(C(hh) + C(mm) + C(ss));
                }
            } else if (oType == 'time') {
                if (!tr) {
                    var DD, HH, MM, SS;
                    DD = Math.floor(sec / 86400);
                    HH = Math.floor(sec / 3600) % 24;
                    MM = Math.floor(sec / 60) % 60;
                    SS = sec % 60;
                    if (HH < 10) HH = '0' + HH;
                    if (MM < 10) MM = '0' + MM;
                    if (SS < 10) SS = '0' + SS;
                    return ("" + DD + ":" + HH + ":" + MM + ":" + SS);
                } else {
                    var HH, MM, SS;
                    HH = Math.floor(sec / 3600) % 24;
                    MM = Math.floor(sec / 60) % 60;
                    SS = sec % 60;
                    if (HH < 10) HH = '0' + HH;
                    if (MM < 10) MM = '0' + MM;
                    if (SS < 10) SS = '0' + SS;
                    return ("" + HH + ":" + MM + ":" + SS);
                };

            };
        };
        function cultureCalc() {
            var blevel = CLASS('level', TAG('h1', ID('content'))[0]);
            if (blevel.length == 0 || !CLASS('r5')[1] || exp(/build.php\?\b[^>]*s=1/)) return;
            if (!travian3) { if (!$('div.contractText').html()) return; }
            blevel = parseInt(blevel[0].textContent.match(/\d+/)[0]);
            var bid = parseInt(ID('build').getAttribute('class').match(/\d+/)[0]);
            var getA = C(bCost[bid][blevel + 1][5] - bCost[bid][blevel][5]);
            var getB = C(bCost[bid][blevel + 1][4] - bCost[bid][blevel][4]);
            var tA = CLASS('r5')[1].alt;
            var contr = ID('contract');
            var tbl = Create('table', { style: 'width: auto;', cellspacing: '0', class: 'tblInfo' });
            tbl.innerHTML = '<tbody>' +
            '<tr><td><img src="img/x.gif" class="r5" /></td><td>' + SubLanguage(LanguagePack(), 21) + '</td><td>' + bCost[bid][blevel][5] + '</td><td>' + SubLanguage(LanguagePack(), 22) + '</td><td>' + bCost[bid][blevel + 1][5] + '</td><td>' + (getA == 0 ? '' : ' = +' + getA) + '</td><td> | </td>' +
            '<td><img src="' + PN + '" class="itemCategory itemCategory_artWork" /></td><td>' + SubLanguage(LanguagePack(), 21) + '</td><td>' + bCost[bid][blevel][4] + '</td><td>' + SubLanguage(LanguagePack(), 22) + '</td><td>' + bCost[bid][blevel + 1][4] + '</td><td>' + (getB == 0 ? '' : ' = +' + getB) + '</td></tr>' +
            '</tbody>';
            var cl = CLASS('clear', contr);
            if (travian3) {
                $(tbl).insertBefore($('p#contract br:eq(1)'));
            } else {
                $('<br>').insertAfter('#contract div:eq(1) div.showCosts');
                $(tbl).insertAfter('#contract div:eq(1) div.showCosts');
            }
        };
        function fTime(sec) {
            sec = sec.split(':');

            var hh = sec[0];
            var mm = sec[1];
            var ss = sec[2];

            var dx = parseInt((hh * 3600) + (mm * 60) + (ss % 60));

            d = Math.floor(dx / 86400);
            hh = Math.floor((dx % 86400) / 3600);
            mm = Math.floor(((dx % 86400) % 3600) / 60);
            ss = ((dx % 86400) % 3600) % 60;

            if (hh < 10) hh = '0' + hh;
            if (mm < 10) mm = '0' + mm;
            if (ss < 10) ss = '0' + ss;

            return (d + ":" + hh + ":" + mm + ":" + ss);

        };

        function jsPatch(Element) {
            var ClickEvent = document.createEvent("MouseEvents");
            ClickEvent.initMouseEvent("click", true, true);
            Element.dispatchEvent(ClickEvent);
        };
        function FindNext(elem) {
            do {
                elem = elem.nextSibling;
            } while (elem && elem.nodeType != 1);
            return elem;
        };
        function FindBefore(elem) {
            do {
                elem = elem.previousSibling;
            } while (elem && elem.nodeType != 1);
            return elem;
        };

        function getAnimInfo(url, id) {
            ID('T4_mHelp').innerHTML = '<img src="data:image/gif;base64,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" />';
            ID('T4_mHelp').style.display = 'block';
            if (ID(id).innerHTML == '') {
                $.get(url, function (data) {
                    var xHTML = $(data);
                    if (xHTML.find('#troop_info .ico:eq(0)').html()) {
                        var asNext = null;
                        var AnimX = '<table cellspacing="0"><tbody>';
                        var HTML = '<table cellspacing="0"><tbody>';
                        HTML = HTML + '' +
            '<tr><td><img src="img/x.gif" class="r5" /></td><td id="i1" colspan="2">0</td></tr>' +
            '<tr><td><img src="img/x.gif" class="def_i" /></td><td id="i2" colspan="2">0</td></tr>' +
            '<tr><td><img src="img/x.gif" class="def_c" /></td><td id="i3" colspan="2">0</td></tr>';
                        var GetAnimIMG = [];
                        var GetAnimNum = [];
                        var GetAnimNam = [];
                        var Info = new Array(0, 0, 0);
                        var GetLength = xHTML.find('#troop_info .ico').length;
                        for (xx = 0; xx < GetLength; xx++) {
                            GetAnimIMG[xx] = xHTML.find('#troop_info .ico:eq(' + xx + ')').html();
                            GetAnimNum[xx] = xHTML.find('#troop_info .val:eq(' + xx + ')').html();
                            GetAnimNam[xx] = xHTML.find('#troop_info .desc:eq(' + xx + ')').html();
                            Info[0] = Info[0] + C(xtr(GetAnimIMG[xx].toString().split('unit u')[1].split('"')[0], 1) * GetAnimNum[xx]);
                            Info[1] = Info[1] + C(xtr(GetAnimIMG[xx].toString().split('unit u')[1].split('"')[0], 2) * GetAnimNum[xx]);
                            Info[2] = Info[2] + C(xtr(GetAnimIMG[xx].toString().split('unit u')[1].split('"')[0], 7) * GetAnimNum[xx]);
                            HTML = HTML + '<tr><td>' + GetAnimIMG[xx] + '</td><td>' + GetAnimNum[xx] + '</td><td>' + GetAnimNam[xx] + '</td></tr>';
                            AnimX = AnimX + '<tr><td>' + GetAnimIMG[xx] + '</td><td>' + GetAnimNum[xx] + '</td><td>' + GetAnimNam[xx] + '</td></tr>';
                        };
                        HTML = HTML + '</tbody></table>';
                        ID('T4_mHelp').innerHTML = HTML;
                        ID(id).innerHTML = '<table cellspacing="0"><tbody><tr><td><img src="img/x.gif" class="r5" />' + Info[2] + '</td><td><img src="img/x.gif" class="def_i" />' + Info[1] + '</td><td><img src="img/x.gif" class="def_c" />' + Info[0] + '</td><tr><tbody></table>';
                        ID('i3').innerHTML = Info[0];
                        ID('i2').innerHTML = Info[1];
                        ID('i1').innerHTML = Info[2];
                        asNext = FindNext(ID(id));
                        asNext.innerHTML = AnimX + '<table></table>';
                    } else {
                        FindNext(ID(id)).innerHTML = xHTML.find('#troop_info').html();
                        ID(id).innerHTML = xHTML.find('#troop_info').html();
                        ID('T4_mHelp').innerHTML = '<table cellspacing="0">' + xHTML.find('#troop_info').html() + '<table>';
                    };
                });
            } else {
                var dHTML = FindNext(ID(id)).innerHTML;
                ID('T4_mHelp').innerHTML = dHTML;
            };
        };

        function htmltocontext(source) {
            if (TAG("req")[0]) TAG("req")[0].parentNode.removeChild(TAG("req")[0]);
            html = document.createElement('req');
            html.setAttribute('style', 'display: none;');
            html.innerHTML = source;
            if (TAG('req')[0]) { xli = TAG('req')[0]; xli.parentNode.removeChild(xli); };
            return document.body.parentNode.appendChild(html);
        };
        function ResColor() {
            if (ID('production')) {
                var k = [], t = [], i, mx, mn;
                for (i = 0; i < 4; i++) { k[i] = $('table#production tbody tr').eq(i); t[i] = k[i].find('td').eq(2).text(); };
                mn = Math.min(t[0], t[1], t[2], t[3]);
                mx = Math.max(t[0], t[1], t[2], t[3]);
                for (i = 0; i < 4; i++) {
                    if (t[i] == mn) { k[i].css('color', 'red'); };
                    if (t[i] == mx) { k[i].css('color', 'green'); };
                };
            };
        };
        function httpRequest(url, onSuccess) {
            var aR = new XMLHttpRequest();
            aR.onreadystatechange = function () {
                if (aR.readyState == 4 && (aR.status == 200 || aR.status == 304)) {
                    onSuccess(aR);
                } else if (aR.readyState == 4 && aR.status != 200) { };
            };
            aR.open("GET", url, true);
            aR.send(null);
        };
        function XMLGetR(num) {
            document.body.style.cursor = 'wait';
            var xmf = [];
            $.get($('table#overview tbody tr:eq(' + (num - 1) + ') td:eq(1) div a[href*="berichte.php?id="]').attr('href'), function (ajax) {
                if (CLASS('XML1')[0]) { xli = CLASS('XML1')[0]; xli.parentNode.removeChild(xli); };
                xmf[1] = $(ajax);
                var table = Create('table', { cellspacing: '1', class: 'XML1', style: 'margin: 10px 0px;', id: 'report_surround' });
                $(table).html(xmf[1].find('#report_surround').html());
                ID('content').appendChild(table);
                $('table#overview tbody tr:eq(' + (num - 1) + ') td input').eq(0).attr('checked', 'checked');
                $('table#overview tbody tr:eq(' + (num - 1) + ') td:eq(2) a img').eq(0).setAttribute('src', msgC);
                document.body.style.cursor = 'default';
                //return TAG('req')[0].parentNode.removeChild(TAG('req')[0]);
            });
        };
        function getXtime(xyA, xyB) {
            var race = ID('side_info').getElementsByClassName('sideInfoPlayer')[0].getElementsByTagName('img')[0];
            var getY = get_xy(xyB).toString().split(',')[0];
            var getX = get_xy(xyB).toString().split(',')[1];
            var HTML = '';
            var sSpeed = C(MySPD);

            function uxSpeed(numA, numB) {
                var aA = format(Math.round(((Distance(xyA, xyB)) / (xtr((numA), 8)) * 3600))); var aC = bEndTime(formatUp(Math.round(((Distance(xyA, xyB)) / (xtr((numA), 8)) * 3600))));
                var aB = format(Math.round(((Distance(xyA, xyB)) / (xtr((numB), 8)) * 3600))); var aD = bEndTime(formatUp(Math.round(((Distance(xyA, xyB)) / (xtr((numB), 8)) * 3600))));

                var bA = format(Math.round(((Distance(xyA, xyB)) / (xtr((numA), 8)) * 3600) / sSpeed)); var bC = bEndTime(formatUp(Math.round(((Distance(xyA, xyB)) / (xtr((numA), 8)) * 3600) / sSpeed)));
                var bB = format(Math.round(((Distance(xyA, xyB)) / (xtr((numB), 8)) * 3600) / sSpeed)); var bD = bEndTime(formatUp(Math.round(((Distance(xyA, xyB)) / (xtr((numB), 8)) * 3600) / sSpeed)));


                if ((sSpeed == (1 || '1' || null || 'undefined' || NaN || 'NaN' || 'isNaN')) || isNaN(sSpeed)) {
                    return '<td><img src="img/x.gif" class="unit u' + numA + '" /></td><td>' + aA + '<div style="font-size:10px; text-align: center;">(<span class="endtime">' + aC + '</span>)</div></td>' +
               '<td><img src="img/x.gif" class="unit u' + numB + '" /></td><td>' + aB + '<div style="font-size:10px; text-align: center;">(<span class="endtime">' + aD + '</span>)</div></td>';
                } else if (sSpeed == ('2' || 2 || '3' || 3)) {
                    return '<td><img src="img/x.gif" class="unit u' + numA + '" /></td><td>' + bA + '<div style="font-size:10px; text-align: center;">(<span class="endtime">' + bC + '</span>)</div></td>' +
               '<td><img src="img/x.gif" class="unit u' + numB + '" /></td><td>' + bB + '<div style="font-size:10px; text-align: center;">(<span class="endtime">' + bD + '</span>)</div></td>';
                } else {
                    return '<td><img src="img/x.gif" class="unit u' + numA + '" /></td><td>' + bA + '<div style="font-size:10px; text-align: center;">(<span class="endtime">' + bC + '</span>)</div></td>' +
               '<td><img src="img/x.gif" class="unit u' + numB + '" /></td><td>' + bB + '<div style="font-size:10px; text-align: center;">(<span class="endtime">' + bD + '</span>)</div></td>';
                };
            };
            if (race.className == 'nationBig nationBig1') {
                var HTML = '<table cellspacing="0" class="t4Style">'; HTML = HTML + '<thead><tr><th colspan="2">< ' + New_Math(Distance(xyA, xyB)) + ' ></th><th style="font-weight: bold; direction: ltr;" colspan="2">(<span><span>' + getY + '</span><span>|</span><span>' + getX + '</span></span>)</th></tr></thead><tbody>';
                HTML = HTML + '<tr>' + uxSpeed(1, 2) + '</tr>';
                HTML = HTML + '<tr>' + uxSpeed(3, 4) + '</tr>';
                HTML = HTML + '<tr>' + uxSpeed(5, 6) + '</tr>';
                HTML = HTML + '<tr>' + uxSpeed(7, 8) + '</tr>';
                HTML = HTML + '<tr>' + uxSpeed(9, 10) + '</tr>';
                HTML = HTML + '</tbody></table>';
            };
            if (race.className == 'nationBig nationBig2') {
                var HTML = '<table cellspacing="0" class="t4Style">'; HTML = HTML + '<thead><tr><th colspan="2">< ' + New_Math(Distance(xyA, xyB)) + ' ></th><th style="font-weight: bold; direction: ltr;" colspan="2">(<span><span>' + getY + '</span><span>|</span><span>' + getX + '</span></span>)</th></tr></thead><tbody>';
                HTML = HTML + '<tr>' + uxSpeed(11, 12) + '</tr>';
                HTML = HTML + '<tr>' + uxSpeed(13, 14) + '</tr>';
                HTML = HTML + '<tr>' + uxSpeed(15, 16) + '</tr>';
                HTML = HTML + '<tr>' + uxSpeed(17, 18) + '</tr>';
                HTML = HTML + '<tr>' + uxSpeed(19, 20) + '</tr>';
                HTML = HTML + '</tbody></table>';
            };
            if (race.className == 'nationBig nationBig3') {
                var HTML = '<table cellspacing="0" class="t4Style">'; HTML = HTML + '<thead><tr><th colspan="2">< ' + New_Math(Distance(xyA, xyB)) + ' ></th><th style="font-weight: bold; direction: ltr;" colspan="2">(<span><span>' + getY + '</span><span>|</span><span>' + getX + '</span></span>)</th></tr></thead><tbody>';
                HTML = HTML + '<tr>' + uxSpeed(21, 22) + '</tr>';
                HTML = HTML + '<tr>' + uxSpeed(23, 24) + '</tr>';
                HTML = HTML + '<tr>' + uxSpeed(25, 26) + '</tr>';
                HTML = HTML + '<tr>' + uxSpeed(27, 28) + '</tr>';
                HTML = HTML + '<tr>' + uxSpeed(29, 30) + '</tr>';
                HTML = HTML + '</tbody></table>';
            };
            return HTML;
        };

        function gTimeD(xyA, xyB, type) {
            if (!type) {
                ID("T4_mHelp").innerHTML = getXtime(xyA, xyB);
                ID("T4_mHelp").style.display = "block";
            } else if (type) {
                if (ID('TrDis')) { $('#TrDis').html($('' + getXtime(xyA, xyB) + '')); } else {
                    $('<div id="TrDis">' + getXtime(xyA, xyB) + '</div>').insertAfter($('#btn_ok'));
                }
            };
        };
        function XPS_Cul(num) {
            num = C(num);
            ID('x_1').innerHTML = 0;
            ID('x_2').innerHTML = 0;
            ID('x_3').innerHTML = 0;
            ID('x_4').innerHTML = 0;
            ID('x_5').innerHTML = 0;
            ID('x_6').innerHTML = 0;
            ID('x_7').innerHTML = '0:00:00:00';
            var getLength = CLASS('buildActionOverview trainUnits')[0].getElementsByTagName('div').length;
            var aRes = [], GM = [ID('l1').innerHTML.split('/')[0], ID('l2').innerHTML.split('/')[0], ID('l3').innerHTML.split('/')[0], ID('l4').innerHTML.split('/')[0], 0, 0, 0];
            aRes[0] = CLASS('buildActionOverview trainUnits')[0].getElementsByTagName('input')[num].value;
            aRes[1] = xpath('//div[@class="buildActionOverview trainUnits"]/div[' + (num + 1) + ']//span[@id="XP1_' + (num) + '"]').snapshotItem(0).innerHTML.split(/\D/)[0];
            aRes[2] = xpath('//div[@class="buildActionOverview trainUnits"]/div[' + (num + 1) + ']//span[@id="XP2_' + (num) + '"]').snapshotItem(0).innerHTML.split(/\D/)[0];
            aRes[3] = xpath('//div[@class="buildActionOverview trainUnits"]/div[' + (num + 1) + ']//span[@id="XP3_' + (num) + '"]').snapshotItem(0).innerHTML.split(/\D/)[0];
            aRes[4] = xpath('//div[@class="buildActionOverview trainUnits"]/div[' + (num + 1) + ']//span[@id="XP4_' + (num) + '"]').snapshotItem(0).innerHTML.split(/\D/)[0];
            aRes[5] = xpath('//div[@class="buildActionOverview trainUnits"]/div[' + (num + 1) + ']//span[@id="XP5_' + (num) + '"]').snapshotItem(0).innerHTML;
            aRes[6] = xpath('//div[@class="buildActionOverview trainUnits"]/div[' + (num + 1) + ']//span[@id="XP6_' + (num) + '"]').snapshotItem(0).innerHTML.split(/\D/)[0];
            xpath('//span[@id="A' + (num + 1) + '"]').snapshotItem(0).innerHTML = aRes[0];
            xpath('//span[@id="' + (num + 1) + 'R1"]').snapshotItem(0).innerHTML = aRes[1];
            xpath('//span[@id="' + (num + 1) + 'R2"]').snapshotItem(0).innerHTML = aRes[2];
            xpath('//span[@id="' + (num + 1) + 'R3"]').snapshotItem(0).innerHTML = aRes[3];
            xpath('//span[@id="' + (num + 1) + 'R4"]').snapshotItem(0).innerHTML = aRes[4];
            xpath('//span[@id="' + (num + 1) + 'R5"]').snapshotItem(0).innerHTML = aRes[6];
            xpath('//span[@id="' + (num + 1) + 'R6"]').snapshotItem(0).innerHTML = aRes[5];
            for (x = 0; x < ID('CxS').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length; x++) {
                ID('x_1').innerHTML = C(C(ID('x_1').innerHTML) + C(xpath('//span[@id="A' + (x + 1) + '"]').snapshotItem(0).innerHTML));
                ID('x_2').innerHTML = C(C(ID('x_2').innerHTML) + C(xpath('//span[@id="' + (x + 1) + 'R1"]').snapshotItem(0).innerHTML)) + '<br><font id="l_2"></font>';
                ID('x_3').innerHTML = C(C(ID('x_3').innerHTML) + C(xpath('//span[@id="' + (x + 1) + 'R2"]').snapshotItem(0).innerHTML)) + '<br><font id="l_3"></font>';
                ID('x_4').innerHTML = C(C(ID('x_4').innerHTML) + C(xpath('//span[@id="' + (x + 1) + 'R3"]').snapshotItem(0).innerHTML)) + '<br><font id="l_4"></font>';
                ID('x_5').innerHTML = C(C(ID('x_5').innerHTML) + C(xpath('//span[@id="' + (x + 1) + 'R4"]').snapshotItem(0).innerHTML)) + '<br><font id="l_5"></font>';
                ID('x_6').innerHTML = C(C(ID('x_6').innerHTML) + C(xpath('//span[@id="' + (x + 1) + 'R5"]').snapshotItem(0).innerHTML));
                ID('x_7').innerHTML = format(ReLoadTime(ID('x_7').innerHTML) + ReLoadTime(xpath('//span[@id="' + (x + 1) + 'R6"]').snapshotItem(0).innerHTML));
                //ID('x_7').innerHTML = format(ID('x_7').innerHTML);
                ID('l_2').innerHTML = '(<font color="' + ((C(C(GM[3]) - C(ID('x_2').innerHTML)) > 0) ? "green" : "red") + '">' + C(C(GM[0]) - C(ID('x_2').innerHTML)) + '</font>)';
                ID('l_3').innerHTML = '(<font color="' + ((C(C(GM[2]) - C(ID('x_3').innerHTML)) > 0) ? "green" : "red") + '">' + C(C(GM[1]) - C(ID('x_3').innerHTML)) + '</font>)';
                ID('l_4').innerHTML = '(<font color="' + ((C(C(GM[1]) - C(ID('x_4').innerHTML)) > 0) ? "green" : "red") + '">' + C(C(GM[2]) - C(ID('x_4').innerHTML)) + '</font>)';
                ID('l_5').innerHTML = '(<font color="' + ((C(C(GM[0]) - C(ID('x_5').innerHTML)) > 0) ? "green" : "red") + '">' + C(C(GM[3]) - C(ID('x_5').innerHTML)) + '</font>)';

            };
        };
        function tChange(num) {
            var v = CLASS('details')[num].getElementsByTagName('input')[0].value;
            var Me = CLASS('details')[num].getElementsByTagName('input')[0];
            if (Me.value.match(/[a-zA-Z]/)) { return false; };

            var r = [];
            var c = [];
            var d = [];
            var cx = [];
            for (i = 0; i < 5; i++) {
                d[i] = ID('l' + (i + 1)).innerHTML.split('/')[0];
                r[i] = CLASS('details')[num].getElementsByClassName('resources r' + (i + 1))[0].innerHTML.split('>')[1];
            };
            r[6] = CLASS('details')[num].getElementsByClassName('clocks')[0];
            r[9] = CLASS('details')[num].getElementsByClassName('furtherInfo')[0].innerHTML.match(/\d+/);
            if (r[6].getElementsByTagName('span')[0]) { r[6] = r[6].getElementsByTagName('span')[0].innerHTML; } else { r[6] = r[6].innerHTML.split(/<img\b[^>]*>/)[1]; };
            if (v == '') { v = '0' };
            c[0] = C(r[0] * v);
            c[1] = C(r[1] * v);
            c[2] = C(r[2] * v);
            c[3] = C(r[3] * v);
            c[4] = ReLoadTime('0:' + r[6]) * v;
            c[5] = pTime(c[4], 'time');
            c[6] = C(r[4] * v);
            c[9] = C(C(r[9]) + C(v));
            if (isNaN(c[9])) { c[9] = '0'; };
            for (i = 0; i < 4; i++) {
                d[i] = C(C(ID('l' + (i + 1)).innerHTML.split('/')[0]) - C(c[i]));

                if (d[i] > 0) { d[i] = '+' + d[i]; cx[i] = 'style="color: green;"'; } else { cx[i] = 'style="color: red;"'; };
            };
            if (ID('xPS[' + num + ']')) { ID('xPS[' + num + ']').parentNode.removeChild(ID('xPS[' + num + ']')); };
            dx = CLASS('details')[num].getElementsByClassName('tit')[0];
            dx.innerHTML = dx.innerHTML.replace('' + dx.getElementsByTagName('span')[0].innerHTML.split(/\d+/)[1], '');
            dx.innerHTML += '<span id="xPS[' + num + ']"> + ' + v + ' = ' + c[9] + ')</span>';
            ID('XP1_' + num).innerHTML = c[0] + '<br><span ' + cx[0] + '>' + d[0] + '';
            ID('XP2_' + num).innerHTML = c[1] + '<br><span ' + cx[1] + '>' + d[1] + '';
            ID('XP3_' + num).innerHTML = c[2] + '<br><span ' + cx[2] + '>' + d[2] + '';
            ID('XP4_' + num).innerHTML = c[3] + '<br><span ' + cx[3] + '>' + d[3] + '';
            ID('XP6_' + num).innerHTML = c[6];
            ID('XP5_' + num).innerHTML = c[5];
            XPS_Cul('' + num + '');
        };
        function XMLGetM(num) {
            document.body.style.cursor = 'wait';
            var xmf = [];
            $.get($('table#overview tbody tr:eq(' + (num - 1) + ') td:eq(1) a[href*="nachrichten.php?id="]').eq(0).attr('href'), function (ajax) {
                xmf[2] = $(ajax);
                if (ID('XML1')) { xli = ID('XML1'); xli.parentNode.removeChild(xli); };
                if (travian3) {
                    $('#content').append('<div class="paper" id="XML1" style="margin: 10px 0px;">' + xmf[2].find('form').eq(0).html() + '</div>');
                } else {
                    $('#content').append('<div class="paper" id="XML1" style="margin: 10px 0px;">' + xmf[2].find('.paper').eq(0).html() + '</div>');
                }

                $('table#overview tbody tr:eq(' + (num - 1) + ') td input').eq(0).attr('checked', 'checked');
                $('table#overview tbody tr:eq(' + (num - 1) + ') td:eq(2) a img').eq(0).attr('src', msgC);
                document.body.style.cursor = 'default';
            });
        };
        function sh() {
            if (!ID('xblock')) return NotePadPlus();
        };
        function GM_getValue(c_name, def) {
            if (window.localStorage) {
                var e = window.localStorage.getItem(c_name);
                if (e == null) { return def; } else { return e; };
            } else {
                var i, x, y, ARRcookies = document.cookie.split(";");
                for (i = 0; i < ARRcookies.length; i++) {
                    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                    x = x.replace(/^\s+|\s+$/g, "");
                    if (x == c_name) {
                        var getValue = unescape(y);
                        if (getValue == 'null') { getValue = def; };
                        return getValue;
                    };
                }
            };
        };
        function rmv(element) {
            return element.parentNode.removeChild(element);
        };

        function DIR() {
            return RTL;
        };
        function svnIMG(num) { /*1+2 = Close Image || 3 = small note icon || 4 = Window Header*/
            if (num == 1) return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAASCAIAAACSBMrtAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3AMICSwK/Qmd9AAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAFD0lEQVRIiY2WS4gdRRSG//9U3Uf3XPMgEXwSNDqah2KWCoogWWQhGAzGvWBWgqgJEeLKgNGoiLsIigs3CboS3ASJGHQ7C1GMeUiU6GgcX5nEmdtV53dR3XduxEWa4nK6bnedr//zqOKTjzx0cN++Kz+cDwQJAEYaACgABAwgQADwKfuaLgECHADMWwMJAOhALs8IWQAwmt30yQfvxZzl2ZmTd75lElBoWsQpiGuk0ZRBoDgl4Cq3EGAwVzEAwCRlRHliyqkZR7C8A2NxK0hEAFpWgoIg69C6df/nKks4YKAAF6xTCKK3rC4XVqSS5yZ6zjlnjZedLD6sXQ3ECo3QohT72LmFk/OLZf0Hbxg9sXHdsXMLJ3/uZm4cPXH7+olCDgAsXvNEOaGNmsozUs5olmNOSanx8bIAgJEQIVBXRUrqUDIE4OT84odHj5T/du3e4zl9cXFpeubxm0cdEAuT0AqTAbWZ1GZPURo5a5xiHo/TeHn50qKRBBykKYAGBdIBsnxDl1USgQfWhl279xSCD48emdiF5oG1MV++BMAJgBIy4GDJawdyR5kdmqjVNM3SlaicPOc0bgJhIEmaC4xt0bEL4KS+ZMLOdVGuaaYJzf1rbOf64CmhSxp1HO1QGziXydtJAfCMnKLn7Dl7MwYJEKSZGynQDQBIqlu3BLzk02NrAceu3Xvefee1QvPU0/vuX6Wda6SmwcorECDCAXc44WoJXOYdEAC5e0rxzws//HHm9IUvPzejgYGMRAyMUKCs3ALWjRIySAKWVm9EfdPS0tKkuJbnf/r91NmuSIFOlQSkruUkWAaTw8EMZKHEtN44+/e3X0V3V87ejGUEjKQTcjpBOIzOSbm2jiQAOr52dq6+6a03Xmo6Pd5646Vnn39Z7tt/P/UfoElcsiMzZDBntUBogZSzp2QAaQCDMTAYgzEEWAANFmEBIcIiQ0SMCKGM4+vumhvdcvjQ/qZpmqZ59vmXi3H40P650a3H192tYFgZgSGYBVpgrx8sBFqM0YLRjCQBuhbnL5xYTIYQrBdZ91n1OeyHamD1ANWAdcWqtmGNfo2q1rBGVaEqv8O5+uZXDr6QUkop7d1/aNvy/N79h8rtKwdfmJu5BcNhNyoMhhpWGFQY1DasWdWsK1QDqwah6tuwj6rPum+9iBCiWWRvGOuRkYE0mhGBZkGkaGz7uk2yVBC2+cKLB14vkdrmv23HL/A4mbkvX8RMjakrECr90Xp0mRgyAZcQJEousTc0izFaz2bq/po1yNnIXjAaI0lDBI00Q6QERDqFAFHYgUs7cAkqBQRUox34awf+7AoRqEaAvGxFQqIFEBmyHqUE0UHJXHS5pGA2U0frxdXX1blaNVx/gy9dJtkzgoyFI9BAI4wOIBIgDKLQNcsCpOmmsGIXadUWgxwB5uw5xCx3EJJAlyQO6lytWn1dHe/ZvPXMxYWtW+69/ON5H/8Dzz1aCKSxEASQAQYZAXhU11w02V5FTOF0kRUQgVwqV3TBHZlRQhBcyllJijT2q5lbN3x9ceGeTVv4+acnXn3m6Ucf3735jtvWVwPmBDKCJGUMpqkTCNl+vCaNhlNAE1WuUqvsHpPDkKKLRZVU2qyF35bG35z5/uOPju57+wiPvfv+htk7P3vz4Kmz3/16+R8AZDCWPYQE2sok2e0iVvwSRayWZnJQ6k483Y+8PCiXkCUJcklylU1M19fVXRtnH37uwPnvTv8L8mbozJQ5nZoAAAAASUVORK5CYII%3D';
            if (num == 2) return 'data:image/png;base64,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';
            if (num == 3) return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3AMTBCgkynMW8gAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAADkUlEQVQ4ja2UTWhcVRTH/+d9zyQzybxMbNKQNLFpQktK1dYM6ULaBrsoVIsgKogLURAF3VQXggs34s5FKdRVK+hGhSBIKUpBELRaURChWKg2lcSk8/3m3ffuu+9+uIgpVhJR8MCBC3/Oj9/hXi4ZY/B/lbNdsGd2ZgpkDTieuXXtx59b/wZG25mdff/8BVLmBE9T5ft2S+lspd3u3Ih7ye/dTmel2Wosr/628uvXX1y58Y+wIydPHb/w7rmLq/WG3Wi2EHGOZrNlom4bge/JNI3Tgu9nLFpfv3L54tuXLn3zwZZrOr7vXP72+zcHw5BKlQruVRqpVIhzSfU4xc3bdbcTRW6zE4Eq49Xdk9deAbA17InnX3hm99TUeIsLOETQMOBKIZUKOQh+qQzHCVAoDmLK1fSdZcp3RP4KKlWHBz756upziZS50obquQQMABj0hATLcwilIaRCnueYHurHD5Ye2BL25Munn5Wej1u9JCq5DikDtHiGVCoYAyS5RC/LIZTCzqIHUgqupe+YWZuH0Zm9E/OPPHZsjfGonmR6lXHUUw6pDZiQWGMpGmkGJiSSTGB2qAzOUxitg8C1vLvMFl86/fRqnMWuLayS54z2ew6kNtDGQGkDnkswIZHlCiOBhUHfw+2UwxhNnmuVADQtAJg8fOQApvZOLHfj3nKX9VpJFnRSgS4XaCUZGowjyTZAuZTYF5YBrREzBik4PJcGAMCxXc8++Na5U9cbbRE4Nrm2hX6rUlFKQ2sN9aeZ1AaAwYhvYdB3Aa0Qsxi5SOE51gZs/PijD684xVHTibRNZHzH9qb7g6Ek4zAGICIYYwACbAJmdlQhlUaBCL2YQfIYxcApA4Aze/Lxp3oDw9UoSbKEc1G0MNpNuQUYEBFo86aIMN7n456CD6UUGOfIpQQko76iv2H25esvvjZ234OHq/sPHhidnds/PDaxzyGCEBmEEFBKwmgNm4C58SqUUsi1RtaLIPMMvmMQBF4IAE7SaqwDWAKwVOzrK5w9/97V8q7pcC33rZtMoJ5tDIeQ2FkqQkgFm4B2t4s07phCsUCBzyeJyLnr0SaMpQDmKmG4q1arHa0tLBw78cChozS8Y6zPc0lKCW0AzwKa7TZWVuu/fLh0/Q2W5J8bY+S2X9BmEZE1MjIyU1tYWJyv1RbvPzT/UFgZDN85c+azTz/+6FUWxz+ZTYgx5j81iNxwaGgPAOvv2R8pNBR0ptIBpgAAAABJRU5ErkJggg%3D%3D';
            if (num == 4) return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAWCAYAAAABxvaqAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3AMTBQ0lVEWctAAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAATklEQVQImU3HOxJAUBAF0Z5r4zZnCV4pmVAJPJnfzIgUSddpunHIZlrmlohMRSY6r0C3B3JPdJyOPBKt247AkGTIzJCMV9J/v/SlQK01H7dDJd+mEupkAAAAAElFTkSuQmCC';
        };
        function getXQR(href) {
            if (ID('sMR')) {
                $('#sMR').stop().animate({ "opacity": "0" }, "slow");
            };
            $.get(href, function (ajax) {
                var XmR = $(ajax);
                var admin = '';
                $('#sMR').html('');

                function rDV(html) { for (i = 0; i < html.toString().split(/<div\b[^>]*>/).length; i++) { html = html.toString().replace('<div>', ''); html = html.toString().replace('<div>', ''); html = html.toString().replace('<div>', ''); html = html.toString().replace('<div>', ''); html = html.toString().replace('</div>', ''); }; return html; };
                if (href.toString().match(/nach/)) {
                    XmR = XmR.find('div#content form').html();
                } else if (href.toString().match(/berich/)) {
                    XmR = $('<table cellspacing="1">' + rDV(XmR.find('div#content form table').html()) + '</table>');
                } else {
                    XmR = $('<table cellspacing="1">' + rDV(XmR.find('div#content table').html()) + '</table>');
                };
                $(XmR).appendTo(ID('sMR'));

                ID('sMR').getElementsByTagName('table')[0].style.border = '1px solid black';
                var get_Admin = $(ajax).find('div#content div.paginator');
                if (get_Admin.html()) { get_Admin = get_Admin.html(); } else { get_Admin = ''; };
                admin = '<div class="paginator" id="_page" align="center" style="float: ' + (DIR() == "rtl" ? "left" : "right") + ';">' + get_Admin + '</div>';
                if (href.toString().match(/nach/)) {
                    for (i = 0; i < 10; i++) {
                        if ($('#sMR .paginator')) { $('#sMR .paginator').remove(); };
                        if ($('#sMR #markAll')) { $('#sMR #markAll').remove(); };
                        if ($('#sMR .administration')) { $('#sMR .administration').remove(); };
                    };
                };

                $('<tfoot><tr><td colspan="5" id="_admin" style="text-align: center; color: red;"></td></tr></tfoot>').appendTo($('div#sMR table'));
                $(admin).appendTo($('#_admin'));
                $('<div id="DRGB" style="padding: 0px 0px 3px; width: 100%; height: 22px; float: ' + (RTL == "rtl" ? "left" : "right") + ';"><img style="cursor: pointer;" id="btn_cls" src="' + svnIMG(1) + '" /></div>').insertBefore($('#sMR table'));
                $('#btn_cls').bind('mouseover', function () { this.src = svnIMG(2); });
                $('#btn_cls').bind('mouseout', function () { this.src = svnIMG(1); });
                $('#btn_cls').bind('click', function () { $('#sMR').stop().animate({ "opacity": "0" }, "slow"); setTimeout(function () { rmv(ID('sMR')) }, 1000); });

                if (ID('_page').getElementsByTagName('a')) {
                    for (i = 0; i < ID('_page').getElementsByTagName('a').length; i++) {
                        ID('_page').getElementsByTagName('a')[i].addEventListener('click', function () { return getXQR(this.getAttribute('value')); }, true);
                        ID('_page').getElementsByTagName('a')[i].setAttribute('value', ID('_page').getElementsByTagName('a')[i].href);
                        ID('_page').getElementsByTagName('a')[i].setAttribute('href', 'javascript:void(0)');
                    };
                };

                for (i = 0; i < ID('sMR').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('img').length; i++) {
                    $('#sMR table tbody img').eq(i).bind('mouseover', function () { displayMSG('<b style="padding: 4px;">' + this.alt + '</b>'); });
                    $('#sMR table tbody img').eq(i).bind('mouseout', function () { ID('T4_mHelp').style.display = 'none'; });
                };

                for (i = 0; i < ID('sMR').getElementsByClassName('clear').length; i++) { $('#sMR table .clear').remove(); };
                $('#sMR table thead').remove();

                if ($('div#sMR table !div[style*="float"]').html()) { $('div#sMR table !div[style*="float"]').remove(); };
                $('#sMR').stop().animate({ "opacity": "1" }, "slow");
                MakeDrag(ID('DRGB'), ID('sMR'));
            })
        };

        function getQuick_RM() {
            function create_acc() {
                if (!ID('sMR')) {
                    var x, y, z;
                    z = getPosition('sMR', '175px_500px').split('_'), x = z[1], y = z[0];
                    appThis(document.body, [Create('div', { style: 'opacity: 0; top: ' + y + '; left: ' + x + '; position: absolute;', id: 'sMR' })]);
                };
            };
            var R = Create('img');
            R.setAttribute('src', xR);
            R.setAttribute('style', 'cursor: pointer; position: relative; width: 32px; height: 32px;');
            $(R).bind('click', function () { create_acc(); return getXQR('berichte.php'); });
            $('#t4tools ul').append($('<hr style="margin: 0px;">'));
            $('#t4tools ul').append(R);

            var M = Create('img');
            M.setAttribute('src', xM);
            M.setAttribute('style', 'cursor: pointer; z-index: 10000; width: 32px; height: 32px;');
            $(M).bind('click', function () { create_acc(); return getXQR('nachrichten.php'); });
            $('#t4tools ul').append(M);
            if ($('div.sideInfoAlly').eq(0).html() || GM_getValue('qq1') != '-') {
                var A = Create('img');
                A.setAttribute('src', xA);
                A.setAttribute('style', 'cursor: pointer; z-index: 10000; width: 32px; height: 32px;');
                $(A).bind('click', function () { if (CLASS('sideInfoAlly')[0] || GM_getValue('qq1') != '-') { create_acc(); return getXQR('allianz.php?s=3'); } });
                $('#t4tools ul').append(A);
            };
        };
        function xyToId(x, y) {
            return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));
        }
        function get_xy(vid) {
            var arrXY = [];
            var ivid = C(vid);
            arrXY[0] = ((ivid - 1) % 801) - 400;
            arrXY[1] = 400 - Math.floor((ivid - 1) / 801);
            return arrXY;
        };
        function Distance(id1, id2) {
            var myXY = get_xy(id1);
            var dXY = get_xy(id2);
            dX = Math.min(Math.abs(dXY[0] - myXY[0]), Math.abs(801 - Math.abs(dXY[0] - myXY[0])));
            dY = Math.min(Math.abs(dXY[1] - myXY[1]), Math.abs(801 - Math.abs(dXY[1] - myXY[1])));
            return Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
        };

        function secExp(sec) {
            var now = new Date();
            var time = now.getTime();
            time += sec * 1000;
            now.setTime(time);
        };
        function Handle(responseDetails) {
            var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
            doc = document.implementation.createDocument('', '', dt);
            html = doc.createElement('html');
            html.innerHTML = responseDetails;
            doc.appendChild(html);
            return doc;
        };
        function MyVid() {
            if (travian3) {

            } else {
                appThis(ID('stime'), [Create('div', { id: 'xgy', style: 'display: none;' })]);
                if (!GM_getValue('T4_MyVID' + $('li[class*="active"] a[href*="newdid"]').attr('href').split('id=')[1])) {
                    $.get('statistiken.php?id=2', function (ajax) {
                        var GM = $(ajax);
                        var xy = GM.find('table#villages tbody tr.hl td.vil a:eq(0)').attr('href').match(/\d+/);
                        ID('xgy').innerHTML = xy;
                        ID('xgy').setAttribute('value', get_xy(xy)[0]);
                        ID('xgy').setAttribute('class', get_xy(xy)[1]);
                        GM_setValue('T4_MyVID' + $('li[class*="active"] a.active').attr('href').match(/\d+/), xy);
                    });
                } else {
                    var xy = GM_getValue('T4_MyVID' + $('li[class*="active"] a.active').attr('href').match(/\d+/));
                    ID('xgy').innerHTML = xy;
                    ID('xgy').setAttribute('value', get_xy(xy)[0]);
                    ID('xgy').setAttribute('class', get_xy(xy)[1]);
                };
            }
        };
        function MyId() {
            return ID("xgy").innerHTML;
        };
        function NewPosition(Element, xy) {
            var cW = Element.clientWidth;
            var cH = Element.clientHeight;
            var y = C(xy[1] + 12);
            var x = C(xy[0] + 12);
            if (y + (cH + 21) > (window.innerHeight + window.scrollY)) if (y > cH + 32) y = y - cH - 32; else y = 0;
            if (ID('T4_mHelp').getElementsByClassName('t4Style')[0]) y = C(y) + 12;
            Element.style.top = y + "px";
            if (x + (cW + 21) > (window.innerWidth + window.scrollX)) x = x > cH + 32 ? x - cW - 32 : 0;
            if (ID('T4_mHelp').getElementsByClassName('t4Style')[0]) x = C(x) - 240;
            Element.style.left = x + "px";
        };
        function showHelp_move(ev) {
            if (ID("T4_mHelp").style.display != 'none') {
                ID('T4_mHelp').style.zIndex = '10500';
                NewPosition(ID('T4_mHelp'), [ev.pageX, ev.pageY]);
            };
        };
        function sHide() {
            ID('T4_mHelp').style.display = 'none';
        };
        function building_increase() {
            if ($('table#build_value tbody tr:eq(2) td').eq(0).html()) {
                var incA, incB, cA, cB;
                incA = $('table#build_value tbody tr:eq(1) td').eq(0).html().match(/\d+/);
                incB = $('table#build_value tbody tr:eq(2) td').eq(0).html().match(/\d+/);

                cA = C(incB - incA);
                cB = (C(incA / incB * 100) - 100).toString().replace('-', '');

                return $('#build_value tbody').append($('<tr><th></th><td style="text-align:center;">' + cB + '%(' + (cA < 0 ? '' : '+') + '' + cA + ')</td></tr>'));
            };
        };
        function X_CE_Change(id) {
            if (id == 'Xcon') {
                ID('Xeon').style.display = 'none';
                ID('sO').checked = true;
                ID('sO').removeAttribute('disabled');
                ID('xAll').removeAttribute('disabled');
                ID('selectOT').removeAttribute('disabled');
                ID('xU39').disabled = 'disabled';
                ID('xU38').disabled = 'disabled';
                ID('xU39').checked = false;
                ID('xU38').checked = false;
                return ID('Xcon').style.display = 'block';
            } else {
                ID('Xcon').style.display = 'none';
                ID('sO').checked = false;
                ID('sO').disabled = 'disabled';
                ID('selectOT').disabled = 'disabled';
                ID('xAll').checked = false;
                ID('xAll').disabled = 'disabled';
                ID('xU39').removeAttribute('disabled');
                ID('xU38').removeAttribute('disabled');
                return ID('Xeon').style.display = 'block';
            };
        };
        function GM_setValue(c_name, value, exdays) {
            if (window.localStorage) {
                return window.localStorage.setItem(c_name, value);
            } else {
                var exdate = new Date();
                exdate.setDate(exdate.getDate() + exdays);
                var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
                return document.cookie = c_name + "=" + c_value;
            };
        };

        function village_states() {

            function get_states() {
                var top = C(RTL == 'rtl' ? 215 : 216);
                if (CLASS('sideInfoAlly')[0]) top = C(C(top) + C(47));
                var village_id = [];
                for (v = 0; v < $('div#villageList a[href*="newdid="]').length; v++) {
                    if (travian3) {
                        village_id[v] = $('div#side_info a[href*="newdid="]:eq(' + v + ')').attr('href').split('newdid=')[1].match(/\d+/);
                    } else {
                        village_id[v] = $('div#villageList a[href*="newdid"]:eq(' + v + ')').attr('href').split('newdid=')[1].match(/\d+/);
                    };

                    html = '<table class="mov_state" style="display:none;"><tbody>';
                    var left = C(RTL == 'rtl' ? 29 : 164);
                    var width = 0;
                    if (v == 0); else top = C(C(top) + C(18));
                    mov_eachType = eval(GM_getValue(village_id[v] + '_this_movements', '[]'));
                    mov_exist = false;
                    imgs = '<span class="mov">';
                    for (i = 0; i < mov_eachType.length; i++) {
                        if (mov_eachType[i] && mov_eachType[i][0]) {
                            mov_exist = true;
                            left = (RTL == 'rtl' ? C(C((left) - C(20))) : left);
                            width = C(width) + 20;
                            html = html + '<tr><td><img src="img/x.gif" class="' + mov_eachType[i][0] + '" /></td><td>' + mov_eachType[i][1] + '</td><td class="count_down_timer">' + EndTime(mov_eachType[i][2]) + '</td><td>' + mov_eachType[i][2] + '</td></tr>';
                            imgs = imgs + '<a href="build.php?newdid=' + village_id[v] + '&tt=1&gid=16"><img src="img/x.gif" class="' + mov_eachType[i][0] + '" /></a>';
                        };
                    };
                    bau_exist = false;
                    Buildings = eval(GM_getValue(village_id[v] + '_this_buildings', '[]'));
                    b_html = '<table class="bau_state" style="display:none;"><tbody>';
                    b_imgs = '<span class="bau">';
                    for (i = 0; i < Buildings.length; i++) {
                        if (Buildings[i] && Buildings[i][0]) {
                            bau_exist = true;
                            if (i == 0) left = (RTL == 'rtl' ? C(C((left) - C(20))) : left);
                            if (i == 0) width = C(width) + 20;
                            b_html = b_html + '<tr><td>' + Buildings[i][0] + '</td><td class="count_down_timer">' + EndTime(Buildings[i][1]) + '</td><td>' + Buildings[i][1] + '</td></tr>';
                            if (i == 0) b_imgs = b_imgs + '<a href="dorf1.php?newdid=' + village_id[v] + '"><img src="' + bau_img + '" /></a>';
                        };
                    };
                    src_exist = false;
                    Research = eval(GM_getValue(village_id[v] + '_this_research', '[]'));
                    s_html = '<table class="src_state" style="display:none;"><tbody>';
                    s_imgs = '<span class="src">';
                    for (i = 0; i < Research.length; i++) {
                        if (Research[i] && Research[i][0]) {
                            src_exist = true;
                            if (i == 0) left = (RTL == 'rtl' ? C(C((left) - C(20))) : left);
                            if (i == 0) width = C(width) + 20;
                            s_html = s_html + '<tr><td><img value="0" src="img/x.gif" class="' + Research[i][0] + '" /></td><td>' + Research[i][1] + '</td><td class="count_down_timer">' + EndTime(Research[i][2]) + '</td></tr>';
                            if (i == 0) s_imgs = s_imgs + '<a href="dorf1.php?newdid=' + village_id[v] + '"><img class="' + Research[i][0] + '" src="img/x.gif" /></a>';
                        };
                    };
                    tra_A_exist = false;
                    tra_B_exist = false;
                    tra_C_exist = false;
                    tra_D_exist = false;
                    tra_E_exist = false;
                    Trains_A = eval(GM_getValue(village_id[v] + '_19_this_trains', '[]'));
                    Trains_B = eval(GM_getValue(village_id[v] + '_20_this_trains', '[]'));
                    Trains_C = eval(GM_getValue(village_id[v] + '_21_this_trains', '[]'));
                    Trains_D = eval(GM_getValue(village_id[v] + '_29_this_trains', '[]'));
                    Trains_E = eval(GM_getValue(village_id[v] + '_30_this_trains', '[]'));
                    tr_html = '<table class="tra_state" style="display:none;"><tbody>';
                    tr_imgs = '<span class="tra">';
                    var train_check = [];
                    for (i = 0; i < Trains_A.length; i++) {
                        if (Trains_A[i] && Trains_A[i][0]) {
                            tra_A_exist = true;
                            tr_html = tr_html + '<tr><td><img class="' + Trains_A[i][0] + '" src="img/x.gif" /></td><td>+' + Trains_A[i][1] + '</td><td class="count_down_timer">' + EndTime(Trains_A[i][2]) + '</td><td>' + Trains_A[i][2] + '</td></tr>';
                            if (train_check['' + Trains_A[i][0] + '']); else {
                                train_check['' + Trains_A[i][0] + ''] = Trains_A[i][0];
                                left = (RTL == 'rtl' ? C(C((left) - C(20))) : left);
                                width = C(width) + 20;
                                tr_imgs = tr_imgs + '<a href="build.php?newdid=' + village_id[v] + '&gid=19"><img class="' + Trains_A[i][0] + '" value="19" src="img/x.gif" /></a>';
                            };
                        };
                    };
                    for (i = 0; i < Trains_B.length; i++) {
                        if (Trains_B[i] && Trains_B[i][0]) {
                            tra_B_exist = true;
                            tr_html = tr_html + '<tr><td><img class="' + Trains_B[i][0] + '" src="img/x.gif" /></td><td>+' + Trains_B[i][1] + '</td><td class="count_down_timer">' + EndTime(Trains_B[i][2]) + '</td><td>' + Trains_B[i][2] + '</td></tr>';
                            if (train_check['' + Trains_B[i][0] + '']); else {
                                train_check['' + Trains_B[i][0] + ''] = Trains_B[i][0];
                                left = (RTL == 'rtl' ? C(C((left) - C(20))) : left);
                                width = C(width) + 20;
                                tr_imgs = tr_imgs + '<a href="build.php?newdid=' + village_id[v] + '&gid=20"><img class="' + Trains_B[i][0] + '" value="20" src="img/x.gif" /></a>';
                            };
                        };
                    };
                    for (i = 0; i < Trains_C.length; i++) {
                        if (Trains_C[i] && Trains_C[i][0]) {
                            tra_C_exist = true;
                            tr_html = tr_html + '<tr><td><img class="' + Trains_C[i][0] + '" src="img/x.gif" /></td><td>+' + Trains_C[i][1] + '</td><td class="count_down_timer">' + EndTime(Trains_C[i][2]) + '</td><td>' + Trains_C[i][2] + '</td></tr>';
                            if (train_check['' + Trains_C[i][0] + '']); else {
                                train_check['' + Trains_C[i][0] + ''] = Trains_C[i][0];
                                left = (RTL == 'rtl' ? C(C((left) - C(20))) : left);
                                width = C(width) + 20;
                                tr_imgs = tr_imgs + '<a href="build.php?newdid=' + village_id[v] + '&gid=21"><img class="' + Trains_C[i][0] + '" value="21" src="img/x.gif" /></a>';
                            };
                        };
                    };
                    for (i = 0; i < Trains_D.length; i++) {
                        if (Trains_D[i] && Trains_D[i][0]) {
                            tra_D_exist = true;
                            tr_html = tr_html + '<tr><td><img class="' + Trains_D[i][0] + '" src="img/x.gif" /></td><td>+' + Trains_D[i][1] + '</td><td class="count_down_timer">' + EndTime(Trains_D[i][2]) + '</td><td>' + Trains_D[i][2] + '</td></tr>';
                            if (train_check['' + Trains_D[i][0] + '']); else {
                                train_check['' + Trains_D[i][0] + ''] = Trains_D[i][0];
                                left = (RTL == 'rtl' ? C(C((left) - C(20))) : left);
                                width = C(width) + 20;
                                tr_imgs = tr_imgs + '<a href="build.php?newdid=' + village_id[v] + '&gid=29"><img class="' + Trains_D[i][0] + '" value="29" src="img/x.gif" /></a>';
                            };
                        };
                    };
                    for (i = 0; i < Trains_E.length; i++) {
                        if (Trains_E[i] && Trains_E[i][0]) {
                            tra_E_exist = true;
                            tr_html = tr_html + '<tr><td><img class="' + Trains_E[i][0] + '" src="img/x.gif" /></td><td>+' + Trains_E[i][1] + '</td><td class="count_down_timer">' + EndTime(Trains_E[i][2]) + '</td><td>' + Trains_E[i][2] + '</td></tr>';
                            if (train_check['' + Trains_E[i][0] + '']); else {
                                train_check['' + Trains_E[i][0] + ''] = Trains_E[i][0];
                                left = (RTL == 'rtl' ? C(C((left) - C(20))) : left);
                                width = C(width) + 20;
                                tr_imgs = tr_imgs + '<a href="build.php?newdid=' + village_id[v] + '&gid=30"><img class="' + Trains_E[i][0] + '" value="30" src="img/x.gif" /></a>';
                            };
                        };
                    };
                    var t_html = '<span><span class="villst" id="' + village_id[v] + '_village_state" style="position: absolute; top: ' + top + 'px; left: ' + left + 'px;width:' + width + 'px;"></span></span>';
                    if (mov_exist == true || bau_exist == true || tra_A_exist == true || tra_B_exist == true || tra_C_exist == true || tra_D_exist == true || tra_E_exist == true || src_exist == true) {
                        $(t_html).insertBefore('div#villageList');
                        if (mov_exist == true) {
                            html = html + '</tbody></table>';
                            imgs = imgs + '</span>';
                            $('span#' + village_id[v] + '_village_state').append(html);
                            $('span#' + village_id[v] + '_village_state').append(imgs);
                            $('span#' + village_id[v] + '_village_state').find('span[class="mov"] img').hover(function () { set_Title('<table cellspacing="0">' + $(this).parent().parent().parent().find('table[class="mov_state"]').html() + '</table>'); }, function () { ID('T4_mHelp').style.display = 'none'; });
                        }
                        if (src_exist == true) {
                            html = html + '</tbody></table>';
                            imgs = imgs + '</span>';
                            $('span#' + village_id[v] + '_village_state').append(s_html);
                            $('span#' + village_id[v] + '_village_state').append(s_imgs);
                            $('span#' + village_id[v] + '_village_state').find('span[class="src"] img').hover(function () { set_Title('<table cellspacing="0">' + $(this).parent().parent().parent().find('table[class="src_state"]').html() + '</table>'); }, function () { ID('T4_mHelp').style.display = 'none'; });
                        }
                        if (bau_exist == true) {
                            b_html = b_html + '</tbody></table>';
                            b_imgs = b_imgs + '</span>';
                            $('span#' + village_id[v] + '_village_state').append(b_html);
                            $('span#' + village_id[v] + '_village_state').append(b_imgs);
                            $('span#' + village_id[v] + '_village_state').find('span[class="bau"] img').hover(function () { set_Title('<table cellspacing="0">' + $(this).parent().parent().parent().find('table[class="bau_state"]').html() + '</table>'); }, function () { ID('T4_mHelp').style.display = 'none'; });
                        };
                        if (tra_A_exist == true || tra_B_exist == true || tra_C_exist == true || tra_D_exist == true || tra_E_exist == true) {
                            function img_over() {
                                ID('T4_mHelp').style.displey = null;
                                set_Title('<table cellspacing="0">' + $(this).parent().parent().parent().find('table[class="tra_state"]').html() + '</table>');
                            };
                            function img_out() {
                                ID('T4_mHelp').style.display = 'none';
                            };
                            tr_html = tr_html + '</tbody></table>';
                            tr_imgs = tr_imgs + '</span>';
                            $('span#' + village_id[v] + '_village_state').append(tr_html);
                            $('span#' + village_id[v] + '_village_state').append(tr_imgs);
                            $('span#' + village_id[v] + '_village_state').find('span[class="tra"] img[value]').hover(img_over, function () { img_out($(this).attr('value')); });
                        };

                    };
                };
            };
            var vn_id = $('div#villageList li[class*="active"] a[href*="newdid="]').attr('href').split('newdid=')[1].match(/\d+/);
            if (exp(/dorf1\.php/) && ID('production') && ID('troops') && ID('village_map')) {
                if (ID('movements') && ID('movements').getElementsByTagName('img')[0]) {
                    var mov_states = [], img_type = [], mov_name = [], mov_time = [];
                    for (i = 0; i < $('#movements img').length; i++) {
                        img_type[i] = $('#movements img').eq(i).attr('class');
                        mov_name[i] = $('#movements img').eq(i).parent().parent().parent().find('td:eq(1) div.mov:eq(0) span:eq(0)').html();
                        mov_time[i] = CulTime($('#movements img').eq(i).parent().parent().parent().find('td:eq(1) div.dur_r:eq(0) span[id*="timer"]').text());
                        mov_states.push('["' + img_type[i] + '", "' + mov_name[i] + '", "' + mov_time[i] + '"]');
                    };
                    GM_setValue(vn_id + '_this_movements', '[' + mov_states + ']');
                } else if (exp(/dorf1\.php/) && ID('production') && ID('village_map') && ID('troops')) {
                    if (!xpath('//table[@id="movements"]/img').snapshotItem(0)) GM_setValue(vn_id + '_this_movements', '[]');
                };
            };
            if (exp(/dorf(1|2)\.php/)) {
                if (ID('building_contract') && ID('building_contract').getElementsByTagName('img')[0]) {
                    var bName = [], bTime = [], build_state = [];
                    for (i = 0; i < $('#building_contract tbody tr').length; i++) {
                        bName[i] = $('#building_contract tbody tr:eq(' + i + ') td:eq(1)').text();
                        bTime[i] = $('#building_contract tbody tr:eq(' + i + ') td[class="buildingTime"] span').text();
                        build_state.push('["' + bName[i] + '", "' + CulTime(bTime[i]) + '"]');
                    };
                    GM_setValue(vn_id + '_this_buildings', '[' + build_state + ']');
                } else if (exp(/dorf(1|2)\.php/) && !ID('building_contract')) {
                    if (!xpath('//table[@id="building_contract"]/img').snapshotItem(0)) GM_setValue(vn_id + '_this_buildings', '[]');
                };
            };
            if (CLASS('buildActionOverview trainUnits')[0] && CLASS('under_progress')[0]) {
                var typ = ID('build').className.match(/\d+/);
                var unit = [], trains = [], times = [], pushs = [];
                for (i = 0; i < $('.under_progress tbody tr:not([class])').length; i++) {
                    if ($('.under_progress tbody tr:not([class])').eq(i).find('td:eq(1) span').text()) {
                        unit[i] = $('.under_progress tbody tr:not([class])').eq(i).find('td:eq(0) img').attr('class');
                        trains[i] = $('.under_progress tbody tr:not([class])').eq(i).find('td:eq(0)').text().replace(/	/g, '').replace(/\W/g, ' ');
                        times[i] = CulTime($('.under_progress tbody tr:not([class])').eq(i).find('td:eq(1) span').text());
                        pushs.push('["' + unit[i] + '", "' + trains[i] + '", "' + times[i] + '"]');
                    };
                };
                GM_setValue(vn_id + '_' + typ + '_this_trains', '[' + pushs + ']');
            } else if (CLASS('buildActionOverview trainUnits')[0] && !CLASS('under_progress')[0]) {
                var typ = ID('build').className.match(/\d+/);
                GM_setValue(vn_id + '_' + typ + '_this_trains', '[' + pushs + ']');
            };
            if (ID('researchFuture') && CLASS('under_progress')[0]) {
                var research = $('h4.round').text().replace('.', '');
                var aaa, bbbb, ccc, pushs;
                if ($('.under_progress tbody tr:not([class]) td:eq(1) span').text()) {
                    aaa = $('.under_progress tbody tr:eq(0) td:eq(0) img').attr('class');
                    bbb = $('.under_progress tbody tr:eq(0) td:eq(0)').text().replace(/	/g, '').replace(/\W/g, ' ');
                    ccc = CulTime($('.under_progress tbody tr:eq(0) td.dur span').text());
                    pushs = '["' + aaa + '", "' + research + ': ' + bbb + '", "' + ccc + '"]';
                };
                GM_setValue(vn_id + '_this_research', '[' + pushs + ']');
            } else if (ID('researchFuture') && !CLASS('under_progress')[0]) {
                var typ = ID('build').className.match(/\d+/);
                GM_setValue(vn_id + '_this_research', '[]');
            };
            get_states();
        };
        function help_fun() {
            function resTitle(num) { return xpath("//ul[@id='res']/li[" + num + "][@class='r" + num + "']/p/img").snapshotItem(0).alt; };
            $('<div style="border: 1px solid; border-top: 0px solid;" id="Searcher">' +
    '<form>' +
    '<span><input type="radio" name="Search" checked="true" onclick="X_CE_Change(\'Xcon\');" />' + SubLanguage(LanguagePack(), 16) + '' +
    '<span>&nbsp;|&nbsp;' +
    '<span>' +
    '<input type="checkbox" name="selOne" id="sO" onclick="if(this.checked == true){ID(\'selectOT\').removeAttribute(\'disabled\'); ID(\'xAll\').checked = false;}else{ID(\'selectOT\').disabled = \'disabled\';};" /><img src="img/x.gif" class="r0"></span>&nbsp;' +
    '<select id="selectOT" disabled="disabled">' +
    '<option value="0">' + resTitle('4') + ' %50</option>' +
    '<option value="1">' + resTitle('4') + '+' + resTitle('3') + ' %25</option>' +
    '<option value="2">' + resTitle('4') + '+' + resTitle('2') + ' %25</option>' +
    '<option value="3">' + resTitle('4') + '+' + resTitle('1') + ' %25</option>' +
    '<option value="4">' + resTitle('4') + ' %25</option>' +
    '<option value="5">' + resTitle('3') + ' %25</option>' +
    '<option value="6">' + resTitle('2') + ' %25</option>' +
    '<option value="7">' + resTitle('1') + ' %25</option>' +
    '</select>' +
    '</span>' +
    '&nbsp;|&nbsp;' +
    '<span><input type="checkbox" checked="checked" name="selOne" id="xAll" onclick="ID(\'sO\').checked = false; ID(\'selectOT\').disabled = \'disabled\';" />' + SubLanguage(LanguagePack(), 38) + '</span>' +
    '</span><br><hr style="margin: 5px;">' +
    '<span><input type="radio" name="Search" onclick="X_CE_Change(\'Xeon\');" />' + SubLanguage(LanguagePack(), 17) + '' +
    ' + <input type="checkbox" id="xU39" disabled="disabled"><img class="unit u39" src="img/x.gif">' +
    ' + <input type="checkbox" id="xU38" disabled="disabled"><img class="unit u38" src="img/x.gif">' +
    '</form>' +
    '</div>').appendTo('#content');
        };
        function CCDC() {
            var s = '<div id="Xcon">';
            s += ID("mapCoordEnter").getElementsByClassName("xCoord")[0].getElementsByTagName("label")[0].innerHTML + ' <input type="text" id="crop_x" maxsize="4" size="4" value=""/>&nbsp;' +
    '' + ID("mapCoordEnter").getElementsByClassName("yCoord")[0].getElementsByTagName("label")[0].innerHTML + ' <input type="text" id="crop_y" maxsize="4" size="4" value=""/>' +
    '&nbsp;' + SubLanguage(LanguagePack(), 18) + ': <input type="text" id="rad" maxsize="4" size="4" value="3"/> <input type="button" id="cFinderX" Value="' + SubLanguage(LanguagePack(), 19) + '" /><br/>' +
    '<span id="scx" style="display: none;">' + SubLanguage(LanguagePack(), 20) + ' ' + SubLanguage(LanguagePack(), 21) + ' <span id="crop_done">0</span> ' + SubLanguage(LanguagePack(), 22) + ' <span id="crop_tot">0</span><span>&nbsp;|&nbsp;' + SubLanguage(LanguagePack(), 23) + ': <span id="percx">0%</span></span></span>' +
    '<table id="crop_fields" style="border: 0px solid; background-color: white; width: auto;"></table></div>';
            return s; //ID('xgy').getAttribute('title')
        };

        function cLang() {
            var LNG = ID('cLang').selectedIndex;
            var MyLNG = ID('cLang').options[LNG].value;
            GM_setValue('cLength', LNG);
            GM_setValue('MyLang', MyLNG);
            return $("#t4_setting .t4_set").animate({ "opacity": "0" }, 333, function () { $("#t4_setting").remove(); setting(); $("#t4_setting .t4_set").fadeIn(333); });
        };
        function cSpeed() {
            var Spd = ID('cSpeed').selectedIndex;
            var MySpd = ID('cSpeed').options[Spd].value;
            GM_setValue('cSpeed', Spd);
            return GM_setValue('MySpeed', MySpd);
        };
        function OnChange() {
            ID('xtr[1]').innerHTML = 0;
            ID('xtrs[1]').innerHTML = 0;
            ID('xtr[2]').innerHTML = 0;
            ID('xtr[3]').innerHTML = 0;
            ID('xtr[4]').innerHTML = 0;
            ID('xtr[5]').innerHTML = 0;
            ID('xtr[6]').innerHTML = 0;
            ID('xtr[7]').innerHTML = 0;
            ID('xtr[8]').innerHTML = 0;
            ID('xtr[9]').innerHTML = 0;
            var getx = [];
            var gety = [];
            var gett = [];
            for (x = 0; x < 10; x++) {
                getx[x] = document.getElementsByName('t' + (x + 1))[0].parentNode.childNodes[0].className.split(' u')[1];
                if (
        document.getElementsByName('t' + (x + 1))[0].value == '' ||
        document.getElementsByName('t' + (x + 1))[0].value.match(/\D/)
        )
                { gett[x] = 0; } else { gett[x] = document.getElementsByName('t' + (x + 1))[0].value; };
                gety['attack'] = C(C(xtr(getx[x], 0)) * C(gett[x]));
                gety['attacks'] = C(C(xtr(getx[x], 0)) * C(gett[x]));
                gety['def_A'] = C(C(xtr(getx[x], 1)) * C(gett[x]));
                gety['def_B'] = C(C(xtr(getx[x], 2)) * C(gett[x]));
                gety['res1'] = C(C(xtr(getx[x], 3)) * C(gett[x]));
                gety['res2'] = C(C(xtr(getx[x], 4)) * C(gett[x]));
                gety['res3'] = C(C(xtr(getx[x], 5)) * C(gett[x]));
                gety['res4'] = C(C(xtr(getx[x], 6)) * C(gett[x]));
                gety['xcrop'] = C(C(xtr(getx[x], 7)) * C(gett[x]));
                gety['carry'] = C(C(xtr(getx[x], 9)) * C(gett[x]));
                if (TroopType(getx[x]).toString().match(/i/)) { ID('xtr[1]').innerHTML = C(C(ID('xtr[1]').innerHTML) + C(gety['attack'])); };
                if (TroopType(getx[x]).toString().match(/c/)) { ID('xtrs[1]').innerHTML = C(C(ID('xtrs[1]').innerHTML) + C(gety['attacks'])); };
                ID('xtr[2]').innerHTML = C(C(ID('xtr[2]').innerHTML) + C(gety['def_A']));
                ID('xtr[3]').innerHTML = C(C(ID('xtr[3]').innerHTML) + C(gety['def_B']));
                ID('xtr[4]').innerHTML = C(C(ID('xtr[4]').innerHTML) + C(gety['carry']));
                ID('xtr[5]').innerHTML = C(C(ID('xtr[5]').innerHTML) + C(gety['xcrop']));
                ID('xtr[6]').innerHTML = C(C(ID('xtr[6]').innerHTML) + C(gety['res1']));
                ID('xtr[7]').innerHTML = C(C(ID('xtr[7]').innerHTML) + C(gety['res2']));
                ID('xtr[8]').innerHTML = C(C(ID('xtr[8]').innerHTML) + C(gety['res3']));
                ID('xtr[9]').innerHTML = C(C(ID('xtr[9]').innerHTML) + C(gety['res4']));
            };
        };

        function format(maxtime) {
            var dys = Math.floor(maxtime / 86400)
            var hrs = Math.floor(maxtime / 3600) % 24;
            var min = Math.floor(maxtime / 60) % 60;
            var sec = maxtime % 60;
            var t = dys + ":";
            if (hrs < 10) { hrs = '0' + hrs; }
            t += hrs + ":";
            if (min < 10) { t += "0"; }
            t += min + ":";
            if (sec < 10) { t += "0"; }
            t += sec; return ((t.toString().match(/NaN/)) ? '0:00:00:00' : t);
        };

        function formatUp(maxtime) {
            var hrs = Math.floor(maxtime / 3600) % 24;
            var min = Math.floor(maxtime / 60) % 60;
            var sec = maxtime % 60;
            if (hrs < 10) { hrs = '0' + hrs; }
            t = hrs + ":";
            if (min < 10) { t += "0"; }
            t += min + ":";
            if (sec < 10) { t += "0"; }
            t += sec; return ((t.toString().match(/NaN/)) ? '00:00:00' : t);
        };

        function setting() {
            function getLanguage(lng, lType) {
                var Language_ = []; /*           [0]                                    [1]                                   [2]                                             [3]                     [4]                                            [5]                                     [6]             [7]                      [8]                               [9]                            [10]                        [11]           [12]					[13] 							[14]					[15]				[16]							[17]														[18]*/
                Language_['ar'] = ['عرض الموارد المطلوبة للبناء', 'اظهار جدول المباني أسفل القرية', 'أظهار رموز ارسال قوات و موارد في قائمة القرى', 'اظهار رمز فتح التقارير', 'اظهار رمز فتح الرسائل', 'حساب عدد الموارد والوقت في الثكنة,الأسطبل,المصانع الحربية', 'إغلاق', 'إظهار قائمة الروابط', 'إظهار وقت إمتلاء المخازن', 'إظهار معدل نسبة المخازن', 'إظهار أنتاج القرية لكل ساعة', 'الروابط المحفوظة', 'عرض', 'الالوان لمستويات الحقول والمباني', 'لون التطوير متاح', 'لون الحد الأقصى', 'لون التطوير غير ممكن', 'لون التطوير عن طريق NPC', 'لون التطوير غير ممكن :<br>(يحتاج الى تطوير مخزن الحبوب او المخزن)']
                Language_['bg'] = ['Виж ресурсите необходими за построяването', 'Покажи таблица със сградите под града', 'Покажи иконки за изпращане на ресурс и войска в листа с градовете', ' Покажи иконка отвори доклади', 'Покажи иконка отвори съобщения', 'Изчисли броя на ресурсите и времето в Казармата, Работилницата и Конюшнията', 'Затвори', 'Покажи меню връзки', 'Покажи ресурсен таймер', 'Покажи процент ресурси', 'Покажи продукцията на час', 'Запазени връзки', 'Покажи', 'Цветове', 'Цвят ъпгрейд', 'Цвят на макс ниво', 'Цвят ъпгрейд невъзможно (няма достатъчно ресурси)', 'Цвят ъпгрейд невъзможно (не достатъчно капацитет на хамбар/склад)', 'Цвят ъпгрейд чрез NPC(изкуствено)'];
                Language_['cn'] = ['显示建筑所需资源', '在村庄下方显示已有建筑物列表', '在村庄列表中显示资源和兵力调配的快捷图标', '启用快速打开报告功能', '启用快速打开消息功能', '计算兵营,马厩和工场所需资源和时间', '关闭', '显示菜单链接', '显示辅助资源倒计时', '显示仓储资源百分比', '显示村庄产量', '已保存的链接', '显示', '颜色', '颜色：可升级', '颜色：满级', '颜色：无法升级（没有足够资源）', '颜色：无法升级（仓库/粮仓大小不足）', '颜色：可通过和NPC兑换资源升级'];
                Language_['de'] = ['Zeige zum Bau benötigte Rohstoffe', 'Zeige Gebäudetabelle unterhalb des Dorfes', 'Zeige icons zum sende von Rohstoffen und Truppen in der Liste der Dörfer', ' zeige "Bericht öffnen"-Icon', 'Zeige "Nachricht öffen"-Icon', 'Berechne benotigte Rohstoffe und Zeit in der Kaserne, Stall, Werkstatt', 'Schließen', 'Zeige Menulinks', 'Zeige Rohstofftimer', 'Zeige Rohstoffe in Prozent', 'Zeige Dorfporduktion', 'Gespeicherte Links', 'Zeige', 'Farben', 'Farbe für Ausbau möglich', 'Farbe für höchstes Level', 'Farbe für Ausbau nicht möglcih (zu wenig Rohstoffe)', 'Farbe für Ausbau nicht möglich (nicht genug Kapazität im Rohstofflager/Kornspeicher)', 'Farbe für Ausbau über NPC-Handel'];
                Language_['en'] = ['view resources needed to build', 'show a table of buildings below the village', 'Show icons to send troops and resources in the list of villages', ' show open reports icon', 'Show open messages icon', 'calculate the number of resources and time in the barracks, Stable, Ordnance Factories', 'Close', 'Show menu links', 'Show resource timer', 'Show resource percent', 'show village production', 'Saved Links', 'display', 'Colors', 'Color upgrade available', 'Color max level', 'Color upgrade not possible (not enough resources)', 'Color upgrade not possible (not enough capacity of granaries/warehouses)', 'Color upgrade via NPC'];
                Language_['es'] = ['recursos de vista necesario para construir', 'mostrar una tabla de los edificios más abajo del pueblo', 'Mostrar iconos de enviar tropas y recursos en la lista de los pueblos', "Mostrar el icono de abrir mensajes", " mostrar el código para abrir los informes ", " calcular el número de recursos y tiempo en los cuarteles, estable, Ordnance Factories ", ' Close', "mostrar el menú de enlaces", "temporizador de recursos muestran", "mostrar por ciento de los recursos", "mostrar la producción del pueblo", 'enlaces guardados', 'mostrar', "Color: actualización disponible ',' color: el nivel máximo", "Color: actualizar no es posible (no hay suficientes recursos)", "Color: actualización no es posible (no la suficiente capacidad de los graneros o almacenes)", "Color: actualización a través de NPC"];
                Language_['hk'] = ['顯示建設需求資源', '顯示建築名單', '顯示村莊輸送部隊和資源', '開啟訊息圖示', '兵營.馬廄.車廠顯示時間資源計算', '關閉', '羊單連結', '爆倉時間', '資源百分比', '村莊產量', '連結儲存', '開啟顯示', '顏色', '可升級顏色', '升級完成顏色', '不可升級(資源不足)', '不可升級(倉庫米倉等級不足)', '電腦商人交易升級'];
                Language_['hu'] = ['építéshez szükséges nyersanyagok megtekintése', 'Legyen egy táblázat az épületekről a falu alatt', 'Egység és nyersanyagküldés gomb megjelenítése a falulistában', ' jelentésmegnyitás gomb megjelenítése', 'Üzenetmegnyitás gomb megjelenítése', 'Idő és nyersanyag kiszámítása a Kaszárnyában, Istállóban és Műhelyben', 'Bezárás', 'Menü linkek megjelenítése', 'Nyersanyag táblázat megjelenítése', 'Nyersanyag megjelenítése százalékban', 'Falu termelésének megjelenítése', 'menti kapcsolatok', 'kijelző', 'Szín', "Szín: frissítés elérhető", "Szín: max szint", "Szín: frissítés nem lehetséges (nincs elég szabad erőforrás) ", " Szín: frissítés nem lehetséges (nincs elég kapacitása magtár / raktár) ", " Szín: frissítés keresztül NPC "];
                Language_['id'] = ['tampilkan sumber daya yang dibutuhkan untuk membangun', 'tampilkan tabel bangunan dibawah desa', 'Tampilkan ikon untuk mengirim pasukan dan sumber daya dalam daftar desa', 'tampilkan ikon buka laporan', ' Tampilkan ikon buka pesan ', ' hitung jumlah sumber daya dan waktu di barak, istal, dan bengkel', ' Tutup ', ' Tampilkan link menu ', ' Tampilkan waktu penuh sumber daya', ' Tampilkan persen sumber daya ', ' tampilkan produksi desa ', ' Link Tersimpan', ' tampilan ', ' Warna ', ' Warna upgrade yang tersedia ', ' Warna tingkat max ', ' Warna meng-upgrade tidak mungkin (tidak cukup sumber daya) ', ' Warna meng-upgrade tidak mungkin (tidak cukup kapasitas lumbung / gudang) ', ' Warna Upgrade melalui NPC']; Language_['it'] = ['visualizza le risorse necessarie per costruire', 'visualizzare una tabella di edifici al di sotto del villaggio', 'Mostra icone di inviare truppe e risorse nella lista dei villaggi', 'Mostra icona aperto report', "Mostra aperta l'icona dei messaggi", 'calcolare il numero di risorse e di tempo in caserma, stabili, Ordina i Villaggi', ' Chiudi ', ' Mostra i link del menu ', ' timer risorsa Show ', ' centro delle risorse Show ', ' la produzione villaggio show ', ' Salvato Links ', 'display', 'Colori', 'aggiornamento Colore disponibile', 'Colore max livello', 'Colore aggiornare non è possibile (non abbastanza risorse)', 'Il colore non aggiornare possibile (e non sufficiente capacità di granai / magazzini)', 'Colore, aggiornarlo via NPC '];
                Language_['fa'] = ['منابع مورد نیاز برای ساخت رامشاهده نمایید', 'نمایش یک جدول از ساختمانها در زیر ', 'نمایش آیکون ارسال منابع و ارسال نیرو در لیست روستاها', ' نمایش آیکون باز کردن گزارش', 'نمایش آیکون باز کردن ÷یام', 'محاسبه تعداد منابع و زمان در سربازخانه, اصطبل, کارگاه', 'بستن', 'نمایش لینک های منو', 'نمایش تایمر منابع', 'نمایش درصد منابع', 'نمایش تولیدات روستاها', 'ذخیره لینکها', 'نمایش', 'رنگ', 'رنگ: ارتقاء در دسترس ', ' رنگ: سطح حداکثر ', ' رنگ: ارتقاء امکان پذیر نیست (کافی نیست منابع) ', ' رنگ: ارتقاء امکان پذیر نیست (کافی نیست دانه ها / انبارها ظرفیت) ', ' رنگ: ارتقاء از طریق NPC'];
                Language_['fr'] = ["ressources vue nécessaire à la construction", "montrer un tableau de bâtiments bas du village", "Afficher les icônes d'envoyer des troupes et des ressources dans la liste des villages", " Afficher le code pour ouvrir les rapports", "Afficher l'icône et les messages ouverts", "calculer le nombre de ressources et de temps dans les casernes, stable, Ordnance Factories", "Fermer", 'liens du menu Show', 'timer ressources montrent', 'pour cent des ressources montrent', 'la production du village montrent', 'liens enregistrés', "d'affichage", 'Couleur', 'Couleur: mise à jour disponible', 'Couleur: niveau max', "Couleur: mise à niveau n'est pas possible (pas assez de ressources)", "Couleur: mise à niveau n'est pas possible (pas assez de capacité des greniers et entrepôts) ", ' Couleur: mise à jour via NPC'];
                Language_['nl'] = ['Laat de benodigde grondstoffen voor constructie zien', 'Laat een gebouwentabel onder het dorp zien', 'Laat stuur troepen en grondstoffen iconen zien in de dorpslijst', 'Laat open rapport icoon zien', 'Laat open bericht icoon zien', 'Bereken de grondstoffen en tijd in de barakken, stallen en werkplaats', 'Sluiten', 'Laat links zien', 'Laat grondstoffen tijd zien', 'Laat grondstoffen percentage zien', 'Laat dorp productie zien', 'opgeslagen koppelingen', "tonen", 'Kleur', 'Kleur: upgrade beschikbaar', 'Kleur: max level', 'Kleur: upgraden niet mogelijk is (onvoldoende middelen)', 'Kleur: upgrade niet mogelijk is (te weinig capaciteit van graanschuren / magazijnen)', 'Kleur: upgrade via NPC '];
                Language_['ru'] = ['просмотр необходимых для строительства ресурсов', 'показать таблицу строительства внизу', 'показать иконки отсылки ресурсов/войск в списке деревень', ' показать иконку открытия отчета', 'показать иконку открытия сообщения', 'подсчитывать необходимые ресурсы и время в казарме, конюшне, мастерской', 'Закрыть', 'Показывать меню ссылок', 'Показывать таймер ресурсов', 'Показывать процены ресурсов', 'Показать производство деревни', 'Сохранённые ссылки', 'показать', 'Цвет', "Цвет: обновление доступно", "Цвет: максимальный уровень", "Цвет: обновление невозможно (не хватает ресурсов)", "Цвет: обновление невозможно (не хватает мощности зернохранилищ / складов)", "Цвет: обновление через NPC "];
                Language_['sk'] = ['Zobraziť potrebné suroviny na stavanie', 'Zobraziť tabuľku budov pod dedinou', 'Zobraziť ikonyposlať vojakov a suroviny v zozname dedín', ' Zobraziť ikonu otvoriť hlásenie', 'Zobraziť ikonu otvoriť správu', 'Vyrátaťpočet surovín a času v Kasárňach, Stajniach, Tovární arzenálu', 'Zatvoriť', 'Zobraziť ponuky odkazov', 'Zobraziť surovinyčasovač', 'Zobraziť suroviny v percentách', 'Ukázať produkciu dediny', 'Uložené Odkazy', 'Zobrazenie', 'Farby', 'Farba aktualizácia k dispozícii', 'Farba max úroveň', 'Farba aktualizácie nie jemožné (nedostatok surovín)', 'Farba aktualizácie nie je možné (nestačí kapacita sýpok/skladov)', 'Farba aktualizovať cezNPC'];
                Language_['th'] = ['แสดงทรัพยากรที่ต้องการในการสร้าง', 'แสดงตารางสิ่งก่อสร้างด้านล่างหมู่บ้าน', 'แสดง icon ส่งทหารและทรัพยากรในรายการของหมู่บ้าน', 'แสดง icon เปิดรายงาน', 'แสดง icon เปิดจดหมาย', 'คำนวณปริมาณทรัพยากรและเวลาใน ค่ายทหาร, โรงม้า, ห้องเครื่อง', 'ปิด', 'แสดง menu links', 'แสดงเวลาที่ทรัพยากรจะเต็ม', 'แสดงทรัพยากรเป็นเปอร์เซ็นต์', 'แสดงการผลิตของหมู่บ้าน', 'บันทึก Links', 'แสดง', 'การแสดงสี', 'สีของ "สามารถอัพเกรดได้"', 'สีของ "ระดับสูงสุดแล้ว"', 'สีของ "สามารถอัพเกรดได้(ทรัพยากรไม่เพียงพอ)"', 'สีของ "สามารถอัพเกรดได้(โกดัง/ยุ้งฉางจุไม่พอ)"', 'สีของ "อัพเกรดได้เมื่อแลกเปลี่ยนกับ NPC"'];
                Language_['tr'] = ['İnşaat için gerekli kaynakları gör', 'Köyün altında Bina tablosunu göster', 'Köy Listesinde Asker ve Satıcı gönder resimleri göster', 'Raporları aç resmini göster', 'Mesajları aç resmini göster', 'Kışla, Ahır ve Tamirhanede kaynak hesaplayıcısını kullan', 'Kapat', 'Menü Kısa yollarını göster', 'Hammadde zamanlayıcısını göster', 'Hammadde yüzdelerini göster', 'Köyün Üretimlerini göster', 'Kaydedilmiş Kısa yollar', 'göster', 'Renkler', 'Yükseltme yapılabilir Rengi', 'Azami seviye Rengi', 'Yükseltme yapılamaz Rengi(yeterli hammadde yok)', 'Yükseltme yapılamaz Rengi (Hammadde Deposu ve Tahıl Ambarı kapasitesi yetersiz)', 'NPC ile yükseltilebilir Rengi'];
                Language_['tw'] = ['顯示建築所需資源', '在村莊下方顯示已有建築物列表', '在村莊列表中顯示資源和兵力調配的快捷圖標', '啟用快速打開報告功能', '啟用快速打開消息功能', '計算兵營,馬厩和工場所需資源和時間', '關閉', '顯示菜單鏈接', '顯示輔助資源倒計時', '顯示倉儲資源百分比', '顯示村莊產量', '已保存的鏈接', '顯示', '顏色', '顏色：可升級', '顏色：滿級', '顏色：無法升級（沒有足夠資源）', '顏色：無法升級（倉庫/糧倉大小不足）', '顏色：可通過和NPC兌換資源升級'];
                if (Language_[lng][lType]) { return Language_[lng][lType]; } else { return Language_['en'][lType]; };
            };
            var RTL = document.defaultView.getComputedStyle(document.body, null).getPropertyValue('direction');

            if (ID('t4_setting')) {
                return $("#t4_setting .t4_set").animate({ "opacity": "0" }, 333, function () { $("#t4_setting").remove(); });
            } else {
                if (travian3) {
                    var xpi_A = GM_getValue('t4_setup_setting').split('|')[0];
                    var xpi_B = GM_getValue('qq');
                    var pName = GM_getValue('NameOfPlayer');
                } else {
                    var pName = $('#side_info img[class*="nationBig nationBig"]').parent().find('a').text();

                    var xpi_A = GM_getValue('t4_setup_setting').split('|')[0];
                    var xpi_B = $('#side_info img[class*="nationBig nationBig"]').attr('alt');
                }
                var ally;
                if (CLASS('sideInfoAlly')[0]) {
                    ally_A = GM_getValue('t4_setup_setting').split('|')[1];
                    ally_B = CLASS('sideInfoAlly')[0].getElementsByTagName('span')[0].innerHTML;
                } else { ally_B = ''; ally_A = ''; };
                if (travian3) {
                    ally_A = GM_getValue('t4_setup_setting').split('|')[1];
                    ally_B = GM_getValue('qq1');
                }
                var getLang = GM_getValue('MyLang');
                if (getLang == null || getLang == '') { getLang = 'en' };
                var clrs = ['#F8FFC8', '#A0F0A0', '#FFB8F0', '#FFC84B', '#FA5A00'];
                for (c = 0; c < 5; c++) { if ((GM_getValue("setting2[" + (c + 1) + "]") == ('null' || null)) || !GM_getValue("setting2[" + (c + 1) + "]")) { GM_setValue('setting2[' + (c + 1) + ']', clrs[c]); }; };

                var xHo = 'onmouseover="FindBefore(this).style.color=\'darkred\';FindBefore(this).style.fontStyle=\'italic\';" onmouseout="FindBefore(this).removeAttribute(\'style\');"';
                var SaveMySetting = "for(i = 0; i < 23; i++){ GM_setValue('setting['+(i+1)+']', ID('t4_set['+(i+1)+']').checked); }; location.reload();"; // change by Dream1 <--- thanks
                var SaveMySetting2 = "for(i = 0; i < 5; i++){ GM_setValue('setting2['+(i+1)+']', ID('t4_set2['+(i+1)+']').value); }; location.reload();"; // add by Dream1
                var Div = Create('div');
                Div.setAttribute('id', 't4_setting');
                Div.setAttribute('style', 'width: auto; z-index: 10900;');
                Div.innerHTML = '' +
        '<table class="t4_set" cellspacing="1" style="display: none;">' +
        '<thead>' +
        '<tr><td colspan="2" style="background-color: #FFFFE0;"><span style="float: ' + (RTL == "rtl" ? "left" : "right") + ';"><img class="4close" src="' + CloseAIMG + '" /></span><span style="float: ' + (RTL == "rtl" ? "left" : "right") + ';">&nbsp;&nbsp;</span><span style="float: ' + (RTL == "rtl" ? "left" : "right") + ';"><img class="4save" src="' + save + '" /></span>' + pName + '</td></tr>' +
        '<tr><td>' + xpi_A + '</td><td>' + xpi_B + '</td></tr>' +
        '<tr><td>' + ally_A + '</td><td>' + ally_B + '</td></tr>' +
		'<tr><td>' + SubLanguage(LanguagePack(), 41) + ':</td><td>' + GM_getValue("mainVillage") + '</td></tr>' +
        '<tr><td style="direction: ltr;" colspan="3">Language: <select style="direction:ltr;" id="cLang">' +
        '<option value="ar">العربية (ar)</option>' +
        '<option value="bg">български (bg)</option>' +
        '<option value="cn">中文（简体）(cn)</option>' +
        '<option value="de">Deutsch (de)</option>' +
        '<option value="en">English (en)</option>' +
        '<option value="es">español (es)</option>' +
        '<option value="fa">فارسی (fa)</option>' +
        '<option value="fr">français (fr)</option>' +
        '<option value="hk">中国香港 (hk)</option>' +
        '<option value="hu">Magyarország (hu)</option>' +
        '<option value="id">indonesian (id)</option>' +
        '<option value="it">italiano (it)</option>' +
        '<option value="nl">Nederlands (nl)</option>' +
        '<option value="ru">русский (ru)</option>' +
        '<option value="sk">slovenských (sk)</option>' +
        '<option value="th">ภาษาไทย (th)</option>' +
        '<option value="tr">Türkçe (tr)</option>' +
        '<option value="tw">中國傳統 (tw)</option>' +
        '</select>&nbsp;&nbsp;&nbsp;<a target="_blank" href="http://userscripts.org/scripts/show/63218" style="border: 1px solid;">&nbsp;Add or Update Language&nbsp;</a></td></tr>' +
        '<tr><td colspan="2">' + SubLanguage(LanguagePack(), 44) + ':&nbsp;&nbsp;' +
        '<select id="cSpeed">' +
        '<option value="1">Normal</option>' +
        '<option value="2">tx2</option>' +
        '<option value="5">tx3</option>' +
        '<option value="10">tx5</option>' +
        '<select>' +
        '</td></tr>' +
        '</thead>' +
        '<tbody style="direction: ltr;">' + // 29 30 31
        '<tr><td colspan="2" style="background-color: #FFFFE0;"><center>Travian4 Plus Tool Hacked - Setting, ' + ID("this.version").innerHTML + '</center></td></tr>' +
        '<tr><td>' + getLanguage(getLang, 0) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[1]" checked="true" /></td></tr>' + // عرض الموارد المطلوبة
        '<tr><td>' + getLanguage(getLang, 5) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[6]" checked="true" /></td></tr>' + // حساب عدد الموارد والوقت في الثكنة,الأسطبل,المصانع الحربية
        '<tr><td colspan="2" style="background-color: #FFFFE0;">&nbsp;</td></tr>' + // فاصل
        '<tr><td>' + getLanguage(getLang, 8) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[8]" checked="true" /></td></tr>' + // إظهار وقت إمتلاء المخازن
        '<tr><td>' + getLanguage(getLang, 9) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[9]" checked="true" /></td></tr>' + // إظهار معدل نسبة المخازن
        '<tr><td>' + getLanguage(getLang, 10) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[10]" checked="true" /></td></tr>' + // إظهار أنتاج القرية لكل ساعة
        '<tr><td>' + SubLanguage(LanguagePack(), 52) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[22]" checked="true" /></td></tr>' + // عرض شريط الموارد
        '<tr><td colspan="2" style="background-color: #FFFFE0;">&nbsp;</td></tr>' + // فاصل
        '<tr><td>' + getLanguage(getLang, 1) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[2]" checked="true" /></td></tr>' + // اظهار جدول المباني أسفل القرية
		'<tr><td>' + SubLanguage(LanguagePack(), 54) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[23]" checked="true" /></td></tr>' + // أظهار جدول ترقية الحقول
		'<tr><td>' + SubLanguage(LanguagePack(), 47) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[17]" checked="true" /></td></tr>' + // عرض مستويات المباني
        '<tr><td>' + SubLanguage(LanguagePack(), 2) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[11]" checked="true" /></td></tr>' + // إظهار قائمة المباني
        '<tr><td colspan="2" style="background-color: #FFFFE0;">&nbsp;</td></tr>' + // فاصل
        '<tr><td>' + getLanguage(getLang, 2) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[3]" checked="true" /></td></tr>' + // أظهار رموز ارسال قوات و موارد في قائمة القرى
        '<tr><td>' + SubLanguage(LanguagePack(), 31) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[15]" checked="true" /></td></tr>' + // عرض رموز ارسال قوات و موارد بجانب كل قرى اللاعبين
		'<tr><td>' + SubLanguage(LanguagePack(), 50) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[20]" checked="true" /></td></tr>' + // عرض معلومات اللاعب والتحالف عند مرور الماوس عليه
        '<tr><td>' + SubLanguage(LanguagePack(), 29) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[13]" checked="true" /></td></tr>' + // عرض رمز ارسال رسالة بجانب كل لاعب
        '<tr><td colspan="2" style="background-color: #FFFFE0;">&nbsp;</td></tr>' + // فاصل
        '<tr><td>' + getLanguage(getLang, 7) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[7]" checked="true" /></td></tr>' + // إظهار قائمة الروابط
        '<tr><td>' + SubLanguage(LanguagePack(), 12) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[12]" checked="true" /></td></tr>' + // الروابط المساعده
        '<tr><td colspan="2" style="background-color: #FFFFE0;">&nbsp;</td></tr>' + // فاصل
        '<tr><td>' + getLanguage(getLang, 3) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[4]" checked="true" /></td></tr>' + // اظهار رمز فتح التقارير
        '<tr><td>' + getLanguage(getLang, 4) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[5]" checked="true" /></td></tr>' + // اظهار رمز فتح الرسائل
		'<tr><td>' + SubLanguage(LanguagePack(), 39) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[16]" checked="true" /></td></tr>' + // أظهار تحديد الكل للرسائل والتقارير // add by Dream1 <--- thanks
        '<tr><td colspan="2" style="background-color: #FFFFE0;">&nbsp;</td></tr>' + // فاصل
		'<tr><td>' + SubLanguage(LanguagePack(), 49) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[19]" checked="true" /></td></tr>' + // اظهار وقت وصول التجار في السوق
		'<tr><td>' + SubLanguage(LanguagePack(), 48) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[18]" checked="true" /></td></tr>' + // عرض خصائص السوق
        '<tr><td colspan="2" style="background-color: #FFFFE0;">&nbsp;</td></tr>' + // فاصل
        '<tr><td>' + SubLanguage(LanguagePack(), 30) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[14]" checked="true" /></td></tr>' + // اظهار جدول معلومات حول الهجوم في نقطة التجمع
		'<tr><td>' + SubLanguage(LanguagePack(), 51) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[21]" checked="true" /></td></tr>' + // اظهار معلومات القوات عند مرور الماوس عليه
		'<tr><td colspan="2" style="background-color: #FFFFE0;"><center>' + getLanguage(getLang, 13) + '</center></td></tr>' + // الالوان لمستويات الحقول والمباني // add by Dream1 
		'<tr><td>' + getLanguage(getLang, 14) + ' :</td><td style="background:FFFFFF;"><input size="7" type="text" STYLE="background: #FFFFE0; border: 1px solid #CCCCCC;" id="t4_set2[1]" style="width:70px;" value="' + GM_getValue("setting2[1]") + '" /></td></tr>' + // add by Dream1
		'<tr><td>' + getLanguage(getLang, 15) + ' :</td><td style="background:FFFFFF;"><input size="7" type="text" STYLE="background: #FFFFE0; border: 1px solid #CCCCCC;" id="t4_set2[2]" style="width:60px;" value="' + GM_getValue("setting2[2]") + '" /></td></tr>' + // add by Dream1 
		'<tr><td>' + getLanguage(getLang, 16) + ' :</td><td style="background:FFFFFF;"><input size="7" type="text" STYLE="background: #FFFFE0; border: 1px solid #CCCCCC;" id="t4_set2[3]" style="width:70px;" value="' + GM_getValue("setting2[3]") + '" /></td></tr>' + // add by Dream1 
		'<tr><td>' + getLanguage(getLang, 17) + ' :</td><td style="background:FFFFFF;"><input size="7" type="text" STYLE="background: #FFFFE0; border: 1px solid #CCCCCC;" id="t4_set2[4]" style="width:70px;" value="' + GM_getValue("setting2[4]") + '" /></td></tr>' + // add by Dream1 
		'<tr><td>' + getLanguage(getLang, 18) + '</td><td style="background:FFFFFF;"><input size="7" type="text" STYLE="background: #FFFFE0; border: 1px solid #CCCCCC;" id="t4_set2[5]" style="width:70px;" value="' + GM_getValue("setting2[5]") + '" /></td></tr>' + // add by Dream1 
        '<tr><td colspan="2" style="background-color: #FFFFE0;"><center>' + getLanguage(getLang, 11) + ' - <input type="button" value="' + getLanguage(getLang, 12) + '" id="MySavedLinks" /></center></td></tr>' +
        '<tr><td colspan="2"><center>' +
        '<input type="button" onclick="ID(&apos;setup&apos;).click();" value="' + getLanguage(getLang, 6) + '" />' +
        '<input type="button" onclick="' + SaveMySetting + SaveMySetting2 + '" value="' + SubLanguage(LanguagePack(), 4) + '" />' +
        '</center></td></tr>' +
        '</tbody>' +
        '</table>';

                document.body.appendChild(Div);
                $('#cLang').bind('change', cLang);
                $('#cSpeed').bind('change', cSpeed);
                ID('MySavedLinks').addEventListener('click', function () {
                    if (!ID('ThisMySavedLinks')) {
                        var MyLinks = encode(GM_getValue("My_T4Links"));
                        var div = Create('div');
                        div.setAttribute('id', 'ThisMySavedLinks');
                        div.setAttribute('style', 'position: absolute; top: 150px; left: 50px; z-index: 10250; border: 1px solid; background-color: white; text-align: center; box-shadow: 5px black;');
                        div.innerHTML = '<div style="padding: 4px 5px;"><br />' +
            'Encrypted links<br>' +
            'You can copy and save it in notepad on your computer<br>' +
            '<textarea id="sLinks" rows="15" cols="100" style="font-size: 9px; text-align: left; direction: ltr;">' + MyLinks + '</textarea><br />' +
        '<input type="button" id="s1BTN" onclick="GM_setValue(\'My_T4Links\', decode(ID(\'sLinks\').value)); alert(\'Saved\');" value="' + SubLanguage(LanguagePack(), 4) + '" />' +
        '<input type="button" onclick="ID(\'ThisMySavedLinks\').parentNode.removeChild(ID(\'ThisMySavedLinks\'));" value="' + getLanguage(getLang, 6) + '" />' +
        '</div>';
                        document.body.appendChild(div);
                        ID('sLinks').addEventListener('blur', function () { ID('sLinks').style.boxShadow = '0px 0px 2px 0px gold'; }, true);
                        ID('sLinks').addEventListener('focus', function () { ID('sLinks').style.boxShadow = '0px 0px 2px 0px blue'; }, true);
                        ID('sLinks').addEventListener('keypress', function () { ID('sLinks').style.boxShadow = '0px 0px 2px 0px red'; }, true);
                        ID('s1BTN').addEventListener('click', function () { ID('sLinks').style.boxShadow = '0px 0px 2px 0px green'; }, true);
                    };
                }, true);
                if (GM_getValue('MyLang')) { ID('cLang').getElementsByTagName('option')[GM_getValue('cLength')].selected = 'selected'; } else { ID('cLang').getElementsByTagName('option')[4].setAttribute('selected', 'selected'); };
                if (GM_getValue('MySpeed')) { ID('cSpeed').getElementsByTagName('option')[(GM_getValue('cSpeed') ? GM_getValue('cSpeed') : 0)].selected = 'selected'; } else { ID('cSpeed').getElementsByTagName('option')[0].setAttribute('selected', 'selected'); };

                $('#t4_setting img.4close').bind('click', function () { ID('setup').click(); });
                $('.4close').bind('mouseover', function () { this.src = CloseBIMG; this.title = getLanguage(getLang, 6); });
                $('.4close').bind('mouseout', function () { this.src = CloseAIMG; });
                $('.4save').bind('mouseover', function () { this.src = save_over; this.title = SubLanguage(LanguagePack(), 4); });
                $('.4save').bind('mouseout', function () { this.src = save; });
                $('#t4_setting img.4save').bind('click', function () { for (i = 0; i < 23; i++) { GM_setValue('setting[' + (i + 1) + ']', ID('t4_set[' + (i + 1) + ']').checked); }; location.reload(); for (i = 0; i < 5; i++) { GM_setValue('setting2[' + (i + 1) + ']', ID('t4_set2[' + (i + 1) + ']').value); }; location.reload(); });

                function CheckIt(n) {
                    if (GM_getValue('setting[' + n + ']')) {
                        if (GM_getValue('setting[' + n + ']') == 'true') {
                            return ID('t4_set[' + n + ']').checked = GM_getValue('setting[' + n + ']');
                        } else {
                            ID('t4_set[' + n + ']').removeAttribute('checked'); return GM_setValue('setting[' + n + ']', 'false');
                        }
                    } else { ID('t4_set[' + n + ']').setAttribute('checked', 'checked'); return GM_setValue('setting[' + n + ']', 'true'); };
                };
                for (i = 0; i < 23; i++) {
                    CheckIt('' + (i + 1) + '');
                };
            }
        };

        function deleteLinks(cid) {
            var ask = window.confirm(SubLanguage(LanguagePack(), 11) + ' ' + ID(cid).getElementsByTagName('a')[0].innerHTML);
            if (ask) {
                document.getElementById(cid).parentNode.removeChild(ID(cid));
                var ulinks = [];
                var links = ID('tbody_links').innerHTML;
                for (i = 0; i < ID('tbody_links').getElementsByTagName('tr').length; i++) {
                    ID('tbody_links').getElementsByTagName('tr')[i].setAttribute('id', 'Link[' + i + ']');
                    ID('tbody_links').getElementsByTagName('tr')[i].getElementsByTagName('img')[0].setAttribute('id', "delete_Link[" + i + "]');");
                    ulinks.push('["' + $('#tbody_links tr').eq(i).find('td a').text() + '", "' + $('#tbody_links tr').eq(i).find('td a').attr("href") + '"]');
                };
                GM_setValue('My_T4Links', uneval(ulinks));
            };
        };
        function AddNewLink() {
            var links = '0';
            if (ID('tbody_links').getElementsByTagName('tr')[0]) { links = ID('tbody_links').getElementsByTagName('tr').length; };
            loc = window.location.href.split('/')[3];
            new_link = window.prompt('' + SubLanguage(LanguagePack(), 9) + '', loc); if (!new_link) { return }
            new_link_name = window.prompt('' + SubLanguage(LanguagePack(), 10) + '', ""); if (!new_link_name) { return; };
            newLinks = '<tr id="Link[' + links + ']"><td width="10%"><img src="img/x.gif" class="del" id="delete_Link[' + links + ']" style="cursor: pointer;" /></td><td style="font-size: 11.5px; color: black;"><a href="' + new_link + '">' + new_link_name + '</a></td></tr>';
            if (ID('tbody_links').getElementsByTagName('tr')[0]) { ID('tbody_links').innerHTML += newLinks } else { ID('tbody_links').innerHTML = newLinks };
            var ulinks = [];
            if (ID('tbody_links').getElementsByTagName('tr')[0]) {
                for (i = 0; i < ID('tbody_links').getElementsByTagName('tr').length; i++) {
                    ulinks.push('["' + $('#tbody_links tr').eq(i).find('td a').text() + '", "' + $('#tbody_links tr').eq(i).find('td a').attr("href") + '"]');
                };
            } else { links = ''; };
            GM_setValue('My_T4Links', uneval(ulinks));
        };

        function NotePadPlus() {
            var RTL = document.defaultView.getComputedStyle(document.body, null).getPropertyValue('direction');
            var x, y, z = getPosition('xblock', '120px_82px').split('_');
            x = z[1], y = z[0];
            var Div = Create('div', { style: 'position: absolute; z-index: 10000; left: ' + x + '; top: ' + y + ';' });
            Div.id = 'xblock';
            var DivB = Create('div');
            var DivC = Create('div', { style: 'height: 25px;', class: 'hm_move' });
            var MyLanguage = { NoShadow: SubLanguage(LanguagePack(), 55), Blue: SubLanguage(LanguagePack(), 56), Red: SubLanguage(LanguagePack(), 57), Black: SubLanguage(LanguagePack(), 58), Yellow: SubLanguage(LanguagePack(), 59), Noraml: SubLanguage(LanguagePack(), 60), VeryLarge: SubLanguage(LanguagePack(), 61), Large: SubLanguage(LanguagePack(), 62), Medium: SubLanguage(LanguagePack(), 63), Small: SubLanguage(LanguagePack(), 64), Orange: SubLanguage(LanguagePack(), 65), Green: SubLanguage(LanguagePack(), 66), DarkRed: SubLanguage(LanguagePack(), 67), DarkBlue: SubLanguage(LanguagePack(), 68), Left: SubLanguage(LanguagePack(), 69), Center: SubLanguage(LanguagePack(), 70), Right: SubLanguage(LanguagePack(), 71) };

            var DivD = Create('div', { style: 'background-color: white; border-bottom: 1px solid black; border-left: 1px solid black; border-right: 1px solid black; padding: 3px;' });
            var sIMG = Create('img', { src: svnIMG(1), style: 'float: ' + (RTL == "rtl" ? "left" : "right") + '; cursor: pointer;' });
            var sIMG_B = Create('img', { src: svnIMG(3), style: 'float: ' + (RTL == "rtl" ? "right" : "left") + '; width: 15px; padding: 4px;' });
            var text = Create('font', { style: 'float: ' + (RTL == "rtl" ? "right" : "left") + '; font-size: 10px; font-weight: bold; text-shadow: 0px 0px 5px white; padding: 3px; cursor: default;' });
            text.appendChild(document.createTextNode(ID('t4tools').getElementsByTagName('ul')[0].firstChild.alt));
            var select_size = Create('select');
            select_size.innerHTML = '<option value="13" style="font-size: 12.5px;">' + MyLanguage.Noraml + '</option><option value="20" style="font-size: 16px;">' + MyLanguage.VeryLarge + '</option><option value="17" style="font-size: 15px;">' + MyLanguage.Large + '</option><option value="14" style="font-size: 13px;">' + MyLanguage.Medium + '</option><option value="13" style="font-size: 11px;">' + MyLanguage.Small + '</option>';
            var select_shadow = Create('select');
            select_shadow.innerHTML = '<option value="null">' + MyLanguage.NoShadow + '</option><option value="blue" style="text-shadow: 0px 0px 2px blue;">' + MyLanguage.Blue + '</option><option value="red" style="text-shadow: 0px 0px 2px red;">' + MyLanguage.Red + '</option><option value="black" style="text-shadow: 0px 0px 2px black;">' + MyLanguage.Black + '</option><option value="yellow" style="text-shadow: 0px 0px 2px yellow;">' + MyLanguage.Yellow + '</option>';
            var select_float = Create('select');
            select_float.innerHTML = '<option value="left">' + MyLanguage.Left + '</option><option value="center">' + MyLanguage.Center + '</option><option value="right">' + MyLanguage.Right + '</option>';
            var select_type = Create('span');
            select_type.innerHTML = '<b style="border: 1px solid black; cursor: pointer;" value="bold">&nbsp;B&nbsp;</b>&nbsp;<i style="border: 1px solid black; cursor: pointer;" value="italic">&nbsp;I &nbsp;</i>';
            var select_color = Create('select');
            select_color.innerHTML = '' +
    '<option value="black" style="color: black;">' + MyLanguage.Black + '</option>' +
    '<option value="red" style="color: red;">' + MyLanguage.Red + '</option>' +
    '<option value="blue" style="color: blue;">' + MyLanguage.Blue + '</option>' +
    '<option value="orange" style="color: orange;">' + MyLanguage.Orange + '</option>' +
    '<option value="yellow" style="color: yellow;">' + MyLanguage.Yellow + '</option>' +
    '<option value="green" style="color: green;">' + MyLanguage.Green + '</option>' +
    '<option value="darkred" style="color: darkred;">' + MyLanguage.DarkRed + '</option>' +
    '<option value="darkblue" style="color: darkblue;">' + MyLanguage.DarkBlue + '</option>' +
    '';
            select_size.setAttribute('style', 'height: 22px; width: 100px; width: 90px;');
            select_color.setAttribute('style', 'height: 22px; width: 100px; width: 70px;');
            select_float.setAttribute('style', 'height: 22px; width: 100px; width: 70px;');
            select_type.setAttribute('style', 'float: ' + (RTL == "rtl" ? "left" : "right") + '; direction: ltr; margin-top: -19px;');
            select_shadow.setAttribute('style', 'height: 22px; width: 100px; width: 70px;');
            select_size.setAttribute('id', 'sel_size');
            select_color.setAttribute('id', 'sel_color');
            select_float.setAttribute('id', 'sel_float');
            select_type.setAttribute('id', 'sel_type');
            select_shadow.setAttribute('id', 'sel_shadow');
            select_size.setAttribute('onchange', 'NoteText(\'size\', \'sel_size\');');
            select_color.setAttribute('onchange', 'NoteText(\'color\', \'sel_color\');');
            select_float.setAttribute('onchange', 'NoteText(\'float\', \'sel_float\');');
            select_shadow.setAttribute('onchange', 'NoteText(\'shadow\', \'sel_shadow\');');
            var Type = ['Text Color:', 'Text Size:', 'Text Shadow:', 'Text Float:', 'Text Type:'], FNT = [];
            var Object = [select_color, select_size, select_shadow, select_float, select_type], SPN = [];
            var BR = ['x', 'x', 'x', 'br', 'x'];
            var txtArea = Create('textarea');
            txtArea.id = 'notic';
            txtArea.style.width = '300px';
            var P = Create('div');
            P.className = 'btn';
            P.setAttribute('style', 'direction: ltr;');
            var input = Create('input');
            input.type = 'button';
            input.value = SubLanguage(LanguagePack(), 4);
            input.setAttribute('onclick', "GM_setValue('note.txt', ID('notic').value); GM_setValue('NoteText_style', ID('notic').getAttribute('style')); alert('Saved');");
            P.appendChild(input);
            for (i = 0; i < Type.length; i++) {
                SPN[i] = Create('span');
                /*  FNT[i] = Create('font');
                FNT[i].innerHTML = Type[i];
                FNT[i].setAttribute('style', 'float: left;');
                */
                (BR[i] !== 'x' ? DivD.appendChild(Create(BR[i])) : null);
                //   SPN[i].appendChild(FNT[i]);
                SPN[i].appendChild(Object[i]);
                DivD.appendChild(SPN[i])
            };
            txtArea.innerHTML = GM_getValue("note.txt");
            DivB.appendChild(txtArea);
            DivB.appendChild(DivD);
            DivB.appendChild(P);
            DivC.appendChild(sIMG);
            DivC.appendChild(sIMG_B);
            DivC.appendChild(text);
            Div.appendChild(DivC);
            Div.appendChild(DivB);
            document.body.appendChild(Div);
            MakeDrag(CLASS('hm_move')[0], ID('xblock'));
        };
        function CEDC() {
            var s = '<div id="Xeon" style="display: none;">';
            var xy = get_xy(MyId());
            s += document.getElementById("mapCoordEnter").getElementsByClassName("xCoord")[0].getElementsByTagName("label")[0].innerHTML + ' <input type="text" id="elep_x" maxsize="4" size="4" value="' + (ID('xgy').value) + '"/>&nbsp;' +
    document.getElementById("mapCoordEnter").getElementsByClassName("yCoord")[0].getElementsByTagName("label")[0].innerHTML + ' <input type="text" id="elep_y" maxsize="4" size="4" value="' + (ID('xgy').className) + '"/>&nbsp;' +
    '' + SubLanguage(LanguagePack(), 18) + ': <input type="text" id="rad_elep" maxsize="4" size="4" value="3"/> <input type="button" id="cElphantX" value="' + SubLanguage(LanguagePack(), 19) + '" /><br/>' +
    '<span id="sElphant" style="display: none;">' + SubLanguage(LanguagePack(), 20) + ' ' + SubLanguage(LanguagePack(), 21) + ' <span id="ele_done">0</span> ' + SubLanguage(LanguagePack(), 22) + ' <span id="ele_tot">0</span><span>&nbsp;|&nbsp;' + SubLanguage(LanguagePack(), 23) + ': <span id="percex">0%</span></span><br/>' +
    '<table id="elep_fields" style="border: 0px solid; background-color: white; width: auto;"></table><br></div>';
            return s;
        };
        function checkD(field) {
            var hh = ID('hh').value;
            var mm = ID('mm').value;
            var ss = ID('ss').value;
            if (hh > 0) hh = C(C(hh) * C(3600)); else { hh = 0; };
            if (mm > 0) mm = C(C(mm) * C(60)); else { mm = 0; };
            if (mm > 0) ss = C(C(ss) % 60); else { ss = 0; };
            var Time = C(C(hh) + C(mm) + C(ss));
            setTimeout(function () { field.value = field.value.replace(/\D/, ''); ID('farm_time').innerHTML = pTime(pTime(Time, 'sec'), 'time'); }, 50);
        };
        function Map_Check() {
            if (document.location.href.match(/karte.php/)) {
                if (xpath('//div[@id="mapContainer"]/div[2]/@unselectable').snapshotItem(0)) {
                    $(xpath('//div[@id="mapContainer"]/div[2]').snapshotItem(0)).bind('mousemove', function () { Map_Coordx(0); ID('T4_mHelp').style.display = 'block'; });
                    $(xpath('//div[@id="mapContainer"]/div[2]').snapshotItem(0)).bind('mouseout', function () { setTimeout(function () { sHide(); }, 1000); setTimeout(function () { sHide(); }, 750); });
                } else if (ID('mapContainer').getElementsByClassName('mapContainerData')[0]) {
                    var i, length = xpath('//div[@id="mapContainer"]/div//div[contains(@class, "tile tile")]').snapshotLength, cl = [];
                    for (i = 0; i < length; i++) {
                        $(xpath('//div[@id="mapContainer"]/div').snapshotItem(i)).bind('mousemove', function () { Map_Coordx(0); ID('T4_mHelp').style.display = 'block'; });
                        $(xpath('//div[@id="mapContainer"]/div').snapshotItem(i)).bind('mouseout', function () { setTimeout(function () { sHide(); }, 1000); setTimeout(function () { sHide(); }, 750); });
                    }
                };
            };
        };
        function getHeroHealth() {
            if (exp('hero_adventure.php') && CLASS('headerAdventures')[0]) {
                $.get('hero_inventory.php', function (ajax) {
                    e = $(ajax);
                    ex = e.find('div[class="attribute health tooltip"]').text();
                    CLASS('headerAdventures')[0].appendChild(document.createTextNode(' || ' + ex));
                });
            };
        };
        function Map_Coordx(access) {
            if (document.location.href.match(/karte.php/)) {
                function tID(x, y) {
                    return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));
                };
                function trueNum(v) {
                    if (v.toString().match(/\d+.\d/)) { return v.toString().match(/\d+.\d/); } else { return v; };
                };

                if (ID('mapContainer').getElementsByTagName('div')[1].getAttribute('unselectable')) {
                    return setTimeout(function () {
                        x = $('div.tip span.coordinateX').eq(0).text().replace(')', '').replace('(', '');
                        y = $('div.tip span.coordinateY').eq(0).text().replace(')', '').replace('(', '');
                        gTimeD(ID('xgy').innerHTML, tID(x, y));
                        ID('T4_mHelp').style.display = 'block';
                    }, 500);
                }
                else
                    if (ID('mapContainer').getElementsByClassName('mapContainerData')[0]) {
                        var cl = [];
                        x = $('div.tip span.coordinateX').eq(0).text().replace(')', '').replace('(', '');
                        y = $('div.tip span.coordinateY').eq(0).text().replace(')', '').replace('(', '');
                        gTimeD(ID('xgy').innerHTML, tID(x, y));
                        ID('T4_mHelp').style.display = 'block';
                    };
            };
        };
        function favThis() {
            if (exp(/karte.php/) && ID('tileDetails') && ID('tbody_links')) {
                if (ID('tileDetails').getElementsByTagName('h1')[0]) {
                    var target = $('div#tileDetails h1').eq(0);
                    var img = Create('img');
                    img.setAttribute('src', star);
                    img.title = SubLanguage(LanguagePack(), 8);
                    img.alt = SubLanguage(LanguagePack(), 8);
                    img.id = 'favThis';
                    img.setAttribute('style', 'cursor: pointer; margin: 0px 2px;');
                    img.addEventListener('click', function () {
                        var X = $('div#tileDetails h1 span:eq(0) span:eq(1) span.coordinateX').eq(0).text().replace(')', '').replace('(', '');
                        var Y = $('div#tileDetails h1 span:eq(0) span:eq(1) span.coordinateY').eq(0).text().replace(')', '').replace('(', '');
                        var makeHref = 'position_details.php?x=' + X + '&y=' + Y + '';

                        var linkName = $('div#tileDetails h1 span').eq(0).text();
                        var links = '0';
                        if (ID('tbody_links').getElementsByTagName('tr')[0]) { links = ID('tbody_links').getElementsByTagName('tr').length; };
                        newLinks = '<tr id="Link[' + links + ']"><td width="10%">&nbsp;<img src="img/x.gif" class="del" id="delete_Link[' + links + ']" style="cursor: pointer;" /></td><td style="font-size: 11.5px; color: black;"><a href="' + makeHref + '">' + linkName + '</a></td></tr>';
                        if (ID('tbody_links').getElementsByTagName('tr')[0]) { ID('tbody_links').innerHTML += newLinks } else { ID('tbody_links').innerHTML = newLinks };
                        var ulinks = [];
                        for (i = 0; i < ID('tbody_links').getElementsByTagName('tr').length; i++) {
                            ulinks.push('["' + $('#tbody_links tr').eq(i).find('td a').text() + '", "' + $('#tbody_links tr').eq(i).find('td a').attr("href") + '"]');
                        };
                        GM_setValue('My_T4Links', uneval(ulinks));
                        return ID('favThis').setAttribute('src', starx);
                    }, true);
                    if (!ID('favThis')) { target.appendChild(img); };
                };
            }
            setTimeout(favThis, 250);
        };

        function allyInfo(href, id) {
            ID('T4_mHelp').innerHTML = '<img style="background-color: white;" src="data:image/gif;base64,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" />';
            ID('T4_mHelp').style.display = 'block';
            if ($('li#' + id).html() == '?') {
                $.get(href, function (ajax) {
                    e = $(ajax);
                    if (travian3) {
                        var ally_A = e.find('.details').html();
                    } else {
                        var ally_A = e.find('div#details').html();
                    }

                    var ally_B = '';
                    if (e.find('div#memberTitles').html()) { ally_B = e.find('div#memberTitles').html(); };
                    ID(id).innerHTML = '<div style="float: right;">' + ally_A + '</div><div style="float: left;">' + ally_B + '</div>';
                    return ID('T4_mHelp').innerHTML = '<div style="float: right; background-color: white; padding: 2px;">' + ally_A + '</div><div style="float: left; background-color: white; padding: 2px;">' + ally_B + '</div>';
                });
            } else {
                ID('T4_mHelp').style.display = 'block';
                return ID('T4_mHelp').innerHTML = ID(id).innerHTML;
            }
        };
        function userInfo(href, id) {
            ID('T4_mHelp').innerHTML = '<img style="background-color: white;" src="data:image/gif;base64,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" />';
            ID('T4_mHelp').style.display = 'block';
            if ($('li#' + id).html() == '?') {
                $.get(href, function (ajax) {
                    e = $(ajax);
                    if (travian3) {
                        var Deta = e.find('.details');
                    } else {
                        var Deta = e.find('table#details');
                    }
                    if (!Deta.html()) { Deta = '<b>???</b>'; } else { Deta = Deta.html(); };
                    var user_A = '<table cellspacing="1">' + Deta + '</table>';
                    $('li#' + id).html(user_A);
                    return ID('T4_mHelp').innerHTML = user_A;
                });
            } else {
                ID('T4_mHelp').style.display = 'block';
                return ID('T4_mHelp').innerHTML = $('li#' + id).html();
            };
        };
        function accessToAlly() {
            var links = document.links.length;
            var xLink = document.links;
            for (j = 0; j < links; j++) {
                if (xLink[j].getAttribute('href')) {
                    if (xLink[j].getAttribute('href').match(/allianz.php\b[^>]aid=\d+/) && !(xLink[j].getAttribute('value'))) {
                        if (FindBefore(xLink[j])) { } else {
                            var X = Create('li');
                            X.style.display = 'none';
                            X.id = 'ally' + j;
                            X.innerHTML = '?';
                            xLink[j].parentNode.appendChild(X);
                        };
                        $(xLink[j]).attr('value', 'ally' + j + '');
                        $(xLink[j]).bind('mouseover', function () { allyInfo($(this).attr('href'), $(this).attr('value')); });
                        $(xLink[j]).bind('mouseout', function () { sHide(); });
                    }
                }

                if (document.links[j].getAttribute('href') && !(document.links[j].getAttribute('value'))) {
                    if (document.links[j].getAttribute('href').match(/uid=\d+/) && !(document.links[j].getAttribute('value'))) {
                        if (xpath('//div[@id="content"]/li[' + j + ']').snapshotItem(0)) { } else {
                            var Xa = Create('li');
                            Xa.style.display = 'none';
                            Xa.id = 'uid' + j;
                            Xa.innerHTML = '?';
                            xLink[j].parentNode.appendChild(Xa);
                        };
                        $(xLink[j]).attr('value', 'uid' + j + '');
                        $(xLink[j]).bind('mouseover', function () { userInfo($(this).attr('href'), $(this).attr('value')); });
                        $(xLink[j]).bind('mouseout', function () { sHide(); });
                    };
                };
            };
            setTimeout(accessToAlly, 1000);
        };

        function ToHex(str) {
            var r = "";
            var e = str.length;
            var c = 0;
            var h;
            while (c < e) {
                h = str.charCodeAt(c++).toString(16);
                while (h.length < 3) h = "0" + h;
                r += h;
            }
            return r;
        }
        function FromHex(str) {
            var r = "";
            var e = str.length;
            var s;
            while (e > 0) {
                s = e - 3;
                r = String.fromCharCode("0x" + str.substring(s, e)) + r;
                e = s;
            }
            return r;
        }
        function encode(cookie_value) {
            return ToHex(cookie_value);
        };
        function decode(coded_string) {
            return FromHex(coded_string);
        };

        function AllyCalculation() { // <--- by Dream1
            if (exp(/allianz.php\b[^>]s=\d+/)) { }
            else if ((exp(/allianz.php\b[^>]aid=\d+/) || exp(/allianz\b[^>]*php/)) && $('table#member thead tr').eq(0).html()) {
                totalBullets = [[0, ""], [0, ""], [0, ""], [0, ""], [0, ""]]; //blue, green, yellow, red, grey
                var membercell12 = ID('member').getElementsByTagName('thead')[0].getElementsByTagName('tr')[0];
                var membercell121 = Create('th');
                membercell121.innerHTML = "";
                membercell121.setAttribute("width", "6%");
                for (c = 0; c < $('table#member tbody tr').length; c++) {
                    if (travian3) {
                        var specificname = GM_getValue('NameOfPlayer');
                    } else {
                        var membercell = $('table#member tbody tr').eq(c);
                        var membercell1 = document.createElement('td');
                        membercell1.innerHTML = c + 1;
                        membercell.insertBefore(membercell1, membercell.firstChild);
                        var specificname = $('div.sideInfoPlayer a span').eq(0).html();
                    }
                    var specificname1 = $('table#member tbody tr:eq(' + c + ') td:eq(1) a').eq(0).html();
                    if (specificname == specificname1) {
                        var specificname2 = $('table#member tbody tr:eq(' + c + ')').eq(0);
                        specificname2.setAttribute("class", "hl");
                    };
                    for (j = 0; j < 5; j++) {
                        if (travian3) {
                            var mmm = $('table#member tbody tr:eq(' + c + ') td:eq(4) img[class="online' + (j + 1) + '"]').length;
                            if ($('table#member tbody tr:eq(' + c + ') td:eq(4) img[class="online' + (j + 1) + '"]').eq(0).html()) {
                                var mmm1 = $('table#member tbody tr:eq(' + c + ') td:eq(4) img').eq(0).attr('alt');
                                totalBullets[j][1] = mmm1;
                            }
                        } else {
                            var mmm = $('table#member tbody tr:eq(' + c + ') td:eq(1) img[@class="online online' + (j + 1) + '"]').length;
                            if ($('table#member tbody tr:eq(' + c + ') td:eq(1) img[@class="online online' + (j + 1) + '"]').eq(0)) {
                                var mmm1 = $('table#member tbody tr:eq(' + c + ') td:eq(1) img').eq(0).alt('alt');
                                totalBullets[j][1] = mmm1;
                            }
                        }
                        totalBullets[j][0] = C(C(totalBullets[j]) + C(mmm));
                    };
                };
                if ($('table#member tbody tr img').eq(0)) {
                    var tabletr = $('table#member').eq(0);
                    var tabletr1 = document.createElement('tr');
                    var tabletd = document.createElement('td');
                    if (travian3) {
                        tabletd.setAttribute("colspan", "5");
                    } else {
                        membercell12.insertBefore(membercell121, membercell12.firstChild);
                        tabletd.setAttribute("colspan", "4");
                    }
                    tabletd.setAttribute("style", "border:0px none white; background-color:#EFEFEF; padding:2px; text-align:center;");
                    cBiHTML = "";
                    addSpacer = " | ";
                    for (j = 0; j < 5; j++) { if (totalBullets[j][0] > 0) cBiHTML += "<img class='online" + (j + 1) + "' title='" + totalBullets[j][1] + "' src='img/x.gif'> = &nbsp;" + totalBullets[j][0] + addSpacer + " "; };
                    tabletd.innerHTML = cBiHTML.substring(0, cBiHTML.length - 3);
                    tabletr1.appendChild(tabletd);
                    tabletr.appendChild(tabletr1);
                };
            };
        };

        function calcuationttroop() {
            if ($('table.under_progress').html()) {
                var troopv = 0;
                totaltroops = [[0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""]];
                for (c = 0; c < $('table.under_progress tbody tr').length - 1; c++) {
                    for (j = 0; j < 30; j++) {
                        if ($('table.under_progress tbody tr:eq(' + c + ') td:eq(0) img[class="unit u' + (j + 1) + '"]').eq(0).html()) {
                            var getalt = $('table.under_progress tbody tr:eq(' + c + ') td:eq(0) img').eq(0).attr('alt');
                            totaltroops[j][1] = getalt;
                            var troopcalcuationt = $('table.under_progress tbody tr:eq(' + c + ') td:eq(0)').eq(0).text().split(" ");
                            totaltroops[j][0] += C(C(troopv) + C(troopcalcuationt));
                        }
                    };
                };
                if ($('table.under_progress tbody tr[class="next"]').eq(0).html()) {
                    var tablebo = $('table.under_progress tbody').eq(0);
                    var tablebotr = Create('tr');
                    var tablebotd = Create('td');
                    tablebotd.setAttribute("colspan", "4");
                    tablebotd.setAttribute("style", "border:0px none white; background-color:#EFEFEF; padding:2px; text-align:center;");
                    cBiHTMLtroops = "";
                    addSpacer = " | ";
                    for (j = 0; j < 30; j++) { if (totaltroops[j][0] > 0) cBiHTMLtroops += "<img class='unit u" + (j + 1) + "' title='" + totaltroops[j][1] + "' src='img/x.gif'> = &nbsp;" + totaltroops[j][0] + addSpacer + " "; };
                    tablebotd.innerHTML = cBiHTMLtroops.substring(0, cBiHTMLtroops.length - 3);
                    tablebotr.appendChild(tablebotd);
                    tablebo.append(tablebotr);
                };
            };
        };

        function resbar() {
            if ($('div#side_info').eq(0).html()) {
                function getSimpleWidth(val) {
                    if (val.toString().match(/\d+.\d/)) { return val.toString().split('.')[0] } else { return val };
                };

                var bar = [];
                var width = [];
                for (var e = 0; e < 4; e++) {
                    if (travian3) {
                        bar[e] = C(ID('l' + (e + 1) + '').innerHTML.split('/')[0]) / C(ID('l' + (e + 1) + '').innerHTML.split('/')[1]) * 100;
                    } else {
                        bar[e] = C(ID('l' + (e + 1) + '').innerHTML.split('/')[0]) / C(ID('l' + (e + 1) + '').innerHTML.split('/')[1]) * 100;
                    }
                    width[e] = getSimpleWidth(bar[e]);
                    GM_addStyle(".ressbar" + e + " {border:1px solid #EBDDE2; border-radius: 4px 4px 4px 4px; width: 100px; background: url(" + progressImgs[0] + ") no-repeat 0 -40px; !important}" +
				".ressbar-completed" + e + " {border-radius: 4px 4px 4px 4px; width: " + width[e] + "px; height: 20px;margin-left: 0px;background: url(" + progressImgs[0] + ") no-repeat 1px 0; !important}" +
				".ressbar-completed" + e + " div {border-radius: 4px 4px 4px 4px; width: " + width[e] + "px; float: " + pos + "; height: 20px;margin-right: -1px;background: url(" + progressImgs[0] + ") no-repeat 100% 0;display: inline; /* IE 6 double float bug */ !important}" +
				"#td2res" + e + " {width:100px; text-align:center; color:green; padding: 2px;}" +
				'#tableres thead tr td {background-color: transparent; border-bottom: 1px solid; padding: 0px;}' +
				'#tableres tbody tr td {background-color: transparent; padding: 0px 2px;}');
                    if (width[e] >= 75) {
                        GM_addStyle(".ressbar" + e + " {border:1px solid #EBDDE2; border-radius: 4px 4px 4px 4px; width: 100px; background: url(" + progressImgs[1] + ") no-repeat 0 -40px; !important}" +
						".ressbar-completed" + e + " {border-radius: 4px 4px 4px 4px; height: 20px;margin-left: 0px;background: url(" + progressImgs[1] + ") no-repeat 1px 0; !important}" +
						".ressbar-completed" + e + " div {border-radius: 4px 4px 4px 4px; float: " + pos + "; height: 20px;margin-right: -1px;background: url(" + progressImgs[1] + ") no-repeat 100% 0;display: inline; /* IE 6 double float bug */ !important}" +
						"#td2res" + e + " {width:100px; text-align:center; color:orange; padding: 2px;}");
                    }
                    if (width[e] >= 95) {
                        GM_addStyle(".ressbar" + e + " {border:1px solid #EBDDE2; border-radius: 4px 4px 4px 4px; width: 100px; background: url(" + progressImgs[2] + ") no-repeat 0 -40px; !important}" +
						".ressbar-completed" + e + " {border-radius: 4px 4px 4px 4px; height: 20px; margin-left: 0px; background: url(" + progressImgs[2] + ") no-repeat 1px 0; !important}" +
						".ressbar-completed" + e + " div {border-radius: 4px 4px 4px 4px; float: " + pos + "; height: 20px; margin-right: -1px;background: url(" + progressImgs[2] + ") no-repeat 100% 0;display: inline; /* IE 6 double float bug */ !important}" +
						"#td2res" + e + " {width:100px; text-align:center; text-decoration: blink; color:red;}");
                    }
                    if (width[e] == 0) {
                        GM_addStyle("#td2res" + e + " {color:black; padding: 2px;}");
                    }
                }
                var target = document.body;
                var GY = getPosition('T4_RES_BAR', '200px_400px').toString().split('_')[0];
                var GX = getPosition('T4_RES_BAR', '200px_400px').toString().split('_')[1];

                var dv = Create('div', { id: 'T4_RES_BAR', style: 'position: absolute; top:' + GY + '; left:' + GX + '; z-index: 10000; width: 200px;' });
                var table = Create('table', { id: 'tableres', cellspacing: '0' });
                var thead = Create('thead');
                var tbody = Create('tbody');
                var tr1 = Create('tr');
                MakeDrag(tr1, dv);
                tr1.innerHTML = '<td colspan="3"><h1><span style="float: ' + (RTL == "rtl" ? "left" : "right") + ';"><img class="4close" src="' + CloseAIMG + '" /></span>' + SubLanguage(LanguagePack(), 53) + '</h1></td>';
                for (var j = 0; j < 4; j++) {
                    var tr = Create('tr');
                    var td = Create('td', { style: 'padding: 2px;' });
                    var td2 = Create('td', { id: "td2res" + j });
                    td2.innerHTML = Math.round(width[j]) + '%';
                    tr.innerHTML += '<td style="text-align:center;" width="100px">' + C(pro[j] * 3600) + '</td>';
                    var div = Create('div', { class: "ressbar" + j });
                    var topm = '40';
                    var top = C(C(C(25) * C(j) + C(topm)));
                    var span = Create('span', { style: 'position: absolute; ' + (RTL == "rtl" ? "right: 80px;" : "left: 90px;") + ' top: ' + top + 'px; font-size: 10.5px; z-index: 10000;' });
                    span.innerHTML = '<b id="mTimer[' + (j + 1) + ']" style="color: ' + ((pro[j] < 0) ? "red" : "black") + ';">' + GM_Time[j] + '</b>';
                    var div2 = Create('div', { class: "ressbar-completed" + j, style: "width:" + width[j] + "px;" });
                    div2.innerHTML = "<div><img class='r" + (j + 1) + "' style='margin-top:3px;' src='img/x.gif'></div>";
                    div.appendChild(div2);
                    div.appendChild(span);
                    td.appendChild(div);
                    tr.appendChild(td);
                    tr.appendChild(td2);
                    tbody.appendChild(tr);
                }
                thead.appendChild(tr1);
                table.appendChild(thead);
                table.appendChild(tbody);
                dv.appendChild(table);
                target.appendChild(dv);
                $('#T4_RES_BAR img.4close').bind('click', function () { $('#T4_RES_BAR').fadeOut(1000, function () { $('#T4_RES_BAR').remove(); GM_setValue('setting[22]', 'false'); }); });
            };

            function ReLoadResourceBar() {
                if (ID('T4_RES_BAR')) {
                    var Width = '', TrueWidth = '', i;
                    for (i = 0; i < 4; i++) {
                        if (travian3) {
                            Width = C(ID('l' + (i + 1) + '').innerHTML.split('/')[0]) / C(ID('l' + (i + 1) + '').innerHTML.split('/')[1]) * 100;
                        } else {
                            Width = C(ID('l' + (i + 1) + '').innerHTML.split('/')[0]) / C(ID('l' + (i + 1) + '').innerHTML.split('/')[1]) * 100;
                        }
                        TrueWidth = getSimpleWidth(Width);
                        CLASS("ressbar-completed" + i)[0].style.width = (Width > 0 ? (Width == 100 ? 101 : Width) : Width) + 'px';
                        CLASS("ressbar-completed" + i)[0].getElementsByTagName('div')[0].style.width = Width + 'px';
                        ID('td2res' + i).innerHTML = TrueWidth + '%';
                    };
                    return setTimeout(ReLoadResourceBar, 1000);
                };
            };
            ReLoadResourceBar();
        };

        function Resmarketall() {
            if ($('table[class="traders"]').eq(0).html()) {
                if ($('table[id="target_validate"]').eq(0).html()) { } else {
                    var target = CLASS('traders');
                    if (travian3) {
                        ID('ltime').innerHTML += '' +
                        '<span style="display:none;">' +
                        '<ul id="res1">0</ul>' +
                        '<ul id="res2">0</ul>' +
                        '<ul id="res3">0</ul>' +
                        '<ul id="res4">0</ul>' +
                        '<ul id="tdttotal">0</ul>' +
                        '</span>';
                    } else {
                        ID('logoutContainer').innerHTML += '' +
                        '<span style="display:none;">' +
                        '<ul id="res1">0</ul>' +
                        '<ul id="res2">0</ul>' +
                        '<ul id="res3">0</ul>' +
                        '<ul id="res4">0</ul>' +
                        '<ul id="tdttotal">0</ul>' +
                        '</span>';
                    }
                    var Resource = [];
                    for (c = 0; c < $('table[class="traders"] tbody:eq(0)').length; c++) {
                        var tdRes = document.getElementsByClassName('traders')[c].getElementsByTagName('tbody')[0].getElementsByClassName('in')[0].textContent.split(" ")[0];
                        if (travian3) {
                            document.getElementsByClassName('traders')[c].getElementsByTagName('tbody')[1].getElementsByTagName('span')[0].textContent.replace("|", "");
                            Resource[0] = document.getElementsByClassName('traders')[c].getElementsByTagName('tbody')[1].getElementsByTagName('span')[0].textContent.split(" ")[1];
                            Resource[1] = document.getElementsByClassName('traders')[c].getElementsByTagName('tbody')[1].getElementsByTagName('span')[0].textContent.split(" ")[2];
                            Resource[2] = document.getElementsByClassName('traders')[c].getElementsByTagName('tbody')[1].getElementsByTagName('span')[0].textContent.split(" ")[3];
                            Resource[3] = document.getElementsByClassName('traders')[c].getElementsByTagName('tbody')[1].getElementsByTagName('span')[0].textContent.split(" ")[4];
                        }
                        if ((target[c].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[1].getElementsByClassName('none')[0])) return;
                        Resource[0] = document.getElementsByClassName('traders')[c].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[1].getElementsByTagName('span')[0].textContent.split(" ")[1];
                        Resource[1] = document.getElementsByClassName('traders')[c].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[1].getElementsByTagName('span')[0].textContent.split(" ")[2];
                        Resource[2] = document.getElementsByClassName('traders')[c].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[1].getElementsByTagName('span')[0].textContent.split(" ")[3];
                        Resource[3] = document.getElementsByClassName('traders')[c].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[1].getElementsByTagName('span')[0].textContent.split(" ")[4];
                        ID('res1').innerHTML = C(C(ID('res1').innerHTML) + C(Resource[0]));
                        ID('res2').innerHTML = C(C(ID('res2').innerHTML) + C(Resource[1]));
                        ID('res3').innerHTML = C(C(ID('res3').innerHTML) + C(Resource[2]));
                        ID('res4').innerHTML = C(C(ID('res4').innerHTML) + C(Resource[3]));
                        if (!(target[c].nextSibling)) break;
                        if (target[c].nextSibling.nodeName.match(/h4/i)) break;

                    };
                    ID('tdttotal').innerHTML = C(C(ID('tdttotal').innerHTML) + C(ID('res1').innerHTML) + C(ID('res2').innerHTML) + C(ID('res3').innerHTML) + C(ID('res4').innerHTML));
                    if (ID('restable')) { ID('restable').parentNode.removeChild(ID('restable')); };
                    if (travian3) {
                        var res1 = xpath('//div[@id= "content"]/div[@class= "gid17"]/script[2]').snapshotItem(0);
                    } else {
                        var res1 = xpath('//h4[@class= "spacer"]').snapshotItem(0);
                    }
                    var p = document.createElement('p');
                    var tableres = document.createElement('table');
                    tableres.setAttribute("id", "restable");
                    tableres.innerHTML = '<tbody id="restable"><tr class= "trimn"><td colspan="6" class="tdtotal">' + SubLanguage(LanguagePack(), 42) + '</td></tr>' +
			'<tr class= "trimn"><td class="tdimg"><img src="img/x.gif" class="clock" /></td><td class="tdimg"><img src="img/x.gif" class="r1" /></td><td class="tdimg"><img src="img/x.gif" class="r2" /></td><td class="tdimg"><img src="img/x.gif" class="r3" /></td><td class="tdimg"><img src="img/x.gif" class="r4" /></td><td id="tdttotal">' + SubLanguage(LanguagePack(), 43) + '</td></tr>' +
			'<tr class= "trimn"><td id="timeres">0:' + tdRes + '</td><td id="res1">' + ID('res1').innerHTML + '</td><td id="res2">' + ID('res2').innerHTML + '</td><td id="res3">' + ID('res3').innerHTML + '</td><td id="res4">' + ID('res4').innerHTML + '</td><td id="tdttotal">' + ID('tdttotal').innerHTML + '</td></tr></tbody>';
                    res1.parentNode.insertBefore(tableres, res1);
                    tableres.parentNode.insertBefore(p, tableres);
                    function ResTime() {
                        ID('timeres').innerHTML = format(ReLoadTime(ID('timeres').innerHTML) - 1);
                        setTimeout(ResTime, 850);
                    };
                    ResTime();
                };
            };
        };
        function bEndTime(time) {
            ex = time;
            timer = C(ReLoadTimeUp(time) + ReLoadTimeUp(ID('tp1').innerHTML));
            hh = Math.floor(C(timer / 3600)) % 24;
            mm = Math.floor(C(timer / 60)) % 60;
            ss = Math.floor(timer) % 60;
            if (hh < 10) { hh = '0' + hh; };
            if (mm < 10) { mm = '0' + mm; };
            if (ss < 10) { ss = '0' + ss; };
            timer = hh + ':' + mm + ':' + ss;
            return timer;

        };

        function TimeUp() {
            if (CLASS('endtime')[0]) {
                for (i = 0; i < CLASS('endtime').length; i++) {
                    var e = CLASS('endtime')[i].innerHTML;
                    CLASS('endtime')[i].innerHTML = formatUp(C(ReLoadTimeUp(e)) + 1);
                };
            };
            setTimeout(TimeUp, 1000);
        };
        function building_end_time() {
            setTimeout(function () {
                for (i = 0; i < $('.contractCosts span.clocks').length; i++) {
                    var getTime = CLASS('clocks')[i].textContent.match(/\d+:\d{2}:\d{2}/), html = [], timer = [], ctimer;
                    timer = getTime;
                    ctimer = bEndTime('' + timer + '');
                    html = ' <span style="color: blue;">(<span class="endtime">' + ctimer + '</span>)</span>';
                    $('.contractCosts span.clocks').eq(i).html($('.contractCosts span.clocks').eq(i).html() + html);
                };
            }, 500);
        };
        function MakeDrag(element, pr) {
            //for drag effect
            function dragStart(e) {
                par = pr;
                dragObj.zIndex++;
                dragObj.elNode = par;
                if (e.target.nodeType == 3) dragObj.elNode = par;
                dragObj.cursorStartX = e.clientX + window.scrollX;
                dragObj.cursorStartY = e.clientY + window.scrollY;
                dragObj.elStartLeft = parseInt(par.style.left, 10);
                dragObj.elStartTop = parseInt(par.style.top, 10);
                par.style.zIndex = dragObj.zIndex;
                document.addEventListener('mousemove', dragGo, true);
                document.addEventListener('mouseup', dragStop, true);
                e.preventDefault();
            }

            function dragGo(e) {
                e.preventDefault();
                par = pr;
                x = e.clientX + window.scrollX;
                y = e.clientY + window.scrollY;
                if (!par.style.position) { par.style.position = 'absolute'; };
                par.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
                par.style.top = (dragObj.elStartTop + y - dragObj.cursorStartY) + "px";
            };

            function dragStop(e) {
                document.removeEventListener('mousemove', dragGo, true);
                document.removeEventListener('mouseup', dragStop, true);
                return GM_setValue(par.id, par.style.top + '_' + par.style.left);
            }

            function makeDraggable(el) {
                el.style.cursor = 'move';
                el.addEventListener('mousedown', function (e) { dragStart(e); }, false);
            }
            return makeDraggable(element);
        };
        function getPosition(key, defaultValue) {
            if (GM_getValue(key) && GM_getValue(key).split('_')[0]) {
                return GM_getValue(key);
            } else {
                GM_setValue(key, defaultValue);
                return defaultValue.toString();
            };
        };

        function SaveAsLink(cID) {
            XLK = $('a#' + cID);
            if (ID('tbody_links').getElementsByTagName('tr')[0]) { links = ID('tbody_links').getElementsByTagName('tr').length; } else { links = 0; };
            newLinks = '<tr id="Link[' + links + ']"><td width="10%">&nbsp;<img src="img/x.gif" class="del" id="delete_Link[' + links + ']" style="cursor: pointer;" /></td><td style="font-size: 11.5px; color: black;"><a href="' + XLK.attr("href") + '">' + XLK.html() + '</a></td></tr>';
            if (ID('tbody_links').getElementsByTagName('tr')[0]) { ID('tbody_links').innerHTML += newLinks } else { ID('tbody_links').innerHTML = newLinks };
            var ulinks = [];
            for (i = 0; i < ID('tbody_links').getElementsByTagName('tr').length; i++) {
                ulinks.push('["' + $('#tbody_links tr').eq(i).find('td a').text() + '", "' + $('#tbody_links tr').eq(i).find('td a').attr("href") + '"]');
            };
            GM_setValue('My_T4Links', uneval(ulinks));
        };
        function displayMSG(content) { ID('T4_mHelp').innerHTML = content; return ID('T4_mHelp').style.display = 'block'; };
        function NoteText(type, id) {
            var Sel = ID(id).selectedIndex;
            var Val = ID(id).options[Sel].value;
            if (type == 'size') { ID('notic').style.fontSize = Val + 'px'; GM_setValue('sel_si', Sel); }
            if (type == 'color') { ID('notic').style.color = Val; GM_setValue('sel_co', Sel); }
            if (type == 'float') { ID('notic').style.textAlign = Val; GM_setValue('sel_te', Sel); }
            if (type == 'type') { if (Sel == '2' || 2) { ID('notic').style.fontWeight = Val; } else { ID('notic').style.fontStyle = Val; }; GM_setValue('sel_te', Sel); };
            if (type == 'shadow') { if (Val == 'null') { ID('notic').style.textShadow = ''; GM_setValue('sel_sh', Sel); } else { ID('notic').style.textShadow = '0px 0px 2px ' + Val + ''; GM_setValue('sel_sh', Sel); } };
        };

        function timem() {
            if (xpath('//table[@class="traders"]').snapshotItem(0)) {
                var m = xpath('//table[@class="traders"]/tbody').snapshotItem(0);
                var m1 = Create('tr');
                var m0 = Create('th');
                m0.innerHTML = 'Total';
                var m2 = Create('td');
                var m23 = xpath('//table[@class="traders"]/tbody/tr[2]//span').snapshotItem(0).textContent.split(" ")[4];
                var m22 = pTime(xpath('//table[@class="traders"]/tbody//span[@id="timer1"]').snapshotItem(0).innerHTML, 'sec', 'tr');
                var m24 = m22 * pro[3];
                m2.innerHTML = C(C(m24) + C(m23) + C(document.getElementById('l4').firstChild.nodeValue.split('/')[0]));
                m1.appendChild(m0);
                m1.appendChild(m2);
                m.appendChild(m1);
            };
        };

        function dorfA() {
            var cA = C(C(pro[0] * 3600) + C(pro[1] * 3600) + C(pro[2] * 3600) + C(pro[3] * 3600));
            ID('production').getElementsByTagName('th')[0].innerHTML += '(' + cA + '):';
            if (ID('troops').getElementsByTagName('tbody')[0]) {
                if (ID('troops').getElementsByTagName('tbody')[0].getElementsByTagName('td')[1] && ID('troops').getElementsByTagName('thead')[0]) {
                    var cL;
                    var nm = 0;
                    cL = ID('troops').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;
                    for (i = 0; i < cL; i++) {
                        nm = C(C(nm) + C(ID('troops').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[1].innerHTML));
                    };
                    var th = ID('troops').getElementsByTagName('thead')[0].getElementsByTagName('th')[0];
                    th.innerHTML = th.innerHTML.replace(':', ' (' + nm + '):');
                };
                if (ID('movements')) {
                    if (ID('movements').getElementsByTagName('tbody')[0] && ID('movements').getElementsByTagName('tr')[0]) {
                        if (ID('movements').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0]) {
                            /*var rows = ID('movements').getElementsByTagName('tr').length, i, Exl = [];
                            var Mov = ID('movements').getElementsByTagName('tr')[0].getElementsByTagName('th')[0];
                            ID('movements').getElementsByTagName('tr')[0].getElementsByTagName('th')[0].innerHTML = ID('movements').getElementsByTagName('tr')[0].getElementsByTagName('th')[0].innerHTML.replace(':', '');
                            ID('movements').getElementsByTagName('tr')[0].getElementsByTagName('th')[0].innerHTML = ID('movements').getElementsByTagName('tr')[0].getElementsByTagName('th')[0].innerHTML + '(<span id="Exl">0</span>):';
                            for (i = 1; i < rows; i++) {
                            Exl[i] = ID('movements').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[1].getElementsByTagName('div')[0].getElementsByTagName('span')[0].innerHTML.replace(/\D/, '');
                            ID('Exl').innerHTML = C(C(ID('Exl').innerHTML) + C(Exl[i]));
                            };*/
                            function rTimeX() {
                                if (CLASS('atk_cd')[0]) {
                                    for (i = 0; i < CLASS('atk_cd').length; i++) {
                                        CLASS('atk_cd')[i].innerHTML = format(ReLoadTime(CLASS('atk_cd')[i].innerHTML) - 1);
                                    };
                                };
                                return setTimeout(rTimeX, 1000);
                            };
                            var imgs = [];
                            imgs['att1'] = xpath('//table[@id="movements"]//img[contains(@class, "att1")]').snapshotItem(0);
                            imgs['att2'] = xpath('//table[@id="movements"]//img[contains(@class, "att2")]').snapshotItem(0);
                            imgs['def1'] = xpath('//table[@id="movements"]//img[contains(@class, "def1")]').snapshotItem(0);
                            $(imgs['att1']).bind('mouseover', function () {
                                $('#T4_mHelp').html('<b>...</b>');
                                ID('T4_mHelp').style.display = 'block';
                                if (ID('movements').getElementsByTagName('li')[0]) {
                                    $('#T4_mHelp').html($('#movements li').html());
                                } else {
                                    $.get('build.php?gid=16' + (travian3 ? '' : '&tt=1#at'), function (data) {
                                        var A = $(data);
                                        var hGET = [], HTML = '<table cellspacing="1" class="ACS"><tbody>';
                                        hGET['A'] = A.find('table.inAttack');
                                        hGET['B'] = A.find('table.inRaid');
                                        if (hGET['A'].eq(0).html()) {
                                            for (i = 0; i < hGET['A'].length; i++) {
                                                hGET[2] = A.find('table.inAttack').eq(i).find('thead:eq(0)').find('tr:eq(0)').html();
                                                hGET[3] = A.find('table.inAttack').eq(i).find('.infos:eq(0)').find('tr:eq(0)').find('th:eq(0)').html();
                                                hGET[4] = A.find('table.inAttack').eq(i).find('.infos:eq(0)').find('tr:eq(0)').find('td:eq(0)').find('span').html();
                                                HTML = HTML + '<tr>' + hGET[2] + '<td>' + hGET[3] + ': <span class="atk_cd">0:' + hGET[4] + '</span></td></tr>';
                                            };
                                        };
                                        if (hGET['B'].eq(0).html()) {
                                            for (i = 0; i < hGET['B'].length; i++) {
                                                hGET[2] = A.find('table.inRaid').eq(i).find('thead:eq(0)').find('tr:eq(0)').html();
                                                hGET[3] = A.find('table.inRaid').eq(i).find('.infos:eq(0)').find('tr:eq(0)').find('th:eq(0)').html();
                                                hGET[4] = A.find('table.inRaid').eq(i).find('.infos:eq(0)').find('tr:eq(0)').find('td:eq(0)').find('span').html();
                                                HTML = HTML + '<tr>' + hGET[2] + '<td>' + hGET[3] + ': <span class="atk_cd">0:' + hGET[4] + '</span></td></tr>';
                                            };
                                        };
                                        $('#movements').append($('<li style="display: none;">' + HTML + '</li>'));
                                        $('#T4_mHelp').html(HTML + '</tbody></table>');
                                    });
                                };
                            });
                            $(imgs['att2']).bind('mouseover', function () {
                                $('#T4_mHelp').html('<b>...</b>');
                                ID('T4_mHelp').style.display = 'block';
                                if (ID('movements').getElementsByTagName('lw')[0]) {
                                    $('#T4_mHelp').html($('#movements lw').html());
                                } else {
                                    $.get('build.php?gid=16' + (travian3 ? '' : '&tt=1#at'), function (data) {
                                        var A = $(data);
                                        var hGET = [], HTML = '<table cellspacing="1" class="ACS"><tbody>';
                                        hGET['A'] = A.find('table.outAttack');
                                        hGET['B'] = A.find('table.outRaid');
                                        if (hGET['A'].eq(0).html()) {
                                            for (i = 0; i < hGET['A'].length; i++) {
                                                hGET[2] = A.find('table.outAttack').eq(i).find('thead:eq(0)').find('tr:eq(0)').html();
                                                hGET[3] = A.find('table.outAttack').eq(i).find('.infos:eq(0)').find('tr:eq(0)').find('th:eq(0)').html();
                                                hGET[4] = A.find('table.outAttack').eq(i).find('.infos:eq(0)').find('tr:eq(0)').find('td:eq(0)').find('span').html();
                                                HTML = HTML + '<tr>' + hGET[2] + '<td>' + hGET[3] + ': <span class="atk_cd">0:' + hGET[4] + '</span></td></tr>';
                                            };
                                        };
                                        if (hGET['B'].eq(0).html()) {
                                            for (i = 0; i < hGET['B'].length; i++) {
                                                hGET[2] = A.find('table.outRaid').eq(i).find('thead:eq(0)').find('tr:eq(0)').html();
                                                hGET[3] = A.find('table.outRaid').eq(i).find('.infos:eq(0)').find('tr:eq(0)').find('th:eq(0)').html();
                                                hGET[4] = A.find('table.outRaid').eq(i).find('.infos:eq(0)').find('tr:eq(0)').find('td:eq(0)').find('span').html();
                                                HTML = HTML + '<tr>' + hGET[2] + '<td>' + hGET[3] + ': <span class="atk_cd">0:' + hGET[4] + '</span></td></tr>';
                                            };
                                        };
                                        $('#movements').append($('<lw style="display: none;">' + HTML + '</lw>'));
                                        $('#T4_mHelp').html(HTML + '</tbody></table>');
                                    });
                                };
                            });
                            $(imgs['def1']).bind('mouseover', function () {
                                $('#T4_mHelp').html('<b>...</b>');
                                ID('T4_mHelp').style.display = 'block';
                                if (ID('movements').getElementsByTagName('xl')[0]) {
                                    $('#T4_mHelp').html($('#movements xl').html());
                                } else {
                                    $.get('build.php?gid=16' + (travian3 ? '' : '&tt=1#at'), function (data) {
                                        var A = $(data);
                                        var hGET = [], HTML = '<table cellspacing="1" class="ACS"><tbody>';
                                        hGET['A'] = A.find('table.inReturn');
                                        hGET['B'] = A.find('table.inSupply');
                                        if (hGET['A'].eq(0).html()) {
                                            for (i = 0; i < hGET['A'].length; i++) {
                                                hGET[2] = A.find('table.inReturn').eq(i).find('thead:eq(0)').find('tr:eq(0)').html();
                                                hGET[4] = A.find('table.inReturn').eq(i).find('span[id*="timer"]').html();
                                                HTML = HTML + '<tr>' + hGET[2] + '<td><span class="atk_cd">0:' + hGET[4] + '</span></td></tr>';
                                            };
                                        };
                                        if (hGET['B'].eq(0).html()) {
                                            for (i = 0; i < hGET['B'].length; i++) {
                                                hGET[2] = A.find('table.inSupply').eq(i).find('thead:eq(0)').find('tr:eq(0)').html();
                                                hGET[4] = A.find('table.inSupply').eq(i).find('span[id*="timer"]').html();
                                                HTML = HTML + '<tr>' + hGET[2] + '<td><span class="atk_cd">0:' + hGET[4] + '</span></td></tr>';
                                            };
                                        };
                                        $('#movements').append($('<xl style="display: none;">' + HTML + '</xl>'));
                                        $('#T4_mHelp').html(HTML + '</tbody></table>');
                                    });
                                };
                            });
                            rTimeX();
                            $(imgs['att1']).bind('mouseout', function () { ID('T4_mHelp').style.display = 'none'; });
                            $(imgs['att2']).bind('mouseout', function () { ID('T4_mHelp').style.display = 'none'; });
                            $(imgs['def1']).bind('mouseout', function () { ID('T4_mHelp').style.display = 'none'; });
                        }
                    }
                }
            };
            if (travian3) { } else {
                var space3 = Create('p');
                ID('map_details').insertBefore(space3, ID('map_details').firstChild);
            }
        };
        // Dream1
        function space() {
            if (exp('dorf2')) return;
            if (ID('contentOuterContainer')) {
                var space = Create('p');
                ID('contentOuterContainer').insertBefore(space, ID('contentOuterContainer').firstChild);
                var space2 = Create('p');
                ID('contentOuterContainer').insertBefore(space2, ID('contentOuterContainer').firstChild);
            }
        };
        // end Dream1

        function getMap(x, y) {
            var tserver = 'http://'
            tserver += window.location.hostname;
            tserver += '/ajax.php';
            $.getJSON(tserver, "cmd=mapPositionData&data[x]=" + x + "&data[y]=" + y + "&data[zoomLevel]=1&", function (data) {
                var tbl = '<td><a href="build.php?t=5&gid=17&x=' + x + '&y=' + y + '"><img src="' + Send_resource + '" /></a>&nbsp;<a href="build.php?id=39&tt=2&x=' + x + '&y=' + y + '"><img src="' + Send_attack + '" /></a></td>';
                if (typeof data.data.tiles[49].c != 'undefined') {
                    if (data.data.tiles[49].c.match("{k.f1}")) {
                        $('<tr><td><img class="r4" src="img/x.gif" />9: </td><td><a href="position_details.php?x=' + x + '&y=' + y + '">' + data.data.tiles[49].t.split("<br")[0] + '</a></td>' + tbl + '<td>< ' + C(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td></tr>').appendTo('#crop_fields');
                    } else if (data.data.tiles[49].c.match("{k.f6}")) {
                        $('<tr><td><img class="r4" src="img/x.gif" />15: </td><td><a href="position_details.php?x=' + x + '&y=' + y + '">' + data.data.tiles[49].t.split("<br")[0] + '</a></td>' + tbl + '<td>< ' + C(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td></tr>').appendTo('#crop_fields');
                    };
                    var xs = ID('selectOT').selectedIndex;
                    if (ID('sO').checked == true || ID('xAll').checked == true) {
                        var xImg = '<td><img style="width: 15px;" id="1' + x + '_' + y + '1" onmouseout="return sHide();" src="data:image/gif;base64,R0lGODlhEQASANUAAPaMMv759fR6EvefUvV8FfzavPvNpfR2C/mydPq+i/V+GveaS/7x5feVQ//9+vzfxf7v4vWBHvV+GPq6hPaROfipZPWFJf7y6P/7+P738PrDlf/+/P717f3q2fR4D/3kz/aTPvWDI/vFlvWAHfrCk/V7FPmraPaJLfvLovaHKfmvcPWCH/V9F/3gyP/9/Pisa////vinYfifVf3jzPV/G/706vvInvzWtfrAjvq3f/WEI/aPN/3dwvvTsPWCIP///yH5BAAAAAAALAAAAAARABIAAAbRwJ9wSCwahbXW7XE5DjO4hiWkAyU4xw9F4PEBUoLD7lHspEo0xIfRMWxDn6FjQWCpIAnU5vcICRoOQgUKESMzDwMHKD8uCywCN0IqAis0BT8ZIQaYIAoEJgEYAxI+NDIFCTGBEworCg0MoqSlCicQGSYsEaUUEBsxBD7CJS8BFR67PiwyWBolK8IRFjsjyT4CJHs1JzQ+EREkHS+zNBYMQzYl3zotPyIs3thFOQQSCgsTADQsJSouRj1A0DhwwIMCCgZgOMHwQMMEDTwCOJlYJAgAOw%3D%3D" /></td>';
                        if (((xs == 3) || ID('xAll').checked == true) && data.data.tiles[49].c.match("{k.fo}") && (data.data.tiles[49].t.toString().match("{a.r4}") && data.data.tiles[49].t.toString().match("{a.r1}"))) {
                            $('<tr id="' + (x * xs + y) + '"><td><img src="img/x.gif" class="r4" /><img src="img/x.gif" class="r1" />' + data.data.tiles[49].t.match(/\d{2}%/) + ': </td><td><a href="position_details.php?x=' + x + '&y=' + y + '">' + data.data.tiles[49].t.split("<br")[0] + '</a></td>' + tbl + '<td>< ' + New_Math(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td>' + xImg + '<td id="' + xyToId(x, y) + '" style="font-size: 11px;"></td><td style="display: none;"></td></tr>').appendTo('#crop_fields');
                        } else if (((xs == 2) || ID('xAll').checked == true) && data.data.tiles[49].c.match("{k.fo}") && (data.data.tiles[49].t.toString().match("{a.r4}") && data.data.tiles[49].t.toString().match("{a.r2}"))) {
                            $('<tr id="' + (x * xs + y) + '"><td><img src="img/x.gif" class="r4" /><img src="img/x.gif" class="r2" />' + data.data.tiles[49].t.match(/\d{2}%/) + ': </td><td><a href="position_details.php?x=' + x + '&y=' + y + '">' + data.data.tiles[49].t.split("<br")[0] + '</a></td>' + tbl + '<td>< ' + New_Math(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td>' + xImg + '<td id="' + xyToId(x, y) + '" style="font-size: 11px;"></td><td style="display: none;"></td></tr>').appendTo('#crop_fields');
                        } else if (((xs == 1) || ID('xAll').checked == true) && data.data.tiles[49].c.match("{k.fo}") && (data.data.tiles[49].t.toString().match("{a.r4}") && data.data.tiles[49].t.toString().match("{a.r3}"))) {
                            $('<tr id="' + (x * xs + y) + '"><td><img src="img/x.gif" class="r4" /><img src="img/x.gif" class="r3" />' + data.data.tiles[49].t.match(/\d{2}%/) + ': </td><td><a href="position_details.php?x=' + x + '&y=' + y + '">' + data.data.tiles[49].t.split("<br")[0] + '</a></td>' + tbl + '<td>< ' + New_Math(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td>' + xImg + '<td id="' + xyToId(x, y) + '" style="font-size: 11px;"></td><td style="display: none;"></td></tr>').appendTo('#crop_fields');
                        } else if (((xs == 0) || ID('xAll').checked == true) && data.data.tiles[49].c.match("{k.fo}") && (data.data.tiles[49].t.toString().match("{a.r4}") && !(data.data.tiles[49].t.toString().match("{a.r3}")) && !(data.data.tiles[49].t.toString().match("{a.r2}")) && !(data.data.tiles[49].t.toString().match("{a.r1}")) && !(data.data.tiles[49].t.match(/25%/)))) {
                            $('<tr id="' + (x * xs + y) + '"><td><img src="img/x.gif" class="r4" />' + data.data.tiles[49].t.match(/\d{2}%/) + ': </td><td><a href="position_details.php?x=' + x + '&y=' + y + '">' + data.data.tiles[49].t.split("<br")[0] + '</a></td>' + tbl + '<td>< ' + New_Math(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td>' + xImg + '<td id="' + xyToId(x, y) + '" style="font-size: 11px;"></td><td style="display: none;"></td></tr>').appendTo('#crop_fields');
                        } else if (((xs == 4) || ID('xAll').checked == true) && data.data.tiles[49].c.match("{k.fo}") && (data.data.tiles[49].t.toString().match("{a.r4}") && !(data.data.tiles[49].t.toString().match("{a.r3}")) && !(data.data.tiles[49].t.toString().match("{a.r2}")) && !(data.data.tiles[49].t.toString().match("{a.r1}")) && !(data.data.tiles[49].t.match(/50%/)))) {
                            $('<tr id="' + (x * xs + y) + '"><td><img src="img/x.gif" class="r4" />' + data.data.tiles[49].t.match(/\d{2}%/) + ': </td><td><a href="position_details.php?x=' + x + '&y=' + y + '">' + data.data.tiles[49].t.split("<br")[0] + '</a></td>' + tbl + '<td>< ' + New_Math(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td>' + xImg + '<td id="' + xyToId(x, y) + '" style="font-size: 11px;"></td><td style="display: none;"></td></tr>').appendTo('#crop_fields');
                        } else if (((xs == 5) || ID('xAll').checked == true) && data.data.tiles[49].c.match("{k.fo}") && (data.data.tiles[49].t.toString().match("{a.r3}") && !(data.data.tiles[49].t.toString().match("{a.r4}")))) {
                            $('<tr id="' + (x * xs + y) + '"><td><img src="img/x.gif" class="r3" />' + data.data.tiles[49].t.match(/\d{2}%/) + ': </td><td><a href="position_details.php?x=' + x + '&y=' + y + '">' + data.data.tiles[49].t.split("<br")[0] + '</a></td>' + tbl + '<td>< ' + New_Math(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td>' + xImg + '<td id="' + xyToId(x, y) + '" style="font-size: 11px;"></td><td style="display: none;"></td></tr>').appendTo('#crop_fields');
                        } else if (((xs == 6) || ID('xAll').checked == true) && data.data.tiles[49].c.match("{k.fo}") && (data.data.tiles[49].t.toString().match("{a.r2}") && !(data.data.tiles[49].t.toString().match("{a.r4}")))) {
                            $('<tr id="' + (x * xs + y) + '"><td><img src="img/x.gif" class="r2" />' + data.data.tiles[49].t.match(/\d{2}%/) + ': </td><td><a href="position_details.php?x=' + x + '&y=' + y + '">' + data.data.tiles[49].t.split("<br")[0] + '</a></td>' + tbl + '<td>< ' + New_Math(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td>' + xImg + '<td id="' + xyToId(x, y) + '" style="font-size: 11px;"></td><td style="display: none;"></td></tr>').appendTo('#crop_fields');
                        } else if (((xs == 7) || ID('xAll').checked == true) && data.data.tiles[49].c.match("{k.fo}") && (data.data.tiles[49].t.toString().match("{a.r1}") && !(data.data.tiles[49].t.toString().match("{a.r4}")))) {
                            $('<tr id="' + (x * xs + y) + '"><td><img src="img/x.gif" class="r1" />' + data.data.tiles[49].t.match(/\d{2}%/) + ': </td><td><a href="position_details.php?x=' + x + '&y=' + y + '">' + data.data.tiles[49].t.split("<br")[0] + '</a></td>' + tbl + '<td>< ' + New_Math(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td>' + xImg + '<td id="' + xyToId(x, y) + '" style="font-size: 11px;"></td><td style="display: none;"></td></tr>').appendTo('#crop_fields');
                        };
                        $('#1' + x + '_' + y + '1').bind('mouseover', function () { return getAnimInfo('position_details.php?x=' + x + '&y=' + y + '', '' + xyToId(x, y) + ''); });
                    };
                };
                $('#crop_done').html(parseInt($('#crop_done').html()) + 1);
                $('#percx').html(Math.round($('#crop_done').html() / $('#crop_tot').html() * 100) + '%')
            });
        };
        function getElephant(x, y) {
            var tserver = 'http://'
            tserver += window.location.hostname;
            var server_link = tserver;
            tserver += '/ajax.php';

            $.ajax({
                url: tserver,
                data: "cmd=viewTileDetails&x=" + x + "&y=" + y,
                dataType: "html",
                success: function (data) {
                    var obj = jQuery.parseJSON(data);
                    data = obj.data.html;
                    if (data.split('u40')[1] || (ID('xU39').checked == true && data.split('u39')[1]) || (ID('xU38').checked == true && data.split('u38')[1])) {
                        var tr = [];
                        var html;
                        var num = [];
                        html = '';
                        if (data.split('u40')[1]) {
                            tr[1] = $(data).find('img[class="unit u40"]').parent().parent();
                            num[1] = parseInt($('.val', tr[1]).html());
                            html = html + '<td><img src="img/x.gif" class="unit u40" />' + num[1] + '</td>';
                        } else { html = html + '<td>&nbsp;</td>'; }
                        if (data.split('u39')[1] && ID('xU39').checked == true) {
                            tr[2] = $(data).find('img[class="unit u39"]').parent().parent();
                            num[2] = C($('.val', tr[2]).html());
                            html = html + '<td><img src="img/x.gif" class="unit u39" />' + num[2] + '</td>';
                        } else { html = html + '<td>&nbsp;</td>'; }
                        if (data.split('u38')[1] && ID('xU38').checked == true) {
                            tr[3] = $(data).find('img[class="unit u38"]').parent().parent();
                            num[3] = parseInt($('.val', tr[3]).html());
                            html = html + '<td><img src="img/x.gif" class="unit u38" />' + num[3] + '</td>';
                        } else { html = html + '<td>&nbsp;</td>'; }

                        $('<tr>' + html + '<td><a href="' + server_link + '/position_details.php?x=' + x + '&y=' + y + '">(' + x + '|' + y + ')</a></td><td>< ' + C(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td><td><a href="build.php?t=5&gid=17&x=' + x + '&y=' + y + '"><img src="' + img.sendRes + '" /></a>&nbsp;<a href="build.php?id=39&tt=2&x=' + x + '&y=' + y + '"><img src="' + img.attack + '" /></a></td></tr>').appendTo('#elep_fields');

                    }
                    $('#ele_done').html(parseInt($('#ele_done').html()) + 1);
                    $('#percex').html(Math.round($('#ele_done').html() / $('#ele_tot').html() * 100) + '%')
                }
            });
        };

        function vACC_INFO() {
            if (eval(GM_getValue('t4v_length'))) {
                for (i = 0; i < eval(GM_getValue('t4v_length')).length; i++) {
                    var vID = eval(GM_getValue('t4v_links'))[i]
                    $('#villageList div:eq(1) ul li').eq(i).attr('value', vID);
                    $('#villageList div:eq(1) ul li').eq(i).hover(function () { gTimeD($('#xgy').html().split('=')[1], this.value); }, function () { sHide(); });
                };
            };
        };
        function QuickSend() {

            var IMG_A = [], IMG_B = [], g_name = [], X = [], Y = [], nlength = [], vlength = [];

            function checkXY(XY) { if (/-\d+/.test(XY)) { return XY.toString().match(/-\d+/); } else { return XY.toString().match(/\d+/); }; };
            if (RTL == 'rtl') { dir = 'right'; } else if (RTL == 'ltr') { dir = 'left'; };
            function check_again() {
                $.get('nachrichten.php?t=6', function (ajax) {
                    var GM = $(ajax);
                    GM_setValue('t4v_length', $('div#villageList ul li').length);
                    for (i = 0; i < GM.find('div#villageList div.list ul li').length; i++) {

                        var xStyleA = 'position: absolute; ' + dir + ': 4px; top: 15px; width: 12px; height: 12px; cursor: pointer;';
                        var xStyleB = 'position: absolute; ' + dir + ': -10px; top: 15px; width: 12px; height: 12px; cursor: pointer;';
                        var get_xy = GM.find('div#villageList div.list ul li:eq(' + i + ') a:eq(0)').attr('title');
                        Y[i] = $(get_xy).find('.coordinateY').text().replace(')', '').replace('(', '');
                        X[i] = $(get_xy).find('.coordinateX').text().replace(')', '').replace('(', '');
                        var father = Create('span', { style: 'float: ' + dir + '; margin-top: -28px; position: absolute;' });
                        nlength.push(GM.find('div#villageList div.list ul li:eq(' + i + ') a:eq(0)').html());
                        vlength.push(xyToId(X[i], Y[i]));
                        var myvillageid = xyToId(X[i], Y[i]);
                        function sendattack(myvillageid) {
                            document.location.href = 'build.php?id=39&tt=2&z=' + myvillageid;
                        }
                        function sendRes(myvillageid) {
                            document.location.href = 'build.php?t=5&gid=17&z=' + myvillageid;
                        }
                        IMG_A[i] = $ee('a', Create('img', { id: 'QS(r' + i + ')', src: img.sendRes, style: xStyleB }), [['href', 'build.php?id=39&tt=2&z=' + myvillageid], ['onClick', 'return false;']]);
                        IMG_A[i].addEventListener('click', function (x) { return function () { sendRes(x); } }(myvillageid), false);
                        IMG_B[i] = $ee('a', Create('img', { id: 'QS(a' + i + ')', src: img.attack, style: xStyleA }), [['href', 'build.php?gid=17&t=5&z=' + myvillageid], ['onClick', 'return false;']]);
                        IMG_B[i].addEventListener('click', function (x) { return function () { sendattack(x); } }(myvillageid), false);

                        var send_res = IMG_A[i];
                        var send_arm = IMG_B[i];
                        father.appendChild(send_res);
                        father.appendChild(send_arm);
                        $('#villageList div:eq(1) li').eq(i).append($(father));
                    };
                    //alert(vlength);
                    GM_setValue('t4v_links', uneval(vlength));
                    GM_setValue('t4v_names', uneval(nlength));
                });
            };
            if (C($('#villageList div:eq(1) ul li').length) == C(GM_getValue('t4v_length'))) {
                for (i = 0; i < $('div#villageList div.list ul li').length; i++) {
                    var xStyleA = 'position: absolute; ' + dir + ': 4px; top: 15px; width: 12px; height: 12px; cursor: pointer;';
                    var xStyleB = 'position: absolute; ' + dir + ': -10px; top: 15px; width: 12px; height: 12px; cursor: pointer;';
                    var father = Create('span', { style: 'float: ' + dir + '; margin-top: -28px; position: absolute;' });
                    var myvillageid = eval(GM_getValue('t4v_links'))[i];
                    function sendattack(vn) {
                        document.location.href = 'build.php?id=39&tt=2&z=' + vn;
                    }
                    function sendRes(vn) {
                        document.location.href = 'build.php?t=5&gid=17&z=' + vn;
                    }
                    IMG_A[i] = $ee('a', Create('img', { id: 'QS(r' + i + ')', src: img.sendRes, style: xStyleB }), [['href', 'build.php?id=39&tt=2&z=' + myvillageid], ['onClick', 'return false;']]);
                    IMG_A[i].addEventListener('click', function (x) { return function () { sendRes(x); } }(myvillageid), false);
                    IMG_B[i] = $ee('a', Create('img', { id: 'QS(a' + i + ')', src: img.attack, style: xStyleA }), [['href', 'build.php?gid=17&t=5&z=' + myvillageid], ['onClick', 'return false;']]);
                    IMG_B[i].addEventListener('click', function (x) { return function () { sendattack(x); } }(myvillageid), false);

                    var send_res = IMG_A[i];
                    var send_arm = IMG_B[i];
                    father.appendChild(send_res);
                    father.appendChild(send_arm);
                    $('#villageList div:eq(1) li').eq(i).append($(father));
                }
            } else check_again();
            $('#side_info .listing ul li').hover(function () { $(this).find('a').stop().animate({ 'font-size': '15px' }, "fast"); }, function () { $(this).find('a').stop().animate({ 'font-size': '13px' }, "fast"); });
        };
        if (GM_getValue('setting[3]') == 'true') { try { QuickSend(); } catch (e) { }; };
        function silver_info() {
            $('div#plusLink div#gs p.silver').mouseenter(function () {
                if (!ID('xsilv')) {
                    displayMSG('<b>...</b>');
                    $.get('hero_auction.php?action=bids', function (travian) {
                        A = $(travian).find('table.currentBid').html().replace(/id\=\"timer\d+\">/g, 'class="count_down_timer">0:');
                        var html = '<table class="currentBid" cellspacing="1" style="border: 1px solid black;">' + A + '</table>';
                        displayMSG(html);
                        $('div#plusLink div#gs p.silver').append('<span id="xsilv" style="display: none;">' + html + '</span>');
                    });
                } else { displayMSG($(this).find('span#xsilv').html()); };
            }).mouseleave(sHide);
        };
        function setup() {
            var pos; if (RTL == 'rtl') { pos = 'right'; } else { pos = 'left'; };
            var sIMG = Create('img', { src: Setting, id: 'setup', style: 'cursor:pointer;' });
            $(sIMG).bind('click', function () {
                setting();
                $("#t4_setting .t4_set").animate({ "opacity": "toggle" }, 333);
            });
            $(sIMG).hover(function () { displayMSG('<font style="text-shadow: 2px 2px 3px white; font-weight: bold;">' + SubLanguage(LanguagePack(), '0') + '</font>'); }, function () { sHide(); });
            ID('t4tools').getElementsByTagName('ul')[0].appendChild(sIMG);
        };

        function NTPD() {
            function select() {
                function Test(v) { if (v == (null || '' || 'NaN') || isNaN(v)) { return 0; } else { return v } };
                var A = Test(GM_getValue('sel_co'));
                var B = Test(GM_getValue('sel_sh'));
                var C = Test(GM_getValue('sel_si'));
                var D = Test(GM_getValue('sel_te'));
                var E = Test(GM_getValue('sel_ty'));
                var AA = ID('sel_type').getElementsByTagName('b')[0];
                var BB = ID('sel_type').getElementsByTagName('i')[0];
                ID('sel_color').getElementsByTagName('option')[A].selected = 'selected';
                ID('sel_shadow').getElementsByTagName('option')[B].selected = 'selected';
                ID('sel_size').getElementsByTagName('option')[C].selected = 'selected';
                ID('sel_float').getElementsByTagName('option')[D].selected = 'selected';
                if (E == 'A') { ID('sel_type').getElementsByTagName('b')[0].style.border = '1px solid red'; ID('notic').style.fontWeight = 'bold'; };
                if (E == 'B') { ID('sel_type').getElementsByTagName('i')[0].style.border = '1px solid red'; ID('notic').style.fontStyle = 'italic'; }
                if (E == 'C') { ID('sel_type').getElementsByTagName('b')[0].style.border = '1px solid red'; ID('sel_type').getElementsByTagName('i')[0].style.border = '1px solid red'; }
                $('#sel_type b').bind('click', function () {
                    var AA = ID('sel_type').getElementsByTagName('b')[0];
                    var BB = ID('sel_type').getElementsByTagName('i')[0];
                    if (AA.getAttribute('style').toString().match('red')) { AA.style.border = '1px solid black'; ID('notic').style.fontWeight = ''; } else { AA.style.border = '1px solid red'; ID('notic').style.fontWeight = 'bold'; };
                    if (AA.style.border.toString().match('red') && BB.style.border.toString().match('red')) {
                        GM_setValue('sel_ty', 'C');
                    } else if (AA.style.border.toString().match('red') && !BB.style.border.toString().match('red')) {
                        GM_setValue('sel_ty', 'A');
                    } else if (!AA.style.border.toString().match('red') && BB.style.border.toString().match('red')) {
                        GM_setValue('sel_ty', 'B');
                    } else {
                        GM_setValue('sel_ty', 'null');
                    }
                });
                $('#sel_type i').bind('click', function () {
                    var AA = ID('sel_type').getElementsByTagName('b')[0];
                    var BB = ID('sel_type').getElementsByTagName('i')[0];
                    if (BB.getAttribute('style').toString().match('red')) { BB.style.border = '1px solid black'; ID('notic').style.fontStyle = ''; } else { BB.style.border = '1px solid red'; ID('notic').style.fontStyle = 'italic'; };
                    if (AA.style.border.toString().match('red') && BB.style.border.toString().match('red')) {
                        GM_setValue('sel_ty', 'C');
                    } else if (AA.style.border.toString().match('red') && !BB.style.border.toString().match('red')) {
                        GM_setValue('sel_ty', 'A');
                    } else if (!AA.style.border.toString().match('red') && BB.style.border.toString().match('red')) {
                        GM_setValue('sel_ty', 'B');
                    } else {
                        GM_setValue('sel_ty', 'null');
                    }
                });
            };
            if (GM_getValue('NoteText_style') && !(GM_getValue('NoteText_style') == null)) {
                ID('notic').setAttribute('style', GM_getValue('NoteText_style'));
            };
            if (ID('xblock').getAttribute('value') == '0' || !ID('xblock').getAttribute('value')) {
                ID('xblock').setAttribute('value', '1');
                $('div#xblock').fadeIn('slow');
                $('div#xblock div:eq(0) img:eq(0)').hover(function () { this.src = svnIMG(2); }, function () { this.src = svnIMG(1); });
                $('div#xblock div:eq(0) img:eq(0)').bind('click', function () { ID('xblock').setAttribute('value', '0'); $('div#xblock').fadeOut('slow'); });
                select();
            } else {
                ID('xblock').setAttribute('value', '0');
                $('div#xblock').fadeOut('slow');
            };
        };
        var pos;
        if (RTL == 'rtl') { pos = 'right' } else { pos = 'left' }
        var cIMG = Create('img', { src: NoteIMG.nIMG, alt: SubLanguage(LanguagePack(), '1') });
        $(cIMG).bind('click', function () { sh(); NTPD(); });
        $(cIMG).hover(function () { displayMSG('<font style="text-shadow: 2px 2px 3px white; font-weight: bold;">' + SubLanguage(LanguagePack(), '1') + '</font>'); }, function () { sHide(); });
        cIMG.setAttribute('style', 'cursor: pointer;');
        ID('t4tools').getElementsByTagName('ul')[0].appendChild(cIMG);

        function SearchCropFields() {
            $("#crop_fields").empty();
            $("#scx").attr('style', '');
            var originalX = parseInt($("#crop_x").val());
            var originalY = parseInt($("#crop_y").val());
            var radius = parseInt($("#rad").val());
            var minX = (originalX - radius);
            var maxX = originalX + radius;
            var minY = (originalY - radius);
            var maxY = originalY + radius;
            $("#crop_tot").html((2 * radius + 1) * (2 * radius + 1));
            $("#crop_done").html(0);
            y = minY;
            while (y <= maxY) {
                x = minX;
                while (x <= maxX) {
                    getMap(x, y);
                    x++;
                }
                y++;
            }
        };

        function mFullView() {/*

    
*/
        };
        function SearchElephants() {
            $("#elep_fields").empty();
            $("#sElphant").attr('style', '');
            var originalX = parseInt($("#elep_x").val());
            var originalY = parseInt($("#elep_y").val());
            var radius = parseInt($("#rad_elep").val());
            var minX = (originalX - radius);
            var maxX = originalX + radius;
            var minY = (originalY - radius);
            var maxY = originalY + radius;
            $("#ele_tot").html((2 * radius + 1) * (2 * radius + 1));
            $("#ele_done").html(0);
            y = minY;
            while (y <= maxY) {
                x = minX;
                while (x <= maxX) {
                    getElephant(x, y, maxX * maxY);
                    x++;
                }
                y++;
            }
        };
        function Resource_Needed() {
            if (ID('contract')) {
                if (ID('contract').innerHTML.match(/resources r/) && CLASS('showCosts')[0] || ID('build') && travian3) {
                    for (i = 0; i < xpath("//div[@id='contract'] | //p[@id='contract'] ").snapshotLength; i++) {
                        var res = [];
                        var Total = [];
                        var Timer = [];
                        var Color = [];
                        var sTime = [];
                        var xxs = [];
                        var NPC;
                        var NPC_Timer;
                        var NPC_Time;
                        var table = Create('table', { cellspacing: '0', id: 'res_needed' });
                        var tb = Create('tbody');
                        var tr = Create('tr');
                        var tf = Create('tfoot');

                        for (c = 0; c < 4; c++) {
                            if (xpath("//div[@id='contract']").snapshotLength >= 2) { res[c] = xpath("//div[@id='contract']/div[2]/div[1]/span[" + (c + 1) + "]").snapshotItem(i).innerHTML.split(">")[1]; } else {
                                if (travian3) {
                                    res[c] = xpath("//p[@id='contract']").snapshotItem(0).textContent.split(":")[1].split(" | ")[c];
                                } else { res[c] = xpath("//div[@id='contract']/div[2]/div[1]/span[" + (c + 1) + "]").snapshotItem(0).innerHTML.split(">")[1]; }
                            };
                            var SaveRes = [];
                            if (travian3) { Total[c] = C(ID('l' + (4 - c)).innerHTML.split('/')[0] - res[c]); } else {
                                Total[c] = C(ID('l' + (c + 1)).innerHTML.split('/')[0] - res[c]);
                            }
                            if (Total[c] < 0) {
                                Timer[c] = Time(Total[c], pro[c]); Color[c] = 'style="color: red; font-size: 12px;"';
                                SaveRes[c] = Total[c];
                            } else {
                                Total[c] = '+' + Total[c]; Timer[c] = ''; Color[c] = 'style="color: green; font-size: 11px;"';
                                SaveRes[c] = '0';
                            };

                            tr.innerHTML += '<td><img src="img/x.gif" class="r' + (c + 1) + '" /></td><td><span ' + Color[c] + '>' + Total[c] + '</span></td><td><span class="xT4_Time" style="font-size: 11px;">' + Timer[c] + '</span></td>';
                        };
                        tb.appendChild(tr);
                        table.appendChild(tb);
                        var npc = C(C(Total[0]) + C(Total[1]) + C(Total[2]) + C(Total[3]));
                        if (npc > 0) { npc = '+' + npc; Color[5] = 'color: green;'; } else { Color[5] = 'color: red;'; };
                        tf.innerHTML = '<tr><td colspan="16"><hr style="margin: 1px 0;"></td></tr><tr><td style="text-align:center;"><img class="npc" src="img/x.gif" /></td><td colspan="16" style="font-size: 11px;">(( <span style="' + Color[5] + '">' + npc + '</span> ))</td></tr>';

                        table.appendChild(tf);
                        if (travian3) {
                            xpath("//table[@class='tblInfo']").snapshotItem(i).parentNode.insertBefore(table, xpath("//table[@class='tblInfo']").snapshotItem(i));
                        } else {
                            xpath("//span[@class='clocks']").snapshotItem(i).parentNode.insertBefore(table, xpath("//span[@class='clocks']").snapshotItem(i));
                        }


                    };
                };
                function RTM() {
                    for (i = 0; i < CLASS('xT4_Time').length; i++) {
                        if (CLASS('xT4_Time')[i].innerHTML == '' || CLASS('xT4_Time')[i].innerHTML.match(/0:00:00:00/)) { } else {
                            CLASS('xT4_Time')[i].innerHTML = format(ReLoadTime(CLASS('xT4_Time')[i].innerHTML) - 1);
                            $(CLASS('xT4_Time')[i]).effect("highlight", {}, 999);
                        };
                    };
                    return setTimeout(RTM, 1000);
                };
                RTM();
            };
        };
        function VillageOverView() {
            function rTimeX() { if (CLASS('tr_Time1')[0]) { for (i = 0; i < CLASS('tr_Time1').length; i++) { if (CLASS('tr_Time1')[i].innerHTML == '0:00:00:00') { } else { CLASS('tr_Time1')[i].innerHTML = format(ReLoadTime(CLASS('tr_Time1')[i].innerHTML) - 1); } }; }; return setTimeout(rTimeX, 1000); };
            function RC(v) { return v.replace(',', '').replace(',', ''); };
            refIMG = '<img src="' + refr + '" style="cursor: pointer; padding-left: 2px; padding-right: 2px;" id="refr" />';

            var vgs = $('#overview td:eq(0)').html(), mer = $('#overview td:eq(1)').html(), build = $('#overview td:eq(2)').html(), trps = $('#overview td:eq(3)').html();

            var HTML_RES_A = '<table cellspacing="0" style="width: 95%; display: none;" id="acc_r1"><thead><tr><td>' + vgs + '</td><td><img src="img/x.gif" class="r1" /></td><td><img src="img/x.gif" class="r2" /></td><td><img src="img/x.gif" class="r3" /></td><td><img src="img/x.gif" class="r4" /></td><td></td><td><img src="img/x.gif" class="r0" /></td><td></td><td><img src="img/x.gif" class="r5" /></td></tr></thead><tbody id="view_a"></tbody><tfoot><tr><td colspan="9"></td></tr><td>' + $("#content div.container:eq(1) span.tabItem").html() + ':</td><td id="cr1">0</td><td id="cr2">0</td><td id="cr3">0</td><td id="cr4">0</td><td></td><td id="cr5">0</td><td></td><td id="cr6">0</td></tfoot></table>';
            var HTML_RES_B = '<table cellspacing="0" style="width: 95%; display: none;" id="acc_r2"><thead><tr><td>' + vgs + '</td><td><img src="img/x.gif" class="r1" /></td><td><img src="img/x.gif" class="r2" /></td><td><img src="img/x.gif" class="r3" /></td><td><img src="img/x.gif" class="clock" /></td><td><img src="img/x.gif" class="r4" /></td><td><img src="img/x.gif" class="clock" /></td></tr></thead><tbody id="view_b"></tbody></table>';
            var HTML_INFO = '<table cellspacing="0" style="width: 95%; display: none;" id="acc_r3"><thead><tr><td>' + vgs + '</td><td>' + mer + '</td><td>' + build + '</td><td>' + trps + '</td></tr></thead><tbody id="view_c"></tbody></table>';

            $('<br><div align="center" style="border: 1px solid silver; border-radius: 5px;"><div>' + refIMG + ' | <a href="javascript:void(0)" id="view_r0" style="color: blue; text-decoration: underline;">' + $("#content div.container:eq(0)").text() + '</a> | <a href="javascript:void(0)" id="view_rA">' + $("#content div.container:eq(1)").text() + '</a> | <a href="javascript:void(0)" id="view_rB">' + $("#content div.container:eq(2)").text() + '</a></div><br>' + HTML_INFO + HTML_RES_A + HTML_RES_B + '<br></div>').appendTo($('#content'));
            var getTR = ID('overview').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;
            $('img#refr').bind('click', function () { ID('refr').style.display = 'none'; NewView(getTR, 'each'); });
            var getLinks;
            $('<b style="color: red; cursor: pointer; text-shadow: 0px 0px 2px red; float: left;" id="sVilg">(--)</b>').appendTo('#content table#overview thead td:eq(0)');
            $('#sVilg').bind('click', function () {
                if (this.style.color == 'red')
                { this.style.textShadow = '0px 0px 2px blue'; $('#overview tbody').stop(true, true).fadeOut(1000); this.style.color = 'blue'; $(this).html('(++)'); } else
                { this.style.textShadow = '0px 0px 2px red'; $('#overview tbody').stop(true, true).fadeIn(1000); this.style.color = 'red'; $(this).html('(--)'); };
            });
            var get_Resource = [], less_R = [], prod_A = [], res_l = [], perc = [], timA = [], timB = [], vName = '', cALL = 0, num = 0, troops = [], time = [], text = [], img = [], xHTML = [], bd, bd_h, bd_t, trp = [], xtrp = [], tp = [], nx = 0;
            function NewView(x, type) {
                for (var num = 0; num < x; num++) {
                    if (num == 0) {
                        for (i = 0; i < 5; i++) { ID('cr' + (i + 1)).innerHTML = 0; };
                        ID('cr6').innerHTML = 0;
                    };
                    if (type) { ID('refr').style.display = 'none'; };
                    getLinks = $('table#overview tbody tr:eq(' + num + ') a:eq(0)').attr('href');
                    $.get(getLinks, function (data) {
                        for (i = 0; i < 5; i++) {
                            get_Resource[i] = C($(data).find('#l' + (i + 1)).html().split('/')[0]);
                            if (i !== 4) {
                                perc[i] = Math.round($(data).find('#l' + (i + 1)).html().split('/')[0] / $(data).find('#l' + (i + 1)).html().split('/')[1] * 100);
                                if (perc[i] >= 90) { perc[i] = '<font color="red" class="pr_red">' + perc[i] + '%</font>'; };
                                if ((perc[i] >= 80) && (perc[i] <= 89)) { perc[i] = '<font color="orange" class="pr_orange">' + perc[i] + '%</font>'; };
                                if ((perc[i] >= 70) && (perc[i] <= 79)) { perc[i] = '<font color="green">' + perc[i] + '%</font>'; }
                                else if (perc[i] <= 69) { perc[i] = perc[i] + '%'; };
                                less_R[i] = C(C($(data).find('#l' + (i + 1)).html().split('/')[0]) - C($(data).find('#l' + (i + 1)).html().split('/')[1]));
                                prod_A[i] = $(data).find('table#production tbody tr:eq(' + i + ') td:eq(2)').html();
                            };
                            if (i == 4) {
                                ID('cr6').innerHTML = C(C(ID('cr6').innerHTML) + get_Resource[4]);
                            } else { ID('cr' + (i + 1)).innerHTML = MakeNum(C(C(ID('cr' + (i + 1)).innerHTML.replace(',', '').replace(',', '')) + get_Resource[i])); };
                        };

                        function getLess(rA, rB, rC, pA, pB, pC) {
                            var xx, yy, zz, tt, re;
                            xx = pTime('' + Time(rA, (pA / 3600)) + '', 'sec');
                            yy = pTime('' + Time(rB, (pB / 3600)) + '', 'sec');
                            zz = pTime('' + Time(rC, (pC / 3600)) + '', 'sec');
                            if (xx < (yy && zz)) { re = pTime('' + xx + '', 'time') };
                            if (yy < (xx && zz)) { re = pTime('' + yy + '', 'time') };
                            if (zz < (yy && xx)) { re = pTime('' + zz + '', 'time') };
                            return re;
                        };
                        timA[0] = getLess(less_R[0], less_R[1], less_R[2], prod_A[0], prod_A[1], prod_A[2]);
                        timB[0] = Time(less_R[3], pro[3]);
                        if ($(data).find('#movements img').parent().html()) {
                            troops, text = [], time = [], xHTML, accTR = '', img = [];
                            accTR = '<span id="t4_TBL" style="cursor: default;" onmouseover="displayMSG(FindNext(this).innerHTML); this.firstChild.title = null;" onmouseout="sHide();">';
                            xHTML = '<span style="display: none;" class="t4_TBL"><table cellspacing="1" class="acc_tbl">';
                            for (g = 0; g < $(data).find('#movements tbody img').length; g++) {
                                accTR = accTR + '' + $(data).find('#movements tbody img:eq(' + g + ')').parent().html() + '&nbsp;';
                                img[g] = $(data).find('#movements tbody img:eq(' + g + ')').parent().html();
                                text[g] = $(data).find('#movements tbody tr:eq(' + (g + 1) + ') div.mov').html();
                                time[g] = $(data).find('#movements tbody tr:eq(' + (g + 1) + ') span[id*="timer"]').html();
                                xHTML = xHTML + '<tr><td>' + img[g] + '</td><td>' + text[g] + '</td><td class="tr_Time1">0:' + time[g] + '</td></tr>';
                            };
                            troops = accTR + '</span>';
                            xHTML = xHTML + '</table></span>';
                        } else { troops = '<font color="gray">-</font>'; xHTML = ''; time = ''; text = ''; };
                        if ($(data).find('#troops img').parent().html()) {
                            xtrp = '', tp = '', trp = '';
                            tp = '<font color="blue" style="text-decoration: underline; cursor: default;" onmouseover="displayMSG(this.getElementsByTagName(\'span\')[0].innerHTML); this.firstChild.title = null;" onmouseout="sHide();">' + $(data).find('#troops thead tr th').html().replace(':', '') + '</span>';
                            xtrp = '<span style="display: none;"><table cellspacing="1" class="acc_tbl"><tbody>';
                            for (x = 0; x < $(data).find('#troops img').length; x++) {
                                trp = trp + '<tr><td>' + $(data).find('#troops img:eq(' + x + ')').parent().html() + '</td><td>' + $(data).find('#troops img:eq(' + x + ')').parent().parent().next().html() + '</td><td>' + $(data).find('#troops img:eq(' + x + ')').parent().parent().next().next().html() + '</td></tr>';
                            };
                            xtrp = xtrp + trp + '</tbody></table></span>';
                        } else { tp = '<font color="gray">-</font>'; xtrp = ''; };
                        if ($(data).find('#building_contract img') && $(data).find('#building_contract thead tr th').html()) {
                            bd = '<span onmouseover="displayMSG(FindNext(this).innerHTML);" onmouseout="sHide();" style="cursor: default;"><img src="' + bIMG + '" />';
                            bd_h = '<span style="display: none;"><table cellspacing="1" class="acc_tbl"><thead><tr><td colspan="3">' + $(data).find('#building_contract thead tr th').html().split(":")[0] + ':</td></tr></thead><tbody>';
                            for (x = 0; x < $(data).find('#building_contract tbody tr').length; x++) {
                                if (!x == 0) { bd = bd + '&nbsp;<img src="' + bIMG + '" />'; };
                                bd_h = bd_h + '<tr><td>' + $(data).find('#building_contract tbody tr:eq(' + x + ') td:eq(1)').html() + '</td><td><span class="tr_Time1">0:' + $(data).find('#building_contract tbody tr:eq(' + x + ') td:eq(2) span').html() + '</span></td></tr>';
                            };
                            bd = bd + '</span>';
                            bd_h = bd_h + '</tbody></table></span>';
                        } else { bd = '<font color="gray">-</font>', bd_h = ''; };
                        cALL = C(get_Resource[0] + get_Resource[1] + get_Resource[2] + get_Resource[3]);
                        ID('cr5').innerHTML = MakeNum(C(C(ID('cr5').innerHTML.replace(',', '').replace(',', '')) + cALL));
                        vName = $(data).find('#villageList .list ul .active').html();
                        vHref = $(vName).attr('href');
                        vName = $(data).find('#villageList .list ul .active').removeAttr('title').attr('href', 'dorf1.php' + vHref).html();
                        /*if (type == 'each') {
                        $('#view_a tr:eq(' + num + ')').html('<td>' + vName + '</td><td>' + MakeNum(get_Resource[0]) + '</td><td>' + MakeNum(get_Resource[1]) + '</td><td>' + MakeNum(get_Resource[2]) + '</td><td>' + MakeNum(get_Resource[3]) + '</td><td></td><td>' + MakeNum(cALL) + '</td><td></td><td>' + MakeNum(get_Resource[4]) + '</td>');
                        $('#view_b tr:eq(' + num + ')').html('<td>' + vName + '</td><td>' + perc[0] + '</td><td>' + perc[1] + '</td><td>' + perc[2] + '</td><td class="tr_Time1">' + timA[0] + '</td><td>' + perc[3] + '</td><td class="tr_Time1">' + timB[0] + '</td>');
                        $('#view_c tr:eq(' + num + ')').html('<td>' + vName + '</td><td class="acc_x">' + troops + '' + xHTML + '</td><td>' + bd + '' + bd_h + '</td><td>' + tp + '' + xtrp + '</td>');
                        } else {*/
                        if (type == 'each') {
                            if (ID('MXL_a' + num + '')) { ID('MXL_a' + num + '').parentNode.removeChild(ID('MXL_a' + num + '')); };
                            if (ID('MXL_b' + num + '')) { ID('MXL_b' + num + '').parentNode.removeChild(ID('MXL_b' + num + '')); };
                            if (ID('MXL_c' + num + '')) { ID('MXL_c' + num + '').parentNode.removeChild(ID('MXL_c' + num + '')); };
                        };
                        $('<tr id="MXL_a' + num + '"><td>' + vName + '</td><td>' + MakeNum(get_Resource[0]) + '</td><td>' + MakeNum(get_Resource[1]) + '</td><td>' + MakeNum(get_Resource[2]) + '</td><td>' + MakeNum(get_Resource[3]) + '</td><td></td><td>' + MakeNum(cALL) + '</td><td></td><td>' + MakeNum(get_Resource[4]) + '</td></tr>').appendTo('#view_a');
                        $('<tr id="MXL_b' + num + '"><td>' + vName + '</td><td>' + perc[0] + '</td><td>' + perc[1] + '</td><td>' + perc[2] + '</td><td class="tr_Time1">' + timA[0] + '</td><td>' + perc[3] + '</td><td class="tr_Time1">' + timB[0] + '</td></tr>').appendTo('#view_b');
                        $('<tr id="MXL_c' + num + '"><td>' + vName + '</td><td class="acc_x">' + troops + '' + xHTML + '</td><td>' + bd + '' + bd_h + '</td><td>' + tp + '' + xtrp + '</td><tr>').appendTo('#view_c');
                        //};
                        function acc() {
                            $(".pr_red").animate({ 'color': 'red' }, 'slow', function () { $(".pr_red").animate({ 'color': 'black' }, 'fast'); });
                            $(".pr_orange").animate({ 'color': 'orange' }, 'slow', function () { $(".pr_orange").animate({ 'color': 'black' }, 'fast'); });
                            return setTimeout(acc, 2000);
                        };
                        acc();
                        function sh_refr() {
                            ID('refr').style.display = null;
                        };
                        setTimeout(sh_refr, 2000);
                    });
                };
            };
            NewView(getTR);
            setTimeout(function () { ID('acc_r3').style.display = 'block'; }, 1000);
            $('#view_rA').bind('click', function () { $('#view_rA').attr('style', 'color: blue; text-decoration: underline;'); $('#view_r0').removeAttr('style'); $('#view_rB').removeAttr('style'); ID('acc_r1').style.display = 'block'; ID('acc_r2').style.display = 'none'; ID('acc_r3').style.display = 'none'; });
            $('#view_rB').bind('click', function () { $('#view_rB').attr('style', 'color: blue; text-decoration: underline;'); $('#view_rA').removeAttr('style'); $('#view_r0').removeAttr('style'); ID('acc_r2').style.display = 'block'; ID('acc_r1').style.display = 'none'; ID('acc_r3').style.display = 'none'; });
            $('#view_r0').bind('click', function () { $('#view_r0').attr('style', 'color: blue; text-decoration: underline;'); $('#view_rA').removeAttr('style'); $('#view_rB').removeAttr('style'); ID('acc_r3').style.display = 'block'; ID('acc_r2').style.display = 'none'; ID('acc_r1').style.display = 'none'; });
            rTimeX();
            /*var src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAuJJREFUeNqkU8lPE1EY/6ad6dAOSwttLcUolIrAASPVWEncIulBjVESl+jZg4l/ggdvnkz06EU8FA9iNMaIYvRgmhASUw2NQJQuLBZZOixtp515s/k9iojRxIOT/ObNm2/9fQtjmib8z8PS14n+pft4hP4ijyNuIzhEEYOJhq4TTdNAU9VfDnRdj4Fphi5F/CFFqWTEsgw8eTcP54837hbXiSebk8nsQlkydJhA8fefESz0hd6i6HV4YGg2ziAlqaCCIutAI6nEYATO6gv6HLvPHPZ02lgzgsECvzlQFcUPhtZzOuwN5ZYkqKoCIIqKxgQG32YKo+OL1VJZCa6KcmvkgHs/A/pF0zCcSGczA0L6mr18ML9SwtRNePRyKm5D1pqiACrF57Lrb17FZsqySgLikhTc5ea70OaIjnXYqAFRlJ6GaraeRk1kxBTeRx8+m6jkiE4sFuYjMvMlpnLdHf7ane4aVkGdYyh9UaEgy21WC+PQTANSmeU1XdNuYPS7iHi5WITC6hrNciidWeZRpwl1A2hzELGVgVTWjLyqmRvfRgmpcFwU+xFFCrTFMSmfj1pZVpA0s5YDg+oJW20ksvxhuSDX6gzLe9yCkp3LncLIQxzPw+Z8UIR9vjqnKBtgBbWENl+3d+H97DdxUgQu7WppwlqRozg03TJmgjI42dcTwjPs7mxtRR2Yy4oreB+hsooDQmLTX2YSVU4hmbUK6UBv2F6zwxXBWoQwVUiVGNh3oTeULFvAEOyQHJ9Oos1TOo0bDpDnmlwsPY4PDn9y1NlT83xd0jwULjZePleDxYN1Kw9jBSu46h0wFn0eJ5JEo88XX9+q1KAwcAUs3va0svds+fODUqezLSBAS7NN8ftMOkwGDoXdYsKCAdBx/Wooca+fmk1qixNRhm4jwzD0B62qh7G7GsDTLkC1n2NI3gBv1zVo2NP2x5qJU5PGyJ2b2x3YEA6EHcH8Y4vpxmm0fD8EGADFhK0+biwMlwAAAABJRU5ErkJggg%3D%3D';
            var img = Create('img');
            img.src = src;
            ID('overview').getElementsByTagName('td')[0].appendChild(img);*/
        };
        function ViewMessege() {
            if (exp(/nachrichten\b[^>]*php/)) {
                if (xpath('//table[@id="overview"]/tbody//td[@class="noData"] | //table[@id="overview"]/tbody//td[@class="none"]').snapshotItem(0)) { } else {
                    if (xpath('//table[@id="overview"]/thead/tr/th').snapshotItem(0)) {
                        xpath('//table[@id="overview"]/thead/tr/th').snapshotItem(0).setAttribute('colspan', '3');
                        for (c = 0; c < xpath('//table[@id="overview"]/tbody/tr').snapshotLength; c++) {
                            var Target = xpath('//table[@id="overview"]/tbody/tr[' + (c + 1) + ']/td[3]').snapshotItem(0);
                            var td = Create('td', { class: 'sel' });
                            var a = Create('a', { href: 'javascript:void(0)' });
                            var image = Create('img', { src: IMG_open, id: 'openMSG(' + (c + 1) + ')', name: '' + (c + 1) + '' });
                            a.appendChild(image);
                            td.appendChild(a);
                            Target.parentNode.insertBefore(td, Target);
                        };
                        if (travian3) {
                            document.getElementsByTagName('tfoot')[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[1].setAttribute("colspan", "3");
                            if (exp(/nachrichten.php\b[^>]?t=2/)) {
                                document.getElementById('overview').getElementsByTagName('thead')[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[1].setAttribute("colspan", "2");
                                document.getElementById('overview').getElementsByTagName('thead')[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[0].setAttribute("colspan", "0");
                            }
                        }
                        $('img[id*="openMSG("]').bind('click', function () { XMLGetM(this.name); });
                    };
                };
            };
        };
        function ViewRep() {
            if (exp(/berichte\b[^>]*php/)) {
                if (xpath('//table[@id="overview"]/tbody//td[@class="noData"] | //table[@id="overview"]/tbody//td[@class="none"]').snapshotItem(0) || exp(/berichte.php\b[^>]?t=5/)) { } else {
                    if (xpath('//table[@id="overview"]/thead/tr/th').snapshotItem(0)) {
                        xpath('//table[@id="overview"]/thead/tr/th').snapshotItem(0).setAttribute('colspan', '3');
                        for (c = 0; c < xpath('//table[@id="overview"]/tbody/tr').snapshotLength; c++) {
                            var Target = xpath('//table[@id="overview"]/tbody/tr[' + (c + 1) + ']/td[3]').snapshotItem(0);
                            var td = Create('td', { class: 'sel' });
                            var a = Create('a', { href: 'javascript:void(0)' });
                            var image = Create('img', { src: IMG_open, id: 'openRep(' + (c + 1) + ')', name: '' + (c + 1) + '' });
                            a.appendChild(image);
                            td.appendChild(a);
                            Target.parentNode.insertBefore(td, Target);
                        };
                        if (travian3) {
                            document.getElementsByTagName('tfoot')[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[1].setAttribute("colspan", "2");
                        }
                        $('img[id*="openRep("]').bind('click', function () { XMLGetR(this.name); });
                    };
                };
            };
        };
        function Show_Help_Links() { // الروابط المساعدة
            var x = getPosition('hlink', '300px_300px').split('_')[1];
            var y = getPosition('hlink', '300px_300px').split('_')[0];
            $('' +
'<div id="hlink" style="position: absolute; left: ' + x + '; top: ' + y + '; z-index:10000; width:auto;"><h1><span style="float: ' + (RTL == "rtl" ? "left" : "right") + ';"><img class="4close" src="' + CloseAIMG + '" /></span>' + SubLanguage(LanguagePack(), 12) + '</b>:</h1><ul>' +
'<li><a href="http://travian.kirilloid.ru/villages_res.php" target="_blank">' + SubLanguage(LanguagePack(), 13) + '</a></li>' +
'<li><a href="http://travian.kirilloid.ru/warsim2.php" target="_blank">' + SubLanguage(LanguagePack(), 14) + '</a></li>' +
'<li><a href="http://travian.kirilloid.ru/distance.php" target="_blank">' + SubLanguage(LanguagePack(), 15) + '</a></li>' +
'<li><a href="http://www.traviantoolbox.com/" target="_blank">Travian Toolbox</a></li>' +
'<li><a href="http://travmap.shishnet.org" target="_blank">TravMap</a></li>' +
'<li><a href="http://travian-live.com/" target="_blank">Travian-Live</a></li>' +
'</ul></div>').appendTo(document.body);
            $('#hlink img.4close').bind('click', function () { $('#hlink').fadeOut(1000, function () { $('#hlink').remove(); GM_setValue('setting[12]', 'false'); }); });
            MakeDrag(ID('hlink').getElementsByTagName('h1')[0], ID('hlink'));
            $('#hlink a').hover(function () { $(this).stop().animate({ "color": "red" }, "medium"); }, function () { $(this).stop().animate({ "color": "#555555" }, "medium"); });
        };

        function AttackDist() {
            var x, y, aID, bID;
            if (travian3) {
                x = document.getElementsByClassName('target')[0].getElementsByTagName('INPUT')[0].value;
                y = document.getElementsByClassName('target')[0].getElementsByTagName('INPUT')[1].value;
            } else {
                x = ID('xCoordInput').value;
                y = ID('yCoordInput').value;
            }
            aID = MyId();
            bID = xyToId(x, y);
            if (y.match(/\d+/) && x.match(/\d+/)) { gTimeD(aID, bID, 'Dist'); };
        };
        function AttackInfo() {
            for (i = 0; i < 10; i++) {
                $(document.getElementsByName('t' + (i + 1))[0]).bind('change', OnChange);
                $(document.getElementsByName('t' + (i + 1))[0]).bind('keyup', OnChange);
                $(FindNext(document.getElementsByName('t' + (i + 1))[0])).bind('mouseup', function () { setTimeout(OnChange, 250) });
            };

            var HTML = '<table style="width: auto;" cellspacing="1"><tbody><tr><td>' +
    '<table cellspacing="1" bgcolor="silver" style="width: auto;" id="TrXw">' +
'<tbody>' +
'<tr>' +
'<td colspan="2"><img src="' + imgatti + '">×<span id="xtr[1]">0</span></td>' +
'<td colspan="2"><img src="' + imgattc + '">×<span id="xtrs[1]">0</span></td></tr>' +
'<tr><td colspan="2"><img src="img/x.gif" class="def_i">×<span id="xtr[2]">0</span></td>' +
'<td colspan="2"><img src="img/x.gif" class="def_c">×<span id="xtr[3]">0</span></td></tr>' +
'<tr><td colspan="2"><img class="carry full" src="img/x.gif">×<span id="xtr[4]">0</span></td>' +
'<td colspan="2"><img class="r5" src="img/x.gif">×<span id="xtr[5]">0</span></td></tr></tbody></table>' +
'</td><td><table cellspacing="1" bgcolor="silver" style="width: auto;" id="TrXs"><tbody><tr>' +
'<td><img class="r1" src="img/x.gif">×<span id="xtr[6]">0</span></td></tr><tr>' +
'<td><img class="r2" src="img/x.gif">×<span id="xtr[7]">0</span></td></tr><tr>' +
'<td><img class="r3" src="img/x.gif">×<span id="xtr[8]">0</span></td></tr><tr>' +
'<td><img class="r4" src="img/x.gif">×<span id="xtr[9]">0</span></td>' +
'</tr>' +
'</tbody></table></td></tr></tbody></table><br>';

            if (travian3) {
                $(HTML).insertBefore($('#coords'));
            } else {
                $(HTML).insertBefore($('.destination'));
            }


        };
        function BuildingView() {
            if (exp(/dorf2\b[^>]*php/) && ID('village_map')) {
                var IMG = function (cName) { return '<img src="img/x.gif" alt="' + CLASS('r' + cName)[0].getAttribute("alt") + '" title="' + CLASS('r' + cName)[0].getAttribute("title") + '" class="r' + cName + '" />'; };
                var z = getPosition('TBL_D2_RES', '600px_150px');
                x = z.split('_')[1];
                y = z.split('_')[0];
                var Div = Create('div', { style: 'position: absolute; top: ' + y + '; left: ' + x + ';', id: 'TBL_D2_RES' });
                Div.align = 'center';
                var drgDIV = Create('div', { class: 'RES_drag' });
                drgDIV.innerHTML = '<img style="padding: 0px 0px 3px;  float: ' + (RTL == "rtl" ? "left" : "right") + '; cursor: pointer;" src="' + svnIMG(1) + '" />';
                MakeDrag(drgDIV, Div);

                var Table = Create('table', { cellspacing: '4', style: 'border-collapse: collapse; width: auto; background-color: transparent; z-index: 10000;' });
                var Tbody = Create('tbody');
                Tbody.innerHTML = '<tr id="bList[1]"></tr><tr id="bList[2]"></tr><tr id="bList[3]"></tr><tr id="bList[4]"></tr><tr id="bList[5]"></tr><tr id="bList[6]"></tr><tr id="bList[7]"></tr>';
                Table.appendChild(Tbody);
                Div.appendChild(drgDIV);
                Div.appendChild(Table);
                document.body.appendChild(Div);
                for (i = 0; i < xpath('//div[@id="village_map"]/img[contains(@class, "building g")]').snapshotLength; i++) {
                    var TypeName = $('div[id="village_map"] img[class*="building g"]').eq(i).attr('class').match(/\d+/);
                    var ImageClass = $('div[id="village_map"] img[class*="building g"]').eq(i).attr('class');
                    var Level = $($('div[id="village_map"] img[class*="building g"]').eq(i).attr('alt')).text().match(/\d+/);
                    var Name = $('<div>' + $('div[id="village_map"] img[class*="building g"]').eq(i).attr('alt') + '</div>');
                    Name = Name.find('span.level:eq(0)').parent().text().split('|')[0];
                    var Color = [];
                    var TypeU;
                    var CountTime = [];
                    var img = [];
                    var available = '';
                    if (bCost[TypeName]) {
                        if (bCost[TypeName][Level]) {
                            if (bCost[TypeName][C(Level) + 1]) {
                                var wood = C(C(ID('l1').innerHTML) - C(bCost[TypeName][C(Level) + 1][0]));
                                var clay = C(C(ID('l2').innerHTML) - C(bCost[TypeName][C(Level) + 1][1]));
                                var iron = C(C(ID('l3').innerHTML) - C(bCost[TypeName][C(Level) + 1][2]));
                                var crop = C(C(ID('l4').innerHTML) - C(bCost[TypeName][C(Level) + 1][3]));

                                var NPC = C(C(crop) + C(iron) + C(clay) + C(wood));
                                var NPC_href = '<a href="build.php?gid=17&t=3&r1=' +
            C(bCost[TypeName][C(Level) + 1][0]) + '&r2=' +
            C(bCost[TypeName][C(Level) + 1][1]) + '&r3=' +
            C(bCost[TypeName][C(Level) + 1][2]) + '&r4=' +
            C(bCost[TypeName][C(Level) + 1][3]) + '"><img src="img/x.gif" class="npc" /></a>';

                                if (NPC > 0) { Color[5] = 'travian_NPC'; } else { Color[5] = 'red'; };

                                for (b = 0; b < 4; b++) { img[(b + 1)] = IMG('' + (b + 1) + ''); Color[(b + 1)] = 'darkgreen'; };
                                if (wood < 0) { Color[1] = 'gray'; CountTime[1] = '<font style="font-size: 11px" class="xbTime">' + Time(wood, pro[0]) + '</font><br>'; } else { wood = '+' + wood + '<br>'; CountTime[1] = ''; };
                                if (clay < 0) { Color[2] = 'gray'; CountTime[2] = '<font style="font-size: 11px" class="xbTime">' + Time(clay, pro[1]) + '</font><br>'; } else { clay = '+' + clay + '<br>'; CountTime[2] = ''; };
                                if (iron < 0) { Color[3] = 'gray'; CountTime[3] = '<font style="font-size: 11px" class="xbTime">' + Time(iron, pro[2]) + '</font><br>'; } else { iron = '+' + iron + '<br>'; CountTime[3] = ''; };
                                if (crop < 0) { Color[4] = 'gray'; CountTime[4] = '<font style="font-size: 11px" class="xbTime">' + Time(crop, pro[3]) + '</font><br>'; } else { crop = '+' + crop + '<br>'; CountTime[4] = ''; };


                                var xCrop = C(C(bCost[TypeName][Level][5])) + ' -->' + C(C(bCost[TypeName][C(Level) + 1][5])) + ' =[+' + C(C(bCost[TypeName][C(Level) + 1][5]) - C(bCost[TypeName][Level][5])) + ']';
                                var pnx = C(C(bCost[TypeName][Level][4])) + ' -->' + C(C(bCost[TypeName][C(Level) + 1][4]))
                                var X = '' +
            '<td class="bList"><center><a href="build.php?gid=' + TypeName + '">' + Name + '</a></center><br>' +
            '<a href="build.php?gid=' + TypeName + '"><img src="img/x.gif" class="' + ImageClass + '" title="' + Name + '" style="float: left;" /></a>' +
            '<span style="float: left;">' +
            '' + img[1] + ' <font color="' + Color[1] + '" style="font-size: 11.5px">' + wood + '</font> ' + CountTime[1] + ' ' +
            '' + img[2] + ' <font color="' + Color[2] + '" style="font-size: 11.5px">' + clay + '</font> ' + CountTime[2] + ' ' +
            '' + img[3] + ' <font color="' + Color[3] + '" style="font-size: 11.5px">' + iron + '</font> ' + CountTime[3] + ' ' +
            '' + img[4] + ' <font color="' + Color[4] + '" style="font-size: 11.5px">' + crop + '</font> ' + CountTime[4] + ' ' +
            '' + available +
            '<hr style="margin: 5px;">' +
            '' + NPC_href + '--><font color="' + Color[5] + '" style="font-size: 11.5px">' + NPC + '</font><br>' +
            '' + IMG('5') + ' <font style="font-size: 11px" color="red">' + xCrop + '</font><br>' +
            '<img src="' + PN + '" /> <font style="font-size: 11px" color="blue">' + pnx + '</font>' +
            '</span>' +
            '</td>';
                            } else {
                                var X = '';
                            };
                            if (!ID('bList[1]').childNodes[2]) {
                                ID('bList[1]').innerHTML += X;
                            } else if (!ID('bList[2]').childNodes[2]) {
                                ID('bList[2]').innerHTML += X;
                            } else if (!ID('bList[3]').childNodes[2]) {
                                ID('bList[3]').innerHTML += X;
                            } else if (!ID('bList[4]').childNodes[2]) {
                                ID('bList[4]').innerHTML += X;
                            } else if (!ID('bList[5]').childNodes[2]) {
                                ID('bList[5]').innerHTML += X;
                            }
                        };
                    };
                };

                $('.RES_drag img').bind('click', function () { $('#TBL_D2_RES').remove(); GM_setValue('setting[2]', 'false'); });
                $('.RES_drag img').hover(function () { this.src = svnIMG(2); }, function () { this.src = svnIMG(1) });
            };
        };
        function ViewCropFind() { $('#Searcher').append(CCDC()); setTimeout(function () { ID('crop_x').value = ID('xgy').getAttribute('value'); ID('crop_y').value = ID('xgy').getAttribute('class'); }, 500); ID('cFinderX').addEventListener('click', SearchCropFields, true); };
        function ViewElphFind() { $('#Searcher').append(CEDC()); setTimeout(function () { ID('elep_x').value = ID('xgy').getAttribute('value'); ID('elep_y').value = ID('xgy').getAttribute('class'); }, 500); ID('cElphantX').addEventListener('click', SearchElephants, true); };

        function xbt() {
            if (CLASS('xbTime')[0]) {
                for (i = 0; i < CLASS('xbTime').length; i++) {
                    if (CLASS('xbTime')[i].innerHTML == '' || CLASS('xbTime')[i].innerHTML == ('0:00:00:00' || '00:00:00' || '0:00:00')) {
                    } else {
                        CLASS('xbTime')[i].innerHTML = format(ReLoadTime(CLASS('xbTime')[i].innerHTML) - 1);
                    };
                };
            };
            return setTimeout(xbt, 1000);
        }
        function ReportX() {
            if (CLASS('report_content')[0] && ID('attacker') && ID('report_surround')) {
                var attacker = xpath('//table[@id="attacker"]/tbody[1]/tr[1]/td').snapshotLength;
                var pos;
                if (RTL == 'ltr') { pos = 'style="text-align: left;"'; } else { pos = 'style="text-align: right; font-size: 11px;"'; };
                var Munit = [];
                var Nunit = [];
                var Dunit = [];
                var Xunit = [];
                var Def_A = [];
                var Def_B = [];
                var Def_C = [];
                var Def_D = [];
                if (travian3) {
                    var locatt = xpath('//td[@class="report_content"]/table[@id="attacker"]/tbody[@class="units"]').snapshotItem(0);
                    var locatt2 = xpath('//td[@class="report_content"]/table[@class="defender"]/tbody[@class="units"]').snapshotItem(0);
                } else {
                    var locatt = xpath('//td[@class="report_content"]/table[@id="attacker"]/tbody[@class="units last"]').snapshotItem(0);
                    var locatt2 = xpath('//td[@class="report_content"]/table[2]/tbody[@class="units last"]').snapshotItem(0);
                }
                $('<tr>' +
        '<th>' +
        '' + SubLanguage(LanguagePack(), 32) + ':<br>' +
        '<hr style="margin: 0px 0px;" /><br>' +
        '' + SubLanguage(LanguagePack(), 34) + ':' + /*
        '<hr style="margin: 0px 0px;" /><br>' +
        '' + SubLanguage(LanguagePack(), 35) + ':' +*/
        '</th>' +
            '<td colspan="11" ' + pos + '>' +
            '<img src="' + Send_attack + '" />(<span id="AttX">0</span>)&nbsp;|&nbsp;&nbsp;' +
            '<img src="' + imgatti + '" /><span id="iAttX">0</span>&nbsp;&nbsp;|&nbsp;&nbsp;' +
            '<img src="' + imgattc + '" /><span id="cAttX">0</span><br><hr style="margin: 0px 0px;" /><br>' +
            '<img src="' + Send_resource + '" />(<span id="aRes">0</span>) | ' +
            '<img src="img/x.gif" class="r1" /><span id="aRes[0]">0</span> | ' +
            '<img src="img/x.gif" class="r2" /><span id="aRes[1]">0</span> | ' +
            '<img src="img/x.gif" class="r3" /><span id="aRes[2]">0</span> | ' +
            '<img src="img/x.gif" class="r4" /><span id="aRes[3]">0</span> | ' +
            '<img src="img/x.gif" class="r5" /><span id="aRes[4]">0</span>' + /*
            '<br><hr style="margin: 0px 0px;" /><br>' +
            '<span>' + SubLanguage(LanguagePack(), 36) + '(<span id="aInfosA">0</span>%</span>) | ' +
            '<span>' + SubLanguage(LanguagePack(), 37) + '(<span id="aInfosB">0</span>%</span>)' +*/
            '</td></tr>').appendTo(locatt);

                $('<tr>' +
        '<th>' +
        '' + SubLanguage(LanguagePack(), 33) + ':<br>' +
        '<hr style="margin: 0px 0px;" /><br>' +
        '' + SubLanguage(LanguagePack(), 34) + ':' + /*
        '<hr style="margin: 0px 0px;" /><br>' +
        '' + SubLanguage(LanguagePack(), 35) + ':' +*/
        '</th>' +
            '<td colspan="11" ' + pos + '>' +
            '<img src="img/x.gif" class="def_all" />(<span id="DefX">0</span>)&nbsp;|&nbsp;&nbsp;' +
            '<img src="img/x.gif" class="def_i" /><span id="iDefX">0</span>&nbsp;&nbsp;|&nbsp;&nbsp;' +
            '<img src="img/x.gif" class="def_c" /><span id="cDefX">0</span><br><hr style="margin: 0px 0px;" /><br>' +
            '<img src="' + Send_resource + '" />(<span id="bRes">0</span>) | ' +
            '<img src="img/x.gif" class="r1" /><span id="bRes[0]">0</span> | ' +
            '<img src="img/x.gif" class="r2" /><span id="bRes[1]">0</span> | ' +
            '<img src="img/x.gif" class="r3" /><span id="bRes[2]">0</span> | ' +
            '<img src="img/x.gif" class="r4" /><span id="bRes[3]">0</span> | ' +
            '<img src="img/x.gif" class="r5" /><span id="bRes[4]">0</span>' + /*
            '<br><hr style="margin: 0px 0px;" /><br>' +
            '<span>' + SubLanguage(LanguagePack(), 36) + '(<span id="bInfosA">0</span>%</span>) | ' +
            '<span>' + SubLanguage(LanguagePack(), 37) + '(<span id="bInfosB">0</span>%</span>)' +*/
            '</td></tr>').appendTo(locatt2);
                if (ID('attacker').getElementsByClassName('goods')[0] && ID('attacker').getElementsByClassName('goods')[0].getElementsByClassName('carry')[0]) {
                    var cr = [];
                    cr[0] = ID('attacker').getElementsByClassName('goods')[0].getElementsByClassName('carry')[0].innerHTML.split(/<img\b[^>]*>/)[1].split('/')[0];
                    cr[1] = ID('attacker').getElementsByClassName('goods')[0].getElementsByClassName('carry')[0].innerHTML.split(/<img\b[^>]*>/)[1].split('/')[1];
                    ID('attacker').getElementsByClassName('goods')[0].getElementsByClassName('carry')[0].innerHTML += '&nbsp;(%' + Math.round(cr[0] / cr[1] * 100) + ')';
                };
                for (i = 0; i < attacker; i++) {
                    // attacker

                    if (travian3) {
                        $('#attacker tbody:eq(0) tr:eq(0) td:first-child').wrap("<th></th>").contents().unwrap();
                        $('.defender tbody:eq(0) tr:eq(0) td:first-child').wrap("<th></th>").contents().unwrap();
                        Munit[i] = xpath('//table[@id="attacker"]/tbody[1]/tr[1]/td[' + (i + 1) + ']/img').snapshotItem(0).className.split(' u')[1];
                        Nunit[i] = xpath('//table[@id="attacker"]/tbody[1]/tr[2]/td[' + (i + 1) + ']').snapshotItem(0).innerHTML;
                    } else {
                        Munit[i] = xpath('//table[@id="attacker"]/tbody[1]/tr[1]/td[' + (i + 1) + ']/img').snapshotItem(0).className.split(' u')[1];
                        Nunit[i] = xpath('//table[@id="attacker"]/tbody[2]/tr[1]/td[' + (i + 1) + ']').snapshotItem(0).innerHTML;
                    }

                    if (xpath('//table[@id="attacker"]/tbody[3][contains(@class, "units")]').snapshotItem(0) || xpath('//table[@id="attacker"]/tbody[1]/tr[3]').snapshotItem(0)) {
                        if (travian3) {
                            Dunit[i] = xpath('//table[@id="attacker"]/tbody[1]/tr[3]/td[' + (i + 1) + ']').snapshotItem(0).innerHTML;
                        } else {
                            Dunit[i] = xpath('//table[@id="attacker"]/tbody[3]/tr[1]/td[' + (i + 1) + ']').snapshotItem(0).innerHTML;
                        }

                    } else { Dunit[i] = 0; };
                    Xunit['att'] = C(C(xtr(Munit[i], 0)) * C(Nunit[i]));
                    Xunit['aRes[0]'] = C(C(xtr(Munit[i], 3)) * C(Dunit[i]));
                    Xunit['aRes[1]'] = C(C(xtr(Munit[i], 4)) * C(Dunit[i]));
                    Xunit['aRes[2]'] = C(C(xtr(Munit[i], 5)) * C(Dunit[i]));
                    Xunit['aRes[3]'] = C(C(xtr(Munit[i], 6)) * C(Dunit[i]));
                    Xunit['aRes[4]'] = C(C(xtr(Munit[i], 7)) * C(Dunit[i]));
                    ID('AttX').innerHTML = C(C(ID('AttX').innerHTML) + C(Xunit['att']))
                    ID('aRes').innerHTML = C(C(Xunit['aRes[0]']) + C(Xunit['aRes[1]']) + C(Xunit['aRes[2]']) + C(Xunit['aRes[3]']) + C(ID('aRes').innerHTML));
                    if (TroopType(Munit[i])) {
                        if (TroopType(Munit[i]).toString().match(/i/)) { ID('iAttX').innerHTML = C(C(ID('iAttX').innerHTML) + C(Xunit['att'])); };
                        if (TroopType(Munit[i]).toString().match(/c/)) { ID('cAttX').innerHTML = C(C(ID('cAttX').innerHTML) + C(Xunit['att'])); };
                    };
                    for (x = 0; x < 5; x++) { ID('aRes[' + (x + 0) + ']').innerHTML = C(C(ID('aRes[' + (x + 0) + ']').innerHTML) + C(Xunit['aRes[' + (x + 0) + ']'])); };
                    // defender
                    if (xpath('//td[@class="report_content"]/table[2]/tbody[1]/tr/td/img').snapshotItem(0) && xpath('//td[@class="report_content"]/table[2]/tbody[2]/tr/td').snapshotItem(0)) {
                        Def_A[i] = xpath('//td[@class="report_content"]/table[2]/tbody[1]/tr/td/img').snapshotItem(0).className.split(' u')[1];
                        if (xpath('//td[@class="report_content"]/table[2]/tbody[2]/tr/td[' + (i + 1) + ']').snapshotItem(0)) {
                            if (xpath('//td[@class="report_content"]/table[2]/tbody[2]/tr/td[' + (i + 1) + ']').snapshotItem(0).innerHTML.match(/\d/)) {
                                Def_B[i] = xpath('//td[@class="report_content"]/table[2]/tbody[2]/tr/td[' + (i + 1) + ']').snapshotItem(0).innerHTML;
                            } else { Def_B[i] = 0; };
                        } else { Def_B[i] = 0; };
                        if (xpath('//td[@class="report_content"]/table[2]/tbody[3][@class="units last"]/tr/td').snapshotItem(i)) {
                            Def_C[i] = xpath('//td[@class="report_content"]/table[2]/tbody[3][@class="units last"]/tr/td').snapshotItem(i).innerHTML;
                        } else { Def_C[i] = 0; };
                        Def_D['def'] = C(C(xtr(Def_A[i], 0)) * C(Def_B[i]));
                        Def_D['bRes[0]'] = C(C(xtr(Def_A[i], 3)) * C(Def_C[i]));
                        Def_D['bRes[1]'] = C(C(xtr(Def_A[i], 4)) * C(Def_C[i]));
                        Def_D['bRes[2]'] = C(C(xtr(Def_A[i], 5)) * C(Def_C[i]));
                        Def_D['bRes[3]'] = C(C(xtr(Def_A[i], 6)) * C(Def_C[i]));
                        Def_D['bRes[4]'] = C(C(xtr(Def_A[i], 7)) * C(Def_C[i]));
                        ID('DefX').innerHTML = C(C(ID('DefX').innerHTML) + C(Def_D['def']));
                        ID('bRes').innerHTML = C(C(Def_D['bRes[0]']) + C(Def_D['bRes[1]']) + C(Def_D['bRes[2]']) + C(Def_D['bRes[3]']) + C(ID('bRes').innerHTML));
                        if (TroopType(Munit[i])) {
                            if (TroopType(Munit[i]).toString().match(/i/)) { ID('iDefX').innerHTML = C(C(ID('iDefX').innerHTML) + C(Def_D['def'])); };
                            if (TroopType(Munit[i]).toString().match(/c/)) { ID('cDefX').innerHTML = C(C(ID('cDefX').innerHTML) + C(Def_D['def'])); };
                        };
                        for (x = 0; x < 5; x++) { ID('bRes[' + (x + 0) + ']').innerHTML = C(C(ID('bRes[' + (x + 0) + ']').innerHTML) + C(Def_D['bRes[' + (x + 0) + ']'])); };
                    };
                };
            };
        };
        function qSendIcons() {
            var links = $('a[href*="karte.php?d="]').length;
            var rlink = [];
            var alink = [];
            var flink = [];
            var xLink = [];
            var IMG_A = [];
            var IMG_B = [];
            var IMG_G = [];
            var XLK = [];
            var GML = [];
            var spn = [];
            var a2bUrl = travian3 ? 'a2b.php?z=' : 'build.php?id=39&tt=2&z=';
            for (j = 0; j < links; j++) {
                xLink[j] = $('a[href*="karte.php?d="]').eq(j);
                if (xLink[j].parent().parent().parent().attr('id') != "tbody_links") {
                    spn[j] = Create('span');
                    alink[j] = Create('a', { href: a2bUrl + xLink[j].attr('href').split('=')[1] });
                    IMG_A[j] = Create('img', { src: Send_attack, onmouseover: "displayMSG('<b>" + SubLanguage(LanguagePack(), 6) + " " + xLink[j].html() + "</b>');", onmouseout: 'sHide();' });

                    rlink[j] = Create('a', { href: 'build.php?&z=' + xLink[j].attr('href').split('=')[1] + '&gid=17' + (travian3 ? '' : '&t=5') });
                    IMG_B[j] = Create('img', { src: Send_resource, onmouseover: "displayMSG('<b>" + SubLanguage(LanguagePack(), 5) + " " + xLink[j].html() + "</b>');", onmouseout: 'sHide();' });

                    $(rlink[j]).append(IMG_B[j]);
                    $(alink[j]).append(IMG_A[j]);
                    $(spn[j]).append(cData(' ')).append(rlink[j]).append(cData(' ')).append(alink[j]);
                    if (ID('tbody_links') && xLink[j].parent().parent().parent().attr('id') != "tbody_links") {
                        $(xLink[j]).attr('id', 'xx' + j + '');
                        flink[j] = Create('a');
                        flink[j].setAttribute('href', 'javascript:void(0)');
                        IMG_G[j] = Create('img', { style: 'margin-bottom: -2px;', class: "xx" + j + "", id: 'quickSave[' + j + ']', src: star, onmouseover: "displayMSG('<b>" + SubLanguage(LanguagePack(), 8) + " " + xLink[j].html() + "</b>');", onmouseout: 'sHide();' });
                        $(IMG_G[j]).bind('click', function () {
                            SaveAsLink('' + this.className + '');
                            this.setAttribute('src', starx);
                        });
                        $(flink[j]).append(IMG_G[j]);
                        $(spn[j]).append(cData('  ')).append(flink[j]);
                    };
                    $(xLink[j]).parent().append(spn[j]);
                };
            };
        };
        function showTHelp() {
            var links = document.links.length;
            var xLink = document.links;
            for (j = 0; j < links; j++) {
                if (xLink[j].href.match("karte.php\[^>]d=")) {
                    $(xLink[j]).hover(function () { gTimeD(ID('xgy').innerHTML, this.href.split('d=')[1]); }, function () { sHide(); });
                } else if (xLink[j].href.match("position_details.php\[^>]x=")) {
                    xLink['x'] = xLink[j].href.split("position_details.php?x=")[1].split('&y')[0]
                    xLink['y'] = xLink[j].href.split("&y=")[1];
                    xLink['id'] = xyToId(xLink['x'], xLink['y']);
                    xLink[j].setAttribute('value', xLink['id']);
                    $(xLink[j]).hover(function () { gTimeD(ID('xgy').innerHTML, this.getAttribute('value')); }, function () { sHide(); });
                } else if (xLink[j].href.match("karte.php\[^>]x=")) {
                    xLink['x'] = xLink[j].href.split("karte.php?x=")[1].split('&y')[0]
                    xLink['y'] = xLink[j].href.split("&y=")[1];
                    xLink['id'] = xyToId(xLink['x'], xLink['y']);
                    xLink[j].setAttribute('value', xLink['id']);
                    $(xLink[j]).hover(function () { gTimeD(ID('xgy').innerHTML, this.getAttribute('value')); }, function () { sHide(); });
                };
            };
            setTimeout(showTHelp, 1000);
        };
        function makeWindow(title, html, position) {
            if (!ID('w7Window')) {
                $(
        '<div id="w7Window" style="position: absolute; top: ' + position[0] + '; left: ' + position[1] + '; z-index: 10000;">' +
        '<div style="text-align: ' + (RTL == "rtl" ? "right" : "left") + ';padding: 0px 0px 3px; width: 100%; height: 22px; cursor: move;" id="T4_dWindow">' +
        '<span style="float: ' + (RTL == "rtl" ? "right" : "left") + '; width: 15px; padding: 4px;font-size: 10px; font-weight: bold; text-shadow: 0px 0px 5px white; padding: 3px; cursor: default;">' + title + '</span>' +
        '<img src="' + svnIMG(1) + '" style="float: ' + (RTL == "rtl" ? "left" : "right") + ';" /></div><div id="t4_w7w" style="border: 1px solid;">' + html + '</div>' +
        '</div>').appendTo($(document.body));
                MakeDrag(ID('T4_dWindow'), ID('w7Window'));
                $('div#w7Window div#T4_dWindow img').css('cursor', 'pointer');
                $('div#w7Window div#T4_dWindow img').bind('click', function () { $('div#w7Window').remove(); });
                $('div#w7Window div#T4_dWindow img').hover(function () { this.src = svnIMG(2); }, function () { this.src = svnIMG(1) });
            } else {
                $('#t4_w7w').html(html);
            };
        };
        function qRep() {
            if (!exp(/berichte\.php/)) {
                var xLink = document.links;
                var x, y, z;
                if (GM_getValue('w7Window')) {
                    z = getPosition('w7Window', '155px_455px');
                    x = z.split('_')[0];
                    y = z.split('_')[1];
                } else { x = '155px'; y = '455px'; };
                for (i = 0; i < document.links.length; i++) {
                    if (xLink[i].href.match(/berichte\.php\?\b[^>]*/) && !xLink[i].getAttribute('value')) {
                        $('<img src="' + IMG_open + '" style="cursor:pointer;float: ' + (RTL == "rtl" ? "right" : "left") + ';" name="' + xLink[i].href + '" id="open_r' + i + '" />').insertBefore($(xLink[i]));
                        $('img#open_r' + i + '').bind('click', function () {
                            $.get(this.name, function (e) {
                                makeWindow($('img#open_r' + i + '').attr('name'), '<table id="report_surround" cellspacing="1" cellpadding="1">' + $(e).find('#report_surround').html() + '</table>', [x, y]);
                            })
                        });
                        $(xLink[i]).attr('value', '0');
                    };
                };
            };
            setTimeout(qRep, 1000);
        };
        function qSendMsg() {
            var links = xpath('//div[@id="content"]//a[contains(@href, "spieler.php?uid=")]').snapshotLength;
            for (j = 0; j < links; j++) {
                xLink = xpath('//div[@id="content"]//a[contains(@href, "spieler.php?uid=")]').snapshotItem(j);
                if (travian3) {
                    if (xLink.href.split('=')[1] !== $('#side_navi a:eq(2)').attr('href').split('=')[1]) {
                        rlink = Create('a');
                        rlink.href = 'nachrichten.php?t=1&id=' + xLink.href.split('=')[1];
                        rlink.innerHTML = '<img src="' + send_image + '" alt="+MSG" />&nbsp;';
                        xLink.parentNode.insertBefore(rlink, xLink);
                    };
                } else {
                    if (xLink.href.split('=')[1] !== $('div.sideInfoPlayer a').attr('href').split('=')[1]) {
                        rlink = Create('a');
                        rlink.href = 'nachrichten.php?t=1&id=' + xLink.href.split('=')[1];
                        rlink.innerHTML = '<img src="' + send_image + '" alt="+MSG" />&nbsp;';
                        xLink.parentNode.insertBefore(rlink, xLink);
                    };
                }
            };
        };
        function mPlace() {
            if (ID('send_select')) {
                var stone = [];
                var getres = new Array();
                var aQcarry = [100, 250, 500, 1000];
                var bAdjMc = true;
                var strMaxC = xpath("//div[@id='build']//p/b|//div[@class='carry']//b").snapshotItem(0);
                var maxC = 0;
                if (strMaxC) {
                    maxC = C(strMaxC.textContent);
                    for (var i = 0; i < aQcarry.length; i++) {
                        if (maxC == aQcarry[i]) {
                            bAdjMc = false; break;
                        };
                    };
                };
                if (bAdjMc) aQcarry = [100, 500, 1000, maxC];
                var resTb = ID('send_select');
                var getMax = xpath("//div[@id='build']//p/b | //div[@class='carry']//b").snapshotItem(0).textContent;
                if (travian3) {
                    var getMer = xpath('//td[@class="mer"] | //table[@class="f10"]//tr//td[@colspan="2"]').snapshotItem(0).textContent.split(' ')[0];
                } else {
                    var getMer = xpath('//td[@class="mer"] |//div[@id="build"]//span[@id="merchantsAvailable"]').snapshotItem(0).textContent;
                }
                var total = C(getMax) * C(getMer);
                if (resTb.rows.length > 4) { resTb.rows[4].style.display = "none"; }
                if (resTb.rows.length > 5) { resTb.rows[5].style.display = "none"; }
                function m100() { for (i = 0; i < 4; i++) { if (C(getMer) == 0) { } else { getres[i] = document.getElementById('l' + (i + 1)).firstChild.nodeValue.split('/')[0]; ID('r' + (i + 1)).value = C(getres[i]); } } }
                function clearTransport() { for (var i = 0; i < 4; i++) { ID('r' + (i + 1)).value = ''; }; };
                function createEventmarketSend(i, q) {
                    return function () {
                        if (travian3) {
                            var aI = document.getElementsByTagName('INPUT')[i + 1];
                        } else {
                            var aI = document.getElementsByTagName('INPUT')[i + 2];
                        }
                        var aV = aI.value;
                        var aS = (aV != '' ? parseInt(aV) : 0);
                        aS += q;
                        if (aS > document.getElementById('l' + (i + 1)).firstChild.nodeValue.split('/')[0]) aS = document.getElementById('l' + (i + 1)).firstChild.nodeValue.split('/')[0];
                        if (aS > total) aS = total;
                        aI.value = aS;
                    };
                };
                function createEventmarketSendAll(q) {
                    return function () {
                        var arrInp = document.getElementsByTagName('INPUT');
                        for (var i = 0; i < 4; i++) {
                            if (travian3) {
                                var aI = arrInp[i + 1];
                            } else {
                                var aI = arrInp[i + 2];
                            }
                            var aV = aI.value;
                            var aS = (aV != '' ? parseInt(aV) : 0);
                            aS += q;
                            if (aS > document.getElementById('l' + (i + 1)).firstChild.nodeValue.split('/')[0]) aS = document.getElementById('l' + (i + 1)).firstChild.nodeValue.split('/')[0];
                            if (aS > total) aS = total;
                            aI.value = aS;
                        };
                    };
                };

                var A = Create('tr');

                var aCell = Create('td');
                aCell.setAttribute('style', 'text-align:center;');
                aCell.setAttribute('colspan', '2');
                aCell.innerHTML = '<img src="img/x.gif" class="r1"><img src="img/x.gif" class="r2"><img src="img/x.gif" class="r3"><img src="img/x.gif" class="r4">';
                A.appendChild(aCell);

                var aCell = Create('td');
                aCell.setAttribute('style', 'text-align:center; vertical-align:middle;');
                var clAllImg = Create('img');
                clAllImg.setAttribute('src', send_imgdel);
                var clAllLink = Create('a');
                clAllLink.setAttribute('href', 'javascript:void(0)');
                clAllLink.addEventListener("click", clearTransport, false);
                clAllLink.appendChild(clAllImg);
                aCell.appendChild(clAllLink);
                A.appendChild(aCell);

                var emptyCell = Create('td');
                A.appendChild(emptyCell);
                //add the quantities links for all res
                for (var i = 0; i < 4; i++) {
                    var uCellA1 = Create('td');
                    uCellA1.setAttribute('style', 'text-align:center;');
                    var useThemLinkA1 = Create('a');
                    useThemLinkA1.setAttribute('style', 'font-size:13px; white-space:nowrap;');
                    useThemLinkA1.setAttribute('href', 'javascript:void(0)');
                    useThemLinkA1.innerHTML = aQcarry[i];
                    useThemLinkA1.addEventListener('click', createEventmarketSendAll(aQcarry[i]), false);
                    uCellA1.appendChild(useThemLinkA1);
                    A.appendChild(uCellA1);
                };

                //add the real ALL resources link (don't know if it really makes sense)
                var uCellA1 = Create('td');
                uCellA1.setAttribute('style', 'text-align:center;');
                var useThemLinkA1 = Create('a');
                useThemLinkA1.setAttribute('href', 'javascript:void(0)')
                useThemLinkA1.addEventListener('click', m100, false);
                var allimg = Create('img');
                allimg.setAttribute('src', send_imgall);
                useThemLinkA1.appendChild(allimg);
                uCellA1.appendChild(useThemLinkA1);
                A.appendChild(uCellA1);

                resTb.appendChild(A);
                for (i = 0; i < 4; i++) { // Add more options such as delete and all.. effect 4 Rows
                    function clearTransportRes(i) { return function () { ID('r' + (i + 1)).value = ''; }; };

                    var aRow = resTb.rows[i];
                    aRow.cells[3].style.display = "none";
                    //clear single resource
                    var s = Create('td');
                    s.setAttribute('style', 'text-align:center; vertical-align:middle;');
                    var delLink = Create('a');
                    delLink.setAttribute('href', 'javascript:void(0)');
                    delLink.addEventListener('click', clearTransportRes(i), false);
                    delimg = Create('img');
                    delimg.setAttribute('src', send_imgdel1);
                    delLink.appendChild(delimg);
                    s.appendChild(delLink);
                    aRow.appendChild(s);

                    //For each new quantity and resource create a new link with the associated request			
                    for (j = 0; j < aQcarry.length; j++) {
                        var s1 = Create('td');
                        s1.setAttribute('style', 'text-align:center; vertical-align:middle;');
                        var xLink = Create('a');
                        xLink.setAttribute('style', 'font-size:13px; white-space:nowrap;');
                        xLink.setAttribute('href', 'javascript:void(0)');
                        xLink.innerHTML = aQcarry[j];
                        xLink.addEventListener('click', createEventmarketSend(i, aQcarry[j]), false);
                        s1.appendChild(xLink);
                        aRow.appendChild(s1);
                    };

                    //add the ALL option to the list of links
                    var xLink = Create('a');
                    xLink.setAttribute('onclick', 'upd_res(' + (i + 1) + ',1); return false;');
                    xLink.setAttribute('href', 'javascript:void(0)');
                    allimg = Create('img');
                    allimg.setAttribute('src', send_imgall);
                    var aCell = Create('td');
                    aCell.setAttribute('style', 'text-align:center; vertical-align:middle;');
                    xLink.appendChild(allimg);
                    aCell.appendChild(xLink);
                    aRow.appendChild(aCell);


                }
                var addoption = xpath('//div[@class="boxes-contents cf"]').snapshotItem(0);
                addoption.innerHTML += ' ' +
       	'<a href="javascript:void(0)" id="x[3]x"><img src="' + send_imgequ + '"></a>' +
       	'<a href="javascript:void(0)" id="x[1]x"><img src="' + send_imgpro + '"></a>' +
       	'<a href="javascript:void(0)" id="x[2]x"><img src="' + send_imghour + '"></a>' +
       	'';
                ID('x[1]x').addEventListener('click', function () { if (C(getMer) == 0) { } else { for (i = 0; i < 4; i++) { ID('r' + (i + 1)).value = Math.ceil(ID('l' + (i + 1)).innerHTML.split('/')[0] / getMax * (getMer * 3)); }; } }, false);
                ID('x[2]x').addEventListener('click', function () { if (C(getMer) == 0) { } else { for (i = 0; i < 4; i++) { ID('r' + (i + 1)).value = Math.max(0, C(pro[i] * 3600)); } } }, false);
                ID('x[3]x').addEventListener('click', function () { if (C(getMer) == 0) { } else { for (i = 0; i < 4; i++) { ID('r' + (i + 1)).value = C(C(total) / 4); } } }, false);
            };
        };
        function ressell() {
            if (xpath('//table[@id="sell"]').snapshotItem(0)) {
                httpRequest('build.php?gid=17' + (travian3 ? '' : '&t=5'), function (ajax) {
                    var A = htmltocontext(ajax.responseText);
                    if (travian3) {
                        var q = C(A.getElementById('build').getElementsByTagName('b')[0].textContent);
                        var mer = xpath('//td[@class="mer"] | //table[@class="f10"]//tr//td[@colspan="2"]').snapshotItem(0).textContent.split(' ')[0];
                    } else {
                        var q = C(A.getElementsByClassName('carry')[0].getElementsByTagName('b')[0].textContent);
                        var mer = xpath('//div[@id="build"]//span[@id="merchantsAvailable"]').snapshotItem(0).textContent;
                    }
                    var total = C(q) * C(mer);
                    function add1(q) {
                        return function () {
                            var aI = xpath('//table[@id="sell"]/tbody/tr[1]/td[1]/input').snapshotItem(0);
                            var aV = aI.value;
                            var aS = (aV != '' ? parseInt(aV) : 0);
                            aS += q;
                            if (aS > total) aS = total;
                            aI.value = aS;
                        };
                    };
                    function add2(q) {
                        return function () {
                            var aI = xpath('//table[@id="sell"]/tbody/tr[2]/td[1]/input').snapshotItem(0);
                            var aV = aI.value;
                            var aS = (aV != '' ? parseInt(aV) : 0);
                            aS += q;
                            if (aS > total) aS = total;
                            aI.value = aS;
                        };
                    };
                    var addser = xpath('//table[@id="sell"]/tbody/tr[1]/td[2]').snapshotItem(0);
                    addser.innerHTML += '<a id="add">&nbsp;&nbsp;&nbsp;+</a>';
                    ID('add').addEventListener('click', add1(q), false);
                    var addser2 = xpath('//table[@id="sell"]/tbody/tr[2]/td[2]').snapshotItem(0);
                    addser2.innerHTML += '<a id="add2">&nbsp;&nbsp;&nbsp;+</a>';
                    ID('add2').addEventListener('click', add2(q), false);
                });
            }
        };
        function send_INFO() {
            var tbl = Create('table');
            tbl.id = 'TBL_INF';
            tbl.setAttribute('cellspacing', '1');
            tbl.bgcolor = 'silver';
            var fix1 = xpath('//div[@id="build"]//span[@id="merchantsAvailable"]').snapshotItem(0).textContent;
            tbl.innerHTML = '<tbody><tr><td>' + fix1 + ':<span id="xMR"></span></td><td><img class="carry" src="img/x.gif">(<span id="TBL_RES">0</span>) -<font id="TBL_RES2">0</font> </td></tr><tr><td> <img src="img/x.gif" class="clock"> (<span id="TBL_TIME">0:00:00:00</span>) </td><td>&lt; <span id="TBL_DIST">0</span> &gt;</td></tr></tbody>';
            $(tbl).insertAfter('form div.destination');
            function accXTBL() {
                var speed = GM_getValue('MySpeed');
                var merchants = merchant_speed;
                function CHK(v) { return (v.toString() == ('NaN' || NaN) ? 0 : v.toString()); };
                var get_Tribe = xpath('//div[@id="side_info"]//img[contains(@class, "nationBig nationBig")]').snapshotItem(0).className.match(/\d/);
                get_Tribe = C(C(get_Tribe) - 1);
                var getMax = xpath("//div[@id='build']//p/b | //div[@class='carry']//b").snapshotItem(0).textContent;
                getMer = xpath('//div[@id="build"]//span[@id="merchantsAvailable"]').snapshotItem(0).textContent;
                var xrs = [ID('r1').value, ID('r2').value, ID('r3').value, ID('r4').value];
                var res = 0;
                var time = 0;
                var dist = 0;
                res = C(C(xrs[0] == '' ? 0 : xrs[0]) + C(xrs[1] == '' ? 0 : xrs[1]) + C(xrs[2] == '' ? 0 : xrs[2]) + C(xrs[3] == '' ? 0 : xrs[3]));
                var GET_X = (ID('xCoordInput').value == ('' || ID('xCoordInput').value.match(/\D/)) ? 0 : ID('xCoordInput').value);
                var GET_Y = (ID('yCoordInput').value == ('' || ID('yCoordInput').value.match(/\D/)) ? 0 : ID('yCoordInput').value);
                var GET_Time = format(Math.round((Distance(ID('xgy').innerHTML, xyToId(GET_X, GET_Y))) / (merchants[get_Tribe]) * 3600));

                ID('TBL_RES').innerHTML = res;
                var setMer = '( ' + C(getMer) + ' / <span>' + C(getMer - Math.ceil(res / getMax)) + '</span> ) --><font>' + Math.ceil(res / getMax) + '</font>';
                ID('xMR').innerHTML = setMer;
                if (ID('xMR').getElementsByTagName('font')[0].innerHTML.match(/\d+/) > getMer) { ID('xMR').getElementsByTagName('font')[0].color = 'red'; } else
                    if (ID('xMR').getElementsByTagName('font')[0].innerHTML == getMer) { ID('xMR').getElementsByTagName('font')[0].color = 'blue'; } else { ID('xMR').getElementsByTagName('font')[0].color = 'green'; };
                ID('TBL_RES2').innerHTML = C(C(ID('xMR').getElementsByTagName('font')[0].innerHTML * getMax) - C(ID('TBL_RES').innerHTML));
                ID('TBL_TIME').innerHTML = GET_Time;
                ID('TBL_DIST').innerHTML = New_Math(Distance(ID('xgy').innerHTML, xyToId(GET_X, GET_Y)).toString() == ('NaN' || NaN) ? 0 : Distance(ID('xgy').innerHTML, xyToId(GET_X, GET_Y)));
            };
            for (i = 0; i < 4; i++) {
                $('#r' + (i + 1)).bind('keyup', accXTBL);
                $('#r' + (i + 1)).bind('change', accXTBL);
            };
            $('#yCoordInput').bind('keyup', accXTBL);
            $('#xCoordInput').bind('keyup', accXTBL);
            $('body').bind('click', accXTBL);
            accXTBL();
        };

        function SBT() {
            function re(r) { return C(ID('l' + r).innerHTML.split('/')[0]); };
            var cl = 'big white g';
            if (CLASS(cl + '19')[0] || CLASS(cl + '20')[0] || CLASS(cl + '21')[0]) {
                if (CLASS('details')[0] && CLASS('tit')[0] && CLASS('details')[0]) {
                    var HTML = '<div class="action" id="CxS"><table cellspacing="0"><tbody>';
                    var xHTML = [];
                    for (i = 0; i < CLASS('tit').length; i++) {
                        var r = [];
                        r[0] = CLASS('buildActionOverview trainUnits')[0].getElementsByClassName('resources r1')[i].innerHTML.split('>')[1];
                        r[1] = CLASS('buildActionOverview trainUnits')[0].getElementsByClassName('resources r2')[i].innerHTML.split('>')[1];
                        r[2] = CLASS('buildActionOverview trainUnits')[0].getElementsByClassName('resources r3')[i].innerHTML.split('>')[1];
                        r[3] = CLASS('buildActionOverview trainUnits')[0].getElementsByClassName('resources r4')[i].innerHTML.split('>')[1];

                        rv = C(C(re('1')) + C(re('2')) + C(re('3')) + C(re('4')));
                        rb = C(C(r[0]) + C(r[1]) + C(r[2]) + C(r[3]));
                        r[5] = C(rv / rb);
                        var DV = Create('div');
                        DV.innerHTML = '<span><img src="img/x.gif" class="npc" />: (' + CLASS('tit')[i].getElementsByTagName('a')[0].innerHTML + r[5] + ')</span>';
                        CLASS('buildActionOverview trainUnits')[0].getElementsByClassName('details')[i].appendChild(DV);
                        var dvx = Create('table');
                        dvx.cellSpacing = '0';
                        dvx.style.width = 'auto';
                        dvx.innerHTML = '' +
'<tr><td><img src="img/x.gif" class="r1" />&nbsp;<span id="XP1_' + i + '">0</span></td>' +
'<td><img src="img/x.gif" class="r2" />&nbsp;<span id="XP2_' + i + '">0</span></td>' +
'<td><img src="img/x.gif" class="r3" />&nbsp;<span id="XP3_' + i + '">0</span></td>' +
'<td><img src="img/x.gif" class="r4" />&nbsp;<span id="XP4_' + i + '">0</span></td></tr><tr>' +
'<td colspan="2" style="text-align: center;"><img src="img/x.gif" class="r5" />&nbsp;<span id="XP6_' + i + '">0</span></td>' +
'<td colspan="2" style="text-align: center;"><img src="img/x.gif" class="clock" />&nbsp;<span id="XP5_' + i + '">00:00:00</span></td>' +
'</tr>';
                        HTML = HTML + '' +
                '<tr>' +
                '<td>' + CLASS('tit')[i].getElementsByTagName('a')[0].innerHTML + '<span id="A' + (i + 1) + '">0</span></td>' +
                '<td><img class="r1" src="img/x.gif"><span id="' + (i + 1) + 'R1">0</span></td>' +
                '<td><img class="r2" src="img/x.gif"><span id="' + (i + 1) + 'R2">0</span></td>' +
                '<td><img class="r3" src="img/x.gif"><span id="' + (i + 1) + 'R3">0</span></td>' +
                '<td><img class="r4" src="img/x.gif"><span id="' + (i + 1) + 'R4">0</span></td>' +
                '<td><img class="r5" src="img/x.gif"><span id="' + (i + 1) + 'R5">0</span></td>' +
                '<td><img class="clock" src="img/x.gif"><span id="' + (i + 1) + 'R6">00:00:00</span></td>' +
                '</tr>';
                        CLASS('buildActionOverview trainUnits')[0].getElementsByClassName('details')[i].appendChild(dvx);
                        var me = CLASS('buildActionOverview trainUnits')[0].getElementsByTagName('input')[i];
                        var ge = CLASS('buildActionOverview trainUnits')[0].getElementsByTagName('input')[i].nextElementSibling.nextElementSibling;
                        $(me).attr('xqr', i);
                        $(ge).attr('xqr', i);
                        $(me).bind('keyup', function () { tChange($(this).attr('xqr')); });
                        $(ge).bind('mousemove', function () { tChange($(this).attr('xqr')); });
                    };
                    $(CLASS('buildActionOverview trainUnits')[0]).append(HTML + '</tbody><tfoot><tr><td style="border-top: 1px solid gray;" colspan="7"></td></tr>' +
            '<tr>' +
            '<td>&nbsp;&nbsp;&nbsp;<span id="x_1">0</span></td>' +
            '<td><img class="r1" src="img/x.gif"><span id="x_2">0</span></td>' +
            '<td><img class="r2" src="img/x.gif"><span id="x_3">0</span></td>' +
            '<td><img class="r3" src="img/x.gif"><span id="x_4">0</span></td>' +
            '<td><img class="r4" src="img/x.gif"><span id="x_5">0</span></td>' +
            '<td><img class="r5" src="img/x.gif"><span id="x_6">0</span></td>' +
            '<td><img class="clock" src="img/x.gif"><span id="x_7">00:00:00</span></td>' +
            '</tr></tfoot></table></div>');
                };
            };
        };
        function Village_Count() {
            if (travian3) {

            } else {
                var Target = ID('villageList').getElementsByTagName('div')[0].getElementsByTagName('a')[0];
                var Count = ID('villageList').getElementsByTagName('div')[1].getElementsByTagName('li').length;
                Target.appendChild(document.createTextNode('(' + Count + '):'));
            }
        };
        function dLinks() {
            for (i = 0; i < $('tbody#tbody_links img').length; i++) {
                if (!$('tbody#tbody_links img:eq(' + (i) + ')').attr('value')) {
                    $('tbody#tbody_links img:eq(' + (i) + ')').bind('click', function () { return deleteLinks('Link[' + this.getAttribute('id').match(/\d+/) + ']'); });
                    $('tbody#tbody_links img:eq(' + (i) + ')').attr('value', i);
                };
            };
            return setTimeout(dLinks, 2000);
        };
        function xSmith() {
            var A = [];
            var B = [];
            var R = [ID('l1').innerHTML.split('/')[0], ID('l2').innerHTML.split('/')[0], ID('l3').innerHTML.split('/')[0], ID('l4').innerHTML.split('/')[0]];
            var X = [];
            var G = [];
            for (i = 0; i < CLASS('build_details researches')[0].getElementsByClassName('research').length; i++) {
                A[i] = CLASS('build_details researches')[0].getElementsByClassName('research')[i];
                B['r1' + i] = A[i].getElementsByClassName('resources r1')[0];
                B['r2' + i] = A[i].getElementsByClassName('resources r2')[0];
                B['r3' + i] = A[i].getElementsByClassName('resources r3')[0];
                B['r4' + i] = A[i].getElementsByClassName('resources r4')[0];
                X['r1x' + i] = C(C(R[0]) - C(B['r1' + i].innerHTML.split('>')[1]));
                X['r2x' + i] = C(C(R[1]) - C(B['r2' + i].innerHTML.split('>')[1]));
                X['r3x' + i] = C(C(R[2]) - C(B['r3' + i].innerHTML.split('>')[1]));
                X['r4x' + i] = C(C(R[3]) - C(B['r4' + i].innerHTML.split('>')[1]));
                G['r1A' + i] = Create('div'); G['r1A' + i].setAttribute('style', 'font-size: 11px;'); G['r1A' + i].innerHTML = '(<font color="' + ((X['r1x' + i] > 0) ? 'green' : 'red') + '">' + X['r1x' + i] + '</font>)'; B['r1' + i].appendChild(G['r1A' + i]);
                G['r2A' + i] = Create('div'); G['r2A' + i].setAttribute('style', 'font-size: 11px;'); G['r2A' + i].innerHTML = '(<font color="' + ((X['r2x' + i] > 0) ? 'green' : 'red') + '">' + X['r2x' + i] + '</font>)'; B['r2' + i].appendChild(G['r2A' + i]);
                G['r3A' + i] = Create('div'); G['r3A' + i].setAttribute('style', 'font-size: 11px;'); G['r3A' + i].innerHTML = '(<font color="' + ((X['r3x' + i] > 0) ? 'green' : 'red') + '">' + X['r3x' + i] + '</font>)'; B['r3' + i].appendChild(G['r3A' + i]);
                G['r4A' + i] = Create('div'); G['r4A' + i].setAttribute('style', 'font-size: 11px;'); G['r4A' + i].innerHTML = '(<font color="' + ((X['r4x' + i] > 0) ? 'green' : 'red') + '">' + X['r4x' + i] + '</font>)'; B['r4' + i].appendChild(G['r4A' + i]);
            };
        };
        function BuildList() {
            function gd(gid) { return 'setTimeout(function(){window.location.href=&apos;build.php?gid=' + gid + '&apos;}, 1001);'; };

            var img = [
'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAACXZwQWcAAAABAAAAAQDHlV/tAAAADUlEQVQI12P4//9/PQAJewN9F4hVxQAAAC56VFh0Y3JlYXRlLWRhdGUAAHjaMzIwNNQ1sNQ1MA0xsLAyMbAyNdU1MLcyMAAAQeMFGW65r+EAAAAuelRYdG1vZGlmeS1kYXRlAAB42jMyMDTUNbDUNTANMbCwMjGwMjXVNTC3MjAAAEHjBRkMgVgeAAAAAElFTkSuQmCC',
'data:image/png;base64,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%3D%3D',
'data:image/png;base64,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%3D',
'data:image/png;base64,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%3D%3D',
'data:image/png;base64,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%3D%3D',
'data:image/png;base64,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%3D%3D',
'data:image/png;base64,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',
            ];

            var Div = Create('div', { align: 'auto', id: 'gList', class: 'mbList' });
            Div.innerHTML = '' +
'<img src="' + img[1] + '" onclick="' + gd(16) + '" /><br><img src="' + img[2] + '" onclick="' + gd(17) + '" /><br><img src="' + img[3] + '" onclick="' + gd(18) + '" />' +
'<br><img src="' + img[4] + '" onclick="' + gd(19) + '" /><br><img src="' + img[5] + '" onclick="' + gd(20) + '" /><br><img src="' + img[6] + '" onclick="' + gd(21) + '" />';

            if (RTL == 'rtl') { Div.style.right = '0px'; } else { Div.style.left = '0px'; };
            Div.style.width = '80px';
            Div.style.height = '490px';
            Div.style.zIndex = '10000';
            document.body.appendChild(Div);
            function Acc_IMG(e) {
                $(e).stop().animate({ "opacity": '0.01' }, 200);
                setTimeout(function () { $(e).stop().animate({ "opacity": '1' }, 200); }, 200);
                setTimeout(function () { $(e).stop().animate({ "opacity": '0' }, 200); }, 250);
                setTimeout(function () { $(e).stop().animate({ "opacity": '1' }, 200); }, 500);
                setTimeout(function () { $(e).stop().animate({ "opacity": '0' }, 200); }, 750);
                setTimeout(function () { $(e).stop().animate({ "opacity": '1' }, 200); }, 1000);
            };
            for (i = 0; i < 6; i++) {
                aIMG = CLASS('mbList')[0].getElementsByTagName('img')[i];
                aIMG.style.opacity = '1';
                aIMG.style.float = (RTL == "rtl" ? 'right' : 'left');
                $(aIMG).hover(
        function () { $(this).stop().animate({ "opacity": "0.75", 'width': '100px', 'height': '100px' }, "fast"); },
        function () { $(this).stop().animate({ "opacity": "1", 'width': '80px', 'height': '80px' }, "medium"); }
        );
                $(aIMG).bind('click', function () { Acc_IMG(this); });
            };
        };

        function gMouseOver() {
            var imgList = xpath("//div[@id='content']//img[contains(@class, 'unit u')][ not(@class='unit uhero')]");
            for (var i = 0; i < imgList.snapshotLength; i++) {
                if (imgList.snapshotItem(i).getAttribute('value')); else
                    if (!imgList.snapshotItem(i).getAttribute('value')) {
                        $(imgList.snapshotItem(i)).hover(function () { hMove(this.className.split(' u')[1]); }, function () { $('#T4_mHelp').fadeOut(333); });
                        imgList.snapshotItem(i).setAttribute('value', "0");
                    };
            };
            setTimeout(gMouseOver, 4000);
        };
        // start by Dream1
        function post_rep(data) {
            $.ajax({
                type: "POST",
                url: "http://travian-reports.net/convert",
                headers: { 'Content-type': 'application/x-www-form-urlencoded' },
                data: encodeURI(data),
                success: function (msg) {
                    $("#rep_link").val($(msg).find("#link").val());
                }
            });
        }
        function save_battle_report(rep) {
            var adat = 'report=' + rep + '&step1=Save report&design=1';
            post_rep(adat);
        }
        if (document.location.href.split('/')[3].split('?id=')[1] && xpath("//td[@class='report_content']/table[2]/tbody[@class='units']").snapshotItem(0) && ID('attacker')) {
            $("#report_surround").before('<button id="sub_report" name="sub_report" value="' + SubLanguage(LanguagePack(), 45) + '" type="submit"><div class="button-container"><div class="button-position"><div class="btl"><div class="btr"><div class="btc"></div></div></div><div class="bml"><div class="bmr"><div class="bmc"></div></div></div><div class="bbl"><div class="bbr"><div class="bbc"></div></div></div></div><div class="button-contents">' + SubLanguage(LanguagePack(), 45) + '</div></div></button></br><input type="text" id="rep_link" value="' + SubLanguage(LanguagePack(), 46) + '" style="width:100%; margin-top:5px; margin-bottom:5px;"/>');
            $("#rep_link").bind('focus', function () { this.select(); });
            $("#sub_report").bind('click', function () {
                var re = $('#report_surround').clone(true);
                $('#report_surround td').prepend('	');
                $('#report_surround tr').prepend('\n');
                $('#report_surround div').append('\n').prepend('	');
                $('#report_surround img').each(function (i, el) {
                    $(this).parent().prepend($(this).attr('alt'));
                    $(this).remove();
                });
                $('#report_surround tbody:eq(0) tr:eq(0) td:eq(0) table:eq(0) tbody:eq(2) tr:eq(1)').remove();
                $('#report_surround tbody:eq(0) tr:eq(0) td:eq(0) table:eq(1) tbody:eq(2) tr:eq(1)').remove();
                var text = $('#report_surround').text();
                save_battle_report(text);
                $('#report_surround').html(re.html());
            });
        }

        function Select() {
            if (exp(/berichte\b[^>]*php/) || exp(/nachrichten\b[^>]*php/)) {
                if (TAG('form')[0] && TAG('form')[0].getElementsByClassName('paginator')[0] || TAG('form')[0].getElementsByClassName('row_table_data')[0]) {
                    if (xpath('//table[@id="overview"]/tbody//td[@class="noData"] | //table[@id="overview"]/tbody//td[@class="none"] | //div[@class="checkAll"] | //div[@id="markAll"]').snapshotItem(0)) { } else {
                        if (travian3) {
                            var selectd = document.getElementsByTagName('tfoot')[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[0];
                            selectd.innerHTML = '<input class="check" id="s10" name="s10" onclick="Allmsg(this.form);" type="checkbox">';
                        } else {
                            var selectd = document.getElementsByTagName('form')[0].getElementsByClassName('paginator')[0];
                            var selectd2 = document.createElement('span');
                            var selectdd = document.createElement('div');
                            selectdd.id = 'markAll';
                            selectd2.innerHTML = '<label for="sAll"> ' + SubLanguage(LanguagePack(), 40) + '</label>';
                            selectdd.innerHTML = '<input class="check" type="checkbox" id="sAll" name="sAll" onclick="$(this).up(\'form\').getElements(\'input[type=checkbox]\').each(function(element){element.checked=this.checked;},this);"/>';
                            selectdd.appendChild(selectd2);
                            selectd.parentNode.insertBefore(selectdd, selectd);
                        }
                    }
                }
            }
        };

        function createVillageList(dlr1) {
            dlr1.style.position = "relative";
            var list = Create('a', { href: 'dorf3.php' });
            list.innerHTML = '<span class="f10 c0 s7 b">القرى:</span>';
            dlr1.insertBefore(list, dlr1.firstChild);
            var tablelist = Create('table', { class: 'f10' });
            var tbody = Create('tbody');
            tablelist.appendChild(tbody);
            var tr = Create('tr');
            tbody.appendChild(tr);
            var td = Create('td', { class: 'nbr' });
            td.innerHTML = '<span class="c2">&#8226;</span>&nbsp;&nbsp;';
            tr.appendChild(td);
            var bLink = Create('a', { class: 'active_vl', href: '?newdid=0' });
            bLink.innerHTML = GM_getValue("mainVillage");
            td.appendChild(bLink);
            var bCell = Create('td', { class: 'right' });
            tr.appendChild(bCell);
            $(tablelist).insertAfter(list);

        }
        var dlr1 = ID('side_info');
        var vTable = ID('vlist');
        if (travian3) { if (!vTable) vTable = createVillageList(dlr1); } else { }
        // end by Dream1

        function MyLinks() {
            var urlBase = location.href.split('/')[1];
            var target = ID("side_info");
            var uxLinks = [];
            var x = getPosition('dreambox', '100px_200px').split('_')[1];
            var y = getPosition('dreambox', '100px_200px').split('_')[0];
            var div = Create('div', { style: 'position: absolute; top: ' + y + '; left: ' + x + '; width: 200px; z-index: 10000;' });
            div.id = "dreambox";
            var tbl = Create("table", { cellspacing: '0', cellpadding: '1', id: 'llist' });

            var tblHead = Create("thead");
            var tblBody = Create("tbody");
            tblBody.id = 'tbody_links';
            if (GM_getValue('My_T4Links')) { links = eval(GM_getValue('My_T4Links')); } else { GM_setValue('My_T4Links', '[]'); links = eval(GM_getValue('My_T4Links')); };
            tblBody.innerHTML = '';
            if (links[0]) {
                for (c = 0; c < links.length; c++) {
                    uxLinks[c] = eval(links[c]);
                    tblBody.innerHTML += '<tr id="Link[' + c + ']"><td width="10%">&nbsp;<img style="cursor: pointer;" id="delete_Link[' + c + ']" class="del" src="img/x.gif"></td><td style="font-size: 11.5px; color: black;"><a href="' + uxLinks[c][1] + '">' + uxLinks[c][0] + '</a></td></tr>';
                };
            } else { uxLinks = ''; };
            var row = Create("tr");
            MakeDrag(row, div);
            var cell = Create("td", { colspan: '2' });
            cell.innerHTML = '<h1><span style="float: ' + (RTL == "rtl" ? "left" : "right") + ';"><img class="4close" src="' + CloseAIMG + '" /></span><b>' + SubLanguage(LanguagePack(), 7) + '</b>(<a href="javascript:void(0)" id="T4_AddNewLink" style="color: red;"><i>' + SubLanguage(LanguagePack(), 8) + '</i></a>):</h1>';
            row.appendChild(cell);
            tblHead.appendChild(row);
            tbl.appendChild(tblHead);
            tbl.appendChild(tblBody);
            div.appendChild(tbl);
            document.body.appendChild(div);
            $('#dreambox img.4close').bind('click', function () { $('#dreambox').fadeOut(1000, function () { $('#dreambox').remove(); GM_setValue('setting[7]', 'false'); }); });
            $('a#T4_AddNewLink').bind('click', AddNewLink);
            $('#tbody_links a').hover(function () { $(this).stop().animate({ "color": "blue", "font-size": "14px" }, "fast"); }, function () { $(this).stop().animate({ "color": "black", "font-size": "11.5px" }, "fast") });
        };

        if (!GM_getValue('t4_setup_setting') && (!exp(/spieler.php/))) {
            if (travian3) {
                window.location.href = location.protocol + '//' + location.hostname + '/spieler.php?uid=' + $('#side_navi p:eq(0) a:eq(2)').attr('href').split('=')[1];
            } else {
                window.location.href = location.protocol + '//' + location.hostname + '/spieler.php?uid=' + $('#side_info .sideInfoPlayer a').attr('href').split('=')[1];
            }
        };
        if (exp(/spieler.php/) && (!GM_getValue('t4_setup_setting'))) {
            if (travian3) {
                var race = $('.details tbody:eq(0) tr:eq(1) th:eq(0)').html();
                var Aly = $('.details tbody:eq(0) tr:eq(2) th:eq(0)').html();
                GM_setValue('mainVillage', FindBefore(CLASS('none3')[0]).innerHTML);
            } else {
                var race = $('#details tbody:eq(0) tr:eq(1) th:eq(0)').html();
                var Aly = $('#details tbody:eq(0) tr:eq(2) th:eq(0)').html();
                GM_setValue('mainVillage', FindBefore(CLASS('mainVillage')[0]).innerHTML);
            }
            GM_setValue('t4_setup_setting', race + '|' + Aly);
            setting();
        };
        var host = location.href.split(location.hostname + '/')[1];
        if (xpath('//span[@class="mainVillage"]').snapshotItem(0) && window.location.href.split('=')[1] == $('#side_info .sideInfoPlayer a').attr('href').split('=')[1]) { GM_setValue('mainVillage', FindBefore(CLASS('mainVillage')[0]).innerHTML); };
        if (travian3 && xpath('//span[@class="none3"]').snapshotItem(0) && window.location.href.split('=')[1] == $('#side_navi p:eq(0) a:eq(2)').attr('href').split('=')[1]) {
            GM_setValue('mainVillage', FindBefore(CLASS('none3')[0]).innerHTML);
            var Nameplayer = document.getElementById('profile').getElementsByTagName('tr')[0].getElementsByTagName('th')[0].textContent.split(' ')[1];
            var qq = xpath('//td[@class="details"]//tbody/tr[2]/td').snapshotItem(0).textContent;
            var qq1 = document.getElementsByClassName('details')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[2].getElementsByTagName('td')[0].textContent;
            GM_setValue('qq1', qq1);
            GM_setValue('qq', qq);
            GM_setValue('NameOfPlayer', Nameplayer);
        };

        $(ID('xCoordInput')).bind('keyup', AttackDist);
        $(ID('yCoordInput')).bind('keyup', AttackDist);
        $(document).bind('mousemove', showHelp_move);
        $(window).bind('mouseout', function () { sHide(); });
        $(document).bind('mouseout', function () { sHide(); });
        $('b[id*="is.ver"]').parent().find('u').html(FromHex('05403405006c075073'));

        if (GM_getValue('setting[17]') == 'true') { centerNumber(); };
        space();
        ReTime();
        setup();
        showTHelp();
        mFullView();
        ResColor();
        MyVid();
        favThis();
        ressell();
        AllyCalculation(); // <--- by Dream1
        setTimeout(getQuick_RM, 100);
        Resmarketall(); // <--- by Dream1
        setTimeout(Map_Check, 250);
        xbt();
        getHeroHealth();
        calcuationttroop();
        timem();
        qRep();
        TimeUp();
        vACC_INFO();
        silver_info();
        if (/build/.test(window.location.href)) { cultureCalc(); };
        if (ID('mapContainer') && exp(/karte.php/)) { setTimeout(function () { help_fun(); ViewCropFind(); ViewElphFind(); }, 1000); };
        if (ID('side_info')) { Village_Count(); };
        if (ID('mtop')) { AddUpdate(); };
        if (CLASS('building big white g13')[0] && CLASS('build_details researches')[0]) { xSmith(); };
        if (exp(/berichte.php\b[^>]id=\d/)) { ReportX(); };
        if (exp(/dorf1/) && ID('production') && ID('troops')) { try { dorfA(); } catch (e) { }; };
        if (exp(/tt\=2/) && ID('btn_ok')) { setTimeout(function () { AttackDist(); }, 1000); };
        if (ID('build_value')) { building_increase(); };
        if (CLASS('clock')[0] && CLASS('clock')[0].parentNode.className == 'clocks') { building_end_time(); }
        if (GM_getValue('setting[1]') == 'true') { Resource_Needed(); };
        if (GM_getValue('setting[2]') == 'true') { BuildingView(); };
        if (GM_getValue('setting[4]') == 'true') { ViewRep(); };
        if (GM_getValue('setting[5]') == 'true') { ViewMessege(); };
        if (GM_getValue('setting[6]') == 'true') { SBT(); };
        if (GM_getValue('setting[7]') == 'true') { MyLinks(); dLinks(); };
        if (GM_getValue('setting[8]') == 'true') { ResourcePlusTimer(); };
        if (GM_getValue('setting[9]') == 'true') { ResourcePercent(); };
        if (GM_getValue('setting[10]') == 'true') { ResourcePrud(); };
        if (GM_getValue('setting[11]') == 'true') { BuildList(); };
        if (GM_getValue('setting[12]') == 'true') { Show_Help_Links(); };
        if (GM_getValue('setting[13]') == 'true') { qSendMsg(); };
        if (GM_getValue('setting[14]') == 'true' && ID('btn_ok') && ID('troops')) { AttackInfo(); };
        if (GM_getValue('setting[15]') == 'true') { qSendIcons(); };
        if (GM_getValue('setting[16]') == 'true') { Select(); }; // add by Dream1
        if (GM_getValue('setting[18]') == 'true') { if (ID('send_select')) { mPlace(); }; };
        if (GM_getValue('setting[19]') == 'true') { if (ID('send_select')) { send_INFO(); }; };
        if (GM_getValue('setting[20]') == 'true') { accessToAlly(); };
        if (GM_getValue('setting[21]') == 'true') { gMouseOver(); };
        if (GM_getValue('setting[22]') == 'true') { resbar(); };
        if (GM_getValue('setting[23]') == 'true') { if (exp(/dorf1/) && ID('production') && ID('troops')) { VillageMap(); } };
        village_states();
        Count_Down_Timer();
        if (host == 'dorf3.php' || host == 'dorf3.php?s=0' || location.href.match(/dorf3.php\b[^>]newdid=\d+/) && ID('overview')) { VillageOverView(); };
        $('img.4show').hover(function () { this.src = MaxBIMG; }, function () { this.src = MaxAIMG; });
        $('img.4hide').hover(function () { this.src = MinBIMG; }, function () { this.src = MinAIMG; });
        $('img.4close').hover(function () { this.src = CloseBIMG; }, function () { this.src = CloseAIMG; });
        $('img.4show').css('cursor', 'pointer');
        $('img.4hide').css('cursor', 'pointer');
        $('img.4close').css('cursor', 'pointer');
        $('img.4close').css('float', (RTL == "rtl" ? "left" : "right"));
    };

    function backupStart() {
        if (notRunYet) {
            var l4 = document.getElementById('l4');
            if (l4) allInOneOpera();
            else setTimeout(backupStart, 500);
        }
    };

    var notRunYet = true;
    if (/khtml/i.test(navigator.appVersion)) allInOneOpera();
    else if (window.addEventListener) window.addEventListener("load", function () { if (notRunYet) allInOneOpera(); }, false);
    setTimeout(backupStart, 500);

})();