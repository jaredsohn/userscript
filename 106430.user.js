// ==UserScript==
// @name	Google+ Nastaleeq
// @namespace   http://blog.muhasab.info
// @description	Gmail  Nastaleeq font style for Urdu Community.
// @author	Fakhar e Naveed
// @homepage    http://www.pakgalaxy.com
// @include	http://gmail.com/*
// @include	https://gmail.com/*
// ==/UserScript==

function UrduStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

UrduStyle('body {font: 18px "Alvi Lahori Nastaleeq","Jameel Noori Nastaleeq",Tahoma;} .a-f-i {font-size: 16px; line-height: 1.4;} .a-Lc-Sr{font-size: 13px;} .a-la-h {font-size: 15px;} .tk3N6e-e {font-size: 15px;} .a-j-K-Oce8ee {line-height: 13px;} .a-f-i-sb-e {vertical-align: middle;} .ea-S-R {font-size: 16px;} .n {font-size: 16px} .ea-S-qg{margin-top: 10px;} .a-j-xa-wa {font-size: 14px;} .a-j-Zc-e-ua {font-size: 16px;} .a-kh-fs-Hc-R {font-size: 16px; font-weight: normal;} .a-j-lc-Rd-R {font-size: 15px;}');

