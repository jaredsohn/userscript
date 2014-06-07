// ==UserScript==
// @name           Facebook News Feed Killer
// @author         Billig
// @description    Blocks the news feed from your home screen.
// @include        http://*.facebook.com/home*
// ==/UserScript==

GM_addStyle("#home_main { display: none !important; }");