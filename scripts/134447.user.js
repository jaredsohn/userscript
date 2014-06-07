// ==UserScript==
// @name        Scrollable Pesterlogs
// @namespace   http://userscripts.org/users/469319
// @description allows you to read and look at the images at the same time
// @include     http://www.mspaintadventures.com/*
// @include     http://mspaintadventures.com/*
// @version     1.3.1
// ==/UserScript==

var maxheight = "200px";
var width = "600px";

//get pesterlog
var pesterlog = document.getElementsByClassName("spoiler");

for(x in pesterlog){

	var logbox = pesterlog[x].parentNode;
	logbox.style.width = width;

	var log = pesterlog[x].getElementsByTagName("p")[0];

	//apply scrolling
	pesterlog[x].getElementsByTagName("table")[0].style.width= "100%";
	log.style.maxHeight = maxheight;
	log.style.margin = "0px 0px 0px 25px";
	log.style.paddingRight = "25px";
	log.style.overflowY = "auto";

	var hideButton = pesterlog[x].firstChild;
	hideButton.style.borderBottom = "1px dashed grey";

}