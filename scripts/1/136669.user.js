// ==UserScript==
// @name        thepiratebay.se Uncensor
// @namespace   http://thepiratebay.se
// @description Deblocker for thepiratebay.se
// @include     http://thepiratebay.se/*
// @version     20130322
// ==/UserScript==

if (window.top.location!=document.URL){
 return;
 }

piratebay = location.href.replace(/http:\/\/thepiratebay\.se/g, ''); 
proxy = "http://pirateshit.com"+piratebay;
location.href = proxy;
	
