// ==UserScript==
// @name          Amazon Historical Price Linky
// @namespace     webg
// @description   Links to check Amazon Historical pricing; updated 2008-11-13.
// @include       http://*.amazon.com/*
// @date          2008-11-13
// @version       0.1.1
// @GM_version    0.6.4

// ==UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2008 C. Li

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://diveintomark.org/projects/greasemonkey/COPYING
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK */

// ==/UserScript==

(

function() {
  asin = window.location.href.match(/\/([A-Z0-9]{10})([\/\?].*)?$/)[1];
  if (asin){
	  var pTable = document.evaluate(
				    "//table[@class='product']",
				    document,
				    null,
				    XPathResult.
					FIRST_ORDERED_NODE_TYPE,
					null).singleNodeValue;
	  if (pTable) {
		// create the new row
		var lastIndex = pTable.rows.length;
		newLinkTR = pTable.insertRow(lastIndex);
		
		// create the td for image and set styles
		var newLinkTD = newLinkTR.insertCell(0);
		newLinkTD.setAttribute('class', 'productLabel');
		// build the HTML	
		newLinkTD.innerHTML = 'History:';

		// create the td for the link
		var newLinkTD = newLinkTR.insertCell(1);
		// set the styles
		newLinkTD.setAttribute('class', 'price')
		// build the HTML	
		newLinkTD.innerHTML = 
			'<a href="http://webgadgets.ws/aws/search-results.jsp?locale=0&index=All&keywords='+asin+'">Check here</a>';
	}
	else {
		GM_log('  Error: did not find the product table');
	}
  }
}
)();