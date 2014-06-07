//-*-coding:utf-8-*-
//vim: set enc=utf8:
// ==UserScript==
// @name          The Channelguide Script
// @namespace     http://www.pvv.org/~alexanro/
// @description   Provides links directly to the RSS-feeds at Participatory Culture's otherwise nice channelguide
// @include       https://channelguide.participatoryculture.org/?q=viewchannel/*
// @license       GPL 2
// @version       0.2
// @author        Alexander Rødseth
// ==/UserScript==

// Constants
const NOT_FOUND = -1;

function main() {
	// Variables
	var lst_links = document.getElementsByTagName("a");
	var int_links = lst_links.length;
	var str_longurl = "";
	var str_url = "";

	// Find the long RSS-url
	for (i=0; i < int_links; i++) {
		if (lst_links[i].name != "") {
			str_longurl = lst_links[i].name;
			break;
		}
	}

	// Find the RSS-url that we're looking for
	if (str_longurl.match("suburl=").length == 1) {
		str_url = str_longurl.split("suburl=")[1];
	}

	// Show the URL, or alert the user
	if (str_url != "") {
		// Find the right place to insert the link
		var lst_div = document.getElementsByTagName("div");
		var int_div = lst_div.length;
		var elm_div = NOT_FOUND;
		for (i=0; i < int_div; i++) {
			if (lst_div[i].className == "channel-right") {
				elm_div = lst_div[i];
				break;
			}
		}
		// Insert the link, if we found the right place
		if (elm_div != NOT_FOUND) {
			// 1 is the <p>-tag-number you wish to insert the RSS-link before
			var elm_p = elm_div.getElementsByTagName("p")[1];
			var elm_my = document.createElement("p");
			elm_my.innerHTML = '<strong>RSS</strong>: <a href="' + str_url + '">' + str_url + '</a>';
			elm_div.insertBefore(elm_my, elm_p);
		} else {
			alert("Unable to insert the link into the page. The RSS-link is:" + str_url);
		}
	} else {
		alert("The Channelguide Script: Unable to fetch RSS-link :-(");
	}
}

main();
