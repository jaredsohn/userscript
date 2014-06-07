// ==UserScript==
// @name           FaviconizeTheWeb
// @description    Adds a favicon for the website next to every external link on the page.  Clearly shows when you will be leaving the current site, and where you will be going!
// @namespace      FTW
// @include        *
//// Awesome websites already provide favicons:
// @exclude        http://www.delicious.com/search*
// @exclude        https://www.delicious.com/search*
// @exclude        http://duckduckgo.com/*
// @exclude        https://duckduckgo.com/*
//// Causes login dialogs to open!
// @exclude        http://www.jobs.ac.uk/*
// @version        1.5
// ==/UserScript==
// Based on FaviconizeGoogle.



// == Config == //

var placeFaviconAfter = false;
var placeFaviconInsideLink = false;
var scaleIcon = 0.75;

var initialDelay = 1000;
var delayIncrement = 5; // after 200 links the delay between batches will be 1 second
var batchSize = 10;

var alwaysUseGoogle = false;   // Uses a google service to load the favicon images



if (!alwaysUseGoogle) {
	// We can speed up if we are requesting from multiple sites
	initialDelay = 100;
	delayIncrement = 5;
}

if (document.location.host.indexOf(".google.") >= 0) {
	scaleIcon = 1.0;
	// return;   // REMOVE THIS TO RUN ON GOOGLE!
}



// CHANGELOG
// 2012-10.15  Applied CSS rules to elements, to override more specific page rules.



// BUG: When a link only just fits inside its container, adding the favicon may
// cause the container to grow or overflow or wrap!  This can look very messy
// if the site uses a strict CSS layout.  We have a fix for Google; can we
// detect in general when this fix should be employed?  (AVOID_OVERFLOW)



// == Library Functions == //

if (typeof GM_log == 'undefined' && typeof console != 'undefined' && typeof console.log == 'function') {
	GM_log = function(x) {
		console.log(x);
	};
}

function setBatchTimeout(callbackFn,delay) {
	// Rather dodgy implementation of batch processing ;)
	if (Math.random()>(1.0/batchSize)) // 0.0 locks up the browser on large pages with many favicons
		callbackFn();
	else
		setTimeout(callbackFn,delay);
}

function getElementsByTagNameAndClassName(tN,cN) {
	return filterListBy( document.getElementsByTagName(tN), function(x){ return x.className==cN } );
}

function getElementsByClassName(cN) {
	return getElementsByTagNameAndClassName("*",cN);
}

function checkAncestorsForId(node, id) {
	while (node = node.parentNode) {
		if (node.id == id) {
			return true;
		}
	}
	return false;
}

function filterListBy(l,c) {
	var ret = [];
	for (var i=0;i<l.length;i++) {
		var it = l[i];
		if (c(it)) {
			ret.push(it);
		}
	}
	return ret;
}

var currentDelay = 0;
function iterateAndDo(list,iterationFn) {
	var i = 0;
	function doOne() {
		if (i < list.length) {
			iterationFn(list[i]);
			i++;
			currentDelay += delayIncrement;
			setBatchTimeout(doOne,currentDelay);
		} else {
			GM_log("Added "+i+" favicons to "+document.title+".");
		}
	}
	doOne();
}



// == Main == //

function createFaviconFor(url) {

	var host = url.replace(/^[^\/]*:\/\//,'').replace(/\/.*$/,'');
	// if (host == document.location.host) {
		// return null;
	// }
	var img = document.createElement('IMG');
	// img.src = 'http://'+host+'/favicon.ico';

	var imageExtensions = ( alwaysUseGoogle ? [] : ['ico','png','gif','jpg'] );
	function tryExtension(evt) {
		var ext = imageExtensions.shift();
		if (ext) {
			img.src = 'http://'+host+'/favicon.'+ext;
		} else {
			if (!alwaysUseGoogle) {
				img.title = "Failed to find favicon for "+host;
			}
			img.src = 'http://www.google.com/s2/favicons?domain=' + host; // Google's cache will sometimes provide a favicon we would have missed, e.g. if the site uses .png instead of .ico.  Thanks to NV for suggesting this, and to Google.
			// @consider We could also generate an md5sum and request a gravatar, which might simply allow human recognition of repeats.
			img.removeEventListener('error',tryExtension,true);
		}
		if (evt) {
			// Will this stop the browser from displaying the error?
			evt.preventDefault();
			return false;
			// Answer: NO!
		}
	}
	img.addEventListener('error',tryExtension,true);
	tryExtension();

	img.title = ''+host;
	// img.width = 16*scaleIcon;
	// img.height = 16*scaleIcon;
	img.className = 'ftwFavicon';
	// img.style.border = 0;
	// Favicon image elements are hidden until they have fully loaded
	// img.style.display = 'none';
	img.addEventListener('load',function(){ img.style.display = ''; },false);
	return img;
}



var count = 0;

var lastURL = null;

function checkLink(link) {

	if (!link.href) {
		return;
	}
	// Skip relative and same-host links (there is no host on file:/// pages):
	if (link.href.match(/^[/]/) || (document.location.host && link.href.match("://"+document.location.host))) {
		return;
	}
	// Skip Javascript links and relative (same-page) anchors
	if ( link.href.match(/^#/) || link.href.match(/^javascript:/)
		// Sometimes .href is the full URL whereas .getAttrib starts just #
		|| link.getAttribute("href").match(/^#/) || link.getAttribute("href").match(/^javascript:/)
	) {
		return;
	}
	// Do not faviconize links which contain (or are only) an image
	if (link.getElementsByTagName("IMG").length > 0) {
		return;
	}
	if (link.protocol === "file:") {
		return;
		// We might be able to guess the real hostname from the path and do a web request for the favicon, or search the folders above for a favicon file?
	}

	// Let's not create a duplicate favicon if the page offers the same link with two different <A>s:
	var sameAsLast = (link.href == lastURL);
	if (sameAsLast)
		return;
	// TODO CONSIDER: Instead of that, just never add the same favicon twice in a row, i.e. same host.
	// But optional.  At other times it might be desirable to have both, e.g. in a list of 10 with a few from the same domain.

	lastURL = link.href;

	var img = createFaviconFor(link.href);
	// img.style = getStyleString();
	getStyleString().split(/; */).forEach(function(r){
		var p = r.split(/: */);
		var prop = p[0];
		var val  = p[1];
		var i;
		while ( (i = prop.indexOf("-")) >= 0) {
			prop = prop.substring(0,i) + prop.substring(i+1,i+2).toUpperCase() + prop.substring(i+2);
		}
		// GM_log("img.style["+prop+"] = "+val);
		img.style[prop] = val;
	});
	img.style.display = 'none';
	var loadListener = function(img){return function(){ img.style.display = 'inline'; };}(img);
	img.addEventListener('load',loadListener,false);
	var targetNode = link;
	if (placeFaviconInsideLink) {
		if (placeFaviconAfter) {
			targetNode.appendChild(img);
		} else {
			targetNode.insertBefore(img,targetNode.firstChild);
		}
	} else {
		if (placeFaviconAfter) {
			targetNode.parentNode.insertBefore(img,targetNode.nextSibling);
		} else {
			targetNode.parentNode.insertBefore(img,targetNode);
		}
	}

	// For Delicious.  Their low-detail links have float:left set, so our
	// images appear to their right, unless...
	if (document.location.href.indexOf("delicious")>=0 && /(^|\s)taggedlink($|\s)/.test(link.className)) {
		img.style.float = 'left';
	}

	// AVOID_OVERFLOW
	// Lots of links at the top of Google's search page overflow and look messy.
	if (document.location.host.indexOf(".google.") >= 0) {
		if (checkAncestorsForId(link,"mngb") || checkAncestorsForId(link,"gb")) {
			img.style.float = 'left';
		}
	}

	// If any website puts a border on their images, we want to remove it
	// img.style.border = '0px';

	count++;
	return;

}

function addStyle(css) {
	var style = document.createElement('STYLE');
	style.innerHTML = css;
	document.getElementsByTagName('head')[0].appendChild(style);
}

function getStyleString() {
	var padSide = (placeFaviconAfter?'left':'right');
	// var avoidOverflow = "float: left;"; // AVOID_OVERFLOW TESTING is it always suitable?  Works well on Google search results header links.  Yeah ok it was rubbish.  The favicon for a link in a paragraph appears at the beginning of the paragraph!
	var resetStyles = "display: inline; margin: 0px; padding: 0px; border: 0px; background: none; position: static;";
	var setStyles = "margin-"+padSide+": "+(scaleIcon/3)+"em; opacity: 0.7; width: "+scaleIcon+"em; height: "+scaleIcon+"em; vertical-align: 0em;";
	return resetStyles + " "+ setStyles;
}

function doIt() {

	// GM_log("doIt() was called!");

	//// Unfortunately this can be overridden by more specific page rules.
	//// e.g. ".article .body img" is more specific than ".ftwFavicon"
	// addStyle(".ftwFavicon { "+getStyleString()+" }");
	//// To override that, we put style rules in each element.

	// vertical-align: middle; <-- appears to make alignment worse in Chrome!
	// Settled for vertical-align: 0em; which fits since capital text seem to be about 0.75em tall

	// var links = document.evaluate("//a[@class='l']",document,null,6,null);
	// var links = filterListBy(document.links, function(x){ return x.className=='l'; } );
	// var links = document.links.filter( function(x){ return x.className=='l'; } );
	// var links = getElementsByTagNameAndClassName("A",'l');
	// Allows it to work on any sites:
	// if (links.length == 0)
	var links = document.getElementsByTagName("A");

	// GM_log("Got links = "+links.snapshotLength);

	iterateAndDo(links,checkLink);

}


// doIt();

/* Adding lots of little images to the page can lock up slow browsers a bit, so
 * we wait a bit before starting.
 */

// window.addEventListener('load',function(){
	// setTimeout(doIt,initialDelay);
// },false);

/* This method ensures a few small chunks of interaction time before we start. */
function startCountdown(total,fnToDo) {
	function doCountdown(msToGo) {
		if (msToGo > 0) {
			setTimeout(function(){
				doCountdown(msToGo-5);
			},5);
		} else {
			fnToDo();
		}
	}
	doCountdown(total);
}
startCountdown(initialDelay,doIt);

// Alternatively, just: setTimeout(doIt,initialDelay);

