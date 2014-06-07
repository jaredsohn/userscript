// ==UserScript==
// @name Digg Follow Story Link
// @description Navigate directly to the interesting link on a Digg page.
// @include http://digg.com/*
// ==/UserScript==

var e = document.getElementById("title").children[0];

if (e.tagName == "A")
{
    if (history.length <= 1) window.location = e.href;
}
