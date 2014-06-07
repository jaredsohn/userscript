// ==UserScript==
// @name           Gumtree Sponsored Links Remover
// @namespace      All
// @description    Remove Sponsored Links / Ads from Gumtree
// @include        http://*.gumtree.co.za/*   
// ==/UserScript==

function main() { 	
	if (document.getElementById("topAdSense")){
		document.getElementById("topAdSense").innerHTML="";
	}
	if (document.getElementById("bottomAdSense")){
		document.getElementById("bottomAdSense").innerHTML="";
	}
	if (document.getElementById("googsense")){
		document.getElementById("googsense").innerHTML=""
	}
} 
 
main();