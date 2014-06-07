// ==UserScript==
// @name           Shorten Amazon Product Links (Google Chrome compatible)
// @namespace      http://userscripts.org/users/151867
// @description   Shorten all links to Amazon products for easy emailing. (Strips Amazon associate referral tags and replaces with user-set ID.)

// This is just a modification of Callum Locke's script at http://userscripts.org/scripts/show/55185 and Kelly Nielsen modification at http://userscripts.org/scripts/show/74583
// ...but adjusted by Jon Murphy at http://userscripts.org/scripts/show/121888 so it will work for google chrome.
// Updated again by Brian Pilnick to function properly with recent Amazon updates. Jon's version breaks image viewing and didn't always succeed to make a valid referral link.

// On Chrome, manually set the associateID below, as greasemonkey (GM_) functions won't work.

// Updated again 
// @version		2.0.5
// @include		*
// @grant		none
// @author		Brian Pilnick
// ==/UserScript==


var associateID = 'amazan-20';

function getASIN(href) {
  var asinMatch;
  asinMatch = href.match(/\/exec\/obidos\/ASIN\/(\w{10})/i);
  if (!asinMatch) { asinMatch = href.match(/\/gp\/product\/(\w{10})/i); }
  if (!asinMatch) { asinMatch = href.match(/\/exec\/obidos\/tg\/detail\/\-\/(\w{10})/i); }
  if (!asinMatch) { asinMatch = href.match(/\/dp\/(\w{10})/i); }
  if (!asinMatch) { return null; }
  return asinMatch[1];
}

function getDomain() {
	if (document.location.hostname.substr(0,4) == 'www.')
		return document.location.hostname.substr(4) ;
	return document.location.hostname ;
}

(function() {
	var allLinks = document.getElementsByTagName("a");

	var asin = '';
	var currentDomain = getDomain();
	var linkDomain = (currentDomain.match(/amazon\./i) ? currentDomain : "amazon.com");
	for (i = 0; i < allLinks.length; i++) {
	   var href = allLinks[i].href;
	   if (href.match(/amazon\./i)) {
		   asin = getASIN(href);
		   if (asin != null) {
				allLinks[i].setAttribute("href", "http://"+linkDomain+"/dp/" + asin + "/?tag="+associateID);
			}
		}
	}
})();