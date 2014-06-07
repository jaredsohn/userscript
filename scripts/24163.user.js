// ==UserScript==
// @name           YouTube.com | Search selected
// @namespace      YouTube
// @description    On loading page the search will be selected.
// @include        http://*youtube.com/*
// ==/UserScript==

document.getElementById("search-term").focus();