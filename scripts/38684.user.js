// ==UserScript==
// @name           Reddit Deep Link Follow
// @namespace      http://userscripts.org/scripts/show/38684
// @include        http://www.reddit.com/*
// @author         Noah Richards
// @homepage       http://noahsmark.com
// ==/UserScript==

var e = document.getElementsByClassName("title")[1].children[0];

if (e.tagName == "A" && 
    window.location != e.href &&
    history.length <= 1)
{
    window.location = e.href;
}

