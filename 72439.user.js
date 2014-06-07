// ==UserScript==
// @name           auto-refresh tickets
// @namespace      bluej.freeshell.org
// @include        http://jira.remedymd.com/secure/IssueNavigator.jspa?mode=hide&requestId=10403
// ==/UserScript==
setTimeout(function() {
	location.reload();
}, 180000);