// ==UserScript==
// @name        thegiftexperience item id finder
// @namespace   http://userscripts.org/users/200448
// @description Adds item ID to thegiftexperience.co.uk item description pages.
// @include     http://www.thegiftexperience.co.uk/catalogue/*
// @version     1
// @grant       none
// ==/UserScript==
var inputs = document.getElementsByTagName("input");
for (i=0; i<inputs.length; i++) { 
	if (inputs[i].name == 'instance_id') {
		document.getElementById('productrightcol').appendText(inputs[i].value);
		break;
	}
}
