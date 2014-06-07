// ==UserScript==
// @name          eBay Item Link V2
// @version       2.1.0.0
// @date          2012/02/05
// @namespace     http://userscripts.org/scripts/show/61353
// @description   Share smaller links to eBay items.
// @creator       Jesse Graffam
// @contributor   Avi Finkel
// @copyright     Jesse Graffam
// @license       GPL v3; http://www.gnu.org/licenses/gpl-3.0.html
// @id            8746c50f-301f-415f-b651-56896b9d2dd8
// @require       http://usocheckup.redirectme.net/61353.js?maxage=7&minage=12
// @include       http://*.ebay.tld/*
// ==/UserScript==
//
// © Jesse Graffam
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// version 3 as published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You can receive a copy of the GNU General Public License by
// visiting http://www.gnu.org/licenses/gpl-3.0.html

(function()
{
	var m_XPsnap_1 = document.evaluate("//div//div[@class='z_b']//table[@cellpadding='3']//tr//td[@valign='top']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	);
	
	if (m_XPsnap_1.snapshotLength > 0)
	{
		// RegEx to find the item number
		const itemNumRegEx = /^(\d*)$/
		
		for (var i = 0; i < m_XPsnap_1.snapshotLength; i++) {
			var td = m_XPsnap_1.snapshotItem(i);
			
			// check if the node starts with text
			if (
				td.childNodes &&
				(td.childNodes.length > 0) &&
				(td.childNodes.item(0).nodeType == 3)
				)
			{
				// check if the node content is only numbers
				if (itemNumRegEx.test(td.textContent))
				{
					// can has item number
					var num = td.childNodes.item(0).data;
					// create new DOM parts
					var newDiv = document.createElement("div");
					newDiv.innerHTML = '<A HREF="/itm/'
						+ num
						+ '">'
						+ num
						+ '</A><BR/>'
						+ '<FORM><INPUT ID="g_eBayAuctionURL" TYPE="input" VALUE="'
						+ 'http://' + window.location.host + '/itm/' + num
						+ '" STYLE="font-size:7pt;width:80px;" ONCLICK="javascript:g_eBayAuctionURL.select();"/></FORM>';
					// replace the unlinked text
					td.replaceChild(newDiv,td.childNodes[0]);
				}
			}
		}
	}
})();
