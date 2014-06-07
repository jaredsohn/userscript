// ==UserScript==
// @author		KS
// @version		0.5
// @name		Yahoo News Redirect Remover
// @namespace		http://nosite1595/yahoonewsredirectremover.user.js
// @description		This script just removes redirections on Yahoo! News links (used for user tracking & ads)
// @email		kriss (dot) sonic /at/ gmail [dot] com
//
//				Based on the defunct Yahoo! Redirect Remover
//
//
// @changelog
//	0.1 :
//		- first release
//	0.2 :
//		- now manage both '**http' format and '_yl*' (_ylt, _ylu, _ylg, _ylv...)
//	0.3 :
//		- now manage both '**http' format, '_yl*' (_ylt, _ylu, _ylg, _ylv...) and '#xtor=...'
//	0.4 (2013/01/10)
//		- fixed: links for "next page" on Yahoo Search was broken
//	0.5 (2013/01/15)
//		- factorize the code
//
// @include		http://*.yahoo.com/*
// @grant       none
// ==/UserScript==

(function() {

	// get all the links of the page
	var allLinks = document.links;
	
	// loop on all links
	for (var linkIdx in allLinks) {
		try {
			var link = allLinks[linkIdx];
			var href;
			var isReplaced = false;

			// Get redirected url
			href = link.getAttribute("href");
						
			var startPos = href.indexOf("**http");
			if (startPos != -1) {
				href = decodeURIComponent(href.substring(startPos+2));
				isReplaced = true;
			}
			
			// ;_ylt ;_ylu ;_ylg ;_ylv ...
			// #xtor
			var tokensToRemove = [ ";_yl", "#xtor" ];
			for (var tokenIdx in tokensToRemove) {
				startPos = href.indexOf(tokensToRemove[tokenIdx]);	
				if (startPos != -1) {
					var newHref = href.substring(0, startPos);
					
					// If there is something after the removed token, keep it.
					var afterTokenSeparators = [ "?", "#", ";" ];
					var endPos = indexOfAny(href, afterTokenSeparators, startPos)
					if (endPos != -1) {
						newHref = newHref + href.substring(endPos);
					}
				
					href = newHref;
					isReplaced = true;
				}
			}
			
			if (isReplaced) {
				// Set new href attribute
				link.setAttribute("href", href);
			}
		}
		catch(e) {
			// Do nothing with errors returned by the function. Just here to hide them in the JS Console.
		}
	}
})();

function indexOfAny (str, array, start) {
	// Not very optimal?
	var pos = -1;
	for (var i in array) {
		var newPos = str.indexOf(array[i], start);
		if (newPos != -1 && (pos == -1 || pos < newPos)) {
			pos = newPos;
		}
	}
	return pos;
}