// ==UserScript==
// @name           Highlight Search Words Everywhere
// @namespace      HSWE
// @description    Like Google Cache, highlights the words you used in your search on all search result pages, by checking for CGI parameters in the Referrer.  You can also add #search=a+b+c to the URL to perform your own searches (may require a reload).
// @include        *
//// Exclude sites which already highlight search terms!
// @exclude        http://*.google.*/*
// ==/UserScript==

var highlightWholePhrase = true;
var highlightEachTerm    = true;
var highlightOnSearchPages = false;  // highlight on the search page, as well as the results pages

/** === Documentation ===
//
// Highlights the words you used in your search on the search result page and
// on the page itself, by checking for CGI parameters in the Referrer.
//
// You can use this userscript to provide your own search terms by adding the following to the URL:
//
//   &search=my+words
//   #search=my words
//
// One problem with the second method is that it doesn't work.  Firefox doesn't
// refresh the page when we add a #hash_tag.
//
**/

/** === Developer Notes ===

// TODO:
// Don't highlight if >50 matches for the string :P
// Don't highlight if string is a word already in the document's title.

// CONSIDER: Considering the 2 TODOs below, sometimes the page contains many
// instances of the words, and most frequently some or all of the words are
// visible.  The user is probably most interested in rare words which are not
// already visible when the page loads.

// TODO: Offer a float over the top with the words, their occurrence count,
// clickable to cycle through each, or overall Previous/Next buttons + keyboard
// shortcuts.

// TODO:
// Scroll down to (just above) first occurrence (in case our search terms do not appear until later in the document).
// Provide at least minimal compatibility with common search term styles.
// e.g. BUG: If q="may+not+load+or+link+to" then the 'may' and 'to' words will
// not be highlighted due to the quotes.  (In fact strictly we should only
// highlight if it's the whole phrase.)
// Highlight the different words in different colors?
// Highlight excluded terms (e.g. 'wheat' in q=food+-wheat) in red?

// DONE: Make any page a text-search result by accepting CGI parameters
// (possibly faked by the user) or accepting dialog input from the user as a
// bookmarklet.

// DONE: Background the highlighting process to avoid locking up the browser on long pages.

*/

// Backwards looping means we need not worry about the list length
// changing as we traverse it
function loopBackwardsOnTimeout(list,fn,delay) {
	var loopI = list.length;
	function doOne() {
		loopI--;
		if (loopI >= 0) {
			fn(list[loopI]);
			setTimeout(doOne,delay);
		}
	}
	doOne();
}

function findSearchTerm_OLD(url) {
	if (url.indexOf("search=")==0 || url.indexOf("&search=")>=0) {
		// log(url.replace(/.*search=/,''));
		// log(url.replace(/.*search=/,'').replace(/&.*/,''));
		return url.replace(/.*search=/,'').replace(/&.*/,'');
	} else if (url.indexOf("q=")==0 || url.indexOf("&q=")>=0) {
		// log(url.replace(/.*q=/,''));
		// log(url.replace(/.*q=/,'').replace(/&.*/,''));
		return url.replace(/.*q=/,'').replace(/&.*/,'');
	} else if (url.indexOf("value=")==0 || url.indexOf("&value=")>=0) {
		return url.replace(/.*value=/,'').replace(/&.*/,'');
	}
	return null;
}

function findSearchTerm(url) {
	url = "" + url;
	// Grab the search string from the URL
	if (url.indexOf("?")>=0) {
		url = url.substring(url.indexOf("?")+1);
	}
	// but if not we assume we were handed a .search string anyway
	var cgiParams = {};
	url.split("&").forEach(function(arg){
		var parts = arg.split("=");
		if (parts.length == 2) {
			var key = parts[0];
			var value = parts[1];
			cgiParams[key] = value;
		}
	});
	for (var key in cgiParams) {
		if (key=="search" || key=="q" || key=="value") {
			return cgiParams[key];
		}
	}
	return null;
}

var startSearchDelay = 500;
function startSearch(word) {
	if (word.length > 0) {
		// Stagger start time of different words
		setTimeout(function(){
			// GM_log("Starting search for word: "+word);
			searchWithinNode(document.body, word.toUpperCase(), word.length, getNextColor());
		},startSearchDelay);
		startSearchDelay += 1000;
	}
}

var words;

// Check for user supplied #search
words = findSearchTerm(document.location.hash.slice(1));
// Check for current page CGI search terms
if (!words && highlightOnSearchPages)
	words = findSearchTerm(document.location.search);
// Check for referring page CGI search terms
if (!words)
	words = findSearchTerm(document.referrer);
// I was prioritising referrer before, but that's messy: if you switch to a
// different set of terms on the same search engine, the old set gets
// highlighted!

if (words) {

	/* This function taken from the "Highlight..." bookmarklet on SquareFree. */
	var count = 0, text, dv;
	var dv = document.defaultView;

	function searchWithinNode(node, te, len, color){
		var pos, skip, spannode, middlebit, endbit, middleclone;
		skip = 0;
		if(node.nodeType == 3) {
			pos = node.data.toUpperCase().indexOf(te);
			// TODO: add optional check here for matchWholeWorldsOnly
			if(pos >= 0) {
				// Unfortunately we cannot pad this operation with setTimeout,
				// because we need to return skip *after* we've completed the job.
				spannode = document.createElement("SPAN");
				spannode.className = node.className;
				/*
				// May be useful for other browsers:
				spannode.style.backgroundColor = "#ccffcc";
				spannode.style.setProperty('opacity','0.5');
				spannode.style.setProperty('-moz-opacity','0.5');
				spannode.style.setProperty('filter','alpha(opacity=50)');
				*/
				// spannode.setAttribute('style','background-color: #ffff44; opacity: 0.7;');
				spannode.style.backgroundColor = color;
				spannode.style.opacity = 0.6;
				// TODO BUG: sometimes does not inherit all style properties, so may not appear the same as original text.  Or maybe it's inheriting properties it didn't want.
				middlebit = node.splitText(pos);
				endbit = middlebit.splitText(len);
				middleclone = middlebit.cloneNode(true);
				spannode.appendChild(middleclone);
				middlebit.parentNode.replaceChild(spannode,middlebit);
				++count;
				skip = 1;
			}
		} else if (node.nodeType==1&& node.childNodes && node.tagName.toUpperCase()!="SCRIPT" && node.tagName.toUpperCase!="STYLE") {
			/*
			setTimeout(function(){
				for (var child=0; child < node.childNodes.length; ++child){
					child = child + searchWithinNode(node.childNodes[child], te, len, color);
				}
			},200); // 5 per second
			*/
			loopBackwardsOnTimeout(node.childNodes,function(child) {
				return searchWithinNode(child, te, len, color);
			},100);  // 10 per second
		}
		return skip;
	}

	// var hue = 360/6;
	var hue = 0;
	function getNextColor() {
		var colstr = "hsl("+hue+",100%,80%)";
		// hue = Math.round(hue + 360/3.3); // cyan, magenta, peach
		hue = Math.round(hue + 360/5.7); // yellow, green, cyan
		if (hue > 360)
			hue -= 360;
		return colstr;
	}

	GM_log("Highlighting words: "+words);
	/* window.status="Searching for '"+words+"'..."; */

	words = unescape(words.replace(/\+/g,' '));

	if (highlightWholePhrase) {
		startSearch(words);
		// TODO: exceptions
	}

	// Don't highlight if we already did in highlightWholePhrase!
	if (highlightEachTerm && !(highlightWholePhrase && words.indexOf(" ")==-1)) {
		// Split by quotes first, to extract any quoted phrases (the even numbered results)
		var phraseList = words.split('"');
		phraseList.forEach(function(phrase,i) {
			if (i%2 == 0) {
				// These words were outside quotes, so we need to split them
				phrase.split(" ").forEach(function(word) {
					startSearch(word);
				});
			} else {
				// These words were inside quotes, so we search for the whole
				// phrase, not the individual words
				startSearch(phrase);
			}
		});
	}

} else {
	// GM_log("No search terms found in "+document.referrer+" or "+document.location);
}

