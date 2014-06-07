// ==UserScript==
// @name           Redirect 9gag to linx
// @namespace      http://userscripts.org/
// @description    9gag to linx.
// @include        http://9gag.com/*
// @include        http://www.9gag.com/*
// ==/UserScript==

window.location.href = 'http://linx.li/remote.php?f='+location.href;