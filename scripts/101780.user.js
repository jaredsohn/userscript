// <![CDATA[
// ==UserScript==
// @name           GoodSearch with Google Search Option
// @namespace      http://html-apps.com/greasemonkey/goodsearch
// @description    Adds a Google search option to goodsearch.com results
// @include        http://*.goodsearch.com/*
// @include        https://*.goodsearch.com/*
// @license        http://creativecommons.org/licenses/by-sa/3.0/us/
// @require        http://buzzy.260mb.com/AutoUpdater.js
// @version        7
// ==/UserScript==

autoUpdate(101780,"7");

var msg = 'GM script error: ';
//find the search button
var b = document.getElementById('search-button');
if(!b) msg+=('Cannot find search button. ');
//find the search text
var t = document.getElementById('keywords');
if(!t) msg+=('Cannot find search text. ');

if(!b||!t)
	window.status=msg+' Cannot run GoodSearch with Google Search Option';
else {
	var s = document.createElement('span');
	s.id='google_search_span';
	s.innerHTML='<button onClick="window.location.href=\'http://www.google.com/search?q='+(encodeURIComponent(t.value)).replace(/'/,'\\\'')+'\';return false;">Google</button>';
	b.parentNode.appendChild(s);

	
	var strTarget1='Your search did not yield any results';
	var strTarget2='Did you mean';
	var blnFound=false;
	
	searchWithinNode(document.body,strTarget1);
	if(blnFound)
	{
		blnFound=false;
		searchWithinNode(document.body,strTarget2);
		if(!blnFound)
		{
			window.location.href='http://www.google.com/search?q='+encodeURIComponent(t.value);
		}
	}
}
function searchWithinNode(objNode,strTextToFind)
{
	var pos,skip,spannode,middlebit,endbit,middleclone;
	skip=0;
	if(objNode.nodeType==3)
	{
		console.log(objNode.data.toUpperCase());
		pos=objNode.data.toUpperCase().indexOf(strTextToFind.toUpperCase());
		if(pos>=0)
		{
			blnFound=true;
			skip=1;
		}
	}
	else if(objNode.nodeType==1&&objNode.childNodes&&objNode.tagName.toUpperCase()!="SCRIPT"&&objNode.tagName.toUpperCase!="STYLE")
	{
		for(var child=0;child<objNode.childNodes.length;++child)
		{
			child=child+searchWithinNode(objNode.childNodes[child],strTextToFind);
		}
	}
	return skip;
}

// ]]>