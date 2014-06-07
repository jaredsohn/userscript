// ==UserScript==
// @name           Indiaglitz Gallery Prettifier
// @description    Remove the top banners in Indiaglitz gallery page and adds key board shortcuts for navigation.
// @namespace      http://saravan.blogspot.com
// @include        http://www.indiaglitz.com/*/gallery/*
// ==/UserScript==

/*********************************************************************
* Indiaglitz Gallery Prettifier
*  - Remove the top banners in Indiaglitz gallery page.
*  - Adds key board shortcuts for navigation.
* Copyright (C) 2008, Saravana Kumar <saravanannkl@gmail.com>
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 2 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program; if not, write to the Free Software
* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
* 02110-1301  USA
*********************************************************************/

document.body.style.backgroundColor = "#fff";
var imgTable = document.evaluate("//table[contains(@width, '95%')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
if(imgTable.snapshotLength>0) {
	document.body.innerHTML = '<table  cellspacing="2" cellpadding="2" border="0" align="center"><tr><td>' + imgTable.snapshotItem(0).innerHTML + '</td><tr></table>';
}
	
	
var nextImg = document.evaluate("//a[contains(text(), 'Next')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);	
if(nextImg.snapshotLength>0)
	nextLink = nextImg.snapshotItem(0);
	
var prevImg = document.evaluate("//a[contains(text(), 'Prev')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);	
if(prevImg.snapshotLength>0)
	prevLink = prevImg.snapshotItem(0);

document.addEventListener('keypress', 
		function (e) {
			try {
				switch (e.keyCode) {
					case e.DOM_VK_LEFT:
						if(prevLink)
							window.location.href = prevLink.href;
						break;
					case e.DOM_VK_RIGHT: 
						if(nextLink)
							window.location.href = nextLink.href;
						break;
				}
			}
			catch(e) {
				GM_log('Exception in Keyboard handler: ' + e.toString());
			}
		}
		, true);
