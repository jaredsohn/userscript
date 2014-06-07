// ==UserScript==
// @name       YouTube Wide
// @version    0.1
// @description  YouTube for Full HD screens
// @include      *.youtube.com/*
// @copyright  2013+, arturo182
// ==/UserScript==

GM_addStyle(
	'.watch-medium .player-height { height: 815px; }' +
    '.watch-medium .player-width { width: 1450px; }' +
    '#watch7-content { width: 1050px; }'
);