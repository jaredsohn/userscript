// ==UserScript==
// @name           403-reload
// @namespace      http://userscripts.org/users/133663
// @description    Getchu.com's 403 errors on anything but a getchu or blank referer are really annoying.
// @include        http://www.getchu.com/*
// ==/UserScript==

if (/403 Forbidden/.test(document.title)){
	window.location.href = window.location.href;
}