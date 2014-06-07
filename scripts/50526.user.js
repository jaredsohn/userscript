// ==UserScript==
// @name           Runescape in full screen
// @namespace      Doug Barrett
// @description    this script makes that you can play runescape in full screen
// @include        *world*.runescape.com/*
// ==/UserScript==

var nav = document.getElementById("menubox");

if (nav) 
{
nav.parentNode.removeChild(nav);
}

nav = document.getElementById("tb");

if (nav) 
{
nav.parentNode.removeChild(nav);
}