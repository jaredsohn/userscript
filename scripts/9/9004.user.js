// ==UserScript==
// @name           Digg Top 10 Direct
// @description    Link Top 10 directly to articles
// @include        http://digg.com/*
// ==/UserScript==
//
// Copyright (c) 2010, Matthew Botos (http://matthew.botos.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ================
//
// This is a Greasemonkey user script: http://greasemonkey.mozdev.org/
// To use it, install Greasemonkey, restart Firefox, revisit this script, and click on install.
//
// ================

var appKey = escape('http://userscripts.org/scripts/show/9004')
var debug = true;   
var items = new Array(); 
var link;
var links = new Array();
var j = 0;
var ctitles = null;

// top news
var allDivs = document.evaluate(
    "//ul/li/h3/a",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allDivs.snapshotLength; i++) {
    items[j++] = allDivs.snapshotItem(i);  
}     

// breaking news
allDivs = document.evaluate(
    '//a[@class="title"]',
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allDivs.snapshotLength; i++) {
    items[j++] = allDivs.snapshotItem(i);  
}     
   

for (var i = 0; i < items.length; i ++) {
	link = items[i];
	if (debug) GM_log('Digg Link: ' + link);
	
	var storyName = link.href.match(/.*\/(.*)/)[1];
	if (debug) GM_log('Story: ' + storyName);
	
	links[storyName] = link;
	
	if (ctitles == null) {
		ctitles = storyName;
	} else {
		ctitles += ',' + storyName;
	}
}

if (ctitles != null) {
	apiLink = 'http://services.digg.com/2.0/story.getInfo?ctitles=' + ctitles + '&appkey=' + appKey + '&type=json';
	if(debug) GM_log('API Link: ' + apiLink);

	// get the page and substitute the direct story link
	GM_xmlhttpRequest({
		method: 'GET',
		url: apiLink,

		onload: function(responseDetails) {
			if (debug) GM_log('Response: ' + responseDetails.responseText);
			var response = eval( '(' + responseDetails.responseText + ')' );
			for (var i = 0; i < response.stories.length; i++) {
				story = response.stories[i];
				var storyUrl = story.url;
				var storyName = story.permalink.match(/.*\/(.*)/)[1];
				if (debug) GM_log('Story URL: ' + storyUrl);
				if (debug) GM_log('Story Name: ' + storyName);
				links[storyName].href = storyUrl;
				links[storyName].target = "_blank";
			}
		}
	});
}

