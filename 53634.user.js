// ==UserScript==
// @name			Paypal Manager Title fixer
// @version			1.0
// @date			2009-07-13
// @namespace		http://userscripts.org/users/6623
// @description		Changes page title on Paypal Manager for easier browsing with tabs and back button dropdown list.
// @include			https://manager.paypal.com/*
// ==/UserScript==

var title = "";
var xp = document.evaluate("//div[@class='PageTitle']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (xp.snapshotLength == 0) return;

title = xp.snapshotItem(0).innerHTML.replace(/^\s*|\s*$/g,'');
title += " - PayPal Manager";
document.title = title;