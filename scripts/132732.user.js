// ==UserScript==
// @name          Bing video to YouTube
// @include       http://*bing.com/*
// ==/UserScript==

// for Zheitk

// for start page:
var aa=document.getElementsByClassName("sc_hl1")[0].childNodes[2].childNodes[0];
aa.href="https://www.youtube.com/";
aa.innerHTML="YouTube"; 

// for search pages:
var bb=document.getElementsByClassName("sw_tm")[0].childNodes[2].childNodes[0];
bb.href="https://www.youtube.com/results?search_query=";
bb.innerHTML="YouTube";