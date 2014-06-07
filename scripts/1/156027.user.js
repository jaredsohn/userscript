// ==UserScript==
// @name       Remove Empty Timeline Box
// @namespace  twitter.com
// @version    0.1
// @description  Hides the "Empty Timeline" content; the "Here are some people you might enjoy following" content that appears when you are following < 5 accounts.
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        https://m.twitter.com/*
// @include        https://mobile.twitter.com/*
// ==/UserScript==
// This is the most efficient way to block promoted garbage
var style_node = document.createElement("style");
style_node.setAttribute("type", "text/css");
style_node.appendChild(document.createTextNode(".empty-timeline{display:none;}"));
document.getElementsByTagName("head")[0].appendChild(style_node);
