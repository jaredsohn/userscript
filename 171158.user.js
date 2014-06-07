// ==UserScript==
// @name        Userscripts.org - Add install icon beside script links
// @namespace   http://userscripts.org/users/23652
// @description Adds a small install icon next to any script link on Userscripts.org
// @include     http://userscripts.org/*
// @include     https://userscripts.org/*
// @exclude     http://userscripts.org/scripts/show/*
// @exclude     http://userscripts.org/scripts
// @exclude     http://userscripts.org/scripts?*
// @exclude     http://userscripts.org/home/scripts*
// @exclude     http://userscripts.org/groups/*/scripts*
// @exclude     http://userscripts.org/
// @exclude     https://userscripts.org/scripts/show/*
// @exclude     https://userscripts.org/scripts
// @exclude     https://userscripts.org/scripts?*
// @exclude     https://userscripts.org/home/scripts*
// @exclude     https://userscripts.org/groups/*/scripts*
// @exclude     https://userscripts.org/
// @resource    icon http://i.tinyuploads.com/lXmB9e.png
// @copyright   JoeSimmons
// @version     1.0.3
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require     http://usocheckup.dune.net/171158.js
// @grant       GM_getValue
// @grant       GM_log
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @grant       GM_getResourceURL
// ==/UserScript==

/* ------- CHANGELOG ----------------------------------------------------------------

1.0.3
	- changed the tooltip to be the script's name (xml request)
			It will only grab the meta.js of a script once, if needed, then store the names in about:config
			This seems like a lot of requests to USO, but it doesn't run on any script list page (/scripts, /home/scripts, /groups/x/scripts, etc),
				so it should only be requesting the info of links posted in discussions/descriptions mostly
	- changed install link to install img with "cursor: pointer"
	- added more excludes

1.0.2
	- added lots of comments
	- simplified the code a little
	- added a tooltip to the install icon
	- made it insert the new link directly before the existing link instead of
			adding it to a div and replacing the old link with the div

1.0.1
	- excluded script from main script directory (/scripts)
	- added a confirmation of installation

1.0.0
	- created

----------------------------------------------------------------------------------- */

(function name() { // anonymous function

// Make sure the page is not in a frame (return method, for anonymous function wrapper)
if(window.self !== window.top) return;

// truncate by JoeSimmons. Supply it a number to truncate, or don't, and the cutoff will be 1/4th of the string
String.prototype.truncate = function(len) {
	return ( len >= this.length ? this : (this.substring(0, (typeof len === "number" ? len : Math.floor(this.length / 4)) ) + "...") );
};

// Get the ID from a string
String.prototype.getID = function() {

	var str = this,
		$RegExp = /(install_|show\/)?(\d+)/;

	if($RegExp.test(str)) return str.match($RegExp)[2];
		else return str;

};

// Return the name of the script if cached (undefined if not cached)
// If supplied with a string, it will save that id & value
String.prototype.cache = function(name) {

	var id = this.getID(),
		obj = JSON.parse( GM_getValue("installicon_obj", "{}") );

	if(typeof name === "string") {

		obj[id] = name;

		GM_setValue("installicon_obj", JSON.stringify(obj));

		return true;

	} else {

		return obj[id];

	}

};

// function to confirm if the user really wants to install the script without reading the description
function doConfirm(e) {

	if( confirm("Installing a script without reading the description can be dangerous.\n\nAre you sure you want to install it?") ) {

		window.location.href = window.location.protocol + "//userscripts.org/scripts/source/" + e.target.id.getID() + ".user.js";

	}

}

// getParent by JoeSimmons. Returns parent node type of '1' if found, otherwise null
function getParent(e) {

	while(e = e.parentNode) {

		if(e.nodeType === 1) break;

	}

	return e;

}

function callback(res, id) {

	var rt = res.responseText,
		$RegExp = /\@name\s+([^\n]+)/,
		link = document.getElementById(id),
		scriptID = id.getID(),
		name = scriptID.cache();

	if(link !== null && $RegExp.test(rt)) {

		name = rt.match($RegExp)[1].replace(/ {2}/g, " ").trim();
		link.setAttribute("title", name.truncate(200));
		scriptID.cache(name);

	}

}



var links = document.evaluate(".//a[contains(@href, 'scripts/show/') and not(contains(., 'cancel')) and not(contains(., 'About'))]", document.body, null, 6, null),
	$RegExp = /scripts\/show\/(\d+)/i,

	// declare these variables (currently without value) to be used later
	i, link, scriptID, img, div, cache;

// loop through all the script links on the page
for(i = 0; i < links.snapshotLength; i++) {

	// set a cached variable for the original link in this loop
	link = links.snapshotItem(i);

	// make sure the link is valid before continuing
	if(!$RegExp.test(link.href)) continue;

	// get the script ID with a regular expression
	scriptID = link.href.getID();

	// check if it's cached or not
	cache = scriptID.cache();

	// create the icon to add to the anchor link element
	img = document.createElement("img");
		img.setAttribute("src", GM_getResourceURL("icon"));
		img.setAttribute("style", "cursor: pointer; font-size: 8pt; font-family: sans-serif;");
		img.setAttribute("id", "install_" + scriptID); // add the script's ID in the id attribute so it can be grabbed in the event listener
		img.setAttribute("alt", "[install]"); // add an alternate install text
		img.setAttribute("title", "Install This Script!"); // add a little hover tooltip
		img.addEventListener("click", doConfirm, false); // add the event listener

		if(cache === undefined) {

			(function(id) {

				GM_xmlhttpRequest({

					url : "http://userscripts.org/scripts/source/" + id + ".meta.js",
					method : "GET",
					onload : function(res) {

						if(res.status === 200) callback(res, "install_" + id);

					}

				});

			})(scriptID);

		} else {

			// truncate
			img.setAttribute("title", cache.truncate(200));

		}

	// insert the anchor link with icon immediately before the original link on the page
	getParent(link).insertBefore(img, link);

}



})();