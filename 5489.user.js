// Zap Read Button for Yahoo Mail
// version 0.1 BETA!
// 2006-08-20
// Copyright (c) 2006, Ricky Spears
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
// To uninstall, go to Tools/Manage User Scripts,
// select "Zap Read Button for Yahoo Mail", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Zap Read Button for Yahoo Mail
// @namespace     http://www.zapreader.com/tools.php
// @description   Adds a "Zap Read This!" button to each mail message in Yahoo! Mail
// @include       http://*.mail.yahoo.com/*
// ==/UserScript==


//Get the text of the message
var strOriginalMessage = document.getElementById("message").innerHTML;

//Check to see if the content existed. We don't want to do this if there is no message DIV
if (strOriginalMessage.length) {
	//Clean up the text so that it can be more easily read
	var strTextToZapRead = strOriginalMessage.replace(/<br>/ig,"\r");
	strTextToZapRead = strTextToZapRead.replace(/(<([^>]+)>)/ig,"");
	strTextToZapRead = strTextToZapRead.replace(/"/g,"&quot;");

//create the string for the button
strButtonString = "<p align='left'>";
strButtonString += "<form action='http://www.zapreader.com/reader/' method='post' target='_blank'>";
strButtonString += '<input type="hidden" name="PastedText" value="' + strTextToZapRead + '">';
strButtonString += "<input type='submit' value='Zap Read This!'>";
strButtonString += "</form>";
strButtonString += "</p>";

//append on the rest of the text from the message DIV
strButtonString += strOriginalMessage;

//rewrite the message DIV
document.getElementById("message").innerHTML = strButtonString;

}