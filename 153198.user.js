// ==UserScript==
// @name           TorrensMD Link Corector
// @description    Corectare URL extern.
// @author         Godina Nicolae
// @include        http://*torrentsmd.*
// @include        http://*torrentsmoldova.*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version        0.1
// @updateURL      http://userscripts.org/scripts/source/153198.user.js
// ==/UserScript==

jQuery(document).ready(function($) {
  
  var hostname = window.location.hostname;
	
  $('a[href*="torrentsmd"], a[href*="torrentsmoldova"]').each(function() {
	var curhr = $(this).attr('href');	
    	$(this).attr('href', 
		curhr.replace($('<a>').prop('href', curhr).prop('hostname'), hostname)
    	);
  });

});