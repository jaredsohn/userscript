// ==UserScript==
// @name          FTN Banner Changer
// @author        rp
// @description   Changes banner on FTN
// @include       http*://feedthe.net/*
// @date          2011-11-28
// @version       1.0
// ==/UserScript==

function addGlobalStyle(css) {
   var head, style;
   head = document.getElementsByTagName('head')[0];
   if (!head) { return; }
   style = document.createElement('style');
   style.type = 'text/css';
   style.innerHTML = css;
   head.appendChild(style);
}

addGlobalStyle('td.header_logo {background-image: url("http://i.imgur.com/vQnIy.gif"); !important;}');