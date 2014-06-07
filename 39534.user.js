// ==UserScript==
// @name           Flickr -> Geocaching.com v1.1
// @description    Creates a link from geotagged flickr images to list geocaches nearby, based on original script by Kino, userscript user #25312      
// @include        http://flickr.com/*
// @include        http://www.flickr.com/*
// ==/UserScript==



var gts = document.getElementsByTagName("meta");

for (var d = 0; d < gts.length; d++)
{
	// Check if the image is geotagged
	if (gts[d].name == "ICBM")
	{
		// Get lat and lon from metadata
		var location = gts[d].content.split(",");
		var lat = location[0];
		var lon = "origin_long=" + location[1].substr(1);

		// Where to add the link
		var target = document.getElementById('faves_p');

		// Parts of the link
		var link1 = "<a class=\"plain\" href=\"http://www.geocaching.com/seek/nearest.aspx?origin_lat=";
		var link2 = "\">";
		var link3 = "</a>";
		var linktext = "Show nearby geocaches in Geocaching.com";

		// Write code
		target.innerHTML = target.innerHTML + '<li class=\"stats\">' + link1 + lat + '&' + lon + link2 + linktext + link3 + '</li>';

		d = gts.length + 1;

	}

}