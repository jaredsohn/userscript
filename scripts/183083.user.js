// ==UserScript==
// @name        H-I-L Hacks
// @namespace   HIL
// @include     http://www.hannover-in-love.de/galerie.php?mode=viewpic&gid=*&bid=*
// @version     1.1.1
// @require  	https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// ==/UserScript==

	// last changes
	// 1.1   -- Add play/pause with space (slideshow)
	// 1.1.1 -- Fix error.

// original change dates
// Aug 31, 2012 13:47
// Aug 31, 2012 13:14
// Aug 31, 2012 11:27


"use strict"

function addKeyboardShortcuts()
{
	// keyboard shortcuts
	$('body').keyup(function (e) {		
		var unicode = e.keyCode? e.keyCode : e.charCode;
		switch(unicode)
		{
			// right arrow
			case 39:
				changePhoto(1);
				break;
			// left arrow	
			case 37:
				changePhoto(-1);
				break;			
			// space bar		
			case 32:
				auto();
				break;
			default:
				//alert(unicode);
				break;
		}
	});
}


function changePhoto(direction)
{	
	if (direction == 1)
		var title = "Nachfolgendes Bild";
	else
		var title = "Vorheriges Bild";
	var image = $("img[title=\"" + title + "\"]");
	// for automated change, add variable to url to tell new page what to do
	var link = image.parent();
	var newhref = link.attr("href");
	if (auto.running == true)
		newhref += "direction=" + direction;
	link.attr("href", newhref);
	image.click();
}

function auto(stop) {
	
	if ( typeof auto.running == 'undefined' ) 
	    // It has not... perform the initilization
	    auto.running = false;
	if ( typeof auto.id == 'undefined' ) 
	    auto.id = false;
	if ( typeof stop == 'undefined' ) 
	    stop = false;
	
	if ((auto.running == true) || stop) {
		auto.running = false;
		window.clearInterval(auto.id);
	}
	else if (auto.running == false) {
		auto.id = setInterval(function() {
			changePhoto(1);
		}, 3000);
		auto.running = true;
   }
}

$(document).ready(function() {
	addKeyboardShortcuts();	
	auto.running = false;
	var searchQuery = window.location.search;
	if (searchQuery.match(/direction/))
	{
		// assume forward direction
		auto();
	}
	});