// ==UserScript==
// @name           Flickr nearby Panoramio/Google Earth
// @namespace      http://kruyt.org
// @description    Adds a text link to Flickr page of geotagged photos that links to the same location in Panoramio and Google earth with a Flickr feed
// @include        http://www.flickr.com/*
// ==/UserScript==

// Get Meta
function getMeta(mn){ 
  var m = document.getElementsByTagName('meta'); 
  for(var i in m){ 
   if(m[i].name == mn){ 
     return m[i].content; 
   } 
  } 
}

// Check if image is geotagged
var coord = getMeta('ICBM');

if (coord==undefined) {

} else {
	
// Get lat and lon from metadata
var coords = coord.split(', ');
var lat = coords[0];
var lon = coords[1];

var gll = "ll=" + lat + "," + lon;
var plat = "lt=" + lat;
var plon = "ln=" + lon;

// Where to add the link
var target = document.getElementById('li_location');

// Panoramio
var plink1 = "<a class=\"plain\" href=\"http://www.panoramio.com/map/\#";
var plink2 = "&z=2&k=0&tab=2\">";
var plink3 = "</a>";
var plinktext = "Show nearby photos in Panoramio";

// Google Map
var glink1 = "<a class=\"plain\" href=\"http://maps.google.com/maps\?";
var glink2 = "f=q&hl=en&geocode=&q=http:%2F%2Fkmlphotos.metaltoad.com%2Fkml_root.2.0.php&ie=UTF8&t=h&z=15\">";
var glink3 = "</a>";
var glinktext = "Show nearby photos in Google earth";

// Write code
target.innerHTML = target.innerHTML + '<li class=\"li_location\">' + plink1 + plat + '&' + plon + plink2 + plinktext + plink3 + '</li>';

target.innerHTML = target.innerHTML + '<li class=\"li_location\">' + glink1 + gll + '&' + glink2 + glinktext + glink3 + '</li>';

}