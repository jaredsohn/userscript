// ==UserScript==
// @name           GameNewsHQ Redirector
// @namespace      Atrus's Homeboy
// @description    Redirects from the "gamenewshq.com/news/..." url to the article's original url
// @include        http://www.gamenewshq.com/news/*
// ==/UserScript==

var lnk = document.getElementsByTagName('FRAME')[1].src;
window.location = lnk;