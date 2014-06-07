// ==UserScript==
// @name           jira_planning_view_tasks_block_colours
// @namespace      http://example.com
// @description    TODO
// @include        *http://jira4.nap/*

// ==/UserScript==

// Reference documentation for "document.evaluate":
// 	https://developer.mozilla.org/en/docs/Introduction_to_using_XPath_in_JavaScript

// keep tampermonkey syntax checker happy:
$ = $;

// (1) Make tasks on Jira's "Task Board" (List View) into block colours.
// This is much better than Jira's built-in:
//		Tools | User Preferences | General | Look and Feel | Background Colour
// ...because those colours are too faint to see

// The divs with the Jira ticket number in
var allDivs1 = document.evaluate('//div[@class="gh-subhead"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
// Change the background colour of the ticket number div
for (var i=0;i<allDivs1.snapshotLength;i++) {
    var thisDiv = allDivs1.snapshotItem(i);
    var bgcolour = thisDiv.parentNode.style.getPropertyValue('background-color');
	thisDiv.style.setProperty('background-color', bgcolour);
    console.log("div bgcolor -> "+bgcolour);
    console.log(thisDiv);
}

// The divs with the ticket summary in
var allDivs2 = document.evaluate('//div[@title="Summary"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
// Change the background colour of the ticket summary div
for (var i=0;i<allDivs2.snapshotLength;i++) {
    var thisDiv = allDivs2.snapshotItem(i);
    var bgcolour = thisDiv.parentNode.parentNode.parentNode.style.getPropertyValue('background-color');
	thisDiv.style.setProperty('background-color', bgcolour);
    console.log("div bgcolor -> "+bgcolour);
    console.log(thisDiv);
}

