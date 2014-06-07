// ==UserScript==
// @name           Refresh jira bug list
// @namespace      http://mywebsite.com/myscripts
// @description    Refreshes jira bug lists so you can see if you got any new bugs
// @include        http://*/secure/IssueNavigator.jspa?*
// ==/UserScript==

var mins = 5;
window.setTimeout("document.location.reload();", mins * 60 * 1000);
