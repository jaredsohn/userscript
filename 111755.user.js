// ==UserScript==
// @name           Hackaday - Grey Theme
// @description		Grey theme for Hackaday.com. Works with their new comment styles. Based on "Hacknoblack"
// @include        http://hackaday.com/*
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

addGlobalStyle('body { background-color:whiteSmoke; color:black}');

addGlobalStyle('.entry,.statsclass1 { background-color:lightGray; color:black}');
addGlobalStyle('.entry,.statsclass2 { background-color:silver; color:black}');
addGlobalStyle('a {color:DarkSlateGray}');
addGlobalStyle('h3 {color:black}');
addGlobalStyle('#newcom {background-color:lightgray !important}');
addGlobalStyle('.depth-2 {background-color:Gainsboro !important}');


