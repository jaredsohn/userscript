// ==UserScript==
// @name           LandGrab notification bar hider
// @namespace      landgrab_notifyhide
// @description    Simple script to hide annoying (for me) notification bar at bottom
// @include        http://landgrab.net/*
// ==/UserScript==

if(document.getElementById("bottom_bar"))
  document.getElementById("bottom_bar").style.display = 'none';