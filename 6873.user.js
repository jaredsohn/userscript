// Google Reader increase reading area
// version 0.1
// 2006-12-24
// Written by Nikhil Dandekar
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// This script does some things to increase the reading area in Google Reader
// 1. Remove the footer (which contains the buttons for 'Next Item' and 'Previous Item'
// 2. Remove the Google Labs logo from the top right of the screen
// 3. Decrease the font size of the options on the top-right
//
// WARNING: This will remove the 'Next Item' and 'Previous Items' buttons in the footer.
// If you use these buttons for navigation, I suggest switching over to using j/k or n/p keys
// after you install the script
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Google Reader increase reading area
// @namespace       http://randomizedchaos.blogspot.com
// @description     Increase the reading area of posts when using Google Reader.
// @include         *google.com/reader*
// @include         *reader.google.com*
// ==/UserScript==

// Remove footer	
var foot = document.getElementById('chrome-footer-container')
if (foot) {
	foot.style.display = "none";
}

// Reduce size of top links
var topLinks = document.getElementById('global-info')
if(topLinks){
	topLinks.style.fontSize = "xx-small";
}

// Remove Google logo
var logo = document.getElementById('logo-container')
if (logo) {
	logo.style.display = "none";
}
