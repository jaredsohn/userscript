// ==UserScript==
// @name        Estar Helper
// @namespace   HIS
// @include     https://his.estargmbh.de/admin/render.php?plid=*&page_id=*&lang=german
// @description Keyboard shortcuts for estargmbh online learning at HIS: forward and back (doesn't work for test section).   
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// ==/UserScript==

"use strict"

addKeyboardShortcuts();	


function addKeyboardShortcuts()
{
	// keyboard shortcuts
	$('body').keyup(function (e) {		
		var unicode = e.keyCode? e.keyCode : e.charCode;
		switch(unicode)
		{
			// right arrow
			case 39:
				changePage(1);
				break;
			// left arrow	
			case 37:
				changePage(-1);
				break;			
			default:
				//alert(unicode);
				break;
		}
	});
}

function changePage(direction)
{
	var button;
	if (direction == 1)
		button = $('[alt=NEXT]');
	else
		button = $('[alt=BACK]');
	button.click();
}