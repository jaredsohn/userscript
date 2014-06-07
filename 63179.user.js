// ==UserScript==
// @name           norma4 news killer
// @namespace      norma
// @description    news killer
// @include        http://forum.norma4.net.ua/*
// ==/UserScript==

var newsBlock = document.getElementById('rnb_verh');
if(newsBlock) newsBlock.innerHTML = "";