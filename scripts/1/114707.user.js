// ==UserScript==
// @name           DSLReports Bigger Text
// @namespace      trparky.dslreports.bigger.text
// @description    Makes the page numbers of threads bigger
// @version        1.08
// @include        http://www.dslreports.com/postlist
// @include        http://www.dslreports.com/forum/*
// @include        http://dslreports.com/postlist
// @include        http://dslreports.com/forum/*
// ==/UserScript==

// Script Home: http://www.toms-world.org/dslreportsbiggertext.user.js
// Change #1: Fixed where forum header names were being changed when they shouldn't have been on thread pages.
// Change #2: Fixed some more bugs in the script.
// Change #3: Added the ability to make the links for seeing specific kinds of posts larger.
// Change #4: Fixed some issues in the feature introduced in Change #3.

if (window.addEventListener) {
	window.addEventListener("load", function(e) {
		if (!(/(?:http:\/\/broadbandreports\.com\/forum\/r|http:\/\/dslreports\.com\/forum\/r|http:\/\/www\.broadbandreports\.com\/forum\/r|http:\/\/www\.dslreports\.com\/forum\/r)[0-9]+.+/i.test(document.location))) {
			documentBody = document.body.innerHTML;

			if (!(/(?:http:\/\/broadbandreports\.com\/forum\/|http:\/\/dslreports\.com\/forum\/|http:\/\/www\.broadbandreports\.com\/forum\/|http:\/\/www\.dslreports\.com\/forum\/).+/i.test(document.location))) {
				documentBody = documentBody.replace(/(<a href="\/forum\/[^\n\r"]+">)([^\n\r<]+)(<\/a>)/ig, '$1<span style="font-size: 10pt;">$2</span>$3');
			}

			documentBody = documentBody.replace(/<small>by&nbsp;<i>(.+)<\/i><\/small>/ig, '<span style="font-size: 10pt;">by&nbsp;<i>$1</i></span>');
			documentBody = documentBody.replace(/(<small>by&nbsp;<a href="\/profile\/[0-9]+" onclick="this\.blur\(\); return popup\(event,'\/uidpop\?ajh=1&amp;uid=[0-9]+'\);"><font color="#000000">)(.+)(<\/font><\/a><\/small>)/ig, '$1<span style="font-size: 10pt;">$2</span>$3');
			documentBody = documentBody.replace(/(<small>)(by)(&nbsp;)/ig, '$1<span style="font-size: 10pt;">$2</span>$3');
			documentBody = documentBody.replace(/(<a href="\/forum\/[^\n\r">]+">)([0-9a-f]+)(<\/a>)/ig, '$1<span style="font-size: 10pt;">$2</span>$3');

			if (/(?:http:\/\/broadbandreports\.com\/forum\/|http:\/\/dslreports\.com\/forum\/|http:\/\/www\.broadbandreports\.com\/forum\/|http:\/\/www\.dslreports\.com\/forum\/).+/i.test(document.location)) {
				documentBody = documentBody.replace(/(<td valign="BOTTOM" align="LEFT">See: )<small>(.+<\/small>)/ig, '$1<span style="font-size: 10pt;">$2');
				documentBody = documentBody.replace(/(<td valign="BOTTOM" align="LEFT">See: <span style="font-size: 10pt;">.+)<\/small>/ig, "$1</div>");
			}

			document.body.innerHTML = documentBody;
		}
	}, false);
}