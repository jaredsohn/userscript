// ==UserScript==
// @name           Facebook Game News Sidebar Remover
// @namespace      http://www.userscripts.org
// @description    Removes the right sidebar that appears next to apps/games
// @include        http://apps.facebook.com/*

// @include        https://apps.facebook.com/*
// ==/UserScript==

var fbAppsSidebar = document.getElementById('rightCol');
if (fbAppsSidebar) {
	fbAppsSidebar.parentNode.removeChild(fbAppsSidebar);
}