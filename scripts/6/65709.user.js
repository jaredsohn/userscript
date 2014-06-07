// ==UserScript==
// @name           What.CD :: Hide Required Ratio
// @namespace      http://www.what.cd
// @include        http*://*what.cd*
// ==/UserScript==

(function() {
	var target = document.getElementById('userinfo_stats').getElementsByTagName('li'); /* User stats */

	/* Hide "Required" ratio */
	target[3].style.display = "none";
})();