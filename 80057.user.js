// ==UserScript==
// @name          WideYoutube
// @description	  Auto-expands youtube video frame
// @include       http://*.youtube.com/*
// ==/UserScript==
function $(wide) { return document.getElementById(wide); }
$("watch-video").className = "wide";
$("content").className = "watch-wide";
