// ==UserScript==
// @name       TVNZ ONE News Live Streaming - Large Player
// @namespace  http://www.redcube.co.nz/
// @version    0.1
// @description  Removes the coming next panel to the right of the player and increases player size to the full content width
// @match      http://www.tvnz.co.nz/*
// @include        http*://tvnz.co.nz/*
// @include        http*://*.tvnz.co.nz/*
// @grant      GM_addStyle
// @grant      MV_removeElementsByPath
// @copyright  public domain
// ==/UserScript==

GM_addStyle("#nowNext { display:none; }");
GM_addStyle("#vidContainer { width:100%; }");
GM_addStyle("#vidContainer > object { height:518px; width:98%; }");
GM_addStyle("#contentBtm { border-top: 0px; }");
GM_addStyle("#contentTop { border-bottom: 0px; }");