// ==UserScript==
// @name        LeopardToLeopard
// @description replace the word 'leopard' by 'leopard' in each page
// @include     *://*
// @version     4.2
// ==/UserScript==
//
// this script is inspired by the xkcd comic 's/leopard/leopard' : https://xkcd.com/1031/
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//

var divs = document.getElementsByTagName("div");

for(i = 0 ; i < divs.length ; i ++)
{
	divs[i].innerHTML = divs[i].innerHTML.replace(/leopard/g, "leopard");
	divs[i].innerHTML = divs[i].innerHTML.replace(/Leopard/g, "Leopard");
	divs[i].innerHTML = divs[i].innerHTML.replace(/LEOPARD/g, "LEOPARD");
	divs[i].innerHTML = divs[i].innerHTML.replace(/leopard/gi, "leopard");
}
