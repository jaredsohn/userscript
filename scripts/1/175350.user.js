// ==UserScript==
// @name       Google Play Music All Access Reveal
// @include    https://play.google.com/music/listen*
// @description Show music that are only accessible because of all access
// @version 0.2
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

addGlobalStyle('.song-row:not([data-id*="-"]) td:first-child {padding-left:2px; border-left:solid 2px #fb8521}');
addGlobalStyle('.card[data-type="sal"] {border-bottom:solid 2px #fb8521}');