// Sky guide +
// version 0.3
// 2008-06-04
// Copyright (c) 2007, Stuart Crouch
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// IF YOU ARE UPGRADING FROM A PREVIOUS VERSION OF SKY GUIDE PLUS, go to
// Tools/Manage User Scripts and manually uninstall the previous
// version before installing this one.  Sorry, this is a limitation
// of Greasemonkey.
// 
// To uninstall, go to Tools/Manage User Scripts,
// select "Sky guide +", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//
// Removes everything apart from the guide and tabs, and makes it all full width
// Adjusting the height is pointless as the feed that fills it only gives 446px 
// worth of data, so I left that as-is
//
// This will leave you with just the guide showing on the page
// --------------------------------------------------------------------
// ==UserScript==
// @name           Sky guide +
// @namespace      http://action.servegame.com/
// @description    Removes/Reorders the junk from the sky+ tv page
// @include			http://mysky.sky.com/portal/site/skycom/tvguide/tvlistings
// ==/UserScript==

var targetElement

/***********************************************/
/* Enable me to remove the sky site nav areas  */
/***********************************************/
 

targetElement = document.getElementById('aoc-globalnav');
if (targetElement)  	
    targetElement.parentNode.removeChild(targetElement);

targetElement = document.getElementById('aoc-header-top');
if (targetElement)  	
    targetElement.parentNode.removeChild(targetElement);
    
targetElement = document.getElementById('aoc-footer');
if (targetElement)  	
    targetElement.parentNode.removeChild(targetElement);
    
targetElement = document.getElementById('aoc-header');
if (targetElement)  	
    targetElement.parentNode.removeChild(targetElement);

targetElement = document.getElementById('aoc-leaderboard');
if (targetElement)  	
    targetElement.parentNode.removeChild(targetElement);




/**************************************/
/* Adverts - just removes the padding */
/* Install adblock to remove the ads! */
/**************************************/

targetElement = document.getElementById('aoc-leaderboard-wrapper');
if (targetElement)  	
    targetElement.parentNode.removeChild(targetElement);


targetElement = document.getElementById('aoc-skyscraper-right');
if (targetElement) 
    targetElement.parentNode.removeChild(targetElement);

/**************************/
/* Remove the padding */
/**************************/
setIDtoClass('aoc-gutter-horiz');
targetElement = document.getElementById('aoc-gutter-horiz', 'aoc-pagecontent-inner');
if (targetElement) 
	removeElement(targetElement);	


/**************************/
/* Stuff for the new epg  */
/**************************/
// Remove junk
targetElement = null;
setIDtoClass('aoc-genericpanel');
targetElement = document.getElementById('aoc-genericpanel');
if (targetElement)
	removeElement(targetElement);

targetElement = null;
targetElement = document.getElementById('epg_info');
if (targetElement)
	removeElement(targetElement);

// Fullscreen it!
targetElement = null;
targetElement = document.getElementById('aoc-body-main-inner');
if (targetElement)
    targetElement.style.width = "100%";

targetElement = null;
targetElement = document.getElementById('aoc-pagecontent');
if (targetElement)
    targetElement.style.width = "100%";
    
targetElement = null;
targetElement = document.getElementById('aoc-pagecontent-inner');
if (targetElement)
    targetElement.style.marginLeft = "0px";
    

targetElement = null;
setIDtoClass('aoc-columns-container');
targetElement = document.getElementById('aoc-columns-container');
if (targetElement)
    targetElement.style.width = "100%";

targetElement = null;
setIDtoClass('aoc-genericcolumn');
targetElement = document.getElementById('aoc-genericcolumn');
if (targetElement)
    targetElement.style.width = "100%";

targetElement = null;
setIDtoClass('aoc-genericpanel');
targetElement = document.getElementById('aoc-genericpanel');
if (targetElement)
    targetElement.style.width = "100%";

/****************************/
/* Generic helper functions */
/****************************/
// setIDtoClass - sets the ID for the first element of the 
// speficied class that we find
function setIDtoClass(searchClass, startNode) 
{
	var classElements = new Array();
	var tag = '*';
	var node = null;
	
	if (startNode == null)
		node = document;
	else
		node = document.getElementById(startNode);
		
	var alltags = node.getElementsByTagName(tag);

	for (i=0; i<alltags.length; i++)
	{
		if (alltags[i].className == searchClass)
		{
			alltags[i].setAttribute("id", searchClass);
			return;
		}

	}
}

// Get rid of this element and anything beneath it
function removeElement(thisElement)
{
	// if there arent any children, remove me
	thisElement.parentNode.removeChild(thisElement);
}

// Insert the insertable node at the end of the destination node
function insertAfter(destNode, insertableNode) 
{
  destNode.parentNode.insertBefore(insertableNode, destNode.nextSibling);
}

// Grab this Nodes HTML including its own attributes
function getFullHTML(requiredNode)
{
	var tempDiv = document.createElement("div"); 
	tempDiv.appendChild(requiredNode.cloneNode(true));
    return tempDiv.innerHTML;
}