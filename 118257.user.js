// ==UserScript==
// @name           Better Portal Design
// @namespace      DaMoggen
// @description    Changes Portalen
// @include        http://portal.hedmark.org/*
// @include        https://portal.hedmark.org/*
// ==/UserScript==

var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = 'body{background:url("http://dl.dropbox.com/u/14605659/fuckinitslearning/hfkbackground.png") repeat scroll 0 0 #000;}td.menu-login-head{background:url("http://dl.dropbox.com/u/14605659/fuckinitslearning/menutop.png");}td.menu-login{border-color: rgb(127,2,32);background-color: rgb(240,216,216);}'
document.documentElement.appendChild(styleEl);