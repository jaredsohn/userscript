
// ==UserScript==
// @name 	TimesUnion to CRMLS Redirector
// @namespace	http://userscripts.blowery.org/
// @description	Changes the details links on the TimesUnion seach results page to point to the CRMLS listings
// @include	http://homes.timesunion.com/sales/SearchResults.asp
// ==/UserScript==

GM_log("Running redirector");

window.addEventListener("load", function(evt) {
  GM_log("Here we go!");
  var links = document.getElementsByTagName("a");
  GM_log("links is a " + typeof(links));
  links = colToArr(links).filter(isLinkWeLike);
  GM_log("Got links");
  GM_log(links);
  links.forEach(fixupLink);
  GM_log("done fixing up");

}, false);

function isLinkWeLike(n) {
  var href = n.getAttribute("href");
  GM_log("checking " + href);
  if(!href) return;
  return href.indexOf("javascript:LookDetails(") >= 0;
}

function fixupLink(n) {
  var href = n.getAttribute("href");
  if(!href) return;
  GM_log("fixing up " + href);
  var newUrl = "http://crmls.fnismls.com/publink/Report.aspx?outputtype=HTML&GUID=d0d7abc0-7b16-4c87-a5db-73ca01981685&ListingID={0}&Report=Yes&view=30&layout_id=101";
  var listingID = href.match(/,'\d\d\d-(\d+)'/i);
  if(!listingID) return; 
  GM_log(listingID[1]);
  var newUrl = newUrl.replace("{0}", listingID[1]);
  GM_log("new url: " + newUrl);
  n.setAttribute("href", newUrl);
}

function colToArr(col) {
  var ar = [];
  for(var i = 0; i < col.length; i++) {
    ar[i] = col[i];
  }
  return ar;
}

GM_log("Done with redirector");
