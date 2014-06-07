// ==UserScript==
// @name           Remove Meebo Chat Bar
// @namespace      Project Playlist
// @description    Removes the Meebo Chat bar from the bottom of your Project Playlist pages.
// @include        http://*.playlist.com/*
// ==/UserScript==

document.getElementById("meebo").style.visibility = "hidden"