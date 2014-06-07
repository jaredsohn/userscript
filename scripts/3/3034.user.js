// ==UserScript==
//
// trendmls.user.js - TReNDMLS Listing Google Maps Hack.
// $Id: trendmls.user.js 595 2006-01-30 08:37:14Z dirk $
//
// Notes:
//     * This is a wacky wacky hard-coded hack that keys on checkbox proceeding
//       each address. Too bad they didn't tag address! The traversal path is:
//
//           <td><input type="checkbox"...
//           <td>
//           <td><font><font-style><text>address...   <= address wrapper is td
//
// Copyright (c) 2006, Dirk Leas
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "TReNDMLS Listing Google Maps Hack", and click Uninstall.
//
// --------------------------------------------------------------------
//
// @namespace     http://www.techsteward.com/gm
// @name          TReNDMLS Listing Google Maps Hack
// @description   Wrap addresses with link to Google Maps in hybrid view.
// @include       http://weblinks.trendmls.com/*
//
// ==/UserScript==

var inputs = document.getElementsByTagName('input'), 
  mapsURL = 'http://maps.google.com/maps?t=h&q=';
for (var x=0; x<inputs.length; x++) {
   if (inputs[x].getAttribute('type') == 'checkbox') {
     addressWrapper = inputs[x].parentNode.nextSibling.nextSibling;
     address = addressWrapper.firstChild.firstChild.firstChild.textContent;
     addressWrapper.innerHTML = 
       '<a target="_blank" href="' + mapsURL + address + '">' + addressWrapper.innerHTML + '</a>';
   }
}
