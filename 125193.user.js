// ==UserScript==
// @name           The Global Mail Desktop Layout Fix
// @namespace      http://theglobalmaildesignisterribleandipaddesignsreallyshouldgoaway.now
// @description    Fix the crazy global mail layout
// @include        http://www.theglobalmail.org/*
// ==/UserScript==
// Licence: CC BY 3.0 http://creativecommons.org/licenses/by/3.0/au/

window.addEventListener('load', function () 
{
	var $ = unsafeWindow.jQuery;
	if($) {
		// HOME PAGE
		// Get main stories to show vertically
		$('.stories-main ul li').css({'float':'none', 'width': 'auto', 'height':'auto', 'margin-bottom': '24px'});
		// Stop marquee style ticker, it still refreshes, but no horizontal constant scroll
		$('.stories-twitter ul').css({'width': 'auto', 'position':'static', 'left': 'auto'});
		// Get stories at the bottom to display vertically
		$('div.stories-minor').css({'overflow': 'visible'});
		$('div.stories-minor ul').css({'overflow': 'visible', 'width':'auto'});
		// Move footer below minor stories
		$('#footer').css({'position': 'static', 'clear':'both'});
		
		// STORY PAGE SPECIFIC
		if($('#article-container').length > 0) {
			$('#article-container').css({'overflow':'visible'});
			$('.article').css({'overflow':'visible'});
			// Stories actual content loads after the rest of page, and we will wait for it
			// One day if they never update the look for desktop browsers, I will search harder
			// and latch unto the event that shows the story content
			setTimeout(function() {
				$('#player-container, .paginate-progress').css({'display':'none'});
				$('#template .column, #template .special').css({'position': 'static'});
				$('.article').css({'width': 'auto', 'height':'auto'});
				$('#template').css({'height': 'auto', 'width':'auto'});
				$('div.column').css({'position':'static', 'left':'auto', 'top': 'auto', 'width': 'auto', 'height': 'auto'});
				// The footer just gets in the way on story pages thanks to content injection
				$('#footer').css({'display': 'none'});
			}, 4000);
		}
	}
});


