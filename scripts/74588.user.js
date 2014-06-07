// ==UserScript==
// @name           YouTube Enlarger
// @namespace      http://userscripts.org
// @description    Resizes the YouTube player. 
// @include        http://www.youtube.com/*
// ==/UserScript==

function $(a) { return document.getElementById(a); }

$("watch-video").className = "wide";
$("content").className = "watch-wide";
