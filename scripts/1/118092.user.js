// ==UserScript==
// @name          Facepunch HTML5 Video Reset
// @version       1.0
// @description   
// @match         http://www.facepunch.com/threads/*
// ==/UserScript==

var Videos = document.querySelectorAll("video");

for (var i = 0; i < Videos.length; i++) {
	
	Videos[i].autoplay = false;
	Videos[i].loop = false;
	Videos[i].controls = true;
	Videos[i].setAttribute("onplay", "");
	Videos[i].setAttribute("onmouseover", "");
	Videos[i].setAttribute("onmouseout", "");
	Videos[i].setAttribute("onclick", "");
	
}