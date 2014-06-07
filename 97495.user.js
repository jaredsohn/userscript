// ==UserScript==
// @name          Arabtube - Remove Title Prefix  
// @description   Removes the "Arabtube - " prefix from Arabtube titles, so you better can see which page is which in the browser tab bar. Assumes you show favicons in the tab bar, so you can tell the site that way.
// @include       http://www.arabtube.tv/*
// ==/UserScript==

document.title = document.title.replace(/^Arabtube :: Video :: /, '')
