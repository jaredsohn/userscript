// Zap Read Button for TTE.hu
// 2007-06-28
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Zap Read Button for TTE.hu
// @namespace     http://www.admc.hu/
// @description   Adds a "Zap Read This!" button to each TTE.hu entry
// @include       http://*tte.hu/*
// ==/UserScript==


//Get the text of the passage
var t=document.getElementsByTagName("table");
ezem=t.length-4;
var strOriginalPassage = t[ezem].innerHTML;

//Check to see if the content existed. We don't want to do this if there is no message DIV
if (strOriginalPassage.length) {
	//Clean up the text so that it can be more easily read
	var strTextToZapRead = strOriginalPassage;
	
	//remove all carriage returns and line feeds 
	strTextToZapRead = strTextToZapRead.replace(/\r\n|\r|\n/g," ");

	//remove the <p class="fontsize"> 
	strTextToZapRead = strTextToZapRead.replace(/<p class="fontsize".*?>.*?<\/p>/,"");

	//remove all occurances of script tags and the code between them
	strTextToZapRead = strTextToZapRead.replace(/<script.*?>.*?<\/script>/g,"");

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
	strButtonString = "<form action='http://www.zapreader.com/reader/' accept-charset='utf-8' method='post' target='_blank'>";
	strButtonString += '<input type="hidden" name="PastedText" value="' + strTextToZapRead + '">';
	strButtonString += "<p align='right'>";
	strButtonString += "<input type='submit' value='Zap Read This!'>";
	strButtonString += "</p>";
	strButtonString += "</form>";

	//append on the rest of the text from the message DIV
	a=document.getElementById("fejlec").innerHTML;

	//rewrite the bodyContent DIV
	document.getElementById("fejlec").innerHTML = a+strButtonString;
}