// Torec DDL Links Script
// ======================
// Written By: Amit Edelshtein.
// Last Update: 17.11.07
// 
// This script adds direct download links to torec.net.
// 
// Note: This is my first experience in writing scripts for Greasemonkey. 
// I am aware that there are some "ugly" bits of code here, but that's the only way
// it worked for me :)
// --------------------------------------------------------------------------------
// ==UserScript==
// @name          Torec DDL Links
// @namespace     Amit Corp.
// @description   Displays ddl links on torec.net main page and search results page
// @include       http://torec.net/
// @include       http://www.torec.net/
// @include       http://torec.net/series.asp*
// @include       http://www.torec.net/series.asp*
// @include       http://torec.net/ssearch.asp*
// @include       http://www.torec.net/ssearch.asp*
// @include       http://torec.net/category.asp*
// @include       http://www.torec.net/category.asp*
// ==/UserScript==

// Variable definition
var allLinks, subID, thisLink, directLinkText = 'http://www.torec.net/download.asp?sub_id='
// allLinks = document.evaluate("//table/tbody/tr/td/div/a[contains(@href, 'sub.asp')] | " + 
							 // "//table/tbody/tr/td/p/span/span/div/strong/a[contains(@href, 'sub.asp')] | " +
							 // "//table/tbody/tr/td/div/strong/font/a[contains(@href, 'sub.asp')] | " +
							 // "//table/tbody/tr/td/div/strong/a[contains(@href, 'sub.asp')] | " + 
							 // "//table/tbody/tr/td/div/*/*/a[contains(@href, 'sub.asp')] | " +
							 // "//table/tbody/tr/td/span/span/div/strong/a[contains(@href, 'sub.asp')] | " +
							 // "//table/tbody/tr/td/*/*/a[contains(@href, 'sub.asp')]",
							 // document, 
							 // null, 
							 // XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
							 // null);
// Get all link elements that link to a subtitle page (sub.asp) 
// (If torec was built correctly, this would've been way more simple...
allLinks = document.evaluate("//table/tbody/tr/td/*/a[contains(@href, 'sub.asp')] | " + 
							 "//table/tbody/tr/td/*/*/a[contains(@href, 'sub.asp')] | " +
							 "//table/tbody/tr/td/*/*/*/a[contains(@href, 'sub.asp')] | " +
							 "//table/tbody/tr/td/*/*/*/*/a[contains(@href, 'sub.asp')] | " +
							 "//table/tbody/tr/td/*/*/*/*/*/a[contains(@href, 'sub.asp')] | " +
							 "//table/tbody/tr/td/*/*/*/*/*/*/a[contains(@href, 'sub.asp')] | " +
							 "//table/tbody/tr/td/*/*/*/*/*/*/*/a[contains(@href, 'sub.asp')] | " +
							 "//table/tbody/tr/td/*/*/*/*/*/*/*/*/a[contains(@href, 'sub.asp')] | " +
							 "//table/tbody/tr/td/*/*/*/*/*/*/*/*/*/a[contains(@href, 'sub.asp')]",
							 document, 
							 null, 
							 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
							 null);
// For each element
for (var i = 0; i < allLinks.snapshotLength; i++)
{
	thisLink = allLinks.snapshotItem(i);
	// Create new span element
	directLink = document.createElement('span');
	// Get the subtitle ID
	subID = thisLink.href.substring(thisLink.href.indexOf('=') + 1);
	// Set HTML to be inserted to the page
	directLink.innerHTML = '&nbsp;&nbsp;&nbsp;<a _base_href="http://www.torec.net/" style="font-weight: bold; font-size: 14px; color: rgb(0, 128, 64);" href="download.asp?sub_id=' + subID + '">Direct Download</a>';
	// Insert the element to the page
	thisLink.parentNode.insertBefore(directLink, thisLink.nextSibling);
}