// Zap Read Button for Bloglines
// version 0.1 BETA!
// 2006-08-22
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
// select "Zap Read Button for Bloglines", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Zap Read Button for Bloglines
// @namespace     http://www.zapreader.com/tools.php
// @description   Adds a "Zap Read This!" button to each article in Bloglines
// @include       http://bloglines.com/myblogs_display*
// @include       http://www.bloglines.com/myblogs_display*
// ==/UserScript==

//initialize the variables
var intArticleNumber = -1;
var strArticleDIV = "";
var strCurrentArticleText = "";

//Each article is displayed in a wrapper DIV names siteItem.0.1, siteItem.0.2, siteItem.0.3, ... 
//We will loop through the possibiliites for this string and stop when we get to one that doesn't exist.
intArticleNumber++;
strArticleDIV = "siteItem.0." + intArticleNumber;
strCurrentArticleText = document.getElementById(strArticleDIV).innerHTML;

while (strCurrentArticleText.length) {
	
	//clean up the text to Zap Read
	var strTextToZapRead = strCurrentArticleText.replace(/<br>/ig,"\r");
	strTextToZapRead = strTextToZapRead.replace(/(<([^>]+)>)/ig,"");
	strTextToZapRead = strTextToZapRead.replace(/"/g,"&quot;");


	//create the string for the button
	strButtonString = "<p align='left'>";
	strButtonString += "<form action='http://www.zapreader.com/reader/' method='post' target='_blank'>";
	strButtonString += '<input type="hidden" name="PastedText" value="' + strTextToZapRead + '">';
	strButtonString += "<input type='submit' value='Zap Read This!'>";
	strButtonString += "</form>";
	strButtonString += "</p>";

	//append on the rest of the text from the article DIV
	strButtonString += strCurrentArticleText;

	//rewrite the article DIV
	document.getElementById(strArticleDIV).innerHTML = strButtonString;

	//Get the text for the next article for the next pass through this loop
	intArticleNumber++;
	strArticleDIV = "siteItem.0." + intArticleNumber;
	strCurrentArticleText = document.getElementById(strArticleDIV).innerHTML;
}

