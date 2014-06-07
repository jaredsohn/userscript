// ==UserScript==
// @name          last.fm player hider
// @namespace      *
// @description  
// @include        http://*last*/user/*
// ==/UserScript==

(function()
{
	var playerTag = document.getElementById('player');
	playerTag.style.display = "none";
		
	var ads1Tag = document.getElementById('LastAd_TopRight');
	ads1Tag.style.display = "none";

}) ();
