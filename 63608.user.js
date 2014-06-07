// ==UserScript==
// @name           RuneScape Scrollbar Remover
// @namespace      rssr
// @description    Remove the scrollbar in the RuneScape game window.
// @include        http://*world*.runescape.com/*
// @include        http://*runescape.com/game.ws*
// ==/UserScript==
var apa = "1";
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('body')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#gameframe{ overflow:hidden !important;margin: 0;padding:0;position:relative;width: 100%;height: 100%;}');
