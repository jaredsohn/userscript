// ==UserScript==
// @name           Digg v3 Adblocker
// @namespace      http://www.stud.ntnu.no/~aase
// @description    Removes the entire ad on the top of the new version of Digg (v3)
// @include        http://www.digg.com/*
// @include        http://digg.com/*
// ==/UserScript==

(function() {

	function addGlobalStyle(css) {
	    var head, style;
	    head = document.getElementsByTagName('head')[0];
	    if (!head) { return; }
	    style = document.createElement('style');
	    style.type = 'text/css';
	    style.innerHTML = css;
	    head.appendChild(style);
	}
		
	// remove home page ad
	var top_ad = document.getElementById("top_ad");
	if (top_ad) {
		top_ad.setAttribute("style", "display: none");
	}
	
	// remove single item ads
	addGlobalStyle(".top_ad_image, .single_ad_unit, .comments_ad_image { display: none !important };");
	
	// widen comments area
	addGlobalStyle(".comment { width: 100% !important };");
})();