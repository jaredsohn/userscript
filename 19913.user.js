// ==UserScript==
// @name           Youtube focus search
// @namespace      youtube
// @description    When you surf to Youtube, focus the search field so that you can enter a search without having to use the mouse to focus the field
// @include        http://youtube.com/*
// @include        http://www.youtube.com/*
// ==/UserScript==

document.getElementById("search-term").focus();