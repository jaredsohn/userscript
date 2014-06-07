// ==UserScript==
// @name           criticker_click_ratings_tab
// @namespace      criticker_click_ratings_tab
// @description    On criticker.com, always shows the "Ratings" tab instead of the "Buy" tab
// @include	http://www.criticker.com/film/*
// @version        0.3
// ==/UserScript==

var viewRatingsTab = function() {
	var links = document.querySelectorAll('.fi_tabbox_offlink');
	for (var i=0; i < links.length; i++) {
		if(links[i].innerHTML == "Ratings") {
			links[i].click();
		}
	}
}

viewRatingsTab();
