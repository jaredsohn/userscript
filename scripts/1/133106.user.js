// ==UserScript==
// @name                Reddit Full Image
// @description	        Show full image in reddit comments
// @include				http://www.reddit.com/r/*/comments/*
// @include             http://reddit.com/r/*/comments/
// ==/UserScript==


/**  This script is designed to show the full image instead of a preview in the reddit comments.
	 Works on Chrome or Firefox, not tested on IE
	 More information can be found on the script's homepage on userscripts.org   **/
	
// First we want to set the event listener.  We will display the full image once the page has loaded.
window.addEventListener("load", showImage, true);

function showImage(event) {    // Event Handler

// First we need to find the source of the image preview.  Using Firebug I found that the thumbnails are
// kept in an anchor element with class=thumbnail.  Its href has the source url
var thumbnail = document.getElementsByClassName("thumbnail");
var url = thumbnail[0].href;

// only want to continue if url ends in image format: namely, .jpg, .png, .gif.  Otherwise, do nothing
var patt = /(jpg|png|gif|jpeg)/i;

// method to fix url of imgur hosted image that is not linked to actual image, but to html page hosting image
// will fail if gif or png and not jpg
if (!(patt.test(url))) {
		var patt2 = /imgur/i;
		if (patt2.test(url)) {  
			url = url.replace(/www/,"i");
			url = url+".jpg";
			}
}

if (patt.test(url)) {
// Now we want to create an element to hold the image hosted at the url we found and insert it into
// the document.

	var container = document.createElement("img");   //this way is prob best
		container.src = url;	
  		// width of window is needed to calc width of image
		container.width = window.innerWidth - 360;    // this comes from looking at reddits style settings
		 
	// We will insert the image before the comments, but after its thumbnail
	document.getElementById("siteTable").appendChild(container);
}
}

/*  Copyright 2012.  My email: bigeprogramming@gmail.com
	This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
