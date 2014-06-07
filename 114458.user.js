// ==UserScript==
// @name           Geekhack AutoPilot
// @namespace      http://geekhack.org/
// @include        http*://geekhack.org/*
// ==/UserScript==

var color_read = '#aaa';

function mark_as_read(e)
{
	this.style.color = color_read;
}

// get table cells with the links
var threads = document.getElementById('main_content_section').getElementsByClassName('table_grid')[0].getElementsByClassName('subject');
var links = null;

// for all cells ...
for (var i = 0; i < threads.length; i++)
{
	// get links
	links = threads[i].getElementsByTagName('a');

	if (links.length >= 2 && links[0].id != '') // there is a new-image-link
	{
		// set title link to new-image-link
		links[1].href = links[0].href;
		// hide the new-image-link
		links[0].style.display = 'none';
	}
	else
	{
		for (var j = 0; j < links.length; j++)
		{
			// make old threads look old
			links[j].style.color = color_read;
		}
	}

	// mark unread on click
	if (links.length > 1)
		links[1].addEventListener('mouseup', mark_as_read, false);
}


/*
22.07.2012
made grey-out feature work more consistently

21.07.2012
changed to fit the new geekhack

04/10/2011
changed event from mousedown to mouseup.
click nou always triggers the link, even if the link moves from under the cursor.
*/
