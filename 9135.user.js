// ==UserScript==
// @name           Flickr -> Geocaching.com
// @namespace      kino.wippiespace.com
// @description    Creates a link from geotagged flickr images to list geocaches nearby.
// @include        http://www.flickr.com/*
// ==/UserScript==
// Updated 20.2.2009

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
var lat = location[0];
var lon = "origin_long=" + location[1].substr(1);

// Choose where to add the link
var target = document.getElementById('div_geo_block');

var beforelink = "<li class=\"stats adr\">Show nearby geocaches in ";
var link1 = "<a class=\"plain\" href=\"http://www.geocaching.com/seek/nearest.aspx?origin_lat=";
var link2 = "\">";
var link3 = "</a>";
var linktext = "Geocaching.com";

var newnode = document.createElement("div");
newnode.id = "link_to_geocaching.com";
newnode.innerHTML = beforelink + link1 + lat + '&' + lon + link2 + linktext + link3 + '</li>';
target.parentNode.insertBefore(newnode, target);

// END