// ==UserScript==
// @name Delicious.com - Sort Visible Links
// @namespace http://murklins.talkoncorners.net
// @description Sort all the links on the page by their title, URL or popularity.
// @include http://delicious.com/*
// @include http://www.delicious.com/*
// ==/UserScript==

var main_node = document.getElementById("bd");
var postArr = [];
var displayOpts;
var displayDiv;

// if we're on a search results page, we need to insert the sort options differently
if (window.location.href.indexOf("/search?") != -1) {
	// first look for a second results list (a results page with multiple summary result sets has
	// separate ul lists for each set, named srch0-bookmarklist, srch1-bookmarklist, etc.) because
	// we only want to show sort options on pages with one single, full result set.
	var resultslist = document.evaluate(".//ul[@id = 'srch1-bookmarklist']", main_node, null,
                              XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                              null);
	if (resultslist.snapshotLength == 0) {  
		// no second result set found, which means we *should* try to add the sort options
		resultslist = document.evaluate(".//ul[@id = 'srch0-bookmarklist']", main_node, null,
                              	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                              	null);
		if (resultslist.snapshotLength != 0) {
			// found a results list!
			// the search page doesn't provide any display options, so add a div for that just above the results
			displayOpts = document.createElement("div");
			displayOpts.id = "displayOptions";
			resultslist = resultslist.snapshotItem(0);
			resultslist.parentNode.insertBefore(displayOpts, resultslist);
		}
	}	
}

// if there's a bmOpts div, use it, otherwise add one
var divs = document.evaluate("//div[@id ='displayOptions']/div[@id = 'bmOpts']", main_node, null,
                                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                  null);
if (divs.snapshotLength == 0) {
	divs = document.evaluate("//div[@id ='displayOptions']", main_node, null,
                                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                  null);
	if (divs.snapshotLength != 0) {
		displayOpts =  divs.snapshotItem(0);
	}
	if (displayOpts) {
		displayDiv = document.createElement("div");
		displayDiv.id = "bmOpts";
		displayDiv.class = "optsMod";
		displayOpts.appendChild(displayDiv);  
	}
}
else {
	displayDiv = divs.snapshotItem(0);
}
	
// if we were successful in finding a place to stick the sorting options then add them
if (displayDiv) {
	var sortVisDiv = document.createElement("div");
	sortVisDiv.id = "gm_sortVisDiv";
	if (displayDiv.firstChild) {
		displayDiv.insertBefore(sortVisDiv, displayDiv.firstChild);
	}
	else {
		displayDiv.appendChild(sortVisDiv);
	}
	
	sortVisDiv.appendChild(document.createTextNode("Visible Sorted By ("));
	createSortLink("title", postSortTitle, sortVisDiv);
	sortVisDiv.appendChild(document.createTextNode(" | "));
	createSortLink("url", postSortUrl, sortVisDiv);
	sortVisDiv.appendChild(document.createTextNode(" | "));
	createSortLink("pop", postSortPop, sortVisDiv);
	sortVisDiv.appendChild(document.createTextNode(" | "));
	createSortLink("default", postSortDefault, sortVisDiv);	
	sortVisDiv.appendChild(document.createTextNode(")"));
}

function createSortLink(linkText, sortFunction, parentDiv) {
	var a = document.createElement("a");
	a.innerHTML = linkText;
	a.className = "gm_sortVisLink";
	a.href = "";
	if (linkText == "default") {	
		a.className = a.className + " gm_sortVisLinkOn";
	}
	parentDiv.appendChild(a);
	
	a.addEventListener("click", function(event) {
		event.stopPropagation();		
		event.preventDefault();
		
		// get all the posts
		var bookmarks = document.evaluate("//li[contains(@class, 'post')]/div[contains(@class, 'bookmark')]", main_node, null,
                              		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                              		null);
		
		if (postArr.length == 0) {
			// this is the first time a sort has been triggered! Populate the post array.			
			
			// if there are any posts with dates on the page, we need to make sure ALL the posts have dates
			var dates = document.evaluate("//li[contains(@class, 'post')]/div[contains(@class, 'bookmark')]/div[contains(@class, 'dateGroup')]", main_node, null,
			                              XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			                              null);
			var addDates = false;
			if (dates.snapshotLength > 0) {
				addDates = true;
			}

			var curDate = "";                
			for (var i = 0; i < bookmarks.snapshotLength; i++) {      
			  var b = bookmarks.snapshotItem(i); 
			  var p = b.parentNode;
			  
			  // iterate down until we hit a dateGroup div, a data div, or run out of kids
			  if (addDates) {
				  var dg = b.firstChild;
				  while (dg != null && dg.className != "dateGroup" && dg.className != "data") {
				  	dg = dg.nextSibling;
				  }
				  if (dg != null) {
					  if (dg.className == "dateGroup") {
					  	// a dateGroup was found! set this date as the new gold standard.
					  	dg = dg.firstChild;
					  	while (dg != null && dg.nodeName != "SPAN") {
					  		dg = dg.nextSibling;
					  	}
					  	if (dg != null) {
					  		curDate = dg.getAttribute("title");
					  	}
					  	else {
					  		curDate = "";
					  	}
					  }
					  else {
					  	var dateDiv = document.createElement("div");
					  	var span = document.createElement("span");
					  	span.innerHTML = curDate;
					  	span.setAttribute("title", curDate);
					  	dateDiv.className = "dateGroup gm_sortVisDate";
					  	dateDiv.style.display = "none";
					  	dateDiv.appendChild(span);
					  	b.insertBefore(dateDiv, dg);
					  }
					}
				}				
					
				// look in the bookmark div for the number of people who saved the link				
				// the search results page uses different HTML for the number of saves
				var people = document.evaluate("./div[@class = 'data']/div[@class = 'actions']/div[contains(@class, 'savers')]/a[(@class = 'delNav') or (@class = 'saveCount')]/span", b, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);                                
				var popularity = 0;
				if (people.snapshotLength > 0) {
					popularity = people.snapshotItem(0).innerHTML;
				}				
				
				// look in the bookmark div for the link 
				var postLink = document.evaluate("./div[@class = 'data']/h4/a[contains(@class, 'taggedlink')]", b, null,
			                                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			                                  null);
				var t = "";
				var l = "";
				if (postLink.snapshotLength > 0) {
					t = postLink.snapshotItem(0).innerHTML;
					l = postLink.snapshotItem(0).getAttribute("href");
				}			
				
				// add the post to the array
				postArr[postArr.length] = new PopPost(p, i, t, l, popularity);					
			}
		}
		
		// OK! So all the posts are in our post array -- go ahead and do the sort
		var list;
		for (var i = 0; i < bookmarks.snapshotLength; i++) { 
			// remove all the posts
			var post = bookmarks.snapshotItem(i).parentNode;
			list = post.parentNode;
			list.removeChild(post);
		}
		// sort the post array using the passed in sort function and then add the posts in their new order as list children
		postArr.sort(sortFunction);
		for (var i = 0; i < postArr.length; i++) {
			list.appendChild(postArr[i].post);
		}
		// show or hide the extra date groups		
		var extraDates = document.evaluate("//div[contains(@class, 'gm_sortVisDate')]", main_node, null,
                            						XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                            						null);
		for (var i = 0; i < extraDates.snapshotLength; i++) {
			if (this.innerHTML != "default") {
				extraDates.snapshotItem(i).style.display = "block";
			}
			else {
				extraDates.snapshotItem(i).style.display = "none";
			}
		}
		// highlight this link to indicate that it is on, deselect the other links
		var sortLinks = document.evaluate("//a[contains(@class, 'gm_sortVisLink')]", main_node, null,
                            						XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                            						null);
		for (var i = 0; i < sortLinks.snapshotLength; i++){			
			sortLinks.snapshotItem(i).className = "gm_sortVisLink";
		}
		this.className = this.className + " gm_sortVisLinkOn";
	}, false);		
	
	return a;
}

function PopPost(p, d, t, h, pop) {
	this.post = p;
	this.defaultOrder = d;
	this.title = t;
	this.link = h;
	this.pop = pop;
}
function postSortDefault(a, b) {
	return a.defaultOrder - b.defaultOrder;
}
function postSortTitle(a, b) {
	var x = a.title.toLowerCase();
	var y = b.title.toLowerCase();
	return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}
function postSortUrl(a, b) {
	var x = a.link;
	var y = b.link;
	return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}
function postSortPop(a, b) {
	return b.pop - a.pop;
}

addGlobalStyle(
	'div#displayOptions div#bookmarks-shown { margin-left: 10px; }' + 
	'div#gm_sortVisDiv a.gm_sortVisLinkOn { background-color: #EFF5FB; font-weight: bold; }'
);

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}