// ==UserScript==
// @name           Fix Yahoo Fantasy Football Column Width
// @namespace      http://www.stealthmonkey.com
// @description    Fixes the incorrect column width on the Matchup view that causes bad wrapping
// @include        http://football.fantasysports.yahoo.com/*/matchup?*
// ==/UserScript==

GM_addStyle(".teamtable td.player { width: 128px !important; }");