// ==UserScript==
// @name           thesubwire
// @namespace      http://www.thesubwire.com/*
// @description    Obliterates unnecessary stuff on the front page
// @include        http://www.thesubwire.com/
// @include        http://www.thesubwire.com/*?module=translations
// ==/UserScript==
//
// Email: userscript@mk.neodoomer.de
//

if(document.URL.indexOf("module=translations") == -1) {
	var allElements, thisElement, elem;

	allElements = document.getElementsByTagName("div");
	for (var i = 0; i < allElements.length; i++) {
		thisElement = allElements[i];
		if(thisElement.className == "menu_panel") {
			thisElement.parentNode.parentNode.removeChild(thisElement.parentNode);
		}
	}

	allElements = document.getElementsByTagName("div");
	for (var i = 0; i < allElements.length; i++) {
		thisElement = allElements[i];
		if(thisElement.className == "framebox_title") {
			// correct the margin of the outer div
			thisElement.parentNode.parentNode.style.margin = "0px 0px 0px 0px";
			// now remove the shit
			thisElement.parentNode.parentNode.removeChild(thisElement.parentNode);
			// break after the first framebox_title because the releases 
			// table uses the same css class
			break;
		}
	}

	allElements = document.getElementsByTagName("div");
	for (var i = 0; i < allElements.length; i++) {
		thisElement = allElements[i];
		if(thisElement.className == "framebox_title") {
			// now remove the shit
			thisElement.parentNode.removeChild(thisElement);
			// break after the first framebox_title because the releases 
			// table uses the same css class
			break;
		}
	}

	allElements = document.getElementsByTagName("div");
	for (var i = 0; i < allElements.length; i++) {
		thisElement = allElements[i];
		if(thisElement.className == "welcomeBox") {
				thisElement.parentNode.removeChild(thisElement);
				break;
		}
	}

	// kill the given width of the releases table
	thisElem = document.getElementsByName("releases");
	thisElem[0].parentNode.style.width = "1000px";

	// enlarge 'groups' column since we killed the crap to the left and right
	// the title page gets a group width of 180 but since we have a picture
	// and some info to accomodate on the left for specific series information
	// the group column only gets 125 pixel there
	allElements = document.getElementsByTagName("th");
	for (var i = allElements.length-1; i > 0; i--) {
		thisElement = allElements[i];
		if(thisElement.innerHTML == "Groups")
			thisElement.width = 180;
	}

	// change the default series info page to module=translations
	allElements = document.getElementsByTagName("a");
	for (var i = 0; i < allElements.length; i++) {
		thisElement = allElements[i];
		if(thisElement.attributes.length == 4
				&& thisElement.attributes.getNamedItem("onmouseout") != null
				&& thisElement.attributes.getNamedItem("onmouseout").nodeValue == "ClearPopup();") {
			thisElement.href += "?module=translations";
		}
	}

	/*
	// redirect those unreliable static.thesubwire.com urls
	allElements = document.getElementsByTagName("link");
	for (var i = 0; i < allElements.length; i++) {
	  thisElement = allElements[i];
	  if(thisElement.href.indexOf("http://static.thesubwire.com/css/117/combined_v117.css") >= 0)
		thisElement.href = "http://data.neodoomer.de/files/thesubwire.css";
	}

	allElements = document.getElementsByTagName("script");
	for (var i = 0; i < allElements.length; i++) {
	  thisElement = allElements[i];
	  if(thisElement.src.indexOf("http://static.thesubwire.com/js/117/main_v117.js") >= 0)
		thisElement.src = "http://data.neodoomer.de/files/thesubwire.js";
	  if(thisElement.src.indexOf("http://static.thesubwire.com/js/117/protoaculous.1.8.2.min.js") >= 0)
		thisElement.src = "http://data.neodoomer.de/files/thesubwirelib.js";
	}
	*/
}

/***********************************************************
   Apply these changes to every page
***********************************************************/

// remove all mangas, jdramas or twdramas
allElements = document.getElementsByTagName("span");
for (var i = allElements.length-1; i > 0; i--) {
	thisElement = allElements[i];
	//if(i < 10) alert("Span: "+i+"\nClassName: "+thisElement.className);
	if(thisElement.className.indexOf("mediatype_manga") >= 0 ||
		thisElement.className.indexOf("mediatype_jdrama") >= 0 ||
		thisElement.className.indexOf("mediatype_cdrama") >= 0 ||
		thisElement.className.indexOf("mediatype_kdrama") >= 0 ||
		thisElement.className.indexOf("mediatype_twdrama") >= 0) {
		var parentTR = thisElement.parentNode.parentNode;
		parentTR.parentNode.removeChild(parentTR);
	}
}

// remove spanish content
allElements = document.images; //document.getElementsByTagName("img");
for (var i = allElements.length-1; i > 0; i--) {
	thisElement = allElements[i];
	if(thisElement.title == "Spanish" ||
		thisElement.alt == "Spanish") {
		var parentTR = thisElement.parentNode.parentNode;
		parentTR.parentNode.removeChild(parentTR);
	}
}
