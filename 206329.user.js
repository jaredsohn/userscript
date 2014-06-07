// ==UserScript==
// @name        Remove Recommended Channels Youtube
// @namespace   jmnetwork.ch
// @include     *.youtube.com/*
// @version     1
// @grant       none
// ==/UserScript==

var css = document.createElement('style');
css.type = 'text/css';
css.innerHTML = 'div.branded-page-related-channels.branded-page-box {display: none;}';
document.getElementsByTagName('head') [0].appendChild(css);
