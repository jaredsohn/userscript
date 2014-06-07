// ==UserScript==
// @name        mangareader zoom in as default
// @namespace   http://userscripts.org/users/200448
// @description Zooms in on manga pages by default at mangareader.net
// @include     http://www.mangareader.net/*
// @version     3
// @grant       none
// ==/UserScript==

document.getElementById('img').removeAttribute('width');
document.getElementById('img').removeAttribute('height');
document.getElementById('img').style.marginRight = "3em";
function scrollRight() {
    window.scrollBy(window.scrollMaxX, 0);
}
scrollRight();

document.onload = scrollRight;
window.onload = scrollRight;