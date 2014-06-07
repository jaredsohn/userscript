// ==UserScript==
// @name           Focus YouTube Search Box
// @namespace      http://userscripts.org/users/90251
// @description    Set focus to YouTube's search box on load.
// @include        http://*.youtube.com/*
// @include        http://youtube.com/*
// @include        https://*.youtube.com/*
// @include        https://youtube.com/*
// ==/UserScript==

var searchbox = document.getElementById("masthead-search-term");
if (searchbox) {
        searchbox.focus();
        searchbox.select();
}