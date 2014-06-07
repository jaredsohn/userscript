// ==UserScript==
// @name          Facebook Script
// @description   Make any script work on Facebook
// @require       http://userscripts.org/scripts/source/84596.user.js?
// @include       http://*.facebook.com/*
// ==/UserScript==

function fbPageChanged() {
     if (GM_testUrl(['http://*.facebook.com/home.php*'])) {
		var atext;
		$('a').each(function(index) {	
		atext += $(this).attr('href');
		});
		alert(atext);
     }
}
