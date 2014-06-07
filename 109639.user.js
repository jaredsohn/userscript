// ==UserScript==
// @name          Bing: Replace Hotmail with Gmail
// @include       http://*bing.com/*
// ==/UserScript==

// for Zheitk

// for start page:
var aa=document.getElementsByClassName("sc_hl1")[0].childNodes[2].childNodes[0];
aa.href="http://mail.google.com/";
aa.innerHTML="Gmail"; 

// for search pages:
var bb=document.getElementsByClassName("sw_tm")[0].childNodes[2].childNodes[0];
bb.href="http://mail.google.com/";
bb.innerHTML="Gmail"; 