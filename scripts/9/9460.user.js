// ==UserScript==
// @name           Wikipedia focus search
// @namespace      wikipedia
// @description    When you surf to WikiPedia, focus the search field so that you can enter a search without having to use the mouse to focus the field
// @include        http://de.wikipedia.org/*Hauptseite
// @include        http://en.wikipedia.org/*Main_page
// ==/UserScript==

document.getElementById("searchInput").focus();