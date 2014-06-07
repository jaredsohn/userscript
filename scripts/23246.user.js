// ==UserScript==
// @author		  Dave Sohigian
// @name          Google ByCylce
// @description   Adds a ByCycle.org link to google maps
// @include       http://maps.google.com/*
// Adapted by Dave Sohigian, http://www.sohigian.com/?q=/contact
// Licensed under the GNU General Public License (GPL)
//
// Version 0.1  - 25th, Februrary, 2008
//
// Hey, it only works in Portland, OR right now. If you are from Milwaukee (the other place that works on bycycle.org)
// then it will need to be modified. Contact me at http://www.sohigian.com/?q=/contact if you have a gripe.

if (
document.documentElement.tagName == "HTML"
&& document.contentType == "text/html"
&& document.body    // Basic sanity
) {
   run();
}

function getUrl() {
	//This function create the full URL for the bycycle.org site.
	//if we are on a google maps directions page we should have the "d_daddr" element
	if (document.getElementById('d_daddr')){
		//Build the URL required by ByCycle.org
		getUrl = "http://www.bycycle.org/regions/portlandor/routes;find?s="
		//Start Address (this value comes directly from the input field in google maps)
		getUrl += escape(document.getElementById('d_d').value);
		getUrl += "&e=";
		//End Address
		getUrl += escape(document.getElementById('d_daddr').value);
		getUrl += "&pref=default";
		return getUrl;
	}

 }

function createLink (a) {
	// This function defines the parameters of the link
	a.setAttribute('href',getUrl());
	a.setAttribute('title',"Get directions by bycycle.org");
	a.setAttribute('target',"_blank");
	a.style.fontWeight = 'bold';
	return a;
}


function run () {
	//create the link element
	var a = document.createElement('a');
	//find the "print" link on the Google page where we will insert the new link
	var node = document.getElementById('print');
	// HTML for the link
	a.innerHTML = '<a href="#">Go ByCycle</a>';
	//create the link (mainly grabbing the "from" and "to" parameters and encoding
	a = createLink(a);
	//insert the link
	node.parentNode.insertBefore(a, node);
	return;
}

