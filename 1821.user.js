// ==UserScript==
// @name           DeviantArt comment on what?
// @namespace      http://henrik.nyh.se
// @description    Shows the name of the deviation commented, on comment pages. Very simple cache implemented, that won't pick up on deviations being renamed. See code for more info.
// @include        http://comments.deviantart.com/1/*/*
// ==/UserScript==

// PLEASE NOTE: I have implemented a cache, but it currently never expires - so it won't pick up on deviations being renamed.
// Clear it manually by disabling the cache below:

var useCache = true;  // Set to true or false


// Make sure user has a greasy enough monkey #######################

if (!GM_xmlhttpRequest || !GM_getValue) {
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
}


// Define functions ################################################

// Flatten multiline data for the benefit of regexps
function flatten(x) {
	return x.replace(/[\r\n]/g, '');
}

// Set title to include deviation link and title
function setTitle(url, title) {
	var header = document.getElementsByTagName('h2')[0];
	header.innerHTML = header.innerHTML.replace(' Comment', ' Comment on <a href="'+url+'">'+title+'</a>');
}


// Go ##############################################################

var deviation = window.location.href.replace(/.*\/\d+\/(\d+)\/\d+.*/, '$1');
var devURL = 'http://www.deviantart.com/deviation/'+deviation+'/';

// If cache is disabled, then empty this slot

if (!useCache)
	GM_setValue(deviation, '');

// Is there a cached title for this deviation id?

var cached = GM_getValue(deviation);

if (cached)  // Cached - use cached title
	setTitle(devURL, cached);
else {  // Not cached - retrieve title from page

	GM_xmlhttpRequest({
	method:"GET",
	url:devURL,
	onload:function(result) {
		
		x = flatten(result.responseText);
		var devTitle = x.replace(/.*<title>deviantART: (.+) by .+<\/title>.*/, '$1');
		
		if (useCache)
			GM_setValue(deviation, devTitle);  // Cache

		setTitle(devURL, devTitle);
		
	}
	});

}
