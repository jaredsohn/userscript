// ==UserScript==
// @name          dev2dev Oreilly
// @namespace     http://dev2dev.bea.com
// @description   Injects links to O'Reilly books 
// @include       http://dev2dev.bea.com/blog/*
// @include       http://dev2dev.bea.com/pub/*
// ==/UserScript==

var anchorTagsWithName, commentsAnchor, oreillyDiv, oreillyHTML;

GM_log('Running dev2dev OReilly script');

// get the comments anchor for blogs
anchorTagsWithName = document.evaluate(
    "//a[@name='comments']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
// take the last comments anchor
commentsAnchor = anchorTagsWithName.snapshotItem(
	anchorTagsWithName.snapshotLength-1);
if (!commentsAnchor)
{
	// for Articles, we look for the thread
	anchorTagsWithName = document.evaluate(
	    "//a[@name='thread']",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	// take the last comments anchor
	commentsAnchor = anchorTagsWithName.snapshotItem(
		anchorTagsWithName.snapshotLength-1);
}

if (commentsAnchor)
{
	// build our not-quite-REST URL
	var oreillyUrl = 
		'http://search.atomz.com/search/?sp-a=sp1000a5a9'+
		'&sp-t=store&sp-x-1=cat&sp-x-2=cat2&sp-q-2=Books'+
		'&sp-c=3&sp-q='+
		document.title;
	GM_log('URL: '+oreillyUrl);
	
	// go ask Tim
	GM_xmlhttpRequest({
		method: 'GET',
		url: oreillyUrl,
    	headers: {
    	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/html',
    	},
    	onload: processOreillyResponse
	});
}
else {
	GM_log('  Error: did not find a comment anchor');
}

function processOreillyResponse(responseDetails)
{
	oreillyHTML = responseDetails.responseText;
	
	// we want this HTML:
	/* 
	 <!-- ResultListStart -->
		blah blah	
	 <!-- ResultListEnd -->
	*/
	var start = oreillyHTML.indexOf(
		"<!-- ResultListStart");
	var end = oreillyHTML.indexOf(
		"<!-- ResultListEnd -->", start);
	GM_log("Clipping start: "+start+" end: "+end);
	var result = oreillyHTML.substring(start, end-1);
	
	if (result)
	{
		oreillyHTML = result;
		
		resultsElement = document.createElement(
			"placeholder");
		resultsElement.innerHTML = oreillyHTML;
		commentsAnchor.parentNode.insertBefore(
			resultsElement, commentsAnchor);
	}
	else {
		GM_log("Nothing was returned from the clipping");
	}
	
}