// ==UserScript==
// @name        Twitter Recommended Users Remover
// @namespace   twitter
// @description Get rid of recommended users to follow
// @include     http://twitter.com/*
// @include     https://twitter.com/*
// @include     https://m.twitter.com/*
// @include     https://mobile.twitter.com/*
// @grant none
// ==/UserScript==

// This is the most efficient way to block recommended user list
var style_node = document.createElement("style");
style_node.setAttribute("type", "text/css");
style_node.appendChild(document.createTextNode(".wtf-module.has-content{display:none;}"));
document.getElementsByTagName("head")[0].appendChild(style_node);