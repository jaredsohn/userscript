// ==UserScript==
// @name           Discogs Thumbnail Fixer
// @namespace      http://userscripts.org/users/gkoelln7
// @description    Removes "width=150" from thumbnails in Discogs.com
// @include        http://www.discogs.com/*
// ==/UserScript==
for ( var i=0; i<document.images.length; i++ ) {                 // Loop for Array of Images
  var currentSrc = document.images[i].src;                         // Convert the Image "src" attribute to a string
  var currentImg = currentSrc.split("/");                          // Split the Image Location
      currentImg = currentImg[(currentImg.length-1)];              // Grab the FileName of the Image
  if ( currentImg.substring(1,6)=="-150-" ) {                        // All Thumbnails seem to start with "th_"
    document.images[i].removeAttribute("width");
  }
}