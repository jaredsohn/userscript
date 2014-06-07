// ==UserScript==
// @name          URL Shortener
// @namespace     http://g00.nl
// @description   Auto replace any Tweet URL with g00.nl URL as you type or paste in
// @include       http://twitter.com*
// @require       http://www.openjs.com/scripts/xml_parser/xml2array.js

// ==/UserScript==

// created April 2011

(function() {
// misc. variable declarations
var g00API = "http://g00.nl/g00-api.php?signature=2351438986&action=shorturl2&format=xml&url=";
var usListAPI = "http://g00.nl/g00-api.php?signature=2351438986&format=xml&action=us-list";
var usList = 'test';
var inputField; // will hold the Update input box content

// various regular expressions we'll need
var urlRegExp = new RegExp("https*:\/\/\\S.*\\s","im");
var urlRegExpG = new RegExp("https*:\/\/\\S.*?\\s", "gm");
var g00RegExp = new RegExp("http:\/\/g00.nl.*?\\s","i");

// find Twitter input field dom element
function locateUpdateField() {    	
    inputField = document.getElementsByClassName("twitter-anywhere-tweet-box-editor")[0];
}

function init(){
	GM_xmlhttpRequest({
		method: "GET",
		url: usListAPI,
		onload: function(results){
			var page = results.responseText;
			var parser = new DOMParser();
			var dom = parser.parseFromString(results.responseText, "application/xml");			
			var array = xml2array(dom);
			usList = array.result.list;
			
			//start script
			setTimeout(setUp, 1000);
			
		}
	});
	
}

// Upon key-up event, come here to test for a new url, if found, replace it with g00.nl url
function testEntry() {
    var orig_update = inputField.value;
    if (urlRegExp.test(orig_update)) {        	
        var urlMatches = orig_update.match(urlRegExpG); // return array of all url matches
        // To Do: investigate why this script doesn't work properly if you paste in more than
        //        one url all at one in Tweet.  If you type more than one url or paste more than one 
        //        url one-url at a time, this script works fine.

        for (var i=0; i < urlMatches.length; i++) {        	        	
           var urlText = urlMatches[i];
		   for(j in usList){
		   	if (usList[j] == urlText.substring(0, usList[j].length))
			{
				return false;
			}
		   }
		   
           var g00APIFull = g00API + urlText; // form full g00.nl API request url
           GM_xmlhttpRequest({
           method: 'GET',
           url: g00APIFull,
           headers:{
               "User-Agent":"Mozilla/5.0",
               "Accept":"text/xml"
           },    
           onload: function(results) {
       	       var page = results.responseText; 
               var parser = new DOMParser();
               var dom = parser.parseFromString(results.responseText, "application/xml");
               var shorturl = dom.getElementsByTagName('shorturl')[0].textContent;
               
               var urlTextRE = urlText.replace("\?","\\?");               
               var specificUrlRegExp = new RegExp(urlTextRE, "m");

               var updated = orig_update.replace(specificUrlRegExp, shorturl);
          
               inputField.value = updated + ' ';                              

           }
           }); // end of ajax api request to g00.nl       
           
        } // end for loop for each non-g00.nl url we found
        
    } // end of test for existance of non-g00.nl url
    
    
} // end of testEntry function.

function setUp() {
	locateUpdateField();
        if (inputField) {
	    inputField.addEventListener("keyup", function(){setTimeout(testEntry, 1000);}, false);
        } else {
            setTimeout(setUp, 1000);
        }
}
init();
}
)();