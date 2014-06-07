// ==UserScript==
// @name        Greenhopper Show Epic Names
// @description Shows the Epic name instead of number in Greenhopper boards
// @namespace   davfive
// @author      David May, http://davfive.wordpress.com
// @version     1.1
//
// Once you install the script, change https://jira.company.com to your base url
//  or add them as User Settings in the script preferences.
//
// @include     https://jira.company.com/*
//   or more specifically (your choice)
// @include     https://jira.company.com/secure/TaskBoard.jspa*
// @include     https://jira.company.com/secure/VersionBoard.jspa*
// @include     https://jira.company.com/secure/AssigneeBoard.jspa*
// @include     https://jira.company.com/secure/ComponentBoard.jspa*
//
// ==/UserScript==
var links = document.evaluate("//div[contains(@title, 'Edit Epic')]//a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0; i < links.snapshotLength; i++) 
{ 
  	var thisLink = links.snapshotItem(i); 
  	var text = thisLink.text;
	var title = thisLink.title;

	// Note this doesn't work when the Epic says "Show all linked issues"
	//  because there is no issue name / id to swap.
	if (title.indexOf("Show all linked issues") == -1)
	{
		thisLink.text = title;
		thisLink.title = text;		
	}
}