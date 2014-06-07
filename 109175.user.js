// ==UserScript==
// @name          Github Pull Request Numbers
// @namespace     http://www.arcaner.com/pullRequestNumbers
// @description   Puts github pull request numbers in front of their descriptions for easier identification
// @match      	  http://*.github.com/*/pulls
// @match      	  http://*.github.com/*/pulls/*
// @match         https://*.github.com/*/pulls
// @match         https://*.github.com/*/pulls/*
// @version       1.1
// @grant         none
// ==/UserScript==

function addNumberToListings(listings)
{
	var listingDivs = listings.getElementsByClassName("list-browser-item");
	for (var i = 0; i < listingDivs.length; i++) {
		var listingDiv = listingDivs[i];
		var listingH3s = listingDiv.getElementsByTagName("h3");
		if (listingH3s.length == 0) {
			// No title H3 found, skip
			continue;
		}

		var listingTitle = listingH3s[0];
		var a = listingTitle.getElementsByTagName("a");
		if (a.length == 0) {
			// No link found, skip
			continue;
		}

		var listingLink = a[0];
		var href = listingLink.getAttribute("href");
		var hasSpan = listingLink.getElementsByTagName("span");
		if (hasSpan.length > 0) {
			// Skip this entry if we already added a # to it
			continue;
		}

		var matches = /pull\/(\d+)/g.exec(href);
		if (matches) {
			var number = matches[1];
			var prNumberSpan = document.createElement("span");
			prNumberSpan.setAttribute("style", "color: #4183C4");
			var prNumber = document.createTextNode("[#" + number + "]  ");
			prNumberSpan.appendChild(prNumber);

			listingLink.insertBefore(prNumberSpan, listingLink.firstChild);
		} else {
			console.log("no match on pull URL: ", href, /pull\/(\d+)/g.exec(href));
		}
	}
}

var listings;
function subTreeListener(e)
{
	listings.removeEventListener("DOMSubtreeModified", subTreeListener);
	addNumberToListings(listings);
	listings.addEventListener("DOMSubtreeModified", subTreeListener);
}

var listingsEls = document.getElementsByClassName("pulls-list");
if (listingsEls.length == 1) {
	listings = listingsEls[0];
	addNumberToListings(listings);
	listings.addEventListener("DOMSubtreeModified", subTreeListener);
}
