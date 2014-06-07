// ==UserScript==
// @name          Demonoid Ad Remover
// @description	  Hides those pesky Demonoid ads.  Does not require adblock.
// @include       http://www.demonoid.com/*
// @include       http://demonoid.com/*
// ==/UserScript==

// function from http://diveintogreasemonkey.org/patterns/add-css.html
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// removes Demonoid ads as of 2006.08.03
addGlobalStyle('td.banner_top, td.banner_bottom, td.pad9px_right { display: none; }');