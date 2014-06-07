// Haaretz Talkbacks
// Version 0.22
// Originally by: Lior Zur, 2006
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Changelog:
// 0.22 (17.10.06) Added the new captain internet URL - http://themarker.captain.co.il/*
// 0.21 (5.10.06) updated removing of daily talkback.
// 0.2 removing "the daily talkback" on the front page.
// 0.12 removed "remove textual advertisements". this feature was moved
//		to another script: Haaretz Enhancer.
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.2.6 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Haaretz Talkbacks
// @namespace      tag:haaretz.co.il,2006-08-29:haaretztalkback.
// @description    Removes all talkbacks from Haaretz site.
// @include        http://www.haaretz.co.il/*
// @include        http://haaretz.co.il/*
// @include        http://www.captain.co.il/*
// @include        http://themarker.captain.co.il/*
// ==/UserScript==

////////////////////////////////////////////////
// 1. Remove the talkback table
////////////////////////////////////////////////

//Lodate the talkback table
var allElements, thisElement;
allElements = document.evaluate(
    "//a[contains(@onclick,'/captain/objects/ResponseDetails.jhtml')]/parent::*/parent::*/parent::*/parent::*",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
//Remove the talkback table (there should be only one, contrary to this loop).
for (var i = 0; i < allElements.snapshotLength; i++) {
    thisElement = allElements.snapshotItem(i);
    // delete the selected element(s)
    //thisElement.style.backgroundColor = 'red';
    thisElement.parentNode.removeChild(thisElement);
}

////////////////////////////////////////////////
// 2. Remove various mentions of "talkbacks"
//    from the main and opinions pages
////////////////////////////////////////////////

allElements = null;
thisElement = null;
allElements = document.evaluate(
    "//a[@class='t11Resp']|//a[@class='t12Ubl1New']|//a[@class='t11BlPrint']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (f = 0; f < allElements.snapshotLength; f++) {
    thisElement = allElements.snapshotItem(f);
    // delete the selected element(s)
    //thisElement.style.backgroundColor = 'red';
    thisElement.parentNode.removeChild(thisElement);
}

////////////////////////////////////////////////
// 3. Remove the "Daily Talkback" from the front page
////////////////////////////////////////////////
allElements = null;
var reIsHaaretz = /^http:\/\/www\.haaretz\.co\.il/;
var reNotMainPage = /^http:\/\/www\.haaretz\.co\.il\/[^?]/;
currentURL = location.href;
if (!reNotMainPage.test(currentURL) && reIsHaaretz.test(currentURL)) {
	var txtDailyTalkback = String.fromCharCode(1492,1496,1493,1511,1489,1511,32,1492,1497,1493,1502,1497);
	var txtDailyTalkback2 = String.fromCharCode(1496,1493,1511,1489,1511,32,1497,1493,1502,1497);
	allElements = document.evaluate(
	    "//span[contains(text(),'" + txtDailyTalkback + "')]/parent::*/parent::*" + "|//span[contains(text(),'" + txtDailyTalkback2 + "')]/parent::*/parent::*",
	    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var ttt, tdel;
	for (f = 0; f < allElements.snapshotLength; f++) {
	    ttt = allElements.snapshotItem(f);
	     for (var g = 0; g < 7; g++) {
	    	// (7 instead of 3 because of the whitespace nodes in Gecko) - http://developer.mozilla.org/en/docs/Whitespace_in_the_DOM
	    	tdel = ttt;
	    	ttt = ttt.previousSibling; //node_before(ttt);
		tdel.parentNode.removeChild(tdel);
	    }
	}
}//end front page
