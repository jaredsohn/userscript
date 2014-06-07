// ==UserScript==
// @name           IMDb HelpDesk search tweaks
// @namespace      http://userscripts.org/users/67626
// @description    Shows all matches (not just top 5) in HelpDesk search results. Converts the results URLs into the compact form.
// @include        http*://*.imdb.com/help/
// @include        http*://*.imdb.com/help/search
// @grant          none
// @updateURL      http://userscripts.org/scripts/source/100813.meta.js
// @version        2013.04.30
// ==/UserScript==

(function() {
var I = document.createElement("input");
with (I) {
	type = "hidden";
	name = "show_all";
	value = "1";
}
document.forms[1].appendChild(I);

var List = document.getElementsByTagName("ol")[0];
if (List) {
	var Pro = (window.location.hostname == "pro.imdb.com" || window.location.hostname == "secure.imdb.com");
	var A = List.getElementsByTagName("a");
	for (i = 0; i < A.length; i++) {
		var File = A[i].search.split("=")[3].split("&")[0];
		switch (parseInt(A[i].search.split("=")[2], 10)) {
			case 2:
				if (!Pro) A[i].href = "/updates/guide/" + File;
				break;
			case 4:
				A[i].href = "/video/help/show_leaf?" + File;
				break;
			default:
				A[i].href = "/help/show_leaf?" + File;
		}
	}
}
})();