// ==UserScript==
// @author         martinrl
// @version        1.0.0
// @name           show options for google search result
// @namespace      http://show_options_for_google_search_result.nfshost.com/
// @include        http://www.google.com/search?*
// @include        http://www.google.co.uk/search?*
// @include        http://www.google.se/search?*
// @include        http://www.google.dk/search?*
// @description    All search options and filters will be displayed at the Google Search Result page, without having to click "Show options...".
// ==/UserScript==

(function () {
	var showOptionsParam = "&tbo=1";
	
	if (location.href.lastIndexOf(showOptionsParam) < 0) {
		location.href = location + showOptionsParam;
	}
}());