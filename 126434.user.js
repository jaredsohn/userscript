// ==UserScript==
// @name          Facebook Colour
// @namespace     http://h4ckcod3r.in/userscripts
// @description	  changes facebook colour
// @include       https://www.facebook.com/*
// @include       https://facebook.com/*
// @include       http://www.facebook.com/*
// @include       http://facebook.com/*
// ==/UserScript==

if(typeof(Storage)!=="undefined")
{
	if(!sessionStorage.fbcolour)
	{
		var fbcol=prompt('Enter required colour in HTML format. (E.g.: red, blue, green, #869CB2 etc. Any input other than this will be ignored');
		sessionStorage.fbcolour=fbcol;
	}
}
else
{
	alert("Your browser doesn't support web storage. Your default colour will be red");
	sessionStorage.fbcolour="red";
}
var x=document.getElementsByTagName("a");
for(i=0;i<x.length;i++)
x[i].style.color=sessionStorage.fbcolour;
void 0;