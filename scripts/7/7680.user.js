//
// Version 0.9.0 2/24/2007 3:15PM by mepex
//
// ==UserScript==
// @name           Salon Letters Collector
// @namespace      http://mywebsite.com/myscripts
// @description    A script that gathers all the letters from all the pages, and displays them on one long page.  Updated for new
//                 Salon Letters format as of April 2007.
// @include        http://letters.salon.com/*
// ==/UserScript==


//
//  Set debug to 1 to see debug output in Javascript console
//
var debug = 1;


// 
// Only print information to console if debug is on
//
function myGM_log(args) {
  if (debug == 1) {
    GM_log(args);
  }
}    

//
// Shortcut function to evalute an XPath in the document
//
function xpath(query, sourceDoc) {
  return document.evaluate(query, sourceDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

//
//    Written by Jonathan Snook, http://www.snook.ca/jonathan
//    Add-ons by Robert Nyman, http://www.robertnyman.com
//
function getElementsByClassName(oElm, strTagName, strClassName){
  var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
  var arrReturnElements = new Array();
  strClassName = strClassName.replace(/\-/g, "\\-");
  var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
  var oElement;
  for(var i=0; i<arrElements.length; i++){
      oElement = arrElements[i];      
      if(oRegExp.test(oElement.className)){
          arrReturnElements.push(oElement);
      }   
  }
  return (arrReturnElements)
}

//
// function that does an individual indexed request.  The index is important because we need to 
// process and display the results in the order we send them, not necessary the order the requests
// are returned.
//
function doRequest(fullLink, num) {
  myGM_log(num + " in doRequest: " + fullLink + "\n");
  try {
    GM_xmlhttpRequest({
      method:"GET",
      url:fullLink.toString(),
      headers:{
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
        'Accept': 'text/xml',
        },
      onload:function(details) {
        if (details.readyState == 4) {
          var capture = [
            fullLink.toString(),
            details.status,
            details.statusText,
            details.readyState,
            details.responseHeaders, 
            num
          ].join("\n");
          myGM_log(capture);
          resultsArray[num] = details.responseText;
          //parseLetters(num, details.responseText);         
          parseResults(num);
        }  
      }
    }); 
  } catch(ex) {
    myGM_log("caught: " + ex);
    alert(ex);
  }  
}  

//
// Does the logic to discover if the latest HTML returned is the next we should display.
// Also plays catch-up if the requests come back in an extremely odd order.
//    
function parseResults(num) {
  // see if most recent results are the next to display
  if (num - latestPage != 1) {
    return;
  }
  parseLetters(num, resultsArray[num]);
  latestPage = num;
  for (var i = latestPage+1; i < resultsArray.length; i++) {
    if (resultsArray[i] != null) {
      myGM_log("results for page " + i + " found too!  processing...\n");
      parseLetters(i, resultsArray[i]);
      latestPage = i;
    } else {
      myGM_log("no results for " + i + ".  halting...\n");
      break;
    }    
  }
}

// 
// Extracts the indidual letters from the retrieved page, appends each letter to list
//
function parseLetters(num, inString) {
  myGM_log("processing letters page " + num);
  var head = document.createElement('div');
  head.innerHTML = inString;   
  var letters = getElementsByClassName(head, 'li', 'letter_node');
  
  //
  // append all the letters before the node we inserted after the last letter
  //
  for (var i = 0; i < letters.length; i++) {
    insertLetterSpot.parentNode.insertBefore(letters[i], insertLetterSpot);
  } 
}

/////////////////////////////////////////////////////////////////////////////////////
//
//  MAIN STARTS HERE
//
/////////////////////////////////////////////////////////////////////////////////////


var letters = xpath("//li[@class='letter_node']", document);

myGM_log('checking letters exists');
myGM_log(letters.snapshotLength + ' letters present');

if (letters.snapshotLength == 0) return;

//
// Find links to individual pages of letters
//
var navlinks = xpath("//div[@class='pagination']", document);
myGM_log("found " + navlinks.snapshotLength + " pagination divs");
var item = navlinks.snapshotItem(0);
myGM_log("first letter_page_tools div: " + item);
var linksFound = item.getElementsByTagName('a');
myGM_log(linksFound.length + " links, first 'a' tag in div: " + linksFound);


//
// Create a helpful element that exists after the last letter. 
// This is where we will insert the letters we find in the other pages
//
var insertLetterSpot = document.createElement('div');
letters.snapshotItem(letters.snapshotLength-1).parentNode.insertBefore(insertLetterSpot, letters.snapshotItem(letters.snapshotLength - 1).nextSibling);

//
// Array to store individual page results
//
var resultsArray = new Array(linksFound.length-1);
myGM_log("expecting " + resultsArray.length + " more pages of letters");
var latestPage = -1;

//
// Iterate through all of the page links
//  
for (var i = 0; i < linksFound.length - 1; i++) {
  var fullLink = linksFound[i];
  var myLink = linksFound[i].attributes;
  var linkText = myLink[0].value;
  myGM_log("link " + i + ": " + fullLink.toString());
  // do something with thisElement
  //myGM_log("about to do GM_xmlhttpRequest");
  doRequest(fullLink, i);
  
//  try {
//    GM_xmlhttpRequest({
//      method:"GET",
//      url:fullLink.toString(),
//      headers:{
//        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
//        'Accept': 'text/xml',
//        },
//      onload:function(details) {
//        if (details.readyState == 4) {
//          var capture = [
//            fullLink.toString(),
//            details.status,
//            details.statusText,
//            details.readyState,
//            details.responseHeaders,
//            i
//          ].join("\n");
//          myGM_log(capture);
//          parseLetters(i, details.responseText);
//        }  
//      }
//    }); 
//  } catch(ex) {
//    myGM_log(ex)
//    alert(ex);
//  }  
}

//
// Remove individual page links from document, don't need them anymore
//
for (var i = 0; i < navlinks.snapshotLength; i++) {
  var item = navlinks.snapshotItem(i); 
  item.innerHTML = "";
} 
 
