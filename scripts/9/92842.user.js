// CGEnhance userscript
// version 0.9.1, 20110502

// ==UserScript==
// @name          CGEnhance
// @namespace     http://joisey.net/projects/greasemonkey/
// @description   Script to add missing functionality to Cinemageddon pages
// @include       http://cinemageddon.net/
// @include       http://cinemageddon.net/*
// @include       http://*.cinemageddon.net/
// @include       http://*.cinemageddon.net/*
// ==/UserScript==

// config vars: random link
var min_torrent_id = 11;  // as of 20110503; set to -1 to check dynamically (not really necessary, and increases server load)
var random_page_attempts = 50;
var hide_native_links = 1; // hide native links - remove "Random" links that CG has added since this script debuted

// "random" link, under "torrents" sidebar

var progress_indicator_data = "data:image/gif;base64,R0lGODlhCgAKAKEDAMzMzP9mZv8AAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAQADACwAAAAACgAKAAACF5wnchaBCgBzJ65r7I16dZxJlWiV4rgUACH5BAUBAAMALAEAAAAIAAMAAAIKnBM2AIMjBFNQFAAh+QQFAQADACwEAAAABgAGAAACDASGYxOR7J4cQrxaAAAh+QQFAQADACwHAAEAAwAIAAACCgRmoxoxvYQYchQAIfkEBQEAAwAsBAAEAAYABgAAAgycB3CouxGGEANKegoAIfkEBQEAAwAsAQAHAAgAAwAAAgqUhgNgE6FAeqkAACH5BAUBAAMALAAABAAGAAYAAAIKlIZjyRzhIABsFgAh+QQBAQADACwAAAEAAwAIAAACCpxkOBPBvhYAYxYAOw%3D%3D";

function get_random_torrent_details() {
	_get_random_torrent("details.php");
}

function get_random_torrent_download() {
	_get_random_torrent("download.php");
}

function _get_random_torrent(req_page) {
	var progress_indicator = document.getElementById("progress_indicator_img");
	progress_indicator.setAttribute("style", "visibility:visible;");

	// we presuppose Firefox due to greasemonkey ;)
	var xmlhttp = new XMLHttpRequest();
	var response_txt;

	//min id currently 11, max id currently 101932; 66198 torrents exist (20110503)

	if (min_torrent_id == -1) {
		//get current min torrent id
		xmlhttp.open("GET", "./browse.php?orderby=id&dir=ASC", false);
		xmlhttp.send(null);

		if (xmlhttp.status == 200) {
			try {
				response_txt = xmlhttp.responseText.match(/href\=\"details\.php\?id\=\d+/g)[12]; //yes, hard-coding is bad
				min_torrent_id = parseInt(response_txt.substr(response_txt.lastIndexOf("=") + 1));
			}
			catch(e) { alert("Error reading the \"min ID\" response: " + e.toString()); }
		}
		else { alert("There was a problem retrieving the \"min ID\" data:\n" + xmlhttp.statusText); }
	}

	//get current max torrent id
	xmlhttp.open("GET", "./browse.php?orderby=id&dir=DESC", false);
	xmlhttp.send(null);

	if (xmlhttp.status == 200) {
		try {
			response_txt = xmlhttp.responseText.match(/href\=\"details\.php\?id\=\d+/g)[12]; //yes, hard-coding is bad
			max_torrent_id = parseInt(response_txt.substr(response_txt.lastIndexOf("=") + 1));
		}
		catch(e) { alert("Error reading the \"max ID\" response: " + e.toString()); }
	}
	else { alert("There was a problem retrieving the \"max ID\" data:\n" + xmlhttp.statusText); }

	//make sure we don't try the same ID more than once
	var rand_torrent_id, attempted_ids = [-1];
	//time-out after x attempts
	for (var i=0; i < random_page_attempts; i++) {
		do {
			rand_torrent_id = Math.floor((max_torrent_id - (min_torrent_id - 1)) * Math.random()) + min_torrent_id;
		} while (attempted_ids.indexOf(rand_torrent_id) != -1)
		attempted_ids.push(rand_torrent_id);

		xmlhttp.open("GET", "./details.php?id=" + rand_torrent_id, false);
		xmlhttp.send(null);

		if (xmlhttp.status == 200) {
			try {
				if(xmlhttp.responseText.match(/No torrent with ID\./) == null) {
					var torrent_name = new String(xmlhttp.responseText.match(/\<td class=\"colhead\" colspan=\"2\" style=\"padding\:\d+px\;\"\>.+\n\<\/td\>/));
					torrent_name = torrent_name.substring(torrent_name.indexOf(">")+1, torrent_name.lastIndexOf("</")-1);
					window.location = "./" + req_page + "?id=" + rand_torrent_id + "&name=" + encodeURIComponent(torrent_name);
					break;
				}
			}
			catch(e) { alert("Error reading the \"ID test\" response: " + e.toString()); }
		}
		else { alert("There was a problem retrieving the \"ID test\" data:\n" + xmlhttp.statusText); }
	}
	progress_indicator.setAttribute("style", "visibility:hidden;");
}

if (hide_native_links) {
	// hide native CG links
	var native_random_link = document.evaluate("//a[contains(@href,'details.php')][text()='Random']", document,
		null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (native_random_link) {
		// what follows is ugly, but for whatever reason the folks at CG don't place items that *should* be in a table, *actually* in a table
		// c'est la vie

		// remove native elements (working sdrawkcab)
		native_random_link.parentNode.removeChild(native_random_link.nextSibling.nextSibling.nextSibling);	// line break
		native_random_link.parentNode.removeChild(native_random_link.nextSibling.nextSibling);			// download (image) link
		native_random_link.parentNode.removeChild(native_random_link.nextSibling);				// text (whitespace) between links
		native_random_link.parentNode.removeChild(native_random_link);						// "Random" link
	}
}

if (document.getElementById("random_torrent") == null) {
	var random_torrent_details = document.createElement("a");
	random_torrent_details.setAttribute("id", "random_torrent");
	random_torrent_details.setAttribute("href", "#");
	random_torrent_details.setAttribute("title", "View a random torrent.");
	random_torrent_details.innerHTML = "Random";
	random_torrent_details.addEventListener("click", get_random_torrent_details, true);

	var random_link_spacerA = document.createElement("span");
	random_link_spacerA.innerHTML = "&nbsp;";

	var random_torrent_dl = document.createElement("a");
	random_torrent_dl.setAttribute("href", "#");
	random_torrent_dl.setAttribute("title", "Download a random torrent.");
	random_torrent_dl.addEventListener("click", get_random_torrent_download, true);

	var random_torrent_dl_img = document.createElement("img");
	random_torrent_dl_img.setAttribute ("src", "http://cinemageddon.net/pic/download.gif");
	random_torrent_dl.appendChild(random_torrent_dl_img);

	var random_link_spacerB = document.createElement("span");
	random_link_spacerB.innerHTML = "&nbsp;&nbsp;";

	var progress_indicator_element = document.createElement("img");
	progress_indicator_element.setAttribute("id", "progress_indicator_img");
	progress_indicator_element.setAttribute("style", "visibility:hidden;");
	progress_indicator_element.src = progress_indicator_data;

	var request_link_element = document.evaluate("//a[contains(@href,'viewrequests.php')]", document,
		null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	request_link_element.parentNode.appendChild(random_torrent_details);
	request_link_element.parentNode.appendChild(random_link_spacerA);
	request_link_element.parentNode.appendChild(random_torrent_dl);
	request_link_element.parentNode.appendChild(random_link_spacerB);
	request_link_element.parentNode.appendChild(progress_indicator_element);
}
