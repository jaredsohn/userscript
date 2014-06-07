// ==UserScript==
// @name           Repair Layout
// @namespace      http://onyxstone.stumbleupon.com/*
// @description    repair layout
// @include        http://*.stumbleupon.com/*
// @author         http://onyxstone.stumbleupon.com/
// ==/UserScript==


if (window.wrappedJSObject.stumbler) {
var head = document.getElementsByTagName('head')[0];

var style = document.createElement('style');

style.type = "text/css";

var css = "";
css+= "#blogEntries > dl > dd > * {position: static !important;}";



style.innerHTML = css;

head.appendChild(style);
}