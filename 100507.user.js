// ccthere user script
// version 0.3
// 2011-04-09
// Copyright (c) 2011, Jianjiang Ceng
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "ccthere", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          ccthere
// @description   Script to highlight new replies on thread page

// @include       http://www.ccthere.com/thread/*
// @include       http://www.ccthere.com/topic/*
// @include       http://www.ccthere.com/board/*
// @include       http://www.ccthere.com/article/*
// @include       http://www.ccthere.com/bd-set/*

// @include       http://www.talkcc.com/thread/*
// @include       http://www.talkcc.com/topic/*
// @include       http://www.talkcc.com/board/*
// @include       http://www.talkcc.com/article/*
// @include       http://www.talkcc.com/bd-set/*

// @include       http://www.here4news.com/thread/*
// @include       http://www.here4news.com/topic/*
// @include       http://www.here4news.com/board/*
// @include       http://www.here4news.com/article/*
// @include       http://www.here4news.com/bd-set/*

// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==

document.addEventListener('click', function(event) {
    // event.target is the element that was clicked
    if(event.target.href.indexOf('article', 0)!=-1)
    {
        var key = 'C'+event.target.href.substring(event.target.href.lastIndexOf('/')+1);
		if(!GM_getValue(key, false))
		{
			GM_setValue(key, true);
		}
    }
}, true);

var allLinks, thisLink, link;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allLinks.snapshotLength; i++)
{
    thisLink = allLinks.snapshotItem(i);
    link = thisLink.href;
    if((link.indexOf('thread', 0)!=-1||link.indexOf('topic', 0)!=-1) && link.indexOf('#', 0)!=-1)
    {
    	var key = link.substring(link.indexOf('#', 0)+1);
		if(!GM_getValue(key, false))
		{
			thisLink.firstChild.data = '*'+thisLink.firstChild.data;
			GM_setValue(key, true);
		}
    }
    else if(link.indexOf('article', 0)!=-1)
    {
        var key = 'C'+link.substring(link.lastIndexOf('/')+1);
		if(!GM_getValue(key, false))
		{
			thisLink.firstChild.data = '*'+thisLink.firstChild.data;
		}
    }
}

var prevPageLink, nextPageLink;

if(document.URL.indexOf('/thread/', 0)!=-1 || document.URL.indexOf('/topic/', 0)!=-1)
{
	var navBars = document.evaluate(
    '//div[@id=\'DG_Left\']/div[@class=\'bPageNav\']',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    setPrevNextPageLink();
    for (var i = 0; i < navBars.snapshotLength; i++)
	{
		var navBar = navBars.snapshotItem(i);
		navBar.innerHTML = navBar.innerHTML+prevPageLink+nextPageLink;
	}
}

function isThreadURL(url)
{
	return url.indexOf('thread')!=-1;
}

function isTopicURL(url)
{
	return url.indexOf('topic')!=-1;
}

function getThreadBaseURL()
{
	if((isThreadURL(document.URL) && (document.URL.indexOf('thread')+6)!=document.URL.lastIndexOf('/')) || 
	   (isTopicURL(document.URL) && (document.URL.indexOf('topic')+5)!=document.URL.lastIndexOf('/')))
	{
		return document.URL.substring(0, document.URL.lastIndexOf('/'));
	}
	if(document.URL.lastIndexOf('#')!=-1)
	{
		return document.URL.substring(0, document.URL.lastIndexOf('#'));
	}
	return document.URL;
}

function setPrevNextPageLink()
{
	var baseURL = getThreadBaseURL();
	var prevPageNum = getLinkedPageNum(document.URL)-1;
	var nextPageNum = prevPageNum+2;
	if(prevPageNum != 0)
	{
		prevPageLink = ' <a href='+baseURL+'/'+prevPageNum+'>上页</a>';
	}
	else
	{
		prevPageLink = ' 上页';
	}
	var threadLinks = document.evaluate(
    '//a[contains(@href, \'/thread/\') or contains(@href, \'/topic/\')]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    var foundNextPage = false;
    for (var i = 0; i < threadLinks.snapshotLength; i++)
	{
		threadLink = threadLinks.snapshotItem(i);
		var linkedPageNum = getLinkedPageNum(threadLink.href);
		if(linkedPageNum >=nextPageNum)
		{
			foundNextPage = true;
			break;
		}
	}
	if(foundNextPage)
	{
		nextPageLink = ' <a href='+baseURL+'/'+nextPageNum+'>下页</a>';
	}
	else
	{
		nextPageLink = ' 下页';
	}
}

function getLinkedPageNum(link)
{
	if((link.indexOf('thread')+6)==link.lastIndexOf('/') || (link.indexOf('topic')+5)==link.lastIndexOf('/'))
	{
		return 1;
	}
	if(link.lastIndexOf('#')!=-1)
	{
		return link.substring(link.lastIndexOf('/')+1, link.lastIndexOf('#'));
	}
	return link.substring(link.lastIndexOf('/')+1);
}
