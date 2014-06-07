// Google Dual Index 1.6
// Sean LeBlanc
// http://sean-leblanc.blogspot.com
// Contact seanleblanc AT comcast DOT net
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Google Dual Index 1.5", and click Uninstall.
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//
// Puts google index on top of page, too.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Dual Index 1.6
// @namespace     http://sean-leblanc.blogspot.com
// @description	  Puts index of results pages on the top of the page as well.
// @include       http://*.google.*
//
// @version       1.6 Updated to be able to find index.


// History:

// 1.6 - Updated to find index.
// 1.5 - Updated to be able to find navigation.
// 1.4 - Updated to fix blog search - was inserting after first result.
// 1.3 - Updated to work on main page; added blogsearch.


// TODO: Do blogger search.

// ==/UserScript==
//var debug = true;
var WEB = 0;
var IMAGES = 1;
var GROUPS = 2;
var NEWS = 3;
var FROOGLE = 4;
var BLOG = 5;
var searchType = -1;



// Simplify evaluate call:
function xpathFirst(query, node) {
	//slog("Entering xpathfirst.");
    if (!node) {
    	slog("xPathFirst: Using document for node value.");
        node = document;
    }
    
    var result = document.evaluate(query, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if (!result) {
    	//slog("xpathFirst: Result was false.");
        return;
    }
    //slog("xpathFirst: Returning singlenodevalue.");
    return result.singleNodeValue;
}

// Set search type of the current google page:
function setSearchType() {
	if (window.location.href.match(/www\.google/)) {
		slog("Search type is WEB.");
        searchType = WEB;
    }
    else if (window.location.href.match(/images\.google/)) {
        searchType = IMAGES;
    }
    else if (window.location.href.match(/groups\.google/)) {
        searchType = GROUPS;
    }
    else if (window.location.href.match(/news\.google/)) {
    	searchType = NEWS;
    }
    else if (window.location.href.match(/froogle\.google/)) {
    	searchType = FROOGLE;
    }
    else if (window.location.href.match(/blogsearch\.google/)) {
    	searchType = BLOG;
    }
}

// Find the index of results:
function findIndexDiv() {
	var id = null;
	var searchString = "//div[@id='navcnt']";
	
	if (searchType==GROUPS) {
		searchString = "//table[@id=\"bottom\_marker\"]";
	}
	//slog ("Search string:" + searchString);
	id = xpathFirst(searchString);
	//slog ("ID returned: " + id);
	return id;
}

// Find element we should place copy of search index before:
function findTopDiv() {
    var td = null;
    var searchString = "//div[@id='res']";
    slog("Search type = " + searchType);
    if (searchType == WEB) {
        slog("Searching for " + searchString);
        td = xpathFirst(searchString);      
    }
    else if (searchType == IMAGES) {
    	td = xpathFirst("//div[@id=\"ImgContent\"]");
    	slog("Images top div found.");
    }
    else if (searchType == NEWS) {
        td = xpathFirst("//body//table[@align=\"right\"]");
    }
    else if (searchType == GROUPS) {
    	var tbl = xpathFirst("//div[@id=\"cbdy\"]//div//table");
    	td = tbl.nextSibling.nextSibling;
    }
    else if (searchType == FROOGLE) {
    	td = xpathFirst("//table//tbody//tr[@class=\"bc\"]");
    }
    else if (searchType == BLOG) {
    	//td = xpathFirst("//p[@class=\"g\"]");
    	td = xpathFirst("//a[@id=\"p-1\"]");
    }
    return td;
}

setSearchType();
slog("About to find index div.");
var indexDiv = findIndexDiv();
if (indexDiv) {
    slog("Found index div; about to find top div.");
    var topDiv = findTopDiv();
    if (topDiv) {
        slog("Found top div.");
        var parentDiv = topDiv.parentNode;
        var newDiv = indexDiv.cloneNode(true);
        if (searchType==FROOGLE) {
			var newTr = document.createElement("tr");
			var newTd = document.createElement("td");
			parentDiv.insertBefore(newTr, topDiv.nextSibling);
			newTd.setAttribute("colspan", "3");
			newTr.appendChild(newTd);
			newTd.appendChild(newDiv);

		}
        else {
	        parentDiv.insertBefore(newDiv, topDiv);
		}
    }
}

function slog(writeThis) {
	if (false) { GM_log(writeThis); }
}



