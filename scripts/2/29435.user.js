// ==UserScript==
// @name		ANGEL Fix Toolbar
// @include		http*://angel.lcc.edu/*
// @author		Kyle Matheny
/* @description	This fixes the problem with the toolbar hiding behind the lower
			frame after receiving a FF3 "0" message when saving settings of
			a lessons item. Most notable is after you save a quiz and go to add
			questions and the toolbar is 3/4 of the way hidden.
*/
// ==/UserScript==

var pageBanner = parent.document.getElementById("pagebanner");
var childCount = pageBanner.childNodes.length;

var frameList = pageBanner.getElementsByTagName('frame');
var win = frameList[0].contentDocument;
var subTitleDiv = win.childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[2];

if(subTitleDiv.innerHTML.length > 6 && subTitleDiv.className=="pageSubtitle") {
	var origRows = pageBanner.rows;
	pageBanner.rows = "82,*";
} else {
	var origRows = pageBanner.rows;
	pageBanner.rows = "68,*";
}