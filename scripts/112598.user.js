// GrooveBlocker
// version 0.1 BETA!
// 
// Copyright (c) 2011, TheShadowFOg
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// Blocks grooveshark ads.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          GrooveBlocker
// @namespace     http://greg1x.tumblr.com/
// @description   Blocks grooveshark ads. (Dev http://greg1x.tumblr.com/)
// @include       http://grooveshark.com/*   
// ==/UserScript==
 
var adSidebar = document.getElementById('capitalFrameWrapper');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}

//Not functional:

var adSidebareleft = document.getElementById('searchCapitalWrapper');
if (adSidebarleft) {
    adSidebarleft.parentNode.removeChild(adSidebarleft);
}

//function addShortcuts() {

//window.Grooveshark.addCurrentSongToLibrary()

//shortcut.add("Ctrl+Shift+F", function() {
//	window.Grooveshark.addCurrentSongToLibrary()
//});
   