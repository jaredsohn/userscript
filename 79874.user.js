// ==UserScript==
// @name           WikipediaBot
// @namespace      David Jo
// @description    Generates a slide show in your browser of Wikipedia pages.
// @include        http://en.wikipedia.org/*
// @include        http://de.wikipedia.org/*
// @include        http://fr.wikipedia.org/*
// ==/UserScript==


//***********************************
// Vars
//***********************************

var as = document.getElementsByTagName("a");	// "a" elements from current page
var a = null; 					// link (a) element to follow
var i = 10;					// link counter
var trials = 0;					// trial counter
var maxTrialCount = 1000;			// max trial count, to avoid endless loop
var millisToWait = 1000 * getRandom(1, 15);	// seconds to wait between slides

//***********************************
// Functions
//***********************************

//sets new location of window to given url
function followLink(){
	window.location.href = a.href;
}

//generates random integer with between max and min
function getRandom( min, max ) {
	if( min > max ) {
		return( -1 );
	}
	if( min == max ) {
		return( min );
	}
 
        return( min + parseInt( Math.random() * ( max-min+1 ) ) );
}

//validates given url
//returns true if url can be followed
function isLinkValid(strLink){
	
	strURI = window.location.protocol + "//" + window.location.host + "/wiki"; // base url form current page
	if(strLink.indexOf(strURI) == 0				// is url not directing to a foreign site
			&& strLink.indexOf("#") == -1		// ignore anchors
			&& strLink.lastIndexOf(":") < 6) 	// watching for colons is a hack for wikipedia's file/... protocol
	{
		return true;
	}
	else{
		return false;
	}
}

//***********************************
// Start
//***********************************

//watch out for any valid random link on current page
while(a == null && trials < maxTrialCount){
	trials++;
	i= getRandom(1, as.length-1);
	if(i < as.length){
		strLink = as[i].href;
		if(isLinkValid(strLink))
		{
			a = as[i];
		}
	}

}

//follow new link
if(a != null){
	setTimeout(followLink, millisToWait); 	// wait some random seconds before following the given link
}
else{
 	alert("WikipediaBot stopped. No link was found after " + trials + " trials.");
}

//***********************************
// End
//***********************************