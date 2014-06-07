// Rabays
// version 0.1
// Copyright (c) 2007, myls
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          AutoRäbä
// @description   Automaattiperseilijä
// @include       http://*vesabbs.com/*
// ==/UserScript==
//constants containing data which is used in perseily
const smileys = ['::mrgreen', '::smoke', '8)', '::rolleyes']
const images = ['http://jumi.lut.fi/~junousia/hymiot/neutral/neutnerd.gif', 'http://img484.imageshack.us/img484/7650/terminaattoripeukku1qn5.jpg', 'http://img217.imageshack.us/img217/8596/opetelkaakayttaaatkau6rdz0.gif']
//TEH CODE
const num_methods = 4;
//different methods
function smiley() {
	if(smileys.length > 0) {
		return smileys[Math.ceil((Math.random() * 10)) % smileys.length];
	}
}
function image() {
	if(images.length > 0) {
		return '[img]' + images[Math.ceil((Math.random() * 10)) % images.length] + '[/img]';
	}
}
function avatar(){
	var allImg, curImg;
	//get all images
	allImg = document.getElementsByTagName('img');
	for(i = allImg.length-1; i > 0; i--) {
		curImg = allImg[i].getAttribute("alt");
		if(curImg.substring(curImg.length-6, curImg.length) == "Avatar") {
			return '[img]http://vesabbs.com/' + allImg[i].getAttribute('src') + '[/img]';
		}
	}
}
function sig() {
	var allDiv, curDiv, sigImg;
	//get all divs
	allDiv = document.getElementsByTagName('div');
	for(i = allDiv.length-1; i > 0; i--) {
		//check if it's a post container
		if(allDiv[i].id.substring(0, 12) == "post_message") {
			//jump to the signature which is 6 divs away from the post
			curDiv = allDiv[i].nextSibling;
			for(u = 0; u < 5; u++)
				curDiv = curDiv.nextSibling;
			//get images in the signature and randomly pick one
			sigImg = curDiv.getElementsByTagName('img');
			if(sigImg.length > 0)
				return '[img]' + sigImg[Math.ceil((Math.random() * 10)) % sigImg.length].getAttribute('src') + '[/img]';
		}
	}
}
//set quickreply
function set_qr(str) {
	//search for the reply box
	qrBox = document.getElementById("vB_Editor_QR_textarea");
	//add the string
	qrBox.value = str;
}
//create button
function create_button(name, func, add_after) {
	var rabaButton;
	//create perseily button and set it's attributes
	rabaButton = document.createElement("input"); 
	rabaButton.setAttribute("class", "button");
	rabaButton.setAttribute("type", "submit");
	rabaButton.setAttribute("value", name);
	rabaButton.setAttribute("onclick", "return false;");
	rabaButton.addEventListener("click", func, true);
	//add the button
	add_after.parentNode.insertBefore(rabaButton, add_after.nextSibling);
	return rabaButton;
}
//random perseily function
function perseily_rand() {
	var qrBox, rabaString;
	//pick perseily method randomly
	while(typeof(rabaString) == "undefined") {
		switch(Math.floor((Math.random() * 10)) % num_methods) {
			case 0:
				rabaString = smiley();
				break;
			case 1:
				rabaString = image();
				break;
			case 2:
				rabaString = avatar();
				break;
			case 3:
				rabaString = sig();
				break;
		}
	}
	set_qr(rabaString);
}
//add the button and set the eventlistener
var adButton, curButton, lineBreak;
//search for the submit button
adButton = document.getElementById("qr_preview");
//add line break
lineBreak = document.createElement("br");
adButton.parentNode.insertBefore(lineBreak, adButton.nextSibling);
//add buttons
curButton = create_button("Random", perseily_rand, lineBreak);
curButton = create_button("Naama", function() {set_qr(smiley());}, curButton);
curButton = create_button("Kuva", function() {set_qr(image());}, curButton);
curButton = create_button("Avatar", function() {set_qr(avatar());}, curButton);
curButton = create_button("Sigu", function() {set_qr(sig());}, curButton);