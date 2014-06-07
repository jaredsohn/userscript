// Zooomr Auto Login
// version 0.1
// 25-07-2006
// Copyright (c) 2006, JAPIO
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "Zooomr Auto Login", and click Uninstall.
//
//
// ==UserScript==
// @name           Zooomr Auto Login
// @namespace      http://jaap.maos.nl
// @description    Auto Login for Zooomr. 
// @include        http://beta.zooomr.com/login
// @include        https://www.myopenid.com/signin?*
// ==/UserScript==
//
// ------------------------------------------------------------------------------------//
// For this script to work, you have to fill in your MyOpen.Id and your Password.
// This could be insecure!! Using this script is at your own responsibility
		var moiadress = 'http://########.myopenid.com'; // MyOpen.Id adress
		var moipass = '########'; // MyOpen.Id password
// ------------------------------------------------------------------------------------//


if (document.URL.search(/^http:\/\/beta.zooomr.com\/login*/) != -1)
{
	var allItems, thisItem;
	allItems = document.getElementsByTagName('input');
	for (var i = 0; i < allItems.length; i++)
	{
		thisItem = allItems[i];
		if(i==1)	thisItem.value = moiadress;
	}

	var allItems, thisItem;
	allItems = document.evaluate(
		"//input[@src='/images/tidbits/right_arrow.gif']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allItems.snapshotLength; i++) {
		thisItem = allItems.snapshotItem(i);
		thisItem.click();
	}
}

if (document.URL.search(/^https:\/\/www.myopenid.com\/signin*/) != -1)
{
	document.getElementById('password').value = moipass;

	var allItems, thisItem;
	allItems = document.evaluate(
		"//input[@value='Sign In']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allItems.snapshotLength; i++) {
		thisItem = allItems.snapshotItem(i);
		thisItem.click();
	}
}

//.user.js
