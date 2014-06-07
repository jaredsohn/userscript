// ==UserScript==
// @name           Telugu Newspaper Font Helper for Firefox 3.5 and above
// @namespace      http://userscripts.org/users/786
// @description    Telugu Font helper for Andhra Jyothi, Eenadu, Sakshi, Vaartha Newspapers
// @include        http://www.vaarttha.com/*
// @include 	   http://www.sakshi.com/*
// @include	   http://www.andhrajyothy.com/*
// @include 	   http://www.eenadu.net/*
// ==VersionControl==
// Version 1.0 - 12/19/2009
// ==/VersionControl==
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

addGlobalStyle('@font-face { font-family: "Shree-0908W"; src: url(http://www.sakshi.com/fonts/SW908.TTF) format("truetype") } \n' +
'@font-face { font-family : "vaartha"; src: url(http://www.vaarttha.com/font/vaartha.ttf) format("truetype") } \n' +
'@font-face { font-family: "eenadu"; src: url(http://eenadu.net/eenadu.ttf) format("truetype") } \n' +
'@font-face { font-family: "SHREE-TEL-0900"; src: url(http://www.andhrajyothy.com/fonts/SHREE900.TTF) format("truetype") } \n' +
'body {font-family:  SHREE-TEL-0900,Shree-0908W, vaartha, eenadu;}');