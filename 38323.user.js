// ==UserScript==
// @name          Makes entire Musicovery screen visible on extended desktop
// @description   When using extended desktop, musicovery flash movie stretches outside of visible area which makes it impossible to see all songs. This script enlarges the visible area to see entire flash movie.
// @include       http://musicovery.com/*
// ==/UserScript==

document.getElementsByTagName('embed')[0].width=2100