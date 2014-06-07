// ==UserScript==
// @name		Copernic Redirect Remover
// @namespace		http://home.etu.unige.ch/~robin0/greasemonkey/copernicredirectremover.user.js
// @description		This script just removes redirections on Copernic links. Based on Yahoo! Redirect Remover
//					Now you can :
//					- follow links quickly even if Copernic is slow.
//					- define user style to force visited link to appear in another color
//
// @changelog
//	1.0 :
//		- first public release (based on Yahoo! Redirect Remover)
//
// @include		http://ws.copernic.com/*
// ==/UserScript==

/*
 * @author		Xavier Robin
 * @version		1.0
 * @created		2008-10-03
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
			href = decodeURIComponent(href.replace(/http:\/\/ws\.copernic\.com\/clickserver\/_iceUrlFlag=1\?rawURL=([^&]*)&.+/,'$1'));
			link.setAttribute("href", href);
		}
		catch(e) {
			// Do nothing with errors returned by the function. Just here to hide them in the JS Console.
		}
	}
})();

