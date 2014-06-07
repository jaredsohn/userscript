// ==UserScript==
// @name           Addicting Games - Skip Ad Before Game
// @namespace      RunningBlind
// @description    Skips the ad played before a game loads on AddictingGames.
// @include        http://www.addictinggames.com/*
// ==/UserScript==

if (document.getElementById('gamePage')) {
    unsafeWindow.embedGameInDiv();
}