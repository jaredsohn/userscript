// ==UserScript==
// @name           Boards link name replacement for endoftheinter.net
// @namespace      http://userscripts.org/scripts/show/43334
// @version        1.1
// @author         Demono
// @description    Renames the 'Boards' link to 'Boards' instead of whatever else it might be named for endoftheinter.net - formally known as luelinks.net
// @include        http://*.endoftheinter.net/*
// @include        http://endoftheinter.net/*
// @include        https://*.endoftheinter.net/*
// @include        https://endoftheinter.net/*
// @include        http://luelinks.net/*
// ==/UserScript==

// Declare the following variables which will be used in comparing elements
var oldlink, newlink, match;

// Evaluate the document for all <a> elements which contain a 'href' attribute 
// and store a list of results in the 'oldlink' variable
oldlink = document.evaluate(
	'//a[@href]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

// Store each element result in the list by itself into the 'newlink' variable.
// Check the content between the element's opening and closing tags for the text
// 'Stats'. If a match is found, go to the previous element and change it's
// text content to 'Boards'
for (var i = 1; i < oldlink.snapshotLength; i++) {
	newlink = oldlink.snapshotItem(i);	
	if(oldlink.snapshotItem(i-1).innerHTML.match(/Stats/)){
		newlink.innerHTML="Boards";
	}
// In case the user is viewing their own profile, fix the match against "View My Stats"
// and incorrect re-write of the "Enter The Token Shop" link to "Boards"
	if(oldlink.snapshotItem(i-1).innerHTML.match(/View My Stats/)){
		newlink.innerHTML="Enter The Token Shop";
	}
}