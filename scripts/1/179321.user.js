// ==UserScript==
// @author         Endmost
// @name           polczat full frame fix
// @namespace      endmost
// @description    Fixes the applet initial size and resize on all browsers
// @version        1.0.0

// @match http://www.polczat.com.pl/*
// @match http://polczat.com.pl/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle("html{ height: 100%; } body { height: 100%; margin: 0px; } applet { display: block; }");

var chatApplet = document.getElementsByTagName("applet")[0];
chatApplet.style.width = "100%";
chatApplet.style.height = "100%";

// Misc changes, remove the ugly website title
document.title = "polczat";