// ==UserScript==
// @name           freeads distance thingy
// @namespace      freeads
// @description    Add a map link to an person's profile
// @include        http://*.freeads.co.uk/uk/*
// ==/UserScript==
//
// Copyright (c) 2007, Matthew Botos (http://matthewbotos.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// adapted to freeads.co.uk by some other clunge
//
// ================
//
// This is a Greasemonkey user script: http://greasemonkey.mozdev.org/
// To use it, install Greasemonkey, restart Firefox, revisit this script, and click on install.
//
// ================

//GM_log("Started");

// change to your starting address or zip code
var startAddress = "";

//var titles = document.getElementsByTagName("h1");
var titles = document.getElementsByClassName("blackText adLocation");


for (i = 0; titles.length > i; i++) {
	var address = titles[i].innerHTML.split(";")[1];

	//GM_log(title.innerHTML)
	//GM_log(start + "-" + end + ": " + address);

	var link = "<a target='_blank' href='http://maps.google.com/maps?f=d&hl=en&saddr=" +
	    encodeURIComponent(startAddress) + "&daddr=" +
	    encodeURIComponent(address) + "'>" + address +',uk</a>';
		
	var embed = 'http://maps.google.com/maps?f=d&hl=en&saddr=' +
	    encodeURIComponent(startAddress) + "&daddr=" +
	    encodeURIComponent(address) + "'>" + address +',uk</a>';

	//GM_log(link);

	/*var div = document.createElement("div");
	div.className = 'movie';
	div.classID = 'movie';
	div.innerHTML = '<iframe src='+link+'></iframe>'; 	
	*/
	titles[i].innerHTML = titles[i].innerHTML.replace(address, link);
	
	

	//GM_log("Completed");
}
address = document.getElementsByClassName("rgt")[0].children[0].innerHTML

var link = "<a target='_blank' href='http://maps.google.com/maps?f=d&hl=en&saddr=" +
	encodeURIComponent(startAddress) + "&daddr=" +
	encodeURIComponent(address) + "'>" + address +',uk</a>';
	
document.getElementsByClassName("rgt")[0].innerHTML = link; //document.getElementsByClassName("rgt")[0].innerHTML.replace(address, "kekjem");

