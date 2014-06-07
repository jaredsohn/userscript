// ==UserScript==
// @namespace     http://www.jbouchard.net/chris
// @name          editDeviantBar
// @description   Customise the deviant's toolbar on deviantart - add/remove your own buttons.
// @include	 	  http://*.deviantart.com/*
// ==/UserScript==

// To add, replace, and remove links from the Deviant Bar, edit the following three Arrays below:
// addLinks - list of links to add the the Deviant Bar
// repLinks - list of links to replace in the Deviant Bar
// remLinks - list of links to remove from the Deviant Bar

// To insert the deviant's name into any text, use %d.  For instance, 'http://%d.deviantart.com/' would be the deviant's user page.
// To add to the end of the bar, use an index of -1.
// Don't forget the commas between items in the Arrays.

// Please note the following:
//   - This script works in the following order:  Add, Replace, Remove.
//   - Indices will change as links are added to the bar.
//   - The replace and remove searches are not case sensitive.
//   - Add and Replace work through the bar from left to right, but Remove works from right to left.

// Thanks to theSpook and his deviousToolbar for the basis of this code!

(function()
{
	// =================================== Edit these values... ===================================
	
	// Links to add to the Deviant Bar
	// Format:  [INDEX, 'LINK TEXT', 'LINK URL', 'TOOL TIP', 'ICON URL']
	var addLinks = new Array([2, 'Latest', '/latest/', 'Latest Deviation', 'http://www.jbouchard.net/chris/images/latest.gif'],
							 // Again, don't forget the commas.
						     [5, 'Favourites', '/favourites/', 'Favourites', 'http://i.deviantart.com/icons/userpage/favourites.gif'],
							 // Note the use of %d to insert the deviant's name.
							 [-1, 'Send Note to %d', 'http://my.deviantart.com/notes/?to=%d', 'Send Note', 'http://i.deviantart.com/icons/userpage/notes.gif']);
	
	// Links to replace in the Deviant Bar
	// Format:  ['OLD LINK TEXT', ['NEW LINK TEXT', 'NEW LINK URL', 'NEW TOOL TIP', 'NEW ICON URL']]
	// Note the inner set of brackets; Be sure not to leave them out.
	var repLinks = new Array(['&nbsp;Prints', ['Prints', '/store/', 'Prints', 'http://i.deviantart.com/icons/top/store.gif']]);
	
	// Links to remove from the Deviant Bar
	// Format:  'LINK TEXT'
	// I'm removing 'Send Note' so I can use my own custom Note link above -- more as an example than anything.
	var remLinks = new Array('Send Note');
	
	// ============================================================================================
	
	function returnButtonHTML(details)
	{		
		var output = '<a title="' + details[details.length - 2].replace(new RegExp('%d', 'g'), deviantName) + '" href="' + details[details.length - 3].replace(new RegExp('%d', 'g'), deviantName) + '">';
		
		output += '<img class="icon" src="' + details[details.length - 1].replace(new RegExp('%d', 'g'), deviantName) + '" alt="" />';
		
		output += '<span>' + details[details.length - 4].replace(new RegExp('%d', 'g'), deviantName) + '</span></a>';
		
		return output;
	}
	
	var deviantName = window.location.host.substring(0, window.location.host.indexOf('.'));
	var toolbarTable = document.getElementById('bar-user-core').getElementsByTagName('table')[0];
	var toolbarTR = toolbarTable.getElementsByTagName('tr')[0];
	var toolbarTDs = toolbarTR.getElementsByTagName('td');
	
	var newTR = document.createElement('tr');
	
	for (var i = 0; i < toolbarTDs.length; i++)
	{	
		var tempTD = document.createElement('td');
		tempTD.innerHTML = toolbarTDs[i].innerHTML;
		
		newTR.appendChild(tempTD);
	}
	
	// Add links
	for (var i = 0; i < addLinks.length; i++)
	{
		var tempTD = document.createElement('td');
		var buttonHTML = returnButtonHTML(addLinks[i]);
		
		tempTD.innerHTML = buttonHTML;
		
		if (addLinks[i][0] > -1)
		{
			newTR.insertBefore(tempTD, newTR.getElementsByTagName('td')[addLinks[i][0]]);
		}
		else
		{
			newTR.appendChild(tempTD);
		}
	}
	
	// Replace links
	for (var i = 0; i < newTR.getElementsByTagName('td').length; i++)
	{
		for (var j = 0; j < repLinks.length; j++)
		{
			if (newTR.getElementsByTagName('td')[i].getElementsByTagName('a')[0].lastChild.innerHTML.toLowerCase() == repLinks[j][0].toLowerCase())
			{
				newTR.getElementsByTagName('td')[i].innerHTML = returnButtonHTML(repLinks[j][1]);
				break;
			}
		}
	}
	
	// Remove links
	for (var i = newTR.getElementsByTagName('td').length - 1; i >= 0; i--)
	{
		for (var j = 0; j < remLinks.length; j++)
		{
			if (newTR.getElementsByTagName('td')[i].getElementsByTagName('a')[0].lastChild.innerHTML.toLowerCase() == remLinks[j].toLowerCase())
			{
				newTR.removeChild(newTR.getElementsByTagName('td')[i]);
				break;
			}
		}
	}
	
	newTR.getElementsByTagName('td')[0].className = 'first';
	newTR.getElementsByTagName('td')[newTR.getElementsByTagName('td').length - 1].className = 'last';
	
	toolbarTR.parentNode.replaceChild(newTR, toolbarTR);
})();