//  © 2011 Justin Denk. All  Rights Reserved.
// ==UserScript==
// @name          Kontera Link Killer
// @version		  1.0
// @description	  Stops certain kinds of Kona Kontera embedded advertisement links from working properly.
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
 
// Wait for the DOM to be ready
$(document).ready(function() {
	// Make a timer of sorts in order to allow the links to be generated
	var intervalID = window.setInterval(function() {
	
		// Remove some of the junk that Kontera puts in the DOM
		$("#AdLinkLayerClick").remove();
		$("#konasapn0").remove();
		$("#kona_flash_preloader_wrapper").remove();
		
		// Replace each ad link element with a generic text element (Span, in this case)
		$('a[id*="KonaLink"]').each(function(index) {
			$(this).replaceWith('<span>' + $(this).find('span').text() + '</span>');
		});
		
		window.clearInterval(intervalID);
	}, 1000);
});
