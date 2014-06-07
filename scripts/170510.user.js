// ==UserScript==
// @name        bc.vc author links skipper
// @description Automatically bypass the links in the form of bc.vc/author_id/url_to_redirect_to
// @include     *bc.vc*
// @version     1.0
// @grant none
// ==/UserScript==

splitPath = window.location.pathname.split("/"); // Get the path of the website
if (splitPath instanceof Array && !isNaN(splitPath[1])) { // If we don't have an ad id (number and letters) but a user id (only numbers)
	splitPath.splice(0,2); // Remove anything that is not the URL (blank + userid)
	targetURL = splitPath.join("/"); // Rebuild the target URL
	document.location.href = targetURL; // Redirect to the link
}
