// ==UserScript==
// @name           Automatic bit.ly URLs for Twitter & HootSuite
// @namespace      http://www.DJosephDesign.com
// @description    Automatically replaces URLs with Bit.ly-shortened URLs after you type them into Twitter.com or HootSuite. This uses a default API unless you specify a personal one through the Greasemonkey Menu.
// @include        http://hootsuite.com*
// @include        http://twitter.com*
// ==/UserScript==

// Changelog
// Version 1.1 beta 1: Added support for bit.ly Pro domains
// Version 1.0.2: Fixed HootSuite URL so "dashboard#" would work—for real this time.
// Version 1.0.1: Fixed HootSuite URL so "dashboard#" would work.
// Version 1.0: launched on February 18, 2010
  
(function() {
// Default API settings

var defaultLogin = "bitly4twitter";
var defaultKey = "R_30f2a3fce5b1847377182f20ee3cb859";

// Pull stored API settings from the Firefox preferences
var apiLogin = GM_getValue( "apiLogin");
var apiKey = GM_getValue( "apiKey");

// Sets the internal values
function setAPIvalues() {
	apiLogin = GM_getValue( "apiLogin");
	apiKey = GM_getValue( "apiKey");
}
// Check if there's an API login or key stored. If not, then prompt for them both
if (apiLogin == null || apiKey == null) {
	resetAPI();
}

// Add change and clear options to the menu
GM_registerMenuCommand( "Enter my own bit.ly API settings", setBitlyAPI );
GM_registerMenuCommand( "Reset bit.ly API settings", resetAPI );
// GM_registerMenuCommand( "Clear", clearAPI );

// Resets the API settings to defaults
function resetAPI() {
	GM_setValue( "apiLogin", defaultLogin );
	GM_setValue( "apiKey", defaultKey );
	setAPIvalues();
}

// Clear the API settings
function clearAPI() {
	GM_deleteValue( "apiLogin" );
	GM_deleteValue( "apiKey" );
	setAPIvalues();
}

// Prompt for and set the API login and key
function setBitlyAPI() {
	var personalLogin = apiLogin;
	var personalKey = apiKey;
	// Empty the promts if the default API login and key are being used
	if (personalLogin == defaultLogin || personalKey == defaultKey) {
		personalLogin = null;
		personalKey = null;
	};
	GM_setValue("apiLogin", prompt("What is your bit.ly API login?", personalLogin) );
	GM_setValue("apiKey", prompt("What is your bit.ly API key?", personalKey) );
	setAPIvalues();
}

// misc. variable declarations
var bitlyAPI = "http://api.bit.ly/shorten?version=2.0.1&login="+apiLogin+"&apiKey="+apiKey+"&format=xml&longUrl=";

var inputField; // will hold the Update input box content

// various regular expressions we'll need
var urlRegExp = new RegExp("https*:\/\/[^b][^i][^t]\\S.*\\s","im");
var urlRegExpG = new RegExp("https*:\/\/[^b][^i][^t]\\S.*?\\s", "gm");
var bitlyRegExp = new RegExp("http:\/\/bit.ly.*?\\s","i");

// find Twitter input field dom element
function locateUpdateField() {
	if (document.domain =="hootsuite.com") {
		inputField = document.getElementById("messageBoxMessage");
	}
	else if (document.domain =="twitter.com") {
		inputField = document.getElementById("status");
	}
}

// Upon key-up event, come here to test for a new url, if found, replace it with bit.ly url
function testEntry() {
	
    var orig_update = inputField.value;
    if (urlRegExp.test(orig_update)) {        	
        var urlMatches = orig_update.match(urlRegExpG); // return array of all url matches
        // To Do: investigate why this script sometimes doesn't work properly if you paste in more than
        // one url all at one in Tweet. If you type more than one url or paste more than one 
        // url only one url at a time, this script always works fine.

        for (var i=0; i < urlMatches.length; i++) {        	        	
           var urlText = urlMatches[i];
           var bitlyAPIFull = bitlyAPI + urlText; // form full bit.ly API request url
 
           GM_xmlhttpRequest({
           method: 'GET',
           url: bitlyAPIFull,
           headers:{
               "User-Agent":"Mozilla/5.0",
               "Accept":"text/xml"
           },    
           onload: function(results) {
       	       var page = results.responseText; 
               var parser = new DOMParser();
               var dom = parser.parseFromString(results.responseText, "application/xml");
			   var shortCNAMEUrl = dom.getElementsByTagName('shortCNAMEUrl')[0].textContent;
			   if (shortCNAMEUrl == null) {
					var shortUrl = dom.getElementsByTagName('shortUrl')[0].textContent;
			   }
			   else {
					var shortUrl = dom.getElementsByTagName('shortCNAMEUrl')[0].textContent;
			   }
               
               var urlTextRE = urlText.replace("\?","\\?");               
               var specificUrlRegExp = new RegExp(urlTextRE, "m");

               var updated = orig_update.replace(specificUrlRegExp, shortUrl);
          
               inputField.value = updated + ' ';                              

           }
           }); // end of ajax api request to bit.ly       
           
        } // end for loop for each non-bit.ly url we found
        
    } // end of test for existance of non-bit.ly url
    
    
} // end of testEntry function.


locateUpdateField();

inputField.addEventListener("keyup", function(){setTimeout(testEntry,200);}, false);

}
)();