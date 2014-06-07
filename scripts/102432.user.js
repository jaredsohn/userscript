// ==UserScript==
// @name        delicious_url_fixer
// @namespace   http://0-oo.net/
// @description Fix up incorrect URLs of Delicious.com made by SBM Counter
// @homepage    http://userscripts.org/scripts/show/102432
// @version     0.1.0
// @include     http://www.delicious.com/*
// ==/UserScript==
(function() {
	var arr = location.href.split("/");
	
	if (arr[3] != "url") {
		return;
	} else if (arr[4].length > 32) {
		arr[4] = arr[4].substr(0, 32);
		location.href = arr.join("/");
	}
})();
