// ==UserScript==
// @name           Deli.sh :: Hide Required Ratio
// @namespace      http://Deli.sh/
// @include        http*://*Deli.sh*
// ==/UserScript==

(function() {
	var target = document.getElementById('userinfo_stats').getElementsByTagName('li'); /* User stats */

	/* Hide "Required" ratio */
	target[3].style.display = "none";
})();