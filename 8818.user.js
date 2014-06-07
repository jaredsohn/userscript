// ==UserScript==
// @name           eHarmony Map Link
// @namespace      eharmony
// @description    Add a map link to an person's profile
// @include        http://*.eharmony.com/singles/servlet/user/comm*
// ==/UserScript==
//
// Copyright (c) 2007, Matthew Botos (http://matthewbotos.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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

var titles = document.getElementsByTagName("h1");

if (titles.length > 0) {
	var title = titles[0];
	var start = title.innerHTML.indexOf("(") + 1;
	var end = title.innerHTML.indexOf(")");
	var address = title.innerHTML.substring(start, end);

	//GM_log(title.innerHTML)
	//GM_log(start + "-" + end + ": " + address);

	var link = "<a target='_blank' href='http://maps.google.com/maps?f=d&hl=en&saddr=" +
	    encodeURIComponent(startAddress) + "&daddr=" +
	    encodeURIComponent(address) + "'>" + address +'</a>';

	//GM_log(link);

	title.innerHTML = title.innerHTML.replace(address, link);

	//GM_log("Completed");
}
