// ==UserScript==
// @name           GoogleStyleGoogleMusic
// @namespace      arne.wendt@tuhh
// @include        http://music.google.com/*
// ==/UserScript==


window.addEventListener('load', 
function() { 

	document.styleSheets[3].cssRules[12].style.cssText="#CCCCCC";
	document.styleSheets[3].cssRules[12].style.font="13px/27px Arial,sans-serif";
	document.styleSheets[3].cssRules[11].style.textDecoration="none";
	document.styleSheets[3].cssRules[17].style.paddingTop="0px";
	
	
	document.getElementsByTagName("body")[0].style.backgroundImage="none";
	document.getElementById("oneGoogleWrapper").style.backgroundColor="#2D2D2D";
	document.getElementById("insideBox").style.background="none";
	document.getElementById("coloredBar").style.backgroundColor="#55B7C8";
	document.getElementById("search-button").parentNode.style.backgroundImage="none";
	document.getElementById("header").getElementsByTagName("div")[4].style.visibility="hidden";
	document.getElementById("search-button").parentNode.style.outline="solid 1px #BBBBBB";
	document.getElementById("uploading_indicator").hidden="true";
	document.getElementById("headerBar").style.paddingTop="6px";
	
	document.styleSheets[0].cssRules[88].style.color="#CCCCCC";
	document.styleSheets[0].cssRules[88].style.font="13px/27px Arial,sans-serif";
	document.styleSheets[0].cssRules[88].style.textDecoration="none";

	    
}, true);
    
