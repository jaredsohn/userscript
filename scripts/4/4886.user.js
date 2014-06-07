// ==UserScript==
// @name          Navigate anything like Bloglines
// @namespace     http://henrik.nyh.se
// @description   Enables pressing "j" and "k" as keyboard shortcuts to scroll to next/previous post on forums, blogs or whatever; similar to the navigation on Bloglines.com. Defaults to jumping between header tags but can be configured per site. Pre-configured for a couple of sites: LiveJournal entries and comments, Google results, Helgon.net guestbook entries, 99mac.se and SweClockers.com forum posts.
// @include       *
// @exclude       http://www.bloglines.com/myblogs_display?*
// ==/UserScript==

// Inspired by code from Bloglines.com. Smooth scrolling based on code by Johan Sundström, http://userscripts.org/scripts/show/2027.


var keyCodeForPrev      = 'k'.charCodeAt(0);
var keyCodeForNext      = 'j'.charCodeAt(0);

var ss_STEPS            = 15;    // Number of steps to the smooth scrolling animation
var ss_DURATION         = 200;   // Duration of smooth scrolling animation, in milliseconds

var defaultModifyBy     = -5;    // Modifies where we should scroll to relative a post's location on the y axis, in pixels
var boundedByEndsOfPage = true;  // true = "previous" to first post is page top; "next" from last post is page bottom;
                                 // false = nothing is "previous" to first post or "next" from last post


// Each object in this list should contain an XPath expression describing a set of (handles on something in) posts.
// The expression doesn't need to match the entire post, but should ideally describe something at the top of each post.
// Optionally, specify a modifyBy value to adjust where the scroll goes relative to the XPathed elements's location on the y axis, in pixels.
// Optionally, specify a regular expression to limit the URLs to which this expression applies.
 
var matchPosts = [
	// Google search results
	{ xpath: '//a[@class="l"]',
	  urls: RegExp("www\.google\.\w{2,3}/search", 'i') },
	// LiveJournal.com entry-and-comments, S1 Generator layout style
	{ xpath: '//table//tr[@valign="middle"] | //*[starts-with(@id, "cmtbar")]',
	  urls: RegExp("livejournal\.com", 'i') },
	// LiveJournal.com entries, S1 Generator layout style
	{ xpath: '//table[@class="entrybox"]',
	  urls: RegExp("livejournal\.com", 'i') },
	// 99mac.se
	{ xpath: '//div[@id="posts"]//table[starts-with(@id,"post")]',
	  urls: RegExp("99mac\.se", 'i') },
	// Sweclockers.com forum
	{ xpath: '//table[@class="vbforum"]//a[starts-with(@name,"post")]',
	  modifyBy: -10,
	  urls: RegExp("sweclockers\.com/forum", 'i') },
	// Helgon.net guestbook
	{ xpath: '(//a[@target="helgonmain"]//ancestor::table[1])[position()>1]',
	  urls: RegExp("helgon\.net/GuestBook", 'i') },
	// Anything else
	{ xpath: most_frequent_header() }
];

function most_frequent_header() {
	var most_frequent_header, max_count = 0, h, xh;
	for (var i=6; i > 0; i--) {
	    h = "//h"+i, xh = $x(h);
	    if (xh.length >= max_count) {
			max_count = xh.length;
	        most_frequent_header = h;
		}
	}
	return most_frequent_header;
}


// Get posts according to first allowed and matching XPath that yields anything 

for (var i=0, j=matchPosts.length; i < j; i++) {
	var m = matchPosts[i];
	if (m.regexp && !location.href.match(m.regexp)) continue;
	var posts = $x(m.xpath);
	if (posts.length > 0)
		break;
}
if (!posts || posts.length == 0) return;

var modifyBy = m.modifyBy || defaultModifyBy;

// Filter out keyboard events tainted with modifiers, within form elements or not among the valid keycodes

function eventIsClean(e) {
	var targetTag = e.target.tagName;
	var keyCode = e.which;
	return !e.altKey && !e.ctrlKey && !e.metaKey &&
	       targetTag != "TEXTAREA" && targetTag != "INPUT" &&
	       (keyCode == keyCodeForPrev || keyCode == keyCodeForNext);
}

function getOffsetTop(el) {
	var ot = el.offsetTop;
	while((el = el.offsetParent) != null)
    	ot += el.offsetTop;
	return ot + modifyBy;
}

var beforeFirstPost, afterLastPost;
if (boundedByEndsOfPage) {
	beforeFirstPost = 0;
	afterLastPost = document.height;
} else {
	beforeFirstPost = getOffsetTop(posts[0]);
	afterLastPost = getOffsetTop(posts[posts.length-1]);
}

document.addEventListener('keypress', keyHandler, true);

function keyHandler(e) {
	if (!eventIsClean(e)) return;

	var keyCode = e.which, yPosition;	
	
	var currentScroll = window.pageYOffset;
	var currentPost = -1;  // Initial assumption: we're above the first post
	for (var i=0, j=posts.length; i < j; i++) {
		var post = posts[i];
		if (getOffsetTop(post) <= currentScroll)
			currentPost = i;  // If we've scrolled to or past a post, make that one the current one
	}
	
	if (keyCode == keyCodeForNext) { 
		yPosition = currentPost+1 < posts.length ? getOffsetTop(posts[currentPost+1]) : afterLastPost;
	} else if (keyCode == keyCodeForPrev) {
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
	}
	
	smoothScrollTo(yPosition);

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


/* Staple functions */

function $x(path, root) {
	if (!root) root = document;
	var i, arr = [], xpr = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}
