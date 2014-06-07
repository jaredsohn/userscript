// eBay Report Item Link
// version 0.1
// 2006-08-31
// Copyright (c) 2006, bob2005euro
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// adadpted from Check For Shilling Links (2651) on http://www.nomorefaith.co.uk/ebay/shill.js
// which was in turn adapted from Simple eBay Item Links (2256) by http://finkel.org/avi/
// I repeat the credits from 2651 here:
// All credit for this script should be directed to Avi as the code is based almost entirely
// from his excellent Simple Ebay Links code, which by default makes this script incompatible
// with it. I simply find this link more useful.
// Note: This script was created due to the lack of a Report button on ebay.co.uk, and is
// only suitable there. Adjust your Greasemonkey regexps if you need to exclude other ebays.
//
// Changelog: 0.1 now only operates on cgi.ebay.co.uk listings by default;
//                changes text "Item number" instead of the number itself into a link to
//                eBay's contact us page for Listing Policy Breaches;
//                added attribute title to the a tag;
//
// -----------------------------------------------------------------------------
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
//
// -----------------------------------------------------------------------------
//
// ==UserScript==
// @name        eBay Report Item Link
// @namespace   http://www.geocities.com/spamfilterdemon/index.html
// @description Creates Item Link to Report listing for breaching Ebay.co.uk's Listing Policy. Incompatible with (and partly overridden by): Simple eBay Item Links (http://userscripts.org/scripts/show/2256) and Check For Shilling Links (http://userscripts.org/scripts/show/2651)
// @include     http://cgi.ebay.co.uk/*
// ==/UserScript==

(function()
{
	var tds = document.evaluate(
		'//td[@align=\'right\'][@nowrap]', document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	);

	for (var i = 0; i < tds.snapshotLength; i++) {
		var td = tds.snapshotItem(i);
		if (
			 td.childNodes &&
			(td.childNodes.length > 0) &&
			(td.childNodes.item(0).nodeType == 3)
		) {
			var top = td.childNodes.item(0);
			var initData = top.data;
			var inLoc = initData.indexOf("Item number:", 0);
                        if ( inLoc == -1 ) return;
			var nlLoc = initData.indexOf(":", 0);
			top.data = "";
			var num = initData.substr(nlLoc + 1, initData.length - 1);
			num = num.replace(/\x09/g,"").replace(/\x0a/g,"").replace(/ /g,"");
			var newLink = document.createElement("a");
			newLink.setAttribute("href",
					     "http://pages.ebay.co.uk/help/contact_us/_base/index_4.html?item="
					     + num
					     );
			newLink.setAttribute('title', 'Report item ' + escape(num) + ' for a Listing Policy Breach');
			var linkText = document.createTextNode(initData.substring(inLoc, nlLoc));
			newLink.appendChild(linkText);

			td.appendChild(newLink);
			var linkText2 = document.createTextNode(initData.substr(nlLoc, initData.length - 1));
			td.appendChild(linkText2);
			return;
		}
	}
})();
