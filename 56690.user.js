// ==UserScript==
// @name			New York Times Single Page Articles
// @author			Erik Vold
// @namespace		nytSinglePageArticles
// @include			/https?:\/\/(www\.)?nytimes\.com/i
// @include			http*://*.nytimes.com*
// @include			http*://nytimes.com*
// @match			http://www.nytimes.com/*
// @match			http://nytimes.com/*
// @match			https://www.nytimes.com/*
// @match			https://nytimes.com/*
// @version			0.1.4
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-08-30
// @lastupdated		2010-02-14
// @description		This userscript automatically redirects you to a full article page if you are viewing a multi page article.
// ==/UserScript==

(function(){
	if( window.location.href.match(/[\?&]pagewanted=all/i) ) return;

	var isArticlePg = document.evaluate("//div[@id='shell']/div[@id='page']/div[@id='main']//div[@id='article']", document, null, 9, null).singleNodeValue;
	if( !isArticlePg ) return;

	var hasSinglePageLink = document.evaluate("//ul[@id='toolsList']/li[@class='singlePage']/a", document, null, 9, null).singleNodeValue;
	if(!hasSinglePageLink) return;

	window.location.replace(hasSinglePageLink.href);
})();