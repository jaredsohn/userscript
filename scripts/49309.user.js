// ==UserScript==
// @name           Twitter Hashtag Linker
// @namespace      http://www.yaotti.net
// @description    change hash tags to link of search result
// @include        http://twitter.com/*
// @exclude        http://twitter.com/#search*
// ==/UserScript==

with(document.getElementsByClassName('section')[0])
    innerHTML = innerHTML.replace(/#([a-zA-Z0-9]+)/g, "<a href=\"/#search?q=%23$1\" style=\"color: #999\">#$1</a>");
