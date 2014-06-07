// ==UserScript==
// @name           New Indian Express Epaper Fix
// @namespace      http://saravan.blogspot.com
// @description    Opens links in New Indian Express epaper in a new tab.
// @include        http://epaper.newindpress.com/*
// ==/UserScript==


/*********************************************************************
* New Indian Express Epaper Fix
*  - Opens links in New Indian Express epaper in a new tab.
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


if(unsafeWindow.openArticle) {
	__openArticle = unsafeWindow.openArticle;

	unsafeWindow.openArticle = function(url, art, W, H, type) {

		var urlIndex = -1;
		urlIndex = document.baseURI.lastIndexOf('/');
		if(urlIndex<0) {
			__openArticle(url, art, W, H, type);
			return;
		}
		
		if (type == 0) {
			url = url + "?article=" + art; 
		} 
		else { 
			url = url + "?article=" + art + "&amp;type=" + type; 
		} 
		GM_openInTab(document.baseURI.substring(0, urlIndex+1) + url); 
	}
}

if(unsafeWindow.PrintView) {
	__PrintView = unsafeWindow.PrintView;
	
	unsafeWindow.PrintView = function() {
		var urlIndex = -1;
		urlIndex = document.baseURI.lastIndexOf('/');
		if(urlIndex<0 || !unsafeWindow.artName) {
			__PrintView();
			return;
		}
		window.location.href = document.baseURI.substring(0, urlIndex+1) + "ArticleImage.aspx?article=" + unsafeWindow.artName;
	}
}


if(unsafeWindow.TextView) {
	__TextView = unsafeWindow.TextView;
	
	unsafeWindow.TextView = function() {
		var urlIndex = -1;
		urlIndex = document.baseURI.lastIndexOf('/');
		if(urlIndex<0 || !unsafeWindow.artName) {
			__TextView();
			return;
		}
		window.location.href = document.baseURI.substring(0, urlIndex+1) + "ArticleText.aspx?article=" + unsafeWindow.artName;
	}
}
