// Zap Read Button for Wikipedia
// version 0.1 BETA!
// 2006-09-02
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
// select "Zap Read Button for Wikipedia", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Zap Read Button for Wikipedia
// @namespace     http://www.zapreader.com/tools.php
// @description   Adds a "Zap Read This!" button to each Wikipedia entry
// @include       http://*wikipedia.org/*
// ==/UserScript==


//Get the text of the passage
var strOriginalPassage = document.getElementById("bodyContent").innerHTML;

//Check to see if the content existed. We don't want to do this if there is no message DIV
if (strOriginalPassage.length) {
	//Clean up the text so that it can be more easily read
	var strTextToZapRead = strOriginalPassage;
	
	//remove all carriage returns and line feeds 
	strTextToZapRead = strTextToZapRead.replace(/\r\n|\r|\n/g," ");

	//remove the <h3 id="siteSub"> 
	strTextToZapRead = strTextToZapRead.replace(/<h3 id="siteSub".*?>.*?<\/h3>/,"");

	//remove the <div id="contentSub"> 
	strTextToZapRead = strTextToZapRead.replace(/<div id="contentSub".*?>.*?<\/div>/,"");

	//remove the <div id="jump-to-nav"> 
	strTextToZapRead = strTextToZapRead.replace(/<div id="jump-to-nav".*?>.*?<\/div>/,"");

	//remove all table tags (because they don't usually Zap Read well and just slow things down)
	strTextToZapRead = strTextToZapRead.replace(/<table.*?>.*?<\/table>/g,"");

	//remove all occurances of <div class="editsection"
	strTextToZapRead = strTextToZapRead.replace(/<div class="editsection".*?>.*?<\/div>/g,"");

	//remove all occurances of script tags and the code between them
	strTextToZapRead = strTextToZapRead.replace(/<script.*?>.*?<\/script>/g,"");

	//remove everything after sections at the end that doesn't render well in Zap Reader
	strTextToZapRead = strTextToZapRead.replace(/<h2>External links<\/h2>(.*)$/i,"");
	strTextToZapRead = strTextToZapRead.replace(/<h2>Media<\/h2>(.*)$/i,"");
	strTextToZapRead = strTextToZapRead.replace(/<h2>References<\/h2>(.*)$/i,"");
	strTextToZapRead = strTextToZapRead.replace(/<h2>See also<\/h2>(.*)$/i,"");
	strTextToZapRead = strTextToZapRead.replace(/<h2>Further reading<\/h2>(.*)$/i,"");
	
	//remove all <sup> tags because they wrap around the links to footnotes
	strTextToZapRead = strTextToZapRead.replace(/<sup.*?<\/sup>/g,"");

	//replace /H1, /H2, /H3, /H4, /H5, /P, BR with carriage returns
	strTextToZapRead = strTextToZapRead.replace(/<\/h1>/ig,"\r");
	strTextToZapRead = strTextToZapRead.replace(/<\/h2>/ig,"\r");
	strTextToZapRead = strTextToZapRead.replace(/<\/h3>/ig,"\r");
	strTextToZapRead = strTextToZapRead.replace(/<\/h4>/ig,"\r");
	strTextToZapRead = strTextToZapRead.replace(/<\/h5>/ig,"\r");
	strTextToZapRead = strTextToZapRead.replace(/<\/p>/ig,"\r");
	strTextToZapRead = strTextToZapRead.replace(/<br>/ig,"\r");

	//remove any remaining tags
	strTextToZapRead = strTextToZapRead.replace(/(<([^>]+)>)/ig,"");
	
	//replace quotation marks with &quot; so we can place this string sinde quotes later
	strTextToZapRead = strTextToZapRead.replace(/"/g,"&quot;");	

	//create the string for the button
	strButtonString = "<p align='left'>";
	strButtonString += "<form action='http://www.zapreader.com/reader/' method='post' target='_blank'>";
	strButtonString += '<input type="hidden" name="PastedText" value="' + strTextToZapRead + '">';
	strButtonString += "<input type='submit' value='Zap Read This!'>";
	strButtonString += "</form>";
	strButtonString += "</p>";

	//append on the rest of the text from the message DIV
	strButtonString += strOriginalPassage;

	//rewrite the bodyContent DIV
	document.getElementById("bodyContent").innerHTML = strButtonString;

}