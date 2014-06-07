// ==UserScript==
// @name           Yelp Google Mapper
// @namespace      http://axisofevil.net/~xtina/
// @description    Adds link on Yelp map pages to go to Google Maps proper.
// @include        http://yelp.com/map/*
// @include        http://*.yelp.com/map/*
// ==/UserScript==

// Get the info block.
var bizInfo = document.getElementById("startBizInfo");

// Get and replacinate the company name.
var compName = bizInfo.childNodes[1].childNodes[0].innerHTML;
var searchString = compName.replace(/ /g, "+") + '+near+';

var compAddress = bizInfo.childNodes[7].innerHTML;

// "trim" for poor folk.
for (var x = 0; x < compAddress.length; x++) {
	if (compAddress.charCodeAt(x) > 10) {
		searchString += compAddress.substr(x, 1);
	}
}

searchString = "http://maps.google.com/maps?q=" + searchString.replace(/ /g, "+");

// Make the new link.
var newLink = document.createElement("a");
newLink.setAttribute("href", searchString);
newLink.setAttribute("target", "_blank");
newLink.appendChild(document.createTextNode("Go to Google Maps"));

// New line, then thing.
bizInfo.appendChild(document.createElement("br"));
bizInfo.appendChild(newLink);
