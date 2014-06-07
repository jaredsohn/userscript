// ==UserScript==
// @id             embedgeocachefi@kenmooda@gmail.com
// @name           Embed Geocache.fi
// @version        1.0.3
// @namespace      kenmooda@gmail.com
// @author         Tommi Rautava
// @description    Embed cache info frame from Geocache.fi on a Geocaching.com cache page.
// @updateURL      https://userscripts.org/scripts/source/114472.user.js
// @include        http://www.geocaching.com/seek/cache_details.aspx*
// @include        http://www.geocaching.com/geocache/*
// @run-at         document-end
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////
//
//    Embed Geocache.fi
//    Copyright (C) 2011, 2013  Tommi Rautava
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
////////////////////////////////////////////////////////////////////////////////

var gcCodeElem = document.getElementById('ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode');

if (gcCodeElem) {
	var gcCode = gcCodeElem.textContent;
	
	if (gcCode) {
		var downloadDivElem = document.getElementById('Download');
		
		if (downloadDivElem) {
			var refNode = document.evaluate("//div[@class='InformationWidget Clear']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

			if (refNode) {
				var gcfiFrame = document.createElement("iframe");
				gcfiFrame.src = 'http://www.geocache.fi/caches/cachetieto.php?printpage=1&wp='+ gcCode;
				gcfiFrame.setAttribute('width', '100%');
				gcfiFrame.setAttribute('height', '205px');
				gcfiFrame.setAttribute('style', 'border:1px solid #b0b0b0;padding-bottom:1px');
				refNode.parentNode.insertBefore(gcfiFrame, refNode.parentNode.firstChild);
			}
			else
			{
				GM_log("Ref node not found.");
			}
		}
		else
		{
			GM_log("Download node not found.");
		}
	}
	else
	{
		GM_log("GC code not found.");
	}
}
else
{
	GM_log("GC code node not found.");
}

// EOF