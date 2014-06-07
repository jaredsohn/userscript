// ==UserScript==
// @name           Hyves Popular Subjects Blocker
// @namespace      hyves.nl
// @include        http://*.hyves.nl/
// @include        http://*.hyves.nl/*
// ==/UserScript==

//See: http://userscripts.org/scripts/review/131889
(function() {
	var blockcounter = 0;

	function block_popular_contents() {     
		var topiclinks = document.querySelectorAll('div.sidebar a[href^="http://www.hyves.nl/topic/"]');
		
		if (!!topiclinks && topiclinks.length > 0) {
			for (x in topiclinks) {
				var topiclink = topiclinks[x];
				var topicbox = null;
				
				if (!!topiclink) {
				    try {
					    topicbox = topiclink.parentNode.parentNode.parentNode.parentNode;
					} catch (e) {
					}
				}
				
				if (!!topicbox) {
					//just to be sure
					if (topicbox.style) {
						topicbox.style.zIndex = 1;
						topicbox.style.width = 1;
						topicbox.style.height = 1;
						topicbox.style.visibility = 'hidden';
						topicbox.style.display = 'none';
					}
					
					//if the one doesn't work the other will take over
					if (topicbox.parentNode) {
						topicbox.parentNode.removeChild(topicbox);
					}
					break;
				}
			}
		}
		
		// when no newsboy found on the site, don't run endlessly
		if (document.readyState == "complete")
			blockcounter++;
		
		if (((!topiclinks || topiclinks.length <= 0) && blockcounter < 500) || document.readyState != "complete") setTimeout(block_popular_contents, 8);
	}
    
	window.addEventListener("DOMContentLoaded", block_popular_contents, false);
})();