// ==UserScript==
// @name        Hiszilla Ticket Highlighter
// @namespace   http://his.de
// @description Tickets mit externen Beobachtern (cc-Liste, Berichterstatter) visuell hervorheben. 
// @include     https://hiszilla.his.de/hiszilla/show_bug.cgi*
// @version     1.0
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

$(document).ready(function() {

	// Hintergrund färben, wenn in der cc-Liste eine nicht @his.de Adresse vorhanden ist.

	customer_found = false;
	$('select#cc').children().each(function() {
		if ($(this).text().indexOf('@his.de') == -1) {
			// Hochschule in cc-Liste
			customer_found = true;
		}
	});
	
	if ($('#c0 .email').attr('href').indexOf('@his.de') == -1){
		customer_found = true;
	}
		
	if (customer_found){
		$('div#bugzilla-body').css("background-color", "#F6CECE"); //#F6CECE
	} 
		
});