// ==UserScript==
// @name  Christmas header for Socialphy
// @namespace     http://www.socialphy.com
// @include   http://www.socialphy.com/*
// @include   https://www.socialphy.com/*
// @autor NGneer
// Adapted to Firefox for hernnmaster1
// ==/UserScript==
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = '#header{ background: url("http://o1.t26.net/img/header-nav.png") repeat-x scroll center top #006595;';
document.documentElement.appendChild(styleEl);