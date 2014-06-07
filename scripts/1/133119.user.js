// ==UserScript==
// @name           BA No Autocomplete
// @namespace      http://userscripts.org/users/466607
// @description    Disable auto complete for airport lookup
// @include        https://www.britishairways.com/*
// @include        http://www.britishairways.com/*
// ==/UserScript==

unsafeWindow.setAutoComplete = function(field_id, results_id, get_url, responseParser, afterSelection) {
	return true;
};
