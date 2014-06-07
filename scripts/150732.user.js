// ==UserScript==
// @name        PubJVC
// @namespace   041
// @description pub
// @include     http://www.jeuxvideo.com/*
// @version     1
// ==/UserScript==
var tb=document.getElementById("banner_jv");
var newElem = document.createElement('br');
tb.parentNode.replaceChild(newElem,tb);