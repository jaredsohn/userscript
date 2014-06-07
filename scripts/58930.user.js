// Name: SkyRates AdBlock
// Version: 2
// Date Updated: 2009.09.30
//
// Changelog:
// 1 - Initial version
// 2 - Forum page, too
//
// ==UserScript==
// @name        SkyRates AdBlock
// @description Removes ads from main SR page. Thanks to Greasekit for making this possible, and brown/red for making it necessary.
// @include *skyrates.net*
// ==/UserScript==


(function() {

	var adSidebar = document.getElementById('verticalTallAd');
	if (adSidebar) {
		adSidebar.parentNode.removeChild(adSidebar);
	}
	var adSidebar = document.getElementById('verticalAd');
	if (adSidebar) {
		adSidebar.parentNode.removeChild(adSidebar);
	}
	var adSidebar = document.getElementById('horizontalAd');
	if (adSidebar) {
		adSidebar.parentNode.removeChild(adSidebar);
	}
	
})();