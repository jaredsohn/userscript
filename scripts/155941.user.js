// ==UserScript==
// @name        Dragon Warriors Wiki
// @namespace   http://userscripts.org/users/500597
// @description Removes ads from Dragon Warriors Wiki pages
// @include     http://dragonwarriors.wetpaint.com/
// @include     http://dragonwarriors.wetpaint.com/*
// @version     1
// @grant	none
// ==/UserScript==

var div1=document.getElementById("adsTop");
var div2=document.getElementById("promotedFooter");
var class1=document.getElementsByClassName("ads adscontent");
var class2=document.getElementsByClassName("ads adsleft");

if (div1) {
	div1.style.display="none";
}

if (div2) {
	div2.style.display="none";
}

if (class1[0]) {
	class1[0].style.display="none";
}

if (class2[0]) {
	class2[0].style.display="none";
}