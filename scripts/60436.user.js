// ==UserScript==
// @name           MusicMight: Enable right-click menu
// @namespace      musicmight
// @description    enables the right-click (context) menu
// @include        *://www.musicmight.com/*
// ==/UserScript==

//enable right-click menu
unsafeWindow.oncontextmenu="return true;";