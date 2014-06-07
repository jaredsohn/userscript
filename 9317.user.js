// QuikStok v. 0.1 BETA 2007-05-26
// please use it at your own risk & don't tell me I didn't warn you
// Copyright (c) 2007, Tcd
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
//
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Quik Stok", and click Uninstall.
//
// What does it do? It's for neopets users that want a fast way to
// move all the items present in their inventory to their store.
//
// The best way to use this script is in conjunction with the
// "Dice-A-Roomatic" script or with the "Something Will Happen" script
// but I think you can find by yourself other uses for it :)
//
// If you're curious about the abovesaid scripts:
// Dice-A-Roomatic:        http://userscripts.org/scripts/show/9469
// Something Will Happen:  http://userscripts.org/scripts/show/6708
//
// --------------------------------------------------------------------
// TO DOs:
// 1) find a way to redirect autogically items to the SDB when store's full.
//
// 2) better handling of errors thrown out by process_quickstock.phtml,
//    usually caused by other win/tabs acting on the inventory almost
//    at the same time the quickstock form autosubmits itself.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           QuikStok 0.1
// @namespace      neopets
// @description    autoselects all items in the quickstock form to be put in your store
// @include        http://neopets.com/quickstock.phtml
// @include        http://neopets.com/process_quickstock.phtml
// ==/UserScript==

//	customizable variables:
//		autoreload is quite clear, duhh.
//		n is a random seeder for the autoreload
var autoreload = 'on';
var n = 2;

// Tweak with these only after you've
// understood what they are actually doing.
// The n seeder puts the range of reload frequency
// in something ranging from 30 seconds to 1 minute
// if you put the seeder to, say, 4 the range goes
// up to 3 minutes. Hopefully.
// This random() has given me a lot of headaches.
var SECOND = 1000;
var MINUTE = 60 * SECOND;
var PERIOD = Math.floor(Math.random() * n) * MINUTE;
if (PERIOD < 1) {PERIOD = 30 * SECOND;}

function FillStock()
{
	QSubmit = document.evaluate(
		'//form[@name="quickstock"]', document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	if (QSubmit.snapshotItem(0))
	{
		getStock = document.evaluate(
			"//input[@value='stock']", document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		for (var i = 0; i < getStock.snapshotLength; i++)
		{getStock.snapshotItem(i).click();}

		QSubmit.snapshotItem(0).submit();
	}
	else if (autoreload == 'on')
		{window.setTimeout(function(){window.location.reload();}, PERIOD);}
}

window.addEventListener("load", FillStock, true);