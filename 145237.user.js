// ==UserScript==
// @name          FTN Banner Changer
// @author        rp
// @description   Changes banner on FTN
// @include       http*://feedthe.net/*
// @date          2011-10-28
// @version       0.1
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

addGlobalStyle('td.header_logo {background-image: url("http://www.pictureshack.us/images/8536_Banner_Blue_New.png"); !important;}');