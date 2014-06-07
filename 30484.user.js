// ==UserScript==
// @name          Shorten Product Links
// @description   Shorten all links to Amazon products for easy emailing. (Strips Amazon associate referral tags and replaces with user-set ID.)

// based on code here http://userscripts.org/scripts/show/3284  and here http://userscripts.org/scripts/show/558

// @include       *

// @author Gina Trapani
// @homepage http://ginatrapani.org/workshop/greasemonkey/
// ==/UserScript==


var associateID = 'letterneverse-20';

if (!GM_getValue("associateID")) {
	GM_setValue("associateID", associateID);
	associateID='';
} else
	associateID=GM_getValue("associateID");


GM_registerMenuCommand('Set your Amazon Associate ID, ie, gizmodo-20', setAssociateID);





function setAssociateID(){
	associateID = prompt('Set your Amazon Associate ID, ie, gizmodo-20', associateID);
    GM_setValue('associateID', associateID );
	window.location.href = window.location.href; //refresh page
}

function getASIN(href) {
  var asinMatch;
  asinMatch = href.match(/\/exec\/obidos\/ASIN\/(\w{10})/i);
  if (!asinMatch) { asinMatch = href.match(/\/gp\/product\/(\w{10})/i); }
  if (!asinMatch) { asinMatch = href.match(/\/exec\/obidos\/tg\/detail\/\-\/(\w{10})/i); }
  if (!asinMatch) { asinMatch = href.match(/\/dp\/(\w{10})/i); }
  if (!asinMatch) { return null; }
  return asinMatch[1];
}


(function() {
var allLinks = window.content.document.getElementsByTagName("a");
var asin = '';
for (i = 0; i < allLinks.length; i++) {
   var href = allLinks[i].href;
   if (href.match(/amazon\./i) && !href.match(/palitoy/i)) {
	   asin = getASIN(href);
	   if (asin != null) {
	   		if (GM_getValue("associateID")=='')
				allLinks[i].setAttribute("href", "http://amazon.com/o/ASIN/" + asin );
			else
				allLinks[i].setAttribute("href", "http://amazon.com/o/ASIN/" + asin + "/ref=nosim/"+associateID);
		}
	}
}


})();