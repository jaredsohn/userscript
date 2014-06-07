// ==UserScript==
// @name           facebook rightcol hider/collapser
// @namespace      http://theseb.com
// @description    hides the entire right column for facebook
// @include        http://facebook.com/*
// @include        http://www.facebook.com/*
// @include        https://facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==

var rcol = document.getElementById("rightCol");
rcol.style.visibility="hidden";
rcol.style.overflow="hidden";
rcol.style.width="0px";

var carea = document.getElementById("contentArea");
carea.style.width="757px";
