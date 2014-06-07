// ==UserScript==
// @name		OT Cleaner
// @namespace	http://userscripts.org/users/48081
// @description	Remove ads from OT
// @include	http://forums.offtopic.com/*
// ==/UserScript==

/*
A Greasemonkey script to clean up/remove ads on offtopic.com
*/

(function(){
		//banner ads
		var result = document.evaluate("/html/body/div[2]", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
		if(result){
			var bannerads=result.iterateNext();
			if(bannerads)bannerads.style.display="none";	
		}
		//text ads
		result = document.evaluate("/html/body/div[3]/div[1]/div[1]/table[2]", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
		if(result){
			var textads=result.iterateNext();
			if(textads)textads.style.display="none";	
		}
})();
