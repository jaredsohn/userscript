// ==UserScript==
// @name          Youtube_Grey_Background
// @description	  Turns most of Youtube background into grey (just when watching a video), to make it easier for the eyes.
// @version       1.0
// @include       http://*.youtube.com/watch?*
// @author        lkmdigital@gmail.com
// ==/UserScript==

GM_addStyle( [

 " body, #baseDiv, #watch-other-vids, .watch-main-area { background-color: #999 !important; }",

''].join("\n"));