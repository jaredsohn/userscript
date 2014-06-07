// ==UserScript==
// @name           Slickdeals Click Track Removal
// @author         h.zhuang
// @version        2013.05.28
// @description    it will remove coded links
// @lastchanges    added decodeURIComponent
// @updatetype     24
// @namespace      slickdeals.net
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