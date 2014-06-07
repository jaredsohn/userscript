// ==UserScript==
// @name           photoSIG KillFile
// @namespace      http://www.photosig.com
// @description    Implements kill file functionality for the photoSIG web page
// @include        http://www.photosig.com/*
// ==/UserScript==


// --------------------------------------------------------------------
// photoSIG KillFile
// Version 0.2
// Copyright (C) 2009 Ole Overgaard
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// //
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.8 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "photoSIG Killfile", and click Uninstall.
//
// --------------------------------------------------------------------

/*
This is a kill file script. The script maintains a persistent kill file
list for photoSIG that can be personalized by you, the script user.

The unkilled users will have a green thumb next to their name, the killed
users will have a red thumb next to their name.

Clicking the thumbs will allow you to add or remove a user from the kill list.


This script is presented as is with no warrantee or nothing. Modify it if you
want. If you want to report a bug, if you extend it to add new web logs, or
just make some cool modifications, send me a photosig message at oleDK/ole

Revision History
Version		Date		Author			Comments
==================================================================
0.1			20090214	Ole Overgaard	Initial version. Adapted from Killfile by Daniel Martin 
										(http://userscripts.org/scripts/show/4107) and 
										from PhotoSIG Friend or Foe by severance/James.
0.2			20090215	Ole Overgaard	General clean up. Changed neutral icon to mr.nobody.

*/


var KF_NAME = "photoSIGKillFile";				// Firefox about:config variable that holds the kill file
var KF_DELIMITER = "@@";
var KF_NONE = "http://c2.wikicdn.com/i/user_none_sm.jpg"; 			// Mr. Nobody
var KF_DOWN = "http://www.photosig.com/images/down-q-light.gif";	// Thumbs down gif

// This is the main function that adds thumbs to the page.
function adjust() {
	var idMatcher = /\/go\/users\/view\?id=\d*/i;	//match a link to a user
	var nameMatcher = /(About )?(.*)/i;							//Match the user's name
	var curKF = getKillArray();
	
	// Treat all links
	var userLinks = document.evaluate('//a',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var currentLink = null, i = 0; (currentLink = userLinks.snapshotItem(i)); i++)
	{
		if ((idMatcher.exec(currentLink)) != null) { 
			// This link leads to a user
			
			userName = getUserName(currentLink.text)
		
			// Search for this user in the kill file
			var killMe = false; //user shouldn't be killed by default.
			for(var j=0; j<curKF.length; j++) {
				if(curKF[j] == userName) {  //found in kill list
					killMe = true;
					break;
				}
			}
			
			// Now create the mr.None or TD image
			// Create a new link that will contain both the old link (the user name) and the image
			var alink = document.createElement("a");
			alink.href = currentLink.href;
			alink.textContent = currentLink.textContent;
			
			// Crete the image
			var img = document.createElement("img");
			img.src = killMe? KF_DOWN: KF_NONE;
			img.alt = userName
			img.border = 0;
			img.width = 14;
			img.height = 16;
			alink.appendChild(img);
			
			//Exchange the old link with the new link
			var span = document.createElement("span");
			span.appendChild(alink);
			currentLink.parentNode.replaceChild(span, currentLink);
			span.normalize();
		}	
	}
};

// This function listens for clicks on Mr.Nobody or TD, and
// decides if the user should be asked to add or remove 
// the person to the killfile.
document.addEventListener('click', function(event) {
	var clickTarget = unescape(event.target);

 	var userName = getUserName(event.target.alt);
	var lMrNoneMatch = /.*user_none_sm.jpg$/;  
	var lDownMatch = /.*down-q-light.gif$/i; 
	
	var match = lMrNoneMatch.exec(event.target.src);
	if(match != null) {
		// Clicked Mr.None
		if (userName != null) {
			if(confirm('Add "' + userName + '" to your kill file?')) {
				addToKillFile(userName);
				window.location.reload()
				event.stopPropagation();
				event.preventDefault();	
			}
		}
	} else { 
		match = lDownMatch.exec(event.target.src);
		if(match != null) {
			// Clicked down-thumbs
			if (userName != null) {
				if(confirm('Remove "' + userName + '" from your kill file?')) {
					removeFromKillFile(userName);
					window.location.reload()
					event.stopPropagation();
					event.preventDefault();
				}
			}
		}
	}
}, true);


//Checks if the text is a user name. Returns the userName or Null.
function getUserName(text) {
	var result;
	var result2;
	var nameMatcher = /(About )?(.*)\/(.*)/i;	//Match the user's name
	result = nameMatcher.exec(text);
	if (result == null) {
		result2 = null;
	}
	else {
		result2 = result[2] + '/' + result[3];
	}
	return result2;
}


//returns an array of names on the kill list.
function getKillArray() {
	if(GM_getValue(KF_NAME, "") == "") {
		return new Array();
	} else {
		return GM_getValue(KF_NAME, "").split(KF_DELIMITER);
	}
}

// Adds the specified name to the kill file.
function addToKillFile(name) {
	var curKF = getKillArray();
	for(var i=0; i<curKF.length; i++) {
		if(name == curKF[i]) return; // already in killfile
	}
	curKF.push(name);
	GM_setValue(KF_NAME, curKF.join(KF_DELIMITER));
}

// Removes the specified name from the kill file.
function removeFromKillFile(name) {
	var curKF = getKillArray();
	var newKF = new Array();
	for(var i=0; i<curKF.length; i++) {
		if(curKF[i] != name)
			newKF.push(curKF[i]);
	}
	GM_setValue(KF_NAME, newKF.join(KF_DELIMITER));
}	
	
// This one starts it all
window.onload = adjust();

