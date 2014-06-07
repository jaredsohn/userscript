// ==UserScript==
// @name        Google search, wider result divs, no url tracking
// @namespace   http://localhost:9314
// @include     http://www.google.com.ar/search?*
// @include     https://www.google.com.ar/search?*
// @include        http://*.google.*
// @include        http://google.*
// @include        https://*.google.*
// @include        https://google.*
// @include        http://*.google.tld/*
// @include        https://*.google.tld/*
// @include        http://google.tld/*
// @include        https://google.tld/*
// @include        *://*.google.com/search*
// @include        *://*.google.com.*/search*
// @grant          none
// @version     1
// ==/UserScript==

var allLink  = document.querySelectorAll(".g .rc .r a");
var len = allLink.length,link;
for(var i=0;i<len;i++){
    link = allLink[i];
    //link.target="_blank";
    link.removeAttribute("onmousedown");
}


var divs  = document.querySelectorAll(".g .rc .r");
len = divs.length;
for(var i=0;i<len;i++){
    div = divs[i];
    div.style.width="1000px";
}


divs  = document.querySelectorAll("div .s");
len = divs.length;
for(var i=0;i<len;i++){
    div = divs[i];
    div.children[0].style.width="700px";
}