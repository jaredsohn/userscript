// ==UserScript==
// @name           Blip Ad-Blocker
// @namespace      CRD
// @description    Hides the large ads in blip.fm.
// @include        http://blip.fm/*
// ==/UserScript==

// ID-based hiding of ad elements
var styleOverride = 'div[id^="amg_target"] { display: none !important; } ';
styleOverride += 'div[id^="slot"] { border: solid 8px red; display: none !important; } ';
styleOverride += '#popup { display: none !important; } ';

GM_addStyle(styleOverride);