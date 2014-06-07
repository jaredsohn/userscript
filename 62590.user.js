// AuctionSearchKit - "uBongle All Categories" User Script
// Version 1.1
// 2009-11-24
// Copyright (c) 2008, Auction Search Kit. All rights reserved.
// Feedback to auctionsearchkit@gmail.com is welcome.
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
// select "eBay Supercharged Email Alerts", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          uBongle All Categories
// @namespace     http://www.auctionsearchkit.co.uk
// @description   Search for free delivery (non-marketplace) items in Amazon by adding "All Categories" to www.ubongle.com
// @include       http://www.ubongle.*
// ==/UserScript==

var catElement = document.getElementById('catselect');
if (catElement != null) {
  // Add "All Categories" option
  var newElement = document.createElement('option');
  newElement.value = 'Blended';
  newElement.innerHTML = 'All Categories';
  catElement.insertBefore(newElement, catElement.childNodes[2]);
  
  // Set "All Categories" as the default category
  catElement.selectedIndex = 1;
}
