// ==UserScript==
// @name Pinboard - Sort Visible Links(modified)
// @namespace http://murklins.talkoncorners.net
// @description A modified version of Pinboard - Sort Visible Links, compatible with Pinboard.in bookmarks with favicons (http://userscripts.org/scripts/show/94151)
// @version 0.1
// @include http://pinboard.in/*
// @include http://www.pinboard.in/*
// @include https://pinboard.in/*
// @include https://www.pinboard.in/*
// @exclude http://pinboard.in/popular/*
// @exclude http://www.pinboard.in/popular/*
// @exclude https://pinboard.in/popular/*
// @exclude https://www.pinboard.in/popular/*
// @exclude http://pinboard.in/add*
// @exclude http://www.pinboard.in/add*
// @exclude https://pinboard.in/add*
// @exclude https://www.pinboard.in/add*
// @exclude http://pinboard.in/url:*
// @exclude http://www.pinboard.in/url:*
// @exclude https://pinboard.in/url:*
// @exclude https://www.pinboard.in/url:*
// ==/UserScript==

var main_node;
var postArr = [];

// if can't find pinboard element, exit
main_node = document.getElementById("pinboard")
if (!main_node) {
  return;
}

// gather up all the bookmarks and fill the postArr
var bookmarks = fillPostArr();
if (bookmarks.snapshotLength == 0) {
  // no bookmarks, so exit
  return;
}

// add the sorting options div just above the first bookmark
var firstBookmark =  getBookmarkContainer(bookmarks.snapshotItem(0));
var sortVisDiv = document.createElement("div");
sortVisDiv.id = "gm_sortVisDiv";
firstBookmark.parentNode.insertBefore(sortVisDiv, firstBookmark);

// add the sort links	
sortVisDiv.appendChild(document.createTextNode("Visible Sorted By ("));
createSortLink("title", postSortTitle, sortVisDiv);
sortVisDiv.appendChild(document.createTextNode(" | "));
createSortLink("url", postSortUrl, sortVisDiv);
sortVisDiv.appendChild(document.createTextNode(" | "));
createSortLink("pop", postSortPop, sortVisDiv);
sortVisDiv.appendChild(document.createTextNode(" | "));
createSortLink("default", postSortDefault, sortVisDiv);	
sortVisDiv.appendChild(document.createTextNode(")"));

function fillPostArr() {
  // clear array
  postArr = [];
  
  // get all the bookmarks
  var bookmarks = document.evaluate("//div[contains(@class, 'bookmark ')]", main_node, null,
                                      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  
  var p;
  for (var i = 0; i < bookmarks.snapshotLength; i++) {      
    var b = bookmarks.snapshotItem(i); 
    
    // get the number of people who saved the link
    var people = document.evaluate("./div[contains(@class, 'display')]/a[contains(@class, 'url_link')]", 
                                    b, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);                  
    var popularity = 0;
    if (people.snapshotLength > 0) {
      popularity = people.snapshotItem(0).innerHTML;
      // format is "3 others" so just take the piece before the space
      popularity = popularity.split(" ")[0];
    }				
    
    // get the link and title
    var postLink = document.evaluate("./div[contains(@class, 'display')]/a[contains(@class, 'bookmark_title')]", 
                                      b, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var t = "";
    var l = "";
    if (postLink.snapshotLength > 0) {
      //Using along with Pinboard.in bookmarks with favicons (http://userscripts.org/scripts/show/94151)
      //would cause sorting by title unavailable.
      //Use text rather than innerHTML to get bookmark title can fix this.

      //t = postLink.snapshotItem(0).innerHTML;
      t = postLink.snapshotItem(0).text;
      l = postLink.snapshotItem(0).getAttribute("href");
    }
    
    p = getBookmarkContainer(b);
    
    // add the post to the array
    postArr[postArr.length] = new PopPost(p, i, t, l, popularity);					
  }
  
  return bookmarks;
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
		
		// get all the bookmarks
    var bookmarks = document.evaluate("//div[contains(@class, 'bookmark ')]", main_node, null,
                                      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    
    if (bookmarks.snapshotLength != postArr.length) {
			// woops! so the postArr no longer has the same number of posts in it as there are posts on the page
			// usually this is because another GM script, like Autopagerize, has messed with the page since
			// we first grabbed all the posts. No problem, though, just re-fill the array.
			
			// But first, before we refill the post array, make sure we restore the default sort order to the 
			// posts that may have already benn sorted one or more times, otherwise our new default order 
			// will be... not very default.
			doSort(bookmarks, postArr.length, postSortDefault, "default");
			
			fillPostArr();
		}
		
		// do the sort!
		doSort(bookmarks, bookmarks.snapshotLength, sortFunction, this.innerHTML);
		
	}, false);		
	
	return a;
}

function doSort(bookmarks, numRemove, sortFunction, currentSortText) {
	// first remove all the posts from the DOM
	var list;
	var next;
	for (var i = 0; i < numRemove; i++) {
	  var post = getBookmarkContainer(bookmarks.snapshotItem(i));
	  list = post.parentNode;
	  if (post.nextSibling) {
	    next = post.nextSibling;
	  }
		list.removeChild(post);
	}
	
	// why are autopagerize links getting added to the top of the list if a sort is triggered before the pagerize?
	// WHYYYYYYYYYYYYYYYYYYY. I don't really want to read the autopagerize code, so let's assume that the next page's
	// posts are pre-loaded into the bookmark list and we need to append our sorted links BEFORE them.
	//var remainingChild;
	//if (list.firstChild) {
		//remainingChild = list.firstChild;
	//}
	

	// sort the post array using the passed in sort function and then add the posts in their new order as list children
	postArr.sort(sortFunction);
	
	/*
	for (var i = 0; i < postArr.length; i++) {
		//if (remainingChild) {
			//list.insertBefore(postArr[i].post, remainingChild);
		//}
		if (next) {
			list.insertBefore(postArr[i].post, next);
		}
		else {
			list.appendChild(postArr[i].post);
		}
	}
	*/
	
  // insert the nodes back by finding the next sibling of the sort option div
  // if no sibling exists, we'll just append to the sort option div's parent
  var parent = sortVisDiv.parentNode;
  var insertBefore = null;
  if (sortVisDiv.nextSibling) {
    insertBefore = sortVisDiv.nextSibling;
  }
  
  // add the posts in their new order
  for (var i = 0; i < postArr.length; i++) {
    if (insertBefore) {
      parent.insertBefore(postArr[i].post, insertBefore);
    }
    else {
      parent.appendChild(postArr[i].post);
    }
  }
		
  // for compatibility with my own Pinboard - Date Lines GM script, 
  // hide date lines on all but default sort order
  var dateLineDivs = document.evaluate("//div[contains(@class, 'gm_datelines_newdate')]", main_node, null,
                                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                    null);
  for (var i = 0; i < dateLineDivs.snapshotLength; i++) {
    if (currentSortText == "default") {
      dateLineDivs.snapshotItem(i).style.display = "block";
    }
    else {
      dateLineDivs.snapshotItem(i).style.display = "none";      
    }
  }
	
	// highlight this link to indicate that it is on, deselect the other links
	var sortLinks = document.evaluate("//a[contains(@class, 'gm_sortVisLink')]", main_node, null,
	                            						XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	                            						null);
	for (var i = 0; i < sortLinks.snapshotLength; i++) {			
		sortLinks.snapshotItem(i).className = "gm_sortVisLink";
		if (sortLinks.snapshotItem(i).innerHTML == currentSortText) {
			sortLinks.snapshotItem(i).className = "gm_sortVisLinkOn";
		}
	}
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

// bookmarks you can edit have an extra containing div, so look for it
// and use it as the main post node
function getBookmarkContainer(node) {
  var container = node;
  var parent = node.parentNode;
  if (parent.id != "bookmarks") {
    var node = parent.firstChild;
    while (node) {
      if (node.className == "edit_checkbox") {
        container = parent;
        break;
      }
      node = node.nextSibling;
    }
  }
  return container;
}

GM_addStyle(
  'div#gm_sortVisDiv { margin: 7px 0; }' +
	'div#gm_sortVisDiv a.gm_sortVisLinkOn { color: blue; }' +
	'div#gm_sortVisDiv a { color: #999; }'
);
