// ==UserScript==
// @name           Customized It's Learning
// @namespace      DaMoggen
// @description    It's been rainbowified
// @include        https://www.itslearning.com/*
// @include        http://www.itslearning.com/*
// ==/UserScript==

var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = '#banner div{background:url(http://dl.dropbox.com/u/14605659/fuckinitslearning/banner.png) no-repeat top left;}#banner .logo{padding:12px 0 12px 18px;}body{background:url("http://dl.dropbox.com/u/14605659/fuckinitslearning/bg.png") repeat scroll 0 0 #EEE;}.logoframe center{background:transparent url(http://dl.dropbox.com/u/14605659/fuckinitslearning/brand.png) top center no-repeat;}'
document.documentElement.appendChild(styleEl);

