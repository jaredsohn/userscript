// CBC Radio 3 Goodies Greasemonkey Script
// ==UserScript==
// @name		cbcgoodies
// @description	Script to add helpful links, etc. to CBC Radio 3
// @include		http://radio3.cbc.ca/nmc/artist.aspx*
// ==/UserScript==

// This sets the HTTP GET request handler. It needs to be in a separate
// function due to the javascript function-in-loop stank.

function sethandler(request, targetdiv)
{
	request.onreadystatechange = function() {
		if (request.readyState == 4)
		{
			// Parse the response to get the actual media link.
			var responselink =
				request.responseText.split('audioUrl="',2)[1].split('"',2)[0];
			
			// Create the new div with the media link in it.
			var newdiv = document.createElement('div');
			newdiv.innerHTML =
				'<div class=trackName><a href="' +
				responselink +
				'">' +
				targetdiv.textContent +
				'</a></div>';
			
			// Replace the old div content with the new div content.
			targetdiv.parentNode.replaceChild(newdiv, targetdiv);
		}
	}
}


// Get an array of "add this track" image elements.

var allimg = document.evaluate(
	"//img[@src='images/nmc_add.gif']",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

// Get an array of track name div elements.

var alldiv = document.evaluate(
	"//div[@class='trackName']",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);
	
// Iterate through the found images.

for (var i = 0; i < allimg.snapshotLength; i++) {
	img = allimg.snapshotItem(i);

	// Parse the "onclick" event of the image for its permalink.
	var permalink = img.getAttribute('onclick').split("'")[3];
	
	// The URI we need to GET.
	var uri = 'http://radio3.cbc.ca/services/MusicWebService.asmx/GetPlaylist?permalink=' + permalink;
	
	// The http request object.
	var request = new XMLHttpRequest();
	request.open('GET', uri, true);
	
	// The div we're going to mutilate.
	var targetdiv = alldiv.snapshotItem(i);
	
	// The request handler.
	sethandler(request, targetdiv);
	
	// Send the request.
	request.send(null);
}
