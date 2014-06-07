// ----------Куча комментариев----------------------------------------------
//
// ==UserScript==
// @name Убиралка постов
// @namespace sfw.so/
// @version 1.00
// @source google.com/
// @description Убирает нежелательные посты и/или категории
// @include http://sfw.so/
// @exclude http://*.habrahabr.ru/*
// @exclude habrahabr.ru/*
// @exclude absolvo.ru/*
// ==/UserScript==

var allNews, thisDiv;

//копировать этот блок можно сколько угодно раз :) 
allNews = document.evaluate("//div[@class='news_id']//div[@data-username='Cherniy_IT']/ancestor::div[@class='news_id']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

for (var i = 0; i < allNews.snapshotLength; i++) 
{
    thisDiv = allNews.snapshotItem(i); 
	thisDiv.parentNode.removeChild(thisDiv);
}
//----------------------------------------------------

//копировать этот блок можно сколько угодно раз :) 
allNews = document.evaluate("//div[@class='news_id']//div[@data-username='Комунист']/ancestor::div[@class='news_id']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

for (var i = 0; i < allNews.snapshotLength; i++) 
{
    thisDiv = allNews.snapshotItem(i); 
	thisDiv.parentNode.removeChild(thisDiv);
}
//----------------------------------------------------