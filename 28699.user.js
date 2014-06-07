// ==UserScript==
// @name          P2P Links
// @namespace     http://userscripts.org/scripts/show/28699
// @description   Activates all P2P (eMule / BitTorrent) links on the page at the user command
// @include       *
// @grant         GM_registerMenuCommand
// @grant         GM_openInTab
// @updateURL     https://userscripts.org/scripts/source/28699.meta.js
// @version       2012.9.22
// ==/UserScript==

// The script is wrapped in an anonymous function
(function() {

// Removes duplicates entries from an array
Array.prototype.removeDuplicates = function() {
	// Iterates through all the elements of the array but the last one
	for (var i = 0; i < this.length - 1; i++) {
		// Iterates through all the following elements of the array
		for (var f = i + 1; f < this.length; f++) {
			if (this[i] == this[f]) this.splice(f, 1); // If a duplicate entry is found, delete it
		}
	}
};

// Returns an array of all the eMule URLs from the passed arrayLinks
function getAlleMuleLinks(arrayLinks) {
	return arrayLinks.filter(function(sURL) {return (sURL.substr(0, 7).toLowerCase() == "ed2k://");});
}

// Returns an array of all the BitTorrent URLs from the passed arrayLinks
function getAllBTLinks(arrayLinks) {

	// Generic BT support
	var arrayBTLinks = arrayLinks.filter(function(sURL) {return (sURL.substr(-8).toLowerCase() == ".torrent");});

	// Support for notable websites with indirect links to torrent files
	var siteHost = window.location.protocol + "//" + window.location.host;
	var arraySpecialBTLinks = [];
	switch(window.location.hostname) {

		case "www.mininova.org":

			// Mininova support: href = "http://www.mininova.org/get/[torrentId]"

			// Gets an array with all the links that match the pattern
			arraySpecialBTLinks = arrayLinks.filter(function(sURL) {return /^http:\/\/www\.mininova\.org\/get\/\d+$/i.test(sURL);});

			break;

		case "isohunt.com":

			// Isohunt support: href (search page, to torrent page) = "http[s]://isohunt.com/torrent_details/[torrentId]/[search terms]?tab=summary"
			//                  href (download URL) = "http[s]://isohunt.com/download/[torrentId]/"

			// Gets an array with all the links that match the pattern
			arrayLinks.forEach(function(sURL) {
				var BTPageMatch = sURL.match(/^https?:\/\/isohunt\.com\/torrent_details\/(\d+)\//i);
				if (BTPageMatch !== null) arraySpecialBTLinks.push(siteHost + "/download/" + BTPageMatch[1] + "/");
			});

			break;

		case "www.demonoid.me":

			// Demonoid support: href = "http://www.demonoid.me/files/download/(HTTP/)[Number]/[torrentId](/)"

			// Gets an array with all the links that match the pattern
			arraySpecialBTLinks = arrayLinks.filter(function(sURL) {return /^http:\/\/www\.demonoid\.me\/files\/download\/(?:HTTP\/)?\d+\/\d+(?:\/)?$/i.test(sURL);});

			break;

		case "www.nyaa.eu":

			// NyaaTorrents support: href = "http://www.nyaa.eu/?page=download&tid=[torrentId]"

			// Gets an array with all the links that match the pattern
			arraySpecialBTLinks = arrayLinks.filter(function(sURL) {return /^http:\/\/www\.nyaa\.eu\/\?page=download&tid=\d+$/i.test(sURL);});

			break;

	}

	arrayBTLinks = arrayBTLinks.concat(arraySpecialBTLinks);

	return arrayBTLinks;

}

// Replaces the current url with newUrl, activating the ED2K links
function urlReplace(newUrl) {
	window.location.replace(newUrl);
}

// Filters the passed nodes. It will return true if the node is in the selection
function isSelected(node) {
	return window.getSelection().containsNode(node, true);
}

// Search for all the ED2K links (linkType 1) or links to torrent files (linkType 2) and activates them (a new tab will be opened with each BitTorrent link)
// If onlySelected is true, only the links in the selection will be evaluated
// The urlReplace function won't work with BitTorrent links because the download of the torrent file isn't instantaneous, so it will only load the last torrent
function clickLinks(linkType, onlySelected) {

	// Gets an array of all the documents links, filters it to eliminate non-selected ones (if onlySelected is true) and then extracts its hrefs
	var arrayLinks = [];
	Array.forEach(document.links, function(node) {
		if ((onlySelected) && (!isSelected(node))) return;
		arrayLinks.push(node.href);
	});

	// Filters the links array to get the eMule/BitTorrent ones and removes duplicates
	var arrayLinks = (linkType == 1) ? getAlleMuleLinks(arrayLinks) : getAllBTLinks(arrayLinks);
	arrayLinks.removeDuplicates();

	// Activates each link
	arrayLinks.forEach((linkType == 1) ? urlReplace : GM_openInTab);

}

// Registers the click all / click selected P2P links commands
GM_registerMenuCommand("Activate all eMule links", function() {clickLinks(1, false);}, null, null, "E");
GM_registerMenuCommand("Activate all BitTorrent links", function() {clickLinks(2, false);}, null, null, "B");
GM_registerMenuCommand("Activate all eMule links in the selection", function() {clickLinks(1, true);}, null, null, "M");
GM_registerMenuCommand("Activate all BitTorrent links in the selection", function() {clickLinks(2, true);}, null, null, "T");

})();