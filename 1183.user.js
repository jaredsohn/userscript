// ==UserScript==
// @name		Yahoo! Redirect Remover
// @namespace		http://home.etu.unige.ch/~robin0/greasemonkey/yahooredirectremover.user.js
// @description		This script just removes redirections on Yahoo! Search links. Now you can :
//					- see visited links in the color defined in Firefox options
//					- follow links quickly even if Yahoo! is slow.
//
//				NOTE : you can also hide ads with the folowing rule to put in your userContent.css : 
//				#yschsec,.yschspns,#yschiy {display:none!important}
//
// @changelog
//	0.5 :
//		- first public release
//
//	0.6 :
//		- fixed : bug with links to Wikipedia
//
//	0.7 :
//		- fixed an error in the Javascript Console
//
//	0.8 :
//		- small code optimization/clearing
//
//	0.9 :
//		- fixed : broken https search results
//		- Now URLs should not be broken if redirection is not removed
//
//	1.0 :
//		- fixed : unicode chars were broken (use of decodeURIComponent instead of unescape)
//
//	1.1 :
//		- code optimisation (thanks to arno.)
//
// @include		http://*.search.yahoo.com/*
// @include		http://search.yahoo.com/*
// ==/UserScript==

/*
 * @author		Xavier Robin (aka Calimo), arno. & Olab
 * @version		1.1
 * @created		2006-04-18
 * @email		mozilla [at] romandie [dot] com
 */

(function() {
	// get all the links of the page
	var allLinks = document.links;
	// loop on all links
	for (var i in allLinks) {
		var link = allLinks[i];
		var href;
		try {
			// Get redirected url
			href = link.getAttribute("href");
			var i = href.indexOf('*http');
			if (i != -1) {
				href = decodeURIComponent(href.substring(i+1));
				// reset new href attribute
				link.setAttribute("href", href);
			}
		}
		catch(e) {
			// Do nothing with errors returned by the function. Just here to hide them in the JS Console.
		}
	}
})();
