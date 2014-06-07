// ==UserScript==
// @name Delicious.com - Sort with Freshness
// @namespace http://userscripts.org/users/7990
// @description Sort all the links on the page by their title, URL, popularity or freshness.
// @include http://delicious.com/*
// @include http://www.delicious.com/*
// ==/UserScript==

// Borrows from and builds on murklins' Sort Visible Links: http://userscripts.org/scripts/show/36153

var main_node = document.getElementById("bd");
var postArr = [];
var today = new Date();
var fetchedDates = new Object();
var countFetched = 0;
var totalToFetch = 0;
var delay = 600;

// gather up all the sort info that's available locally and fill the postArr
fillPostArr();
// all the bokmarks are in the postArr and ready to sort, so display the sort options
showSortOpts();
// start the process of getting and showing each unique link's freshness for all the posts that had no local freshness date
fetchDates();

function fetchDates() {
	var index = 0;
	for (var link in fetchedDates) {
		// leave a delay between each fetch, so that Delicious doesn't throttle access to url history pages
		index++;
		doSlowly(link, delay * index);
	}
}

function doSlowly(link, waitPeriod) {
	window.setTimeout(function() { fetchDate(link) }, waitPeriod);
}

function fetchDate(link) {
	if (fetchedDates[link] == "unfetched") {
		fetchedDates[link] = "fetching";
		getFreshness(link);
	}
	else if (fetchedDates[link] != "fetching") {
		showFreshnessByURL(link, fetchedDates[link]);
	}
}

function fillPostArr() {
	postArr = [];
	var bookmarks = document.evaluate("//li[contains(@class, 'post')]/div[contains(@class, 'bookmark')]", main_node, null,
	                              		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	                              		null);
	                              					
	// if there are any posts with dates on the page, we need to make sure ALL the posts have dates
	var dates = document.evaluate("//li[contains(@class, 'post')]/div[contains(@class, 'bookmark')]/div[contains(@class, 'dateGroup')]", 
	                              main_node,
	                              null,
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
			while (dg != null && dg.className != "data") {
				if (dg.className && dg.className.indexOf("dateGroup") != -1) {
					break;
				}
				dg = dg.nextSibling;
			}
			if (dg != null) {
				if (dg.className && dg.className.indexOf("dateGroup") != -1) {
					// a dateGroup was found! set this date as the new gold standard.
					curDate = dg.getAttribute("title");
				}
				else {
					var dateDiv = document.createElement("div");
					var span = document.createElement("span");
					span.innerHTML = curDate;
					dateDiv.setAttribute("title", curDate);
					dateDiv.className = "dateGroup gm_sortVisDate";
					dateDiv.style.display = "none";
					dateDiv.appendChild(span);
					b.insertBefore(dateDiv, dg);
				}
			}
		}				
			
		// look in the bookmark div for the number of people who saved the link	and the url to the link's del history		
		// the search results page uses different HTML for the number of saves
		var people = document.evaluate("./div[@class = 'data']/div[@class = 'actions']/div[contains(@class, 'savers')]/a[(@class = 'delNav') or (@class = 'saveCount')]/span", b, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);                                
		var popularity = 0;
		var historyURL = "";
		if (people.snapshotLength > 0) {
			popularity = people.snapshotItem(0).innerHTML;
			historyURL = people.snapshotItem(0).parentNode.getAttribute("href");
			// if there's a semi-colon in the link, strip it out and everything after it
			if (historyURL.indexOf(";") != -1) {
				historyURL = historyURL.substring(0, historyURL.indexOf(";"));
			}
			// strip out everything before the /url/ portion of the link (autopagerize uses full path links here)
			if (historyURL.indexOf("/url/") != -1) {
				historyURL = historyURL.substring(historyURL.indexOf("/url/"), historyURL.length);
			}
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
		
		if (!historyURL && !addDates) {
			// this page has no helpful dates for when there is no link to the history page, so calc the MD5 hash
			// and set the history url manually
			historyURL = "/url/" + MD5(l);
		}
		if (historyURL) {
			// look for this url prop in the fetchedDates object to see if this is a new one
			if (!(historyURL in fetchedDates)) {
				// not in there yet so add it and also up the total count
				fetchedDates[historyURL] = "unfetched";
				totalToFetch++;
			}
		}
		
		// add the post to the array, with the freshness set to -1 (unknown)
		postArr[postArr.length] = new SortablePost(p, i, t, l, popularity, -1, historyURL);	
		
		if (historyURL == "") {
			// if this page has local dates and this post has no history url, the local date is the post's freshness date
			showFreshness(i, curDate);
		}
		
		// go on to next bookmark!
	}				
}

function getFreshness(historyURL) {
	if (typeof(GM_xmlhttpRequest) != "undefined") {
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://www.delicious.com" + historyURL,
			onload: function(details) {
				gotFreshness(details.responseText, historyURL);
			} 
		});
	}
	else {
		// Opera compatibility!
		var req = new XMLHttpRequest();  
		req.open("GET",  "http://www.delicious.com" + historyURL, true);  
		req.onreadystatechange = function (aEvt) { 
			if (req.readyState == 4) {  
				gotFreshness(req.responseText, historyURL);  
 			}  
		};  
		req.send(null);  
	}
}

function gotFreshness(respText, historyURL) {
	var arr;
	var firstSavedDate = "unknown";
	var dateRegex = new RegExp("first saved by <a href=\".*?\">.*?</a> on (.*?)\.</span>","g");
	arr = dateRegex.exec(respText);
	if (arr) {
		// sometimes clicking to the history page of a link gives a "no public bookmarks for this URL" error, in
		// which case the date will stay "unknown", but otherwise this regex should grab the first posted date
		firstSavedDate = arr[1];
	}
	fetchedDates[historyURL] = firstSavedDate;
	showFreshnessByURL(historyURL, firstSavedDate);

	countFetched++; 
	// check to see if, with the inclusion of this link, we now have all the links' freshness
	if (countFetched >= totalToFetch) {
		// we do! so now show the sort by freshness option
		freshnessSortOn();
	}	
}			

// assign this freshness date to all the links with this history url
function showFreshnessByURL(historyURL, linkBirthday) {
	for (var i = 0; i < postArr.length; i++) {
		if (postArr[i].historyURL == historyURL) {	
			showFreshness(i, linkBirthday);
		}
	}
}

// show the freshness of each link
// at first I was concerned that the first posted on date shown on the history page of each link was in GMT, but no -- it's local too
function showFreshness(arrIndex, linkBirthday) {
	var age = linkBirthday;
	if (age != "unknown") {
		// parse the link's birth date
		var dayMonthYear = linkBirthday.split(" ");
		var birthday = dayMonthYear[1] + " " + dayMonthYear[0] + ", 20" + dayMonthYear[2];
		birthday = Date.parse(birthday);
			
		// calculate the age of the link
		age = today.getTime() - birthday;
		age = Math.floor(age/(24*60*60*1000));
	}
	
	postArr[arrIndex].age = age;
	
	// show the freshness on the page, beside the link's title
	var p = postArr[arrIndex].post;
	var linkTitle = document.evaluate("./div/div[@class = 'data']/h4/a[contains(@class, 'taggedlink')]", p, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (linkTitle.snapshotLength != 0) {
		linkTitle =  linkTitle.snapshotItem(0);
		
		existingAgeSpan = document.evaluate("./span[@class = 'gm_sortVisDaysInDel']", linkTitle.parentNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (existingAgeSpan.snapshotLength == 0) {
			// only add it if it isn't already there, yo.
			var ageSpan = document.createElement("span");
			ageSpan.className = "gm_sortVisDaysInDel";
			var plural = (age == 1) ? "" : "s";
			ageSpan.innerHTML = " (" + age + " day" + plural + " in del)";
			if (linkTitle.nextSibling) {
				linkTitle.parentNode.insertBefore(ageSpan, linkTitle.nextSibling);
			}
			else {
				linkTitle.parentNode.appendChild(ageSpan);
			}
		}
	}
}

function showSortOpts() {
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
		createSortLink("url", postSortUrl, sortVisDiv);
		createSortLink("pop", postSortPop, sortVisDiv);
		createSortLink("freshness", postSortFreshness, sortVisDiv);
		createSortLink("default", postSortDefault, sortVisDiv);	
		sortVisDiv.appendChild(document.createTextNode(")"));
	}
}

function createSortLink(linkText, sortFunction, parentDiv) {
	var a = document.createElement("a");
	a.innerHTML = linkText;
	a.href = "";
	a.id = "gm_sortVisLink_" + linkText;
	parentDiv.appendChild(a);
	
	if (linkText == "freshness") {
		// freshness can't be a usable sort option until the freshness values are all displayed so
		// also include unlinked freshness text	
		var freshnessSpan = document.createElement("span");
		freshnessSpan.innerHTML = linkText;
		freshnessSpan.id = "gm_sortVisSpan_" + linkText;
		freshnessSpan.style.display = "none";
		parentDiv.appendChild(freshnessSpan);
		if (countFetched < totalToFetch) {
			freshnessSortOff();
		}
	}
	
	if (linkText != "default") {
		parentDiv.appendChild(document.createTextNode(" | "));
		a.className = "gm_sortVisLink";	
	}
	else {
		// the default sort is selected initially
		a.className = "gm_sortVisLinkOn";
	}
	
	a.addEventListener("click", function(event) {
		event.stopPropagation();		
		event.preventDefault();
		
		// get all the posts
		var bookmarks = document.evaluate("//li[contains(@class, 'post')]/div[contains(@class, 'bookmark')]", main_node, null,
                              		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                              		null);
                              		
		if (bookmarks.snapshotLength != postArr.length) {
			// woops! so the postArr no longer has the same number of posts in it as there are posts on the page
			// usually this is because another GM script, like Autopagerize, has messed with the page since
			// we first grabbed all the posts. No problem, though, just re-fill the array and fetch any as-yet
			// unfetched freshness dates. The only trouble that may be encountered is if the sort triggered was 
			// a freshness sort, since those values may not be ready yet. If that's the case, just toss up an alert
			// to let the user know that they'll need to re-trigger the sort once it becomes available again.
			
			// before we refill the post array, make sure we restore the default sort order to the posts that may have
			// already benn sorted one or more times, otherwise our new default order will be... not very default.
			doSort(bookmarks, postArr.length, postSortDefault, "default");
			
			fillPostArr();
			
			if (countFetched < totalToFetch) {
				// now that we've re-examined the posts, there are new freshness dates to fetch, so disable freshness sort
				freshnessSortOff();
			} 
			
			fetchDates();
		}
         
        if ((countFetched < totalToFetch) && (this.innerHTML == "freshness")) {  
        	// the freshness sort is NOT ready
        	alert("Not all the freshness values have been fetched yet! Please try the freshness sort again in a few moments.");
        }
        else {                   		
			doSort(bookmarks, bookmarks.snapshotLength, sortFunction, this.innerHTML);
        }
	}, false);		
}

function freshnessSortOn() {
	freshnessLink = document.getElementById("gm_sortVisLink_freshness");
	freshnessSpan = document.getElementById("gm_sortVisSpan_freshness");
	if (freshnessLink && freshnessSpan) {
		freshnessLink.style.display = "inline";
		freshnessSpan.style.display = "none";
	}
}

function freshnessSortOff() {
	freshnessLink = document.getElementById("gm_sortVisLink_freshness");
	freshnessSpan = document.getElementById("gm_sortVisSpan_freshness");
	if (freshnessLink && freshnessSpan) {
		freshnessLink.style.display = "none";
		freshnessSpan.style.display = "inline";	
	}
}


function doSort(bookmarks, numRemove, sortFunction, currentSortText) {
	var list;
	for (var i = 0; i < numRemove; i++) { 
		// remove all the posts from the dom
		var post = bookmarks.snapshotItem(i).parentNode;
		list = post.parentNode;
		list.removeChild(post);
	}
	
	// why are autopagerize links getting added to the top of the list if a sort is triggered before the pagerize?
	// WHYYYYYYYYYYYYYYYYYYY. I don't really want to read the autopagerize code, so let's assume that the next page's
	// posts are pre-loaded into the bookmark list and we need to append our sorted links BEFORE them.
	var remainingChild;
	if (list.firstChild) {
		remainingChild = list.firstChild;
	}
	
	// sort the post array using the passed in sort function and then add the posts in their new order as list children
	postArr.sort(sortFunction);
	for (var i = 0; i < postArr.length; i++) {
		if (remainingChild) {
			list.insertBefore(postArr[i].post, remainingChild);
		}
		else {
			list.appendChild(postArr[i].post);
		}
	}
	
	// show or hide the extra date groups		
	var extraDates = document.evaluate("//div[contains(@class, 'gm_sortVisDate')]", main_node, null,
                           						XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                           						null);
	for (var i = 0; i < extraDates.snapshotLength; i++) {
		if (sortFunction != postSortDefault) {
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
	for (var i = 0; i < sortLinks.snapshotLength; i++) {			
		sortLinks.snapshotItem(i).className = "gm_sortVisLink";
		if (sortLinks.snapshotItem(i).innerHTML == currentSortText) {
			sortLinks.snapshotItem(i).className = "gm_sortVisLinkOn";
		}
	}
}

function SortablePost(p, d, t, l, pop, a, h) {
	this.post = p;
	this.defaultOrder = d;
	this.title = t;
	this.link = l;
	this.pop = pop;
	this.age = a;
	this.historyURL = h;
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
	var diff = b.pop - a.pop;
	if (diff == 0) {
		// secondary sort by link
		diff = (a.link < b.link) ? -1 : (a.link > b.link ? 1 : 0);
	}
	return diff;
}
function postSortFreshness(a, b) {
	var x = (a.age == "unknown") ? -1 : a.age;
	var y = (b.age == "unknown") ? -1 : b.age;
	var diff = x - y;
	if (diff == 0) {
		// secondary sort by link
		diff = (a.link < b.link) ? -1 : (a.link > b.link ? 1 : 0);
	}
	return diff;
}

// MD5 encoding function, from http://www.webtoolkit.info/
function MD5(string) {
 
	function RotateLeft(lValue, iShiftBits) {
		return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	}
 
	function AddUnsigned(lX,lY) {
		var lX4,lY4,lX8,lY8,lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
		if (lX4 & lY4) {
			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		}
		if (lX4 | lY4) {
			if (lResult & 0x40000000) {
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			}
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
 	}
 
 	function F(x,y,z) { return (x & y) | ((~x) & z); }
 	function G(x,y,z) { return (x & z) | (y & (~z)); }
 	function H(x,y,z) { return (x ^ y ^ z); }
	function I(x,y,z) { return (y ^ (x | (~z))); }
 
	function FF(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function GG(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function HH(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function II(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function ConvertToWordArray(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWords_temp1=lMessageLength + 8;
		var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
		var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
		var lWordArray=Array(lNumberOfWords-1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while ( lByteCount < lMessageLength ) {
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount-(lByteCount % 4))/4;
		lBytePosition = (lByteCount % 4)*8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
		lWordArray[lNumberOfWords-2] = lMessageLength<<3;
		lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
		return lWordArray;
	};
 
	function WordToHex(lValue) {
		var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
		for (lCount = 0;lCount<=3;lCount++) {
			lByte = (lValue>>>(lCount*8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
		}
		return WordToHexValue;
	};
 
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	};
 
	var x=Array();
	var k,AA,BB,CC,DD,a,b,c,d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;
 
	string = Utf8Encode(string);
 
	x = ConvertToWordArray(string);
 
	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
 
	for (k=0;k<x.length;k+=16) {
		AA=a; BB=b; CC=c; DD=d;
		a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
		d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
		c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
		b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
		a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
		d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
		c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
		b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
		a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
		d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
		c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
		b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
		a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
		d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
		c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
		b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
		a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
		d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
		c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
		b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
		a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
		d=GG(d,a,b,c,x[k+10],S22,0x2441453);
		c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
		b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
		a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
		d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
		c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
		b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
		a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
		d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
		c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
		b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
		a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
		d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
		c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
		b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
		a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
		d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
		c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
		b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
		a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
		d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
		c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
		b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
		a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
		d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
		c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
		b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
		a=II(a,b,c,d,x[k+0], S41,0xF4292244);
		d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
		c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
		b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
		a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
		d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
		c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
		b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
		a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
		d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
		c=II(c,d,a,b,x[k+6], S43,0xA3014314);
		b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
		a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
		d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
		c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
		b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
		a=AddUnsigned(a,AA);
		b=AddUnsigned(b,BB);
		c=AddUnsigned(c,CC);
		d=AddUnsigned(d,DD);
	}
 
	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
 
	return temp.toLowerCase();
}

addGlobalStyle(
	'div#displayOptions div#bookmarks-shown { margin-left: 10px; }' + 
	'div#gm_sortVisDiv a.gm_sortVisLinkOn { background-color: #EFF5FB; font-weight: bold; }' +
	'span.gm_sortVisDaysInDel { font-size:76%; color:#999; }'
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