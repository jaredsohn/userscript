// ==UserScript==
// @name           GLB Larger Package Play Picker
// @namespace      monsterkill
// @description    makes the play picker window larger on the package edit screen
// @include        http://goallineblitz.com/game/team_package.pl?team_id=*&type=o&edit=*
// ==/UserScript==

GM_addStyle(".play_scroller_small {height: 599px}");
GM_addStyle(".play_subsection {height: 637px}");
GM_addStyle("#defense_plays {width: 1060px; height: 678px;}");