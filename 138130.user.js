// ==UserScript==
// @name r/circlebroke logo switch
// @include	   http://www.reddit.com/r/circlebroke/*
// ==/UserScript==

document.getElementById('header-img').src = "";
document.getElementById('header-img').setAttribute("class", "default-header");