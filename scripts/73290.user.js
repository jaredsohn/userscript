// Flickr TopPager
// Copyright (c) 2010, Patrick Joseph.
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           	Flickr - TopPager
// @namespace		http://userscripts.org/users/isamux
// @description		Inserts a pager at the top of pages which only show a pager at the bottom of the page.
// @version         1.0.5
// @date            2011-04-24
// @creator         Patrick Joseph
// @include        	http://www.flickr.com/photos/*
// @include        	http://www.flickr.com/groups/*
// @include        	http://www.flickr.com/*/favorites*
// @exclude        	http://*.flickr.com/photos/friends*
// ==/UserScript==

// ==Changelog==
//2011-04-24 v1.0.5:
// * Adjusted IDs of paginated contents after change of HTML-structure on Flickr.
// 2010-05-18  1.0.2:
//  * fixed top pager on photostream pages. Only showed pager on first page due to css class change.      
// ==/Changelog==

// ---------------
//  CONFIGURATION
// ---------------
const CONST_ENABLE_FIREBUG_LOGGING = false;
const CONST_PAGINATED_CONTENT_XPATH_PHOTOSTREAM = '//div[starts-with(@class,"PhotoStream")]';
const CONST_PAGINATED_CONTENT_XPATH_GROUP = '//div[@class="HoldPhotos"]';
const CONST_PAGINATED_CONTENT_ID_FAVORITES = 'favoriteThumbs';

// ---------------
//  SCRIPT-MAIN
// ---------------
// 0. Prepare everything
// init logging
initLogging(console);

// I. get element before which the top pager will be inserted.
oPaginatedContent = getPaginatedContent();

// II. insert top page paginator
if(oPaginatedContent != null)
{
    console.info("TopPager: Paginated content was found");
	oPaginator = getPaginator();
	oPaginatorCopy = oPaginator.cloneNode(true);
    console.info("TopPager: Bottom paginator cloned");
	oPaginatedContent.parentNode.insertBefore(oPaginatorCopy, oPaginatedContent);
    console.info("TopPager: Finished adding top Pager");
}

// ===============
//  FUNCTION LIB
// ===============

function getPaginatedContent()
{
	// try get that element on photostream pages, ...
	oTmpFound =  getElement(CONST_PAGINATED_CONTENT_XPATH_PHOTOSTREAM);

	if(oTmpFound == null)
	{
		//...then on groups pages
		oTmpFound = getElement(CONST_PAGINATED_CONTENT_XPATH_GROUP);
	}

	if(oTmpFound == null)
	{
		//...and finally on favorites pages.
		oTmpFound = document.getElementById(CONST_PAGINATED_CONTENT_ID_FAVORITES);
	}

	return oTmpFound;
}

function getPaginator()
{
	return getElement('//div[@class="Pages"]');
}

function getElement(exp)
{
	var xpathResult = document.evaluate(
		exp,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
	return xpathResult.snapshotItem(0);
}

function initLogging(pConsole)
{
	if(typeof pConsole === "undefined" || !CONST_ENABLE_FIREBUG_LOGGING) 
	{
		console = { 	log: function() { }, 
						info: function() {}, 
						debug: function() { } ,
						warn: function() {},
						error: function() {} };
	}
}