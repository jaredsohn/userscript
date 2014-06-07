// ==UserScript==
// @name        No More Hidden Flash Objects
// @namespace   No More Hidden Flash Objects
// @description No More Hidden Flash Objects
// @include     http://*.4chan.org/*

// @include     http://*.brchan.org/*
// @version     1.0
// @grant       none
// ==/UserScript==

var embedArray = document.getElementsByTagName("embed");
for (var i=0; i<embedArray.length; i++) {
	if(embedArray[i].style.width<=100){
 		embedArray[i].src = "none";
	}
}
var embedArrayJ = document.getElementsByTagName("movie");
for (var j=0; i<embedArrayJ.length; j++) {
	if(embedArrayJ[j].style.width<=100){
 		embedArrayJ[j].value = "none";
	}
}