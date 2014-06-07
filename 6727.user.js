// Fido SMS user script
// version 0.1
// 2006-12-06
// Copyright (c) 2006, Aleksandar Djuric
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// To use this script you need to have Firefox (http://www.mozilla.org) and 
// Greasemonkey (http://greasemonkey.mozdev.org/) installed.

// ==UserScript==
// @name		Fido SMS Keyboard Access
// @description		Improve keyboard access on Fido's "Send a text message" pages
// @namespace		http://delfuturo.org/projects/greasemonkey/
// @include		http://*fido.ca/portal/web2fido/compose.do*
// @include     	http://*fido.ca/portal/web2fido/send.do*
// ==/UserScript==

// Set focus on 'area code' field
var allInputs, thisInput, foundInput;
allInputs = document.evaluate(
	"//input[@name='rcptAreaCode']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	foundInput = 0;
for (var i = 0; i < allInputs.snapshotLength; i++) {
	thisInput = allInputs.snapshotItem(i);
	if (thisInput != null) {
		thisInput.focus();
		foundInput = 1;
	}
}

// Set focus on 'send' button
if (foundInput == 0) {
	var allInputs, thisInput;
	allInputs = document.evaluate(
		"//input[@name='sendBtn']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allInputs.snapshotLength; i++) {
		thisInput = allInputs.snapshotItem(i);
		if (thisInput != null) {
			thisInput.focus();
		}
	}
}



 



  
  