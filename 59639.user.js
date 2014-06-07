// ==UserScript==
// @name           swfCabin flash url
// @namespace      0
// @include        http://www.swfcabin.com/open/*
// ==/UserScript==

var input=document.getElementById('swf');
var text=document.getElementById('viewdetails-left');
var t=text.innerHTML;
input=input.src;
text.innerHTML=t+'<p>Flash url: '+input+'</p>';
text.style.width='465px';