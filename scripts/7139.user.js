// OffTopic Keyboard Navigation - Greasemonkey
// version 0.1
// 01/17/2007
// Copyright (c) 2007, Dmar
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Adapted from "Navigate Anything Like Bloglines": http://henrik.nyh.se
//
// ==UserScript==
// @name        OffTopic Keyboard Navigation
// @author      Dmar
// @description Keyboard shortcuts for moving between thread pages
// @include     http://forums.offtopic.com*

// ==/UserScript==

//URL containers
var prevPage;
var nextPage;
var firstPage;
var lastPage;

//Navigate through document to find the appropriate URLs
var divArray = document.getElementsByTagName('div');
for (var i=0;i<divArray.length; i++)
{
    if(divArray[i].className == "pagenav")
    {
        var pageNav = divArray[i];
        var pageNavTable = pageNav.getElementsByTagName('table');
	var pageNavTbody = pageNavTable[0].getElementsByTagName('tbody');
	var pageNavTr = pageNavTbody[0].getElementsByTagName('tr');
	var pageNavElts = pageNavTr[0].getElementsByTagName('td');

	var alt2loc = 0;

        for(var j=1; j<pageNavElts.length; j++)
        {
	    var textC = pageNavElts[j].textContent
            if(textC.indexOf("First") >= 0)
		firstPage = pageNavElts[j].getElementsByTagName('a')[0].href;

	    if(textC.indexOf("Last") >= 0)
		lastPage = pageNavElts[j].getElementsByTagName('a')[0].href;

	    if(pageNavElts[j].className == 'alt2')
            {
                if(j>1)
                    prevPage = pageNavElts[j-1].getElementsByTagName('a')[0].href;

                if(j< pageNavElts.length-2)
                    nextPage = pageNavElts[j+1].getElementsByTagName('a')[0].href;

		alt2loc = j;
            }
        }
	
	if(typeof firstPage == 'undefined' && alt2loc > 1)
		firstPage = pageNavElts[2].getElementsByTagName('a')[0].href;

	if(typeof lastPage == 'undefined' && alt2loc < pageNavElts.length-2)
		lastPage = pageNavElts[pageNavElts.length-3].getElementsByTagName('a')[0].href;

    }
}

//Keystrokes
var keyPrevP = 'u'.charCodeAt(0);
var keyNextP = 'i'.charCodeAt(0);
var keyFirstP = 'y'.charCodeAt(0);
var keyLastP = 'o'.charCodeAt(0);
var keyPrevPost = 'j'.charCodeAt(0);
var keyNextPost = 'k'.charCodeAt(0);

var ss_STEPS            = 15;    // Number of steps to the smooth scrolling animation
var ss_DURATION         = 200;   // Duration of smooth scrolling animation, in milliseconds

var defaultModifyBy     = -5;    // Modifies where we should scroll to relative a post's location on the y axis, in pixels
var boundedByEndsOfPage = true;  // true = "previous" to first post is page top; "next" from last post is page bottom;
                                 // false = nothing is "previous" to first post or "next" from last post

//Find top of posts
var matchPosts = [
	// Match OffTopic.com
	{ xpath: '//div[@id="posts"]//table[starts-with(@id,"post")]',
	  urls: RegExp("forums\.offtopic\.com", 'i') },
];

var beforeFirstPost, afterLastPost;
if (boundedByEndsOfPage) {
	beforeFirstPost = 0;
	afterLastPost = document.height;
} else {
	beforeFirstPost = getOffsetTop(posts[0]);
	afterLastPost = getOffsetTop(posts[posts.length-1]);
}

// Get posts according to first allowed and matching XPath that yields anything 
for (var i=0, j=matchPosts.length; i < j; i++) {
	var m = matchPosts[i];
	if (m.regexp && !location.href.match(m.regexp)) continue;
	var posts = xpToArray(m.xpath);
	if (posts.length > 0)
		break;
}
if (!posts || posts.length == 0) return;

var modifyBy = m.modifyBy || defaultModifyBy;


document.addEventListener('keypress', keyHandler, true);

//----------Functions------------------

function eventIsClean(e) {
	var targetTag = e.target.tagName;
	var keyCode = e.which;
	return !e.altKey && !e.ctrlKey && !e.metaKey &&
	       targetTag != "TEXTAREA" && targetTag != "INPUT" &&
	       (keyCode == keyPrevP || keyCode == keyNextP || keyCode == keyFirstP || keyCode == keyLastP || keyCode == keyPrevPost || keyCode == keyNextPost);
}


function keyHandler(e) {
	if (!eventIsClean(e)) return;

	var keyCode = e.which, yPosition;
	
	var currentScroll = window.pageYOffset;
	var currentPost = -1;  // Initial assumption: we're above the first post
	for (var i=0, j=posts.length; i < j; i++) 
	{
		var post = posts[i];
		if (getOffsetTop(post) <= currentScroll)
			currentPost = i;  // If we've scrolled to or past a post, make that one the current one
	}
	
	if (keyCode == keyNextPost) 
	{ 
		yPosition = currentPost+1 < posts.length ? getOffsetTop(posts[currentPost+1]) : afterLastPost;
		smoothScrollTo(yPosition);
	} 
	else if (keyCode == keyPrevPost) {
		if (currentPost < 0)
			yPosition = currentScroll;
		else if (currentPost == 0)
			yPosition = beforeFirstPost;
		else {
			var yCurrentPost = getOffsetTop(posts[currentPost]);
			if (currentScroll == yCurrentPost)  // If exactly at post, previous is previous
				yPosition = getOffsetTop(posts[currentPost-1]);
			else  // If within post, previous is the top of the same post
				var yPosition = yCurrentPost;
		}
		smoothScrollTo(yPosition);
	}

	else if(keyCode==keyPrevP)
	{
		if(typeof prevPage == 'undefined' || prevPage == null)
			return;
		location.href = prevPage;
	}
	else if(keyCode==keyNextP)
	{
		if(typeof nextPage == 'undefined' || nextPage == null)
			return;
		location.href = nextPage;
	}
	else if(keyCode==keyFirstP)
	{
		if(typeof firstPage == 'undefined' || firstPage == null)
			return;
		location.href = firstPage;
	}
	else if(keyCode==keyLastP)
	{
		if(typeof lastPage == 'undefined' || lastPage == null)
			return;
		location.href = lastPage;
	}
}

function xp(query, root) { return document.evaluate(query, root || document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }
function withEach(query, cb, root) {
	var results = xp(query, root);
	for (var i = 0, j = results.snapshotLength; i < j; i++)
		cb(results.snapshotItem(i));
}
function xpToArray(xp, root) {
	var array = [];
	withEach(xp, function(item) {
		array.push(item);
	}, root);
	return array;
}

function getOffsetTop(el) {
	var ot = el.offsetTop;
	while((el = el.offsetParent) != null)
    	ot += el.offsetTop;
	return ot + modifyBy;
}

function makeScrollTo(y) {
	return function(){ window.scrollTo(window.pageXOffset, y); };
}

function smoothScrollTo(destY) {
	var sourceY = window.pageYOffset;
	
	for (var i=1; i<ss_STEPS; i++) {
		var percent = i / ss_STEPS;
		var smooth = (1-Math.cos(Math.PI * percent)) / 2;
		var y = parseInt(sourceY + (destY-sourceY) * smooth);
    	setTimeout(makeScrollTo(y), (ss_DURATION/ss_STEPS) * i);
  	}
  setTimeout(makeScrollTo(destY), ss_DURATION);
	
	
}
