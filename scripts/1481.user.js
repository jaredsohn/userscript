// ==UserScript==
// @name		TimesPagingRemover
// @namespace       	http://saravan.blogspot.com
// @version		2005-11-21
// @description		Removes the paging in Times Group Websites articles and presenting them in a single page.
// @include		http://timesofindia.indiatimes.com/*
// @include		http://economictimes.indiatimes.com/*
// ==/UserScript==
//
// Comments/Suggestions ? saravanannkl at gmail dot com
//
// Tested with
// 	Firefox 1.0.7/Greasemonkey 0.53
//
// This script is broken in Firefox 1.5 
// 	Firefox Bug - https://bugzilla.mozilla.org/show_bug.cgi?id=307980
//	Greasemonkey changes for the resolution - http://www.mozdev.org/pipermail/greasemonkey/2005-November/thread.html#6756
//	This script should work in the Firefox 1.5 and next version of Greasemonkey.
//
// ChangeLog
// 2005-11-21
//	Updated script to support new TOI design.
//	Improved the content sniffing from printer friendly page.
// 2005-08-03
//	First Release.
//
// BEGIN LICENSE BLOCK
// Copyright (C) 2005 Saravana Kumar
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You can download a copy of the GNU General Public License at
// http://www.gnu.org/licenses/gpl.txt
// or get a free printed copy by writing to the Free Software Foundation,
// Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
// 
// END LICENSE BLOCK 

var toiHostName = 'timesofindia.indiatimes.com';
var isTOI = (toiHostName.indexOf(document.location.host) > -1);
var prnFrame;
var resp;

function getPrinterFriendlyPage() {
	//Check for links with prtpage
	var prtLink = document.evaluate("//a[contains(@href, 'prtpage')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(prtLink.snapshotLength==0) return;
	return prtLink.snapshotItem(0).href;
}

function loadArticle(prnUrl) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: prnUrl,
		onload: function(res) {
			try {
				resp = res.responseText;
				resp = resp.replace("window.print();", "");
				resp = resp.replace("setTimeout('window.close()',500);", "");
				// GM_log(resp);
				var newFrame = document.createElement('iframe');
				newFrame.style.display = "none";
				prnFrame = document.body.insertBefore(newFrame, document.body.lastChild.nextSibling);
				window.setTimeout(loadContent, 1);
			}
			catch (e) {
				GM_log('Exception caught: ' + e.toString());
				if(prnFrame) document.body.removeChild(prnFrame);
			}
		}
	});
}

function loadContent() {
	try {
		var iframeDoc = prnFrame.contentDocument;
		iframeDoc.documentElement.innerHTML = resp;
	
		var storyContentHolder = getContentPlaceHolder(iframeDoc);
		
		if(!storyContentHolder) {
			GM_log('Unable to locate the content in the printer friendly page of the url: ' + document.location.href);
			return;
		}
		contentPlaceHolder = getContentPlaceHolder(document);
		if(!contentPlaceHolder) {
			GM_log('Unable to locate the placeholder for content in the url: ' + document.location.href);
			return;
		}
		var storyContent = storyContentHolder.innerHTML;
		//GM_log(storyContent);
		contentPlaceHolder.innerHTML = storyContent;
		hideNavigation();
	}
	catch (e) {
		GM_log('Exception caught: ' + e.toString());
	}
	finally {
		document.body.removeChild(prnFrame);
	}
}

function getContentPlaceHolder(doc) {
	var contentPlaceHolder;
	if(isTOI) {
		var navStory = doc.evaluate('//td[@class="story"]', doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if(navStory.snapshotLength>1)
			contentPlaceHolder = navStory.snapshotItem(1);
	}
	else 
		contentPlaceHolder = doc.getElementById('bellyad');
	
	return contentPlaceHolder;
}

function hideNavigation() {
	//GM_log('Hide Navigation');
	if(!isTOI) {
		var navTD = document.evaluate('//td[@class="textpn"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if(navTD.snapshotLength==0) return;
		navTD.snapshotItem(0).style.display = 'none';
	}
}

function processPage() {
	var prnUrl = getPrinterFriendlyPage();
	// GM_log('Site Url: ' + window.location);
	// GM_log('Print Url: ' + prnUrl);
	if(prnUrl) loadArticle(prnUrl);
}

processPage();