// ==UserScript==
// @name           Facebook to Twitter Hashtag Search Linker
// @namespace      http://userscripts.org/scripts/show/116472
// @description    change hashtags on FB to link of search result on Twitter
// @include        https://facebook.com/*
// @include        http://facebook.com/*
// @include        https://www.facebook.com/*
// @include        http://www.facebook.com/*
// @exclude        http://twitter.com/*
// ==/UserScript==

['messageBody','commentBody'].forEach(function (s) {for (var els = document.getElementsByClassName(s), c = els.length - 1, el = els[c]; c >= 0; c--, el = els[c]) { with(el) innerHTML = innerHTML.replace(/#([a-zA-Z0-9]+)/g, "<a href=\"https:\/\/twitter.com\/#!\/search\/%23$1\" style=\"color: #999\">#$1</a>"); }});