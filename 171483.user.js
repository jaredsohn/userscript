// ==UserScript==
// @name        Chess.com live chess dark background
// @namespace   de.exoticorn
// @description A darker background for live chess.
// @include     http://live.chess.com/live*
// @version     1
// @grant       none
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#main_bc, .timerin { background-color: #333 !important; }')
addGlobalStyle('.timerin, .playerrating { color: #ccc; }')
