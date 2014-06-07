// Yahoo Sucks, Woot Rules
// version 0.1.3
// 2008-06-18
// Copyright (c) 2007-2008 Erich Oelschlegel
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
// select "Yahoo Sucks, Woot Rules", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name Yahoo Sucks, Woot Rules
// @namespace http://erichjames.com/source/gm/
// @description Bypasses shopping.yahoo.com and goes straight to sellout.woot.com
// @include http://sellout.woot.com/
// @include http://sellout.woot.com/User/YahooRedirect.htm
// @include https://sellout.woot.com/User/YahooRedirect.htm
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
//  v0.1.3: added license block and modified namespace (18 Jun 2008)
//  v0.1.2: list of @includes and @excludes is bare-bones, but works with current woot/yahoo implementation (2 Apr 2008)
//  v0.1 fixed @include and @exclude so it doesn't perform the redirect when browsing other portions of the site

function bypass_yahoo() {
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://deals.yahoo.com/', 
    onload: function(details) {
       window.location = "http://sellout.woot.com/" + extractWootLink(details.responseText);
    }
  });
}

function extractWootLink(content) {
  var match = content.match(/sellout.woot.com\/Default.aspx%3FWootSaleId=([0-9]+)%26ts=([0-9]+)%26sig=([0-9a-f]{16})/);
  return "Default.aspx?WootSaleId=" + match[1] + "&ts=" + match[2] + "&sig=" + match[3];
}

bypass_yahoo();