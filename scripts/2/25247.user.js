// Flickr Map Monkey
// Copyright (c) 2008, Iain Mullan
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
// --------------------------------------------------------------------
//
// RELEASE NOTES
// VERSION 0.4 - Added 'sensor=false' parameter to the image URL, appears to be invalid without it.
// VERSION 0.3 - Slight change needed due to Flickr HTML changes. Name of geo element info is now 'div_taken_in'
// version 0.2 - The image is now a clickable link to Google Maps at the given location. Flickr's original "Taken In ... " text is preserved, and the map image is displayed below it.
// VERSION 0.1 - Displays a static image with marker, replacing the "Taken In ... " text.
// --------------------------------------------------------------------
// ==UserScript==
// @name          Flickr Map Monkey
// @description   Display a Google Map in the Additional Information section of a Flickr photo page, if location info is available.
// @namespace     http://ebotunes.com/
// @include       http://*flickr.com/photos/*
// ==/UserScript==

function getMeta(mn){ 
  var m = document.getElementsByTagName('meta'); 
  for(var i in m){ 
   if(m[i].name == mn){ 
     return m[i].content; 
   } 
  } 
}



var locSection = document.getElementById('div_taken_in');

var coord = getMeta('ICBM');

//alert ('Hello ebo - live editing!'+coord);
if (coord==undefined) {

} else {


var GMAP_API_KEY = 'ABQIAAAAv6RGMPEOgkA7IasZt4WVCxTbFI-KAjwZMobsSMrlqEZg0iKTIhSEhtWTRAVWuBBFRJzrgHNNzVByRA';


var coords = coord.split(' ');
var lat = coords[0];
var long = coords[1];
var ll = lat+long;

var linkURL = 'http://maps.google.co.uk/maps?z=14&ll='+ll;

var imgUrl = 'http://maps.google.com/staticmap?center='+ll+'&markers='+ll+'&zoom=14&size=150x150&key='+GMAP_API_KEY+'&sensor=false';

locSection.innerHTML += '<a href="'+linkURL+'"><img src="'+imgUrl+'" /></a>';

}
