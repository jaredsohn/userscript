// Complete Untrollifier script for BoingBoing
// version 0.epsilon
// Jan 17, 2008  by bcolbeck. modification of script by "crash"
// Jan 14, 2008  by bb user "Crash"
// 
// Released under Creative Commons Attribution-ShareAlike 3.0 US License. 
// http://creativecommons.org/licenses/by-sa/3.0/us/
//
// --------------------------------------------------------------------
//
// This script allows you to mute comments by ALL individuals
// on BoingBoing's comment threads, so that they vanish from the
// web page altogether, like inconvenient dissenters from a Soviet
// archive. With this installed, you need never encounter a differing
// point of view again!
//
//
// "Inspired by" crash's script, and that BetterTube thing.
// 
// This is my first-ever Greasemonkey script. That is why it looks
// like it was written by inept monkeys.
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Complete BoingBoing Mute
// @namespace     http://boingboing.net/
// @description   This script lets you filter out ALL users' comments in BoingBoing threads. 
// @include       http://*.boingboing.net/*
// @include       http://www.boingboing.net/*
// ==/UserScript==


//  --- DO NOT EDIT BELOW THIS LINE --- 


// // Okay, first do the comment thread at the bottom.
var xquery = "//div[@class='comment-header']";

var allDivs, thisDiv;
allDivs = document.evaluate(
    xquery,
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


for (var i = 0; i < allDivs.snapshotLength; i++) 
{
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.parentNode.style.display="none"; // make invisible, don't remove from DOM

	
}

// // Now do the sidebar.
xquery = "//div[@id='block-recentcomments']/descendant::li";
allDivs = document.evaluate(
    xquery,
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allDivs.snapshotLength; i++) 
{
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.style.display="none";

}
