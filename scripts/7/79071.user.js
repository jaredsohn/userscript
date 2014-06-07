// ==UserScript==
// @name           RuneScape FullScreen for Free users
// @namespace      saanteeh
// @description    If you want the FULLSCREEN press F11 or go to "View" -> "Full Screen   F11"
// @include        *world*.runescape.com*
// ==/UserScript==

document.getElementsByTagName('td')[0].style.visibility='hidden';
document.getElementsByTagName('td')[0].style.position='absolute';
