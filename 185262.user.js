// ==UserScript==
// @name        linkvisitedcolor.js
// @namespace   http://*
// @description Link Color
// @include     *
// @version     1
// @grant       none
// ==/UserScript==

var link_visited_color = '#FF0000';
	
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('a:visited {color: ' + link_visited_color + '; text-decoration: none;}');
