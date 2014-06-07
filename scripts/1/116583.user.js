// ==UserScript==
// @name           Hyves News and TV Blocker
// @namespace      hyves.nl
// @include        http://*.hyves.nl/
// @include        http://*.hyves.nl/*
// ==/UserScript==

//See: http://userscripts.org/scripts/review/116583
(function() {
	var blockcounter = 0;

	function block_news() {
                var imgs = document.querySelectorAll('div.sidebar > div.box:nth-child(3) img.media-item-img, div.sidebar > div.box:nth-child(3) .carousel-viewport img.avatar-img, div.sidebar > div.box:nth-child(4) img.media-item-img');

		if (!!imgs && imgs.length > 0)
		for (x in imgs) {
			if (!!imgs[x].style)
		    imgs[x].style.display = 'none';
		}
                
		var newsboxes = document.querySelectorAll('a.h2[href^="http://www.hyves.nl/nu/cat"], a.h1[href^="http://www.hyves.nl/nu/cat"]');
		
		if (!!newsboxes && newsboxes.length > 0) {
			for (x in newsboxes) {
				var newsbox = newsboxes[x];
				
				if (!!newsbox)
					newsbox = newsbox.parentNode.parentNode.parentNode.parentNode;
				
				if (!!newsbox) {
					//just to be sure
					if (newsbox.style) {
						newsbox.style.zIndex = 1;
						newsbox.style.width = 1;
						newsbox.style.height = 1;
						newsbox.style.visibility = 'hidden';
						newsbox.style.display = 'none';
					}
					
					//if the one doesn't work the other will take over
					if (newsbox.parentNode) {
						newsbox.parentNode.removeChild(newsbox);
					}
				}
			}
		}
		
		// when no newsboy found on the site, don't run endlessly
		if (document.readyState == "complete")
			blockcounter++;
		
		if (((!newsboxes || newsboxes.length <= 0) && blockcounter < 500) || document.readyState != "complete") setTimeout(block_news, 8);
	}
    
	window.addEventListener("DOMContentLoaded", block_news, false);
})();