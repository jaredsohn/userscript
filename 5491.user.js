// Zap Read Button for Bible Gateway
// version 0.1 BETA!
// 2006-09-01
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
// select "Zap Read Button for Bible Gateway", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Zap Read Button for Bible Gateway
// @namespace     http://www.zapreader.com/tools.php
// @description   Adds a "Zap Read This!" button to each passage displayed at BibleGateway.com
// @include       http://*biblegateway.com/passage*
// ==/UserScript==


//Get the text of the message
//We are looking for the content of <div class="result-text-style-normal">
if(document.getElementsByTagName("div")!=null) {
	
	//get the content of all the div tags
	var divtag = document.getElementsByTagName("div");
	
	//loop through all the div tags
	for(var i = 0; i < divtag.length; i++) {

		//Does the div tag have a class? 
		if(divtag[i].getAttribute("class") != null) {
		
			//is the div tag's class "result-text-style-normal"? This is how we know we have the passage div
			if(divtag[i].getAttribute("class") == "result-text-style-normal") {

				//modify the div for the passage to add a "Zap Read This!" button
				if(divtag[i].innerHTML != null) {

					//get the code for the div tag
					var strPassageText = divtag[i].innerHTML;
					
					//format the code to make it more ZapReadable
					
					//remove any hard coded spaces
					var strTextToZapRead = strPassageText.replace(/&nbsp;/ig,""); 

					//remove all <span> tags because they wrap around the line numbers and replace it with a carriage return
					strTextToZapRead = strTextToZapRead.replace(/<span.*?>.*?<\/span>/g,"\r");

					//remove all <sup> tags because they wrap around the links to footnotes and crossreferences
					strTextToZapRead = strTextToZapRead.replace(/<sup>.*?<\/sup>/g,"");

					//place carriage returns between verses, and before and after any subheadings
					strTextToZapRead = strTextToZapRead.replace(/<p>/g,"\r<p>"); 
					strTextToZapRead = strTextToZapRead.replace(/<h5>/g,"\r<h5>");  
					strTextToZapRead = strTextToZapRead.replace(/<\/h5>/g,"</h5>\r"); 

					//remove any remaining tags
					strTextToZapRead = strTextToZapRead.replace(/(<([^>]+)>)/ig,"");
					
					//replace quotation marks with &quot; so we can place this string sinde quotes later
					strTextToZapRead = strTextToZapRead.replace(/"/g,"&quot;");

					//remove the word "Footnotes:" and any text that follows it
					// we escape and then unescape the string because I can't seem to remove the %0D%0A%0D%0A any other way 
					strTextToZapRead = escape(strTextToZapRead);
					strTextToZapRead = strTextToZapRead.replace(/Footnotes(.*)$/gm,"");
					strTextToZapRead = unescape(strTextToZapRead);

					//create the string for the button
					strButtonString = "<p align='left'>";
					strButtonString += "<form action='http://www.zapreader.com/reader/' method='post' target='_blank'>";
					strButtonString += '<input type="hidden" name="PastedText" value="' + strTextToZapRead + '">';
					strButtonString += "<input type='submit' value='Zap Read This!'>";
					strButtonString += "</form>";
					strButtonString += "</p>";

					//append on the rest of the text from the origial code for the passage DIV to the button string
					strButtonString += strPassageText;

					//rewrite the passage div with our new string that includes the "Zap Read This!" button
					divtag[i].innerHTML = strButtonString;

				}
			}
		}
	}
}
