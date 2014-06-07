// ==UserScript==
// @name           FacebookBot
// @namespace      David Jo
// @description    Genrates a slide show from facebook user profiles.
// @include        http://*.facebook.com/people/*
// ==/UserScript==

/*
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*/

//***********************************
// Vars
//***********************************

var as = document.getElementsByTagName("a");	// "a" elements from current page
var a = null; 					// link (a) element to follow
var i = 10;					// link counter
var trials = 0;					// trial counter
var maxTrialCount = 1000;			// max trial count, to avoid endless loop
var millisToWait = 10000;	// seconds to wait between slides

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
	
	strLinkPart = strLink.substring(strLink.indexOf("."));
	
	strURI = window.location.protocol + "//" + window.location.host + "/people"; // base url form current page
	strURIPart = strURI.substring(strURI.indexOf("."));
	
	if(strLinkPart.indexOf(strURIPart) == 0)
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
 	alert("FacebookBot stopped. No link was found after " + trials + " trials.");
}

//***********************************
// End
//***********************************