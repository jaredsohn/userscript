// ==UserScript==
// @name             The West Fullscreen and more... by Darius II
// @namespace        www.the-west.net
// @version          2.0.0
// @description      Fullscreen skin for the west
// @include          http://*.the-west.*/game.php*
// @include          http://*.the-west.*/forum.php*
// @require          http://userscripts.org/scripts/source/75442.user.js
// @resource    meta http://userscripts.org/scripts/source/73258.meta.js?interval=1&show
// ==/UserScript==


// --------------------------------------------------------------------
//
// includes sources scripts:
// TW Pro - @author Sandevil - @description The west PRO en castellano mod Sandevil - @namespace http://www.tw-pro.de/
// The West Fullscreen with Added GUI Buttons - @author xPeterx - @namespace ??
// The-west Motivation Exp - @author dikamilo - @namespace http://dikamilo.jogger.pl/
//
// --------------------------------------------------------------------

var fullscreen_script=document.createElement('script');
fullscreen_script.type='text/javascript';
fullscreen_script.src='http://pl-the-west.googlecode.com/svn/trunk/pl-the-west/tw-fullscreen.js';
document.body.appendChild(fullscreen_script);