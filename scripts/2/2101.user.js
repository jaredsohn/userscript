// PhotoBucket.com - Thumbnail Resizer v0.1
// Made By Luke Stevenson {http://www.lucanos.com}
// Distributed and Maintained via GMVC
// Last updated: 08 November 2005
//
//   This script modifies the thumbnails shown on PhotoBucket.com so that
// the longest side of the thumbnail is equal to the requested longest
// side (the variable "RequestedLongestEdge").
//
// ==UserScript==
// @name              PhotoBucket.com - Thumbnail Resizer
// @namespace         http://gmvc.lucanos.com/
// @description       (v0.1) Resizes the thumbnails shown in Photobucket.com to a user-defined size.
// @include           *photobucket.com*
// ==/UserScript==

var RequestedLongestEdge = "320"; // in pixels

for ( var i=0; i<document.images.length; i++ ) {                 // Loop for Array of Images
  var currentSrc = document.images[i].src;                         // Convert the Image "src" attribute to a string
  var currentImg = currentSrc.split("/");                          // Split the Image Location
      currentImg = currentImg[(currentImg.length-1)];              // Grab the FileName of the Image
  if ( currentImg.substring(0,3)=="th_" ) {                        // All Thumbnails seem to start with "th_"
    document.images[i].src    = currentSrc.replace("/th_","/");      // Remove the "th_"
    if ( document.images[i].height > document.images[i].width ) {    // Determine Orientation
	  document.images[i].height = RequestedLongestEdge;                // Orientation = Portrait. Height = Longest Edge.
	} else {
      document.images[i].width  = RequestedLongestEdge;                // Orientation = Landscape. Height = Longest Edge.
	}
  }
}