// ==UserScript==
// @name           All Quake Live chat messages to left without images
// @author         kry
// @version        1.0.1
// @namespace      http://userscripts.org/users/kry
// @description    Aligns all Quake Live chat messages to left and removes model icons
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// ==/UserScript==
/************************************************************

Licensed for unlimited modification and redistribution
as long as this notice is kept intact.

Chat in Quake Live Welcome screen script made by kry.

This script just moves all Quake Live chat to left and
removes images

************************************************************/

/**
 * GM_ API emulation for Chrome
 * 2009, 2010 James Campos
 * cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
 */
if (typeof GM_getValue == "undefined") {
  GM_addStyle = function(css) {
    var style = document.createElement('style');
    style.textContent = css;
    document.getElementsByTagName('head')[0].appendChild(style);
  }
}

GM_addStyle(" .chat-history-me { text-align:left; } .chat-history-me img { float: left; } .chat-history-me div { margin-left: 0px; margin-right: 0px; } .chat-history-them div { margin-left: 0px; margin-right: 0px; } ");
GM_addStyle(" .chat-history-me img { display: none; } .chat-history-them img { display: none; }" );
GM_addStyle(" .chat-history-me h1 { margin-left: 3px; margin-right: 3px; } .chat-history-me div { margin-left: 3px; margin-right: 3px; } .chat-history-them h1 { margin-left: 3px; margin-right: 3px; } .chat-history-them div { margin-left: 3px; margin-right: 3px; }" );