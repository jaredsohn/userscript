// ==UserScript==
// @name           BollyzoneDirectLinks
// @namespace      Pi
// @description    Convert ad-full indirect links on bollyzone to direct video links
// @include        http://bollyzone.*
// @include        http://*desi-tashan.com/*
// @include        http://www.apnicommunity.com/*
// @include        http://www.desirulez.net/*
// @version        1.5
// ==/UserScript==

var badLinksArray = ['youtube', 'yt.php', 'u1.php', 'desi-tashan', 'you.php', 'dailymotion', 'dm.php', 'daily.php', 'dm1.php', 'zshare', 'zs.php'];
var queryStringsArray = ['url','v','U','id'];
var goodLinksArray = ['http://www.youtube.com/watch?v=',
					'http://www.youtube.com/watch?v=',
					'http://www.youtube.com/watch?v=',
					'http://www.youtube.com/watch?v=', 
					'http://www.youtube.com/watch?v=', 
					'http://www.dailymotion.com/video/', 
					'http://www.dailymotion.com/video/', 
					'http://www.dailymotion.com/video/', 
					'http://www.dailymotion.com/video/', 
					'http://www.zshare.net/video/',
					'http://www.zshare.net/video/'];

function getChildrenByXPath(currentNode, xpath, CallBack, secondArgument)
{
	var returnArray = new Array();	
	var nodesSnapshot = document.evaluate(xpath, currentNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ )
		returnArray.push(CallBack ? CallBack(nodesSnapshot.snapshotItem(i), secondArgument) : nodesSnapshot.snapshotItem(i));

	return returnArray;
}

function replaceLink(badLink, goodLink)
{
	var k;
	var findStr = "";
	for(k=0; k < queryStringsArray.length; k++)
	{
		findStr = queryStringsArray[k] + "=";
		var ind = badLink.href.indexOf(findStr);
		if(ind > 0)
		{
			badLink.href = goodLink + badLink.href.substr(ind + findStr.length);
			break;
		}
	}
}

function replaceLinks()
{
	var i;
	if(badLinksArray.length != goodLinksArray.length)
		alert('Lengths of array not equal');
	for(i = 0; i < badLinksArray.length; i++)
		getChildrenByXPath(document, "//a[contains(@href,'"+badLinksArray[i]+"')]", replaceLink, goodLinksArray[i]);
}

replaceLinks();