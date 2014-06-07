// ==UserScript==
// @name           Facebook Couchsurfers Finder
// @namespace      marclucchini
// @description    Find couchsurfers among your Facebook's friends or your Facebook's friends' friends
// @include        http://www.facebook.com/*sk=friends
// ==/UserScript==

/* TODO
 * P1: auto-load friends' list completely programmatically
 * P2: search names with and without accents
 * P2: sort friends' list based on couches found
*/

// Globals
var friendsSearched = 0;

// Entry point
document.addEventListener("load", createButton, true);
function createButton() {
	document.removeEventListener("load", createButton, true);
	var searchBoxes = document.evaluate('//div[@class=\'listView clearfix normal\']', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (searchBoxes.snapshotLength > 0) {
		var searchBoxNode = searchBoxes.snapshotItem(0);
		var newNode = document.createElement("div");
		newNode.setAttribute("align", "center");
		searchBoxNode.parentNode.insertBefore(newNode, searchBoxNode).innerHTML = 
			'<a id="couchsurfersearch" href="javascript:void(0)" title="Who is a couchsurfer? Note: you may have to scroll down first to load your friends list completely."><img id="couchsurfersearchimage" src="http://www.couchsurfing.org/images/icon_couch_maybe.gif" border="0" width="35" height="35"/></a>';
		newNode.addEventListener("click", search, false);
	}
}

// Proper search
function search() {
	var searchImage = document.getElementById("couchsurfersearchimage");
	var oldPath = searchImage.getAttribute("src");
	var newPath = "http://marclucchini.free.fr/userscripts/loading.gif";
	searchImage.setAttribute("src", newPath);

	var friends = document.evaluate('/html/body/div[4]/div[3]/div/div[2]/div[3]/div/div/div/div/div/div[3]/div/div/div[2]/div/ul/li/div/div/div/a', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	friendsSearched = friends.snapshotLength;
	for (i = 0; i < friends.snapshotLength; i++) {
		var anchor = friends.snapshotItem(i);
		var friendName = anchor.innerHTML;
		(function(tag, name) {
			GM_xmlhttpRequest({
				method: 'get',
				headers: {'Accept': 'application/json', 'User-agent': 'Mozilla/4.0 (compatible)'},
				url: 'http://www.couchsurfing.org/surfpoints.html?type=surfers&SEARCH[name]=' + name,
				onload: function(responseDetails) {
					if (--friendsSearched == 0)
						searchImage.setAttribute("src", oldPath);
					if (responseDetails.status == 200) {
						var json = responseDetails.responseText;
						if (json.length > 0) {
							GM_log("A couchsurfer named " + name + " has been found: " + json);
							var response = JSON.parse(json);
							if (response != null) {
								/* {"1234567":{"-123456":{"l":"City","c":"Country","u":[{"u":"id","n":"name","g":"gender","a":28,"c":4,"i":"couch.jpg"}]}}} */
								for (property1 in response) {
									for (property2 in response[property1]) {
										var user = response[property1][property2]["u"][0];
										if (user != null) {
											var userId = user["u"];
											var userName = user["n"];
											var userAge = user["a"];
											var userCountry = response[property1][property2]["c"];
											var userCity = response[property1][property2]["l"];
											var userCouch = user["c"];
											var userCouchType = "yes";
											if (userCouch == 1)
												userCouchType = "travel";
											else if (userCouch == 2)
												userCouchType = "day";
											else if (userCouch == 3)
												userCouchType = "maybe";
											else if (userCouch == 4)
												userCouchType = "yes";
											else if (usercouch == 5)
												userCouchType = "def";
											
											// Display friend's couch
											var newNode = document.createElement("div");
											newNode.setAttribute("align", "right");
											tag.appendChild(newNode, tag).innerHTML = 
												'<a class="couchsurfer" href="http://www.couchsurfing.org/profile.html?id=' + userId +
												'" title="' + userName + ', ' + userAge + ', ' + userCountry + ' (' + userCity + ')">' +
												'<img src="http://www.couchsurfing.org/images/icon_couch_' + userCouchType + '.gif" border="0" width="25" height="25"/>' +
												'</a>';
										}
									}
								}
							}
						} else
							GM_log("No couchsurfer named " + name + " found.");
					}
				}
			});
		}(anchor, friendName));
	}
}
