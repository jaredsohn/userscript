// ==UserScript==
// @name           Auto expand YouTube Menu
// @description    Automatically expands the "My Playlists" bar at the top of YouTube
// @include        http://*.youtube.com/*
// @version        1.0
// ==/UserScript==

/* CHANGE THESE VALUES IF YOU LIKE */
var fontSize = '15px';
var alignment = 'right';

/* REMOVING THE CLASS ATTRIBUTE FROM THE BAR PREVENTS IT FROM BEING HIDDEN ON PAGE LOAD */
document.getElementById('masthead-expanded').removeAttribute('class');