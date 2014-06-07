// ==UserScript==
// @name          Auto-download free hourly embroidery zip file
// @namespace     http://userscripts.org/scripts/show/58757
// @include       http://www.sweetembroidery.com/freebie.asp
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)


var svrId = 0;

var attachmentLinks = document.evaluate("//a[@href[contains(.,'/public/free')]]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); 
for(var i = 0; i < attachmentLinks.snapshotLength; i++) {
 var currentLink = attachmentLinks.snapshotItem(i);

location.href = currentLink;


}

function setRefreshInfomation() {
    var refreshold = GM_getValue("Refresh", true);
    GM_setValue("Refresh", prompt("Do you wish Ikariam to auto refresh? true/false", refreshold) || refreshold);

    var minold = GM_getValue("Min", 3610);
    GM_setValue("Min", prompt("Minimum amount of seconds you want to page to refresh?", minold) || minold);

    var maxold = GM_getValue("Max", 3800);
    GM_setValue("Max", prompt("Maximum amount of seconds you want to page to refresh?", maxold) || maxold); 

  window.location.reload();
};

GM_registerMenuCommand("Ikariam Auto Refresh: Configuration", setRefreshInfomation);

if (GM_getValue("FirstTime", true) == true) { setRefreshInfomation(); }

var AUTO_REFRESH = GM_getValue("Refresh", "true");
var MIN = GM_getValue("Min", 10);  // seconds
var MAX = GM_getValue("Max", 20);  // seconds

function getRefreshTime() {
  return (parseInt(MIN) + Math.round(Math.random() * (MAX - MIN))) * 1000;
} 

if (AUTO_REFRESH) {
  setTimeout("location.href= document.URL", getRefreshTime());
}

GM_setValue("FirstTime", false);
