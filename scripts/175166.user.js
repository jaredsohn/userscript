// ==UserScript==
// @name           Infinity Heart Emoticon
// @version        0.1
// @namespace      CrashPolyInfinityHeart
// @url            https://facebook.com/lexi.anevay
// @author         Crash Rainbowtron
// @description    Adds a polyamorous emoticon to Facebook.
// @include        https://facebook.com/*
// ==/UserScript==

var find = "&lt;83";
var repl = "<img src='http://upload.wikimedia.org/wikipedia/en/c/c1/Infinityheart.png'>";
var page = document.body.innerHTML;
while (page.indexOf(find) >= 0) {
var i = page.indexOf(find);
var j = find.length;
page = page.substr(0,i) + repl + page.substr(i+j);
document.body.innerHTML = page;
}