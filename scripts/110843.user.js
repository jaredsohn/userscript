// ==UserScript==
// @name           Link to Geocache.fi
// @version        1.0.2
// @author         Tommi Rautava
// @namespace      kenmooda@gmail.com
// @description    Adds links to Geocache.fi on Geocaching.com site.
// @updateURL      https://userscripts.org/scripts/source/110843.user.js
// @include        http://www.geocaching.com/geocache/*
// @include        http://www.geocaching.com/seek/cache_details.aspx*
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////
//
//    Link to Geocache.fi
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

function createLinksArea(parentNode) {
	var myDiv = document.createElement('DIV');
	myDiv.id = 'LinksToGeocacheFi';
	parentNode.appendChild(myDiv);
	
	var myPara = document.createElement('P');
	myPara.className = 'NoBottomSpacing';
	myDiv.appendChild(myPara);

	var titleSpan = document.createElement('SPAN');
	titleSpan.setAttribute('style', 'font-weight:bold;');
	titleSpan.appendChild(document.createTextNode('Geocache.fi'));
	myPara.appendChild(titleSpan);
	myPara.appendChild(document.createTextNode(': '));
	
	var linksArea = document.createElement('SMALL');
	myPara.appendChild(linksArea);
	
	return linksArea;
}

function createLink(text, href) {
	var link = document.createElement('A');
	link.setAttribute('href', href);
	link.setAttribute('target', '_blank');
	link.appendChild(document.createTextNode(text));
	return link;
}

var gcCodeElem = document.getElementById('ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode');

if (gcCodeElem) {
	var gcCode = gcCodeElem.textContent;
	
	if (gcCode) {
		var downloadDivElem = document.getElementById('Download');
		
		if (downloadDivElem) {
			var linksArea = createLinksArea(downloadDivElem.parentNode);
			
			linksArea.appendChild(createLink('Info', 'http://www.geocache.fi/caches/cachetieto.php?tarkka=1&wp='+ gcCode));
			linksArea.appendChild(document.createTextNode('\n'));
			
			linksArea.appendChild(createLink('Map', 'http://www.geocache.fi/kartta/index.php?showinfo='+ gcCode));
			linksArea.appendChild(document.createTextNode('\n'));
		}
	}
}

// EOF