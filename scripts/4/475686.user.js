// ==UserScript==
// @name		Links
// @namespace		http://zdumb.byethost32.com/
// @author		Zdumb
// @homepage		http://zdumb.byethost32.com/
// @description		Urls are Links, change url in plain text to a link
// @license		GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @include		http://*
// @include		https://*
// @include		file:///*
// @grant		GM_setValue
// @grant		GM_getValue
// @grant		GM_getResourceText
// @grant		GM_info
// @version		0.1
// @encoding		utf-8
// @icon		http://su.tru.io/991/dumb.png
// @downloadURL		https://userscripts.org/scripts/source/475686.user.js
// @updateURL		https://userscripts.org/scripts/source/475686.meta.js
// ==/UserScript==

(function () {var uri = /((((ftp|https?):\/\/)|www\.)((([-_\w])+\.)+[a-z]{2,5}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/([-a-z\d%_.~+=;\(\)])*)*(\?([;&a-z\d%_.~+=-])*)?(\#([-a-z\d_])*)?|\b([a-z0-9_\\.\\-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})\b)/i, filter = /^(textarea|input|button|select|option|meta|link|noscript|a|html|head|object|embed|script|style|frameset|frame|iframe)$/i, key, fn, img, drag, zoomX, zoomY, dragFlag, win, scale, percentage, L, R, Q, v, x; function ngerot(root) {var lolaje = document.createTreeWalker( root || document.body, NodeFilter.SHOW_TEXT, { acceptNode: function (a) {if (!filter.test(a.parentNode.localName) && uri.test(a.data)) { return NodeFilter.FILTER_ACCEPT; } else {return NodeFilter.FILTER_SKIP; } } }, false); var aktifkan = []; while (lolaje.nextNode()) aktifkan.push(lolaje.currentNode); return aktifkan; } function tautan(a) { var node = [a]; while (node.length) { var kur = node.pop(); var m = uri.exec(kur.nodeValue); if (!m) { continue; } else if (m.index == 0) { var link = m[0].replace(/[\/|\.]*$/, ""); if (kur.nodeValue.length > link.length) { kur.splitText(link.length); node.push(kur.nextSibling); } a = document.createElement('a'); a.href = (link.indexOf('://') == -1 ? ((link.indexOf('@') > -1) ? "mailto:" : "http://") : "") + link; a.target = '_blank'; kur.parentNode.insertBefore(a, kur); a.appendChild(kur); } else { kur.splitText(m.index); node.push(kur.nextSibling); } } } function tambahkan(a, b, c) { if (a.addEventListener) { return a.addEventListener(b, c, false); } return; } var aktifkan = { fn: function () { var res = ngerot(document.body); for (var i in res)(function (a) { tautan(a); })(res[i]) } };
	(function () { 
		fn = aktifkan.fn; 
		tambahkan(window, "DOMContentLoaded", fn); 
		return; 
	})();
})();