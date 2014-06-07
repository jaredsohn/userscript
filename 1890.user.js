// ==UserScript==
// @name          PrivaSuite
// @namespace     http://arantius.com/misc/greasemonkey/
// @description	  A suite of (primarily) privacy related tools.  A combination of my Blank Target, Straight Click, and Status Saver scripts.
//                So it's not really a "privacy" suite .. but they all act on links, so I grouped them up for efficiency!
// @include       *
// @exclude       http://google.multiseek.net/search*
// @exclude       http://www.google.tld/search*
// @exclude       http://delicious.com/*
// ==/UserScript==
//
// Updates:
//
// - 2010-09-11: Catch security manager viloations in top-frame-detection.
// - 2009-10-13: Monitor for altered hrefs, and re-clean them.
// - 2008-01-19: Deal with an inner link that is not slash terminated.
// - 2006-09-18: Allow google "Custom" search links through.
// - 2006-06-23: Properly handle clicks straight to https:// and cache cases
//               for Yahoo! and InternetArchive, minor other improvements.
//
// Originally written by Anthony Lieuallen of http://arantius.com/
// Licensed for unlimited modification and redistribution as long as
// this notice is kept intact.
//
// If possible, please contact me regarding new features, bugfixes
// or changes that I could integrate into the existing code instead of
// creating a different script.  Thank you
//

(function () {
if (document.location.href.match(/^about:/)) return;

var inFrames=false;
try { inFrames = (top!=self); } catch (e) { }
var antiloop=0;
var myHost=document.location.host+''; // "assign by value"
var myDomain=myHost.replace(/.*\.(.*......)/, '$1');

var myDomainRegex=new RegExp('^[a-z]+://[^/]*'+myDomain+'(/|$)');
var cacheRegex=/\/search(\?q=cache|\/cache\?)/;
var intArchRegex=/^http:\/\/web.archive.org\/web\//;

function straightClick(el) {
	// make sure we don't do some crazy infinite loop
	if (antiloop++>20) return false;

	// don't mess with javascript links
	if ('javascript:'==el.href.substr(0, 11)) return false;
	// special case to allow links to google/yahoo cache through
	if (cacheRegex.test(el.href)) return false;
	// let links to internet archive through
	if (intArchRegex.test(el.href)) return false;

	var href=el.href+''; // "assign by value"

	// trim the start of this href
	href=href.replace(/^https?:\/\//, '');
	href=href.replace(/^www\./, '');

	// try to find an embedded link
	var m=href.match(/(www\.|https?:|https?%3A)[^&]+/i);
	if (!m) {
		// we didn't find one!
		return false;
	}

	// pick out and use the embedded link
	href=unescape(m[0]);
	
	// if it's to my own domain, don't mess with it
	if (myDomainRegex.test(href)) return false;

	// make sure we have a protocol
	if (!href.match(/[a-z]+:\/\//)) href='http://'+href;

	// stuff it in the element, and let caller know I did
	el.href=href;
	return true;
}


// find all links as a snapshot
var els=document.links;
// iterate over all elements
for (var i=0, el; j=0, el=els[i]; i++) {
	//////////////////////////blank target
	if (null!=el.getAttribute('target') && !inFrames) {
		el.removeAttribute('target');
	}

	//////////////////////////status saver
	if ('string'==typeof el.getAttribute('onmouseover') &&
		el.getAttribute('onmouseover').match(/(window|self)\.status/)
	) {
		el.removeAttribute('onmouseover');
		el.removeAttribute('onmouseout');
	}

	//////////////////////////rewrite avoider
	el.removeAttribute('onmousedown');

	//////////////////////////straight click
	antiloop=0;
	do { ;; } while (straightClick(el))
}

var suspend=false;
document.body.addEventListener('DOMAttrModified', function(event) {
	var el=event.target;
	if (!el || 'A'!=el.tagName) return;
	if ('href'!=event.attrName) return;

	if (suspend) return;
	suspend=true;

	//////////////////////////straight click
	antiloop=0;
	do { ;; } while (straightClick(el))

	suspend=false;
}, false);

})();
