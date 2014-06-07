// ==UserScript==
// @name           Hyves Ads Blocker
// @namespace      hyves.nl
// @include        http://*.hyves.nl/
// @include        http://*.hyves.nl/*
// ==/UserScript==

//See: http://userscripts.org/scripts/review/105172
(function() {
    var blockcounter = 0;
    
    function block_banner() {
        var banners = document.querySelectorAll('div[id^="hyvesense_"], a#idBannerUrl1, div[id^="hyvesense_"] img');
        
        if (!!banners && banners.length > 0) {
		    for (x in banners) {
		    	var banner = banners[x];
		    	
				if (banner) {
				    //just to be sure
				    if (banner.style) {
						banner.style.zIndex = 1;
						banner.style.width = 1;
						banner.style.height = 1;
						banner.style.visibility = 'hidden';
						banner.style.display = 'none';
				    }
				    
				    //if the one doesn't work the other will take over
				    if (banner.parentNode) {
				    	banner.parentNode.removeChild(banner);
				    }
				}
		    }
		}
        
        // when no banner found on the site, don't run endlessly
        if (document.readyState == "complete")
            blockcounter++;
        
        if (((!banners || banners.length <= 0) && blockcounter < 500) || document.readyState != "complete") setTimeout(block_banner, 8);
    }
    
    window.addEventListener("DOMContentLoaded", block_banner, false);
})();