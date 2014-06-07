// ==UserScript==
// @name           eBay - Highlight low quantities
// @namespace      http://userscripts.org/users/126140
// @include        http://*.ebay.*
// @description    This script will help you to control your items and variations low quantities. You can set how low a quantity needs to be before alerting. Minimum set to 2 so it does not alert in Auction Style listings.
// @copyright      ©2011 Miguel Madaíl de Freitas / ThePortugalOnlineShop.com - All rights reserved
// ==/UserScript==


/////////Set variables for style - You can change this for the look////////

var TEXT = "10";
var COLOR = "white";
var BACK = "red";
var FONT = "x-large"

///////Low Quantity - You can use this for instance to set it to alert only below 5 items//////////

var QTY = /\b([2-9])\b/; ////Just change the numbers to minimum - maximum; [1-5], 2-9; etc

////////////////////////////////////////

//Open all variations!

var allLinks, thisLink;
allLinks = document.evaluate(
    ".//a[starts-with(text(),'Show')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    // do something with thisLink
	thisLink.style.color=BACK;
        thisLink.click();
	
}
//DONE!

///////////////////////////////////////////////////////

///////Highlight quantities from variations after 4 seconds///////////

function start() {
var allDivs, thisDiv;
allDivs = document.evaluate(
   "//span[starts-with(text(),'Available')]/..|//tr[starts-with(@id, 'newRow')]/td [6]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    // do something with thisDiv
	
	if(thisDiv.innerHTML.match(QTY)) {
   with(thisDiv.style){
     color="white";
     fontWeight="bold";
	 backgroundColor=BACK;
	 fontSize=FONT;
   }
 }
}
}


window.setTimeout(start, 4000);

//DONE!

///////Highlight quantities from regular items///////////

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//td[@id='AvailQty']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    // do something with thisDiv
	if(thisDiv.innerHTML.match(QTY)) {
   with(thisDiv.style){
     color="white";
     fontWeight="bold";
	 backgroundColor=BACK;
	 fontSize=FONT;
   }
 }

}

//DONE!

