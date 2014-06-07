// ==UserScript==
// @name           Pinboard Hide Bookmark Descriptions
// @description    A basic CSS modification that will hide bookmark descriptions
// @lastupdated    2011-1-9
// @namespace      CLkfT5ntJY
// @version        1.0
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @compatibility  Firefox 3.5
// @include        http://pinboard.in/*
// @include        https://pinboard.in/*
// @include        http://www.pinboard.in/*
// @include        https://www.pinboard.in/*
// ==/UserScript==

// Borrowed from http://diveintogreasemonkey.org/ - Thanks Mark
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.description {display:none;}');
