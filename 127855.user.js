// ==UserScript==
// @name          Amazon.de Links kürzen (Google Chrome compatible)
// @description   Kürzt Amazon Links für ein einfacheres teilen (und fügt die Ref-ID hinzu, welche im Script angegeben werden kann)

// This is just a modification of Callum Locke's script at http://userscripts.org/scripts/show/55185 and Kelly Nielsen modification at http://userscripts.org/scripts/show/74583
// ...but adjusted so it will work for google chrome, and the german site
// On Chrome, manually set the associateID below, as greasemonkey (GM_) functions won't work.
// @version        1.0.0
// @include       *

// @author TiB_
// ==/UserScript==


var associateID = 'ama-guid-21';

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
	var linkDomain = (currentDomain.match(/amazon\./i) ? currentDomain : "amazon.de");
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