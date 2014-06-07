// ==UserScript==
// @name           NEU Course Description helper
// @namespace      tag:brainonfire.net,2008-11-20:neu-course-desc-helper
// @description    Add course title to page title in Northeastern University's Course Description Registry. Example: http://nuapps3.neu.edu/applications/cdr.nsf/CourseDisplay?OpenForm&Course=BCS%20U480
// @include        http://nuapps3.neu.edu/applications/cdr.nsf/*
// @version        0.1
// @changelog      First version
// ==/UserScript==


/* From http://wiki.greasespot.net/Code_snippets */
function $xpath(p, context)
{
	if(!context)
		context = document;
	var i;
	var arr = [];
	var xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i = 0; item = xpr.snapshotItem(i); i++)
		arr.push(item);
	return arr;
}


var courseID = $xpath('//td[b[contains(text(), "Course N")]]/following-sibling::td/font/text()')[0].nodeValue;
var courseName = $xpath('//td[b[contains(text(), "Course Title:")]]/following-sibling::td/font/text()')[0].nodeValue;

document.title = courseID + ': ' + courseName;
