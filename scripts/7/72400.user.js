// ==UserScript==
// @name           Reddit self identifier
// @namespace      http://userscript.org/user/citricsquid
// @description    Allows a user to set the custom colour for their username to display. 
// @include        http://*reddit.com/*
// @license        Creative Commons -  Creative Commons Attribution-Noncommercial-Share Alike 2.0 UK: England & Wales License ( http://creativecommons.org/licenses/by-nc-sa/2.0/uk/ )
// ==/UserScript==

	/* 
		Example configurations:
		
		Pink name, no bold or extra name part:
		
		var colour = '#FF4D8E'; 
		var bold = false;
		var name = false;
		
		Green name, bold with an extra part "[me]":
		
		var colour = '#D1E751'; 
		var bold = true;
		var name = "[me]";
		
	*/

/* configuration: */
var colour = '#FF9900'; // Modify this variable to the hex code for the colour you want to be. #25272D is dark gray, #FF9900 is orange, #000000 is black. If you don't know the colours; http://html-color-codes.com/ 
var bold = true; // If true the username will show in bold, if false it'll show normally.
var name = '[me]'; // Set to the string to appear after your name. If I kept it as "[me]" it would displayed "citricsquid [me]" for my name. If you change it to false (var name = false;) the extra part will not show.


/* Don't edit below unless you know what you're doing, this part is what sets the styling :) */
var username = document.getElementsByClassName('user')[0];
var user = username.getElementsByTagName('a')[0].innerHTML;

var taglines = document.getElementsByClassName("tagline");

for (i = 0; i < taglines.length; i++){
	
	var username = taglines[i].getElementsByTagName('a')[0];
	if(username.innerHTML == user){
		username.style.color = colour;
		if(bold){
			username.style.fontWeight = 'bold';
		}
		if(name){
			username.innerHTML += ' '+name;
		}
	}
	
}	