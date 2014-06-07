// ==UserScript==
// @name           newscientist anti please register nag
// @namespace      ns
// @include        http://www.newscientist.com*
// ==/UserScript==

function hide(){
	if(document.getElementById("haasOverlay") == null || document.getElementById("fadeBackground") == null)
	{
		setTimeout(hide, 500);
		return;
	}
	document.getElementById("haasOverlay").style.visibility = "hidden";
	document.getElementById("fadeBackground").style.visibility = "hidden";
	
}
setTimeout(hide, 500);
