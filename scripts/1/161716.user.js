// ==UserScript==
// @name          Remove WordPress.org Plugins Directory header image
// @description   Remove WordPress.org Plugins Directory header image
// @grant         none
// @include       http://wordpress.org/extend/plugins/*
// ==/UserScript==


var els = document.getElementsByClassName("with-banner");
var plugintitle = els[0];
plugintitle.removeChild(plugintitle.childNodes[1]);
plugintitle.removeChild(plugintitle.childNodes[2]);
plugintitle.className = "";

