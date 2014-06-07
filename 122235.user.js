// ==UserScript==
// @name           	Adf.ly Skipper
// @version        	0.1.2
// @namespace      	adflySkipper
// @description    	Auto skip Adf.ly Ads
// @include        	http://adf.ly/*
// @include        	http://9.bb/*
// @include        	http://u.bb/*
// @icon 			http://adf.ly/favicon.ico
//
// 0.1.2 ---------
//	*FIX* - Fix for bypassing the new locked page.
// ==/UserScript==

var loaded = false;
var loadTimeout;

loadTimeout=setTimeout(main,2000);
window.addEventListener('load', main, false);

function main(){
	if(/locked/.test(window.location))
	{
		window.location = window.location.replace("/locked/", "/");
	}
	else if(!loaded){
		clearTimeout(loadTimeout);
		loaded=true;
		if(/countdown/.test(document.head.innerHTML)){
			document.title = 'Skipping ADF.LY Ads...';
			document.body.innerHTML = '<center><h1 id="info">Looking for link...</h1></center>';
			SkipWait();
		}
	}
}

function SkipWait(){
	var Sm = /(?:http|https):\/\/.+?(?=';)/;
	var match = document.head.innerHTML.match(Sm);
	document.getElementById('info').innerHTML = 'Your <a id="link">link</a> is loading...';
	document.getElementById('link').href = match;
	window.location.href = match;
}