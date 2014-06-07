// ==UserScript==
// @name           Shorten Amazon Product Links (international + associate ID)
// @namespace      http://userscripts.org/users/427545
// @description   Shorten all links to Amazon products for easy emailing. (Strips Amazon associate referral tags and replaces with user-set ID.)

// This is just a copy of Gina Trapani's script at http://userscripts.org/scripts/show/29728
// ...but adjusted so it doesn't change the domain name, so it works on other Amazon //sites, then adjusted to user id swedea06-20

// @include       *
// ==/UserScript==


var associateID = '';

if (!GM_getValue("associateID")) {
	GM_setValue("associateID", associateID);
	associateID='';
} else
	associateID=GM_getValue("associateID");


GM_registerMenuCommand('Set your Amazon Associate ID, ie, swedea06-20', setAssociateID);



function setAssociateID(){
	associateID = prompt('Set your Amazon Associate ID, ie, swedea06-20', associateID);
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

function getDomain() {
	if (document.location.hostname.substr(0,4) == 'www.')
		return document.location.hostname.substr(4) ;
	return document.location.hostname ;
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
				allLinks[i].setAttribute("href", "http://"+getDomain()+"/o/ASIN/" + asin );
			else
				allLinks[i].setAttribute("href", "http://"+getDomain()+"/o/ASIN/" + asin + "/ref=nosim/"+associateID);
		}
	}
}


})();