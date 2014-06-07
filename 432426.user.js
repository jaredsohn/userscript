// ==UserScript==
// @name        Manga Stream remove ad banners
// @namespace   http://userscripts.org/users/200448
// @description Removes and collapses right side ad on MangaStream, readms.com
// @include     http://readms.com/*
// @version     1
// @grant       none
// ==/UserScript==

var el = document.getElementById('reader-sky');
var parent = el.parentNode;
parent.removeChild(el);
parent.children[0].style.marginRight = "1em";
parent.children[0].style.marginLeft = "1em";