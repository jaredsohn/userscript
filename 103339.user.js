// ==UserScript==
// @name          Reddit f7u12 Remove Background
// @namespace url(http://www.w3.org/1999/xhtml);
// @description	  Removes the background image from f7u12 subreddit.
// @author        kanakola
// @include       http://*.reddit.com/r/fffffffuuuuuuuuuuuu
// @include       http://*.reddit.com/r/fffffffuuuuuuuuuuuu/*
// @run-at document-start
// ==/UserScript==

(function () { 
var $ = unsafeWindow.$;
//var jQuery = unsafeWindow.jQuery;

$("body").css("background","white");
})()