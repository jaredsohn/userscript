
// GeoTag 23hq with Google Maps URL
// version 0.2 BETA!
// 2007-08-20
// Copyright (c) 2007, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "23hq", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          GeoTag 23hq
// @namespace     http://www.entropoli.it/grease/
// @description   Trasform geotag
// @include       http://*23hq.com*
// ==/UserScript==

	

	var tagInput = document.getElementById("tagInput");
	var navbar, newElement;	
	
	navbar = document.getElementById('addTagForm');
	var notDone = true;

// add a listener to tagInput, if value contains google.com so enable button
//var myRegExp = /google/;
//var matchPos1 = tagInput.value.search(myRegExp);
//if(matchPos1 != -1)
	
tagInput.addEventListener("click", checkURL, true);
tagInput.addEventListener("blur", checkURL, true);
tagInput.addEventListener("keyup", checkURL, true);

function checkURL(){
	if (tagInput.value.substring(0,4)=='http' && notDone ) {
		notDone = false;
		var newElement = document.createElement('BUTTON');
		newElement.appendChild(document.createTextNode("get GeoTags by Gmaps"));
		newElement.addEventListener("click", function trasformTag(){
			var primoSplit = tagInput.value.split("ll=");
			var elementiPrimoSplit = primoSplit.length;
			var latLongArray = primoSplit[elementiPrimoSplit-1].split("spn=")[0].split(",");
		
			//var latLongArray = tagInput.value.split("sll=")[1].split("&sspn=")[0].split(",");
			//tagInput.value = "geo:lat="+latLongArray[0]+",geo:long="+latLongArray[1];
			tagInput.value = "geo:lat="+latLongArray[0]+",geo:long="+latLongArray[1].split("&")[0];
			
		}, true);
		
 	 tagInput.parentNode.parentNode.appendChild(newElement);
 	 
	}
}

