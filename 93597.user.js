// ==UserScript==
// @name           IMDB Cleaner
// @namespace      TheHomicidal
// @description    Use in conjunction with AdBlock Plus for best results.
// @include        http://www.imdb.com/*
// ==/UserScript==

	var elmDeleted1 = document.getElementById("sidebar");
	elmDeleted1.parentNode.removeChild(elmDeleted1);
	var elmDeleted4 = document.getElementById("sponsored_links_afc_div_BOTTOM_CENTER");
	elmDeleted4.parentNode.removeChild(elmDeleted2);
