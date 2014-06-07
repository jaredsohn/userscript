// (c) Written by: Lior Zur, 2007
// Released under the GPL license (http://www.gnu.org/copyleft/gpl.html)
// v0.2 (6.4.2007)
//
// ==UserScript==
// @name           TAU Library Catalog Enhancer
// @namespace      http://mywebsite.com/myscripts
// @description    Improves Alef Catalog, of Tel-Aviv University's library.
// @include        http://genesis.tau.ac.il/*
// @include        http://taulib1.tau.ac.il/*
// @include        http://taulib.tau.ac.il/*
// ==/UserScript==

// Functions:
function $(id) {
  return document.getElementById(id);
}
function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}
function addGlobalStyle(css) { var head, style; head = document.getElementsByTagName('head')[0];
    if (!head) { return; } style = document.createElement('style');
    style.type = 'text/css'; style.innerHTML = css; head.appendChild(style);
}

//End functions

var currentURL = location.href;
var f;
var allElements, thisElement;
var reIsSearch = /\?func=scan/ //= "Search in Alphabetical listings" (from Basic search mostly, including Author, Title, Magazine.)
var reIsFind = /\?func=find/, reIsFind2 = /\?func=short/ //= actual listings of books. ("results of last search")
var reIsReprint = /\?func=service/ //="electronic reprint -- perhaps also other resources.

// Find out which page is it:
var isSearch = (reIsSearch.test(currentURL));
var isReprint = (reIsReprint.test(currentURL));
var isFind = (reIsFind.test(currentURL) || reIsFind2.test(currentURL));
// Are we in English or Hebrew mode?
allElements = $x("//a[contains(text(),'Your Library Card')]");
var isHebrewMode = (allElements.length <= 0)?true:false;


// Fix link mix-up when searching for authors (in Hebrew mode).
if (isSearch && isHebrewMode ) {
	allElements = $x("//a[contains(text(),'Cross References')]");
	for (f = 0; f < allElements.length; f++) {
		thisElement = allElements[f];
		thisElement.setAttribute("dir","ltr");
	}
}

// Automatically click "Agree" when viewing electronic reprints, and skip that license.
if (isReprint) {
	allElements = $x("//img[contains(@alt,'Link to Object')]/parent::a");
	if (allElements.length > 0)
		location.href = allElements[0].href;
}

// Highlight "electronic reprints" links (and fix javascript)
if (isFind) {
	// Any online resource:
	allElements = $x("//a[contains(@href,'service_type=MEDIA') and not(contains(text(),'Table of contents')) and not(contains(text(),'Publisher description'))]");
	for (f = 0; f < allElements.length; f++) {
		thisElement = allElements[f];
		thisElement.setAttribute ("dir","ltr");
		thisElement.style.backgroundColor = "#fffabd";
		thisElement.style.textDecoration = "none";
		thisElement.style.borderBottom = "#efb311 1px solid";
	}

	// Just the reprints, proper: (note - previous xpath should already include them.)
	allElements = $x("//a[contains(text(),'Electronic reprint.')]");
	for (f = 0; f < allElements.length; f++) {
		thisElement = allElements[f];
		thisElement.style.backgroundColor = "#ffee8b";
		thisElement.style.borderBottom = "#ffbf2c 1px solid";
	}	
	
  // Replace javascript links with regular ones.
	allElements = $x("//a[contains(@href,'service_type=MEDIA') and contains(@href,'javascript')]");
	for (f = 0; f < allElements.length; f++) {
		thisElement = allElements[f];
		thisElement.href = unescape(/\(['"](.+?)["']/.exec(thisElement.href)[1]); //this tiny bit is from http://userscripts.org/scripts/show/2014 (jillian)
	}
}

// Query if item is there.
if (isFind) {

	allElements = $x("//td[contains(@class,'page_title')]");
	var linkBookAvailability = document.createElement('a');
	linkBookAvailability.innerHTML = "&nbsp;Check Availability of Books&nbsp;";
	linkBookAvailability.setAttribute("id","gm_linkbookavail");
	addGlobalStyle('a#gm_linkbookavail { text-align:left; display: block; background-color: #fef8c7; border: 1px solid #eab742; width: 10em; font-size: 11px; color: #cc5401; cursor: pointer; padding: 1px 5px;}'+
                 'a#gm_linkbookavail:hover {background-color: red;}');
	allElements[0].appendChild(linkBookAvailability);
	linkBookAvailability.addEventListener("click",
	function () {	//Start Encapsulate BookAvailability functionality
	this.style.visibility = "hidden";
	///////////////////////////////////////////

	function initiateBookQuery (bookLink) {
		var myOriginalLink = bookLink; //Closure!
		GM_xmlhttpRequest({
		    method: 'GET', url: bookLink.href,
		    headers: { 'User-agent': 'Mozilla/4.0 (compatible)', 'Accept': 'application/atom+xml,application/xml,text/xml',  },
		    onload: function (responseDetails){
						//CLOSURE: myOriginalLink
						var isBookAvailable = analyzeAvailability (responseDetails.responseText);
						updateLinkStatus(myOriginalLink, isBookAvailable);
			    }
		}); //End xmlHttpRequest		    
	}

	function analyzeAvailability (response){
	// Analyze the HTML of a response and tell whether book is available
		var hebReturnDate = String.fromCharCode(1514, 1488, 1512, 1497, 1498, 32, 1492, 1495, 1494, 1512, 1492);
		var htmlReturnDate = "<!--" + ((isHebrewMode)?hebReturnDate:"Due date") + "-->"
		var i;
		while ((i = response.indexOf(htmlReturnDate))!= -1){
			response = response.substring (i + htmlReturnDate.length , response.length);
			if 	(response.substring(0 , 60).indexOf("></td>") != -1) //should be around 58, got spare.
				return true;
		}
		return false;
	}

	function updateLinkStatus (link, status){
	// Put an indication of availability next to a link.
		var newSpan = document.createElement('span');
		if (status) {
			newSpan.innerHTML = "&nbsp;<span style='font-size: 10px; color: #66db00; weight: bold;'>&nbsp;V&nbsp;</span>";
		} else {
			var hebNotAvailable = String.fromCharCode(1499,1504,1512,1488,1492,32,1488,1497,1503,32,1506,1493,1514,1511,32,1494,1502,1497,1503,46);
			newSpan.innerHTML = "&nbsp;&nbsp;<span style='font-size: 10px; color: #a82600; background: #ffb39e;'>" + hebNotAvailable + "</span>";
		}
		link.parentNode.appendChild(newSpan);
	}
	
	allElements = $x("//a[contains(@href,'func=item-global')]");
	for (f = 0; f < allElements.length; f++) {
		initiateBookQuery (allElements[f]);
	}

	///////////////////////////////////////////
	}//End Encapsulate BookAvailability functionality
	, true);

}//end isFind






/*
  <!--Due date--> 
  <td valign=top align=left class="text"></td> 

  <!--úàøéê äçæøä--> 
  <td valign=top align=left class="text" DIR="LTR"></td> 
*/
//http://genesis.tau.ac.il/F/7CA768S6XN2RQF36U4K89NKT1HUNNI8ASG1AH2V9JJRE3YNIJK-03573?func=item-global&doc_library=TAU01&doc_number=001226110&year=&volume=&sub_library=AC1
//<option value=LIM   SELECTED>
//Link to Object
