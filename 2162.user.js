// TWP - The Whole Story
// version 0.5
// 2010-01-24
// Copyright (c) 2005-2009, Brent Charbonneau
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "TWP - The Whole Story", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          TWP - The Whole Story
// @namespace     http://projects.apathyant.com/twp
// @description   Loads and appends all remaining story pages on TelevisionWithoutPity.com recap pages
// @include       http://*.televisionwithoutpity.com/show/*/*
// ==/UserScript==

function loadStoryPage(page, maxPage, nextHref) {
	pageHref = getStoryPageURL(page, nextHref);
	GM_log('Fetching ' + pageHref);
	
	GM_xmlhttpRequest
	   ({
	   method:'GET',
	   url: pageHref,
	   onload:function(response) {
			var storytext, doc, results, storyPage;
			
			doc = document.createElement('div');
			doc.innerHTML = response.responseText;
			
			results = document.evaluate('//div[@class="body_recap"]', doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			if(results) storytext = results.singleNodeValue;

			if (storytext) {
				results = document.evaluate('//div[@class="article_pages"]', storytext, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
				if (results) {
					results.singleNodeValue.style.display = 'none';
				}
				storyPage = document.getElementById('story-page-' + page);
				storyPage.innerHTML = '<span class="story_text"><hr /><div style="text-align: right;">pg ' + page + ' of ' + maxPage + '</div></span>';
				storyPage.childNodes[0].appendChild(storytext);
				if ( page < maxPage ) { 
					loadStoryPage(page+1, maxPage, nextHref);
				}
			}
		}});
}

function getStoryPageURL(page, nextHref) {
	return nextHref.replace(/\?page=[0-9]+/, '?page=' + page);
}


var hasPager = document.evaluate(
	'//div[@class="article_pages"]',
	document,
	null,
	XPathResult.FIRST_ORDERED_NODE_TYPE,
	null);

// If we don't have a pager, we don't have anything to do
if(!hasPager) return;
var pager = hasPager.singleNodeValue;
if(!pager) return;

// Get the total number of pages
var anchorTextBeforeNextLink = document.evaluate('//ul[@class="pages"]/li/a[normalize-space(text()) = "Next"]/../preceding-sibling::*[1]/a/child::text()', document, null, 
XPathResult.STRING_TYPE, null);
if(anchorTextBeforeNextLink) {
	totalPages = parseInt(anchorTextBeforeNextLink.stringValue);
	if(!totalPages) return;
}


var nextHref = document.evaluate('//ul[@class="pages"]/li/a[normalize-space(text()) = "Next"]/attribute::href', document, null, XPathResult.STRING_TYPE, null);
if(nextHref) {
	nextHref = nextHref.stringValue;
}
if(!nextHref) return;

var startPage;
var selectedPage = document.evaluate('//ul[@class="pages"]/li/a[@class="item selected"]/child::text()', document, null, XPathResult.STRING_TYPE, null);
if(selectedPage ) {
	startPage = parseInt(selectedPage.stringValue);
}
if(!startPage) startPage = 1;

var appendedPageElem;

if(pager)
	pager.style.display = 'none';

if(startPage && totalPages && startPage < totalPages){
	for(var pageCounter = totalPages; pageCounter > startPage; pageCounter--){
		appendedPageElem = document.createElement('div');
		appendedPageElem.id = 'story-page-' + pageCounter;
		appendedPageElem.innerHTML = '<span style="text-decoration: blink; font-size: 8pt;">Loading page ' + pageCounter  + '...</span>';
		pager.parentNode.parentNode.insertBefore(appendedPageElem, pager.parentNode.nextSibling);
		appendedPageElem = null;
	}
	loadStoryPage(startPage+1, totalPages, nextHref);
}

