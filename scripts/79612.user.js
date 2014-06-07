// ==UserScript==
// @name           Digg: direct to news
// @namespace      http://karwasz.org/
// @description    When using links from the feed, go directly to the news page skipping Digg's comment page.
// @author         Piotr P. Karwasz
// @include        http://digg.com/*
// ==/UserScript==

if(document.URL.match('utm_medium=feed'))document.location=document.evaluate('//h1/a',document,null,0,null).iterateNext();
