// ==UserScript==
// @name        TDNAM PageRank Checker
// @author	Craze3 & kralburda
// @email	craze3@gmail.com
// @namespace   http://www.r10.net
// @description Adds a pagerank/backlink display next to every domain listed on tdnam.com. Fixed by kralburda
// @include     http://tdnam.com/*
// @include     http://*.tdnam.com/*
//
// @include     https://tdnam.com/*
// @include     https://*.tdnam.com/*
// ==/UserScript==

//URL API Used to create the pagerank check image (for reference):
//http://www.top-google-pagerank.com/pagerank.php?action=image&url=http://www.URL-HERE.com
//..and the one for backlinks:
//http://www.express-submit.de/backlink-neu/backlink.cgi?http://www.URL-HERE.com

//Trim function, removes whitespace
function trim(s){
if((s==null)||(typeof(s)!='string')||!s.length)return'';return s.replace(/^\s+/,'').replace(/\s+$/,'')}

//Loop through all domains listed and add pagerank image
var result = document.evaluate( "//a[@class='PDNNF'] | //a[@class='DomainNameSCFeatureListingsData'] | //a[@class='FLDN'] | //a[@class='ESNNF']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
if(result.snapshotLength < 1)	return;
for ( var i = 0; i < result.snapshotLength; i++ )
{
	thisElement = result.snapshotItem(i);
	thisText = trim(thisElement.title);
	if(!thisText)	thisText = trim(thisElement.text);
	newElement = document.createElement('div');
	newElement.innerHTML = '<img src="http://www.linktrend.com/pr?uri=' + thisText + '"/>';
	thisElement.parentNode.insertBefore(newElement, thisElement.nextSibling);
}
