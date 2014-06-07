// ==UserScript==
// @name          Netload JXS
// @version       1.0
// @namespace     http://userscripts.org/users/jaxo
// @description   Auto-redirect, bypass countdown
// @include       http://www.netload.in/*
// @include       http://netload.in/*
// ==/UserScript==


// Automatically redirect to the captcha page

var e = document.getElementsByTagName("a")[1];
if (e && e.href.indexOf("&captcha=1")+1)
   location.href = e.href;

// Bypass the countdowns

if (e = document.getElementById("downloadDiv")){
   e.style.display = "inline";
   document.getElementById("changeDiv").style.display = "none";
}