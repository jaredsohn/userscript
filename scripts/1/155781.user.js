// ==UserScript==
// @name           Anti-Disabler
// @namespace      http://diveintomark.org/projects/greasemonkey/
// @description    restore context menus on sites that try to disable them
// @include        http://*
// @include        https://*
// @include        file:///*
// @exclude        http://*.google.com/*
// @exclude        https://*.google.com/*
// @exclude        http://*.youtube.com/*
// @exclude        http://*.facebook.com/*
// @exclude        http://userscripts.org/*
// @exclude        https://userscripts.org/*
// @exclude        http://*.deviantart.com/*
// @copyright      JoeSimmons & Mark Pilgrim
// @version        1.0.8
// ==/UserScript==

/*
Other mild credit:
	absurdlyobfuscated
	Jeroenz0r
	rinopo_d
*/

// Basic, general disabling
var doc = document.wrappedJSObject || document, win = window.wrappedJSObject || window;
	doc.onmouseup = null;
	doc.onmousedown = null;
	doc.oncontextmenu = null;
	doc.onselectstart = null;

// Disabling of specific elements
var all = document.getElementsByTagName('*');
for each(var e in all) {
	e = e.wrappedJSObject || e;
	e.onmouseup = null;
	e.onmousedown = null;
	e.oncontextmenu = null;
	e.onselectstart = null;
	if(e.getAttribute !== undefined) {
		if(e.getAttribute("oncontextmenu")) e.setAttribute("oncontextmenu", null);
		if(e.getAttribute("onmouseup")) e.setAttribute("onmouseup", null);
		if(e.getAttribute("onmousedown")) e.setAttribute("onmousedown", null);
		(e.style.MozUserSelect !== undefined && e.style.MozUserSelect=="none") && (e.style.MozUserSelect = "text")
	}
}

// Disabling by jQuery
if(win.$ && win.$(win.document) && win.$(win.document).unbind) {
	win.$(win.document).unbind("contextmenu");
	win.$("*").unbind("contextmenu");
	win.jQuery(win).unbind("keypress"); // Remove keyboard blocking - comment line out if you don't want it
}

// Disabling by Prototype JS Framework
if(doc.observe) {
	doc.stopObserving("contextmenu");
	doc.stopObserving("mousedown");
	doc.stopObserving("mouseup");
}
(win.ProtectImg) && (win.ProtectImg = function(e) {return true;})