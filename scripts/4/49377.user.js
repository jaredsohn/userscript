// ==UserScript==
// @name           Images Fit The Browser
// @namespace      http://userscripts.org/users/23652
// @description    Prevents images from being larger than the window so they can be seen in full
// @include        http://*
// @include        https://*
// @include        file:*
// @copyright      JoeSimmons
// @version        1.0.0
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

function resize() {
if(!(head=document.getElementsByTagName('head')[0])) {return;}
var max = 'img {max-height:'+Math.floor(window.innerHeight/1.1)+'px !important;max-width:'+Math.floor(window.innerWidth/1.1)+'px !important;}';
if(!(max_img_height=document.getElementById('max_img_height'))) {
var style = document.createElement('style');
style.type = 'text/css';
style.id = 'max_img_height';
head.appendChild(style).innerHTML = max;
} else {max_img_height.innerHTML = max;}
}

resize();
window.addEventListener('resize', resize, false);