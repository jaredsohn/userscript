// ==UserScript==
// @name           FPSubTop
// @namespace      http://userscripts.org/scripts/show/99126
// @description    Move sub-forums back to the top
// @include        http://www.facepunch.com/forums/*
// ==/UserScript==

var subForums = document.getElementsByClassName( "forums" )[0];
var threadList = document.getElementById( "above_threadlist" );

subForums.parentNode.insertBefore( subForums, threadList );