// ==UserScript==
// @name          Shorten Amazon Links
// @description   Shorten all links to Amazon products and insert referral codes.
// @include       *
// @namespace      http://googlesystem.blogspot.com
// @author Sandy McArthur based on code by Gina Trapani
// @homepage http://sites.google.com/site/sandymac/amazon-referrals
// ==/UserScript==


// Set a default amazon associate id here
if (!GM_getValue("associateIDs")) {
	//var associateIDs = 'wamjr-20'; // the default id or ...
	var associateIDs = 'wamjr-20|keebz-20'; // the default id list
	
	GM_setValue("associateIDs", associateIDs);
}


// Extract Amazon Product IDs
function getASIN(href) {
	var asinMatch;
	asinMatch = href.match(/\/exec\/obidos\/ASIN\/(\w{10})/i);
	if (!asinMatch) { asinMatch = href.match(/\/gp\/product\/(\w{10})/i); }
	if (!asinMatch) { asinMatch = href.match(/\/exec\/obidos\/tg\/detail\/\-\/(\w{10})/i); }
	if (!asinMatch) { asinMatch = href.match(/\/dp\/(\w{10})/i); }
	if (!asinMatch) { return null; }
	return asinMatch[1];
}

function rewriteAnchors(links, associateIDs) {
	var asin = '';
	for (i = 0; i < links.length; i++) {
		// Current Anchor
		var href = links[i].href;
		if (href.match(/amazon\.com/i)) {
			asin = getASIN(href);
			if (asin != null) {
				// grab and cycle Associate IDs
				var associateID = associateIDs.shift();
				associateIDs.push(associateID);

				if (associateID == '') {
					links[i].setAttribute("href", "http://amazon.com/o/ASIN/" + asin );
				} else {
					links[i].setAttribute("href", "http://amazon.com/o/ASIN/" + asin + "/ref=nosim/" + associateID);
				}
			}
		}
	}
}

// Main function to rewrite amazon links
(function() {
	var allLinks = window.content.document.getElementsByTagName("a");
	var associateIDs = GM_getValue("associateIDs").split('|');

	if (associateIDs.length > 1) {
		// Add some randomness to the IDs, otherwise ref codes tend to end up in the same place every page view
		for (var i = (3 * associateIDs.length) ; i >= 0; i--) {
			associateIDs.push(associateIDs[Math.floor(Math.random() * associateIDs.length)]);
		}
	}
	
	rewriteAnchors(allLinks, associateIDs);
}
)();

// Interface to set Associate ID
function setAssociateID(){
	var associateIDs = prompt('Set your friends Amazon Associate ID(s), eg: "amazonid-20" \nor "amazonid-20|userid-20" for a list of ids', GM_getValue("associateIDs"));
	if (associateIDs) {
		GM_setValue('associateIDs', associateIDs );
		window.location.href = window.location.href; //refresh page if changed
	}
}

GM_registerMenuCommand('Set Amazon Associate ID, eg: userid-20', setAssociateID);