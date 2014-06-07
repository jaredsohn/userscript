// ==UserScript==
// @name Digg Deep Preserve Backstack
// @description Navigate directly to the interesting link on a Digg page.
// @include http://digg.com/*
// ==/UserScript==

var e = document.getElementById("title").firstChild;
var url;
if (e.tagName == "A") url = document.getElementById("title").firstChild.href;
if (history.length <= 1) window.location = url;
