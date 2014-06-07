// ==UserScript==
// @name			New York Times Full Width Articles
// @author			Erik Vold
// @namespace		nytFullWidthArticles
// @include			http://*.nytimes.com*
// @include			http://nytimes.com*
// @include			https://*.nytimes.com*
// @include			https://nytimes.com*
// @match			http://*.nytimes.com/*
// @match			http://nytimes.com/*
// @match			https://*.nytimes.com/*
// @match			https://nytimes.com/*
// @version			0.1.2
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-08-30
// @lastupdated		2009-01-16
// @description		This userscript removes the extra columns for article pages.
// ==/UserScript==

window.addEventListener( "load", function() {
	var isArticlePg = document.evaluate("//div[contains(@id,'Column')]/div[@id='article']", document, null, 9, null).singleNodeValue;
	if( !isArticlePg ) return;

	var column = document.getElementById( 'bColumn' );
	if(!column) column = document.getElementsByClassName( 'cColumn' )[0];
	column.parentNode.removeChild( column );

	GM_addStyle( '#main #aColumn, #abColumn, #aColumn #article, #aColumn #articleExtras { width:99%; } div#shell div#page div#main { background:#FFFFFF; } .spanAB{background:none;}' );
}, false );