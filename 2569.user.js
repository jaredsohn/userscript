// ==UserScript==
// @name           Digg Re-Direct
// @namespace      http://manalang.com/greasemonkey
// @description    When browsing to a digg page via it's RSS feed, you'll get redirected to the target page
// @include        http://digg.com/*
// ==/UserScript==var t = document.getElementById('title1');window.location = t.getElementsByTagName('a')[0].href;