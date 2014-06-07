// ==UserScript==
// @name        Cacher pub xooit
// @namespace   vic511
// @description Cache la pub surgissant à gauche des forums xooit
// @include     http*://*.xooit.*/*
// @include     http*://*.leforum.*/*
// @grant	none
// @version     1
// ==/UserScript==
function hidePub(){
	if(document.getElementById("clickInTexSlideDiv"))
		document.getElementById("clickInTexSlideDiv").style.display = "none";
	else
		setTimeout(hidePub, 1000);
}
hidePub();