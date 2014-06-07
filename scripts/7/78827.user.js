// ==UserScript==
// @name           Travian 3 - LineUp "Links"
// @namespace      seveq
// @description    Moves the "Links" table of Travian 3 to the right of the villages list
// @version        1.0.0.2
// @include        http://*.travian*.*/*.php*
// ==/UserScript==

function moveLinks()
{
	var linkTableDiv = document.createElement("div");
	linkTableDiv.id = "ltDiv";
	linkTableDiv.style.display="inline";
	linkTableDiv.style.cssFloat="left";
	
	var vllgTableDiv = document.createElement("div");
	vllgTableDiv.id = "vlDiv";
	vllgTableDiv.style.display="inline";
	vllgTableDiv.style.cssFloat="left";
	
	var vlist = document.getElementById("vlist");
	var llist = document.getElementById("llist");
	
	llist.style.marginTop = "0px";
	
	vlist.parentNode.replaceChild(vllgTableDiv, vlist);
	vllgTableDiv.appendChild(vlist);
	
	llist.parentNode.replaceChild(linkTableDiv, llist);
	linkTableDiv.appendChild(llist);
}

function svqFunctionMain()
{
	moveLinks();
}

window.addEventListener('load', svqFunctionMain, false);
