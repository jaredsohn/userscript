// Author: Michal Wiglasz  <www.twitter.com/kacer>

// ==UserScript==
// @name           Pevná velikost písma pro Fakturoid
// @include        http://*.fakturoid.cz/*
// @include        https://*.fakturoid.cz/*
// ==/UserScript==

var CSS="body { font-size:12px !important; }";
GM_addStyle(CSS);
