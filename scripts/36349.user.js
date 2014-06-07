// ==UserScript==
// @name           Hide Facebook Ads
// @description    Hides all ads on Facebook
// @namespace      http://userscripts.org/users/71106
// @include        http://*.facebook.com/*
// @include        http://*.facebook.com/*#/*
// @include        http://*.facebook.com/*#/*#/*
// @copyright      Tristian Flanagan
// ==/UserScript==

var t;
var n = 0;

function doubleCheckAds(){ 
	var f = document.evaluate("//div[@class='adcolumn']",document,null,9,null).singleNodeValue;
	f.style.display = "none";
	n = n + 1;
	if(n==10){
		clearTimeout(t);
	}
}

function hideAds(){ 
	var f = document.evaluate("//div[@class='adcolumn']",document,null,9,null).singleNodeValue;
	f.style.display = "none";
	t = setTimeout("doubleCheckAds()", 1000);
}

window.addEventListener('load', hideAds, false);