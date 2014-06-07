// ==UserScript==
// @name           JIRA StatusColor
// @namespace      https://service.xxx.de/jira/secure
// @include        https://service.xxx.de/jira/secure/IssueNavigator.jspa*
// @include        https://service.xxx.de/jira/secure/QuickSearch.jspa*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @description    Colorize JIRA issues by status. Written by Patrick Flecken.
// ==/UserScript==

var colorOpen = 'FFAAAA';
var colorOpenFixed = 'FFAAAA';
var colorOpenInvest = 'FFAAFF';
var colorOpenVerify = 'AAFFFF';
var colorOpenRank = 'AAFFFF';
var colorClosed = 'AAAAAA';
var colorFixed = 'AAFFAA';

// Find all rows
$('tr:visible[id*=issuerow]').each(function() {
	//var cur_id = $(this).attr('id');

	var keyStatus = $(this).find('[class=nav status]');
	if (keyStatus != 0)
	{
		var statustext = keyStatus.html();
		//alert (statustext);
		if (statustext.search(/open/i) > -1)
			$(this).attr('style', 'background:#'+colorOpen);
		if (statustext.search(/closed/i) > -1)
			$(this).attr('style', 'background:#'+colorClosed);
		if (statustext.search(/open - to be fixed/i) > -1)
			$(this).attr('style', 'background:#'+colorOpenFixed);
		if (statustext.search(/open - to be ranked/i) > -1)
			$(this).attr('style', 'background:#'+colorOpenRank);
		if (statustext.search(/open - to be investigated/i) > -1)
			$(this).attr('style', 'background:#'+colorOpenInvest);
		if (statustext.search(/open - to be verified/i) > -1)
			$(this).attr('style', 'background:#'+colorOpenVerify);
	}
});