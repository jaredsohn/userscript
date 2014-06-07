// ==UserScript==
// @name           Dan Carlin Amazon Affiliate script (US-Chrome)
// @namespace      
// @description   Support Dan Carlin via an easy Chrome Amazon Affiliate script.

// This is just a modification of Kelly Nielsen's script at http://userscripts.org/scripts/show/74583
// ...but adjusted for easy install by Dan Carlin fans --this is for US fans. 
// On Chrome, manually set the associateID below, as greasemonkey (GM_) functions won't work.

// @include       *

// @author jonqisu
// ==/UserScript==


var associateID = 'dancarlincom-20';

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
				allLinks[i].setAttribute("href", "http://"+linkDomain+"/o/ASIN/" + asin + "/ref=nosim/"+associateID);
			}
		}
	}
})();