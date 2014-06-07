// ==UserScript==
// @name        高级搜索
// @namespace   shw
// @include     http://tieba.baidu.com/*
// @author     Kusari
// ==/UserScript==

var forum_name = "";
var  allLinks,thisLink,newLink,forum;

forum = document.getElementById('wd1');
forum_name = forum.value;

allLinks = document.evaluate(
	'//span[@class="s_tools"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
thisLink = allLinks.snapshotItem(0);

newLink = document.createElement('span');
newLink.innerHTML = '<span class="s_tools"><a class="j_benba_search" target="_blank" href="http://tieba.baidu.com/f/search/adv?kw='+forum_name+'">高级搜索</a></span>';

thisLink.parentNode.insertBefore(newLink, thisLink);
thisLink.parentNode.removeChild(thisLink);