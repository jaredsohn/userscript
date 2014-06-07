// ==UserScript==
// @name           Twitter Promoted Killer
// @namespace      twitter.com
// @description    Hide promoted tweets, promoted accounts and promoted trends on Twitter
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        https://m.twitter.com/*
// @include        https://mobile.twitter.com/*
// ==/UserScript==

// This is the most efficient way to block promoted garbage
var style_node = document.createElement("style");
style_node.setAttribute("type", "text/css");
style_node.appendChild(document.createTextNode(".promoted-tweet{display:none;}.promoted-account{display:none;}.promoted-trend{display:none;}"));
document.getElementsByTagName("head")[0].appendChild(style_node);