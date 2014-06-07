// ==UserScript==
// @name           no NatsuLiphone link
// @namespace      http://twitter.com/rokudenashi
// @description    remove from link
// @include        http://twitter.com/*
// ==/UserScript==

document.body.innerHTML=document.body.innerHTML.replace(/http:\/\/iphone.natsulion.org\//g,'#')
