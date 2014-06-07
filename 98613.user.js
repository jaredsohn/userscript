// ==UserScript==
// @name           All chat messages to left Quake Live
// @namespace      http://userscripts.org/users/kry
// @description    Aligns all chat messages to left
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// ==/UserScript==
/************************************************************

Licensed for unlimited modification and redistribution
as long as this notice is kept intact.

Chat in Quake Live Welcome screen script made by kry.

This script just changes 1 css value to move all Quake Live
chat to left

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

GM_addStyle(" .chat-history-me { text-align:left; } .chat-history-me img { float: left; } .chat-history-me div { margin-left: 45px; margin-right: 0px; } .chat-history-them div { margin-left: 45px; margin-right: 0px; } ");