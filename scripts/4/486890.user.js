// ==UserScript==
// @name           Click Track URL Removal
// @author         jacksonyoyo
// @version        2014.05.05
// @description    刪除 Fastzone 等等轉址變更%3A%2F編碼鏈接為非編碼
// @lastchanges    added decodeURIComponent
// @updatetype     1
// @namespace      
// @include        https://fastzone.org/*
// @include        http://slickdeals.net/*
// @include        http://www.fatwallet.com/*
// ==/UserScript==

var thisLink, allLinks,linkArray;
allLinks = document.getElementsByTagName('a');
for (var j = 0; j < allLinks.length; j++) {
    thisLink = allLinks[j];
    if(thisLink.href.indexOf('http') !=-1)
	{
	linkArray=thisLink.href.split('http');
thisLink.href=decodeURIComponent('http'+linkArray[linkArray.length-1]);
thisLink.href=thisLink.href.replace(/&amp;/g,'&');
	}
}

