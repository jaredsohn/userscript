// ==UserScript==
// @grant         metadata
// @name          Youtube NoEDU
// @namespace     userscripts.com/users/574377
// @description   Removes the edufilter from Youtube school.
// @include       http://youtube.com/*
// @include       http://www.youtube.com/*
// @include       https://youtube.com/*
// @include       https://www.youtube.com/*
// @include       youtube.com/*
// @include       www.youtube.com/*
// @version       1.3.6
// @license       LGPL http://www.gnu.org/linenses/lgpl.html
// ==/UserScript==
var url = window.location.toString();
var x = location.hash;
//add &edufilter=Cbm9AQ-itfEwmpvK1RSR2Q for testing and debugging!
if(!x === "#"){
	window.location.hash = "#";
	window.location = url.replace(/edufilter=Cbm9AQ-itfEwmpvK1RSR2Q/,'edufilter=cbm9AQ-itfEwmpvK1RSR2Q');
} else {
	return true;
}