// ==UserScript==
// @name           ebayredirect
// @namespace      uider
// @include http://ebay.com/*
// @include http://www.ebay.com/*
// @include http://*.ebay.com/*
// ==/UserScript==
var mikesBigAForHisUserScript;
var waitTime = 15000; //Microseconds
var redirectPage = "http://google.com/";
function load() {
	mikesBigAForHisUserScript = setInterval("var c = confirm(\"You should be doing work!\");	if(c) {		alert(\"Good now get working!\");		window.location.replace(\""+redirectPage+"\");	}else{		alert(\"LIAR LIAR PANTS ON FIRE!\");	}",waitTime);
	
}
window.addEventListener("load",load,false);