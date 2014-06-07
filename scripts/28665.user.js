// Sellout.Woot Links
// version v0.3
// 2009-10-12
// Copyright (c) 2008-2009 Erich Oelschlegel, David Rorex
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/GreaseMonkey/Manage User Scripts,
// select "Sellout.Woot Links", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name Sellout.Woot Links
// @namespace http://erichjames.com/source/gm/
// @description puts a link to sellout.woot.com on *.woot pages
// @include http://*.woot.com/*
// @exclude http://sellout.woot.com/*
// ==/UserScript==

/* BEGIN LICENSE BLOCK
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl-3.0.txt or get a free printed 
copy by writing to:
  Free Software Foundation, Inc., 
  51 Franklin Street, Fifth Floor, 
  Boston, MA 02110-1301, USA.
END LICENSE BLOCK */

// CHANGELOG
//  v0.3: made it work again with newest woot layouts (12 Oct 2009) (David)
//  v0.2: fixed themage issues for shirt.woot and wine.woot (20 Jun 2008) (Erich)
//  v0.1a: initial release (18 Jun 2008) (Erich)
// FUTURE PLANS
//  - rewrite extractWootLink() and getTitle() into one function so as to
//    limit regular expression matching.
//  - consolidate functions into a common library for use with my other
//    sellout.woot script (http://userscripts.org/scripts/show/13074)

// javascript lacks everything php has in the date/time methods department which
// is why this function is here.  basically this gets the current date of the
// woot.com servers (which are located in central time, GMT-600)
function getTheDate() { 
  var d=new Date();
  var month=new Array(12); 
  var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  var nd = new Date(utc + (3600000*-5));
  month[0]="JAN";
  month[1]="FEB";
  month[2]="MAR";
  month[3]="APR";
  month[4]="MAY";
  month[5]="JUN";
  month[6]="JUL";
  month[7]="AUG";
  month[8]="SEP";
  month[9]="OCT";
  month[10]="NOV";
  month[11]="DEC";
  return month[nd.getMonth()] + " " + nd.getDate();
}

// scans shopping.yahoo.com for the sellout.woot.com link
function extractWootLink(content) {
  var match = content.match(/sellout.woot.com\/Default.aspx%3FWootSaleId=([0-9]+)%26ts=([0-9]+)%26sig=([0-9a-f]{16})/);
  return "http://sellout.woot.com/Default.aspx?WootSaleId=" + match[1] + "&ts=" + match[2] + "&sig=" + match[3];
}

function insertSellout() {
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://deals.yahoo.com/', 
    onload: function(details) {
      var allDivs, 
          selloutHere, 
          site = window.location.host, 
          searchtxt; 

      searchtxt = "//a[@href='http://sellout.woot.com']";

      // locate where in the page we will insert the new link
      allDivs = document.evaluate(searchtxt, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

      var selloutLink = extractWootLink(details.responseText);
      allDivs.snapshotItem(0).href = selloutLink;
      allDivs.snapshotItem(1).href = selloutLink;
      
    } // end function(details)
  }); // end GM_xmlhttprequest()
} // end insertSellout()

// now, actually call our function to execute
insertSellout();