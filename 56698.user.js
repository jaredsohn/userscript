// ==UserScript==
// @name			New York Times Article Header Perma Link
// @author			Erik Vold
// @namespace		nytArticleHeaderPermaLink
// @include			http://*.nytimes.com*
// @include			http://nytimes.com*
// @include			https://*.nytimes.com*
// @include			https://nytimes.com*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-08-30
// @lastupdated		2009-08-30
// @description		This userscript adds a link to the header of an article to the perma link.
// ==/UserScript==

window.addEventListener( "load", function() {
	var isArticlePg = document.evaluate("//div[contains(@id,'Column')]/div[@id='article']", document, null, 9, null).singleNodeValue;
	if( !isArticlePg ) return;

	var articleHeader = document.evaluate("//div[contains(@id,'Column')]/div[@id='article']//h1", document, null, 9, null).singleNodeValue,
		permaLink = (window.location.href.match( /^http:\/\/[^\?#]*/i )+"").replace( /http:\/\/www\.nytimes\.com/i, "http://nytimes.com" );

	articleHeader.innerHTML = '<a href="' + permaLink + '">' + articleHeader.innerHTML + '</a>';
}, false );