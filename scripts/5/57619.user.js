// ==UserScript==
// @name		jwzutil
// @description	A tool for toying with jwz.org.
// @include		http://www.jwz.org/*
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

//			GM_log('Permalink resolved:');
//			GM_log(responselink);
			
			// Create the new div with the media link in it.
			var newdiv = document.createElement('div');
			newdiv.setAttribute('class','trackName');
			newdiv.innerHTML =
				'<a href="' +
				responselink +
				'">' +
				targetdiv.textContent +
				'</a>';
			
			// Replace the old div content with the new div content.
			targetdiv.parentNode.replaceChild(newdiv, targetdiv);
		}
	}
}

// Figure out whether the inner frame is an artist page or a concert/session page.
var isartist = window.location.href.indexOf("radio3.cbc.ca/nmc/artist.aspx") != -1;
var isconcert = window.location.href.indexOf("radio3.cbc.ca/concert/concert.aspx") != -1;

//GM_log('isartist =');
//GM_log(isartist);
//GM_log('isconcert =');
//GM_log(isconcert);

// Get an array of "add this track" image elements.
var addelms_path;
if (isartist)
	addelms_path = "//img[@src='images/nmc_add.gif']";
else if (isconcert)
	addelms_path = "//img[@src='images/jcPlus_off.gif']";

var addelms = document.evaluate(
	addelms_path,
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

//GM_log('Addelms found:');
//GM_log(addelms.snapshotLength);

// Get an array of track name elements.
var nameelms_path;
if (isartist)
	nameelms_path = "//div[@class='trackName']";
else if (isconcert)
	nameelms_path = "//table[@id='tracklist']/tbody/tr/td[2]/strong";

var nameelms = document.evaluate(
	nameelms_path,
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);
	
//GM_log('Nameelms found:');
//GM_log(nameelms.snapshotLength);

// Iterate through the found images.

for (var i = 0; i < addelms.snapshotLength; i++) {
	addelm = addelms.snapshotItem(i);

	// Parse the "onclick" event of the image for its permalink.
	var permalink = addelm.getAttribute('onclick').split("'")[3];

//	GM_log('Trying to resolve permalink:');
//	GM_log(permalink);
	
	// The URI we need to GET.
	var uri = 'http://radio3.cbc.ca/services/MusicWebService.asmx/GetPlaylist?permalink=' + permalink;
	
	// The http request object.
	var request = new XMLHttpRequest();
	request.open('GET', uri, true);
	
	// The div we're going to mutilate.
	var targetdiv = nameelms.snapshotItem(i);
	
	// The request handler.
	sethandler(request, targetdiv);
	
	// Send the request.
	request.send(null);
}

