// ==UserScript==
// @name           YouGotStreetAddress
// @include        http://yougotlistings.com/*
// @include        http://www.yougotlistings.com/*
// @include        http://perfectunits.com/*
// @include        http://www.perfectunits.com/*
// @author         KPozin
// @namespace      http://www.kpozin.net
// @version        0.1
// @description    Adds a button to listings on yougotlistings.com and perfectunit.com to view the address in Google Maps in a new tab.
// ==/UserScript==

function loadAddress()
{
	centerLocation = unsafeWindow.centerLocation;
	if (centerLocation) {
		GM_openInTab("http://maps.google.com/?q=" + centerLocation.y + "," + centerLocation.x);
	}
	else {
		var btn = document.getElementById("btnShowAddress");
		btn.innerHTML = "Location not yet loaded. Please try again";
	}
}

if(typeof(GM_openInTab)=='undefined') { GM_openInTab=function(url) { unsafeWindow.open(url,""); } }

if(typeof(unsafeWindow)=='undefined') { unsafeWindow = window; }



var centerLocation;
var markerLink = document.getElementById('markerLink');
var elem = document.createElement('button');
elem.type="button";
elem.id = "btnShowAddress";
elem.innerHTML="Show address in new window";
elem.addEventListener('click', loadAddress, true);
elem.style.margin = '1 em';
markerLink.parentNode.insertBefore(elem, markerLink.nextSibling);
