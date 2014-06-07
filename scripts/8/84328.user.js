// ==UserScript==
// @name           Facebook Gift Link Creator
// @namespace      Facebook Gift Link Creator
// @description    Creates for every gift a link on the top of the facebook request page. You are now able to open that link into a new tab in your browser. So you are much faster to open more gifts and the page doesn't need to reload each time.
// @include        http://www.facebook.com*
// @include        https://www.facebook.com*
// @require        http://sizzlemctwizzle.com/updater.php?id=84328&uso&days=1
// @require        http://userscripts.org/scripts/source/49700.user.js
// @version        2.10b
// ==/UserScript==

/////////////////////////////////////////////////////////////
// Do not change anything of this code without permission. //
// Script copyright 2010-2011 by DragonByte                //
/////////////////////////////////////////////////////////////

// For better Chrome and JQuery support //
/*!
jQuery JavaScript Library v1.4.4
http://jquery.com/
 
Copyright 2010, John Resig
Dual licensed under the MIT or GPL Version 2 licenses.
http://jquery.org/license
 
Includes Sizzle.js
http://sizzlejs.com/
Copyright 2010, The Dojo Foundation
Released under the MIT, BSD, and GPL Licenses.
 
Date: Thu Nov 11 19:04:53 2010 -0500
*/
(function (window, undefined) {
    var document = window.document; var jQuery = (function () { var jQuery = function (selector, context) { return new jQuery.fn.init(selector, context); }, _jQuery = window.jQuery, _$ = window.$, rootjQuery, quickExpr = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/, isSimple = /^.[^:#\[\.,]*$/, rnotwhite = /\S/, rwhite = /\s/, trimLeft = /^\s+/, trimRight = /\s+$/, rnonword = /\W/, rdigit = /\d/, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, rvalidchars = /^[\],:{}\s]*$/, rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g, rwebkit = /(webkit)[ \/]([\w.]+)/, ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/, rmsie = /(msie) ([\w.]+)/, rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/, userAgent = navigator.userAgent, browserMatch, readyBound = false, readyList = [], DOMContentLoaded, toString = Object.prototype.toString, hasOwn = Object.prototype.hasOwnProperty, push = Array.prototype.push, slice = Array.prototype.slice, trim = String.prototype.trim, indexOf = Array.prototype.indexOf, class2type = {}; jQuery.fn = jQuery.prototype = { init: function (selector, context) { var match, elem, ret, doc; if (!selector) { return this; } if (selector.nodeType) { this.context = this[0] = selector; this.length = 1; return this; } if (selector === "body" && !context && document.body) { this.context = document; this[0] = document.body; this.selector = "body"; this.length = 1; return this; } if (typeof selector === "string") { match = quickExpr.exec(selector); if (match && (match[1] || !context)) { if (match[1]) { doc = (context ? context.ownerDocument || context : document); ret = rsingleTag.exec(selector); if (ret) { if (jQuery.isPlainObject(context)) { selector = [document.createElement(ret[1])]; jQuery.fn.attr.call(selector, context, true); } else { selector = [doc.createElement(ret[1])]; } } else { ret = jQuery.buildFragment([match[1]], [doc]); selector = (ret.cacheable ? ret.fragment.cloneNode(true) : ret.fragment).childNodes; } return jQuery.merge(this, selector); } else { elem = document.getElementById(match[2]); if (elem && elem.parentNode) { if (elem.id !== match[2]) { return rootjQuery.find(selector); } this.length = 1; this[0] = elem; } this.context = document; this.selector = selector; return this; } } else if (!context && !rnonword.test(selector)) { this.selector = selector; this.context = document; selector = document.getElementsByTagName(selector); return jQuery.merge(this, selector); } else if (!context || context.jquery) { return (context || rootjQuery).find(selector); } else { return jQuery(context).find(selector); } } else if (jQuery.isFunction(selector)) { return rootjQuery.ready(selector); } if (selector.selector !== undefined) { this.selector = selector.selector; this.context = selector.context; } return jQuery.makeArray(selector, this); }, selector: "", jquery: "1.4.4", length: 0, size: function () { return this.length; }, toArray: function () { return slice.call(this, 0); }, get: function (num) { return num == null ? this.toArray() : (num < 0 ? this.slice(num)[0] : this[num]); }, pushStack: function (elems, name, selector) { var ret = jQuery(); if (jQuery.isArray(elems)) { push.apply(ret, elems); } else { jQuery.merge(ret, elems); } ret.prevObject = this; ret.context = this.context; if (name === "find") { ret.selector = this.selector + (this.selector ? " " : "") + selector; } else if (name) { ret.selector = this.selector + "." + name + "(" + selector + ")"; } return ret; }, each: function (callback, args) { return jQuery.each(this, callback, args); }, ready: function (fn) { jQuery.bindReady(); if (jQuery.isReady) { fn.call(document, jQuery); } else if (readyList) { readyList.push(fn); } return this; }, eq: function (i) { return i === -1 ? this.slice(i) : this.slice(i, +i + 1); }, first: function () { return this.eq(0); }, last: function () { return this.eq(-1); }, slice: function () { return this.pushStack(slice.apply(this, arguments), "slice", slice.call(arguments).join(",")); }, map: function (callback) { return this.pushStack(jQuery.map(this, function (elem, i) { return callback.call(elem, i, elem); })); }, end: function () { return this.prevObject || jQuery(null); }, push: push, sort: [].sort, splice: [].splice }; jQuery.fn.init.prototype = jQuery.fn; jQuery.extend = jQuery.fn.extend = function () { var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false; if (typeof target === "boolean") { deep = target; target = arguments[1] || {}; i = 2; } if (typeof target !== "object" && !jQuery.isFunction(target)) { target = {}; } if (length === i) { target = this; --i; } for (; i < length; i++) { if ((options = arguments[i]) != null) { for (name in options) { src = target[name]; copy = options[name]; if (target === copy) { continue; } if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) { if (copyIsArray) { copyIsArray = false; clone = src && jQuery.isArray(src) ? src : []; } else { clone = src && jQuery.isPlainObject(src) ? src : {}; } target[name] = jQuery.extend(deep, clone, copy); } else if (copy !== undefined) { target[name] = copy; } } } } return target; }; jQuery.extend({ noConflict: function (deep) { window.$ = _$; if (deep) { window.jQuery = _jQuery; } return jQuery; }, isReady: false, readyWait: 1, ready: function (wait) { if (wait === true) { jQuery.readyWait--; } if (!jQuery.readyWait || (wait !== true && !jQuery.isReady)) { if (!document.body) { return setTimeout(jQuery.ready, 1); } jQuery.isReady = true; if (wait !== true && --jQuery.readyWait > 0) { return; } if (readyList) { var fn, i = 0, ready = readyList; readyList = null; while ((fn = ready[i++])) { fn.call(document, jQuery); } if (jQuery.fn.trigger) { jQuery(document).trigger("ready").unbind("ready"); } } } }, bindReady: function () { if (readyBound) { return; } readyBound = true; if (document.readyState === "complete") { return setTimeout(jQuery.ready, 1); } if (document.addEventListener) { document.addEventListener("DOMContentLoaded", DOMContentLoaded, false); window.addEventListener("load", jQuery.ready, false); } else if (document.attachEvent) { document.attachEvent("onreadystatechange", DOMContentLoaded); window.attachEvent("onload", jQuery.ready); var toplevel = false; try { toplevel = window.frameElement == null; } catch (e) { } if (document.documentElement.doScroll && toplevel) { doScrollCheck(); } } }, isFunction: function (obj) { return jQuery.type(obj) === "function"; }, isArray: Array.isArray || function (obj) { return jQuery.type(obj) === "array"; }, isWindow: function (obj) { return obj && typeof obj === "object" && "setInterval" in obj; }, isNaN: function (obj) { return obj == null || !rdigit.test(obj) || isNaN(obj); }, type: function (obj) { return obj == null ? String(obj) : class2type[toString.call(obj)] || "object"; }, isPlainObject: function (obj) { if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) { return false; } if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) { return false; } var key; for (key in obj) { } return key === undefined || hasOwn.call(obj, key); }, isEmptyObject: function (obj) { for (var name in obj) { if (hasOwnProperty.call(obj, name)) { return false; } } return true; }, error: function (msg) { throw msg; }, parseJSON: function (data) { if (typeof data !== "string" || !data) { return null; } data = jQuery.trim(data); if (rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) { return window.JSON && window.JSON.parse ? window.JSON.parse(data) : (new Function("return " + data))(); } else { jQuery.error("Invalid JSON: " + data); } }, noop: function () { }, globalEval: function (data) { if (data && rnotwhite.test(data)) { var head = document.getElementsByTagName("head")[0] || document.documentElement, script = document.createElement("script"); script.type = "text/javascript"; if (jQuery.support.scriptEval) { script.appendChild(document.createTextNode(data)); } else { script.text = data; } head.insertBefore(script, head.firstChild); head.removeChild(script); } }, nodeName: function (elem, name) { return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase(); }, each: function (object, callback, args) { var name, i = 0, length = object.length, isObj = length === undefined || jQuery.isFunction(object); if (args) { if (isObj) { for (name in object) { if (callback.apply(object[name], args) === false) { break; } } } else { for (; i < length; ) { if (callback.apply(object[i++], args) === false) { break; } } } } else { if (isObj) { for (name in object) { if (callback.call(object[name], name, object[name]) === false) { break; } } } else { for (var value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) { } } } return object; }, trim: trim ? function (text) { return text == null ? "" : trim.call(text); } : function (text) { return text == null ? "" : text.toString().replace(trimLeft, "").replace(trimRight, ""); }, makeArray: function (array, results) { var ret = results || []; if (array != null) { var type = jQuery.type(array); if (array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow(array)) { push.call(ret, array); } else { jQuery.merge(ret, array); } } return ret; }, inArray: function (elem, array) { if (array.indexOf) { return array.indexOf(elem); } for (var i = 0, length = array.length; i < length; i++) { if (array[i] === elem) { return i; } } return -1; }, merge: function (first, second) { var i = first.length, j = 0; if (typeof second.length === "number") { for (var l = second.length; j < l; j++) { first[i++] = second[j]; } } else { while (second[j] !== undefined) { first[i++] = second[j++]; } } first.length = i; return first; }, grep: function (elems, callback, inv) { var ret = [], retVal; inv = !!inv; for (var i = 0, length = elems.length; i < length; i++) { retVal = !!callback(elems[i], i); if (inv !== retVal) { ret.push(elems[i]); } } return ret; }, map: function (elems, callback, arg) { var ret = [], value; for (var i = 0, length = elems.length; i < length; i++) { value = callback(elems[i], i, arg); if (value != null) { ret[ret.length] = value; } } return ret.concat.apply([], ret); }, guid: 1, proxy: function (fn, proxy, thisObject) { if (arguments.length === 2) { if (typeof proxy === "string") { thisObject = fn; fn = thisObject[proxy]; proxy = undefined; } else if (proxy && !jQuery.isFunction(proxy)) { thisObject = proxy; proxy = undefined; } } if (!proxy && fn) { proxy = function () { return fn.apply(thisObject || this, arguments); }; } if (fn) { proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++; } return proxy; }, access: function (elems, key, value, exec, fn, pass) { var length = elems.length; if (typeof key === "object") { for (var k in key) { jQuery.access(elems, k, key[k], exec, fn, value); } return elems; } if (value !== undefined) { exec = !pass && exec && jQuery.isFunction(value); for (var i = 0; i < length; i++) { fn(elems[i], key, exec ? value.call(elems[i], i, fn(elems[i], key)) : value, pass); } return elems; } return length ? fn(elems[0], key) : undefined; }, now: function () { return (new Date()).getTime(); }, uaMatch: function (ua) { ua = ua.toLowerCase(); var match = rwebkit.exec(ua) || ropera.exec(ua) || rmsie.exec(ua) || ua.indexOf("compatible") < 0 && rmozilla.exec(ua) || []; return { browser: match[1] || "", version: match[2] || "0" }; }, browser: {} }); jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (i, name) { class2type["[object " + name + "]"] = name.toLowerCase(); }); browserMatch = jQuery.uaMatch(userAgent); if (browserMatch.browser) { jQuery.browser[browserMatch.browser] = true; jQuery.browser.version = browserMatch.version; } if (jQuery.browser.webkit) { jQuery.browser.safari = true; } if (indexOf) { jQuery.inArray = function (elem, array) { return indexOf.call(array, elem); }; } if (!rwhite.test("\xA0")) { trimLeft = /^[\s\xA0]+/; trimRight = /[\s\xA0]+$/; } rootjQuery = jQuery(document); if (document.addEventListener) { DOMContentLoaded = function () { document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false); jQuery.ready(); }; } else if (document.attachEvent) { DOMContentLoaded = function () { if (document.readyState === "complete") { document.detachEvent("onreadystatechange", DOMContentLoaded); jQuery.ready(); } }; } function doScrollCheck() { if (jQuery.isReady) { return; } try { document.documentElement.doScroll("left"); } catch (e) { setTimeout(doScrollCheck, 1); return; } jQuery.ready(); } return (window.jQuery = window.$ = jQuery); })(); (function () { jQuery.support = {}; var root = document.documentElement, script = document.createElement("script"), div = document.createElement("div"), id = "script" + jQuery.now(); div.style.display = "none"; div.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>"; var all = div.getElementsByTagName("*"), a = div.getElementsByTagName("a")[0], select = document.createElement("select"), opt = select.appendChild(document.createElement("option")); if (!all || !all.length || !a) { return; } jQuery.support = { leadingWhitespace: div.firstChild.nodeType === 3, tbody: !div.getElementsByTagName("tbody").length, htmlSerialize: !!div.getElementsByTagName("link").length, style: /red/.test(a.getAttribute("style")), hrefNormalized: a.getAttribute("href") === "/a", opacity: /^0.55$/.test(a.style.opacity), cssFloat: !!a.style.cssFloat, checkOn: div.getElementsByTagName("input")[0].value === "on", optSelected: opt.selected, deleteExpando: true, optDisabled: false, checkClone: false, scriptEval: false, noCloneEvent: true, boxModel: null, inlineBlockNeedsLayout: false, shrinkWrapBlocks: false, reliableHiddenOffsets: true }; select.disabled = true; jQuery.support.optDisabled = !opt.disabled; script.type = "text/javascript"; try { script.appendChild(document.createTextNode("window." + id + "=1;")); } catch (e) { } root.insertBefore(script, root.firstChild); if (window[id]) { jQuery.support.scriptEval = true; delete window[id]; } try { delete script.test; } catch (e) { jQuery.support.deleteExpando = false; } root.removeChild(script); if (div.attachEvent && div.fireEvent) { div.attachEvent("onclick", function click() { jQuery.support.noCloneEvent = false; div.detachEvent("onclick", click); }); div.cloneNode(true).fireEvent("onclick"); } div = document.createElement("div"); div.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>"; var fragment = document.createDocumentFragment(); fragment.appendChild(div.firstChild); jQuery.support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked; jQuery(function () { var div = document.createElement("div"); div.style.width = div.style.paddingLeft = "1px"; document.body.appendChild(div); jQuery.boxModel = jQuery.support.boxModel = div.offsetWidth === 2; if ("zoom" in div.style) { div.style.display = "inline"; div.style.zoom = 1; jQuery.support.inlineBlockNeedsLayout = div.offsetWidth === 2; div.style.display = ""; div.innerHTML = "<div style='width:4px;'></div>"; jQuery.support.shrinkWrapBlocks = div.offsetWidth !== 2; } div.innerHTML = "<table><tr><td style='padding:0;display:none'></td><td>t</td></tr></table>"; var tds = div.getElementsByTagName("td"); jQuery.support.reliableHiddenOffsets = tds[0].offsetHeight === 0; tds[0].style.display = ""; tds[1].style.display = "none"; jQuery.support.reliableHiddenOffsets = jQuery.support.reliableHiddenOffsets && tds[0].offsetHeight === 0; div.innerHTML = ""; document.body.removeChild(div).style.display = "none"; div = tds = null; }); var eventSupported = function (eventName) { var el = document.createElement("div"); eventName = "on" + eventName; var isSupported = false; for (var i = 0; i < 2; i++) { try { isSupported = (eventName in el); if (!isSupported) { el.setAttribute(eventName, "return;"); isSupported = typeof el[eventName] === "function"; } el = null; return isSupported; } catch (e) { if (!(el = el.wrappedJSObject)) { return false; } } } }; jQuery.support.submitBubbles = eventSupported("submit"); jQuery.support.changeBubbles = eventSupported("change"); root = script = div = all = a = null; })(); var windowData = {}, rbrace = /^(?:\{.*\}|\[.*\])$/; jQuery.extend({ cache: {}, uuid: 0, expando: "jQuery" + jQuery.now(), noData: { "embed": true, "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", "applet": true }, data: function (elem, name, data) { if (!jQuery.acceptData(elem)) { return; } elem = elem == window ? windowData : elem; var isNode = elem.nodeType, id = isNode ? elem[jQuery.expando] : null, cache = jQuery.cache, thisCache; if (isNode && !id && typeof name === "string" && data === undefined) { return; } if (!isNode) { cache = elem; } else if (!id) { elem[jQuery.expando] = id = ++jQuery.uuid; } if (typeof name === "object") { if (isNode) { cache[id] = jQuery.extend(cache[id], name); } else { jQuery.extend(cache, name); } } else if (isNode && !cache[id]) { cache[id] = {}; } thisCache = isNode ? cache[id] : cache; if (data !== undefined) { thisCache[name] = data; } return typeof name === "string" ? thisCache[name] : thisCache; }, removeData: function (elem, name) { if (!jQuery.acceptData(elem)) { return; } elem = elem == window ? windowData : elem; var isNode = elem.nodeType, id = isNode ? elem[jQuery.expando] : elem, cache = jQuery.cache, thisCache = isNode ? cache[id] : id; if (name) { if (thisCache) { delete thisCache[name]; if (isNode && jQuery.isEmptyObject(thisCache)) { jQuery.removeData(elem); } } } else { if (isNode && jQuery.support.deleteExpando) { delete elem[jQuery.expando]; } else if (elem.removeAttribute) { elem.removeAttribute(jQuery.expando); } else if (isNode) { delete cache[id]; } else { for (var n in elem) { delete elem[n]; } } } }, acceptData: function (elem) { if (elem.nodeName) { var match = jQuery.noData[elem.nodeName.toLowerCase()]; if (match) { return !(match === true || elem.getAttribute("classid") !== match); } } return true; } }); jQuery.fn.extend({ data: function (key, value) { var data = null; if (typeof key === "undefined") { if (this.length) { var attr = this[0].attributes, name; data = jQuery.data(this[0]); for (var i = 0, l = attr.length; i < l; i++) { name = attr[i].name; if (name.indexOf("data-") === 0) { name = name.substr(5); dataAttr(this[0], name, data[name]); } } } return data; } else if (typeof key === "object") { return this.each(function () { jQuery.data(this, key); }); } var parts = key.split("."); parts[1] = parts[1] ? "." + parts[1] : ""; if (value === undefined) { data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]); if (data === undefined && this.length) { data = jQuery.data(this[0], key); data = dataAttr(this[0], key, data); } return data === undefined && parts[1] ? this.data(parts[0]) : data; } else { return this.each(function () { var $this = jQuery(this), args = [parts[0], value]; $this.triggerHandler("setData" + parts[1] + "!", args); jQuery.data(this, key, value); $this.triggerHandler("changeData" + parts[1] + "!", args); }); } }, removeData: function (key) { return this.each(function () { jQuery.removeData(this, key); }); } }); function dataAttr(elem, key, data) { if (data === undefined && elem.nodeType === 1) { data = elem.getAttribute("data-" + key); if (typeof data === "string") { try { data = data === "true" ? true : data === "false" ? false : data === "null" ? null : !jQuery.isNaN(data) ? parseFloat(data) : rbrace.test(data) ? jQuery.parseJSON(data) : data; } catch (e) { } jQuery.data(elem, key, data); } else { data = undefined; } } return data; } jQuery.extend({ queue: function (elem, type, data) { if (!elem) { return; } type = (type || "fx") + "queue"; var q = jQuery.data(elem, type); if (!data) { return q || []; } if (!q || jQuery.isArray(data)) { q = jQuery.data(elem, type, jQuery.makeArray(data)); } else { q.push(data); } return q; }, dequeue: function (elem, type) { type = type || "fx"; var queue = jQuery.queue(elem, type), fn = queue.shift(); if (fn === "inprogress") { fn = queue.shift(); } if (fn) { if (type === "fx") { queue.unshift("inprogress"); } fn.call(elem, function () { jQuery.dequeue(elem, type); }); } } }); jQuery.fn.extend({ queue: function (type, data) { if (typeof type !== "string") { data = type; type = "fx"; } if (data === undefined) { return jQuery.queue(this[0], type); } return this.each(function (i) { var queue = jQuery.queue(this, type, data); if (type === "fx" && queue[0] !== "inprogress") { jQuery.dequeue(this, type); } }); }, dequeue: function (type) { return this.each(function () { jQuery.dequeue(this, type); }); }, delay: function (time, type) { time = jQuery.fx ? jQuery.fx.speeds[time] || time : time; type = type || "fx"; return this.queue(type, function () { var elem = this; setTimeout(function () { jQuery.dequeue(elem, type); }, time); }); }, clearQueue: function (type) { return this.queue(type || "fx", []); } }); var rclass = /[\n\t]/g, rspaces = /\s+/, rreturn = /\r/g, rspecialurl = /^(?:href|src|style)$/, rtype = /^(?:button|input)$/i, rfocusable = /^(?:button|input|object|select|textarea)$/i, rclickable = /^a(?:rea)?$/i, rradiocheck = /^(?:radio|checkbox)$/i; jQuery.props = { "for": "htmlFor", "class": "className", readonly: "readOnly", maxlength: "maxLength", cellspacing: "cellSpacing", rowspan: "rowSpan", colspan: "colSpan", tabindex: "tabIndex", usemap: "useMap", frameborder: "frameBorder" }; jQuery.fn.extend({ attr: function (name, value) { return jQuery.access(this, name, value, true, jQuery.attr); }, removeAttr: function (name, fn) { return this.each(function () { jQuery.attr(this, name, ""); if (this.nodeType === 1) { this.removeAttribute(name); } }); }, addClass: function (value) { if (jQuery.isFunction(value)) { return this.each(function (i) { var self = jQuery(this); self.addClass(value.call(this, i, self.attr("class"))); }); } if (value && typeof value === "string") { var classNames = (value || "").split(rspaces); for (var i = 0, l = this.length; i < l; i++) { var elem = this[i]; if (elem.nodeType === 1) { if (!elem.className) { elem.className = value; } else { var className = " " + elem.className + " ", setClass = elem.className; for (var c = 0, cl = classNames.length; c < cl; c++) { if (className.indexOf(" " + classNames[c] + " ") < 0) { setClass += " " + classNames[c]; } } elem.className = jQuery.trim(setClass); } } } } return this; }, removeClass: function (value) { if (jQuery.isFunction(value)) { return this.each(function (i) { var self = jQuery(this); self.removeClass(value.call(this, i, self.attr("class"))); }); } if ((value && typeof value === "string") || value === undefined) { var classNames = (value || "").split(rspaces); for (var i = 0, l = this.length; i < l; i++) { var elem = this[i]; if (elem.nodeType === 1 && elem.className) { if (value) { var className = (" " + elem.className + " ").replace(rclass, " "); for (var c = 0, cl = classNames.length; c < cl; c++) { className = className.replace(" " + classNames[c] + " ", " "); } elem.className = jQuery.trim(className); } else { elem.className = ""; } } } } return this; }, toggleClass: function (value, stateVal) { var type = typeof value, isBool = typeof stateVal === "boolean"; if (jQuery.isFunction(value)) { return this.each(function (i) { var self = jQuery(this); self.toggleClass(value.call(this, i, self.attr("class"), stateVal), stateVal); }); } return this.each(function () { if (type === "string") { var className, i = 0, self = jQuery(this), state = stateVal, classNames = value.split(rspaces); while ((className = classNames[i++])) { state = isBool ? state : !self.hasClass(className); self[state ? "addClass" : "removeClass"](className); } } else if (type === "undefined" || type === "boolean") { if (this.className) { jQuery.data(this, "__className__", this.className); } this.className = this.className || value === false ? "" : jQuery.data(this, "__className__") || ""; } }); }, hasClass: function (selector) { var className = " " + selector + " "; for (var i = 0, l = this.length; i < l; i++) { if ((" " + this[i].className + " ").replace(rclass, " ").indexOf(className) > -1) { return true; } } return false; }, val: function (value) { if (!arguments.length) { var elem = this[0]; if (elem) { if (jQuery.nodeName(elem, "option")) { var val = elem.attributes.value; return !val || val.specified ? elem.value : elem.text; } if (jQuery.nodeName(elem, "select")) { var index = elem.selectedIndex, values = [], options = elem.options, one = elem.type === "select-one"; if (index < 0) { return null; } for (var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++) { var option = options[i]; if (option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) { value = jQuery(option).val(); if (one) { return value; } values.push(value); } } return values; } if (rradiocheck.test(elem.type) && !jQuery.support.checkOn) { return elem.getAttribute("value") === null ? "on" : elem.value; } return (elem.value || "").replace(rreturn, ""); } return undefined; } var isFunction = jQuery.isFunction(value); return this.each(function (i) { var self = jQuery(this), val = value; if (this.nodeType !== 1) { return; } if (isFunction) { val = value.call(this, i, self.val()); } if (val == null) { val = ""; } else if (typeof val === "number") { val += ""; } else if (jQuery.isArray(val)) { val = jQuery.map(val, function (value) { return value == null ? "" : value + ""; }); } if (jQuery.isArray(val) && rradiocheck.test(this.type)) { this.checked = jQuery.inArray(self.val(), val) >= 0; } else if (jQuery.nodeName(this, "select")) { var values = jQuery.makeArray(val); jQuery("option", this).each(function () { this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0; }); if (!values.length) { this.selectedIndex = -1; } } else { this.value = val; } }); } }); jQuery.extend({ attrFn: { val: true, css: true, html: true, text: true, data: true, width: true, height: true, offset: true }, attr: function (elem, name, value, pass) { if (!elem || elem.nodeType === 3 || elem.nodeType === 8) { return undefined; } if (pass && name in jQuery.attrFn) { return jQuery(elem)[name](value); } var notxml = elem.nodeType !== 1 || !jQuery.isXMLDoc(elem), set = value !== undefined; name = notxml && jQuery.props[name] || name; var special = rspecialurl.test(name); if (name === "selected" && !jQuery.support.optSelected) { var parent = elem.parentNode; if (parent) { parent.selectedIndex; if (parent.parentNode) { parent.parentNode.selectedIndex; } } } if ((name in elem || elem[name] !== undefined) && notxml && !special) { if (set) { if (name === "type" && rtype.test(elem.nodeName) && elem.parentNode) { jQuery.error("type property can't be changed"); } if (value === null) { if (elem.nodeType === 1) { elem.removeAttribute(name); } } else { elem[name] = value; } } if (jQuery.nodeName(elem, "form") && elem.getAttributeNode(name)) { return elem.getAttributeNode(name).nodeValue; } if (name === "tabIndex") { var attributeNode = elem.getAttributeNode("tabIndex"); return attributeNode && attributeNode.specified ? attributeNode.value : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined; } return elem[name]; } if (!jQuery.support.style && notxml && name === "style") { if (set) { elem.style.cssText = "" + value; } return elem.style.cssText; } if (set) { elem.setAttribute(name, "" + value); } if (!elem.attributes[name] && (elem.hasAttribute && !elem.hasAttribute(name))) { return undefined; } var attr = !jQuery.support.hrefNormalized && notxml && special ? elem.getAttribute(name, 2) : elem.getAttribute(name); return attr === null ? undefined : attr; } }); var rnamespaces = /\.(.*)$/, rformElems = /^(?:textarea|input|select)$/i, rperiod = /\./g, rspace = / /g, rescape = /[^\w\s.|`]/g, fcleanup = function (nm) { return nm.replace(rescape, "\\$&"); }, focusCounts = { focusin: 0, focusout: 0 }; jQuery.event = { add: function (elem, types, handler, data) { if (elem.nodeType === 3 || elem.nodeType === 8) { return; } if (jQuery.isWindow(elem) && (elem !== window && !elem.frameElement)) { elem = window; } if (handler === false) { handler = returnFalse; } else if (!handler) { return; } var handleObjIn, handleObj; if (handler.handler) { handleObjIn = handler; handler = handleObjIn.handler; } if (!handler.guid) { handler.guid = jQuery.guid++; } var elemData = jQuery.data(elem); if (!elemData) { return; } var eventKey = elem.nodeType ? "events" : "__events__", events = elemData[eventKey], eventHandle = elemData.handle; if (typeof events === "function") { eventHandle = events.handle; events = events.events; } else if (!events) { if (!elem.nodeType) { elemData[eventKey] = elemData = function () { }; } elemData.events = events = {}; } if (!eventHandle) { elemData.handle = eventHandle = function () { return typeof jQuery !== "undefined" && !jQuery.event.triggered ? jQuery.event.handle.apply(eventHandle.elem, arguments) : undefined; }; } eventHandle.elem = elem; types = types.split(" "); var type, i = 0, namespaces; while ((type = types[i++])) { handleObj = handleObjIn ? jQuery.extend({}, handleObjIn) : { handler: handler, data: data }; if (type.indexOf(".") > -1) { namespaces = type.split("."); type = namespaces.shift(); handleObj.namespace = namespaces.slice(0).sort().join("."); } else { namespaces = []; handleObj.namespace = ""; } handleObj.type = type; if (!handleObj.guid) { handleObj.guid = handler.guid; } var handlers = events[type], special = jQuery.event.special[type] || {}; if (!handlers) { handlers = events[type] = []; if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) { if (elem.addEventListener) { elem.addEventListener(type, eventHandle, false); } else if (elem.attachEvent) { elem.attachEvent("on" + type, eventHandle); } } } if (special.add) { special.add.call(elem, handleObj); if (!handleObj.handler.guid) { handleObj.handler.guid = handler.guid; } } handlers.push(handleObj); jQuery.event.global[type] = true; } elem = null; }, global: {}, remove: function (elem, types, handler, pos) { if (elem.nodeType === 3 || elem.nodeType === 8) { return; } if (handler === false) { handler = returnFalse; } var ret, type, fn, j, i = 0, all, namespaces, namespace, special, eventType, handleObj, origType, eventKey = elem.nodeType ? "events" : "__events__", elemData = jQuery.data(elem), events = elemData && elemData[eventKey]; if (!elemData || !events) { return; } if (typeof events === "function") { elemData = events; events = events.events; } if (types && types.type) { handler = types.handler; types = types.type; } if (!types || typeof types === "string" && types.charAt(0) === ".") { types = types || ""; for (type in events) { jQuery.event.remove(elem, type + types); } return; } types = types.split(" "); while ((type = types[i++])) { origType = type; handleObj = null; all = type.indexOf(".") < 0; namespaces = []; if (!all) { namespaces = type.split("."); type = namespaces.shift(); namespace = new RegExp("(^|\\.)" + jQuery.map(namespaces.slice(0).sort(), fcleanup).join("\\.(?:.*\\.)?") + "(\\.|$)"); } eventType = events[type]; if (!eventType) { continue; } if (!handler) { for (j = 0; j < eventType.length; j++) { handleObj = eventType[j]; if (all || namespace.test(handleObj.namespace)) { jQuery.event.remove(elem, origType, handleObj.handler, j); eventType.splice(j--, 1); } } continue; } special = jQuery.event.special[type] || {}; for (j = pos || 0; j < eventType.length; j++) { handleObj = eventType[j]; if (handler.guid === handleObj.guid) { if (all || namespace.test(handleObj.namespace)) { if (pos == null) { eventType.splice(j--, 1); } if (special.remove) { special.remove.call(elem, handleObj); } } if (pos != null) { break; } } } if (eventType.length === 0 || pos != null && eventType.length === 1) { if (!special.teardown || special.teardown.call(elem, namespaces) === false) { jQuery.removeEvent(elem, type, elemData.handle); } ret = null; delete events[type]; } } if (jQuery.isEmptyObject(events)) { var handle = elemData.handle; if (handle) { handle.elem = null; } delete elemData.events; delete elemData.handle; if (typeof elemData === "function") { jQuery.removeData(elem, eventKey); } else if (jQuery.isEmptyObject(elemData)) { jQuery.removeData(elem); } } }, trigger: function (event, data, elem) { var type = event.type || event, bubbling = arguments[3]; if (!bubbling) { event = typeof event === "object" ? event[jQuery.expando] ? event : jQuery.extend(jQuery.Event(type), event) : jQuery.Event(type); if (type.indexOf("!") >= 0) { event.type = type = type.slice(0, -1); event.exclusive = true; } if (!elem) { event.stopPropagation(); if (jQuery.event.global[type]) { jQuery.each(jQuery.cache, function () { if (this.events && this.events[type]) { jQuery.event.trigger(event, data, this.handle.elem); } }); } } if (!elem || elem.nodeType === 3 || elem.nodeType === 8) { return undefined; } event.result = undefined; event.target = elem; data = jQuery.makeArray(data); data.unshift(event); } event.currentTarget = elem; var handle = elem.nodeType ? jQuery.data(elem, "handle") : (jQuery.data(elem, "__events__") || {}).handle; if (handle) { handle.apply(elem, data); } var parent = elem.parentNode || elem.ownerDocument; try { if (!(elem && elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()])) { if (elem["on" + type] && elem["on" + type].apply(elem, data) === false) { event.result = false; event.preventDefault(); } } } catch (inlineError) { } if (!event.isPropagationStopped() && parent) { jQuery.event.trigger(event, data, parent, true); } else if (!event.isDefaultPrevented()) { var old, target = event.target, targetType = type.replace(rnamespaces, ""), isClick = jQuery.nodeName(target, "a") && targetType === "click", special = jQuery.event.special[targetType] || {}; if ((!special._default || special._default.call(elem, event) === false) && !isClick && !(target && target.nodeName && jQuery.noData[target.nodeName.toLowerCase()])) { try { if (target[targetType]) { old = target["on" + targetType]; if (old) { target["on" + targetType] = null; } jQuery.event.triggered = true; target[targetType](); } } catch (triggerError) { } if (old) { target["on" + targetType] = old; } jQuery.event.triggered = false; } } }, handle: function (event) { var all, handlers, namespaces, namespace_re, events, namespace_sort = [], args = jQuery.makeArray(arguments); event = args[0] = jQuery.event.fix(event || window.event); event.currentTarget = this; all = event.type.indexOf(".") < 0 && !event.exclusive; if (!all) { namespaces = event.type.split("."); event.type = namespaces.shift(); namespace_sort = namespaces.slice(0).sort(); namespace_re = new RegExp("(^|\\.)" + namespace_sort.join("\\.(?:.*\\.)?") + "(\\.|$)"); } event.namespace = event.namespace || namespace_sort.join("."); events = jQuery.data(this, this.nodeType ? "events" : "__events__"); if (typeof events === "function") { events = events.events; } handlers = (events || {})[event.type]; if (events && handlers) { handlers = handlers.slice(0); for (var j = 0, l = handlers.length; j < l; j++) { var handleObj = handlers[j]; if (all || namespace_re.test(handleObj.namespace)) { event.handler = handleObj.handler; event.data = handleObj.data; event.handleObj = handleObj; var ret = handleObj.handler.apply(this, args); if (ret !== undefined) { event.result = ret; if (ret === false) { event.preventDefault(); event.stopPropagation(); } } if (event.isImmediatePropagationStopped()) { break; } } } } return event.result; }, props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "), fix: function (event) { if (event[jQuery.expando]) { return event; } var originalEvent = event; event = jQuery.Event(originalEvent); for (var i = this.props.length, prop; i; ) { prop = this.props[--i]; event[prop] = originalEvent[prop]; } if (!event.target) { event.target = event.srcElement || document; } if (event.target.nodeType === 3) { event.target = event.target.parentNode; } if (!event.relatedTarget && event.fromElement) { event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement; } if (event.pageX == null && event.clientX != null) { var doc = document.documentElement, body = document.body; event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0); event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0); } if (event.which == null && (event.charCode != null || event.keyCode != null)) { event.which = event.charCode != null ? event.charCode : event.keyCode; } if (!event.metaKey && event.ctrlKey) { event.metaKey = event.ctrlKey; } if (!event.which && event.button !== undefined) { event.which = (event.button & 1 ? 1 : (event.button & 2 ? 3 : (event.button & 4 ? 2 : 0))); } return event; }, guid: 1E8, proxy: jQuery.proxy, special: { ready: { setup: jQuery.bindReady, teardown: jQuery.noop }, live: { add: function (handleObj) { jQuery.event.add(this, liveConvert(handleObj.origType, handleObj.selector), jQuery.extend({}, handleObj, { handler: liveHandler, guid: handleObj.handler.guid })); }, remove: function (handleObj) { jQuery.event.remove(this, liveConvert(handleObj.origType, handleObj.selector), handleObj); } }, beforeunload: { setup: function (data, namespaces, eventHandle) { if (jQuery.isWindow(this)) { this.onbeforeunload = eventHandle; } }, teardown: function (namespaces, eventHandle) { if (this.onbeforeunload === eventHandle) { this.onbeforeunload = null; } } }} }; jQuery.removeEvent = document.removeEventListener ? function (elem, type, handle) { if (elem.removeEventListener) { elem.removeEventListener(type, handle, false); } } : function (elem, type, handle) { if (elem.detachEvent) { elem.detachEvent("on" + type, handle); } }; jQuery.Event = function (src) { if (!this.preventDefault) { return new jQuery.Event(src); } if (src && src.type) { this.originalEvent = src; this.type = src.type; } else { this.type = src; } this.timeStamp = jQuery.now(); this[jQuery.expando] = true; }; function returnFalse() { return false; } function returnTrue() { return true; } jQuery.Event.prototype = { preventDefault: function () { this.isDefaultPrevented = returnTrue; var e = this.originalEvent; if (!e) { return; } if (e.preventDefault) { e.preventDefault(); } else { e.returnValue = false; } }, stopPropagation: function () { this.isPropagationStopped = returnTrue; var e = this.originalEvent; if (!e) { return; } if (e.stopPropagation) { e.stopPropagation(); } e.cancelBubble = true; }, stopImmediatePropagation: function () { this.isImmediatePropagationStopped = returnTrue; this.stopPropagation(); }, isDefaultPrevented: returnFalse, isPropagationStopped: returnFalse, isImmediatePropagationStopped: returnFalse }; var withinElement = function (event) { var parent = event.relatedTarget; try { while (parent && parent !== this) { parent = parent.parentNode; } if (parent !== this) { event.type = event.data; jQuery.event.handle.apply(this, arguments); } } catch (e) { } }, delegate = function (event) { event.type = event.data; jQuery.event.handle.apply(this, arguments); }; jQuery.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function (orig, fix) { jQuery.event.special[orig] = { setup: function (data) { jQuery.event.add(this, fix, data && data.selector ? delegate : withinElement, orig); }, teardown: function (data) { jQuery.event.remove(this, fix, data && data.selector ? delegate : withinElement); } }; }); if (!jQuery.support.submitBubbles) { jQuery.event.special.submit = { setup: function (data, namespaces) { if (this.nodeName.toLowerCase() !== "form") { jQuery.event.add(this, "click.specialSubmit", function (e) { var elem = e.target, type = elem.type; if ((type === "submit" || type === "image") && jQuery(elem).closest("form").length) { e.liveFired = undefined; return trigger("submit", this, arguments); } }); jQuery.event.add(this, "keypress.specialSubmit", function (e) { var elem = e.target, type = elem.type; if ((type === "text" || type === "password") && jQuery(elem).closest("form").length && e.keyCode === 13) { e.liveFired = undefined; return trigger("submit", this, arguments); } }); } else { return false; } }, teardown: function (namespaces) { jQuery.event.remove(this, ".specialSubmit"); } }; } if (!jQuery.support.changeBubbles) { var changeFilters, getVal = function (elem) { var type = elem.type, val = elem.value; if (type === "radio" || type === "checkbox") { val = elem.checked; } else if (type === "select-multiple") { val = elem.selectedIndex > -1 ? jQuery.map(elem.options, function (elem) { return elem.selected; }).join("-") : ""; } else if (elem.nodeName.toLowerCase() === "select") { val = elem.selectedIndex; } return val; }, testChange = function testChange(e) { var elem = e.target, data, val; if (!rformElems.test(elem.nodeName) || elem.readOnly) { return; } data = jQuery.data(elem, "_change_data"); val = getVal(elem); if (e.type !== "focusout" || elem.type !== "radio") { jQuery.data(elem, "_change_data", val); } if (data === undefined || val === data) { return; } if (data != null || val) { e.type = "change"; e.liveFired = undefined; return jQuery.event.trigger(e, arguments[1], elem); } }; jQuery.event.special.change = { filters: { focusout: testChange, beforedeactivate: testChange, click: function (e) { var elem = e.target, type = elem.type; if (type === "radio" || type === "checkbox" || elem.nodeName.toLowerCase() === "select") { return testChange.call(this, e); } }, keydown: function (e) { var elem = e.target, type = elem.type; if ((e.keyCode === 13 && elem.nodeName.toLowerCase() !== "textarea") || (e.keyCode === 32 && (type === "checkbox" || type === "radio")) || type === "select-multiple") { return testChange.call(this, e); } }, beforeactivate: function (e) { var elem = e.target; jQuery.data(elem, "_change_data", getVal(elem)); } }, setup: function (data, namespaces) { if (this.type === "file") { return false; } for (var type in changeFilters) { jQuery.event.add(this, type + ".specialChange", changeFilters[type]); } return rformElems.test(this.nodeName); }, teardown: function (namespaces) { jQuery.event.remove(this, ".specialChange"); return rformElems.test(this.nodeName); } }; changeFilters = jQuery.event.special.change.filters; changeFilters.focus = changeFilters.beforeactivate; } function trigger(type, elem, args) { args[0].type = type; return jQuery.event.handle.apply(elem, args); } if (document.addEventListener) { jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) { jQuery.event.special[fix] = { setup: function () { if (focusCounts[fix]++ === 0) { document.addEventListener(orig, handler, true); } }, teardown: function () { if (--focusCounts[fix] === 0) { document.removeEventListener(orig, handler, true); } } }; function handler(e) { e = jQuery.event.fix(e); e.type = fix; return jQuery.event.trigger(e, null, e.target); } }); } jQuery.each(["bind", "one"], function (i, name) { jQuery.fn[name] = function (type, data, fn) { if (typeof type === "object") { for (var key in type) { this[name](key, data, type[key], fn); } return this; } if (jQuery.isFunction(data) || data === false) { fn = data; data = undefined; } var handler = name === "one" ? jQuery.proxy(fn, function (event) { jQuery(this).unbind(event, handler); return fn.apply(this, arguments); }) : fn; if (type === "unload" && name !== "one") { this.one(type, data, fn); } else { for (var i = 0, l = this.length; i < l; i++) { jQuery.event.add(this[i], type, handler, data); } } return this; }; }); jQuery.fn.extend({ unbind: function (type, fn) { if (typeof type === "object" && !type.preventDefault) { for (var key in type) { this.unbind(key, type[key]); } } else { for (var i = 0, l = this.length; i < l; i++) { jQuery.event.remove(this[i], type, fn); } } return this; }, delegate: function (selector, types, data, fn) { return this.live(types, data, fn, selector); }, undelegate: function (selector, types, fn) { if (arguments.length === 0) { return this.unbind("live"); } else { return this.die(types, null, fn, selector); } }, trigger: function (type, data) { return this.each(function () { jQuery.event.trigger(type, data, this); }); }, triggerHandler: function (type, data) { if (this[0]) { var event = jQuery.Event(type); event.preventDefault(); event.stopPropagation(); jQuery.event.trigger(event, data, this[0]); return event.result; } }, toggle: function (fn) { var args = arguments, i = 1; while (i < args.length) { jQuery.proxy(fn, args[i++]); } return this.click(jQuery.proxy(fn, function (event) { var lastToggle = (jQuery.data(this, "lastToggle" + fn.guid) || 0) % i; jQuery.data(this, "lastToggle" + fn.guid, lastToggle + 1); event.preventDefault(); return args[lastToggle].apply(this, arguments) || false; })); }, hover: function (fnOver, fnOut) { return this.mouseenter(fnOver).mouseleave(fnOut || fnOver); } }); var liveMap = { focus: "focusin", blur: "focusout", mouseenter: "mouseover", mouseleave: "mouseout" }; jQuery.each(["live", "die"], function (i, name) { jQuery.fn[name] = function (types, data, fn, origSelector) { var type, i = 0, match, namespaces, preType, selector = origSelector || this.selector, context = origSelector ? this : jQuery(this.context); if (typeof types === "object" && !types.preventDefault) { for (var key in types) { context[name](key, data, types[key], selector); } return this; } if (jQuery.isFunction(data)) { fn = data; data = undefined; } types = (types || "").split(" "); while ((type = types[i++]) != null) { match = rnamespaces.exec(type); namespaces = ""; if (match) { namespaces = match[0]; type = type.replace(rnamespaces, ""); } if (type === "hover") { types.push("mouseenter" + namespaces, "mouseleave" + namespaces); continue; } preType = type; if (type === "focus" || type === "blur") { types.push(liveMap[type] + namespaces); type = type + namespaces; } else { type = (liveMap[type] || type) + namespaces; } if (name === "live") { for (var j = 0, l = context.length; j < l; j++) { jQuery.event.add(context[j], "live." + liveConvert(type, selector), { data: data, selector: selector, handler: fn, origType: type, origHandler: fn, preType: preType }); } } else { context.unbind("live." + liveConvert(type, selector), fn); } } return this; }; }); function liveHandler(event) { var stop, maxLevel, related, match, handleObj, elem, j, i, l, data, close, namespace, ret, elems = [], selectors = [], events = jQuery.data(this, this.nodeType ? "events" : "__events__"); if (typeof events === "function") { events = events.events; } if (event.liveFired === this || !events || !events.live || event.button && event.type === "click") { return; } if (event.namespace) { namespace = new RegExp("(^|\\.)" + event.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)"); } event.liveFired = this; var live = events.live.slice(0); for (j = 0; j < live.length; j++) { handleObj = live[j]; if (handleObj.origType.replace(rnamespaces, "") === event.type) { selectors.push(handleObj.selector); } else { live.splice(j--, 1); } } match = jQuery(event.target).closest(selectors, event.currentTarget); for (i = 0, l = match.length; i < l; i++) { close = match[i]; for (j = 0; j < live.length; j++) { handleObj = live[j]; if (close.selector === handleObj.selector && (!namespace || namespace.test(handleObj.namespace))) { elem = close.elem; related = null; if (handleObj.preType === "mouseenter" || handleObj.preType === "mouseleave") { event.type = handleObj.preType; related = jQuery(event.relatedTarget).closest(handleObj.selector)[0]; } if (!related || related !== elem) { elems.push({ elem: elem, handleObj: handleObj, level: close.level }); } } } } for (i = 0, l = elems.length; i < l; i++) { match = elems[i]; if (maxLevel && match.level > maxLevel) { break; } event.currentTarget = match.elem; event.data = match.handleObj.data; event.handleObj = match.handleObj; ret = match.handleObj.origHandler.apply(match.elem, arguments); if (ret === false || event.isPropagationStopped()) { maxLevel = match.level; if (ret === false) { stop = false; } if (event.isImmediatePropagationStopped()) { break; } } } return stop; } function liveConvert(type, selector) { return (type && type !== "*" ? type + "." : "") + selector.replace(rperiod, "`").replace(rspace, "&"); } jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error").split(" "), function (i, name) { jQuery.fn[name] = function (data, fn) { if (fn == null) { fn = data; data = null; } return arguments.length > 0 ? this.bind(name, data, fn) : this.trigger(name); }; if (jQuery.attrFn) { jQuery.attrFn[name] = true; } }); if (window.attachEvent && !window.addEventListener) { jQuery(window).bind("unload", function () { for (var id in jQuery.cache) { if (jQuery.cache[id].handle) { try { jQuery.event.remove(jQuery.cache[id].handle.elem); } catch (e) { } } } }); }
    (function () { var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, done = 0, toString = Object.prototype.toString, hasDuplicate = false, baseHasDuplicate = true; [0, 0].sort(function () { baseHasDuplicate = false; return 0; }); var Sizzle = function (selector, context, results, seed) { results = results || []; context = context || document; var origContext = context; if (context.nodeType !== 1 && context.nodeType !== 9) { return []; } if (!selector || typeof selector !== "string") { return results; } var m, set, checkSet, extra, ret, cur, pop, i, prune = true, contextXML = Sizzle.isXML(context), parts = [], soFar = selector; do { chunker.exec(""); m = chunker.exec(soFar); if (m) { soFar = m[3]; parts.push(m[1]); if (m[2]) { extra = m[3]; break; } } } while (m); if (parts.length > 1 && origPOS.exec(selector)) { if (parts.length === 2 && Expr.relative[parts[0]]) { set = posProcess(parts[0] + parts[1], context); } else { set = Expr.relative[parts[0]] ? [context] : Sizzle(parts.shift(), context); while (parts.length) { selector = parts.shift(); if (Expr.relative[selector]) { selector += parts.shift(); } set = posProcess(selector, set); } } } else { if (!seed && parts.length > 1 && context.nodeType === 9 && !contextXML && Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1])) { ret = Sizzle.find(parts.shift(), context, contextXML); context = ret.expr ? Sizzle.filter(ret.expr, ret.set)[0] : ret.set[0]; } if (context) { ret = seed ? { expr: parts.pop(), set: makeArray(seed)} : Sizzle.find(parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML); set = ret.expr ? Sizzle.filter(ret.expr, ret.set) : ret.set; if (parts.length > 0) { checkSet = makeArray(set); } else { prune = false; } while (parts.length) { cur = parts.pop(); pop = cur; if (!Expr.relative[cur]) { cur = ""; } else { pop = parts.pop(); } if (pop == null) { pop = context; } Expr.relative[cur](checkSet, pop, contextXML); } } else { checkSet = parts = []; } } if (!checkSet) { checkSet = set; } if (!checkSet) { Sizzle.error(cur || selector); } if (toString.call(checkSet) === "[object Array]") { if (!prune) { results.push.apply(results, checkSet); } else if (context && context.nodeType === 1) { for (i = 0; checkSet[i] != null; i++) { if (checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i]))) { results.push(set[i]); } } } else { for (i = 0; checkSet[i] != null; i++) { if (checkSet[i] && checkSet[i].nodeType === 1) { results.push(set[i]); } } } } else { makeArray(checkSet, results); } if (extra) { Sizzle(extra, origContext, results, seed); Sizzle.uniqueSort(results); } return results; }; Sizzle.uniqueSort = function (results) { if (sortOrder) { hasDuplicate = baseHasDuplicate; results.sort(sortOrder); if (hasDuplicate) { for (var i = 1; i < results.length; i++) { if (results[i] === results[i - 1]) { results.splice(i--, 1); } } } } return results; }; Sizzle.matches = function (expr, set) { return Sizzle(expr, null, null, set); }; Sizzle.matchesSelector = function (node, expr) { return Sizzle(expr, null, null, [node]).length > 0; }; Sizzle.find = function (expr, context, isXML) { var set; if (!expr) { return []; } for (var i = 0, l = Expr.order.length; i < l; i++) { var match, type = Expr.order[i]; if ((match = Expr.leftMatch[type].exec(expr))) { var left = match[1]; match.splice(1, 1); if (left.substr(left.length - 1) !== "\\") { match[1] = (match[1] || "").replace(/\\/g, ""); set = Expr.find[type](match, context, isXML); if (set != null) { expr = expr.replace(Expr.match[type], ""); break; } } } } if (!set) { set = context.getElementsByTagName("*"); } return { set: set, expr: expr }; }; Sizzle.filter = function (expr, set, inplace, not) { var match, anyFound, old = expr, result = [], curLoop = set, isXMLFilter = set && set[0] && Sizzle.isXML(set[0]); while (expr && set.length) { for (var type in Expr.filter) { if ((match = Expr.leftMatch[type].exec(expr)) != null && match[2]) { var found, item, filter = Expr.filter[type], left = match[1]; anyFound = false; match.splice(1, 1); if (left.substr(left.length - 1) === "\\") { continue; } if (curLoop === result) { result = []; } if (Expr.preFilter[type]) { match = Expr.preFilter[type](match, curLoop, inplace, result, not, isXMLFilter); if (!match) { anyFound = found = true; } else if (match === true) { continue; } } if (match) { for (var i = 0; (item = curLoop[i]) != null; i++) { if (item) { found = filter(item, match, i, curLoop); var pass = not ^ !!found; if (inplace && found != null) { if (pass) { anyFound = true; } else { curLoop[i] = false; } } else if (pass) { result.push(item); anyFound = true; } } } } if (found !== undefined) { if (!inplace) { curLoop = result; } expr = expr.replace(Expr.match[type], ""); if (!anyFound) { return []; } break; } } } if (expr === old) { if (anyFound == null) { Sizzle.error(expr); } else { break; } } old = expr; } return curLoop; }; Sizzle.error = function (msg) { throw "Syntax error, unrecognized expression: " + msg; }; var Expr = Sizzle.selectors = { order: ["ID", "NAME", "TAG"], match: { ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/, ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/, TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/, CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/, POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/, PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/ }, leftMatch: {}, attrMap: { "class": "className", "for": "htmlFor" }, attrHandle: { href: function (elem) { return elem.getAttribute("href"); } }, relative: { "+": function (checkSet, part) { var isPartStr = typeof part === "string", isTag = isPartStr && !/\W/.test(part), isPartStrNotTag = isPartStr && !isTag; if (isTag) { part = part.toLowerCase(); } for (var i = 0, l = checkSet.length, elem; i < l; i++) { if ((elem = checkSet[i])) { while ((elem = elem.previousSibling) && elem.nodeType !== 1) { } checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ? elem || false : elem === part; } } if (isPartStrNotTag) { Sizzle.filter(part, checkSet, true); } }, ">": function (checkSet, part) { var elem, isPartStr = typeof part === "string", i = 0, l = checkSet.length; if (isPartStr && !/\W/.test(part)) { part = part.toLowerCase(); for (; i < l; i++) { elem = checkSet[i]; if (elem) { var parent = elem.parentNode; checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false; } } } else { for (; i < l; i++) { elem = checkSet[i]; if (elem) { checkSet[i] = isPartStr ? elem.parentNode : elem.parentNode === part; } } if (isPartStr) { Sizzle.filter(part, checkSet, true); } } }, "": function (checkSet, part, isXML) { var nodeCheck, doneName = done++, checkFn = dirCheck; if (typeof part === "string" && !/\W/.test(part)) { part = part.toLowerCase(); nodeCheck = part; checkFn = dirNodeCheck; } checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML); }, "~": function (checkSet, part, isXML) { var nodeCheck, doneName = done++, checkFn = dirCheck; if (typeof part === "string" && !/\W/.test(part)) { part = part.toLowerCase(); nodeCheck = part; checkFn = dirNodeCheck; } checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML); } }, find: { ID: function (match, context, isXML) { if (typeof context.getElementById !== "undefined" && !isXML) { var m = context.getElementById(match[1]); return m && m.parentNode ? [m] : []; } }, NAME: function (match, context) { if (typeof context.getElementsByName !== "undefined") { var ret = [], results = context.getElementsByName(match[1]); for (var i = 0, l = results.length; i < l; i++) { if (results[i].getAttribute("name") === match[1]) { ret.push(results[i]); } } return ret.length === 0 ? null : ret; } }, TAG: function (match, context) { return context.getElementsByTagName(match[1]); } }, preFilter: { CLASS: function (match, curLoop, inplace, result, not, isXML) { match = " " + match[1].replace(/\\/g, "") + " "; if (isXML) { return match; } for (var i = 0, elem; (elem = curLoop[i]) != null; i++) { if (elem) { if (not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n]/g, " ").indexOf(match) >= 0)) { if (!inplace) { result.push(elem); } } else if (inplace) { curLoop[i] = false; } } } return false; }, ID: function (match) { return match[1].replace(/\\/g, ""); }, TAG: function (match, curLoop) { return match[1].toLowerCase(); }, CHILD: function (match) { if (match[1] === "nth") { var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" || !/\D/.test(match[2]) && "0n+" + match[2] || match[2]); match[2] = (test[1] + (test[2] || 1)) - 0; match[3] = test[3] - 0; } match[0] = done++; return match; }, ATTR: function (match, curLoop, inplace, result, not, isXML) { var name = match[1].replace(/\\/g, ""); if (!isXML && Expr.attrMap[name]) { match[1] = Expr.attrMap[name]; } if (match[2] === "~=") { match[4] = " " + match[4] + " "; } return match; }, PSEUDO: function (match, curLoop, inplace, result, not) { if (match[1] === "not") { if ((chunker.exec(match[3]) || "").length > 1 || /^\w/.test(match[3])) { match[3] = Sizzle(match[3], null, null, curLoop); } else { var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not); if (!inplace) { result.push.apply(result, ret); } return false; } } else if (Expr.match.POS.test(match[0]) || Expr.match.CHILD.test(match[0])) { return true; } return match; }, POS: function (match) { match.unshift(true); return match; } }, filters: { enabled: function (elem) { return elem.disabled === false && elem.type !== "hidden"; }, disabled: function (elem) { return elem.disabled === true; }, checked: function (elem) { return elem.checked === true; }, selected: function (elem) { elem.parentNode.selectedIndex; return elem.selected === true; }, parent: function (elem) { return !!elem.firstChild; }, empty: function (elem) { return !elem.firstChild; }, has: function (elem, i, match) { return !!Sizzle(match[3], elem).length; }, header: function (elem) { return (/h\d/i).test(elem.nodeName); }, text: function (elem) { return "text" === elem.type; }, radio: function (elem) { return "radio" === elem.type; }, checkbox: function (elem) { return "checkbox" === elem.type; }, file: function (elem) { return "file" === elem.type; }, password: function (elem) { return "password" === elem.type; }, submit: function (elem) { return "submit" === elem.type; }, image: function (elem) { return "image" === elem.type; }, reset: function (elem) { return "reset" === elem.type; }, button: function (elem) { return "button" === elem.type || elem.nodeName.toLowerCase() === "button"; }, input: function (elem) { return (/input|select|textarea|button/i).test(elem.nodeName); } }, setFilters: { first: function (elem, i) { return i === 0; }, last: function (elem, i, match, array) { return i === array.length - 1; }, even: function (elem, i) { return i % 2 === 0; }, odd: function (elem, i) { return i % 2 === 1; }, lt: function (elem, i, match) { return i < match[3] - 0; }, gt: function (elem, i, match) { return i > match[3] - 0; }, nth: function (elem, i, match) { return match[3] - 0 === i; }, eq: function (elem, i, match) { return match[3] - 0 === i; } }, filter: { PSEUDO: function (elem, match, i, array) { var name = match[1], filter = Expr.filters[name]; if (filter) { return filter(elem, i, match, array); } else if (name === "contains") { return (elem.textContent || elem.innerText || Sizzle.getText([elem]) || "").indexOf(match[3]) >= 0; } else if (name === "not") { var not = match[3]; for (var j = 0, l = not.length; j < l; j++) { if (not[j] === elem) { return false; } } return true; } else { Sizzle.error("Syntax error, unrecognized expression: " + name); } }, CHILD: function (elem, match) { var type = match[1], node = elem; switch (type) { case "only": case "first": while ((node = node.previousSibling)) { if (node.nodeType === 1) { return false; } } if (type === "first") { return true; } node = elem; case "last": while ((node = node.nextSibling)) { if (node.nodeType === 1) { return false; } } return true; case "nth": var first = match[2], last = match[3]; if (first === 1 && last === 0) { return true; } var doneName = match[0], parent = elem.parentNode; if (parent && (parent.sizcache !== doneName || !elem.nodeIndex)) { var count = 0; for (node = parent.firstChild; node; node = node.nextSibling) { if (node.nodeType === 1) { node.nodeIndex = ++count; } } parent.sizcache = doneName; } var diff = elem.nodeIndex - last; if (first === 0) { return diff === 0; } else { return (diff % first === 0 && diff / first >= 0); } } }, ID: function (elem, match) { return elem.nodeType === 1 && elem.getAttribute("id") === match; }, TAG: function (elem, match) { return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match; }, CLASS: function (elem, match) { return (" " + (elem.className || elem.getAttribute("class")) + " ").indexOf(match) > -1; }, ATTR: function (elem, match) { var name = match[1], result = Expr.attrHandle[name] ? Expr.attrHandle[name](elem) : elem[name] != null ? elem[name] : elem.getAttribute(name), value = result + "", type = match[2], check = match[4]; return result == null ? type === "!=" : type === "=" ? value === check : type === "*=" ? value.indexOf(check) >= 0 : type === "~=" ? (" " + value + " ").indexOf(check) >= 0 : !check ? value && result !== false : type === "!=" ? value !== check : type === "^=" ? value.indexOf(check) === 0 : type === "$=" ? value.substr(value.length - check.length) === check : type === "|=" ? value === check || value.substr(0, check.length + 1) === check + "-" : false; }, POS: function (elem, match, i, array) { var name = match[2], filter = Expr.setFilters[name]; if (filter) { return filter(elem, i, match, array); } } } }; var origPOS = Expr.match.POS, fescape = function (all, num) { return "\\" + (num - 0 + 1); }; for (var type in Expr.match) { Expr.match[type] = new RegExp(Expr.match[type].source + (/(?![^\[]*\])(?![^\(]*\))/.source)); Expr.leftMatch[type] = new RegExp(/(^(?:.|\r|\n)*?)/.source + Expr.match[type].source.replace(/\\(\d+)/g, fescape)); } var makeArray = function (array, results) { array = Array.prototype.slice.call(array, 0); if (results) { results.push.apply(results, array); return results; } return array; }; try { Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType; } catch (e) { makeArray = function (array, results) { var i = 0, ret = results || []; if (toString.call(array) === "[object Array]") { Array.prototype.push.apply(ret, array); } else { if (typeof array.length === "number") { for (var l = array.length; i < l; i++) { ret.push(array[i]); } } else { for (; array[i]; i++) { ret.push(array[i]); } } } return ret; }; } var sortOrder, siblingCheck; if (document.documentElement.compareDocumentPosition) { sortOrder = function (a, b) { if (a === b) { hasDuplicate = true; return 0; } if (!a.compareDocumentPosition || !b.compareDocumentPosition) { return a.compareDocumentPosition ? -1 : 1; } return a.compareDocumentPosition(b) & 4 ? -1 : 1; }; } else { sortOrder = function (a, b) { var al, bl, ap = [], bp = [], aup = a.parentNode, bup = b.parentNode, cur = aup; if (a === b) { hasDuplicate = true; return 0; } else if (aup === bup) { return siblingCheck(a, b); } else if (!aup) { return -1; } else if (!bup) { return 1; } while (cur) { ap.unshift(cur); cur = cur.parentNode; } cur = bup; while (cur) { bp.unshift(cur); cur = cur.parentNode; } al = ap.length; bl = bp.length; for (var i = 0; i < al && i < bl; i++) { if (ap[i] !== bp[i]) { return siblingCheck(ap[i], bp[i]); } } return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1); }; siblingCheck = function (a, b, ret) { if (a === b) { return ret; } var cur = a.nextSibling; while (cur) { if (cur === b) { return -1; } cur = cur.nextSibling; } return 1; }; } Sizzle.getText = function (elems) { var ret = "", elem; for (var i = 0; elems[i]; i++) { elem = elems[i]; if (elem.nodeType === 3 || elem.nodeType === 4) { ret += elem.nodeValue; } else if (elem.nodeType !== 8) { ret += Sizzle.getText(elem.childNodes); } } return ret; }; (function () { var form = document.createElement("div"), id = "script" + (new Date()).getTime(), root = document.documentElement; form.innerHTML = "<a name='" + id + "'/>"; root.insertBefore(form, root.firstChild); if (document.getElementById(id)) { Expr.find.ID = function (match, context, isXML) { if (typeof context.getElementById !== "undefined" && !isXML) { var m = context.getElementById(match[1]); return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : []; } }; Expr.filter.ID = function (elem, match) { var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id"); return elem.nodeType === 1 && node && node.nodeValue === match; }; } root.removeChild(form); root = form = null; })(); (function () { var div = document.createElement("div"); div.appendChild(document.createComment("")); if (div.getElementsByTagName("*").length > 0) { Expr.find.TAG = function (match, context) { var results = context.getElementsByTagName(match[1]); if (match[1] === "*") { var tmp = []; for (var i = 0; results[i]; i++) { if (results[i].nodeType === 1) { tmp.push(results[i]); } } results = tmp; } return results; }; } div.innerHTML = "<a href='#'></a>"; if (div.firstChild && typeof div.firstChild.getAttribute !== "undefined" && div.firstChild.getAttribute("href") !== "#") { Expr.attrHandle.href = function (elem) { return elem.getAttribute("href", 2); }; } div = null; })(); if (document.querySelectorAll) { (function () { var oldSizzle = Sizzle, div = document.createElement("div"), id = "__sizzle__"; div.innerHTML = "<p class='TEST'></p>"; if (div.querySelectorAll && div.querySelectorAll(".TEST").length === 0) { return; } Sizzle = function (query, context, extra, seed) { context = context || document; query = query.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']"); if (!seed && !Sizzle.isXML(context)) { if (context.nodeType === 9) { try { return makeArray(context.querySelectorAll(query), extra); } catch (qsaError) { } } else if (context.nodeType === 1 && context.nodeName.toLowerCase() !== "object") { var old = context.getAttribute("id"), nid = old || id; if (!old) { context.setAttribute("id", nid); } try { return makeArray(context.querySelectorAll("#" + nid + " " + query), extra); } catch (pseudoError) { } finally { if (!old) { context.removeAttribute("id"); } } } } return oldSizzle(query, context, extra, seed); }; for (var prop in oldSizzle) { Sizzle[prop] = oldSizzle[prop]; } div = null; })(); } (function () { var html = document.documentElement, matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector, pseudoWorks = false; try { matches.call(document.documentElement, "[test!='']:sizzle"); } catch (pseudoError) { pseudoWorks = true; } if (matches) { Sizzle.matchesSelector = function (node, expr) { expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']"); if (!Sizzle.isXML(node)) { try { if (pseudoWorks || !Expr.match.PSEUDO.test(expr) && !/!=/.test(expr)) { return matches.call(node, expr); } } catch (e) { } } return Sizzle(expr, null, null, [node]).length > 0; }; } })(); (function () { var div = document.createElement("div"); div.innerHTML = "<div class='test e'></div><div class='test'></div>"; if (!div.getElementsByClassName || div.getElementsByClassName("e").length === 0) { return; } div.lastChild.className = "e"; if (div.getElementsByClassName("e").length === 1) { return; } Expr.order.splice(1, 0, "CLASS"); Expr.find.CLASS = function (match, context, isXML) { if (typeof context.getElementsByClassName !== "undefined" && !isXML) { return context.getElementsByClassName(match[1]); } }; div = null; })(); function dirNodeCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) { for (var i = 0, l = checkSet.length; i < l; i++) { var elem = checkSet[i]; if (elem) { var match = false; elem = elem[dir]; while (elem) { if (elem.sizcache === doneName) { match = checkSet[elem.sizset]; break; } if (elem.nodeType === 1 && !isXML) { elem.sizcache = doneName; elem.sizset = i; } if (elem.nodeName.toLowerCase() === cur) { match = elem; break; } elem = elem[dir]; } checkSet[i] = match; } } } function dirCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) { for (var i = 0, l = checkSet.length; i < l; i++) { var elem = checkSet[i]; if (elem) { var match = false; elem = elem[dir]; while (elem) { if (elem.sizcache === doneName) { match = checkSet[elem.sizset]; break; } if (elem.nodeType === 1) { if (!isXML) { elem.sizcache = doneName; elem.sizset = i; } if (typeof cur !== "string") { if (elem === cur) { match = true; break; } } else if (Sizzle.filter(cur, [elem]).length > 0) { match = elem; break; } } elem = elem[dir]; } checkSet[i] = match; } } } if (document.documentElement.contains) { Sizzle.contains = function (a, b) { return a !== b && (a.contains ? a.contains(b) : true); }; } else if (document.documentElement.compareDocumentPosition) { Sizzle.contains = function (a, b) { return !!(a.compareDocumentPosition(b) & 16); }; } else { Sizzle.contains = function () { return false; }; } Sizzle.isXML = function (elem) { var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement; return documentElement ? documentElement.nodeName !== "HTML" : false; }; var posProcess = function (selector, context) { var match, tmpSet = [], later = "", root = context.nodeType ? [context] : context; while ((match = Expr.match.PSEUDO.exec(selector))) { later += match[0]; selector = selector.replace(Expr.match.PSEUDO, ""); } selector = Expr.relative[selector] ? selector + "*" : selector; for (var i = 0, l = root.length; i < l; i++) { Sizzle(selector, root[i], tmpSet); } return Sizzle.filter(later, tmpSet); }; jQuery.find = Sizzle; jQuery.expr = Sizzle.selectors; jQuery.expr[":"] = jQuery.expr.filters; jQuery.unique = Sizzle.uniqueSort; jQuery.text = Sizzle.getText; jQuery.isXMLDoc = Sizzle.isXML; jQuery.contains = Sizzle.contains; })(); var runtil = /Until$/, rparentsprev = /^(?:parents|prevUntil|prevAll)/, rmultiselector = /,/, isSimple = /^.[^:#\[\.,]*$/, slice = Array.prototype.slice, POS = jQuery.expr.match.POS; jQuery.fn.extend({ find: function (selector) { var ret = this.pushStack("", "find", selector), length = 0; for (var i = 0, l = this.length; i < l; i++) { length = ret.length; jQuery.find(selector, this[i], ret); if (i > 0) { for (var n = length; n < ret.length; n++) { for (var r = 0; r < length; r++) { if (ret[r] === ret[n]) { ret.splice(n--, 1); break; } } } } } return ret; }, has: function (target) { var targets = jQuery(target); return this.filter(function () { for (var i = 0, l = targets.length; i < l; i++) { if (jQuery.contains(this, targets[i])) { return true; } } }); }, not: function (selector) { return this.pushStack(winnow(this, selector, false), "not", selector); }, filter: function (selector) { return this.pushStack(winnow(this, selector, true), "filter", selector); }, is: function (selector) { return !!selector && jQuery.filter(selector, this).length > 0; }, closest: function (selectors, context) { var ret = [], i, l, cur = this[0]; if (jQuery.isArray(selectors)) { var match, selector, matches = {}, level = 1; if (cur && selectors.length) { for (i = 0, l = selectors.length; i < l; i++) { selector = selectors[i]; if (!matches[selector]) { matches[selector] = jQuery.expr.match.POS.test(selector) ? jQuery(selector, context || this.context) : selector; } } while (cur && cur.ownerDocument && cur !== context) { for (selector in matches) { match = matches[selector]; if (match.jquery ? match.index(cur) > -1 : jQuery(cur).is(match)) { ret.push({ selector: selector, elem: cur, level: level }); } } cur = cur.parentNode; level++; } } return ret; } var pos = POS.test(selectors) ? jQuery(selectors, context || this.context) : null; for (i = 0, l = this.length; i < l; i++) { cur = this[i]; while (cur) { if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) { ret.push(cur); break; } else { cur = cur.parentNode; if (!cur || !cur.ownerDocument || cur === context) { break; } } } } ret = ret.length > 1 ? jQuery.unique(ret) : ret; return this.pushStack(ret, "closest", selectors); }, index: function (elem) { if (!elem || typeof elem === "string") { return jQuery.inArray(this[0], elem ? jQuery(elem) : this.parent().children()); } return jQuery.inArray(elem.jquery ? elem[0] : elem, this); }, add: function (selector, context) { var set = typeof selector === "string" ? jQuery(selector, context || this.context) : jQuery.makeArray(selector), all = jQuery.merge(this.get(), set); return this.pushStack(isDisconnected(set[0]) || isDisconnected(all[0]) ? all : jQuery.unique(all)); }, andSelf: function () { return this.add(this.prevObject); } }); function isDisconnected(node) { return !node || !node.parentNode || node.parentNode.nodeType === 11; } jQuery.each({ parent: function (elem) { var parent = elem.parentNode; return parent && parent.nodeType !== 11 ? parent : null; }, parents: function (elem) { return jQuery.dir(elem, "parentNode"); }, parentsUntil: function (elem, i, until) { return jQuery.dir(elem, "parentNode", until); }, next: function (elem) { return jQuery.nth(elem, 2, "nextSibling"); }, prev: function (elem) { return jQuery.nth(elem, 2, "previousSibling"); }, nextAll: function (elem) { return jQuery.dir(elem, "nextSibling"); }, prevAll: function (elem) { return jQuery.dir(elem, "previousSibling"); }, nextUntil: function (elem, i, until) { return jQuery.dir(elem, "nextSibling", until); }, prevUntil: function (elem, i, until) { return jQuery.dir(elem, "previousSibling", until); }, siblings: function (elem) { return jQuery.sibling(elem.parentNode.firstChild, elem); }, children: function (elem) { return jQuery.sibling(elem.firstChild); }, contents: function (elem) { return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.makeArray(elem.childNodes); } }, function (name, fn) { jQuery.fn[name] = function (until, selector) { var ret = jQuery.map(this, fn, until); if (!runtil.test(name)) { selector = until; } if (selector && typeof selector === "string") { ret = jQuery.filter(selector, ret); } ret = this.length > 1 ? jQuery.unique(ret) : ret; if ((this.length > 1 || rmultiselector.test(selector)) && rparentsprev.test(name)) { ret = ret.reverse(); } return this.pushStack(ret, name, slice.call(arguments).join(",")); }; }); jQuery.extend({ filter: function (expr, elems, not) { if (not) { expr = ":not(" + expr + ")"; } return elems.length === 1 ? jQuery.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] : jQuery.find.matches(expr, elems); }, dir: function (elem, dir, until) { var matched = [], cur = elem[dir]; while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) { if (cur.nodeType === 1) { matched.push(cur); } cur = cur[dir]; } return matched; }, nth: function (cur, result, dir, elem) { result = result || 1; var num = 0; for (; cur; cur = cur[dir]) { if (cur.nodeType === 1 && ++num === result) { break; } } return cur; }, sibling: function (n, elem) { var r = []; for (; n; n = n.nextSibling) { if (n.nodeType === 1 && n !== elem) { r.push(n); } } return r; } }); function winnow(elements, qualifier, keep) { if (jQuery.isFunction(qualifier)) { return jQuery.grep(elements, function (elem, i) { var retVal = !!qualifier.call(elem, i, elem); return retVal === keep; }); } else if (qualifier.nodeType) { return jQuery.grep(elements, function (elem, i) { return (elem === qualifier) === keep; }); } else if (typeof qualifier === "string") { var filtered = jQuery.grep(elements, function (elem) { return elem.nodeType === 1; }); if (isSimple.test(qualifier)) { return jQuery.filter(qualifier, filtered, !keep); } else { qualifier = jQuery.filter(qualifier, filtered); } } return jQuery.grep(elements, function (elem, i) { return (jQuery.inArray(elem, qualifier) >= 0) === keep; }); } var rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g, rleadingWhitespace = /^\s+/, rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, rtagName = /<([\w:]+)/, rtbody = /<tbody/i, rhtml = /<|&#?\w+;/, rnocache = /<(?:script|object|embed|option|style)/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, raction = /\=([^="'>\s]+\/)>/g, wrapMap = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area: [1, "<map>", "</map>"], _default: [0, "", ""] }; wrapMap.optgroup = wrapMap.option; wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead; wrapMap.th = wrapMap.td; if (!jQuery.support.htmlSerialize) { wrapMap._default = [1, "div<div>", "</div>"]; } jQuery.fn.extend({ text: function (text) { if (jQuery.isFunction(text)) { return this.each(function (i) { var self = jQuery(this); self.text(text.call(this, i, self.text())); }); } if (typeof text !== "object" && text !== undefined) { return this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(text)); } return jQuery.text(this); }, wrapAll: function (html) { if (jQuery.isFunction(html)) { return this.each(function (i) { jQuery(this).wrapAll(html.call(this, i)); }); } if (this[0]) { var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true); if (this[0].parentNode) { wrap.insertBefore(this[0]); } wrap.map(function () { var elem = this; while (elem.firstChild && elem.firstChild.nodeType === 1) { elem = elem.firstChild; } return elem; }).append(this); } return this; }, wrapInner: function (html) { if (jQuery.isFunction(html)) { return this.each(function (i) { jQuery(this).wrapInner(html.call(this, i)); }); } return this.each(function () { var self = jQuery(this), contents = self.contents(); if (contents.length) { contents.wrapAll(html); } else { self.append(html); } }); }, wrap: function (html) { return this.each(function () { jQuery(this).wrapAll(html); }); }, unwrap: function () { return this.parent().each(function () { if (!jQuery.nodeName(this, "body")) { jQuery(this).replaceWith(this.childNodes); } }).end(); }, append: function () { return this.domManip(arguments, true, function (elem) { if (this.nodeType === 1) { this.appendChild(elem); } }); }, prepend: function () { return this.domManip(arguments, true, function (elem) { if (this.nodeType === 1) { this.insertBefore(elem, this.firstChild); } }); }, before: function () { if (this[0] && this[0].parentNode) { return this.domManip(arguments, false, function (elem) { this.parentNode.insertBefore(elem, this); }); } else if (arguments.length) { var set = jQuery(arguments[0]); set.push.apply(set, this.toArray()); return this.pushStack(set, "before", arguments); } }, after: function () { if (this[0] && this[0].parentNode) { return this.domManip(arguments, false, function (elem) { this.parentNode.insertBefore(elem, this.nextSibling); }); } else if (arguments.length) { var set = this.pushStack(this, "after", arguments); set.push.apply(set, jQuery(arguments[0]).toArray()); return set; } }, remove: function (selector, keepData) { for (var i = 0, elem; (elem = this[i]) != null; i++) { if (!selector || jQuery.filter(selector, [elem]).length) { if (!keepData && elem.nodeType === 1) { jQuery.cleanData(elem.getElementsByTagName("*")); jQuery.cleanData([elem]); } if (elem.parentNode) { elem.parentNode.removeChild(elem); } } } return this; }, empty: function () { for (var i = 0, elem; (elem = this[i]) != null; i++) { if (elem.nodeType === 1) { jQuery.cleanData(elem.getElementsByTagName("*")); } while (elem.firstChild) { elem.removeChild(elem.firstChild); } } return this; }, clone: function (events) { var ret = this.map(function () { if (!jQuery.support.noCloneEvent && !jQuery.isXMLDoc(this)) { var html = this.outerHTML, ownerDocument = this.ownerDocument; if (!html) { var div = ownerDocument.createElement("div"); div.appendChild(this.cloneNode(true)); html = div.innerHTML; } return jQuery.clean([html.replace(rinlinejQuery, "").replace(raction, '="$1">').replace(rleadingWhitespace, "")], ownerDocument)[0]; } else { return this.cloneNode(true); } }); if (events === true) { cloneCopyEvent(this, ret); cloneCopyEvent(this.find("*"), ret.find("*")); } return ret; }, html: function (value) { if (value === undefined) { return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(rinlinejQuery, "") : null; } else if (typeof value === "string" && !rnocache.test(value) && (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) { value = value.replace(rxhtmlTag, "<$1></$2>"); try { for (var i = 0, l = this.length; i < l; i++) { if (this[i].nodeType === 1) { jQuery.cleanData(this[i].getElementsByTagName("*")); this[i].innerHTML = value; } } } catch (e) { this.empty().append(value); } } else if (jQuery.isFunction(value)) { this.each(function (i) { var self = jQuery(this); self.html(value.call(this, i, self.html())); }); } else { this.empty().append(value); } return this; }, replaceWith: function (value) { if (this[0] && this[0].parentNode) { if (jQuery.isFunction(value)) { return this.each(function (i) { var self = jQuery(this), old = self.html(); self.replaceWith(value.call(this, i, old)); }); } if (typeof value !== "string") { value = jQuery(value).detach(); } return this.each(function () { var next = this.nextSibling, parent = this.parentNode; jQuery(this).remove(); if (next) { jQuery(next).before(value); } else { jQuery(parent).append(value); } }); } else { return this.pushStack(jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value); } }, detach: function (selector) { return this.remove(selector, true); }, domManip: function (args, table, callback) { var results, first, fragment, parent, value = args[0], scripts = []; if (!jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test(value)) { return this.each(function () { jQuery(this).domManip(args, table, callback, true); }); } if (jQuery.isFunction(value)) { return this.each(function (i) { var self = jQuery(this); args[0] = value.call(this, i, table ? self.html() : undefined); self.domManip(args, table, callback); }); } if (this[0]) { parent = value && value.parentNode; if (jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length) { results = { fragment: parent }; } else { results = jQuery.buildFragment(args, this, scripts); } fragment = results.fragment; if (fragment.childNodes.length === 1) { first = fragment = fragment.firstChild; } else { first = fragment.firstChild; } if (first) { table = table && jQuery.nodeName(first, "tr"); for (var i = 0, l = this.length; i < l; i++) { callback.call(table ? root(this[i], first) : this[i], i > 0 || results.cacheable || this.length > 1 ? fragment.cloneNode(true) : fragment); } } if (scripts.length) { jQuery.each(scripts, evalScript); } } return this; } }); function root(elem, cur) { return jQuery.nodeName(elem, "table") ? (elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody"))) : elem; } function cloneCopyEvent(orig, ret) { var i = 0; ret.each(function () { if (this.nodeName !== (orig[i] && orig[i].nodeName)) { return; } var oldData = jQuery.data(orig[i++]), curData = jQuery.data(this, oldData), events = oldData && oldData.events; if (events) { delete curData.handle; curData.events = {}; for (var type in events) { for (var handler in events[type]) { jQuery.event.add(this, type, events[type][handler], events[type][handler].data); } } } }); } jQuery.buildFragment = function (args, nodes, scripts) { var fragment, cacheable, cacheresults, doc = (nodes && nodes[0] ? nodes[0].ownerDocument || nodes[0] : document); if (args.length === 1 && typeof args[0] === "string" && args[0].length < 512 && doc === document && !rnocache.test(args[0]) && (jQuery.support.checkClone || !rchecked.test(args[0]))) { cacheable = true; cacheresults = jQuery.fragments[args[0]]; if (cacheresults) { if (cacheresults !== 1) { fragment = cacheresults; } } } if (!fragment) { fragment = doc.createDocumentFragment(); jQuery.clean(args, doc, fragment, scripts); } if (cacheable) { jQuery.fragments[args[0]] = cacheresults ? fragment : 1; } return { fragment: fragment, cacheable: cacheable }; }; jQuery.fragments = {}; jQuery.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (name, original) { jQuery.fn[name] = function (selector) { var ret = [], insert = jQuery(selector), parent = this.length === 1 && this[0].parentNode; if (parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1) { insert[original](this[0]); return this; } else { for (var i = 0, l = insert.length; i < l; i++) { var elems = (i > 0 ? this.clone(true) : this).get(); jQuery(insert[i])[original](elems); ret = ret.concat(elems); } return this.pushStack(ret, name, insert.selector); } }; }); jQuery.extend({ clean: function (elems, context, fragment, scripts) { context = context || document; if (typeof context.createElement === "undefined") { context = context.ownerDocument || context[0] && context[0].ownerDocument || document; } var ret = []; for (var i = 0, elem; (elem = elems[i]) != null; i++) { if (typeof elem === "number") { elem += ""; } if (!elem) { continue; } if (typeof elem === "string" && !rhtml.test(elem)) { elem = context.createTextNode(elem); } else if (typeof elem === "string") { elem = elem.replace(rxhtmlTag, "<$1></$2>"); var tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(), wrap = wrapMap[tag] || wrapMap._default, depth = wrap[0], div = context.createElement("div"); div.innerHTML = wrap[1] + elem + wrap[2]; while (depth--) { div = div.lastChild; } if (!jQuery.support.tbody) { var hasBody = rtbody.test(elem), tbody = tag === "table" && !hasBody ? div.firstChild && div.firstChild.childNodes : wrap[1] === "<table>" && !hasBody ? div.childNodes : []; for (var j = tbody.length - 1; j >= 0; --j) { if (jQuery.nodeName(tbody[j], "tbody") && !tbody[j].childNodes.length) { tbody[j].parentNode.removeChild(tbody[j]); } } } if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)) { div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]), div.firstChild); } elem = div.childNodes; } if (elem.nodeType) { ret.push(elem); } else { ret = jQuery.merge(ret, elem); } } if (fragment) { for (i = 0; ret[i]; i++) { if (scripts && jQuery.nodeName(ret[i], "script") && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript")) { scripts.push(ret[i].parentNode ? ret[i].parentNode.removeChild(ret[i]) : ret[i]); } else { if (ret[i].nodeType === 1) { ret.splice.apply(ret, [i + 1, 0].concat(jQuery.makeArray(ret[i].getElementsByTagName("script")))); } fragment.appendChild(ret[i]); } } } return ret; }, cleanData: function (elems) { var data, id, cache = jQuery.cache, special = jQuery.event.special, deleteExpando = jQuery.support.deleteExpando; for (var i = 0, elem; (elem = elems[i]) != null; i++) { if (elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()]) { continue; } id = elem[jQuery.expando]; if (id) { data = cache[id]; if (data && data.events) { for (var type in data.events) { if (special[type]) { jQuery.event.remove(elem, type); } else { jQuery.removeEvent(elem, type, data.handle); } } } if (deleteExpando) { delete elem[jQuery.expando]; } else if (elem.removeAttribute) { elem.removeAttribute(jQuery.expando); } delete cache[id]; } } } }); function evalScript(i, elem) { if (elem.src) { jQuery.ajax({ url: elem.src, async: false, dataType: "script" }); } else { jQuery.globalEval(elem.text || elem.textContent || elem.innerHTML || ""); } if (elem.parentNode) { elem.parentNode.removeChild(elem); } } var ralpha = /alpha\([^)]*\)/i, ropacity = /opacity=([^)]*)/, rdashAlpha = /-([a-z])/ig, rupper = /([A-Z])/g, rnumpx = /^-?\d+(?:px)?$/i, rnum = /^-?\d/, cssShow = { position: "absolute", visibility: "hidden", display: "block" }, cssWidth = ["Left", "Right"], cssHeight = ["Top", "Bottom"], curCSS, getComputedStyle, currentStyle, fcamelCase = function (all, letter) { return letter.toUpperCase(); }; jQuery.fn.css = function (name, value) { if (arguments.length === 2 && value === undefined) { return this; } return jQuery.access(this, name, value, true, function (elem, name, value) { return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name); }); }; jQuery.extend({ cssHooks: { opacity: { get: function (elem, computed) { if (computed) { var ret = curCSS(elem, "opacity", "opacity"); return ret === "" ? "1" : ret; } else { return elem.style.opacity; } } } }, cssNumber: { "zIndex": true, "fontWeight": true, "opacity": true, "zoom": true, "lineHeight": true }, cssProps: { "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat" }, style: function (elem, name, value, extra) { if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) { return; } var ret, origName = jQuery.camelCase(name), style = elem.style, hooks = jQuery.cssHooks[origName]; name = jQuery.cssProps[origName] || origName; if (value !== undefined) { if (typeof value === "number" && isNaN(value) || value == null) { return; } if (typeof value === "number" && !jQuery.cssNumber[origName]) { value += "px"; } if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value)) !== undefined) { try { style[name] = value; } catch (e) { } } } else { if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) { return ret; } return style[name]; } }, css: function (elem, name, extra) { var ret, origName = jQuery.camelCase(name), hooks = jQuery.cssHooks[origName]; name = jQuery.cssProps[origName] || origName; if (hooks && "get" in hooks && (ret = hooks.get(elem, true, extra)) !== undefined) { return ret; } else if (curCSS) { return curCSS(elem, name, origName); } }, swap: function (elem, options, callback) { var old = {}; for (var name in options) { old[name] = elem.style[name]; elem.style[name] = options[name]; } callback.call(elem); for (name in options) { elem.style[name] = old[name]; } }, camelCase: function (string) { return string.replace(rdashAlpha, fcamelCase); } }); jQuery.curCSS = jQuery.css; jQuery.each(["height", "width"], function (i, name) { jQuery.cssHooks[name] = { get: function (elem, computed, extra) { var val; if (computed) { if (elem.offsetWidth !== 0) { val = getWH(elem, name, extra); } else { jQuery.swap(elem, cssShow, function () { val = getWH(elem, name, extra); }); } if (val <= 0) { val = curCSS(elem, name, name); if (val === "0px" && currentStyle) { val = currentStyle(elem, name, name); } if (val != null) { return val === "" || val === "auto" ? "0px" : val; } } if (val < 0 || val == null) { val = elem.style[name]; return val === "" || val === "auto" ? "0px" : val; } return typeof val === "string" ? val : val + "px"; } }, set: function (elem, value) { if (rnumpx.test(value)) { value = parseFloat(value); if (value >= 0) { return value + "px"; } } else { return value; } } }; }); if (!jQuery.support.opacity) { jQuery.cssHooks.opacity = { get: function (elem, computed) { return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? (parseFloat(RegExp.$1) / 100) + "" : computed ? "1" : ""; }, set: function (elem, value) { var style = elem.style; style.zoom = 1; var opacity = jQuery.isNaN(value) ? "" : "alpha(opacity=" + value * 100 + ")", filter = style.filter || ""; style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : style.filter + ' ' + opacity; } }; } if (document.defaultView && document.defaultView.getComputedStyle) { getComputedStyle = function (elem, newName, name) { var ret, defaultView, computedStyle; name = name.replace(rupper, "-$1").toLowerCase(); if (!(defaultView = elem.ownerDocument.defaultView)) { return undefined; } if ((computedStyle = defaultView.getComputedStyle(elem, null))) { ret = computedStyle.getPropertyValue(name); if (ret === "" && !jQuery.contains(elem.ownerDocument.documentElement, elem)) { ret = jQuery.style(elem, name); } } return ret; }; } if (document.documentElement.currentStyle) { currentStyle = function (elem, name) { var left, rsLeft, ret = elem.currentStyle && elem.currentStyle[name], style = elem.style; if (!rnumpx.test(ret) && rnum.test(ret)) { left = style.left; rsLeft = elem.runtimeStyle.left; elem.runtimeStyle.left = elem.currentStyle.left; style.left = name === "fontSize" ? "1em" : (ret || 0); ret = style.pixelLeft + "px"; style.left = left; elem.runtimeStyle.left = rsLeft; } return ret === "" ? "auto" : ret; }; } curCSS = getComputedStyle || currentStyle; function getWH(elem, name, extra) { var which = name === "width" ? cssWidth : cssHeight, val = name === "width" ? elem.offsetWidth : elem.offsetHeight; if (extra === "border") { return val; } jQuery.each(which, function () { if (!extra) { val -= parseFloat(jQuery.css(elem, "padding" + this)) || 0; } if (extra === "margin") { val += parseFloat(jQuery.css(elem, "margin" + this)) || 0; } else { val -= parseFloat(jQuery.css(elem, "border" + this + "Width")) || 0; } }); return val; } if (jQuery.expr && jQuery.expr.filters) { jQuery.expr.filters.hidden = function (elem) { var width = elem.offsetWidth, height = elem.offsetHeight; return (width === 0 && height === 0) || (!jQuery.support.reliableHiddenOffsets && (elem.style.display || jQuery.css(elem, "display")) === "none"); }; jQuery.expr.filters.visible = function (elem) { return !jQuery.expr.filters.hidden(elem); }; } var jsc = jQuery.now(), rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, rselectTextarea = /^(?:select|textarea)/i, rinput = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, rnoContent = /^(?:GET|HEAD)$/, rbracket = /\[\]$/, jsre = /\=\?(&|$)/, rquery = /\?/, rts = /([?&])_=[^&]*/, rurl = /^(\w+:)?\/\/([^\/?#]+)/, r20 = /%20/g, rhash = /#.*$/, _load = jQuery.fn.load; jQuery.fn.extend({ load: function (url, params, callback) { if (typeof url !== "string" && _load) { return _load.apply(this, arguments); } else if (!this.length) { return this; } var off = url.indexOf(" "); if (off >= 0) { var selector = url.slice(off, url.length); url = url.slice(0, off); } var type = "GET"; if (params) { if (jQuery.isFunction(params)) { callback = params; params = null; } else if (typeof params === "object") { params = jQuery.param(params, jQuery.ajaxSettings.traditional); type = "POST"; } } var self = this; jQuery.ajax({ url: url, type: type, dataType: "html", data: params, complete: function (res, status) { if (status === "success" || status === "notmodified") { self.html(selector ? jQuery("<div>").append(res.responseText.replace(rscript, "")).find(selector) : res.responseText); } if (callback) { self.each(callback, [res.responseText, status, res]); } } }); return this; }, serialize: function () { return jQuery.param(this.serializeArray()); }, serializeArray: function () { return this.map(function () { return this.elements ? jQuery.makeArray(this.elements) : this; }).filter(function () { return this.name && !this.disabled && (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type)); }).map(function (i, elem) { var val = jQuery(this).val(); return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val, i) { return { name: elem.name, value: val }; }) : { name: elem.name, value: val }; }).get(); } }); jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (i, o) { jQuery.fn[o] = function (f) { return this.bind(o, f); }; }); jQuery.extend({ get: function (url, data, callback, type) { if (jQuery.isFunction(data)) { type = type || callback; callback = data; data = null; } return jQuery.ajax({ type: "GET", url: url, data: data, success: callback, dataType: type }); }, getScript: function (url, callback) { return jQuery.get(url, null, callback, "script"); }, getJSON: function (url, data, callback) { return jQuery.get(url, data, callback, "json"); }, post: function (url, data, callback, type) { if (jQuery.isFunction(data)) { type = type || callback; callback = data; data = {}; } return jQuery.ajax({ type: "POST", url: url, data: data, success: callback, dataType: type }); }, ajaxSetup: function (settings) { jQuery.extend(jQuery.ajaxSettings, settings); }, ajaxSettings: { url: location.href, global: true, type: "GET", contentType: "application/x-www-form-urlencoded", processData: true, async: true, xhr: function () { return new window.XMLHttpRequest(); }, accepts: { xml: "application/xml, text/xml", html: "text/html", script: "text/javascript, application/javascript", json: "application/json, text/javascript", text: "text/plain", _default: "*/*"} }, ajax: function (origSettings) { var s = jQuery.extend(true, {}, jQuery.ajaxSettings, origSettings), jsonp, status, data, type = s.type.toUpperCase(), noContent = rnoContent.test(type); s.url = s.url.replace(rhash, ""); s.context = origSettings && origSettings.context != null ? origSettings.context : s; if (s.data && s.processData && typeof s.data !== "string") { s.data = jQuery.param(s.data, s.traditional); } if (s.dataType === "jsonp") { if (type === "GET") { if (!jsre.test(s.url)) { s.url += (rquery.test(s.url) ? "&" : "?") + (s.jsonp || "callback") + "=?"; } } else if (!s.data || !jsre.test(s.data)) { s.data = (s.data ? s.data + "&" : "") + (s.jsonp || "callback") + "=?"; } s.dataType = "json"; } if (s.dataType === "json" && (s.data && jsre.test(s.data) || jsre.test(s.url))) { jsonp = s.jsonpCallback || ("jsonp" + jsc++); if (s.data) { s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1"); } s.url = s.url.replace(jsre, "=" + jsonp + "$1"); s.dataType = "script"; var customJsonp = window[jsonp]; window[jsonp] = function (tmp) { if (jQuery.isFunction(customJsonp)) { customJsonp(tmp); } else { window[jsonp] = undefined; try { delete window[jsonp]; } catch (jsonpError) { } } data = tmp; jQuery.handleSuccess(s, xhr, status, data); jQuery.handleComplete(s, xhr, status, data); if (head) { head.removeChild(script); } }; } if (s.dataType === "script" && s.cache === null) { s.cache = false; } if (s.cache === false && noContent) { var ts = jQuery.now(); var ret = s.url.replace(rts, "$1_=" + ts); s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : ""); } if (s.data && noContent) { s.url += (rquery.test(s.url) ? "&" : "?") + s.data; } if (s.global && jQuery.active++ === 0) { jQuery.event.trigger("ajaxStart"); } var parts = rurl.exec(s.url), remote = parts && (parts[1] && parts[1].toLowerCase() !== location.protocol || parts[2].toLowerCase() !== location.host); if (s.dataType === "script" && type === "GET" && remote) { var head = document.getElementsByTagName("head")[0] || document.documentElement; var script = document.createElement("script"); if (s.scriptCharset) { script.charset = s.scriptCharset; } script.src = s.url; if (!jsonp) { var done = false; script.onload = script.onreadystatechange = function () { if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) { done = true; jQuery.handleSuccess(s, xhr, status, data); jQuery.handleComplete(s, xhr, status, data); script.onload = script.onreadystatechange = null; if (head && script.parentNode) { head.removeChild(script); } } }; } head.insertBefore(script, head.firstChild); return undefined; } var requestDone = false; var xhr = s.xhr(); if (!xhr) { return; } if (s.username) { xhr.open(type, s.url, s.async, s.username, s.password); } else { xhr.open(type, s.url, s.async); } try { if ((s.data != null && !noContent) || (origSettings && origSettings.contentType)) { xhr.setRequestHeader("Content-Type", s.contentType); } if (s.ifModified) { if (jQuery.lastModified[s.url]) { xhr.setRequestHeader("If-Modified-Since", jQuery.lastModified[s.url]); } if (jQuery.etag[s.url]) { xhr.setRequestHeader("If-None-Match", jQuery.etag[s.url]); } } if (!remote) { xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"); } xhr.setRequestHeader("Accept", s.dataType && s.accepts[s.dataType] ? s.accepts[s.dataType] + ", */*; q=0.01" : s.accepts._default); } catch (headerError) { } if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) { if (s.global && jQuery.active-- === 1) { jQuery.event.trigger("ajaxStop"); } xhr.abort(); return false; } if (s.global) { jQuery.triggerGlobal(s, "ajaxSend", [xhr, s]); } var onreadystatechange = xhr.onreadystatechange = function (isTimeout) { if (!xhr || xhr.readyState === 0 || isTimeout === "abort") { if (!requestDone) { jQuery.handleComplete(s, xhr, status, data); } requestDone = true; if (xhr) { xhr.onreadystatechange = jQuery.noop; } } else if (!requestDone && xhr && (xhr.readyState === 4 || isTimeout === "timeout")) { requestDone = true; xhr.onreadystatechange = jQuery.noop; status = isTimeout === "timeout" ? "timeout" : !jQuery.httpSuccess(xhr) ? "error" : s.ifModified && jQuery.httpNotModified(xhr, s.url) ? "notmodified" : "success"; var errMsg; if (status === "success") { try { data = jQuery.httpData(xhr, s.dataType, s); } catch (parserError) { status = "parsererror"; errMsg = parserError; } } if (status === "success" || status === "notmodified") { if (!jsonp) { jQuery.handleSuccess(s, xhr, status, data); } } else { jQuery.handleError(s, xhr, status, errMsg); } if (!jsonp) { jQuery.handleComplete(s, xhr, status, data); } if (isTimeout === "timeout") { xhr.abort(); } if (s.async) { xhr = null; } } }; try { var oldAbort = xhr.abort; xhr.abort = function () { if (xhr) { Function.prototype.call.call(oldAbort, xhr); } onreadystatechange("abort"); }; } catch (abortError) { } if (s.async && s.timeout > 0) { setTimeout(function () { if (xhr && !requestDone) { onreadystatechange("timeout"); } }, s.timeout); } try { xhr.send(noContent || s.data == null ? null : s.data); } catch (sendError) { jQuery.handleError(s, xhr, null, sendError); jQuery.handleComplete(s, xhr, status, data); } if (!s.async) { onreadystatechange(); } return xhr; }, param: function (a, traditional) { var s = [], add = function (key, value) { value = jQuery.isFunction(value) ? value() : value; s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value); }; if (traditional === undefined) { traditional = jQuery.ajaxSettings.traditional; } if (jQuery.isArray(a) || a.jquery) { jQuery.each(a, function () { add(this.name, this.value); }); } else { for (var prefix in a) { buildParams(prefix, a[prefix], traditional, add); } } return s.join("&").replace(r20, "+"); } }); function buildParams(prefix, obj, traditional, add) { if (jQuery.isArray(obj) && obj.length) { jQuery.each(obj, function (i, v) { if (traditional || rbracket.test(prefix)) { add(prefix, v); } else { buildParams(prefix + "[" + (typeof v === "object" || jQuery.isArray(v) ? i : "") + "]", v, traditional, add); } }); } else if (!traditional && obj != null && typeof obj === "object") { if (jQuery.isEmptyObject(obj)) { add(prefix, ""); } else { jQuery.each(obj, function (k, v) { buildParams(prefix + "[" + k + "]", v, traditional, add); }); } } else { add(prefix, obj); } } jQuery.extend({ active: 0, lastModified: {}, etag: {}, handleError: function (s, xhr, status, e) { if (s.error) { s.error.call(s.context, xhr, status, e); } if (s.global) { jQuery.triggerGlobal(s, "ajaxError", [xhr, s, e]); } }, handleSuccess: function (s, xhr, status, data) { if (s.success) { s.success.call(s.context, data, status, xhr); } if (s.global) { jQuery.triggerGlobal(s, "ajaxSuccess", [xhr, s]); } }, handleComplete: function (s, xhr, status) { if (s.complete) { s.complete.call(s.context, xhr, status); } if (s.global) { jQuery.triggerGlobal(s, "ajaxComplete", [xhr, s]); } if (s.global && jQuery.active-- === 1) { jQuery.event.trigger("ajaxStop"); } }, triggerGlobal: function (s, type, args) { (s.context && s.context.url == null ? jQuery(s.context) : jQuery.event).trigger(type, args); }, httpSuccess: function (xhr) { try { return !xhr.status && location.protocol === "file:" || xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 || xhr.status === 1223; } catch (e) { } return false; }, httpNotModified: function (xhr, url) { var lastModified = xhr.getResponseHeader("Last-Modified"), etag = xhr.getResponseHeader("Etag"); if (lastModified) { jQuery.lastModified[url] = lastModified; } if (etag) { jQuery.etag[url] = etag; } return xhr.status === 304; }, httpData: function (xhr, type, s) { var ct = xhr.getResponseHeader("content-type") || "", xml = type === "xml" || !type && ct.indexOf("xml") >= 0, data = xml ? xhr.responseXML : xhr.responseText; if (xml && data.documentElement.nodeName === "parsererror") { jQuery.error("parsererror"); } if (s && s.dataFilter) { data = s.dataFilter(data, type); } if (typeof data === "string") { if (type === "json" || !type && ct.indexOf("json") >= 0) { data = jQuery.parseJSON(data); } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) { jQuery.globalEval(data); } } return data; } }); if (window.ActiveXObject) { jQuery.ajaxSettings.xhr = function () { if (window.location.protocol !== "file:") { try { return new window.XMLHttpRequest(); } catch (xhrError) { } } try { return new window.ActiveXObject("Microsoft.XMLHTTP"); } catch (activeError) { } }; } jQuery.support.ajax = !!jQuery.ajaxSettings.xhr(); var elemdisplay = {}, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = /^([+\-]=)?([\d+.\-]+)(.*)$/, timerId, fxAttrs = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]]; jQuery.fn.extend({ show: function (speed, easing, callback) { var elem, display; if (speed || speed === 0) { return this.animate(genFx("show", 3), speed, easing, callback); } else { for (var i = 0, j = this.length; i < j; i++) { elem = this[i]; display = elem.style.display; if (!jQuery.data(elem, "olddisplay") && display === "none") { display = elem.style.display = ""; } if (display === "" && jQuery.css(elem, "display") === "none") { jQuery.data(elem, "olddisplay", defaultDisplay(elem.nodeName)); } } for (i = 0; i < j; i++) { elem = this[i]; display = elem.style.display; if (display === "" || display === "none") { elem.style.display = jQuery.data(elem, "olddisplay") || ""; } } return this; } }, hide: function (speed, easing, callback) { if (speed || speed === 0) { return this.animate(genFx("hide", 3), speed, easing, callback); } else { for (var i = 0, j = this.length; i < j; i++) { var display = jQuery.css(this[i], "display"); if (display !== "none") { jQuery.data(this[i], "olddisplay", display); } } for (i = 0; i < j; i++) { this[i].style.display = "none"; } return this; } }, _toggle: jQuery.fn.toggle, toggle: function (fn, fn2, callback) { var bool = typeof fn === "boolean"; if (jQuery.isFunction(fn) && jQuery.isFunction(fn2)) { this._toggle.apply(this, arguments); } else if (fn == null || bool) { this.each(function () { var state = bool ? fn : jQuery(this).is(":hidden"); jQuery(this)[state ? "show" : "hide"](); }); } else { this.animate(genFx("toggle", 3), fn, fn2, callback); } return this; }, fadeTo: function (speed, to, easing, callback) { return this.filter(":hidden").css("opacity", 0).show().end().animate({ opacity: to }, speed, easing, callback); }, animate: function (prop, speed, easing, callback) { var optall = jQuery.speed(speed, easing, callback); if (jQuery.isEmptyObject(prop)) { return this.each(optall.complete); } return this[optall.queue === false ? "each" : "queue"](function () { var opt = jQuery.extend({}, optall), p, isElement = this.nodeType === 1, hidden = isElement && jQuery(this).is(":hidden"), self = this; for (p in prop) { var name = jQuery.camelCase(p); if (p !== name) { prop[name] = prop[p]; delete prop[p]; p = name; } if (prop[p] === "hide" && hidden || prop[p] === "show" && !hidden) { return opt.complete.call(this); } if (isElement && (p === "height" || p === "width")) { opt.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY]; if (jQuery.css(this, "display") === "inline" && jQuery.css(this, "float") === "none") { if (!jQuery.support.inlineBlockNeedsLayout) { this.style.display = "inline-block"; } else { var display = defaultDisplay(this.nodeName); if (display === "inline") { this.style.display = "inline-block"; } else { this.style.display = "inline"; this.style.zoom = 1; } } } } if (jQuery.isArray(prop[p])) { (opt.specialEasing = opt.specialEasing || {})[p] = prop[p][1]; prop[p] = prop[p][0]; } } if (opt.overflow != null) { this.style.overflow = "hidden"; } opt.curAnim = jQuery.extend({}, prop); jQuery.each(prop, function (name, val) { var e = new jQuery.fx(self, opt, name); if (rfxtypes.test(val)) { e[val === "toggle" ? hidden ? "show" : "hide" : val](prop); } else { var parts = rfxnum.exec(val), start = e.cur() || 0; if (parts) { var end = parseFloat(parts[2]), unit = parts[3] || "px"; if (unit !== "px") { jQuery.style(self, name, (end || 1) + unit); start = ((end || 1) / e.cur()) * start; jQuery.style(self, name, start + unit); } if (parts[1]) { end = ((parts[1] === "-=" ? -1 : 1) * end) + start; } e.custom(start, end, unit); } else { e.custom(start, val, ""); } } }); return true; }); }, stop: function (clearQueue, gotoEnd) { var timers = jQuery.timers; if (clearQueue) { this.queue([]); } this.each(function () { for (var i = timers.length - 1; i >= 0; i--) { if (timers[i].elem === this) { if (gotoEnd) { timers[i](true); } timers.splice(i, 1); } } }); if (!gotoEnd) { this.dequeue(); } return this; } }); function genFx(type, num) { var obj = {}; jQuery.each(fxAttrs.concat.apply([], fxAttrs.slice(0, num)), function () { obj[this] = type; }); return obj; } jQuery.each({ slideDown: genFx("show", 1), slideUp: genFx("hide", 1), slideToggle: genFx("toggle", 1), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle"} }, function (name, props) { jQuery.fn[name] = function (speed, easing, callback) { return this.animate(props, speed, easing, callback); }; }); jQuery.extend({ speed: function (speed, easing, fn) { var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : { complete: fn || !fn && easing || jQuery.isFunction(speed) && speed, duration: speed, easing: fn && easing || easing && !jQuery.isFunction(easing) && easing }; opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default; opt.old = opt.complete; opt.complete = function () { if (opt.queue !== false) { jQuery(this).dequeue(); } if (jQuery.isFunction(opt.old)) { opt.old.call(this); } }; return opt; }, easing: { linear: function (p, n, firstNum, diff) { return firstNum + diff * p; }, swing: function (p, n, firstNum, diff) { return ((-Math.cos(p * Math.PI) / 2) + 0.5) * diff + firstNum; } }, timers: [], fx: function (elem, options, prop) { this.options = options; this.elem = elem; this.prop = prop; if (!options.orig) { options.orig = {}; } } }); jQuery.fx.prototype = { update: function () { if (this.options.step) { this.options.step.call(this.elem, this.now, this); } (jQuery.fx.step[this.prop] || jQuery.fx.step._default)(this); }, cur: function () { if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) { return this.elem[this.prop]; } var r = parseFloat(jQuery.css(this.elem, this.prop)); return r && r > -10000 ? r : 0; }, custom: function (from, to, unit) { var self = this, fx = jQuery.fx; this.startTime = jQuery.now(); this.start = from; this.end = to; this.unit = unit || this.unit || "px"; this.now = this.start; this.pos = this.state = 0; function t(gotoEnd) { return self.step(gotoEnd); } t.elem = this.elem; if (t() && jQuery.timers.push(t) && !timerId) { timerId = setInterval(fx.tick, fx.interval); } }, show: function () { this.options.orig[this.prop] = jQuery.style(this.elem, this.prop); this.options.show = true; this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()); jQuery(this.elem).show(); }, hide: function () { this.options.orig[this.prop] = jQuery.style(this.elem, this.prop); this.options.hide = true; this.custom(this.cur(), 0); }, step: function (gotoEnd) { var t = jQuery.now(), done = true; if (gotoEnd || t >= this.options.duration + this.startTime) { this.now = this.end; this.pos = this.state = 1; this.update(); this.options.curAnim[this.prop] = true; for (var i in this.options.curAnim) { if (this.options.curAnim[i] !== true) { done = false; } } if (done) { if (this.options.overflow != null && !jQuery.support.shrinkWrapBlocks) { var elem = this.elem, options = this.options; jQuery.each(["", "X", "Y"], function (index, value) { elem.style["overflow" + value] = options.overflow[index]; }); } if (this.options.hide) { jQuery(this.elem).hide(); } if (this.options.hide || this.options.show) { for (var p in this.options.curAnim) { jQuery.style(this.elem, p, this.options.orig[p]); } } this.options.complete.call(this.elem); } return false; } else { var n = t - this.startTime; this.state = n / this.options.duration; var specialEasing = this.options.specialEasing && this.options.specialEasing[this.prop]; var defaultEasing = this.options.easing || (jQuery.easing.swing ? "swing" : "linear"); this.pos = jQuery.easing[specialEasing || defaultEasing](this.state, n, 0, 1, this.options.duration); this.now = this.start + ((this.end - this.start) * this.pos); this.update(); } return true; } }; jQuery.extend(jQuery.fx, { tick: function () { var timers = jQuery.timers; for (var i = 0; i < timers.length; i++) { if (!timers[i]()) { timers.splice(i--, 1); } } if (!timers.length) { jQuery.fx.stop(); } }, interval: 13, stop: function () { clearInterval(timerId); timerId = null; }, speeds: { slow: 600, fast: 200, _default: 400 }, step: { opacity: function (fx) { jQuery.style(fx.elem, "opacity", fx.now); }, _default: function (fx) { if (fx.elem.style && fx.elem.style[fx.prop] != null) { fx.elem.style[fx.prop] = (fx.prop === "width" || fx.prop === "height" ? Math.max(0, fx.now) : fx.now) + fx.unit; } else { fx.elem[fx.prop] = fx.now; } } } }); if (jQuery.expr && jQuery.expr.filters) { jQuery.expr.filters.animated = function (elem) { return jQuery.grep(jQuery.timers, function (fn) { return elem === fn.elem; }).length; }; } function defaultDisplay(nodeName) { if (!elemdisplay[nodeName]) { var elem = jQuery("<" + nodeName + ">").appendTo("body"), display = elem.css("display"); elem.remove(); if (display === "none" || display === "") { display = "block"; } elemdisplay[nodeName] = display; } return elemdisplay[nodeName]; } var rtable = /^t(?:able|d|h)$/i, rroot = /^(?:body|html)$/i; if ("getBoundingClientRect" in document.documentElement) { jQuery.fn.offset = function (options) { var elem = this[0], box; if (options) { return this.each(function (i) { jQuery.offset.setOffset(this, options, i); }); } if (!elem || !elem.ownerDocument) { return null; } if (elem === elem.ownerDocument.body) { return jQuery.offset.bodyOffset(elem); } try { box = elem.getBoundingClientRect(); } catch (e) { } var doc = elem.ownerDocument, docElem = doc.documentElement; if (!box || !jQuery.contains(docElem, elem)) { return box || { top: 0, left: 0 }; } var body = doc.body, win = getWindow(doc), clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0, scrollTop = (win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop || body.scrollTop), scrollLeft = (win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft), top = box.top + scrollTop - clientTop, left = box.left + scrollLeft - clientLeft; return { top: top, left: left }; }; } else { jQuery.fn.offset = function (options) { var elem = this[0]; if (options) { return this.each(function (i) { jQuery.offset.setOffset(this, options, i); }); } if (!elem || !elem.ownerDocument) { return null; } if (elem === elem.ownerDocument.body) { return jQuery.offset.bodyOffset(elem); } jQuery.offset.initialize(); var computedStyle, offsetParent = elem.offsetParent, prevOffsetParent = elem, doc = elem.ownerDocument, docElem = doc.documentElement, body = doc.body, defaultView = doc.defaultView, prevComputedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle, top = elem.offsetTop, left = elem.offsetLeft; while ((elem = elem.parentNode) && elem !== body && elem !== docElem) { if (jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed") { break; } computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle; top -= elem.scrollTop; left -= elem.scrollLeft; if (elem === offsetParent) { top += elem.offsetTop; left += elem.offsetLeft; if (jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && rtable.test(elem.nodeName))) { top += parseFloat(computedStyle.borderTopWidth) || 0; left += parseFloat(computedStyle.borderLeftWidth) || 0; } prevOffsetParent = offsetParent; offsetParent = elem.offsetParent; } if (jQuery.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible") { top += parseFloat(computedStyle.borderTopWidth) || 0; left += parseFloat(computedStyle.borderLeftWidth) || 0; } prevComputedStyle = computedStyle; } if (prevComputedStyle.position === "relative" || prevComputedStyle.position === "static") { top += body.offsetTop; left += body.offsetLeft; } if (jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed") { top += Math.max(docElem.scrollTop, body.scrollTop); left += Math.max(docElem.scrollLeft, body.scrollLeft); } return { top: top, left: left }; }; } jQuery.offset = { initialize: function () { var body = document.body, container = document.createElement("div"), innerDiv, checkDiv, table, td, bodyMarginTop = parseFloat(jQuery.css(body, "marginTop")) || 0, html = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>"; jQuery.extend(container.style, { position: "absolute", top: 0, left: 0, margin: 0, border: 0, width: "1px", height: "1px", visibility: "hidden" }); container.innerHTML = html; body.insertBefore(container, body.firstChild); innerDiv = container.firstChild; checkDiv = innerDiv.firstChild; td = innerDiv.nextSibling.firstChild.firstChild; this.doesNotAddBorder = (checkDiv.offsetTop !== 5); this.doesAddBorderForTableAndCells = (td.offsetTop === 5); checkDiv.style.position = "fixed"; checkDiv.style.top = "20px"; this.supportsFixedPosition = (checkDiv.offsetTop === 20 || checkDiv.offsetTop === 15); checkDiv.style.position = checkDiv.style.top = ""; innerDiv.style.overflow = "hidden"; innerDiv.style.position = "relative"; this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5); this.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== bodyMarginTop); body.removeChild(container); body = container = innerDiv = checkDiv = table = td = null; jQuery.offset.initialize = jQuery.noop; }, bodyOffset: function (body) { var top = body.offsetTop, left = body.offsetLeft; jQuery.offset.initialize(); if (jQuery.offset.doesNotIncludeMarginInBodyOffset) { top += parseFloat(jQuery.css(body, "marginTop")) || 0; left += parseFloat(jQuery.css(body, "marginLeft")) || 0; } return { top: top, left: left }; }, setOffset: function (elem, options, i) { var position = jQuery.css(elem, "position"); if (position === "static") { elem.style.position = "relative"; } var curElem = jQuery(elem), curOffset = curElem.offset(), curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = (position === "absolute" && jQuery.inArray('auto', [curCSSTop, curCSSLeft]) > -1), props = {}, curPosition = {}, curTop, curLeft; if (calculatePosition) { curPosition = curElem.position(); } curTop = calculatePosition ? curPosition.top : parseInt(curCSSTop, 10) || 0; curLeft = calculatePosition ? curPosition.left : parseInt(curCSSLeft, 10) || 0; if (jQuery.isFunction(options)) { options = options.call(elem, i, curOffset); } if (options.top != null) { props.top = (options.top - curOffset.top) + curTop; } if (options.left != null) { props.left = (options.left - curOffset.left) + curLeft; } if ("using" in options) { options.using.call(elem, props); } else { curElem.css(props); } } }; jQuery.fn.extend({ position: function () { if (!this[0]) { return null; } var elem = this[0], offsetParent = this.offsetParent(), offset = this.offset(), parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0} : offsetParent.offset(); offset.top -= parseFloat(jQuery.css(elem, "marginTop")) || 0; offset.left -= parseFloat(jQuery.css(elem, "marginLeft")) || 0; parentOffset.top += parseFloat(jQuery.css(offsetParent[0], "borderTopWidth")) || 0; parentOffset.left += parseFloat(jQuery.css(offsetParent[0], "borderLeftWidth")) || 0; return { top: offset.top - parentOffset.top, left: offset.left - parentOffset.left }; }, offsetParent: function () { return this.map(function () { var offsetParent = this.offsetParent || document.body; while (offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static")) { offsetParent = offsetParent.offsetParent; } return offsetParent; }); } }); jQuery.each(["Left", "Top"], function (i, name) { var method = "scroll" + name; jQuery.fn[method] = function (val) { var elem = this[0], win; if (!elem) { return null; } if (val !== undefined) { return this.each(function () { win = getWindow(this); if (win) { win.scrollTo(!i ? val : jQuery(win).scrollLeft(), i ? val : jQuery(win).scrollTop()); } else { this[method] = val; } }); } else { win = getWindow(elem); return win ? ("pageXOffset" in win) ? win[i ? "pageYOffset" : "pageXOffset"] : jQuery.support.boxModel && win.document.documentElement[method] || win.document.body[method] : elem[method]; } }; }); function getWindow(elem) { return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false; } jQuery.each(["Height", "Width"], function (i, name) { var type = name.toLowerCase(); jQuery.fn["inner" + name] = function () { return this[0] ? parseFloat(jQuery.css(this[0], type, "padding")) : null; }; jQuery.fn["outer" + name] = function (margin) { return this[0] ? parseFloat(jQuery.css(this[0], type, margin ? "margin" : "border")) : null; }; jQuery.fn[type] = function (size) { var elem = this[0]; if (!elem) { return size == null ? null : this; } if (jQuery.isFunction(size)) { return this.each(function (i) { var self = jQuery(this); self[type](size.call(this, i, self[type]())); }); } if (jQuery.isWindow(elem)) { return elem.document.compatMode === "CSS1Compat" && elem.document.documentElement["client" + name] || elem.document.body["client" + name]; } else if (elem.nodeType === 9) { return Math.max(elem.documentElement["client" + name], elem.body["scroll" + name], elem.documentElement["scroll" + name], elem.body["offset" + name], elem.documentElement["offset" + name]); } else if (size === undefined) { var orig = jQuery.css(elem, type), ret = parseFloat(orig); return jQuery.isNaN(ret) ? orig : ret; } else { return this.css(type, typeof size === "string" ? size : size + "px"); } }; });
})(window);
// End JQuery definition

// Application definitions
var AppSettings = {
    version: '2.10b',
    src: 'http://userscripts.org/scripts/show/84328',
    appColor: '#FFFFE0',    // light yellow
    foundGiftColor: '#DDDDDD', // light grey
    clickedGiftColor: '#A0FFA0', // light green

    requestMode: '',

    langCode: '',
    bgcolor_from: '',
    bgcolor_to: '',
    textcolor:'',
    maxtabs:'',
    useIFrame: '',
    useIFrameTimeout: '',
    IFrameTimeout: ''
};


// start storage functionality
var Storage = {
    // save a value by name
    setValue: function (name, value) {
        localStorage.setItem(name, value);
    },

    // load a value by name
    getValue: function (name) {
        return localStorage.getItem(name);
    },

    // delete a value by name
    deleteValue: function (name) {
        localStorage.removeItem(name);
    },

    // delete all values
    clear: function () {
        localStorage.clear();
    }
}
// end Cookie functionality

// Giftobj
function Gift() {
    this.url    = 'none';
    this.newUrl = '';
    this.senderName = 'noname';
    this.id = 'none';
    this.appName = 'noname';
    this.accepted = false;
    
    // Formsubmitelements [start]
    this.submit_charset_test = '';
    this.submit_post_form_id = '';
    this.submit_fb_dtsg = '';
    this.submit_id = '';
    this.submit_type = '';
    this.submit_status_div_id = '';
    this.submit_from_id = ''; // params
    this.submit_app_id = ''; // params
    this.submit_req_type = ''; // params
    this.submit_is_invite = ''; // params
    this.submit_div_id = ''; // ignore only
    this.submit_actions = '';
    // Formsubmitelements [end]

    this.giftContent;
    this.giftSenderImageElement;
    this.giftBoxContainer;
    this.giftBoxElement; // used for hide link
    this.jQ_FB_GiftElement;
    this.appIndex;
    this.giftIndex;
    //this.methode = function(){}
}

// Languages Codes [start]
var LangCodeText = {
    // Main UI [start]
    settingsButton_en      : "Settings",
    settingsButton_de      : "Einstellungen",

    visitButton_en: "Visit UserScripts",
    visitButton_de: "Besuche UserScripts",

    aboutButton_en: "About",
    aboutButton_de: "\u00DCber", // UTF-8   

    donateButton_en: "Donate via PayPal",
    donateButton_de: "Spende via PayPal",
    // Main UI [end]

    // About [start]
    aboutMsg_en: "Facebook Gift Link Creator Build: " + AppSettings['version'] + "\n\nThx for all your donations and feedback. To keep up running this script.\n\nIf you're not already donated and you like my script. Feel free and donate now!\n\nScript copyright by DragonByte 2010-2011\n\nGraphics used from http://www.gettyicons.com/",
    aboutMsg_de: "Facebook Gift Link Creator Build: " + AppSettings['version'] + "\n\nVielen Dank f\u00FCr alle Spenden und die zahlreichen R\u00FCckmeldungen um mein Skript am leben zu halten.\n\nWenn Sie noch nicht gespendet haben sollten und Ihnen mein Skript gef\u00E4llt, dann spenden Sie am besten jetzt!\n\nScript copyright by DragonByte 2010-2011\n\nGraphics used from http://www.gettyicons.com/",
    // About [end]
    
    // Settingswindow [start]
    settingsWindowTitle_en: "Settings",
    settingsWindowTitle_de: "Einstellungen",

    language_en: "Language",
    language_de: "Sprache",

    bgcolor_en: "Backgroundcolor",
    bgcolor_de: "Hintergrundfarbe",

    from_en: "From",
    from_de: "Von",
    
    to_en: "To",
    to_de: "Zu",

    textcolor_en: "Textcolor",
    textcolor_de: "Textfarbe",

    maxtabs_en: "Max allowed tabs",
    maxtabs_de: "Maximal erlaubte Tabs",

    advanced_en: "Advanced",
    advanced_de: "Fortgeschritten",

    useIFrame_en: "Use IFrame mode (recommend)",
    useIFrame_de: "Benutze IFramemethode (empfohlen)",

    IFrameTimeout_en: "IFrame timeout (in ms)",
    IFrameTimeout_de: "IFrame Zeitbeschr\u00E4nkung (in ms)",
    // Settingswindow [end]

    // Requests [start]
    show_en: "Show",
    show_de: "Zeigen",

    hide_en: "Hide",
    hide_de: "Verbergen",

    accept_all_en: "Accept all",
    accept_all_de: "Alles annehmen",

    open_in_tabs_en: "Open in tabs",
    open_in_tabs_de: "In Tabs \u00F6ffnen",

    ignore_all_en: "Ignore all gifts",
    ignore_all_de: "Alle Gifts ignorieren",

    request_from_en: "send you a request.",
    request_from_de: "hat dir eine Anfrage geschickt."
    // Requests [end]
}
// Languages Codes [end]

var Ressources = {
    settingsButton_small    : "data:image/gif,GIF89a%18%00%18%00%F7%00%00%00%00%00%FF%FF%FFwq%92%8B%85%AA%8B%86%A7%89%84%A4%93%8E%AE%8D%88%A7%AC%A6%CA%DE%D8%FB%CB%C6%E6%E0%DB%FB%DF%DA%F8%DD%D9%F3%DF%DB%F4%F4%F2%FFrm%90%7Dx%9Cvr%90%97%92%B4%81%7D%99%AA%A6%C3%A2%9E%BA%B3%AF%CB%D4%D0%EF%DD%D9%F7%DB%D7%F5%DC%D8%F5%A4%A1%B7%DA%D6%F2%BA%B7%CD%E4%E1%F7%89%85%A7%9D%9A%B5%94%91%A9%BD%BA%D6%AE%AB%C5vt%84%DD%DA%F6%DD%DA%F5%D7%D4%ED%D5%D2%EB%D1%CE%E7%E8%E5%FF%D0%CD%E5%B0%AE%C1%E5%E2%FA%BD%BB%CE%EA%E8%FB%E4%E2%F5%E2%E0%F2%F1%EF%FF%F5%F4%FDpn%86%9D%9A%B9%7Cz%90%84%82%98%A4%A2%B9%BA%B8%CF%B2%B0%C6%AE%AC%C1%B6%B4%C9%B0%AE%C2%BE%BC%D1%E1%DF%F5%D3%D1%E5%EC%EA%FF%EB%E9%FE%E6%E4%F9%D8%D6%EAkj%7B%93%92%A1%C5%C4%D5%AD%AC%BB%A9%A8%B7%CE%CD%DE%CA%C9%D9%B3%B2%C0%E8%E7%F8%E5%E4%F5%DF%DE%EE%D7%D6%E6%E3%E2%F2%E2%E1%F1%C8%C7%D5%EF%EE%FC%EB%EA%F8%E9%E8%F6%D7%D6%E9mmz''*%92%92%9C%CC%CC%D9%BE%BE%CA%B3%B3%BE%EC%EC%F9%E1%E1%EE%F2%F2%FE%E6%E6%F2%EF%EF%FA%E4%E4%EF%D7%D7%E0%EF%EF%F8%ED%ED%F6%D9%D9%E1%C0%C0%C7%C2%C2%C8%A5%A5%A6yz%85%D5%D6%DFklt%91%92%9A%A5%A6%AD%F0%F1%F9%EA%EB%F3%CD%CE%D5%DC%DD%E4%95%96%9C%D4%D5%DB%F7%F8%FE%F6%F7%FD%EF%F0%F6%A5%A6%AB%F3%F4%F8%8F%91%98MNQ%95%96%99%F5%F7%FC%83%86%8C%F4%F6%FA%ED%EF%F3%EB%ED%F1adi%2C.1%80%82%85%BC%BE%C1%F8%FA%FD%EF%F1%F4%EC%EE%F1%DE%E0%E3%DD%DF%E2gjnpsw%B8%BB%BF%E9%EC%F0%C6%CA%CF%D9%DD%E2sw%7B%D5%DC%E3%AD%B2%B7%DE%E3%E8%D7%DC%E1%EC%F1%F6%E5%EA%EF%E2%E7%EC%E1%E6%EB%D6%DA%DE%D2%D6%DA%E6%EA%EE%E5%E9%ED%E2%E6%EA%E0%E4%E8%B7%BA%BD%A6%A9%AC%F0%F3%F6%EF%F2%F5%E5%E8%EB%E3%E6%E9%E9%EB%EDMXa%8B%91%96%D2%D9%DF%E1%E8%EE%D9%DF%E4%EA%F0%F56%40HT%5Cb%84%8E%96%A1%AD%B6px~%CF%D9%E1%CB%D4%DB%D8%E0%E6%E5%ED%F3%E2%EA%F0%9B%9F%A2%EE%F3%F7%3CO%5C5%3FFEQYN%5BdO%5Ce%83%95%A1%5Cek%C1%D3%DF%C7%D9%E5%BE%CE%D9%C7%D7%E2%D0%DF%E9%A6%B2%BA%CE%DC%E6%C3%D0%D9%9A%A4%AB%C3%CF%D7%C2%CD%D5%D9%E4%EC%D3%DD%E4%CC%D6%DD%C9%D3%DA%E2%EC%F3%D6%DF%E5%D3%DC%E2%EE%F7%FD%E5%EE%F4%DA%E1%E6%DC%E2%E6%EE%F1%F3*5%3C%3AHQ%5Dr%7Fu%85%8F%8E%9F%AA%5Dho%B0%C0%CA%C6%D4%DD%C9%D6%DE%E3%EE%F5%DF%E7%EC%DB%E3%E8%D4%DC%E1%23%3BI%269D8Sb0GT3HT%3EQ%5C%2C8%3FK%5Ei0%3BA%7B%93%A1%88%99%A3%B5%CB%D8%B8%C7%D0%C0%CF%D8%CA%D9%E2%D1%E0%E9%C1%CF%D7%93%9D%A3%C7%D3%DA%C1%CD%D4%97%A8%B1KLL%5B%5BZ%8E%8E%8Djjj%FF%FF%FF!%F9%04%01%00%00%FF%00%2C%00%00%00%00%18%00%18%00%00%08%FF%00%FF%09%1C8p%02%89%03%12%08*%5C(%10%C2%3F%08%19V%8C%A0PC%C7%0E%1C%25%18%0E%8C%A0%40E%01%03%1B6%B0%10%E1A%08%8C%23F4%0AD%90%20C%8A%0E%0D%3A%7C%F8%E0%E4I%14%23nT%FE%03%A1%01%03%03%07%0E%80%00%89%F1%C4%0A%97%2Cl%B6%BC%01%A4%90%40%04%1B%0C%60%A2%08RD%86%93%2BV%CE%B4A%13%C7%8E%1E%82%03%1680%B1%01E%0F%1F%2F%90%2C%013%C6L%1C%3C%7F%10)%1Aeh%20%82%05%184%A0%C8%E1c%89%14%2Bb%C8%9C%F9%B3'P%A0D%A3%26%E5l%A8%C0%C4%09%12%3C%B0Hi%E2E%CE%9D%3C%7BH%95%0A%F4%C8Q%23%85%16V%A8%E0%10dJ%09-%FF%F80%DA%83%8D%14%24%5D%91%94%05%1B(%20%84%0A%17%3Fz8I%D2g%60.l%83t%7D%CA%A4iU%A5Y%B0%FEU%10%E2%E0C%0F%24W%E0%F8%23(%C9%13%A6M%96%C6U%A3vo%F6%85!%40%88%BC%FF%60%F2EM%3F%82%9C6%B9%22g%8B%5C4q%B1R%FD%93%10%02%0B%0C%26T%C2%D0Y%C3O%A0%AAM%E4%DCB%894%B4%1C%C3%CD%2F%DA%0C%D4B%18PtaF%1E~%EC%F3%0F%20%9DX3%0E%2B%CF4%23%8B%2F%0A%DD%B0D%15U%CCQ%86k%A2Tr%CD5%E5TC%0B%3E%C8%80%D3M%3B%04%FD0%83%15a%E41%07%23%A6%40%F2%C9%25%94%DC%22%CD2%C9%CCcL%3D%C0%A83P%12%0F%7CA%03%1E%83%2Cr%8A%25%D7%8C%83%8B3%CC%D8CO1%C3%08%B3M%3A%04)qD%1Aw%08%82%0A(%A0X%22M-U%82%A3O7%F1%BC%83%0ECp%C85H(%92%ACR%0B4%F9%24%F3%CD%3A%E7%B8%C3%8EFs%04%90H'%A1%B4%B2%CA4%B5%84%23%0F1%ED%9C%A3S%1D%A8%1CBH.%9A%D8rO%2F%CA%203%CC6%E6%E8%F4O%23%7D%142%89.%E3x%93%0D%2F%F0p%B3%CB%9F%9E%0E%A4J%2C%AFd%06%F3O!*%05%04%00%3B",
    settingsButton_normal   : "data:image/gif,GIF89a%20%00%20%00%F7%00%00%00%00%00%FF%FF%FFzt%99%83%7D%A0%8B%86%A7%90%8C%A6%D6%D1%F2%D9%D4%F3%EF%EC%FEql%8Fqm%8A%7Bw%94%B5%B0%D2%9B%97%B3%A7%A3%C1%D4%CF%F2%88%85%9C%99%96%AC%E2%DE%FD%DE%DA%F9%DD%D9%F7%A8%A5%BC%A1%9E%B4%DC%D8%F5%DE%DA%F6%E0%DC%F8%DE%DA%F5%E5%E1%FC%E3%DF%FA%E1%DE%F5%DF%DC%F3%E9%E6%FD%E6%E3%F9%EC%EA%F9%E4%E2%F1hd%85vs%8C%84%81%9B%DD%DA%F6%E5%E2%FE%E1%DE%F9%DF%DC%F6%D4%D1%EA%E0%DD%F7%D1%CE%E6%E3%E0%F9%E2%DF%F8%E1%DE%F7%E4%E1%F9%E2%DF%F7%CF%CD%E0%C9%C7%D9%EC%EA%FD%E0%DE%F0%EE%EC%FD%E9%E7%F7yw%8Esq%87%7By%8E%83%81%95%AC%AA%BF%BA%B8%CE%BD%BB%D1%E6%E4%FA%E4%E2%F8%DB%D9%EE%D3%D1%E5%EA%E8%FD%E8%E6%FA%E7%E5%F9%E4%E2%F6%F6%F5%FFpo%7F%B4%B3%C5%9B%9A%A9%C3%C2%D4%99%98%A6%DA%D9%EA%EB%EA%FB%EA%E9%FA%E9%E8%F9%DE%DD%ED%DC%DB%EB%EF%EE%FE%EA%E9%F9%E3%E2%F2%F0%EF%FE%ED%EC%FB%E7%E6%F4%D8%D7%E4%95%94%A7%B8%B7%CAllw004%A4%A4%B1%8D%8D%98%E4%E4%F3%EA%EA%F8%CD%CD%D9%EF%EF%FC%F2%F2%FE%E2%E2%EE%F1%F1%FC%EE%EE%F9%F5%F5%FF%EB%EB%F5%F7%F7%FF%F5%F5%FD%FC%FC%FF%F4%F4%F7%F0%F1%FA%94%95%9C%C5%C6%CD%F5%F6%FD%E5%E6%ED%BD%BE%C4%F8%F9%FF%F7%F8%FD%F6%F7%FC%DB%DC%E1%FA%FB%FF%F4%F5%F9%F0%F1%F5%F6%F8%FE%E0%E1%E4%EF%F1%F6W%5Cf%B4%B7%BD%81%83%87%7C~%82%8D%8F%93%9B%9D%A1UVX%F9%FB%FF%EC%EE%F2tw%7C%A4%A6%A9%F8%FA%FD%F6%F8%FB%F5%F7%FA%F1%F3%F6%EF%F1%F4%EE%F0%F3%EA%EC%EF%E6%E8%EB%F7%FA%FE%F2%F5%F9%EA%ED%F1%AC%B0%B5hmrosw%E3%E9%EF%DE%E3%E8%DD%E2%E7%EA%EF%F4%E9%EE%F3%E8%ED%F2%DF%E4%E9%D6%DA%DE%CB%CF%D3%F5%F9%FD%ED%F1%F5%EB%EF%F3%E8%EC%F0%E7%EB%EF%E5%E9%ED%CF%D2%D5%F1%F4%F7%EF%F2%F5%EB%EE%F1%E7%EA%ED%DC%DF%E2%D6%DE%E5%E2%EA%F1%DA%E1%E7%E9%F0%F6%DF%E5%EA%E6%EC%F1%E5%EB%F0%E4%EA%EF9ENHQX%93%9F%A8%C3%CF%D8%DC%E6%EE%D1%DA%E1%DF%E8%EF%EA%F3%FA%DF%E7%ED%DD%E5%EB%D5%DD%E3%ED%F5%FB%E6%EE%F4%E1%E6%EA1%3CDBMUXdlMW%5Egs%7Bq%7B%82%C3%D3%DEy%83%8A%CE%DD%E7%C3%D0%D9%8B%94%9A%C9%D5%DD%C8%D4%DC%B8%C3%CB%D7%E3%EB%D2%DD%E5%CD%D7%DE%DF%E9%F0%D6%E0%E7%E7%F1%F8DGI%D9%E2%E8%D8%E1%E7%EE%F7%FD%E3%EC%F2%D9%E0%E5%F2%F9%FE%EC%F3%F8%E2%E8%EC%A9%AC%AE.ES9LX%3DP%5C%2B6%3DYkv%7C%8E%99%85%96%A1o%7C%84%9F%B0%BB%CD%E0%EC%C2%D4%DF%BF%D1%DC%C4%D4%DE%D7%E5%EE%CA%D7%DF%C5%D2%DA%24%3AG.BN%3ETaH%5Ch%60t%7Fo%83%8F%98%AA%B4%C1%D6%E2%D3%E4%EE%BB%CA%D3%CB%DA%E3%D3%E2%EB%DA%E4%EA455hhh%FF%FF%FF!%F9%04%01%00%00%FF%00%2C%00%00%00%00%20%00%20%00%00%08%FF%00%FF%09%1CHP%E0%00%07%0E%16%2C%18Q%B0%A1C%87%09NL8%E1%A0%80%82%11%0DJ%2C%C8%F1%F0a%81%06%02F%10%90p%00%85%8F%02%24%92%D0(%92d%07%92%8E%04G0%98%80%C0%01%81%06%1C.%B8Pa%81%07%0D%23E%B6%20y%09%D3%A0%84%07%14B%A8%F8%E0%22E%8C!%08%A6%10)%02E%09%17%A2EG%188P%12E%8A%151%80%80%A0%0A%85%0A%16%24~%B8%14%1D8%F3%82%89%14%2F%60%8C%25%F2%C4%C9%95%2Bi%98%7Cy%F3g%CE%A0%2F%0D%13T%180%20C%06%0C%19%5Cx%10%12%24%0A%8D%2Bc%AC%98!c%E6%CE%9A8%7B%FEP%0AT%90%C1%06%04%1D8%60X%A1%A2B%85%1EKf%C8%C0B%86%0C%1A4%7B%E8%D4%B1S%C7%13%22A%04%05H%D8%8Aat%8F%08%5Bf%08i%12%A5L%197t%E8%14Z%BE%BC%D17%40%87rS%A0p%80B%06%19%05%7C%C8%90%02%26%CC%197%E0%EB%B0%FF%C1S(Q%22F%88%2Cq.8%60E%86%14.%0A%F4%60Q%E3%8A%98%2Fp%F0%E0%A1%B3%08%8F%A2E%8B(%F2G%20%D19%D4%03%07%2F%F4%60%81%0C5T%81D%17%5D%FC%F3F%1Bu%E4%11%E0)%8CH%E2%C97%8344%82%02A%B8%00%83%05%3E4%E1%04%13%84%F43%10%22%8A0%C2H%24%8E%84%12%8A%26sPR%091%C5%08D%00%0B%1F0%05B%042TQ%06%17%FE%14%C4%07*%A2%80%B2%09'%9C%BC%D2%CD%2F%AF0%93L%8E%0Ep%A0A%5CDh%91%C5%0Db%08R%24A%7F82%8A%24%9B%CCr%C9%25%ADh%B3%8B-%C7P%B9A%0A-%FC0%84%12R%9C%91%05%22%EB%0D%F4%C7%26%A5%FC%12%0B%2F%80%EA2M5%CC%18C%CB%3F%25%C8%40%03%0DD%D0%E0E%14c02%C77%84%0Cd%89'%A5%C0%C2%0D%2F%FC%F03%0D.%D0%E4s%0E1%87%0A%84%C3%0DC%D8%90D%16n%E0%E1%D7%97%FF0%FF%A3I'%97d%83%0D5%D8DSh-%A5%124%83%0DS%C8%00%C7%19q%F4%01%08!%D6T%22%887%C1%B8%02%0C0%ACD%03%CD3%E4%CC%E3P%01TLa%05%1A%7F%C8%E1%86%24y%98%F2%C6'%9B%C0%B2M%2F%D9%B0%92K.%FBPc%8F9%E1%14%04%C1%0D6%D8%40%86%1A%90%CC1%89!%A9%A4B%8A7%99l%E3%CA%2F%BCH%E3%CE%C1%EDL%83%8E9%F1%10T%C0%144lK%07%1Er%C0%01%89*%90%04%83%89%2B%BD%FC%D2%8A4%CD8%C3%CE%C8%F8%B8S%8F%B5%03%E9%20%02%19GL%8CG%1Cz%3C2%09%24%DE%5C%F2%CA.%D8H%E3%CC%3B%FA(%83%CC%3A%E9%D8CN%BC%041%91%84%12%5E%B0AG%1E%8D%A4%A2%0A)%B1x%E3J.%3A%BF%E3%8E%3E%E8%A8%93%CE%3D%F4%CC%03%CFC%81%DCA%87%24%8EL%92i%26%EA%82%FC%CE2%FBt%0D%CF%3C%F2%80%F3%F5C%80%B0a%87%8Bfw%B2%8D%2FT7ksK%3E%ED%90%23%CE%DCE%BD%C1%C6%22y%AC%D2%C9%AC%DB%60%C3%0F%A8%CB%E4%A3O9%E1%10%0E%D3!%7C%D4%E1%08%20%96%C0an%2FS%26%A3L%3E%EB%A0%13%0F%3C%E3%AC%F5%0F%17%83X%82%EC%1B%DE%B0r%8D%1F%C3%8Cc%CB%E8'7%ACzA%81%C8%D2%CB3%B4%083%CE8%C4%84%13O%EA%BB%17T%8B%25%CC%10%23%7C%3F%D0%AF%15%10%00%3B",
    
    visitButton_small       : "data:image/gif,GIF89a%18%00%18%00%F7%00%00%00%00%00%FF%FF%FF%D5%CE%CF%C4%C1%C3%EC%EB%ED%DA%D9%DD%D5%D5%D7%CF%CF%D0%C0%C0%C148%3E%BE%C0%C3%81%84%88%AC%BA%CC%01%07%0E%06%0E%16%09%11%19Vet%82%8E%9A%3A%3FD%9A%A3%AC%3C%3FB%8B%90%959%3B%3D%97%9A%9D%C7%CA%CD%A9%AB%AD%C6%C7%C8%02%0D%17BWkAUgFXh%26%2F7%83%9C%B4s%7D%86%05%0D%14%187P)Ic%249J6L%5EE_tDZlo%8D%A6Qgyaz%8Fev%84n%7D%8A3%3A%40%9E%B0%BF%AC%B8%C2qy%80%7D%85%8Csz%80)Jc%14!%2B%238H%1F2%40%16%23-Dh%84%3E_x%2CCULr%90Kq%8EMr%8FFh%82%40_vMp%8AIj%83Km%86Gg%7FOq%8CLm%86Pr%8COp%8ANo%88Mn%87Op%89Pq%8APo%864GU%2F%40M%60%81%9Be%86%A0d%85%9Fj%8C%A7g%88%A2f%87%A1Sn%83g%88%A1AVff%86%9FXt%89Oh%7BKcuH_pe%84%9Ca%7F%96w%9B%B6q%93%ADo%90%AAn%8F%A8Sl%7Fp%91%AAo%90%A9t%96%AFr%93%ACq%92%ABp%90%A9-%3ADz%9D%B7s%94%ADp%8F%A7w%98%B1H%5Ckj%84%98bz%8Cx%92%A68BJAKSJT%5C%BD%CA%D4%A2%AC%B4Im%87Ln%86Pq%89No%86Z~%97Z%7C%94e%87%9Fh%89%A1I%60px%9D%B7w%9B%B5t%97%B0J%60pr%93%AB%7D%A1%BBPgwRhx6CLy%93%A5%2F9%40fz%88du%81n%80%8Ces%7D%A2%B7%C6%8C%99%A2%9F%A9%B0%7F%85%89%9E%A1%A3%B8%BB%BDL%5DhP%5Bblz%83mx%7F%82%8D%94iqvqy~%8C%94%99%9E%AB%B2%C3%C5%C6k%90%A1%5Cio%87%99%9E%A0%A3%A3%D0%D1%D1%C9%CA%CAV%8B%88K%85k%9B%A6%A0%1C%8AJ!%8DGo%86u%92%9C%93bfb%AC%AC%A9%AB%AB%A9%C6%C6%C5%B4%B4%B3%F3%F2%EC%EB%E8%E2%E4%DE%D3%F7%F1%E6%E9%E2%D7%8E%8A%84%E1%DF%DC%DE%DC%D9vqk%90%8A%83SQO%A9%A6%A3%BF%BC%B9%FD%FA%F7%F6%F3%F0%ED%EA%E7%CC%CA%C8%DD%DB%D9%9C%9B%9A%FF%FE%FD%DB%DA%D9%D3%D2%D1%D2%D1%D0%D0%CF%CE%C0%BF%BE%D0%CB%C7%D9%D4%D0%F7%F2%EE%BE%BA%B7%CE%CA%C7%E9%E5%E2%FA%F4%F0%EC%E6%E2%FF%FC%FA%F4%F1%EF%EE%EB%E9%EC%E9%E7%EB%E8%E6%E5%E2%E0%E4%E1%DF%E3%E0%DE%DF%DC%DA%DE%DB%D9%91%8C%89%B3%AD%AA%FE%F8%F5%FD%F7%F4%E7%E1%DE%C3%BF%BD%FD%F9%F7%F2%EE%EC%E7%E3%E1%BF%BD%BC%9F%9D%9C%DB%D9%D8%D8%D6%D5%F3%F0%EF%ED%EA%E9%DC%D9%D8%FB%F7%F6%C0%B7%B7%D9%D7%D7%C4%C2%C2%D4%D3%D3%D7%D7%D7%CD%CD%CD%CA%CA%CA%C9%C9%C9%C5%C5%C5%BF%BF%BF%AF%AF%AF%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%FA%00%2C%00%00%00%00%18%00%18%00%00%08%FF%00%F5%09%1C8p%04%C1%83%08%13%92%E9%23%84%C4%C1s%AF%12%1E%14%D5%03%D0%1B3~t%D0%10%98k%16-%89%02%5D%F9P%22%05M%9A3m%AE%0C!%B2%E0V-%90%FAx01%12%25%8D%195e%D0%1C%0A%24%02%97-%90M%8A%2C%19%92%25M%992c%06Y%E9%E5%09%07%2F%89J%84.Q%F2%C7P%193%84%BCP%60%D6l%D3%83%84%7C%8E%2C%19%AB%E7O%9B2a%C2H%F8F%60%5E%06G%0E%10%22%11%BB%24%89%91*h%C4%80Q%C4%E9E%84%09q%F0%40jp%B0%C6%8F%23%7B%A6%D6%14%84eW%24%10%92F%85%BA%F3%EB%12a%822%80%04aB%92%CD%96%5E%D3%18%9CZ%A5%0AU%01q%A4ll%208%EC%C2%89%3CI%A6%7C%B1%00%CD%DD%81T%ACZ%BD%2B%B7n%1C%C2%7B%F2%F2!%CA%01%C5%85%AFj%E5%82%81%130%A0%D4%3Al%E6%10%E6%A3%87l%19%8B5%DE%CCY%AB%96%ADE%97%1D%99%80a%A0%DB%86P%16%3DS%07%E2%A1k%A7%EDZ0x%26%12%C1%D1%24%5E%1B%C2J%F2%EA%E9%8F%05o%9B%B0%60%E9%142%C7%0A!%90%83%8D%7D%07%7D%60I~%F6%E0%A3%8E%7F%C1%10%83B%0A%5C%C4%40%CD%81%091%A2%402%0D%3E%E8%9E.%1C%B8%A1%C2%0C%C6%60%13%8DDt%80%A2%8C%83%10r%E3%C1%22rP%12%804%C7%80T%87%06%F7%3C%C8N0%DAt%40%85%16%9D%C0%F0%C8%130%D9%81%407%D18%13%8E%01%10L%92O%050%11%84%89%3C%18%7C%D2H%09%09%3C%83%00%2C%C5D9%90%137x)f%94%01%01%00%3B",
    visitButton_normal      : "data:image/gif,GIF89a%20%00%20%00%F7%00%00%00%00%00%FF%FF%FF%F1%EE%EC%CA%CA%CAp%91%AAOp%89%C2%B2%B8%D3%D1%D2%8E%81%88%B6%A2%AD'%26'%DB%C7%DC%C7%B9%C9%DA%DA%DETWwfr%97%08%13!%C2%C7%CD%A9%C5%E3%00%02%04%02%06%0A%234E%11%18%1F%91%AC%C7%11%12%13%B8%BA%BC%85%9E%B5%0E%1D*%18)7%3E%5DwMm%876L%5E9Oa%3EUi%60%81%9Cf%87%A2EYjo%8F%A9g%83%9Bv%96%B0%60y%8EXo%82%3DMZo%88%9Du%8F%A5%94%B3%CCTdr%B4%BB%C1%1A9Q)Ke!%3BO)ASBf%81Lr%8FKp%8CCd%7D1I%5BNt%908RfKn%88Or%8DMo%88Oq%8BNo%88Mn%87Rs%8DQr%8CPq%8AQr%8BSt%8DRr%8B%5C%7D%96Hbuf%89%A4E%5DoD%5Bmb%83%9Ca%82%9Bn%91%ADh%8A%A4d%85%9Ed%84%9Dp%91%AB%5Bv%8Br%93%ADq%92%ACo%90%A9~%A2%BEs%94%AEq%92%AB%84%A9%C6y%9B%B6GWco%86%98R_i%7B%8E%9C%8D%A1%B0%5Bdk%7B%83%89%7B%7F%82%03%0A%0F%1C4E0QiGj%82%3DZo5N%60%19%24%2CNo%87Mn%85Pq%89-%3EJb%84%9CMh%7BAXhTp%83u%99%B3e%84%9Az%9F%B9p%91%A9r%93%ABt%96%AD1%3FI%5Bt%86Tk%7B6DNw%94%A9u%92%A6%3CJTl%81%90g%7B%89L%5Be%5Bjtq%81%8C%86%96%A1ju%7D%94%9F%A7%AC%B3%B8%2C%3ACLcqL%5Ei%20%25(%97%AC%B8Ten%0D%0F%10%C7%CB%CD%BC%BE%BF%B7%B9%BA%9D%A2%A4%B9%BC%BD%5Ehk%D0%D6%D7Gx%7C%18%7DS%0Es6Lt%5Ce%C9%87%9B%DA%AD%02n%1A%86%87%85%F6%F7%F4%E3%E4%E1%22%22%20%17%17%16%F3%F3%F0%D6%D6%D5%D4%D4%D3%CF%CF%CEfea%EA%E8%E2%E1%E0%DD%E3%DE%D4%F1%ED%E5%F7%F5%F1%AF%AE%AC%CC%CB%C9%CB%CA%C8%EC%E6%DB%F3%F1%EE%E2%E0%DD%DF%DD%DA%2C)%25%DD%D5%CA%F6%F3%EF531%C2%BE%BA%F5%F1%ED%F5%F2%EF%F1%EE%EB%A4%A2%A0%FF%FD%FB%F9%F7%F5%EE%EC%EA%E2%E1%E0%D3%D2%D1%D2%D1%D0%CF%CE%CD%CC%CB%CAd%5BS%CD%C3%BA%C3%BA%B2%DA%CD%C2%BF%B8%B2%E8%E1%DB%EF%E8%E2A7%2FKFB%BC%B4%AE%F5%F1%EE%F3%EF%ECmgc%99%92%8D%A9%A6%A4%ED%EA%E8%EC%E9%E7%E9%E6%E4%E5%E2%E0%E3%E0%DE%E2%DF%DD%DC%D9%D7%BC%B7%B4%E9%E4%E1%D0%CC%CA%F6%F2%F0%EF%EB%E9%E4%E0%DE%FB%F9%F8%FA%F8%F7%CC%C7%C5%F1%EB%E9%C5%C2%C1%FC%F9%F8%FA%F7%F6%DE%DB%DA%D9%D6%D5%E3%DF%DE%F7%F1%F0!%18%17%9D%98%98%F7%F2%F2%B6%B3%B3%ED%EA%EA%E6%E3%E3%FF%FD%FD%C6%C4%C4%BA%B8%B8%F8%F7%F7%D1%D0%D0%DF%DF%DF%CD%CD%CD%CB%CB%CB%C9%C9%C9%C3%C3%C3%BF%BF%BF%BD%BD%BD%8D%8D%8D%FF%FF%FF!%F9%04%01%00%00%FF%00%2C%00%00%00%00%20%00%20%00%00%08%FF%00%FF%09%1CH%B0%A0%C1%83%08%0F%3A%A2a%06%06B%5E%9E%12%22%ACTcD%96%237b%14LE%0A%D4'%89%05O%D5(%D0%04%0B%16%3CO%8At%D0%F8%AF%DC0T%CA%40%12%B4!%04%08%93*%04r%9E%C0%C3%E4L%0C%14%AD%60%A9%92)%10%08%8F6%40%DEP%B1%92S%E7%96930%D4ZE%14%0E%8F%02%05lf!%C04%A7%95%2B)Bq%10%05K%E6%A0%1CC%B0j%B5%B2%B5%84%95%3AM%1E9C%04%81%16%C8%3DW%B1f%8D%82%93%AB%9D9s%1EI%FB%86%EB%10%04%00%12%7D%0CI%8B%F5GI%AEY%A4h%B1P%CC%97%BCe%C8%0A%91I%D8Fq%01%C6l%A0%2C%CDRB%8B%1Bf%D7%1A%BCxA%E8%10%20%0A%07q%08%09%F2%99%B1%07(w%B8%5EQ%C2%0E%0C%1EK%8A%EE%9D%D1%60%2C%05l%83%1Bn%04I%3B%E4%C7%8F(K%EBL%11u%AC%C5%08%06%0E%16%3C%90P%EB%1D%92%E3%05%C3t%FF%F0a%E4%87%90%DBYNP%C1%D0n%D4%85%13%9C0m%C2%D4(%1C%AEV%3A%26%18%1C7%06%CD%0E%22%05%AC%01%05%16%5B%A8%11%CD7%AChpI'%9Dd%A2I7%E1%C4%93%CC%3FelF%D0%3E%AFL%B2%C4%19B%3Cw%85%1B%CDh%E3%0B9%DD%8C%83%40%3B%09%18%40%8E.%D4p%83%10%3F%FB%94%F2%8E%0B7%F4%E0D%1C%B7%E0%12%0B4%BB%F8%D2%CB*%CA%A8%82%8A-%02X%E3%E2A%FE%E4%93%8F%3D%F3%18r%03%12%0A%B4%82%CD%2F%02%F0%98%C1!%84%84%B0%87%2F%D0X%A3%0EBI%E63%00%3E%F6%88%C1H%3B%DA%5CS%8D%00%EE%A4%23%03%0C3T%A0B%3D%5Db%03%A6%92%03%8C%E9J%2B%C3%80%93%CD%9A%ACh%83%C3%20%81%EC%C1%05%9D%5E%224%86)b%E69%C0%3E%C4%F8%B9%A6-%B3%80%B0B%1F(%2C%E2K%91v%1E%A4%C6%24%C18%AA%0F%3F%AEH*%C0%3A%E8%7C%D0%05%0BzxqN%91%B2%24%A8%C4%01%22%A1%0E0j%A4%7F%0A%E0M%AA%22%24%A1%82%20%E2%14%99%8AD%89H%22%8C%AD%FC%E0%BA%E6%3A%B3%A4a%02%0B%7B%00%CB)HyP%22%CC%AD~R%A3%2B%3Ait%E1%C7%14%82%84%F3%0C9%D0%C8%C4G%24%C3%24%9B%AD%00%BA%00%03%C2%AArxa%0E%3C%11%80A%D4%1F0%E2J%0D4%B6%5C%93%C6%11t%00%C2%85%1E2l%40%94%40%82%F43%CC5%D8%ECbK.%07%900I%2B%DBL%12%C6%C1%04y%E1%0A7%E9%40%D2%08%208%242%CD%3C%92%D0%23%0C%C6%04%0D%F2%85%12e%40%40%90'%A7(%80%F2%CC4%D7%FCO%40%00%3B",
    
    aboutButton_small       : "data:image/gif,GIF89a%18%00%18%00%F7%00%00%00%00%00%FF%FF%FF%FB%FB%FC'%88%DE%25%82%D7)%87%DC-%8C%E3%2B%87%D9-%8B%DE*%83%D2.%8B%E1-%89%DC-%87%D8-%87%D71%90%E71%8F%E50%8D%E1%2F%8A%DB.%89%DA0%8B%DE2%8D%DF3%8F%E15%91%E46%8B%D7Y%A8%EF%00W%9D%00U%9A%0Ek%B6%10m%BA%10m%B9%12o%BD%14r%C1%14q%C0%11c%A5%15s%C3%12e%A8%16t%C4%14i%AE%16k%B1%1Ay%CB%1Aw%C7%18p%B9%18o%B5%1By%C9%18m%B3%1C%7B%CC%19p%B6%1E%7D%D0%1D%7C%CE%1Bt%C0%1Bt%BE%1Bs%BB%1Aq%B7%1Ao%B5%1F%7F%D3%1Bq%B8%1Br%B8%1F~%D0%1Ey%C6%1Cs%BA%1Dt%BC%1Dt%BB%1Cq%B6%1Ev%BE%1Ev%BD%1Et%BC%1Ds%B9!~%CE!%7C%CB%20y%C7%1Fw%C0%1Fu%BE%22%7D%CC%20x%C1%20w%C0%20w%BF!y%C4!z%C3!y%C2%24%81%D1%22z%C5%22z%C3!v%BD%23%7C%C7%23%7B%C6%25%7D%CA%25~%CA%24%7D%C8%24%7C%C7%26%80%CD%26%7F%CC%26~%CB'%82%CF'%81%CF)%84%D2(%81%CF(%82%CF*%84%D3)%83%D1(%80%CB%2B%86%D4%2B%85%D4*%84%D1(%7D%C5%2C%86%D5-%88%D80%8C%DD%2C%82%CC1%8E%E0%2F%87%D34%91%E3%2F%86%CF2%8B%D80%85%CB2%85%C82%83%C69%90%DA8%8C%D5%3F%96%E1%3A%8C%CF%3A%8A%CD%3A%89%C9%3C%8C%CDA%94%DCF%9A%E3H%9C%E6G%99%E0F%97%DDS%A5%ECU%A5%EAU%A4%E8O%9B%D9N%99%D6Z%A8%EBZ%A5%E3_%AB%EB%5B%A4%E1_%AA%E8%5E%A8%E6c%AE%EF_%A8%E4c%AC%EAb%AB%E7%60%A8%E2b%A9%E5i%B2%EEg%AE%EAb%A4%DDQ%7B%9Dv%AE%DE%7F%B3%DF%86%B7%E1%8F%BC%E3%A8%CB%E8%B5%D3%EC%BE%D9%EF%C0%DA%EF%C5%DD%F1%C6%DD%F1%00Y%9B%00W%9A%00W%99%00U%99%02W%9A%05%5B%9C%06b%A8%07%5D%9E%07Y%98%09h%AE%09g%AE%09%5D%A0%09%5D%9F%0Bi%B2%09%5B%99%0A%5D%9D%0Ci%B2%0B%60%A3%0B%5E%9E%0Ca%A4%0Ek%B5%0D%60%A0%0D_%9F%0E%60%A1%0E_%9C%0Fb%A4%0Fb%A3%0Fa%A2%0E%5D%99%11e%A8%11f%A8%10c%A3%11e%A6%11d%A5%12g%AA%12f%A9%13j%AD%13i%AC%13h%AB%14j%AE%14j%AD%14i%AC%15k%B0%15k%AE%16k%AF%16m%AF%17n%B2%17m%B2%17m%B1%18n%B3%18m%B1%19p%B5%1Ap%B5%1Br%B7%1Dv%BD%1Fx%BF%1Eq%B3!u%B8%25x%BA(%7C%BF!f%9A*%7D%BF)z%BB%26i%9BW%A1%DCW%7F%9DX%7F%9DZ%80%9E%60%84%9Fg%87%9Fi%88%9F%C5%DE%F1%88%96%A1%F4%F8%FB.~%B73%81%B9%8B%98%A1%86%B9%DA%B4%D5%EA%BE%DB%EE%C1%DD%EE%C5%DF%EF%A9%D0%E7%A8%A6%A3%A5%A4%A3%AE%A8%A3%A8%A5%A3%AF%A8%A4%A6%A4%A3%A6%A4%A4%A5%A3%A3%A3%A3%A3%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%FB%00%2C%00%00%00%00%18%00%18%00%00%08%FF%00%F7%09%1C8%B0O%A0B%82%F8%10%5C%C8p%9F%9FF%91%16a%00%14%E8%90%24G%7F%1A.T%94%C8%0E%04%03%0E%1E((p%80%8E!F%1A%05B%DAC%60%01%1B7%16%DCT%98%20!%CC%90%3A%8F%E24D%D4%E6I%03%09j(%40%18%80%20%02%832b%88%8C%F9%C6p%D0%1B%24%09%C8%A4%91%B0%00%CE%A4%0B%07%D0x%E1%A2%A5%C8%19B%04%F1%DC%D1%A1%05%8C%192%0Dld%0A%A0%E9E%180Y%ACP%89!'%CF%40%3DN%A0X%C9%F2EL%98%1C%97%04%60%82%01%D7%CA%94%26Ff%D8%158GF%93)W%B6d%E9%22%A6%C5%9A%13%5D%B4%18%86%92%A4Z%0An%D9%F6i%93%C2c%09%13*W%AAXYQ%09%9D%25%14W%A8DI%F2%A3%07%0D%1F%DD%F6a%C3%B1%23%C8%8F%24L%A0%60!%C1)%80'%11%9C%95%00%E9%81C%05%B4k%FB%A0%A9%A0%B1%83%C7%0F%23I%9C%7C%D8%14%A0%13%08k%3F%82%EC%FF%A0%26%AD%D9%B2c%FB%94%3DS%E1%E2F%F5jG%3Cp%EF%E4%81%C7%0C%1C4T4c6%2C%D8%BE%12%EA%B10%1D%0D3%08%C1%01w%E6t%80_%0D%D0%3C%93%0C2%C1%FC%22P1%C7%24%F3%8Ct.L%B3%81%3B%01%983%0B4%D08c%821%C4%08%C3%CB%40%BD%04C%8C1%C9%98%60B4%ACp%08%CF%2B%CB%24c%0C%84%23%FC%E2%CB%40!%FC2%82%8A%25%94pL*%EF%04%00%0F*%C8%10%13%8C%89%C0%E4B%0BA%B9%F4%C8%CB%8F%C1%94%12O%00%ED%942B%2F%BC4iK-%0C%D1%92%8B%2F%3D%FE%22K%3A%EC%A8%03%0B0%B8%E4b%0B-%B1hdJ%2C%B4%E8%A2K.%AAd%B0%8A%9B%B4%D4%B2%0A))%EDs%CB'%A4%C4R%CB%A1%B5%C4%E2%0A)%A0%EC%12%A8%40%E3x%D3%CA(%1Ah%20J(%A7l%23NJ%FA%E8%83O%3D%F4%DC%B3N9%E1P%02%0E9%E7%E4c%8F%3C%F3t%AA%CF%A3%B0%0E%02%14%10%00%3B",
    aboutButton_normal      : "data:image/gif,GIF89a%20%00%20%00%F7%00%00%00%00%00%FF%FF%FF%A4%A4%A4%FD%FD%FF%F8%FA%FC%FD%FE%FF%16w%CD'%86%DB%26%84%D7'%83%D6%25%7D%CB%24%7B%C8*%89%DE%2C%8B%E2)%83%D3(%80%CF%2C%8A%DD.%8D%E5.%8B%DF-%88%DA.%89%DC-%87%D9-%86%D60%8E%E3%2F%8A%DB.%89%DA1%8E%E10%8B%DD3%91%E43%90%E33%8F%E22%8D%E02%8E%E06%93%E86%92%E66%91%E35%8F%E15%8D%DC%BD%D5%EC%00T%98%00S%98%05l%C5%0En%BF%0Fs%C9%0Dd%AA%0Fa%A3%14t%C6%13r%C2%11e%A9%12j%B1%11c%A6%12e%A9%12d%A7%14l%B4%13f%AA%15i%AE%18u%C5%17r%BC%17o%B9%15i%AD%16j%B0%1B%7D%D1%1Bz%CC%19s%BE%19q%B8%1Bu%C2%19n%B5%1Bt%BD%1Br%BB%1Ap%B7%1Ao%B7%1Ao%B5%1Dx%C6%1Br%B9%1Bq%B8%1Cs%BA%1Cs%B9%1Dv%BE%1Ds%BD%1Dt%BC!%7F%D1%20%7B%C8%1Ew%C0%1Eu%BD%20y%C4%1Fx%C0%1Fu%BF%1Fw%BF!%7B%C6%20w%C1%20x%C1%23~%CE%22%7C%C8%22%7C%C7!%7B%C4!y%C3%24%7F%CD%22z%C4%22z%C3%25%81%D2%24%7D%C9%23z%C6%26%82%D0%25%80%CD%25%80%CB%25~%CB%24%7D%C7%26%81%CE%26%81%CD%26%7F%CC%26%7F%CB%25~%C9(%84%D5)%85%D2(%82%CF%26%7C%C3*%86%D5)%83%D1%2B%87%D7%2B%85%D4*%84%D2%2C%86%D5*%81%CD.%8B%DC-%88%D8%2F%8C%DC.%89%D91%8D%DE2%8D%DD%2C~%C23%8C%D84%89%D31%83%C53%85%C86%88%CD%3A%8B%D1%3F%94%DE%3C%89%C7%3F%8D%CDB%8E%D0C%91%D1K%9A%DCR%9F%E2P%97%D4T%9C%D7T%99%D3%5D%A8%E8X%9B%D6W%9C%D4d%A9%E1r%B6%EF%7C%BD%F2%8A%C7%F9%8E%C8%F7%D2%E3%F1%00V%98%01W%9A%02W%9A%03W%98%03X%98%04b%A9%04%5D%A2%06j%B4%05Z%9A%06%5B%9C%08%5C%9D%08%5B%98%09%5D%9B%09%5B%9A%0Bm%BA%0A%5D%9D%0A%5E%9D%0A%5C%9A%0B_%A2%0B_%9E%0C_%9E%0C%5D%9C%0Db%A5%0D%60%A2%0D%60%A0%0D%60%9F%0D%5D%99%0Fh%AE%0Ea%A1%0E_%9F%0E_%9C%0Fd%A5%0Fb%A2%0Fb%A1%10c%A4%11g%A9%10b%A3%13m%B5%12i%AC%11e%A7%11e%A5%13i%AE%12f%A8%12f%A6%14l%B2%13j%AD%13h%AB%13h%A9%14h%AB%15l%B1%15k%AF%15j%AE%15k%AD%17o%B4%17o%B3%16l%B0%18p%B6%17m%B2%18n%B3%19p%B5%1Bt%BB%1Ap%B5%1Br%B7%1Cu%BB%1Dv%BD%20z%C2%1Fs%B4%23w%B9%1Ed%9B(z%BB.l%9BA%8F%CCI%95%D2Hx%9Dk%AF%E5v%B7%EA%7D%BD%EF%86%C4%F4%89%C7%F7%8B%C8%F8%83%B5%DD%80%93%A12%85%C07%89%C1U%9E%D2u%B0%DB_%84%9ET%A0%CF%BE%E0%F1%E8%F6%FD%9F%A1%A2%FB%FD%FE%F8%FA%FA%B1%AA%A3%AA%A7%A4%B1%AA%A4%AD%A8%A4%A7%A5%A4%A8%A5%A4%A5%A4%A4%FF%FF%FF!%F9%04%01%00%00%FF%00%2C%00%00%00%00%20%00%20%00%00%08%FF%00%FF%09%1CH%90%60%87%11%24%FE%14%5C%C8p!%20I%E8%D4%A9%C3%A4.%9D%3AK%88%1Aj%14(%E8R%3AI%17%22%88l%C0%E0%00%22K%99%1Am%5C%08%B1%C4%01%09%1ED%84%10%C1A%C3%9F%09%09%A0%40%D4%B3%F2%1F%98s%8E%A0T%D8%F0%C1%03%07%9A%1E%3El%98%60%E1%CE%160%E8%0EmLsn%D0%18%0B%152%FC%01%01%C2%83%07%10%7F(%F8%B1%10%A7%0E%18%1C%E6%0Ci%2C7%08%0C%1E%3A%162%EC%E9%F3%E7%0F%03%08%7B2X%A0%83G%CE%994%2F%CC%CDa%C8%A8Q%945u%1C%E4%B1%E0%07%03%05(%F0%18!%E0%93%C7A%9D5n%C8x%C9Qn!%B7JA%D2%A4y%90%98%8E%1D%3E%3D4%05%08p%08%8E%E5%07h%D2t%09%D3%A4%90%B8%82%8C%02QY%90%E6%0Ci%3Cw%E8%18%B8%B7%FA%D1%98%3A%0F%CE(%20%83E%8B%14%1D%90%0A%8E%1BB%A5%0C%19%05g%D8%98%A9%83%C7%CC%22%13%EB%7C%C8%FFa%A3%9CL%19-Z%9A%24!%14h%E0%14EN%B4p%B3%FE%A6%0D%1B6r%E4%F8H%B1bM%9B6o%A8Q%067ZX%A1%CD%125%242%10!K%3CqE%16%DCx%C1%05%19%F5%A5%E1%03%3C%01h%E2%82%02%5Cp%81%057Y%5C1E%12I%40%D3%CE%40%81LC%C4%14Vh%F1%85%18eL%C8%85%0B%04%AC%16%09%12e%88%F1E%81S%5C%93%C4%11%CC%803%907B%24A%846%DBHQ%C5%8B%5E%94%F1B%01%ABM%12%C4%17UH%B1%CD%10D%FC%08%0D3%DDD%23%105%D1%1C%91M%83%2CJ!%9F%16*%D8%B3%1A%25%3FHa%C5%14O0%91%CD%11%D0P%23%0D2%C7%08%D4%0C5%D0L%03%04%10D%3C1E%13V4%A1%C2%00Q%E6%00'%11%7FNS%A747%04%13%83%40%CE%F0%40M5B%18%A1D%12%0D%3A%B1%C4%A1Q%EA%B0D%12J%18!D5vFj%C3%40%C4%20%D3%0C3%CC%40%FF%23D%11%40%90XD*P%06%40%090%40%60%23%C4%96%CC4%83%8C%0D%C5%18CP2%3B%EC%20%0D5%CCTS%8D5%D3%08%81%EBj%EF%C4%E0%2C3v%26%9B%8C%2F4%E8B%9006%04%83%CC3%3C%60%DB%AC4%A2%E4%FA%8E-%CC%F2%F0%0C2%C1%10%2B%8C.-%10%24%831%BE(%13%0C1%CE4%E3%8C4%CE%A4K-%0B%FE%12%13%8C2%BE%18%23C%2F%BC%2C%A4%CB0%C5%F8bC2%C1%2C%83L2%A2%AC%16%80%3C%2C%04%93%8C%0D%BE%143%8C.%BB%C8%F2%CAB%BB%C4%A2%8B%0C4%143%83%C4%BE%80B%CFj%EE%C4%02C14%CC%CB%F0-'34%CB.-%F4%B2%F20%C2%D0%10K%3B%F3%C0%13%CA%CA%BA%F4%D2%C2.%B7%D0%E2%CAF%AF%E0r%0B%D0%BB%F4%D2%CB%2F%AD%84%12%CA%2FX%DF%82%8B%D4%AB%F4T%8A*%B4%CCb%F5-%B7%CC%E2%B6%D8%B3H%0D%CB)%A8%F4%24P.%9C%90%02%CB%2B%AF%B8R%E27%DF%B0%AC%C2%0A*%9D%7Cb7A%E1%A0%C0%C9(%A8%B0%C2%0A%DD%A3%7C%B2%89)v%0B%60%B9%00%FC%E4%A3O%3D%F1%84S%0B%0A'%9C%E0%C97%E4%B0%83O%3E%FC%F8s%B9%00%0B%AD~%B9%3F%F9%EC%A3%0F%3E%FD%C8%AE%CF%3E%FD%B8~%F9%E1%BC%2F%14%10%00%3B",
    
    donateButton_small      : "data:image/gif,GIF89a%18%00%18%00%F7%00%00%00%00%00%FF%FF%FF%FF%F7%9B%FE%F5%AA%F6%E5%82%FD%EE%9A%FC%F0%A2%FE%EA%8A%FB%E8%8C%FD%EB%8F%F9%E2%84%F9%E4%8E%FE%EB%95%FA%E8%9A%FC%DEv%FA%DDy%F6%DAz%FF%E4%81%FD%E3%80%F9%DF~%F6%DD%7D%FA%E1%81%F2%D8~%F6%E3%A2%FA%DBv%FA%DBx%EC%CFq%FE%E0%7C%F2%D7%7C%E5%C1_%FF%DAm%FD%D9p%FF%DBr%FB%D8p%F9%D6q%FE%DAv%F6%D3s%FC%DBz%F2%D3z%FD%DF%85%F9%DC%8A%FE%E2%93%F8%DE%93%FE%D0b%FE%D5j%FE%D7v%F3%CEq%F8%D6%7F%F4%D4%84%F5%D8%91%F0%D6%96%F4%DA%9A%EB%BCW%F0%C6d%DA%B2%5D%EA%C3g%E4%BDg%E5%BEi%EE%C8n%E4%BFl%E7%C1p%F0%CBv%EB%C7x%EC%C8z%EC%CC%82%F0%D0%86%EE%D1%8D%F8%DC%9B%E2%B1Q%F7%C3Y%EC%BBV%E8%B9V%E4%B6X%E2%B6%5C%EC%BDc%D7%AE%5E%EF%C3i%DC%B3a%DB%B3%60%E8%BFh%E0%B8e%D9%B1b%D7%B0a%D0%A9%5E%DB%B3e%EC%C3r%D1%ACe%ED%C5t%EB%C4v%E3%C0v%EE%CA~%E2%C3%86%A4s%1E%A7v!%B3%80(%C9%923%CF%985%CE%975%D0%9A6%C7%926%D0%9B%3E%ED%B1I%C3%92%3C%CB%98%40%BB%8D%3C%E4%AFJ%BD%8F%3E%DC%A8I%DE%AAJ%E0%ABL%E0%ADL%D2%A0G%D6%A3I%D7%A6J%E8%B2Q%EA%B4S%E4%AFQ%EB%B5T%E5%B1R%E1%ADQ%DF%ACQ%DA%AAO%EE%B7W%E1%AER%E0%ADS%F1%BBZ%E2%B1T%AE%86A%E5%B3V%D7%A8Q%D8%A9R%EA%B7Z%DA%ABT%C9%9CM%DE%AFV%D6%A7S%E7%B6%5B%E6%B5%5B%E9%B8%5E%C6%9DP%DC%AE%5B%BA%94M%E9%BAa%EB%BCc%D6%AAZ%ED%BCe%EA%BBe%D6%AB%5C%D1%A8%5B%CC%A2Y%D8%AFa%E9%BDi%ED%BFl%D6%ADa%E7%BCj%EA%C0p%EC%C3v%CD%A8h%9Ai%1A%9Bl%1B%A0o%1D%94e%1B%9Cl%1D%9Bl%1D%9Ak%1D%A1p%1F%A5r!%A6u%23%8Fd%1E%A5t%24%A7w%26%B5%81*%AF%7D)%AD%7C)%AF%7D*%AC%7B)%C4%8D0%AD%7C*%B8%84.%B3%81-%92i%25%B1%80-%C5%8F3%A9%7B%2C%99n(%B1%80%2F%C3%8D4%DB%A0%3D%BF%8A5%BB%874%B7%853%D4%9C%3C%B8%854%B9%875%B2%823%B8%866%B3%845%99p-%EA%ADF%DE%A4B%95n-%E1%A8F%C7%93%3E%C5%90%3D%A6%7B4%E8%ABK%EF%B3O%C2%91%40%BF%90%3F%E5%ACO%AD%83%3C%A8~%3A%DA%A6M%A0y%3B%C7%99J%C3%95L%E3%B3a%D1%ADp%D9%B8%80%9Fk%1B%BB%857%B0%7F4%E5%A6D%90g%2B%AA%7C5%BE%8B%3D%BD%8B%3D%D4%9CE%96p5%BB%8AC%DE%A7T%C3%83%2F%AEw*%C1%866%B8%83%3A%82%5D%2B%B4%82%3D%C0%8AC%83Q%12%81N%12%92%5E!%A6m(%99g(%ABv4%7DI%10%96%5D%1C%A3e%20tG%17%BAv'%84T%1DrG%19%9Be%26qJ%1D%A7q2%91U%17%FF%FF%FF!%F9%04%01%00%00%FF%00%2C%00%00%00%00%18%00%18%00%00%08%FF%00%FF%09%1CHp%E0%1A%22G%8E%D08%82%A4%A0%C3%81p%3AP%60p%40%02%86%10%1F%22%A4%18%F2%E4!A%0D%02%04%0C(%40%01%C2%84%07!V%8C8%E0%C7%E3%BF%3B%3A%0C%148%80%40%C1%03%09%0F%3E%80%60QD%99%CB%3Bs8%CD%B8%A0%02%C5%0B%12%3ApP9%14%A6%97K%3C%88%1C%F9%08%22%C9%D91%5D%A7H%95b%D5%2B%DCO%260L%F4H%B2%E6%0C1%5C%C8%A4Yk%E3%D3%E5%1C%2CCc%04%F1%B1%03J%14K%84%C48%25%E8%A6%2F%11%22%DE%BCE%C3f%AEY%B21%AAF%95r%15%CCk%9C%0E%1C*l%C0%20%22%84%83%1316%8D%3B%87%0F%9D%B0b%C5%D4%B2Q%96%87%80%C8%01%07H%40%C80%E2C%0B%06%24%C6%B5%9BW%CEn%26A%60z!j%60%20%01%82%05%13(T%10%C1%C2%C3%0A%23%E9%F0%D9%AB%97j%14%A8V%C0%C4%C9y%14%E3B%83%05'J%90p%D1C%D3%1AX%94%F8%D8%FF%CB%07%FAO%A1%D1v%10%5D%11%A2%25%D2%20jfn%A9%AA%25%CB%97%8E%0D%EA%FA%5D%93%92%89Pn%81%8ET%A1%09%1D%BB%C0%92%0A*%B4L%B3%C8%0DE%A4%11%8F%3F%EF%84R%CA%2B%8D%094%C7%20Xl%A1M6%9DX%B1%84%13MLB%06%2C%DC%C0s%CF7%7F%AC%D5%96%1F%89T%11D%0F%7D%94%F1%CB*%A2xbJ.%D0%D4%90%DF5%99%04%D2%D4%40v%60%A2%05%0F%86%BC%81%063%C8T%D3%88%0D%0D%EEC%CF%3B%9E%C42%8C8%02%C5!%87%22A%CC%20%03%10Y%F0%80C%13N%40B%C6%17%F2%DC%93%CF4%85%B4%B1%CC%3F%D4%98%60A%22%97%00q%85%1E%C6%FC%E2%C5'%9E%9C%22%CC%3C%7C%B2SI%20%FF%DD%C1%C4ub%3DQ%A4%1A%CC%90S%8D4%DD%D8%03%A1%3B%DB%CC%D2%8D%40%7B%D4%B1I%5C0%F4%90%C3%12STR%88%18%BC%EC%93%8F%3E%FC%ACS%10%20%92%FC%00%C4%23V%D9%D2%C5'%5CH%11%EA%12AJ%5C%C2%08%1C%CF%80%F3%CD%3A%A6%CE%1A%10%00%3B",
    donateButton_normal     : "data:image/gif,GIF89a%20%00%20%00%F7%00%00%00%00%00%FF%FF%FF%D5%A2H%AE%7C7%FF%F5%91%FF%F6%A5%FC%F4%A3%FF%F3%9A%FC%F0%9D%FA%EF%9C%FF%F3%A1%FC%F0%9F%FC%ED%99%FB%ED%9A%FE%F3%B5%F7%E3~%FF%EA%88%FF%EC%89%FF%EC%8F%F9%E7%92%FE%ED%97%FF%EF%9A%F8%E7%97%FD%EE%9E%FF%E6%82%FC%E4%84%FF%E7%87%FF%E9%87%FC%E6%87%FB%E1~%FD%E3%80%F8%DF%7F%FF%E6%8D%FC%EC%B0%EA%CAh%F6%D5q%F5%D6p%FD%DDu%F8%D9u%FF%DFy%FC%DDx%F7%D8u%F4%D6t%FE%DFz%F6%D8v%EE%D1s%FC%DE%7B%FC%E0%89%FB%E1%90%E5%C1a%FE%D8n%F6%D1j%F7%D2l%FE%DBs%F6%D5r%F1%D3~%F9%DF%93%FA%E4%A4%FF%F2%CC%FB%CE%60%FC%CFb%FF%D4g%FD%D3g%FA%D1g%FD%D2i%F6%CDg%EF%C7e%F7%D3t%FA%D5z%FA%D8%81%FA%D8%87%F5%D4%85%F8%E5%B5%E6%BA%5B%FE%CEg%DA%B2X%FE%D0i%FA%CDh%EF%C6i%E1%B9d%F3%CBq%F3%CCx%F6%D1%7B%FD%DC%93%FF%E0%97%FA%DB%97%F7%D9%98%F6%E8%C7%ED%B6L%FC%C3S%FB%C4W%F8%C1W%FB%C7%5B%F4%BFY%E7%B6W%EE%BC%5B%EB%BD_%CF%A7T%EE%BFa%EA%BCa%F3%C5g%E1%B7a%E1%B8c%BF%9DU%FC%CFu%EF%C5r%E9%C0q%DE%B9o%ED%C6%7B%EE%C7%7C%EB%C7%7F%F9%E4%B8%87X%05%8D%5E%07%8D%5D%07%9Ek%0E%98f%0E%ACv%16%BD%86%1E%B5~%1D%C8%8F'%B0%7C%22%D1%97-%BB%86*%B6%84)%EA%A96%E6%A67%F1%B2D%F6%BAI%FC%BDK%E7%AFL%D7%A4H%D6%A2H%DB%A7K%DD%A9L%EA%B4S%DB%A9M%DA%A7M%E0%ADS%DF%ACR%E7%B3V%E1%AET%E2%B0U%E5%B3X%E9%B8%5C%C0%97L%F0%BFb%E6%B7%5E%BF%97O%EB%BBb%A5%82E%D4%AA%5B%B2%8DL%CC%A4X%E8%BBf%CB%A5a%E2%BAo%C8%A3b%C9%A5c%DD%B7o%E1%BD%7D%7FP%04%80V%10%B4%7C%1D%93e%19%81X%17%C9%8C(%D1%94%2B%D0%93%2B%F0%B0I%DA%A1D%AD%808%E0%A7K%CB%99D%C8%96C%CD%9BE%C0%91C%AE%86B%A8%81A%CA%9CQ%BF%95M%B7%8EK%9Cy%40%9CzC%BE%97W%CF%A6%60%C4%9F%60%BD%9A%5E%83P%06zO%0F%E4%9E8%EF%A6%3C%88_%23%D7%99%3C%A8x2%B2%809%B4%83%3A%D3%9BE%DD%A2I%AE~%3A%A3w8%A1z%3F%9Cv%3D%9Ex%3F%A8%81E%B9%8EM%98u%40%D5%A6cpA%03wL%12zP%16%C5%81%25%AAs'%C0%82.%C4%887%AEz6%A0s4%8De%2F%96l3%9Dq6%98m5%9Ds9%B9%88F%C8%94N%90l%3B%98s%3F%9EyG%A3%80O%9C%7BN%9C~Uk%3F%0A%92Y%11nC%0E%A0c%1B%C8%82)%BBw'%ADv0%82Y(%B6%7F%3B%AF~A%BD%89I%7F%5C3%88e8%7BZ3vC%08%88N%0FrC%0D%9A%5B%15%B2k%1B%92%60(yX2%7CO!%7FR%23sK!wM%23%FF%FF%FF!%F9%04%01%00%00%FF%00%2C%00%00%00%00%20%00%20%00%00%08%FF%00%FF%09%1CH%B0%20A%01%08%13%0A0%C8%B0%A1%00B%88%92%08%09%E2%83G%8F%1F%24%9Cx)%B4%B0!C%011%1E%1CP%20%81C%07%133~%94%00%E1%40%C7%11C%1E%0B%22%12A%A0%40%03%07%154%B4%F8%B0!%05%86%15%3E%80Pp%E1*%E6%40EE%0C%20X%C0%60%82%05%0D%19%20l%B0%F1CF%8D%1D%5C%06%18%15%A8H%CB%94%10%17%22%40%F0%A0b%04%0A%16'h%10A%83E%8F%D6%AD%8A%B201%82%E4%CA%1B%2BU%A8D1%B3%C6%13%25%3Ev%F0%BC5%BA%88%91%24)0%5E4%01%D4%E7%D4%1D%3Ap%E2%CC%A9%93G%18%B1%AD%FF%14%91%11S%89%8D%1BM%82%FC%A0%1AEJT)%60%D9%90%0D%1A%1C%B3%EB%94%1C8%A0%3C%B9%94%89%12%26K%B6bmJ%D3%96%B5GV%81%94%D0%B5%8BW%2F_%BF%80%05%1BT%980%98%AF_%A9%BE%809%F4%A7%F1c8r%26W%1E%26%F0a%C4%89%15%2Ff%FF%DC%A8%CAX1k%EB%A6%99%22m%1A%B5j%AD%20E%924%89R%25K%97%86%82Yc%97%8F%DF2%DC%B1%E8%A2Fo%89%D0d%13N%3A%F1%E4%13PB%B9%D0%CA3%DF%C0%03%CF%2C%C7%FD%15%D8%00H)%C5%94SPIE%95UX%0DP%8C%3A%F8%DCs%0Ed%D9Q%26%CC0%AE%81%25%16Yf%A1%A5%16%5Bn%BDT%8D%89%A5%9D%96Z%2B%18%CA5%DC%5Dy%ED%D5%97%85%82%0D%F5%CA%3E%FE(c%8B%2C%02%F6%D6%88a%88)%C6%98c(j'%0C%2C!%C2%E3%CE0%9F%20w%E1%3F%8F%40%D2%D9g%A1%8D%96%A3%7B%B9%D08%40%3A%F5%D0%13J%8A%95%5D%26%90%23%5D%88Q%C6%25%B50%13%8E8%E4%88%93L'%5E%0Af%085%F6%F4%A2%232%3C%0E%F4%E4a%89-f%1Dd%92%A9%18%89%0B%AF%F8%93%8D%2C%BB%0C%E8%16Aa%8E%09%9Ah%EC%E9%D8M%18!%5E%E3%0D.D%FA%A6%C8%16P%B4%01J%26y%86%9E%E3%CC-%96%9C%B1%C4Z%BD%D1%03%0D%2FVr7%90%00q%CDU%17%90%C6%0D%99%DC%00%F6%98%13%0Dj%DB%24*P%81I%40%D9%E8%94%D7%C1)%0C6%FD%B4%A3%CD.%9C%F4vT%11%09%DC0%86%A7e%86%8A%1A7%EF%B8cj3%B4%1C%7B%94W%60u0%84%13e%CC%12%2B8%E5%8C%B3%CA%1E%03%DC%D3%E6%AEV%5Es%94%8F%C3%16'd%A0%FD%D6c%0F%3A%D2%A0%A6%0D6%04)%22%AD%94%8Fbg%E51z%CA3%8F%3E%F14%D4%A9g%9F%9A%D9%5E6%0FcV%90%18%93%5Cbo%C6%1Bw%8CY%40%00%3B",

    saveButton_small        : "data:image/gif,GIF89a%18%00%18%00%F7%00%00%00%00%00%FF%FF%FF%FB%89%08%F1z%00%E3%A2X%CF%E7%FDd7%01636646545'%25(547215%16%16%1833677%3ABBEAAD%3F%3FB%3E%3EAEEH%3A%3A%3BGHLRSW%5B%5C%60Z%5B_YZ%5E*%2B.34789%3C5699%3A%3DBCFFGJSTW%5E_b%0E%0F%11%24%26*')-%3C%3EB%24%25'LNRQSW()%2B%2C-%2F%5C%5Eb013%2F02235679%3A%3B%3DABD%3F%40B%3D%3FBIKNPRUOQTNPSLNQUWZTVYSUX%20%23'%3B%3EBWZ%5E%0E%10%12%23'%2B%96%A2%AE%81%8B%95(%2B.58%3B%24%26((*%2CDGJILOORUKNQQTWPSV79%3B68%3AWZ%5DVY%5C%26'()*%2B%C1%DF%FB%C2%E0%FC%C9%E0%F6%C5%DC%F1%95%A2%AE%CE%E7%FD%D1%EA%FF%CF%E8%FD%C6%DD%F1%D4%EB%FF%95%A2%AD%99%A5%AF%D2%E2%F0%D1%E1%EE%D4%E4%F1%D2%E1%EE%C9%D7%E3%D2%EB%FF%D5%ED%FF%D7%EE%FF%D2%E2%EE%D6%E5%F1FJMIMP%CB%D5%DDUY%5C%CB%EA%FF%97%A5%AF%22%25'%E1%F3%FF%E2%F3%FF%D3%DF%E7%D6%E2%EA%D4%DF%E7BEG%3FBDFIK%CE%D5%DAVY%5B%CC%EB%FF%E2%F4%FF%D8%E3%EA%CE%ED%FF%CF%EE%FF%D4%E0%E7%D4%DE%E4%C8%D1%D6%D5%DE%E3%D2%DB%E0%DA%E1%E5%D8%DF%E3%CF%D6%DA%E4%F6%FF%26()%D1%DB%E0SWYX%5C%5E%2B-.-%2F0134%D7%DF%E3689%D9%E0%E3%E6%F8%FF589%DC%E3%E5%5Ceg%8C%96%98cnpU%5B%5C%A4%AA%ABs%81%83%8D%9A%9C%AE%B5%B6~%8F%91qz%7Bfstr%7F%80%7D%88%89%AD%BA%BBo%80%81o~%7Fm%7C%7D%85%96%97w%86%87m%7B%7Cy%88%89r%80%81%89%98%99%D2%E6%E7%B1%C2%C3%C1%E0%E1%C6%E3%E4%CF%F6%F6%CD%F3%F3%CF%F5%F5%CB%EF%EF%B8%D9%D9%CE%F1%F1%D3%F6%F6%C9%EA%EA%CA%EB%EB%C5%E5%E5%D7%F7%F7%D1%F0%F0%CE%EC%EC%CD%EB%EB%C6%E3%E3%BE%D9%D9%D1%ED%ED%CA%E5%E5%C9%E4%E4%DC%F9%F9%D6%F2%F2%D3%EE%EE%D2%ED%EDq%7F%7F%CF%E7%E7%CD%E5%E5%E2%FA%FA%D8%EF%EF%D7%EE%EE%DA%F0%F0%D4%E8%E8%AC%BC%BC%E1%F5%F5%DD%F0%F0%C2%D3%D3%C0%D1%D1%BC%CC%CC%B9%C9%C9%E9%FC%FC%DE%F0%F0%B7%C6%C6%B6%C5%C5%E0%F1%F1%DE%EF%EF%BE%CC%CC%F1%FF%FF%E0%ED%ED%EB%F8%F8%F3%FF%FF%F0%FC%FC%EE%FA%FA%CD%D6%D6%DC%F4%F3e7%01%E6%A5X%D7%9CUf7%02_4%02%FF%8B%07%ED%82%09%EE%83%0A%E2%A2X%D8%9BU60)%F5%7C%00%E5u%00%15%13%111.%2B0)%2381%2B71%2C3%2F-%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%FA%00%2C%00%00%00%00%18%00%18%00%00%08%FF%00%F5%09%1C%08%CA%9B%B6%83%DA%B6Y%A3V%EDZ%B4%81%10%9F%8C%C0%B0%03%C2%A8o%E3%C8i%14Wn%93%A7p%E0%F6h%18!b%20%8C%0C-%A4P%60%25%8D%5B%B6n%D3%B0ab%91%04%9A%AB(%18Zh%E8%20p%81%94F%8C%40%B02%F7%ACY3g%CC%3A%3DH%A1l%99%14)%40%A4%2C%10%E8a%87%94%1E3D%19%3B%86%0C%99%B0b%AD%16%B0%19F%CC%0D%0F)%3B%3CP%ED%B1%A3I%84d%BD%7C%FD%9A%CB%0B%15%835%B1%80%B9%B9%C0%A3%87Z%7D%1ET4q2A%D4-%5D%B9%12%E3%FA%A4%A0%06%AC%5D%9A%96%0C%86%22P%12%0E%1C*%24%84%AAEk%96gY%C1H%BD%A2e%CBI%8E%CB%94%F5%C5%D0%91%22%C7%8D%3C%99L%9D%9A%AD%8A%D3%AAT%A5.%D9H%A1C%C7%13%811l%D8%981a%82%87%04%08%92%1FH%9E%BC%02%8D%196%94%A4%F6%10%C2%02%110C%B2%0C%C9%9E%A5%BB%F7%2Fp%88X%FF%08Q%89*%84%14c(%F5Y%DFg%CE%1C9%F0%E3'%0A%C3d%C6_%0E5l%20%B24%E9%90%FF%FF%87D%22%60%24%86%E8aC%0D%7F9%20%83%05W%A0%E1%C5%83%10%3Eh%C6%84%5B%9Cq%85%05%1Fp%20%10%24%0F%DC%D1%86%1F%81%84(b%88v%D0ab%1Dm%DC%F1%00%03%02%B9%E0%00%1Ee%A8%91%C6%8C4%CEH%C6%8Db%8CQ%06%1E%0E%B8%20%D0%23%2F%FC%D0%85%19%5C%14%60%E4%91Hj%B1%05%16'%BC%F0%88%40%1B%B0%F0%C1%20%84%14be!%8Bd%A9e%96%82%0C%F2%81%23%8E%08%B4%C2%0AFX%01%08%1Fo%A4%C9%C7%9Ah%A6%F9%C6%1FUt%40%05%12%02MQB%3E%F0%A0C%C0%9E%7C%F6I%C0%3B%E8%A4SO%1C%8A%08t%84%0F%F6%CC%23%CF%00%8C6%EA(%A3%F2%CCsO%11(%08%D4%80%10%F8%B8%C3%8E%00%9Cv%EA)%A7%EC%B4%13%8F%09%0D%0CD%02%3D%EB%9Cc%C0%AA%AC%B6%BA%AA%3A%EB%D0%0A%13%04D%B4%D6j%2BD%01%01%00%3B",
    saveButton_normal       : "data:image/gif,GIF89a%20%00%20%00%F7%00%00%00%00%00%FF%FF%FF447TTVZ%5B%60%3D%3EBFGKJKOUVZZ%5B_YZ%5EWX%5C014%3A%3B%3E9%3A%3D%40AD%3F%40C%3E%3FBEFIBCFABEJKNFGJY%5B%60CEIBDHIKONPTLNRSUY*%2B-()%2BXZ%5EWY%5DUW%5B%5B%5DaZ%5C%60%2F02.%2F1-.0124568%3B%3C%3E%3A%3B%3Dkln79%3C68%3B9%3B%3E%3C%3EA%3B%3D%40BDGACF%3FADDFIJLOIKNGILOQTLNQUWZSUXQSVZ%5C_WY%5CVY%5DY%5C%60%D4%E8%FC%D6%E9%FC%D8%EA%FC%9B%A7%B3%24%26((*%2C)%2B-ADG%2F13-%2F1ILONQT357246PSV79%3B68%3A579X%5B%5EVY%5C%3B%3D%3F%3A%3C%3E9%3B%3D%3FAC%3D%3FABDFGIK%25%26'%26'(%8C%8D%8E%CF%E6%FC%D0%E7%FC%CF%E6%FB%D1%E7%FC%D0%E6%FB%D2%E8%FC%D1%E7%FB%D3%E8%FC%D4%E9%FC%D3%E8%FB%D5%E9%FC%D4%E8%FB%D6%EA%FC%D5%E9%FB%D7%EA%FC%D6%E9%FB%D8%EB%FC%D7%EA%FB%CF%E7%FC%CE%E6%FB%CF%E7%FB%D0%E7%FB%D3%E9%FC%D2%E8%FB%D3%E9%FB%D5%EA%FC%D4%E9%FB%D5%EA%FB%D7%EB%FC%D6%EA%FB%D7%EB%FB%9A%A8%B3%2F249%3C%3E%3C%3FA%3B%3E%40DGINQSLOQ%23%25%26%25'(%24%26'')*%26()*%2C-)%2B%2C(*%2B%2B-.023-%2F0245134578%3D%3F%40%25()(%2B%2C%2C%2F0%2B.%2F-01478%E4%F3%F4%C5%E8%E9%C9%E9%EA%D0%EC%ED%DA%EF%F0%C3%E8%E8%C5%E9%E9%C6%E9%E9%C8%EA%EA%C9%E9%E9%CC%EB%EB%CD%EB%EB%D0%ED%ED%D1%ED%ED%D0%EC%EC%D1%EC%EC%D5%EE%EE%D9%F0%F0%DA%F0%F0%D9%EF%EF%A2%B2%B2%DA%EF%EF%DD%F1%F1%DE%F1%F1%25((%B6%C4%C4'**)%2C%2C%25''(**%F5%FB%FB%C5%E9%E8%C6%E9%E8%C9%EA%E9%CC%EC%EB%D0%ED%EC%D9%F0%EF%DA%F0%EF%DE%F1%F0%DB%D4%C5%DA%D3%C5%D7%D1%C5%DC%D4%C5%DB%D3%C5%DA%D2%C5%D8%D1%C5%D7%D0%C5%DC%D3%C5%D8%D0%C5%CAm%00%EE%80%03%F2%87%0E%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%D0%00%2C%00%00%00%00%20%00%20%00%00%08%FF%00%A1%09%1CH%B0%A0%C1%83%08%13*%5C8b%C2%8C%09A%0CL%A8E%B1%A2E%8B%9C%04%3C%9Cap%C2%17%16%2C%22%B2%D0E%B2%A4%C9%93%03%40~%E1H%90%C2%85%20%04%22%FA%90%25L%D6%AC%9B%C2pF%DAI%D3B%02%02%24XP%20%F8%80%8A%02%10%11%15%04k%D5%0A%14%B0%60%B1Z%01%7B%15)C%86W%AE%24P%D9%AA%E0%01%C1%2CU%16%FC%88%08%84%95%D9%B3h%ABf0%8B!%C4%82%10%3F%20%10%8C%20B%C4%8E%88%22T%7DJ%85jU*U%7D%7F%A9%FD%B5JF%5D%11%08%22%10%D4%C2%A3qD%1E%A6N%99%9Al%CAWdSj'S%E8%D0%98G%25%821z%F4%80%12%B1%07)R%9Ez%9D%3E%ED%89%94ZR%A5%20%88%1E%3D%88%60%83%0DMrD4%C0%AB%93%A8%DF%A3v%09%EF%A4v%D4%A8%02%85p%E7PA%D0%81%0EC%1CB%06%81%15%AA%BA%F5%EB%D7%AD%E8%D8%AE%03%0B%C1%166%0E0%FF%B1a%83%C9%8B%06%2BV%BC%C0%82%1E%CB%8B%F4%2F%CE%AF%B8aCC%85%16%04%5D%E0%D8%CF%BF%3F%97%FD%FF%E1%F0_%80%04%E2%20%05AS%10B%C8%1Fp4%E8%E0%83%10BXD%0D5PB%90%13%5B%24%E1G%1C%0D%F2%C1G%87%1E~%F8!%1CD4HD%89%5Bl%E1%04AO%D0%90%C51%CB%18cL%8C%C3%2C3%8C%8C3.%13c%8C%C6%C0%B8L%164HB%10%0A0%C0%E0%06%1Bl%C4%81%A4%1BG%22%89d%1FN%F6!%25%1Bn%C0%20%C8%24%04%95%10%C8%0AC%A8%91%87%1Ao%F4%F1e%1EC%E4%C1F%1Eh%B21D%1Fj%B0%B1G%1BW%5C%A1%04AKD%11%052x%22C%8C%9Ey%E6%B9g%9Fy%DA%B9%04A%98%A4%90%02%1Ak%E0%81%C6%19k%D8!%84%1Di%A0%A1%C7%1Ai%E0%11%A9%1Dz%08%91%86%10Slr%02A%8F%3C%F1%C4%19e%A4qF%1Aw%9CJ%EA%1D%A8%9Eqj%1A%A8%DE%BC%C1%AA%A8%8F%10%E4%01%20%90%24S%8C2%CA%EC%CA%8C2%CC%14%A3%EB%B0%CC%24%13%2C3%BF2%C0%00%23%04%1D%B1%84%09f%D4%11%C6%B4f%98%11F%B5%D1V%5BG%1Df%8Cam%B4Khr%09A%B9d%92%09%19u%90A%07%19%60l%BBn%18b%90!F%1Dr%C4%2B%C6%BAb%3C%F2%C8%07%04-%82D%23b%88%01F%C0%02%07%3C%07%C1%08%8B1%07%18%077r%CB%22%04!%A2%88-%CETl%F1%C5%18g%EC%8C%23%8A%20BP%22%96%D0%A2%F1%C8%1A%7B%01%8D%11%04%1D%82K%22%CF%B4%EC%F2%CB0%C7%FCL%17%5D%1C%92%F2!%874%A3%F3%CE%3C%F7%ECs38%DB%BC%D0%D0D%17mt%40%00%3B",

    cancelButton_small      : "data:image/gif,GIF89a%18%00%18%00%F7%00%00%00%00%00%FF%FF%FF%B0%00%00%B3%01%01%B6%03%03%B5%03%03%B7%05%05%B9%06%06%B5%06%06%C0%07%07%BB%07%07%AD%07%07%B7%08%08%BC%09%09%C2%0A%0A%BE%0A%0A%BC%0A%0A%BA%0A%0A%C1%0B%0B%B2%0A%0A%C5%0C%0C%BB%0D%0D%B1%0C%0C%C1%0E%0E%B7%0D%0D%C5%0F%0F%C2%0F%0F%BF%0F%0F%BA%0F%0F%CA%11%11%C6%11%11%C3%10%10%B6%0F%0F%B4%0F%0F%CA%12%12%B4%10%10%C6%12%12%C8%13%13%C5%13%13%BB%12%12%B8%13%13%D0%16%16%CF%16%16%CB%16%16%C3%15%15%B9%14%14%CD%17%17%BF%16%16%C3%17%17%C1%17%17%A9%14%14%9D%13%13%90%11%11%CB%19%19%BC%17%17%91%12%12%D0%1A%1A%CF%1A%1A%9D%14%14%97%13%13%87%11%11O%0A%0A%A0%15%15%D7%1D%1D%CC%1C%1C%9F%16%16%99%15%15%7B%11%11y%11%11k%0F%0Fe%0E%0E%D2%1E%1E%93%15%15q%10%10o%10%10%D1%1F%1F%C8%1D%1D%C4%1D%1D%87%14%14%C2%1D%1DV%0D%0D%D6!!%D5!!%89%15%15%DE%23%23%D5%22%22%C5%1F%1F%C2%1F%1F%D9%23%23%89%16%16u%13%13%DE%25%25%A3%1B%1B%DE%26%26%D6%24%24%D2%24%24%C3!!%C1!!%AB%1D%1D%94%19%19e%11%11%D9%26%26%CB%23%23%A5%1D%1Db%11%11%CC%24%24%7B%16%16q%14%14%BA%22%22%B7!!%E4**%C9%25%25%E3%2B%2B%C9%26%26y%17%17%E4%2C%2C%BE%25%25%B6%23%23w%17%17%D9%2B%2B%E3..%DC%2C%2C%8F%1D%1D%E4%2F%2F%CB**%B4%25%25%AC%23%23%B6''%EA33%C6%2B%2Bt%19%19%EC44%EB44%C7%2C%2C%E433%C1%2B%2B%B7))x%1B%1B%ED66%E444%C5--v%1B%1B%C9%2F%2F%F399%C6%2F%2F%EA88%E988%C4%2F%2F%F3%3B%3B%C500%C711%82%20%20%F9%3F%3F%C822%C722%B7..%CC44%C422%CF66%C333%B800%CA55%C544%BF22%BA11%B700%B2%2F%2F%B200%A1%2C%2C%CA88%C977%BA33%B111%D2%3B%3B%CC99%C677%C577%E1%40%40%D1%3B%3B%C377%AC11%C399%E0BB%C5%3A%3A%CC%3D%3D%C9%3C%3C%AE55%C6%3D%3D%BE%3A%3A%CA%3F%3F%C8%3F%3F%A955%D6DD%C7%3F%3F%D2DD%C9AA%C6%40%40%D0DD%BE%3E%3E%BD%3E%3E%D3FF%C7BB%BF%40%40%C0AA%C1BB%D3II%D4JJ%D0LL%C9JJ%CAKK%CFOO%CAMM%CBOO%CCQQ%C9PP%CCRR%CBQQ%D5WW%CDTT%CASS%CBUU%CBWW%CEZZ%D0%5E%5E%CF%5D%5D%CF__%D0aa%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%E3%00%2C%00%00%00%00%18%00%18%00%00%08%FF%00%C7%09%1C(%F0%0F%2Ff%CA%98%F1%BAD%B0%A1C%5E%DC%C0i%9B%06-%1A%B5l%D2~9t%D8%ED%1B4b%20%83%ED%BA5k%D7%B3f%896%8EC%24%0E%1BH_%AA%26%1Db%94%E9%15%ACO%B9%84%D9%D9%18.%1A%B1d%A3%B8(%19%98D%0C%23Q%9DD%05*%D2p%5B5%90%C4FmLBGS%25Kl%08%AE%02%F73%D8%AD%5C%A7T%8AJ%05%A9%D0%94%81%D6%A2%01%1D%95k%96%ABM%1B%D5%14s%E4%A8%CD%40o%C4%7C%9D%19g%CA%15%2CNu6%82%E2%C3%02%06%94q%A4%AE%11SED%20%A2%26%1C%1CXp%A8%C7S%06%0D%3C%C6%1D%9BF%CCR%8F%81%0B%12%40%A0%10%C2%A1%AC%1A%24v%8C%5B%16-%D8%A4%86%13(%5C%10%81%A2a%AF%25%2Bt%8C3%16%ED%16%98%CF%041t0%91%C2%06%C1%5EUr%08%19%C7jZ%8B%03C%1C%9EPQ%E3%C7%13%81~%80a9%E2D%A0%2C%01%04dl%A5%8C%F1c%09%950%E3t%C5%DA%22%E5%F08Q%08%06T%D0%B2%91%09%952n%EE83%04%E7%CA%40T%60%0C%60%40%0B*%99%E1%06%1E%84HB%C8%1CY%10%14%0A%03%05Dp%88%1C%1B%E5%01%88%22%94%3C%F2FC%8D%C4a%C0%01%2F%84R%8A%20%03%F5AK3%91P%82%09%1Eh8d%C7%06%07(%B0%01%1F%AD%E0R%CB0%C8%D8%B2%C8%20%8F%EC%B1%86JE%80%D0%C0%03%12x%00%C4%17%5E%60%D1%C5%1Cs%A4A%86J%03%D10%C2%05%1F%94%E0%02%0EGDa%C5%18P%3Ad%C4%0D3%F8%10%04%12Ovi%A6%99%01%01%00%3B",
    cancelButton_normal     : "data:image/gif,GIF89a%20%00%20%00%F7%00%00%00%00%00%FF%FF%FF%B3%02%02%B4%03%03%B5%04%04%B2%05%05%B7%06%06%AC%06%06%B8%07%07%B9%08%08%BA%09%09%B5%09%09%BB%0A%0A%BC%0B%0B%B6%0B%0B%B5%0B%0B%AE%0B%0B%AA%0B%0B%BE%0D%0D%B2%0C%0C%BE%0E%0E%C1%0F%0F%BB%0E%0E%B7%0F%0F%B1%0E%0E%C2%10%10%C1%11%11%B7%10%10%B3%10%10%AE%0F%0F%C4%12%12%BA%12%12%B0%11%11%C6%14%14%AC%11%11%B6%13%13%B0%12%12%BB%14%14%B4%13%13%AA%12%12%C9%16%16%CA%17%17%BC%16%16%CB%18%18%B7%16%16%BA%17%17%CD%1A%1A%C4%19%19%BB%18%18%CE%1B%1B%B5%18%18%B0%17%17%AE%17%17%B0%18%18%AC%17%17%AB%17%17%D0%1D%1D%AD%18%18%AB%18%18%A7%17%17%8F%14%14l%0F%0F%D1%1E%1E%AF%19%19%A3%17%17%A0%17%17%9C%16%16%D2%1F%1F%C5%1D%1D%B7%1B%1B%9F%17%17%91%15%15%D3%20%20%CD%1F%1F%B4%1B%1B%AC%1A%1A%A8%19%19%A0%18%18%97%17%17%91%16%16%8C%15%15%C8%1F%1F%BB%1D%1D%94%17%17%D6%22%22%D1!!%AB%1B%1B%9E%19%19%98%18%18%93%17%17%8C%16%16%84%15%15~%14%14%D3%22%22%B5%1D%1D%B2%1D%1D%B1%1D%1D%AC%1C%1C%A8%1B%1B%A7%1B%1B%A1%1A%1Au%13%13%CF%22%22%C5!!%AF%1D%1D%A4%1B%1B%9C%1A%1A%D9%25%25%B2%1E%1E%AB%1D%1D%9F%1B%1B%92%19%19%C9%23%23%B1%1F%1F%AE%1E%1E%A8%1D%1D%85%17%17%DD''%C0%22%22%A2%1D%1D%DD((%CA%25%25%BF%23%23%BB%22%22%B2%20%20%8F%1A%1A%DE))%DB))%C6%25%25%B1!!%82%18%18%D4((%E0%2B%2B%DD%2B%2B%E2--%E0%2C%2C%DA%2B%2B%B2%23%23%B1%23%23%E3..%DC%2C%2C%E6%2F%2F%B6%26%26%DA..%B8''%E722%E311%BD))%BA))%B6((%EA55%EB66%BA%2B%2B%B8%2B%2B%C7%2F%2F%BB%2C%2C%B7%2B%2B%B3**%F1%3A%3A%ED99%C0..%E077%C600%B7--%C511%F4%3D%3D%F3%3D%3D%D977%BC%2F%2F%BB%2F%2F%E099%BC00%BB00%C533%B6%2F%2F%B5%2F%2F%D177%C444%DB%3B%3B%D088%C033%BF33%B711%B400%CB77%C455%B722%C466%C488%BF77%B855%C188%B766%C6%3B%3B%C4%3B%3B%DADD%C5%3D%3D%C5%3E%3E%C6%3F%3F%D6EE%DDII%C6AA%BB%3E%3E%C6BB%C8EE%C7EE%C5DD%E7QQ%C7FF%DAOO%C7HH%C4GG%C9JJ%C7KK%D0OO%C7LL%C8NN%E3%5C%5C%C9QQ%E4%60%60%CDVV%CBUU%C9UU%CAWW%CCYY%CF%5B%5B%CF%5C%5C%CB%5B%5B%D5%60%60%D8dd%CE%60%60%CFee%D6ii%D2gg%D7jj%D1gg%D3ii%D5kk%D1ii%D6ll%D3kk%D7pp%DBuu%D8ss%D7ss%DAvv%D8uu%E9%7F%7F%DF%7D%7D%D8zz%DA~~%EE%8A%8A%DE%81%81%DE%84%84%E2%89%89%FF%FF%FF!%F9%04%01%00%00%FF%00%2C%00%00%00%00%20%00%20%00%00%08%FF%00%FF%09%1CH%F0%1F%0D%1A9j%D4%C8%91cG%C1%87%10%07%CE%98%B1%8A%1B%3D%7B%FE%FC%D1%8B%D7%8DU%0E%20%11C%CE%90%C6O%9F%3Bp%DA%AEI%93%A6M%DC%3C%7C%D3t%84%2C8%03%D2%BC%7C%E3%A4-Kf%ACX1b%C1%82%09KF%8E%5D%25%233%FF%CD%60%D5%EF%1C%B5%9D%C6~%A5%C2Di%13-%5E%BCv%ED%0A%86%8E%13%D2%883R%F1%1B%07m%99%B1M_%96%18%E1q%24%C8%120%94r%C9%CD%25%0C%8D%93%88%90%FA%8Dk%B6%B3%96%91%1E%10%9B%F0%01%D5%AA%B0%A3%1F%10g%CC%3BW%96'%B1%5B!%A1%A0%89E%AAr%1C%26%0F%7B%E5%D3%E9X%E8%AB%99%8A%C4%89%125i%09%CDx%E0%FA%02%15%96uTH%2C%BE%D4i%D2%84f%0CAH%FA%A4%25C%B5%E3%16%EB%5D%B9be%0A%C9d%1D.%40EL%0F%C4%B6%CE%EC%972%FF%5C%01%A7l%87DH%5D%E5*X8%B1E%20%0Ds%DF%92%FD%FFB%2Cp%94%9E%12%08%120%C0%101%0C%3F%22%1ADL%11%98%03%1E6c~%09BH%CF%A0%81%04%0E%10%8DA%CF%2C!%80p%05%7D%EBTc%0C%26A%14%04A%7F%12T%90%C1%08%0F%89%B1%CE1)%98%A0%06%82%D2%14CI%83%05a%10a%06%1E%84%D0BAb%A4%13%8D%0B%23l%F8O%0E%ECTCL%11%20%16%C4%01%89!%A0%B0%02%0C%04%89Q%0F28%B0%E0%E2%0D%E6%5C%B3A%01%E4%3D4B%8E%2B%C4%80%83%14%03%B5%E1%8F%2CC%C8%F0%C6%40%D78%23%80%003p%11%91%0AM%E2%80%04%15g%08%A4%CC%3D%8FT%A1%84%97%029%C2%8D%00%03L%80YD%2F%88I%C5%1Au%E41%C7%3B%DB%F8%91D%18%04%DD%00%CE%06%03%100%C3%13!Eq'%1E%84%2C%82%CC%3E%AA%1CB%84%1B%05%B1bL%A1%0B%24%09%91%19%8C.%12%C9'%CF4%F2%07%1B%D0%11%B4D8%17%10%60%80%03%3Fd%11%D2%20%9EZ%AD%F2%89'%96%E4q%07DlP%A3*%02%CC%D8%92FDs%C8%22%AB)%A6%20%12GDBp%B2%87%01%09(%60%8D9%9DX1F%1Ai%CC1%070%ED%EC%83%8C'%A5H%12%88%20!%05%91%C8%01%08(%D0%00%20%E4%C8%C3%8E7%DE%BC%83%CF%3D%D9%84%D2%C8%25%8C%04%D2GRN%D8%10%C1%02%FEU%10%05%2C%C7%203%CC)%88%D4aH!p%C8%01nR%021qB%04%0FPPb%0A.%F8%80D%17UD%E1%C5%AD%0C%13%F4%C4%187%9C%D0%01%07%1B%7C%A0B%0BJ%A0%91%06%1D%1DG%A4%C5%15d%84%11%06%19j%B0%DC%F2%CD8%E7%DCr%40%00%3B",

    closeButton            : "data:image/gif,GIF89a%10%00%10%00%F7%00%00%00%00%00%FF%FF%FF%FD%FF%FF%FF%00%00%FE%00%00%FA%00%00%F9%00%00%F8%00%00%F7%00%00%F6%00%00%F5%00%00%F4%00%00%F2%00%00%F1%00%00%F0%00%00%EF%00%00%EE%00%00%ED%00%00%EC%00%00%EB%00%00%EA%00%00%E6%00%00%E5%00%00%E4%00%00%E2%00%00%E1%00%00%E0%00%00%DE%00%00%DD%00%00%DC%00%00%DB%00%00%DA%00%00%D9%00%00%D8%00%00%D6%00%00%D4%00%00%D3%00%00%D2%00%00%D1%00%00%D0%00%00%CF%00%00%CC%00%00%CB%00%00%CA%00%00%C9%00%00%C8%00%00%C7%00%00%C6%00%00%C4%00%00%C3%00%00%C2%00%00%C1%00%00%BF%00%00%BE%00%00%BD%00%00%BC%00%00%BB%00%00%B8%00%00%B7%00%00%B4%00%00%B1%00%00%AF%00%00%AD%00%00%AB%00%00%A9%00%00%A5%00%00%A4%00%00%A1%00%00%A0%00%00%8C%00%00k%00%00h%00%00g%00%00e%00%00c%00%00b%00%00%60%00%00%5E%00%00%5D%00%00Y%00%00X%00%00W%00%00U%00%00T%00%00S%00%00R%00%00Q%00%00P%00%00O%00%00M%00%00K%00%00J%00%00I%00%00H%00%00F%00%00E%00%00D%00%00C%00%00B%00%00%3C%00%00%25%00%00%1F%00%00%1D%00%00%1C%00%00%13%00%00%0C%00%00%0A%00%00%F7%02%02%C5%02%02%EB%1B%1B%D8%1A%1A%F8%20%20%EC!!%E5!!%DE%20%20%FB((%D9%23%23%DF%2C%2C%E6..%CB44%CD%3B%3B%F1RR%FCWW%FB%5C%5C%E6ZZ%D7UU%F2dd%F6oo%F7pp%DBdd%E9oo%CDdd%F8%7B%7B%CCii%D9tt%F8%86%86%E6%84%84%DC%84%84%E9%91%91%F6%C8%C8%F9%CE%CE%F9%D3%D3%F7%D1%D1%F8%D4%D4%FA%D9%D9%FB%DC%DC%F8%DC%DC%FE%F3%F3%FE%F7%F7%FB%F4%F4%FC%F8%F8%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%97%00%2C%00%00%00%00%10%00%10%00%00%08%FF%00%2F%5DJ3%06%8C%95)P%9EP%D1%F2E%0C%1A%81%97%D4%10%81%D0%60A%02%04%0A%20%5C%F0%00b%C8%C3KZ%06%0C8%C0%40B%05%0C%1B%3E%88%40%01%82%8A%40%23%03%0C%140%40%F3%C0%81%8B%11N8%11xd%40%827%7B%D6%20%18%AAg%CE%01%13Q%04%22!%E0%E0O%80C%0F%1E%00%0A%40%E8A%0A)%02%93%18%A0%D0%86Q%00%3Fy%02%40%82C%C1%85%CBKJ%16T%B0%10%C7%11%A5I%92%ECT%A80%E3%8A%C0%25%0E2d%E0%C0'%40%00A%1D0h%B0%81E%20%93%09%1EB%C8id%A9R%A4%3A!%3C%E4%C8%22%B0I%85%11n%16%05%08%D4G%C0%23%3A%24vl%11%E8%04C%0AD%01%12%ADXa(%80%22%15%3D%BA%90%DE%C0%E2N!6%AB_%0C%C2%B3%E2%87%ECKS8%BC%90A%03F%0C%180j%C8%B8%11%E4%8B%C039J%B4%80A%03%87%0E%1E%3E%80%08)b%06%22%19(R%AA%5C%0B%C9%A2%85%8B%970a%CA%08%0C%08%00%3B"
}



function GFC() {
    // Storage values
    var langCode;
    var pendingRequest = 0;
    var openedGifts = 0;

    var settingsBox; // prototype
    var windowTitleSetting;
    var appTitleElement

    var windowCellSelect_textColor;
    var windowCellSelect_bgFrom;
    var windowCellSelect_bgTo;
    var maxTabInput;
    var useIframeCheck;
    var useIframeTimeoutCheck;
    var IframeTimeoutInput;


    var mainBox;

    this.gameCardMode = 0;



    this.bgStyle;
    this.bgStyleTitle;



    this.toolTipText = function (toolTip, message) {

        toolTip.nodeValue = message;
    }

    var setBackground = function (from, to, mode) {

        var textColorString;

        if (windowCellSelect_bgFrom.checked == true) {
            if (mode == 1) {
                to = AppSettings['bgcolor_to'];
            } else if (mode == 2) {// click
                to = AppSettings['bgcolor_to'];
                AppSettings['bgcolor_from'] = from; // store it
            }
        } else if (windowCellSelect_bgTo.checked == true) {
            if (mode == 1) {
                from = AppSettings['bgcolor_from']
            } else if (mode == 2) {// click
                from = AppSettings['bgcolor_from'];
                AppSettings['bgcolor_to'] = to; // store it
            }
        }
        
        if (windowCellSelect_textColor.checked == false) {

            this.bgStyle = ' background: -webkit-gradient(linear, left top, left bottom, from(' + from + '), to(' + to + ')); background: -moz-linear-gradient(top,  ' + from + ',  ' + to + ');';
            this.bgStyleTitle = 'background: -webkit-gradient(linear, left top, right top, from(' + to + '), to(' + from + ')); background: -moz-linear-gradient(right,  ' + to + ',  ' + from + ');';

            this.settingsBoxStyle = 'position:absolute; display:visible; border-width:thin; width:250px;'
            // 'position:absolute; display:visible; border-width:thin; height: 150px; width:150px; background: -webkit-gradient(linear, left top, left bottom, from(' + from + '), to(' + to + ')); background: -moz-linear-gradient(top,  #ccf,  #888);'

            mainBox.setAttribute('style', this.bgStyle);
            settingsBox.setAttribute('style', bgStyle + settingsBoxStyle + 'color:' + AppSettings['textcolor'] + ';z-index:2;');
            giftContentBox.setAttribute('style', bgStyle + 'color:' + AppSettings['textcolor'] + ';');
            windowTitleSetting.setAttribute('style', this.bgStyleTitle);

        } else {
            textColorString = from;
            settingsBox.style.color = textColorString;
            mainBox.style.color = textColorString;
            appTitleElement.style.color = textColorString;
            giftContentBox.style.color = textColorString;

            if (mode == 2) AppSettings['textcolor'] = from;
        }
    }

    /////
    // Accept Gifts

    // Check for collected gifts [start]
    var checkCollectedGifts = function (appIndex) {
        var hideGiftBox = false;
        var giftIndex = 0;
        while (giftIndex < Gifts[appIndex].length) {
            if (Gifts[appIndex][giftIndex].accepted) {
                hideGiftBox = true;
            } else {
                hideGiftBox = false;
                break;
            }
            giftIndex++;
        }

        if (hideGiftBox == true) {
            Gifts[appIndex][0].giftBoxContainer.style.display = 'none';
        }
    }

    var updateGiftCounter = function (appIndex) {
        //var counterElement = $('#giftCounter_' + appIndex);
        var counter = 0;
        //alert(counterElement.HTML());
        for (var giftIndex = 0; giftIndex < Gifts[appIndex].length; giftIndex++){
            if (!Gifts[appIndex][giftIndex].accepted){
                counter++;
            }
        }

        try{
            $('#giftCounter_' + appIndex).html('(' + counter + ')');
        }catch(e){
            console.log('counter not found: ' + e );
        }
    }

    // Check for collected gifts [end]

    // Accept All Gifts [start]
    var acceptAllGifts = function (appIndex) { 
        // run through all gifts
        var giftIndex = 0;
        while (giftIndex < Gifts[appIndex].length) {
            //Gifts[appIndex][giftIndex].giftBoxContainer.style.display = 'none';

            if (pendingRequest == 0 && !Gifts[appIndex][giftIndex].accepted) {
                try {
                    //console.log(pendingRequest + ' AA send gift');
                    sendGiftGMRequest(Gifts[appIndex][giftIndex], 'accept', 0);
                } catch (e) { console.log('[acceptAllGifts] error: could not accept gift!') }
            //    giftIndex++;
            } else {
                if (Gifts[appIndex][giftIndex].accepted) {
                    giftIndex++;
                }
            }

            if (pendingRequest == 1){
                //console.log('AA waiting for free slot...');
                alert('waiting for free slot...');
            }
        }

    }
    // Accept All Gifts [end]

    /*
    // Open All Gifts in a Tab [start]
    var openAllGiftsInTab = function (appIndex) {
        // run through all gifts
        var openedGifts = 0;
        var giftIndex = 0;
        while (giftIndex < Gifts[appIndex].length) {
            //Gifts[appIndex][giftIndex].giftBoxContainer.style.display = 'none';

            if (pendingRequest == 0 && !Gifts[appIndex][giftIndex].accepted) {
                if (Gifts[appIndex][giftIndex].url != 'accept') { // we got our url, load it now
                    try {
                        GM_openInTab(Gifts[appIndex][giftIndex].url);
                        sendGiftGMRequest(Gifts[appIndex][giftIndex], 'ignore', 0);
                    } catch (e) {
                        console.log('[acceptAllGift] error: could not open url: ' + Gifts[appIndex][giftIndex].url);
                    }
                } else { // open via httprequest
                    try {
                        sendGiftGMRequest(Gifts[appIndex][giftIndex], 'accept', 1); // 1 = tab
                    } catch (e) { console.log('[acceptAllGifts] error: could not open gift in tab!') }
                }
                giftIndex++;
                openedGifts++;

                // Break while if limit reached
                if (openedGifts >= AppSettings['maxtabs']) {
                    break;
                }

            } else {
                if (Gifts[appIndex][giftIndex].accepted) {
                    giftIndex++;
                }
            }

        }

    }
    // Open All Gifts in a Tab [end]
    */

    var openAllGiftsInTab = function(appIndex){
        // run through all gifts
        openedGifts = 0;
      
    }

    // Open All Gifts in a Tab [start]
    var ignoreAllGifts = function (appIndex) {
        // run through all gifts
        var giftIndex = 0;
        while (giftIndex < Gifts[appIndex].length) {
            //Gifts[appIndex][giftIndex].giftBoxContainer.style.display = 'none';

            if (pendingRequest == 0 && !Gifts[appIndex][giftIndex].accepted) {
                try {
                    sendGiftGMRequest(Gifts[appIndex][giftIndex], 'ignore', 0,0);
                } catch (e) { console.log('[acceptAllGifts] error: could not ignore gift!') }
                giftIndex++;
            } else {
                if (Gifts[appIndex][giftIndex].accepted) {
                    giftIndex++;
                }
            }
        }

    }
    // Open All Gifts in a Tab [end]
    var setPendingStatus = function (status){
        pendingRequest = status;
    }

    var OnNodeInserted = function (event){
       
        var reqIframe;
        var appIndex;
        var giftIndex;
       
        reqIframe = event.target.getAttribute('GFCIFrame');
        appIndex = event.target.getAttribute('GFCGiftAppIndex');
        giftIndex = event.target.getAttribute('GFCGiftGiftIndex');

        if (reqIframe != null && appIndex != null){
        //alert('call');
            try{
                // remove eventhandler:
                document.removeEventListener ('DOMNodeInserted', OnNodeInserted, false);

                Gifts[appIndex][giftIndex].accepted = true;
                Gifts[appIndex][giftIndex].giftBoxElement.style.display = 'none';
                $('#' + reqIframe).remove();
                checkCollectedGifts(appIndex);
                updateGiftCounter(appIndex);
                sendGiftGMRequest(Gifts[appIndex][0], 'accept', 0, 1);
                sendGiftGMRequest(Gifts[appIndex][giftIndex], 'ignore', 0, 0);

                //window.setTimeout(function() {$('#myIframe').contents().find("body").append("I was modified by JS!");}, 5000);

               //window.setTimeout(function() {alert(document.getElementById("myIframe").contentWindow.document.body.innerHTML);} , 6000);

            }catch(e){
                console.log('error with custom domNode: ' + e);
            }
        }

        

    }


    // Accept gift via xmlhttprequest [start]
    var requestTimeout = function(ifrm, gift){
        return function(){
            if (!gift.accepted){
                ifrm.setAttribute("onload", "");
                var onloadDiv = document.createElement("div"); 
                onloadDiv.setAttribute("GFCGiftAppIndex", gift.appIndex); 
                onloadDiv.setAttribute("GFCGiftGiftIndex", gift.giftIndex);
                onloadDiv.setAttribute("GFCIFrame", "reqIFrame_" + gift.appIndex + "_" + gift.giftIndex); 
                document.body.appendChild(onloadDiv);
            }
        }
    }


    var sendGiftGMRequest = function (gift, mode, inTab, auto) {

        //alert("call:: mode: " + mode + " inTab: " + inTab + " auto: " + auto);
        var useIframeMode = AppSettings['useIFrame']; // trying this for autoacception
        var lastGiftFound = false;
        // auto for accept all
        if (auto == 1) {
            lastGiftFound = true;
            for (var index = 0; index < Gifts[gift.appIndex].length; index++) {
                //console.log('check gift...');
                if (Gifts[gift.appIndex][index].accepted == false) {
                    //console.log('gift not accepted right now...');
                    gift = Gifts[gift.appIndex][index];

                    if (gift.url != 'accept' && inTab == 1 && mode == 'accept') {
                        //                    alert("opened: " + openedGifts + " <= " + AppSettings['maxtabs']);
                        if (openedGifts >= AppSettings['maxtabs']) {
                            //                        alert("limit reached...");
                            lastGiftFound = true;
                            //console.log('tab limit reached...');
                            break;
                        }
                        //console.log('open gift in tab...');
                        try {
                            GM_openInTab(gift.url);
                        } catch (e) { }
                        openedGifts++;
                        gift.accepted = true;
                        sendGiftGMRequest(gift, 'ignore', 0, 0);

                    } else {
                        //alert("else " + gift.url)

                        
                        if (openedGifts >= AppSettings['maxtabs'] && inTab == 1) {
                            lastGiftFound = true;
                        } else {
                            lastGiftFound = false;
                        }
                        openedGifts++;

                        break;
                       
                    }


                } else {
                    //console.log('gift accepted skip it...');
                }
            }
        }

        var postMethod = 'POST';
        var result = '';
        var params = '';
        var urlAdr = '';
        var ignore = false;
        // Build submit data
        params += '&' + gift.submit_charset_test;
        params += '&' + gift.submit_post_form_id;
        params += '&' + gift.submit_fb_dtsg;

        params += '&' + gift.submit_id;  // id

        //params += '&' + gift.submit_id; // fehlt
        params += '&' + gift.submit_type; // fehlt
        params += '&' + gift.submit_status_div_id; // fehlt
        params += '&' + gift.submit_from_id; // fehlt
        params += '&' + gift.submit_app_id; // fehlt
        params += '&' + gift.submit_req_type; // fehlt
        params += '&' + gift.submit_is_invite; // fehlt

        if (gift.submit_div_id != '') // for apprequest ignore only
        {
            params += '&' + gift.submit_div_id; // div_id
        }

        if (mode == 'accept') {
            params += '&' + gift.submit_actions;
            if (gift.url == 'accept' && gift.newUrl == '') {
                urlAdr = 'http://www.facebook.com/ajax/games/apprequest/apprequest.php?__a=1';
                useIframeMode = false;
            } else {
                if (gift.newUrl != '') {
                    urlAdr = gift.newUrl;
                } else {
                    urlAdr = gift.url;
                }
                params = '';
                postMethod = 'GET';
                ignore = true;

            }
        } else if (mode == 'ignore') {
            useIframeMode = false;
            params += '&actions[reject]=';    //Ignore';
            if (gift.url == 'accept') {

                urlAdr = 'http://www.facebook.com/ajax/games/apprequest/apprequest.php?__a=1';

                //params += '&nctr[_mod]=pagelet_requests'
            } else {
                urlAdr = 'http://www.facebook.com/ajax/reqs.php?__a=1';

            }

        }

        if (!ignore) {
            params += '&lsd=&post_form_id_source=AsyncRequest';
        }

        if (mode == 'ignore') {
            //alert('method: ' + postMethod + ' -- use url: ' + urlAdr + ' -- send params: ' + params);
            //console.log('method: ' + postMethod + ' -- use url: ' + urlAdr + ' -- send params: ' + params + ' -- lastGift: ' + lastGiftFound);
        }

        //alert(urlAdr)
        //alert(lastGiftFound);

        if (!lastGiftFound && !useIframeMode && ignore != "ignore") {
            //alert("open.. " + lastGiftFound + " " + !useIframeMode);
            window.setTimeout(function () {
                GM_xmlhttpRequest({
                    method: postMethod,
                    url: urlAdr,
                    data: params,

                    headers: {
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language': 'en-us,en;q=0.5',
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-SVN-Rev': '355359' // unsafeWindow.env.svn_rev,
                        //'Cookie': document.cookie

                    },
                    onload: function (e) {
                        //console.log('success: ' + e.responseText);
                        //alert('success: ' + e.responseText);
                        if (!ignore && mode == 'accept') {
                            //alert(e.responseText);

                            try {
                                var json = e.responseText
                                var json = JSON.parse(json.slice(json.indexOf('{')));

                                var appURL = json.onload.toString();
                                appURL = appURL.slice(appURL.indexOf('(') + 1, appURL.indexOf(')'));
                                appURL = appURL.replace(/\/|"/g, '')

                                gift.newUrl = appURL;

                                if (inTab == 1) {
                                    try {
                                        GM_openInTab(appURL);
                                    } catch (e) { }
                                    openedGifts++;
                                    gift.accepted = true;
                                    gift.giftBoxElement.style.display = 'none';
                                    checkCollectedGifts(gift.appIndex);
                                    updateGiftCounter(gift.appIndex);
                                    if (auto) {
                                        sendGiftGMRequest(gift, 'accept', 1, auto);
                                    }
                                } else {
                                    gift.accepted = false;
                                    sendGiftGMRequest(gift, 'accept', 0, auto);
                                }
                            } catch (e) {
                                console.log('sendGiftGMRequest [mode == "accept" & !ignore] error: ' + e)
                            }

                        } else {

                            gift.accepted = true;
                            gift.giftBoxElement.style.display = 'none';
                            checkCollectedGifts(gift.appIndex);
                            updateGiftCounter(gift.appIndex);
                        }

                        if (mode == 'ignore') {

                            if (e.responseText.match('error')) {
                                // alert(e.responseText);
                            }
                            //var json = e.responseText;

                            //var json = JSON.parse(json.slice(json.indexOf('{')));
                            //alert(json.onload.toString());
                            //console.log('gift ignored');

                            $(gift.jQ_FB_GiftElement).hide(); // hide ignored fb gift
                        } else {
                            /*
                            console.log('----- Start Gift Request -----');
                            console.log('appIndex: ' + gift.appIndex + ' giftIndex: ' + gift.giftIndex);
                            console.log('gift url: ' + gift.url);
                            console.log('response Text:');
                            console.log(e.responseText);
                            console.log('-----  End Gift Request  -----');
                            */

                            sendGiftGMRequest(gift, 'ignore', 0, 0); // ignore that gift
                        }



                        if (auto == 1) {
                            //console.log('send next request!!!');
                            sendGiftGMRequest(gift, 'accept', inTab, 1); // autoaccept next gift
                        }
                    },
                    onerror: function (e) {
                        //alert('error: ' + e.status + ' text: ' + e.responseText);
                        console.log('Giftaccept error: ' + e.status + ' text: ' + e.responseText)
                    },
                    onreadystatechange: function (response) {

                    }
                })
            }, 0);

        }

        if (useIframeMode && !lastGiftFound) {

            document.addEventListener('DOMNodeInserted', OnNodeInserted, false); // needed to check if iframe loaded
            var ifrm = document.createElement("iframe");
            ifrm.setAttribute("id", 'reqIFrame_' + gift.appIndex + '_' + gift.giftIndex);
            ifrm.setAttribute("src", gift.url);
            ifrm.style.width = 0 + "px";
            ifrm.style.height = 0 + "px";
            //alert(gift.url);
            ifrm.setAttribute("onload", 'var onloadDiv = document.createElement("div"); onloadDiv.setAttribute("GFCGiftAppIndex", "' + gift.appIndex + '"); onloadDiv.setAttribute("GFCGiftGiftIndex", "' + gift.giftIndex + '");onloadDiv.setAttribute("GFCIFrame", "reqIFrame_' + gift.appIndex + '_' + gift.giftIndex + '"); document.body.appendChild(onloadDiv);')
            if (AppSettings['useIFrameTimeout']) {  // send onload handling after a spec. time
                window.setTimeout(requestTimeout(ifrm, gift), AppSettings['IFrameTimeout']);
            }

            document.body.appendChild(ifrm);

        }


        return 0;
    }
    // Accept gift via xmlhttprequest [end]

    // Open Gift in Tab
    var openGiftInTab = function (gift) {
        if (gift.url != 'accept') {
            try{
                GM_openInTab(gift.url);
            }catch(e){}
            sendGiftGMRequest(gift, 'ignore', 0);
        } else {
            sendGiftGMRequest(gift, 'accept', 1);
        }
    }
    
    // Accept Gifts
    /////

    //////////////
    // Collector Code for Gifts
    var Gifts = new Array();

    // Collect Giftinfos from current app [end]
    var getGiftInfos = function (jqElement, giftInfo) {
        //giftInfo.senderName = $jQ("div[class ^= UIImageBlock_Content] a:first", jqElement).text();
        //span class="uiTooltipText">
        //giftInfo.senderName = $jQ("span[class = uiTooltipText]", jqElement).text(); // changed on: 22.04.11
        //giftInfo.senderName = $jQ("span[class = uiTooltipWrap top left lefttop]", jqElement).text(); // changed on: 25.05.11 by Garry Sookie


        giftInfo.senderName = $jQ("div[class ^= prs] strong:first", jqElement).text(); // get person name


        /////
        // Get Gift Content
        giftInfo.giftSenderImageElement = $jQ('.UIImageBlock_Image.UIImageBlock_SMALL_Image', jqElement);
        giftInfo.giftContent = $jQ('.UIImageBlock_Content.UIImageBlock_SMALL_Content', jqElement);

        var giftTableContent = document.createElement('table');
        var giftTableTr = document.createElement('tr');
        var giftTableTd = document.createElement('td');
        $(giftTableTd).html(giftInfo.giftSenderImageElement.html());
        giftTableTr.appendChild(giftTableTd);

        var giftTableTd = document.createElement('td');
        $(giftTableTd).html(giftInfo.giftContent.html());
        giftTableTr.appendChild(giftTableTd);
        giftTableContent.appendChild(giftTableTr);

        // test
        giftInfo.giftContent = giftTableContent;


        // Input buttons
        input = $jQ('input', jqElement);
        input.each(function () { // get all input fields
            attribName = $jQ(this).attr('name');
            if (attribName.match("charset_test")) {
                giftInfo.submit_charset_test = attribName + '=' + $jQ(this).attr('value');
            }
            if (attribName.match("post_form_id")) {
                giftInfo.submit_post_form_id = attribName + '=' + $jQ(this).attr('value');
            }
            if (attribName.match("fb_dtsg")) {
                giftInfo.submit_fb_dtsg = attribName + '=' + $jQ(this).attr('value');
            }
            // 08/06/2011 Changed from "id" to "request_id" 
            // 16/06/2011 id is needed for ignore (new request method)
            if (attribName == 'id') {
                giftInfo.submit_id = attribName + '=' + $jQ(this).attr('value');
            }

            // old requests need this (override only if exist)
            if (attribName == 'request_id') {     // not in use???
                giftInfo.submit_id = attribName + '=' + $jQ(this).attr('value');
            }

            if (attribName == "type") {
                giftInfo.submit_type = attribName + '=' + $jQ(this).attr('value');
            }
            if (attribName == "status_div_id") {
                giftInfo.submit_status_div_id = attribName + '=' + $jQ(this).attr('value');
            }
            if (attribName == "params[from_id]") {
                giftInfo.submit_from_id = attribName + '=' + $jQ(this).attr('value');
            }
            if (attribName == "params[app_id]") {
                giftInfo.submit_app_id = attribName + '=' + $jQ(this).attr('value');
            }
            if (attribName == "params[req_type]") {
                giftInfo.submit_req_type = attribName + '=' + $jQ(this).attr('value');
            }
            if (attribName == "params[is_invite]") {
                giftInfo.submit_is_invite = attribName + '=' + $jQ(this).attr('value');
            }
            if (attribName == "div_id") {
                giftInfo.submit_div_id = attribName + '=' + $jQ(this).attr('value');
            }
            if (attribName.match("actions") && !attribName.match("reject")) {
                giftInfo.url = attribName.replace('actions[', '').replace(']', '');
                //giftInfo.url = giftInfo.actions.replace(']', '');
                giftInfo.submit_actions = attribName + '=' + $jQ(this).attr('value');
            }

        }); // end input.each

        return giftInfo;
    }
    // Collect Giftinfos [end]

    this.searchForGifts = function () {
        var apps; // Application JQ Elements
        var forms; // Request forms (added: 22.04.11)
        var appID; // Application ID
        var prevID = ''; // games?ap=1
        var appIndex = 0; // Application Gift Counter
        var giftIndex = 0; // Gift index
        var giftInfo;
        var appTitle;
        var input;
        var attribName;
        var giftContentElement;
        var dashboard;
        var appContent;

        var requestMode = 1;




        //apps = $jQ('div[class = mbl]');
        //apps = $jQ('.pts.UIImageBlock_Content.UIImageBlock_ICON_Content');
        apps = $jQ('li[id ^= confirm_]') // App requests


        if (apps.length == 0) { // games?ap=1
            dashboard = $jQ('div[class = apps_dashboard]');

            // pts pls UIImageBlock_Content UIImageBlock_ICON_Content
            apps = $jQ('.pts.UIImageBlock_Content.UIImageBlock_ICON_Content', dashboard);
            requestMode = 1;
        }
        if (apps.length > 0) {
            apps.each(function () {

                appContent = $jQ('.pts.UIImageBlock_Content.UIImageBlock_ICON_Content', this);
                appTitle = $jQ("a:first", appContent).text();

                ///
                // Get app ID
                appID = $jQ(this).attr('id'); // this = apps
                try {
                    appID = appID.split("_");
                    appID = appID[1];

                    if (prevID != '' && prevID != appID) {
                        appIndex++;
                        giftIndex = 0;
                        //Gifts[appIndex] = new Array(); // create new app
                    }
                    prevID = appID; // save last app ID

                } catch (e) {
                    console.log('div[class = apps_dashboard] error: Application ID not found. Element have no id')
                }
                // app ID
                ///

                ////
                // Get request list
                requestContents = $('div[class = pts]', this)
                forms = $('form', requestContents);
                if (forms.length > 0) {
                    forms.each(function () {

                        if (Gifts[appIndex] == undefined) {
                            Gifts[appIndex] = new Array(); // create new app
                        }

                        if (requestMode == 0) { // this part not reached anymore??? requestMode always = 1
                            // Get Gift Elements
                            appInfos = $jQ('form', this);

                            if (appInfos.length > 0) {
                                giftIndex = 0;
                                appInfos.each(function () { // run through each div element from current app
                                    Gifts[appIndex][giftIndex] = new Array(); // create new gift
                                    giftInfo = new Gift(); // create new Gift obj
                                    giftInfo.id = appID;
                                    giftInfo.appName = appTitle;

                                    giftInfo = getGiftInfos($(this), giftInfo);

                                    giftInfo.appIndex = appIndex;
                                    giftInfo.giftIndex = giftIndex;
                                    Gifts[appIndex][giftIndex] = giftInfo;
                                    Gifts[appIndex][giftIndex].jQ_FB_GiftElement = $jQ(this); // to hide ignored gift
                                    giftIndex++;
                                });
                            }
                        } else { // <---------------- start here

                            if ($jQ(this).attr('class') != "ignoreAll") {
                                Gifts[appIndex][giftIndex] = new Array(); // create new gift
                                giftInfo = new Gift(); // create new Gift obj
                                giftInfo.id = appID;
                                giftInfo.appName = appTitle;

                                giftInfo = getGiftInfos($(this), giftInfo);

                                giftInfo.appIndex = appIndex;
                                giftInfo.giftIndex = giftIndex;
                                Gifts[appIndex][giftIndex] = giftInfo;

                                Gifts[appIndex][giftIndex].jQ_FB_GiftElement = $jQ(this); // to hide ignored gift
                                giftIndex++;
                            }
                        }
                        // request list
                        ////


                        $jQ(this).css('background-color', AppSettings['foundGiftColor']);


                        if (requestMode == 0) {
                            appIndex++; // next app
                        } // games?ap=1 is some lines above

                    }); // end forms.each
                } // end forms length
            }); // end apps.each
        } else {
            console.log('warning: no gifts found... ')
        }



    }
    // Collector Code for Gifts
    //////////////

    // Shows or hide GiftContent box
    var showHideGifts = function(sender) { // mode 0 = hide, mode 1 = show
        var appIndex = sender.getAttribute('appIndex');
        var mode = sender.getAttribute('mode');

        for (var giftIndex = 0; giftIndex < Gifts[appIndex].length; giftIndex++){
            if (mode == 1 && !Gifts[appIndex][giftIndex].accepted){
                // show gift
                Gifts[appIndex][giftIndex].giftBoxElement.style.display = 'block';
            } 
            
            if (mode == 0){
                // hide gift
                Gifts[appIndex][giftIndex].giftBoxElement.style.display = 'none';
            }

        }

        if ( mode == 1){
            sender.setAttribute('mode', '0')
            sender.innerHTML = ''
            var textBolt = document.createElement('b');
            sender.appendChild(textBolt);
            var showHideText = document.createTextNode('\u00A0' + LangCodeText['hide_' + AppSettings['langCode']] + '\u00A0');
            textBolt.appendChild(showHideText);
        }else{
            sender.setAttribute('mode', '1')
            sender.innerHTML = ''
            var textBolt = document.createElement('b');
            sender.appendChild(textBolt);
            var showHideText = document.createTextNode('\u00A0' + LangCodeText['show_' + AppSettings['langCode']] + '\u00A0');
            textBolt.appendChild(showHideText);
        }
    }

    //////////////
    // GiftContentBox
    this.buildGiftContent = function () {
        // create settings box
        giftContentBox = document.createElement('div');
        giftContentBox.setAttribute('name', 'giftContentBox');
        //giftContentBox.setAttribute('style', 'height: 200px; border-width:thin;' + this.bgStyle);
        giftContentBox.setAttribute('style', this.bgStyle);
        giftContentBox.style.color = AppSettings['textcolor'];


        /////
        // Content
        var contentTable = document.createElement('table');
        contentTable.setAttribute('border', '0');
        contentTable.setAttribute('cellspacing', '10px');
        contentTable.setAttribute('cellpadding', '0px');
        contentTable.setAttribute('style', 'height:100%; width:100%;');
        giftContentBox.appendChild(contentTable);


        // Content
        ////


        try {
            this.searchForGifts();
        } catch (e) { alert('buildGiftContent->SearchForGifts() error : ' + e.toString()); }

        var appIndex = 0;
        var giftIndex = 0;
        var giftInfo;
        while (appIndex < Gifts.length) {

            // create application row
            var contentTableTr = document.createElement('tr');
            contentTable.appendChild(contentTableTr);

            var contentTableTd = document.createElement('td')
            contentTableTd.setAttribute('style', 'border:thin solid black;');
            contentTableTr.appendChild(contentTableTd);

            // create Application Table
            var appTable = document.createElement('table');
            appTable.setAttribute('border', '0');
            appTable.setAttribute('style', 'height:25px; width:100%; '); // background: -moz-opacity:0.2; -khtml-opacity: 0.2; opacity: 0.2;'); //overflow: scroll;
            contentTableTd.appendChild(appTable);


            if (Gifts[appIndex].length > 0) {
                var appTableTr = document.createElement('tr');
                appTable.appendChild(appTableTr);

                // Application Name
                var appTableTd = document.createElement('td');
                appTableTd.setAttribute('style', 'font-size:1.2em;')
                appTableTr.appendChild(appTableTd);
                var textBolt = document.createElement('b');
                appTableTd.appendChild(textBolt);
                var appNameDiv = document.createElement('div');
                appNameDiv.setAttribute('style', 'float:left;')
                var appRequestName = document.createTextNode(Gifts[appIndex][0].appName + '\u00A0');
                appNameDiv.appendChild(appRequestName);
                textBolt.appendChild(appNameDiv);
                var giftCounterDiv = document.createElement('div');
                giftCounterDiv.setAttribute('id', 'giftCounter_' + appIndex);
                giftCounterDiv.setAttribute('style', 'float:left;')
                giftCounterDiv.innerHTML = '(' + Gifts[appIndex].length + ')';
                textBolt.appendChild(giftCounterDiv);

                // Buttons
                appTableTr = document.createElement('tr');
                appTable.appendChild(appTableTr);
                var appTableTd = document.createElement('td');
                appTableTd.setAttribute('style', 'white-space:nowrap;') //background-color: white;')
                appTableTd.noWrap = true;
                appTableTr.appendChild(appTableTd);
                // Buttons div element
                var buttonsRowDiv = document.createElement('div');
                buttonsRowDiv.setAttribute('style', 'white-space:nowrap;')
                buttonsRowDiv.noWrap = true;
                // show/hide
                var showHideDiv = document.createElement('div');
                showHideDiv.setAttribute('appIndex', appIndex)
                showHideDiv.setAttribute('mode', '1')
                //openInTabsDiv.addEventListener('click', function () { openAllGiftsInTab(this.getAttribute('appIndex')); }, false); // onClick
                showHideDiv.addEventListener('click', function () { showHideGifts(this); }, false); // onClick
                showHideDiv.setAttribute('style', 'color:blue;cursor:pointer;float:left;margin-right: 3px;border: 1px solid;background-color:white;') //border: 1px solid;
                var textBolt = document.createElement('b');
                showHideDiv.appendChild(textBolt);
                var showHideText = document.createTextNode('\u00A0' + LangCodeText['show_' + AppSettings['langCode']] + '\u00A0');
                textBolt.appendChild(showHideText);
                buttonsRowDiv.appendChild(showHideDiv);
                // Accept all
                var acceptAllDiv = document.createElement('div');
                acceptAllDiv.setAttribute('appIndex', appIndex)
                //acceptAllDiv.addEventListener('click', function () { acceptAllGifts(this.getAttribute('appIndex')); }, false); // onClick
                acceptAllDiv.addEventListener('click', function () { sendGiftGMRequest(Gifts[this.getAttribute('appIndex')][0], 'accept', 0, 1); }, false); // onClick
                // 
                acceptAllDiv.setAttribute('style', 'color:green;cursor:pointer;float:left;margin-right: 3px;border: 1px solid;background-color:white;') //border: 1px solid;
                var textBolt = document.createElement('b');
                acceptAllDiv.appendChild(textBolt);
                var acceptAllText = document.createTextNode('\u00A0' + LangCodeText['accept_all_' + AppSettings['langCode']] + '\u00A0');
                textBolt.appendChild(acceptAllText);
                buttonsRowDiv.appendChild(acceptAllDiv);
                // open in Tabs
                var openInTabsDiv = document.createElement('div');
                openInTabsDiv.setAttribute('appIndex', appIndex)
                //openInTabsDiv.addEventListener('click', function () { openAllGiftsInTab(this.getAttribute('appIndex')); }, false); // onClick
                openInTabsDiv.addEventListener('click', function () { openedGifts = 0;sendGiftGMRequest(Gifts[this.getAttribute('appIndex')][0], 'accept', 1, 1); }, false); // onClick
                openInTabsDiv.setAttribute('style', 'color:green;cursor:pointer;float:left;margin-right: 3px;border: 1px solid;background-color:white;') //border: 1px solid;
                var textBolt = document.createElement('b');
                openInTabsDiv.appendChild(textBolt);
                var openInTabsText = document.createTextNode('\u00A0' + LangCodeText['open_in_tabs_' + AppSettings['langCode']] + '\u00A0');
                textBolt.appendChild(openInTabsText);
                buttonsRowDiv.appendChild(openInTabsDiv);
                // ignore All
                var ignoreAllDiv = document.createElement('div');
                ignoreAllDiv.setAttribute('appIndex', appIndex)
                ignoreAllDiv.addEventListener('click', function () { ignoreAllGifts(this.getAttribute('appIndex')); }, false); // onClick
                ignoreAllDiv.setAttribute('style', 'color:red;cursor:pointer;float:left;margin-right: 3px;border: 1px solid;background-color:white;') //border: 1px solid;
                var textBolt = document.createElement('b');
                ignoreAllDiv.appendChild(textBolt);
                var ignoreAllText = document.createTextNode('\u00A0' + LangCodeText['ignore_all_' + AppSettings['langCode']] + '\u00A0');
                textBolt.appendChild(ignoreAllText);
                buttonsRowDiv.appendChild(ignoreAllDiv);

                //
                appTableTd.appendChild(buttonsRowDiv);
                // Buttons [end]

                giftIndex = 0;
                // Show each Gift information
                while (giftIndex < Gifts[appIndex].length) {
                    giftInfo = Gifts[appIndex][giftIndex]

                    var appTableTr = document.createElement('tr');
                    appTableTr.setAttribute('style', 'display:none;')
                    appTable.appendChild(appTableTr);

                    var appTableTd = document.createElement('td');
                    appTableTd.setAttribute('appIndex', appIndex);
                    appTableTd.setAttribute('giftIndex', giftIndex);
                    appTableTd.setAttribute('style', 'cursor:pointer;')
                    //appTableTd.onmousemove = function () { showToolTipBox(Gifts[this.getAttribute('appIndex')][this.getAttribute('giftIndex')].senderName); }
                    appTableTd.addEventListener('mousemove', function (mouseEvent) { showToolTipBox(mouseEvent, Gifts[this.getAttribute('appIndex')][this.getAttribute('giftIndex')]); }, false);
                    appTableTd.addEventListener('click', function (mouseEvent) { openGiftInTab(Gifts[this.getAttribute('appIndex')][this.getAttribute('giftIndex')]); }, false);
                    appTableTd.addEventListener('mouseout', function (mouseEvent) { hideToolTipBox(''); }, false);
                    appTableTr.appendChild(appTableTd);


                    Gifts[appIndex][giftIndex].giftBoxContainer = contentTableTr;
                    Gifts[appIndex][giftIndex].giftBoxElement = appTableTr; // needed to hide after accepted gift

                    var appSenderName = document.createTextNode(Gifts[appIndex][giftIndex].senderName + ' ' + LangCodeText['request_from_' + AppSettings['langCode']]);
                    //var appSenderName = document.createTextNode(Gifts[appIndex][giftIndex].url); // for Debug

                    appTableTd.appendChild(appSenderName);

                    giftIndex++
                }
            }

            appIndex++; // next App
        }



        // create tooltip box
        var tooltipBox = document.createElement('div');
        tooltipBox.setAttribute('name', 'tooltip')
        tooltipBox.setAttribute('style', 'width: 450px;position:absolute; background: white; display:none; border-style:solid; border-width:thin; color:#000;');
        var toolTipText = document.createTextNode('...');
        tooltipBox.appendChild(toolTipText)

        var showToolTipBox = function (e, giftobj) {
            tooltipBox.style.display = 'block';
            //tooltipBox.style.left = (window.event.pageX + 20) + "px"; // page because of scrolling
            //tooltipBox.style.top = (window.event.pageY + 5) + "px";

            tooltipBox.style.left = (e.pageX + 20) + "px"; // page because of scrolling
            tooltipBox.style.top = (e.pageY + 5) + "px";

            // $(tooltipBox).append(giftobj.giftContent);
            $(tooltipBox).html(giftobj.giftContent);
        }

        var hideToolTipBox = function () {
            tooltipBox.style.display = 'none';
        }

        giftContentBox.appendChild(tooltipBox);


        return giftContentBox;
    }
    // GiftContentBox
    //////////////

    //////////////
    // Settingsbox
    this.buildSettingsBox = function () {

        // setting functions
        var selectOptionByValue = function (selObj, value) {
            var options = selObj.options, length = options.length;
            while (length) {
                if (options[--length].value == value) {
                    selObj.selectedIndex = length;
                    length = 0;
                }
            }
        }

        var saveSettings = function () {
            Storage.setValue('language', windowSelect.value);
            Storage.setValue('bgcolor_from', AppSettings['bgcolor_from']);
            Storage.setValue('bgcolor_to', AppSettings['bgcolor_to']);
            Storage.setValue('textcolor', AppSettings['textcolor']);
            Storage.setValue('maxtabs', maxTabInput.value );
            if (useIframeCheck.checked){
                Storage.setValue('useIFrame', 'true');
            } else{
                Storage.setValue('useIFrame', 'false');
            }
            if (useIframeTimeoutCheck.checked){
                Storage.setValue('useIFrameTimeout', 'true');
            } else{
                Storage.setValue('useIFrameTimeout', 'false');
            }
            Storage.setValue('IFrameTimeout', IframeTimeoutInput.value);
        }



        // create settings box
        settingsBox = document.createElement('div');
        settingsBox.setAttribute('name', 'settingsBox')
        settingsBox.setAttribute('style', 'position:absolute; display:none; border-width:thin; width:250px;z-index:2;' + this.bgStyle);
        settingsBox.style.color = AppSettings['textcolor']


        /////
        // Content
        var contentTable = document.createElement('table');
        contentTable.setAttribute('border', '0')



        ////
        // Window Top [start]
        var contentTr = document.createElement('tr');
        var contentTd = document.createElement('td');
        contentTd.setAttribute('width', '250px');

        contentTable.appendChild(contentTr);
        contentTr.appendChild(contentTd);
        //--

        var windowTopTable = document.createElement('table');
        windowTopTable.setAttribute('border', '0')
        var windowTopSettings = document.createElement('tr');


        // Title
        windowTitleSetting = document.createElement('td');
        windowTitleSetting.setAttribute('width', '95%');
        windowTitleSetting.setAttribute('style', this.bgStyleTitle);
        var windowTitleTextSetting = document.createTextNode('\u00A0' + LangCodeText['settingsWindowTitle_' + AppSettings['langCode']]);
        windowTitleSetting.appendChild(windowTitleTextSetting);

        // Closebutton
        var windowCloseSetting = document.createElement('td');
        windowCloseSetting.setAttribute('align', 'right');
        var bmp_close = document.createElement('img');
        bmp_close.src = Ressources['closeButton'];
        bmp_close.addEventListener('click', function (mouseEvent) { hideSettingsBox(); }, false);
        windowCloseSetting.appendChild(bmp_close);

        // put toghether
        windowTopSettings.appendChild(windowTitleSetting);
        windowTopSettings.appendChild(windowCloseSetting);
        windowTopTable.appendChild(windowTopSettings);

        // contentTable.appendChild(windowTopSettings);
        contentTd.appendChild(windowTopSettings);
        // Window Top [end]
        ////

        // Language row [start] (Row 2)
        contentTr = document.createElement('tr');
        contentTd = document.createElement('td');
        contentTd.setAttribute('width', '150px');

        contentTable.appendChild(contentTr);
        contentTr.appendChild(contentTd);


        var windowTable = document.createElement('table');
        windowTable.setAttribute('border', '0')
        var windowTableTr = document.createElement('tr');

        // Col 1 [start]
        var windowTableTd = document.createElement('td');
        windowTableTd.setAttribute('width', '50%');
        var windowCellText = document.createTextNode('\u00A0' + LangCodeText['language_' + AppSettings['langCode']] + ': ');
        windowTableTd.appendChild(windowCellText);

        windowTable.appendChild(windowTableTd);
        contentTd.appendChild(windowTable);
        // Col 1 [end]

        // Col 2 [start]
        windowTableTd = document.createElement('td');
        windowTableTd.setAttribute('width', '50%');

        windowSelect = document.createElement('select');
        selectOption = document.createElement('option');
        selectOption.value = 'en';
        selectOption.appendChild(document.createTextNode('English'));
        windowSelect.appendChild(selectOption);
        selectOption = document.createElement('option');
        selectOption.value = 'de';
        selectOption.appendChild(document.createTextNode('Deutsch'));
        windowSelect.appendChild(selectOption);

        selectOptionByValue(windowSelect, AppSettings['langCode']); // Select option from setting

        windowTableTd.appendChild(windowSelect);

        windowTable.appendChild(windowTableTd);
        contentTd.appendChild(windowTable);
        // Col 2 [end]
        // Language row [end] (Row 2)


        // ColorLabel row [start] (Row 3)
        contentTr_3 = document.createElement('tr');
        contentTd_3 = document.createElement('td');
        contentTd_3.setAttribute('width', '150px');

        contentTable.appendChild(contentTr_3);
        contentTr_3.appendChild(contentTd_3);


        var windowTable_3 = document.createElement('table');
        windowTable_3.setAttribute('border', '0')
        var windowTableTr_3 = document.createElement('tr');

        // Col 1 [start]
        var windowTableTd_3_1 = document.createElement('td');
        //windowTableTd.setAttribute('width', '50%');
        var windowCellText_3_1 = document.createTextNode('\u00A0' + LangCodeText['bgcolor_' + AppSettings['langCode']] + ': ');
        windowTableTd_3_1.appendChild(windowCellText_3_1);

        windowTable_3.appendChild(windowTableTd_3_1);
        contentTd_3.appendChild(windowTable_3);
        // Col 1 [end]
        // ColorLabel row [end] (Row 3)



        // ColorSelect row [start] (Row 4)
        contentTr = document.createElement('tr');   // for Main table 
        contentTd = document.createElement('td');   // for Main table
        contentTd.setAttribute('width', '150px');   // for Main table

        contentTable.appendChild(contentTr);        // for Main table
        contentTr.appendChild(contentTd);           // for Main table


        var windowTable = document.createElement('table'); // Start Table for Row
        windowTable.setAttribute('width', '100%');
        var windowTableTr = document.createElement('tr'); // Open Row in Row Table

        // Col 1 [start]
        var windowTableTd = document.createElement('td'); // Open Cell in Row Table

        windowCellSelect_bgFrom = document.createElement('input'); // Create Cell Element
        windowCellSelect_bgFrom.setAttribute('name', 'colorSelect'); // Set Attribute to Cell Element
        windowCellSelect_bgFrom.setAttribute('value', 'bgFrom')
        windowCellSelect_bgFrom.setAttribute('type', 'radio')
        windowCellSelect_bgFrom.setAttribute('checked', 'checked')

        windowTableTd.appendChild(windowCellSelect_bgFrom) // Put Cell Element in Cell and Close Cell in Row Table

        var windowCellText = document.createTextNode('\u00A0' + LangCodeText['from_' + AppSettings['langCode']]);
        windowTableTd.appendChild(windowCellText) // Put Cell Element in Cell and Close Cell in Row Table

        windowTableTr.appendChild(windowTableTd); // Put Cell in Row Table
        // Col 1 [end]

        // Col 2 [start]
        var windowTableTd = document.createElement('td'); // Open Cell in Row Table

        windowCellSelect_bgTo = document.createElement('input'); // Create Cell Element
        windowCellSelect_bgTo.setAttribute('name', 'colorSelect'); // Set Attribute to Cell Element
        windowCellSelect_bgTo.setAttribute('value', 'bgTo')
        windowCellSelect_bgTo.setAttribute('type', 'radio')

        windowTableTd.appendChild(windowCellSelect_bgTo) // Put Cell Element in Cell and Close Cell in Row Table

        var windowCellText = document.createTextNode('\u00A0' + LangCodeText['to_' + AppSettings['langCode']]);
        windowTableTd.appendChild(windowCellText) // Put Cell Element in Cell and Close Cell in Row Table

        windowTableTr.appendChild(windowTableTd); // Put Cell in Row Table
        // Col 2 [end]

        // Col 3 [start]
        var windowTableTd = document.createElement('td'); // Open Cell in Row Table

        windowCellSelect_textColor = document.createElement('input'); // Create Cell Element
        windowCellSelect_textColor.setAttribute('name', 'colorSelect'); // Set Attribute to Cell Element
        windowCellSelect_textColor.setAttribute('value', 'textColor')
        windowCellSelect_textColor.setAttribute('type', 'radio')

        windowTableTd.appendChild(windowCellSelect_textColor) // Put Cell Element in Cell and Close Cell in Row Table

        var windowCellText = document.createTextNode('\u00A0' + LangCodeText['textcolor_' + AppSettings['langCode']]);
        windowTableTd.appendChild(windowCellText) // Put Cell Element in Cell and Close Cell in Row Table

        windowTableTr.appendChild(windowTableTd); // Put Cell in Row Table
        // Col 3 [end]


        windowTable.appendChild(windowTableTr); // Close Row Table
        contentTd.appendChild(windowTable); // Close Cell1 in Main Table

        // ColorSelect row [end] (Row 4)



        // ColorPicker row [start] (row 5)
        contentTr = document.createElement('tr');   // for Main table 
        contentTd = document.createElement('td');   // for Main table
        contentTd.setAttribute('width', '150px');   // for Main table

        contentTable.appendChild(contentTr);        // for Main table
        contentTr.appendChild(contentTd);           // for Main table


        var windowTable = document.createElement('table'); // Tabel for row
        windowTable.setAttribute('border', '1')
        //windowTable.setAttribute('height', '20px')
        windowTable.setAttribute('width', '100%')
        //var windowTableTr = document.createElement('tr'); // TR for Row

        var sAColorStyle = new Array(256);
        //sColorStyle[sColorIndex] = new Array(); // for colorfunction
        var sColorIndex = 0;
        for (var row = 0; row < 16; row++) {
            var windowTableTr = document.createElement('tr'); // start row
            //windowTableTr.setAttribute('width', '10px');
            //windowTableTr.setAttribute('height', '10px');
            for (var cell = 0; cell < 16; cell++) {
                var windowTableTd = document.createElement('td'); // create cell
                windowTableTd.setAttribute('width', '5px');
                windowTableTd.setAttribute('height', '10px');
                windowTableTd.setAttribute('idindex', sColorIndex.toString())


                /*
                switch (Eingabe) {
                case "1":
                alert("Sie sind sehr bescheiden");
                break;
                case "2":
                */

                switch (row) {
                    case 0:
                        sColorStyle = '#' + cell.toString(16) + '00';
                        break;
                    case 1:
                        sColorStyle = '#0' + cell.toString(16) + '0'; ;
                        break;
                    case 2:
                        sColorStyle = '#00' + cell.toString(16);
                        break;
                    case 3:
                        sColorStyle = '#' + cell.toString(16) + cell.toString(16) + '0';
                        break;
                    case 4:
                        sColorStyle = '#' + cell.toString(16) + cell.toString(16) + cell.toString(16);
                        break;
                    case 5:
                        sColorStyle = '#' + cell.toString(16) + '0' + cell.toString(16);
                        break;
                    case 6:
                        sColorStyle = '#0' + cell.toString(16) + cell.toString(16);
                        break;
                    case 7:
                        sColorStyle = '#' + row.toString(16) + cell.toString(16) + '0';
                        break;
                    case 8:
                        sColorStyle = '#' + row.toString(16) + '0' + cell.toString(16);
                        break;
                    case 9:
                        sColorStyle = '#' + cell.toString(16) + row.toString(16) + '0';
                        break;
                    case 10:
                        sColorStyle = '#' + cell.toString(16) + '0' + row.toString(16);
                        break;
                    case 11:
                        sColorStyle = '#' + cell.toString(16) + cell.toString(16) + row.toString(16);
                        break;
                    case 12:
                        sColorStyle = '#' + cell.toString(16) + row.toString(16) + row.toString(16);
                        break;
                    case 13:
                        sColorStyle = '#' + row.toString(16) + cell.toString(16) + row.toString(16);
                        break;
                    case 14:
                        sColorStyle = '#' + row.toString(16) + row.toString(16) + cell.toString(16);
                        break;
                    case 15:
                        sColorStyle = '#' + row.toString(16) + cell.toString(16) + cell.toString(16);
                        break;
                    default:
                        break;
                }


                windowTableTd.setAttribute('style', 'background: -webkit-gradient(linear, left top, left bottom, from(' + sColorStyle + '), to(' + sColorStyle + ')); background: -moz-linear-gradient(top,  ' + sColorStyle + ',  ' + sColorStyle + ');');


                sAColorStyle[sColorIndex] = sColorStyle;

                windowTableTd.addEventListener('mouseout', function (mouseEvent) {
                    if (windowCellSelect_textColor.checked == true) {
                        setBackground(AppSettings['textcolor'], '', 0);
                    } else {
                        setBackground(AppSettings['bgcolor_from'], AppSettings['bgcolor_to'], 0);
                    }
                }, false);
                windowTableTd.addEventListener('mouseover', function (mouseEvent) { setBackground(sAColorStyle[this.getAttribute('idindex')], sAColorStyle[this.getAttribute('idindex')], 1); }, false);
                windowTableTd.addEventListener('click', function (mouseEvent) { setBackground(sAColorStyle[this.getAttribute('idindex')], sAColorStyle[this.getAttribute('idindex')], 2); }, false);



                windowTableTr.appendChild(windowTableTd);

                sColorIndex++;
            }

            windowTable.appendChild(windowTableTr); // finish row
        }

        contentTd.appendChild(windowTable); // set into Main Table

        // Colorpicker row [end] (row 5)

        // Maxtabs row [start] (Row 6)
        contentTr = document.createElement('tr');
        contentTd = document.createElement('td');
        contentTd.setAttribute('width', '150px');

        contentTable.appendChild(contentTr);
        contentTr.appendChild(contentTd);


        var windowTable = document.createElement('table');
        windowTable.setAttribute('border', '0')
        var windowTableTr = document.createElement('tr');

        // Col 1 [start]
        var windowTableTd = document.createElement('td');
        //windowTableTd.setAttribute('width', '50%');
        var windowCellText = document.createTextNode('\u00A0' + LangCodeText['maxtabs_' + AppSettings['langCode']] + ': ');
        windowTableTd.appendChild(windowCellText);

        windowTable.appendChild(windowTableTd);
        contentTd.appendChild(windowTable);
        // Col 1 [end]

        // Col 2 [start]
        var windowTableTd = document.createElement('td');
        //windowTableTd.setAttribute('width', '50%');
        maxTabInput = document.createElement('input');
        maxTabInput.setAttribute('style', 'width:20px;')
        maxTabInput.setAttribute('value', AppSettings['maxtabs'])
        windowTableTd.appendChild(maxTabInput);

        windowTable.appendChild(windowTableTd);
        contentTd.appendChild(windowTable);
        // Col 2 [end]
        // Maxtabs row [end] (Row 6)

        // Advanced row [start] (Row 7)
        contentTr = document.createElement('tr');
        contentTd = document.createElement('td');
        contentTd.setAttribute('width', '150px');

        contentTable.appendChild(contentTr);
        contentTr.appendChild(contentTd);


        var windowTable = document.createElement('table');
        windowTable.setAttribute('border', '0')
        var windowTableTr = document.createElement('tr');

        // Col 1 [start]
        var windowTableTd = document.createElement('td');
        var windowCellBolt = document.createElement('b')
        var windowCellText = document.createTextNode('\u00A0' + LangCodeText['advanced_' + AppSettings['langCode']] + ': ');
        windowCellBolt.appendChild(windowCellText);
        windowTableTd.appendChild(windowCellBolt);

        windowTable.appendChild(windowTableTd);
        contentTd.appendChild(windowTable);
        // Col 1 [end]
        // Advanced row [end] (Row 7)

        // useIFramemethod row [start] (Row 8)
        contentTr = document.createElement('tr');
        contentTd = document.createElement('td');
        contentTd.setAttribute('width', '150px');

        contentTable.appendChild(contentTr);
        contentTr.appendChild(contentTd);


        var windowTable = document.createElement('table');
        windowTable.setAttribute('border', '0')
        var windowTableTr = document.createElement('tr');

        // Col 1 [start]
        var windowTableTd = document.createElement('td');
        var windowCellText = document.createTextNode('\u00A0' + LangCodeText['useIFrame_' + AppSettings['langCode']] + ' ');
        windowTableTd.appendChild(windowCellText);

        windowTable.appendChild(windowTableTd);
        contentTd.appendChild(windowTable);
        // Col 1 [end]
        
        // Col 2 [start]
        var windowTableTd = document.createElement('td');
        useIframeCheck = document.createElement('input');
        useIframeCheck.setAttribute('type', 'checkbox')
        if (AppSettings['useIFrame'] == true){
            useIframeCheck.checked = true;
        }

        windowTableTd.appendChild(useIframeCheck);

        windowTable.appendChild(windowTableTd);
        contentTd.appendChild(windowTable);
        // Col 2 [end]
        // useIFramemethod row [end] (Row 8)

        // useIFrametimeout and time row [start] (Row 9)
        contentTr = document.createElement('tr');
        contentTd = document.createElement('td');
        contentTd.setAttribute('width', '150px');

        contentTable.appendChild(contentTr);
        contentTr.appendChild(contentTd);


        var windowTable = document.createElement('table');
        windowTable.setAttribute('border', '0')
        var windowTableTr = document.createElement('tr');

        // Col 1 [start]
        var windowTableTd = document.createElement('td');
        var windowCellText = document.createTextNode('\u00A0' + LangCodeText['IFrameTimeout_' + AppSettings['langCode']] + ' ');
        windowTableTd.appendChild(windowCellText);

        windowTable.appendChild(windowTableTd);
        contentTd.appendChild(windowTable);
        // Col 1 [end]
        
        // Col 2 [start]
        var windowTableTd = document.createElement('td');
        // checkbox
        useIframeTimeoutCheck = document.createElement('input');
        useIframeTimeoutCheck.setAttribute('type', 'checkbox')
        if (AppSettings['useIFrameTimeout'] == true){
            useIframeTimeoutCheck.checked = true;
        }

        windowTableTd.appendChild(useIframeTimeoutCheck);

        // input
        var IframeTimeoutInput = document.createElement('input');
        IframeTimeoutInput.setAttribute('style', 'width:30px;')
        IframeTimeoutInput.setAttribute('value', AppSettings['IFrameTimeout'])

        windowTableTd.appendChild(IframeTimeoutInput);

        windowTable.appendChild(windowTableTd);
        contentTd.appendChild(windowTable);
        // Col 2 [end]
        // useIFrametimeout and time row [end] (Row 9)


        // Save Cancel row [start] (last Row)
        contentTr = document.createElement('tr');
        contentTd = document.createElement('td');
        contentTd.setAttribute('width', '150px');

        contentTable.appendChild(contentTr);
        contentTr.appendChild(contentTd);


        var windowTable = document.createElement('table');
        windowTable.setAttribute('border', '0')
        var windowTableTr = document.createElement('tr');

        // Col 1 [start]
        var windowTableTd_l_1 = document.createElement('td');
        windowTableTd_l_1.setAttribute('width', '80%');
        var saveBmp = document.createElement('img');
        saveBmp.src = Ressources['saveButton_small'];
        saveBmp.setAttribute('style', 'position:relative; margin: 10px 0px;top:0px; left:0px;');
        saveBmp.setAttribute('align', 'right');
        saveBmp.addEventListener('mouseover', function (mouseEvent) { this.src = Ressources['saveButton_normal']; this.setAttribute('style', 'position:relative; margin: 0px 6px;top:0px; left:5px;'); }, false);
        saveBmp.addEventListener('mouseout', function (mouseEvent) { this.src = Ressources['saveButton_small']; this.setAttribute('style', 'position:relative; margin: 10px 0px;top:0px; left:0px;'); }, false);
        saveBmp.addEventListener('click', function (mouseEvent) { saveSettings(); hideSettingsBox(); }, false);
        windowTableTd_l_1.appendChild(saveBmp);

        windowTable.appendChild(windowTableTd_l_1);
        contentTd.appendChild(windowTable);
        // Col 1 [end]

        // Col 2 [start]
        windowTableTd_l_2 = document.createElement('td');
        windowTableTd_l_2.setAttribute('width', '20%');
        var cancelBmp = document.createElement('img');
        cancelBmp.src = Ressources['cancelButton_small'];
        cancelBmp.setAttribute('style', 'position:relative; margin: 10px 10px;top:0px; left:0px;');
        cancelBmp.addEventListener('mouseover', function (mouseEvent) { this.src = Ressources['cancelButton_normal']; this.setAttribute('style', 'position:relative; margin: 0px 6px;top:0px; left:5px;'); }, false);
        cancelBmp.addEventListener('mouseout', function (mouseEvent) { this.src = Ressources['cancelButton_small']; this.setAttribute('style', 'position:relative; margin: 10px 10px;top:0px; left:0px;'); }, false);
        cancelBmp.addEventListener('click', function (mouseEvent) { hideSettingsBox(); }, false);
        cancelBmp.setAttribute('align', 'right');
        windowTableTd_l_2.appendChild(cancelBmp);

        windowTable.appendChild(windowTableTd_l_2);
        contentTd.appendChild(windowTable);
        // Col 2 [end]
        // Save Cancel Row [end] (Last Row)


        // put them all toghether (settings)
        settingsBox.appendChild(contentTable);




        return settingsBox;
    }

    var showSettingsBox = function() {
        settingsBox.style.display = 'block';
    }

    var hideSettingsBox = function() {
        settingsBox.style.display = 'none';
    }

    ///////////////
    // Build GFC UI
    this.createUI = function () {


        // create main box
        mainBox = document.createElement('div');
        mainBox.setAttribute('name', 'appbox')
        mainBox.setAttribute('style', this.bgStyle);
        mainBox.style.color = AppSettings['textcolor'];


        // Application title element
        appTitleElement = document.createElement('h3');
        appTitleElement.setAttribute('style', 'font-size:125%;');
        appTitleElement.style.color = AppSettings['textcolor']; // text color
        appTitleElement.setAttribute('name', 'title');
        var appTitleText = document.createTextNode('\u00A0Facebook Gift Link Creator ' + AppSettings['version']);
        appTitleElement.appendChild(appTitleText)

        // Application title element
        // + '<span><blink><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=P6CWZDSYT2GTJ" target="_blank" style="color:blue; cursor:pointer;"> -donate via PayPal-</a></blink></span>'
        var appDonateNote = document.createElement('blink');
        //appDonateNote.setAttribute('style', '');
        appDonateNote.style.color = AppSettings['textcolor']; // text color
        appDonateNote.setAttribute('style', 'font-size:75%; text-align:right; float:right');
        //appDonateNote.setAttribute('align', 'right');
        appDonateNote.setAttribute('name', 'donateNote');

        var appDonatehref = document.createElement('a')
        appDonatehref.setAttribute('href', 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=P6CWZDSYT2GTJ');
        appDonatehref.setAttribute('target', '_blank');
        appDonatehref.setAttribute('style', 'cursor:pointer');
        appDonatehref.style.color = AppSettings['textcolor']; // text color
        var appDonateNoteText = document.createTextNode('-- If you like it, feel free to donate. Thx!!! --');
        appDonatehref.appendChild(appDonateNoteText);
        appDonateNote.appendChild(appDonatehref);
        appTitleElement.appendChild(appDonateNote)


        // Application menubar
        var menubarElement = document.createElement('div')
        menubarElement.setAttribute('style', 'height: 40px');
        menubarElement.setAttribute('name', 'menuBar');

        // Menugrapics
        var bmp_setting = document.createElement('img');
        bmp_setting.setAttribute('style', 'position:relative; margin: 10px 10px;top:0px; left:0px;');
        bmp_setting.src = Ressources['settingsButton_small'];
        // Chrome
        //     bmp_setting.onmouseover = function () { this.src = Ressources['settingsButton_normal']; this.setAttribute('style', 'position:relative; margin: 0px 6px;top:0px; left:5px;'); }
        //     bmp_setting.onmousemove = function () { showToolTipBox(LangCodeText['settingsButton_' + AppSettings['langCode']]); }
        //     bmp_setting.onmouseout = function () { this.src = Ressources['settingsButton_small']; this.setAttribute('style', 'position:relative; margin: 10px 10px;top:0px; left:0px;'); hideToolTipBox(''); }
        //     bmp_setting.onclick = function () { showSettingsBox(); }
        // FireFox
        bmp_setting.addEventListener('mouseover', function (mouseEvent) { this.src = Ressources['settingsButton_normal']; this.setAttribute('style', 'position:relative; margin: 0px 6px;top:0px; left:5px;'); }, false);
        bmp_setting.addEventListener('mousemove', function (mouseEvent) { showToolTipBox(mouseEvent, LangCodeText['settingsButton_' + AppSettings['langCode']]); }, false);
        bmp_setting.addEventListener('mouseout', function (mouseEvent) { this.src = Ressources['settingsButton_small']; this.setAttribute('style', 'position:relative; margin: 10px 10px;top:0px; left:0px;'); hideToolTipBox(''); }, false);
        bmp_setting.addEventListener('click', function (mouseEvent) { showSettingsBox(); }, false);

        var bmp_visit = document.createElement('img');
        bmp_visit.setAttribute('style', 'position:relative; margin: 10px 10px;top:0px; left:0px;');
        bmp_visit.src = Ressources['visitButton_small'];
        bmp_visit.addEventListener('mouseover', function (mouseEvent) { this.src = Ressources['visitButton_normal']; this.setAttribute('style', 'position:relative; margin: 0px 6px;top:0px; left:5px;'); }, false);
        bmp_visit.addEventListener('mousemove', function (mouseEvent) { showToolTipBox(mouseEvent, LangCodeText['visitButton_' + AppSettings['langCode']]); }, false);
        bmp_visit.addEventListener('mouseout', function (mouseEvent) { this.src = Ressources['visitButton_small']; this.setAttribute('style', 'position:relative; margin: 10px 10px;top:0px; left:0px;'); hideToolTipBox(''); }, false);
        bmp_visit.addEventListener('click', function (mouseEvent) { window.open("http://userscripts.org/scripts/show/84328", "UserScripts", "width=1024,height=768,menubar=yes,status=yes,location=yes,toolbar=yes,scrollbars=yes"); }, false);

        var bmp_about = document.createElement('img');
        bmp_about.setAttribute('style', 'position:relative; margin: 10px 10px;top:0px; left:0px;');
        bmp_about.src = Ressources['aboutButton_small'];
        bmp_about.addEventListener('mouseover', function (mouseEvent) { this.src = Ressources['aboutButton_normal']; this.setAttribute('style', 'position:relative; margin: 0px 6px;top:0px; left:5px;'); }, false);
        bmp_about.addEventListener('mousemove', function (mouseEvent) { showToolTipBox(mouseEvent, LangCodeText['aboutButton_' + AppSettings['langCode']]); }, false);
        bmp_about.addEventListener('mouseout', function (mouseEvent) { this.src = Ressources['aboutButton_small']; this.setAttribute('style', 'position:relative; margin: 10px 10px;top:0px; left:0px;'); hideToolTipBox(''); }, false);
        bmp_about.addEventListener('click', function (mouseEvent) { alert(LangCodeText['aboutMsg_' + AppSettings['langCode']]); }, false);

        var bmp_donate = document.createElement('img');
        bmp_donate.setAttribute('style', 'position:relative; margin: 10px 10px;top:0px; left:0px;');
        bmp_donate.src = Ressources['donateButton_small'];
        bmp_donate.addEventListener('mouseover', function (mouseEvent) { this.src = Ressources['donateButton_normal']; this.setAttribute('style', 'position:relative; margin: 0px 6px;top:0px; left:5px;'); }, false);
        bmp_donate.addEventListener('mousemove', function (mouseEvent) { showToolTipBox(mouseEvent, LangCodeText['donateButton_' + AppSettings['langCode']]); }, false);
        bmp_donate.addEventListener('mouseout', function (mouseEvent) { this.src = Ressources['donateButton_small']; this.setAttribute('style', 'position:relative; margin: 10px 10px;top:0px; left:0px;'); hideToolTipBox(''); }, false);
        bmp_donate.addEventListener('click', function (mouseEvent) { window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=P6CWZDSYT2GTJ", "Donate", "width=1024,height=768,menubar=yes,status=yes,location=yes,toolbar=yes,scrollbars=yes"); }, false);

        

        // put menuelements to menubar
        menubarElement.appendChild(bmp_visit);
        menubarElement.appendChild(bmp_setting);
        menubarElement.appendChild(bmp_about);
        menubarElement.appendChild(bmp_donate);

        // create tooltip box
        var tooltipBox = document.createElement('div');
        tooltipBox.setAttribute('name', 'tooltip')
        tooltipBox.setAttribute('style', 'position:absolute; background: white; display:none; border-style:solid; border-width:thin; color:#000;');
        var toolTipText = document.createTextNode('...');
        tooltipBox.appendChild(toolTipText)

        var showToolTipBox = function (e, message) {
            tooltipBox.style.display = 'block';
            // tooltipBox.style.left = (window.event.x + 20) + "px"; // chrome only
            // tooltipBox.style.top = (window.event.y + 5) + "px"; // chrome only
            tooltipBox.style.left = (e.pageX + 20) + "px"; // FireFox
            tooltipBox.style.top = (e.pageY + 5) + "px"; // FireFox

            toolTipText.nodeValue = "\u00A0" + message + "\u00A0";
        }

        var hideToolTipBox = function () {
            tooltipBox.style.display = 'none';
        }



        var appContentBox = document.createElement('div');
        // put them all toghether
        mainBox.appendChild(appTitleElement);   // 1. Title
        mainBox.appendChild(menubarElement);    // 2. Menubar
        mainBox.appendChild(tooltipBox);        // 3. Tooltip
        mainBox.appendChild(this.buildSettingsBox());       // 4. Settings
        appContentBox.appendChild(mainBox);
        try {
            appContentBox.appendChild(this.buildGiftContent()); // 5. Giftcontent
        } catch (e) {
            alert('buildGiftContent error: ' + e);
        }

        if (this.gameCardMode == 0) {
            try {

                //$jQ(this.buildGiftContent()).insertBefore("div[id=content] > *");
                // $jQ(mainBox).insertBefore("div[id=content] > *");
               $jQ(appContentBox).insertBefore("div[id=content]");

                
                // mainBox.appendChild(this.buildGiftContent());
            }
            catch (e) {
                console.log('[createUI - gcm=0] error: "div[id=content]" not found! Facebook layout change?')
            }
        } else {
            this.gameCardMode = 1;
            try {
                $jQ(mainBox).insertBefore("div[id=pagelet_requests]");
            }
            catch (e) {
                console.log('[createUI - gcm=1] error: "div[id=pagelet_requests]" not found! Facebook layout change?')
            }
            try {
                $jQ(mainBox).insertBefore("div[id=contentArea]");
            } catch (e) {
                console.log('[createUI - gcm=1] error: "div[id=contentArea]" not found! Facebook layout change?')
            }
        }
    }

    this.init = function () {
        AppSettings['langCode'] = Storage.getValue('language');
        if (AppSettings['langCode'] == null) {
            AppSettings['langCode'] = 'en';
        }

        AppSettings['bgcolor_from'] = Storage.getValue('bgcolor_from');
        if (AppSettings['bgcolor_from'] == null) {
            AppSettings['bgcolor_from'] = '#ccf';
        }

        AppSettings['bgcolor_to'] = Storage.getValue('bgcolor_to');
        if (AppSettings['bgcolor_to'] == null) {
            AppSettings['bgcolor_to'] = '#888';
        }

        AppSettings['textcolor'] = Storage.getValue('textcolor');
        if (AppSettings['textcolor'] == null) {
            AppSettings['textcolor'] = '#000';
        }

        AppSettings['maxtabs'] = Storage.getValue('maxtabs');
        if (AppSettings['maxtabs'] == null) {
            AppSettings['maxtabs'] = '10';
        }

        AppSettings['useIFrame'] = Storage.getValue('useIFrame');
        if (AppSettings['useIFrame'] == null) {
            AppSettings['useIFrame'] = true;
        }else{
            if (AppSettings['useIFrame'] == 'true'){
                AppSettings['useIFrame'] = true;
            }else{
                AppSettings['useIFrame'] = false;
            }
        }

        AppSettings['useIFrameTimeout'] = Storage.getValue('useIFrameTimeout');
        if (AppSettings['useIFrameTimeout'] == null) {
            AppSettings['useIFrameTimeout'] = false;
        }else{
            if (AppSettings['useIFrameTimeout'] == 'true'){
                AppSettings['useIFrameTimeout'] = true;
            }else{
                AppSettings['useIFrameTimeout'] = false;
            }
        }

        AppSettings['IFrameTimeout'] = Storage.getValue('IFrameTimeout');
        if (AppSettings['IFrameTimeout'] == null) {
            AppSettings['IFrameTimeout'] = '6000'; // in ms
        }

        // get color from settings
        this.bgStyle = 'background: -webkit-gradient(linear, left top, left bottom, from(' + AppSettings['bgcolor_from'] + '), to(' + AppSettings['bgcolor_to'] + ')); background: -moz-linear-gradient(top, ' + AppSettings['bgcolor_from'] + ',  ' + AppSettings['bgcolor_to'] + ');';
        this.bgStyleTitle = 'background: -webkit-gradient(linear, left top, right top, from(' + AppSettings['bgcolor_to'] + '), to(' + AppSettings['bgcolor_from'] + ')); background: -moz-linear-gradient(right,  '+AppSettings['bgcolor_to']+',  ' + AppSettings['bgcolor_from'] + ');';
    }


    this.main = function () {
        this.init();
        this.createUI();
    }
}

function start() {
    app.main();
}

if (location.href.match("www.facebook.com") && (location.href.match("reqs.php") || location.href.match("games?")) && (!location.href.match("uiserver.php?"))) {
    var app = new GFC;
    // $(document).ready(function() {});
    // new JQuery
    $jQ = $;
    
    window.setTimeout(function() {app.main()}, 500); // really needed to set a timeout
    //$(document).ready(app.main());
   
}

// Script end