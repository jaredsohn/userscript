// ==UserScript==
// @name           Test Script
// @namespace      testScript by Arketypos
// @description    Just for testing
// @include        http://*.astroempires.com/*
// ==/UserScript==

//makes sure site is current astroempires, then creates link
if ((document.location.href.match(/astroempires/))) {	

	var seperator = " - "

	var aelem = document.createElement('a');
 	aelem.setAttribute("id",'MordorLink1');
    aelem.innerHTML = "Mordor Link 1";
    aelem.addEventListener("click", NameOfFunctionA, true);
	
	var sep1 = document.createElement("span");
	sep1.innerHTML = seperator;
	
	var belem = document.createElement('a');
 	belem.setAttribute("id",'MordorLink2');
    belem.innerHTML = "Mordor Link 2";
	belem.addEventListener("click", NameOfFunctionB, true);
	
	var logoutLink = document.evaluate("//a[contains(.,'Logout')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	logoutLink.parentNode.appendChild(document.createElement("br"));
	logoutLink.parentNode.appendChild(document.createElement("br"));
	
	logoutLink.parentNode.appendChild(aelem);
	logoutLink.parentNode.appendChild(sep1);
	logoutLink.parentNode.appendChild(belem);
	
}

function NameOfFunctionA() {

	alert('Just called this function A');	
	
}

function NameOfFunctionB() {

	alert('Just called this function B');	
	
}
