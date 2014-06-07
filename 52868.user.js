// ==UserScript==
// @name           AllCDCovers blue notification fix
// @description    for allcdcovers.com - hides the annoying blue drop-down notification
// @include        http://www.allcdcovers.com/*
// ==/UserScript==

/*
	Author: Matthias Dailey
	Title: AllCDCovers.user.js
	Date: June 2009
	
	Purpose:
		AllCDCovers.com has been celebrating their milestone of 100,000
		CD cover uploads for months now. Every time you visit a page in
		the site, there is a blue notification that scrolls down from the 
		top, scrolling the page body down with it.
		This script removes the notification element.
	
	Notes:
		If the script does not work, or throws errors, feel free to email 
		me about it. Here is my email address:
		(matthias.dailey) gmail
		
*/

function removeTheBlue()
/*
	Purpose: removes the blue element
	Preconditions: document is loaded
	Postconditions: element with id="bgWrapperSlideIn" has the following
		css properties:
			position: absolute;
			top: 0;
			left: 0;
			display: block;
			visibility: hidden;
*/
{
	// get a handle on the blue element
	
	var blueElement = document.getElementById("bgWrapperSlideIn");
	
	if (blueElement)
	{	
		// re-style it
		blueElement.style.position = "absolute";
		//blueElement.style.bottom = "0px";
		blueElement.style.visibility = "hidden";
		//blueElement.style.height = "0";
		//blueElement.style.display = "block";
		
		// add signature to bottom of page
		var cp = document.getElementById("copyright");
		cp.style.width = "100%";
		if (cp!==null)
		{
			var msg = "Page enhanced with AllCDCovers.user.js by Matthias Dailey";
			var sig = document.createElement("p");
			sig.appendChild(document.createTextNode(msg));
			cp.appendChild(sig);
		}
	}
}

// only execute on the top window level
if (self==top)
{
	addEventListener(
		'load',
		function()
		{
			removeTheBlue();
		},
		false
	)
}





