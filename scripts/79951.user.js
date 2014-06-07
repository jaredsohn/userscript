// ==UserScript==
// @name	PtP - Friend box
// @author	Minigeek
// @namespace http://userscripts.org/scripts/show/79951
// @include	http://*passthepopcorn.me/index.php
// @include	https://*passthepopcorn.me/index.php
// @version	1.00
// @date	2010-06-22
// ==/UserScript==



// user customization settings //
var check_interval = 900000;	//amount of time to wait before checking for new upload comments
				// keep to above 5 minutes to reduce load on the server
				// 900k = 15 min, 600k = 10 min, 300k = 5 min
var showNotes = true;
var showTransfered = false;
var showRatios = true;

// user customization settings //

// please do not edit below this line //

var fullActiveURL = document.URL;
var site_base_url = document.URL.match(/^(https:\/\/passthepopcorn\.me|http:\/\/passthepopcorn\.me)/)[1];
var pos_start
var pos_stop
var account_id
var username
var ids
var ids_list = "";
var usernames
var usernames_list = "";
var notes = "";
var notes_list = "";
var ratios
var ratios_list = "";
var transfereds = "";
var transfereds_list = "";
var lastChecked  
var matches
var matchesb
var html
var current = new Date()
ids = GM_getValue("ids", "");
usernames = GM_getValue("usernames", "");
notes = GM_getValue("notes", "");
ratios = GM_getValue("ratios", "");
transfereds = GM_getValue("transfereds", "");
lastChecked = GM_getValue("lastChecked", "1");

/* parse out account id */
pos_start = document.body.innerHTML.indexOf("user\.php\?action=edit\&amp;userid=") + 32;
pos_stop = document.body.innerHTML.indexOf("\"", pos_start);
account_id = document.body.innerHTML.substring(pos_start, pos_stop);

/* parse out username */
pos_start = document.body.innerHTML.indexOf("\"username") + 11;
pos_stop = document.body.innerHTML.indexOf("\<", pos_start);
username = document.body.innerHTML.substring(pos_start, pos_stop);


/* to change the "check" interval, please adjust the value at the top of this script */

if ( !lastChecked || (current.getTime() - lastChecked) > check_interval ) {
	GM_setValue("lastChecked", String(current.getTime()));

	// check for new friends 
	GM_xmlhttpRequest({
		method: 'GET',
		url: site_base_url + '/friends.php',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			if ( responseDetails.status == "200" ) {
				ids = "";
				ids_list = "";
				usernames = "";
				usernames_list = "";
				notes = "";
				notes_list = "";
				ratios = "";
				ratios_list = "";
				transfereds = "";
				transfereds_list = "";

				matches = responseDetails.responseText.match(/id=[0-9]{1,}/gi);
				if ( matches != null ) {
					for (i = 0; i < matches.length; i++) {
						matches[i] = matches[i].replace("id=", "");
						if ( matches[i] != account_id ) {
							ids_list += matches[i] + ",";
						}
					}
					ids = ids_list.substring(0, ids_list.length - 1);
					GM_setValue("ids", ids);
				}


				//Parse Usernames
				matches = responseDetails.responseText.match(/id=[0-9]{1,}.>.+<.+[(].+[)]/gi);
				if ( matches != null ) {
					for (i = 0; i < matches.length; i++) {
						matches[i] = matches[i].replace(/id=[0-9]{1,}.>/, "");
						matches[i] = matches[i].match(/^[a-zA-Z0-9]+/i);
						if ( matches[i] != username ) {
							usernames_list += matches[i] + ",";
						}
					}
					usernames = usernames_list.substring(0, usernames_list.length - 1);
					GM_setValue("usernames", usernames);
				}

				//Parse Notes
				matches = responseDetails.responseText.match(/<textarea.+/gi);
				if ( matches != null ) {
					for (i = 0; i < matches.length; i++) {
						matches[i] = matches[i].replace(/<.+?>/, "");
						notes_list += matches[i] + ",";
					}
					notes_list = notes_list.replace(/,,/, ",xxx,");
					notes = notes_list.substring(0, notes_list.length - 1);
					GM_setValue("notes", notes);
				}


				//Parse Ratio info
				matches = responseDetails.responseText.match(/Ratio: <strong><span class=\"r\d+\">(\d+\.\d+|∞)<\/span>/gi);
				if ( matches != null ) {
					for (i = 0; i < matches.length; i++) {
						matches[i] = matches[i].replace("Ratio: <strong>", "");
						ratios_list += matches[i] + ",";
					}
					ratios = ratios_list.substring(0, ratios_list.length - 1);
					GM_setValue("ratios", ratios);
				}

				//Parse upload/download info
				matches = responseDetails.responseText.match(/Up: <strong>\d+\.\d+ [A-Z]B/gi);
				matchesb = responseDetails.responseText.match(/Down: <strong>\d+\.\d+ [A-Z]*B/gi);
				if ( matches != null ) {
					for (i = 0; i < matches.length; i++) {
						matches[i] = matches[i].replace("Up: <strong>", "U: ");
						matchesb[i] = matchesb[i].replace("Down: <strong>", "D: ");
						transfereds_list += matches[i] + " " +  matchesb[i] + ",";
					}
					transfereds = transfereds_list.substring(0, transfereds_list.length - 1);
					GM_setValue("transfereds", transfereds);
				}
			}
		}
	});
}


// Create the box to add
var main = document.createElement("div");

main.id = "freind";
main.className = "box";

var innerDiv = document.createElement("div");
innerDiv.className = "head colhead_dark";
innerDiv.innerHTML = "<strong>Friends</strong>";


var list = document.createElement("ul");
list.className = "stats nobullet";

if ( ids != "" ) {
	ids_list = ids.split(",");
	usernames_list = usernames.split(",");
	ratios_list = ratios.split(",");
	transfereds_list = transfereds.split(",");
	notes_list = notes.split(",")
}


for (i = 0; i < ids_list.length; i++) {

	html = "<li><a href=\"user\.php?id=" + ids_list[i] + "\">" + usernames_list[i] + "</a>";

	if (showNotes && notes_list[i].length != 11)  html += " (" + notes_list[i] + ") ";

	html += "<span style=\"float:right;\">";

	if (showTransfered) html += transfereds_list[i];
	if (showRatios) html += " R: " + ratios_list[i];
	
	list.innerHTML += html + "</span></li>";
}

main.appendChild(innerDiv);
main.appendChild(list);



// insert the box
var recommendations = document.getElementById("recommended")

recommendations.parentNode.insertBefore( main, recommendations );