// Enhanced MySpace Edit Page v1.0
// by mrk (bbzmark{at}gmail)
//
// ==UserScript==
// @name	Enhanced MySpace Edit Page
// @namespace	http://bbzspace.com
// @description	Larger textfield for editing your profile, increased length for your headline and photo caption.
// @include	http://editprofile.myspace.com/*
// ==/UserScript==

var location = window.location.toString();
var intr = document.getElementsByTagName("textarea");
var ifhl = document.getElementsByName("interestLabel");

// to avoid custom comment boxes in preview.
if (location.indexOf('editsafemode') > -1 || location.indexOf('editInterests') > -1) {
	if (intr.length > 0) {
		var editBox = intr[0];
		// setting new number of rows and columns
		editBox.rows = "40"; 
		editBox.cols = "120"
	}
	// checking if user is editing their headline
	if (document.forms[1] && ifhl[0].value == "headline") {
		var hlbox = document.getElementsByName("interest");
		// changing maxlength of the headline field.
		hlbox[0].setAttribute("maxlength", 999); 
	}
// checking if user is editing pic caption in safe mode
} else if (location.indexOf('editSafeImage\&imageID') > -1) {
	var capbox = document.getElementsByName("caption");
	// 70 is the max length accepted by the server.
	capbox[0].setAttribute("maxlength", 70);
}