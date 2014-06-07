// ==UserScript==// @name          Twitter Auto Replace URL with bit.ly URL// @namespace     http://www.imusicmash.com// @description   Auto replace any Tweet URL with bit.ly URL as you type or paste in
// @include       http://twitter.com*

// ==/UserScript==

// create December 2008
// updated December 21, regular expression patch
// updated December 25, minor update to handle reply case from other's profile pg
// updated December 26, to handle https urls  
// updated May 2009, updated include url for Twitter's change
  
(function() {

// misc. variable declarations
var bitlyAPI = "http://api.bit.ly/shorten?version=2.0.1&login=shorter&apiKey=R_2546703adeade4dc850d14825242f183&format=xml&longUrl=";

var inputField; // will hold the Update input box content

// various regular expressions we'll need
var urlRegExp = new RegExp("https*:\/\/[^b][^i][^t]\\S.*\\s","im");
var urlRegExpG = new RegExp("https*:\/\/[^b][^i][^t]\\S.*?\\s", "gm");
var bitlyRegExp = new RegExp("http:\/\/bit.ly.*?\\s","i");

// find Twitter input field dom element
function locateUpdateField() {    	
    inputField = document.getElementById("status");
}

// Upon key-up event, come here to test for a new url, if found, replace it with bit.ly url
function testEntry() {
	
    var orig_update = inputField.value;
    if (urlRegExp.test(orig_update)) {        	
        var urlMatches = orig_update.match(urlRegExpG); // return array of all url matches
        // To Do: investigate why this script doesn't work properly if you paste in more than
        //        one url all at one in Tweet.  If you type more than one url or paste more than one 
        //        url one-url at a time, this script works fine.

        for (var i=0; i < urlMatches.length; i++) {        	        	
           var urlText = urlMatches[i];
           var bitlyAPIFull = bitlyAPI + urlText; // form full bit.ly API request url
 
           GM_xmlhttpRequest({           method: 'GET',           url: bitlyAPIFull,
           headers:{
               "User-Agent":"Mozilla/5.0",
               "Accept":"text/xml"
           },    
           onload: function(results) {
       	       var page = results.responseText; 
               var parser = new DOMParser();
               var dom = parser.parseFromString(results.responseText, "application/xml");
               var shortUrl = dom.getElementsByTagName('shortUrl')[0].textContent;
               
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

})(); 


