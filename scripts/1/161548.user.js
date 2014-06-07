// ==UserScript==
// @name       SubtlePattern Easy Download
// @namespace  http://kennydude.me
// @version    0.1
// @description  Better download of patterns
// @match      http://subtlepatterns.com/*
// @copyright  2013 Joe Simpson
// ==/UserScript==

a = document.getElementsByClassName("download");
for(b in a){
    link = a[b];
    if(link.getAttribute != undefined){
    	link.setAttribute("href", link.getAttribute("href").replace(".zip", ".png") );
    }
}