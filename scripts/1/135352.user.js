// ==UserScript==
// @name           Enable Mouse Click on ThaiRath.co.th
// @namespace      http://userscripts.org/scripts/show/135352
// @description    Enable Mouse Click on ThaiRath.co.th
// @version        3
// @icon           http://s3.amazonaws.com/uso_ss/icon/135352/large.png?1338936048
// @include        *thairath.co.th/*
// ==/UserScript==

// Credit to http://userscripts.org/scripts/show/30096

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
if(e.getAttribute("oncontextmenu")) e.setAttribute("oncontextmenu", null);
if(e.getAttribute("onmouseup")) e.setAttribute("onmouseup", null);
if(e.getAttribute("onmousedown")) e.setAttribute("onmousedown", null);
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
if(win.ProtectImg) win.ProtectImg = function(e) {return true;};

//document.oncontextmenu = new Function("return true");
document.oncontextmenu = null;
