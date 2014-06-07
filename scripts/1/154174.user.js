// ==UserScript==
// @name           chess.com - customization
// @namespace      http://userscripts.org
// @description    This script will customize your experience.
// @include        http://www.chess.com/*
// ==/UserScript==
// source help = http://greasemonkey.win-start.de/patterns/add-css.html

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// CHANGE NAV MENU COLOR
addGlobalStyle('ul#nav { background: #5CAE46; ! important; }');

// REMOVE (L) MENU BORDER
addGlobalStyle('ul#nav > li div.play { border: none ! important; box-shadow: none !important; left: 4px ! important; }');

// ADD NAV MENU PADDING
addGlobalStyle('ul#nav > li > a { padding-top: 5px ! important; }');

// CHANGE ALERT BG COLOR
addGlobalStyle('.notice.success { background: #5CAE46 ! important; }');