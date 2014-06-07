// ==UserScript==
// @name          WebShots Full Size
// @description   Display the full size image in WebShots photo pages
// @include       *webshots.com/photo*
// ==/UserScript==

// Get full size image URL		
var lnks = document.getElementById("photoIconLinks").getElementsByTagName("a");
var imageURL = lnks[ 1 ];

// Find out the originally displayed image width
mnPhoto = document.getElementById("mainPhoto");
var imgL = mnPhoto.getElementsByTagName("a");
w = imgL[ 0 ].childNodes[ 0 ].getAttribute( "width" );

// Replace the flash object with an embedded version of the full size image
var fullSizeImage = '<img src="'+imageURL+'" width="'+w.toString()+'" ALT="Full size image">';
document.getElementById("mainPhoto").innerHTML = fullSizeImage;       
