// ==UserScript==
// @name Digg Deep
// @description Navigate directly to the interesting link on a Digg page.
// @include http://digg.com/*
// ==/UserScript==

var e = document.getElementById("title").firstChild;
var url;
if (e.tagName == "A") url = document.getElementById("title").firstChild.href;
window.location.replace(url);
