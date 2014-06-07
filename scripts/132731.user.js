// ==UserScript==
// @name          bing! ZippCast links
// @include       http://*bing.com/*
// ==/UserScript==

// for Zheitk

// for start page:
var aa=document.getElementsByClassName("sc_hl1")[0].childNodes[2].childNodes[0];
aa.href="http://www.zippcast.com/";
aa.innerHTML="ZippCast"; 

// for search pages:
var bb=document.getElementsByClassName("sw_tm")[0].childNodes[2].childNodes[0];
bb.href="http://www.zippcast.com/";
bb.innerHTML="ZippCast";