// ==UserScript==
// @name           Toggle Netflix rated/added
// @namespace      http://www.netjeff.com/
// @description    Add missing links to let you toggle if you want to see rated/added movies
// @version        2.2
// @license        http://creativecommons.org/licenses/by-sa/2.5
// @date           2008-03-11
// @include        http://www.netflix.com/*
// ==/UserScript==


if ( location.pathname.match(/^\/Top(100|25)/) )
{
	createToggleLink("topmovers"); // "topmovers" is the id of <div> with the list
}
if ( location.pathname.match(/^\/AwardPage/) )
{
	createToggleLink("pcol-wide2"); // "pcol-wide2" is the id of <div> with the list
}

//---------------------------
function toggleRatedAdded()
{
	// 'this' should be the <a> link that was clicked
	if (this.textContent.match(/^Include/))
	{
		setRatedAddedVisibility(true);
		this.textContent = "Exclude Rated or Added Movies";
	}
	else //   /^Exclude/
	{
		setRatedAddedVisibility(false);
		this.textContent = "Include Rated or Added Movies";
	}
}

//---------------------------
function setRatedAddedVisibility(show)
{
	// XPath to get the sub-table's for movies i've rated
	var xpathRated = "//tr[descendant::img[@class='star' and (contains(@src,'_2_') or contains(@src,'_1_0'))]]";
	
	// XPath to get the sub-table's for movies already added (queued/at home)
	var xpathAdded = "//tr[descendant::img[@alt='In Queue' or @alt='At Home']]";
	
	// Combined XPath
	var xpath=xpathRated+"|"+xpathAdded;
	
	// Process the elements (tables) found by the xpath
	var i, elem, xpr = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; elem = xpr.snapshotItem(i); i++)
	{
		if (show) {
			elem.style.display = "table-row";
			  // Use "table-row" above (rather than "block")
			  // because the elem is a table-row
		} else {
			elem.style.display = "none";
		}
	}
}

//---------------------------
// Creates an <a> in a <div> that can be used to toggle, add add that before the
// <div> with the list of movies.
//
// First arg is the id (as a string) of the <div> that has 
// the list of movies (Top100, awards, etc)
//---------------------------
function createToggleLink(listId)
{
	// Create the <div> that will hold the <a> link
	var linkDiv = document.createElement('div');
	linkDiv.setAttribute("class", "rated-rented");
	
	// Create the <a>, and add it to the <div> we just created
	var link = document.createElement('a');
	link.textContent = "Exclude Rated or Added Movies";
	link.addEventListener("click", toggleRatedAdded, false);
	linkDiv.appendChild(link);
		
	// Add the <div> with link before the <div> with the list of movies
	var listDiv = document.getElementById(listId)
	listDiv.parentNode.insertBefore(linkDiv, listDiv);
	
	// Invoke the toggle function so we start with rated/added hidden initially
	(toggleRatedAdded).call(link);  // 'link' will be 'this' during function call, to simulate onclick
}


