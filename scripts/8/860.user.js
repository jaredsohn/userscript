// HospitalityClub prefilled values in send message form
// version 0.1 BETA!
// 2005-04-25
// Copyright (c) 2005, Paolo Massa
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "HospitalityClub prefilled values in send message form", and click Uninstall.
//
// Note: you have to manually modify this .user.js file by editing
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          HospitalityClub prefilled values in send message form
// @namespace     http://moloko.itc.it/paoloblog/
// @description   prefill values (yourname, yourpassport, yourmessage) in HospitalityClub.org send message form
// @include       *serverkompetenz.net*
// @include       *hospitalityclub*
// ==/UserScript==

// You must change the values of these variables!
var yourname="paolo massa"; 	// change "paolo massa" with "your name"
var yourpassport="12345678"; 	// change it!
var yourtext="Hi, \n this is the message you want to send. \n Change it!"; // put here your message. "\n" is the newline character.

// You probably don't want to touch what is below this line.
var inputs = document.getElementsByTagName('input'); 
var textareas = document.getElementsByTagName('textarea'); 


for(i=0;i<textareas.length;i++) { 
	var tx = textareas[i]; 
	if(tx.getAttribute('name') == 'text') {
		tx.value=yourtext
	}
}

for(i=0;i<inputs.length;i++) { 
	var inp = inputs[i]; 
	if(inp.getAttribute('name') == 'fullname') {
		inp.value=yourname
	}
	if(inp.getAttribute('name') == 'passport') {
		inp.value=yourpassport
	}
	if(inp.getAttribute('name') == 'sendconfirmation') {
        	//.checkbox.checked = true
		//inp.value="ON";
	}
}
