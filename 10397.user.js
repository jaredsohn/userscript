// ==UserScript==
// @name           Ads Aren't Delicious
// @namespace      http://logankoester.com
// @description    Make the del.icio.us "Sponsored Results" magically disappear ;)
// @include        http://del.icio.us/*
// ==/UserScript==

document.getElementById("sponsored").style.display = "none";