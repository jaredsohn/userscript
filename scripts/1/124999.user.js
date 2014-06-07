// ==UserScript==
// @name           Destroy The USA 
// @description    Auto countdown script for Destroy The USA.  It reloads the option selected when the countdown hits zero
// @namespace      TachisAlopex
// @include        http://www.destroytheusa.com/index.php?*
// ==/UserScript==
var time;

function countDown()
{
	document.getElementsByTagName("center")[8].innerHTML="You cannot play for another "+ time-- + " seconds";
	if(time<0) {
		document.location.reload()
	}
}

str=document.getElementsByTagName("center")[8].innerHTML;

if(document.getElementsByTagName("center")[8].innerHTML.indexOf("You cannot play for another ", 0) === 0) {
	time=str.substring(28,str.indexOf("seconds",0)-1)-1;
	setInterval(function() {countDown(); }, 1000);
}