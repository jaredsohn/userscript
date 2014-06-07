// ==UserScript==
// @name		Wikipedia History Show 500
// @author		Erik Vold
// @datecreated	2009-08-05
// @lastupdated	2009-08-05
// @namespace	wikipediaHistoryShow500
// @include		http*://*wikipedia.org/*
// @version		0.1
// @description	This userscript makes the default limit of changes displayed on the hostry tab equal to 500.
// ==/UserScript==

wikipediaHistoryShow500 = function(){
	var historyTabLink = document.evaluate("//li[@id='ca-history']/a[@accesskey='h']",document,null,9,null).singleNodeValue;
	if( !historyTabLink || historyTabLink.href.match( "[\?\&]limit", "i" ) ){
		return false;
	}

	historyTabLink.href += "&limit=500";
}

wikipediaHistoryShow500();