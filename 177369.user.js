// ==UserScript==
// @name           Removes Google Chrome Install Option on Google Search Page
// @include        http://www.google.*/*
// @include        https://www.google.*/*
// @version        1.0
// ==/UserScript==

(function () {
	remove_chrome_search(document.getElementById('pmocntr2'));
})();

function remove_chrome_search(element) {
	if (element != null) {
		if (element.style != undefined)
			element.style.display = 'none';
	}
}