// ==UserScript==
// @name           Jira Quick Assign
// @namespace      bluej.freeshell.org
// @include        http://jira.remedymd.com/browse/*
// ==/UserScript==

var details = document.getElementById('issuedetails').getElementsByTagName('tr');
var reporter = false;
for (var i = 0; i < details.length; i++) {
	if (details[i].children[0].innerHTML.match('Reporter')) {
		var matches = /name=([^&]*)/.exec(details[i].children[1].getElementsByTagName('a')[0].href);
		reporter = matches[1];
	}
}
if (!reporter) {return;}

var operations = document.getElementById('operationsSection').getElementsByTagName('td');
for (var i = 0; i < operations.length; i++) {
	if (operations[i].innerHTML.match('Assign')) {
		var matches = /id=(\d+)/.exec(operations[i].children[1].getElementsByTagName('a')[0].href);
		operations[i].innerHTML += ' (<a href="http://jira.remedymd.com/secure/AssignIssue.jspa?id='+matches[1]
			+'&assignee='+reporter+'">to reporter</a>)';
	}
}