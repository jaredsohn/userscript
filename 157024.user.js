// ==UserScript==
// @name        GoogleRanker
// @namespace   https://en.wikipedia.org/
// @include     https://en.wikipedia.org/wiki/Wikipedia
// @version     0.1
// @grant GM_xmlhttpRequest
// @grant GM_log
// ==/UserScript==

// For a given URL and keywords, figures out what the Google rank of the URL is - 
// i.e. if we google for a given keyword, on which position can we find the URL?
// (So if we google for "wikipedia", we'll find the English Wikipedia's main page on 
// position 1. If we google for "wiki", we'll find English Wikipedia's main page on 
// position 3.)
// 
// Note: This is NOT Google's "PageRank" but an approximation of a sort.
// Also note that the order can and will change over time.


var MAX_PAGES = 3;                                      // scans max. this many pages on Google
var keywords = "wiki";							        // string with the keywords
var url = "http://en.wikipedia.org/wiki/Wikipedia";	    // string with the url
var rank = -1; 											// the returned rating, zero if not found


function returnGoogleURL(query, offset=0){
	// returns a valid search Google URL, with an offset if provided
	// e.g. https://www.google.com/search?q=panic+of+1893&hl=en&&start=10
	
	var ret = "https://www.google.com/search?q=" + encodeURI(query.replace(/ /g,"+")) + "&hl=en";
	if(offset>0){
		ret += "&start="+offset;
	}
	return ret;
}

function takeOut(str, begin, end){
  // Finds the string between begin and end in str, and strips off white characters. If there are several matches, returns only the first one.
  // Returns empty string if not found.

  //GM_log('Looking for something between' + begin + ' and ' + end);

  //GM_log("takeOut(): "+ begin+" "+end + ' ' + str.length);
  var theBegin = str.indexOf(begin);
  if(theBegin == -1){
    //GM_log("takeOut(): Didn't find string between "+begin+" and "+end);
    return "";
  }
  var afterBegin = theBegin + begin.length;
  //GM_log("takeOut(): " + str.indexOf(end, afterBegin) + ' ' + afterBegin);
  var found = str.slice( afterBegin, str.indexOf(end,afterBegin) );

  //GM_log('Search found:' + found);
  return found.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); // strip white space function from http://blog.stevenlevithan.com/archives/faster-trim-javascript

}

function findBetween(str, begin, middle, end){
  // finds if a string contains the "middle" between "begin" and "end" and returns the whole part including begin and end
  // needs a doublecheck if the indices are calculated and used correctly...

  var posB = str.indexOf(begin);
  var posM = str.indexOf(middle, posB + begin.length);
  var posE = str.indexOf(end, posM + middle.length);
  var posB = str.slice(0,posM).lastIndexOf(begin);
  
  var found = str.slice(posB, posE + end.length);
  return found;
}


function execOnPage(link, url, keywords, callingFunction, pageNum=0){
  // Gets the page from the URL link and performs callingFunction on it.

  GM_xmlhttpRequest({
    method: "GET",
    url: link,
    headers: {
      "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
      "Accept": "text/xml"            // If not specified, browser defaults will be used.
    },
    onload: function(response) {

      // It is a page, but first let's check for a 404.
      if(response.status == 404){
        GM_log([
          "404 - Page not found! Report:",
          response.status,
          response.statusText,
          response.readyState,
          response.responseHeaders,
          //response.responseText,
          response.finalUrl,
          "End of report."
        ].join("\n"));
        return;
      }
	
      /*GM_log([
        "Beginning of page notes:",
        response.status,
        response.statusText,
	    response.responseText,
        response.readyState,
        response.responseHeaders,
        response.finalUrl,
        "End of page notes."
      ].join("\n"));*/
    
      var res = response.responseText;

      callingFunction(res, url, keywords, pageNum);

    },
    onerror: function(response) {
      GM_log([
        "Beginning of error message:",
        response.status,
        response.statusText,
        response.readyState,
        response.responseHeaders,
        response.responseText,
        response.finalUrl,
        "End of error message."
      ].join("\n"));
    
    }

  });

}

function process_Google_page(page, url, keywords, pageNum=0){
  // Processing a Google search page ...
  // Note: images etc. can distort the ranking, especially on the first results page. TBD.
  // Note: has only been tested with simple links without any special characters, beware.

  var doc = document.implementation.createHTMLDocument("Google");
  doc.documentElement.innerHTML = page;
  
  elements = doc.getElementsByClassName("g");
  GM_log(elements.length + " results found.");
  for (var i = 0; i < elements.length; i++) {
    GM_log(i + ", inner: " + elements[i].innerHTML);
	var url1 = takeOut(elements[i].innerHTML, 'href="/url?q=', '&amp;sa=');	// it's actually the very first link; watch out for the formatting...
	GM_log(i + ", url1: " + url1);
	if(url1 == url){
	  rank = pageNum*10 + i+1;
      alert("I found the URL "+ url +" for the keywords '"+ keywords +"' at position "+rank+"!");
      return;
	}
  }
  
  pageNum += 1;

  // if not found yet, let's continue the search
  if( pageNum < MAX_PAGES ){
    var goog = returnGoogleURL(keywords, pageNum*10);
    GM_log("Searching with: "+goog);
    execOnPage(goog, url, keywords, process_Google_page, pageNum);
  }else{
    alert("Haven't found the URL "+ url +" for the keywords '"+ keywords +"' :( ");
  }
  
}

function start_Google_scan(url, keywords){
  // starts a scan for the sought data

  var goog = returnGoogleURL(keywords, 0);
  GM_log("Searching with: "+goog);
  execOnPage(goog, url, keywords, process_Google_page, 0);
}


GM_log('Starting...');
start_Google_scan(url, keywords);
