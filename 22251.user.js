// Inn MusicBox Fix
// version 0.1
// 2008-02-03
// Copyright (c) 2008, Amiad B.
// http://www.contactify.com/4f7bc
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Inn MusicBox Fix", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Inn MusicBox Fix
// @description    Fix MusicBox in Arutz 7
// @include       http://www.inn.co.il/static/Audio.htm#music/*
// ==/UserScript==

(function() {
     window.location.href = window.location.href.replace('http://www.inn.co.il/static/Audio.htm#music/', 'http://media.a7.org/a7radio/music/');
})();
