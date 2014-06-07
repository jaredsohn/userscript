// ==UserScript==
// @name           Deezer Unlocker
// @namespace      Enables the greyed out songs on Deezer
// @description    This removes the protection that Deezer has enabeld.  This script is based off of http://userscripts.org/scripts/show/14873 by symen.  All I did was set the embedded flash below to be in the English language instead of French.
// @include        http://www.deezer.com/
// @include        http://www.deezer.com/*
// @include        http://*.deezer.com/*
// ==/UserScript==
document.getElementById('flashcontent').innerHTML = '<embed type=\"application/x-shockwave-flash\" src=\"index4.swf?Version=2-1-0\" name=\"blogmusikswf\" bgcolor=\"#FFFFFF\" quality=\"high\" flashvars=\"urlIdSong=&amp;search=&amp;varemail=&amp;varuserid=&amp;lang=EN&amp;geoip=FR\" height=\"100%\" width=\"100%\">';