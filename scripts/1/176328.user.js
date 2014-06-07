// ==UserScript==
// @name          Geocaching Maps - My Finds and My Hides off by default
// @namespace     Zentriple
// @description	  The script makes the My Finds and My Hides off by default on the Geocaching Map.
// @include       http://geocaching.com/map/*
// @include       http://www.geocaching.com/map/*
// @grant         none
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @downloadURL   https://userscripts.org/scripts/source/176328.user.js
// @updateURL     https://userscripts.org/scripts/source/176328.meta.js
// @version       2013.8.23
// ==/UserScript==

(function() {
	
	window.addEventListener('load', function() {
		$('#m_myCaches .ct_mf').click();
		$('#m_myCaches .ct_mo').click();
	}, false);

})();
