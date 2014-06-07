// ==UserScript==
// @name		Hyves.nl Link Fixer
// @version		1.0
// @description	Replaces all links to Hyves.nl with a link to the site on Archive.org
// @include     *
// @grant		none
// @namespace	http://hyves.nl/
// ==/UserScript==

var hyves_domain	= "hyves.nl";
var hyves_working	= false;


// Need to be a browser addon to get something like this working.
// This will fix problems with outgoing links on Facebook, Google, Twitter, etc.
// Where they link to a self-hosted URL that redirects to the intended one.

// Redirection if they wind up on Hyves via a redirect
//host = window.location.hostname;
//if(host.indexOf(hyves_domain, host.length - hyves_domain.length) !== -1) {
//    window.location.replace("https://web.archive.org/web/*/" + window.location.href);
//}

// Iterate through all links on the page and any that are on the hyves domain are
// updated to point the the wayback.
function hyves_fix_links() {
	hyves_working = true;
	var links = document.getElementsByTagName("a");
	for (var i=0; i<links.length; i++) {
		host = links[i].hostname;
		if(host.indexOf(hyves_domain, host.length - hyves_domain.length) !== -1) {
			links[i].href = "https://web.archive.org/web/*/" + links[i].href;
		}
	}
	hyves_working = false;
}

function submod_listener() {
	if(!hyves_working) { // Stop the script triggering itself
		fix_links();
	}
}

function domready_listener() {
	hyves_fix_links();
	// Add a listener that will check for links again when the DOM changes.
	// Untested.
	document.body.addEventListener("DOMSubtreeModified", submod_listener, false);
}

domready_listener();