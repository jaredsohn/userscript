// coding: utf-8
// ==UserScript==
//
// @name	Ikariam Piraten Tool
// @version	1.0
// @date	14.12.2013
// @author	Cherry
// @description	Entfernt die Piratenfestung und Piratenschiff.
// @include    	http://s*.ikariam.gameforge.com/*
// @exclude    	http://support.*.ikariam.gameforge.com/*
// @exclude   	http://board.*.ikariam.gameforge.com/*
// @grant      	GM_addStyle
//
// ==/UserScript==
//
// Version:
//		v1.0
//		- start Script

// entfernt Piratenfestung und stellt Ansicht Insel wieder her
      GM_addStyle('#pirateFortressBackground { display: none; }');
      GM_addStyle('#js_CityPosition17Img { display: none; }');

// entfernt Piratenschiff
      GM_addStyle('#pirateFortressShip { display: none; }');

