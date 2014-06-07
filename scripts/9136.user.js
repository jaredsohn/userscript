// ==UserScript==
// @name           Flickr -> Panoramio
// @namespace      kino.wippiespace.com
// @description    Adds a text link from geotagged Flickr image to the same location in Panoramio.com's map
// @include        http://www.flickr.com/*
// ==/UserScript==

// Updated: 19.2.2009

// Get all metadata fields
var metadata = document.getElementsByTagName("meta");

//container for geotag
var gt = '';

// loop through to find if ICBM-data is available
for (i=0;i<=metadata.length;i++)
{
	// Check if image is geotagged
	if (metadata[i].name == 'ICBM')
		{
		gt = metadata[i].content;
		break;
		}
}

// Get lat and lon from geotag-container
var location = gt.split(",");
var lat = "lt=" + location[0];
var lon = "ln=" + location[1].substr(1);

// Choose where to add the link
var target = document.getElementById('div_geo_block');

var beforelink = "<li class=\"stats adr\">Show nearby photos in ";
var link1 = "<a class=\"plain\" href=\"http://www.panoramio.com/map/\#";
var link2 = "&z=5&k=0&tab=2\">";
var link3 = "</a>";
var linktext = "Panoramio.com";

var newnode = document.createElement("div");
newnode.id = "link_to_panoramio";
newnode.innerHTML = beforelink + link1 + lat + '&' + lon + link2 + linktext + link3 + '</li>';
target.parentNode.insertBefore(newnode, target);


// END

