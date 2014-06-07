// Hacker News Sorter user script
// version 1.0
// 2010-08-24
// Copyright (c) 2010, Jesper Kjeldgaard
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Hacker News Sorter
// @namespace     http://www.jsprk.dk/
// @description   Sorts posts on Hacker News by points.
// @include       http://news.ycombinator.com/*
// @exclude       http://news.ycombinator.com/item*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {

	$('body').prepend('<img id="sortImg" src="http://www.jsprk.dk/48px-Gnome-view-sort-descending.svg.png" style="position: absolute;" title="Sort by rating" />');
	
	$('#sortImg').click(function(){
		var swapped,currentRow,currentTxt;
	
		do {
			var rows = $("td.subtext");
			swapped = false;
			
			for (var j = 0; j < rows.length - 1; j++) {
				currentRow = $(rows[j]).parent();
							
				var nextRow = currentRow.next('tr').next('tr').next('tr');
				
				if (parseInt($('span', currentRow).text().split(" ")[0]) < parseInt($('span', nextRow).text().split(" ")[0])) {
					moveDown(currentRow, nextRow);
					swapped = true;
				}
			}
		} while ( swapped == true );
		
		$('#sortImg').fadeOut();
	});
	
	function moveDown (currentElement, nextElement) {
			var textElement 	= currentElement.prev('tr');
			currentElement.next('tr').remove();
			var next 			= nextElement;
			
			currentElement.insertAfter(next);
			textElement.insertAfter(next);
			
			textElement.before('<tr style="height: 5px"></tr>');
	}
});