// ==UserScript==
// @name        Tumblr Never Hide Video Divs
// @namespace   JeffersonScher
// @include     http*://www.tumblr.com/*
// @description Works around the problem of Youtube videos stopping and restarting as you scroll certain Tumblr pages
// @version     0.1
// @grant none
// ==/UserScript==

var s=document.createElement("style"); 
s.type="text/css"; 
s.appendChild(document.createTextNode("li.post_container > div.post_full.is_video {display:block !important;}")); 
document.body.appendChild(s);