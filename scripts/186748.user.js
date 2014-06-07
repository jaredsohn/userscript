// ==UserScript==
// @name        T411 Darker Forum
// @namespace   T411DarkerForum
// @description Rend le forum plus confortable à la lecture
// @include     http://forum.t411.me/*
// @include     http://www.t411.me/forum*
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

addGlobalStyle('* { background-color: black !important; }');
addGlobalStyle('* { background: black !important; }');
addGlobalStyle('* { color: white !important; }');
addGlobalStyle('#Head {border: 1px solid white; border-radius: 8px !important;');

