// ==UserScript==
// @name OpenGoogleSearchInNewTab
// @namespace http://jiazhoulvke.com
// @description OpenGoogleSearchInNewTab
// @include https://encrypted.google.com/*
// @include http://www.google.com/*
// @include http://www.google.com.hk/*
// @include http://google.com/*
// @include http://google.com.hk/*
// ==/UserScript==

var gsr=document.getElementById(“ires”);
var linkArray=gsr.getElementsByTagName(“A”);
for (i=0;i<linkArray.length;i++) {
linkArray[i].target=“_blank”;
}