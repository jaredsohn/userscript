// ==UserScript==
// @name        League of Legends Tribunal Review Highlighter
// @namespace   Sneaky McCoy
// @include     *.leagueoflegends.com/tribunal/en/justice-review/*
// @updateURL   http://userscripts.org/scripts/source/152133.user.js
// @version     1
// @grant 	none
// ==/UserScript==
$('.data-table tbody tr').each(function() {    
        var consensus = $(this).find('td:eq(2)').text();     
	var color;     
	switch(consensus) {         
		case 'Almost No One':          
		case 'Very Few':         
		case 'Minority':             
			color = 'red';             
			break;         
		case 'Majority':         
		case 'Strong Majority':         
		case 'Overwhelming Majority':             
			color = 'green'             
			break;     
	}      
	$(this).children('td:not(:first-child)').css('color', color); 
}); 