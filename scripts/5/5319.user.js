/*
 Bloglines Link to Instructables.com AllSteps
 version 0.1
 2006-08-25
 Copyright (c) 2006, Steven Chai (email: gm AT yankovic DOT org )
 Released under the GPL license
 http://www.gnu.org/copyleft/gpl.html

 This is a Greasemonkey user script.
 http://greasemonkey.mozdev.org/

*/

// ==UserScript==
// @name          BL Instructables.com AllSteps
// @description   Changes Instructables.com links to their ALLSTEPS page
// @include       http://bloglines.com/myblogs_display*
// @include       http://www.bloglines.com/myblogs_display*
// @include       http://bloglines.com/preview*
// @include       http://www.bloglines.com/preview*
// @include       https://bloglines.com/myblogs_display*
// @include       https://www.bloglines.com/myblogs_display*
// @include       https://bloglines.com/preview*
// @include       https://www.bloglines.com/preview*
// ==/UserScript==

(function() {
	var as = document.evaluate(
		"//a[starts-with(@href, 'http://www.instructables.com/id/')]",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	);
	for ( var i=0, a=null; a=as.snapshotItem(i); i++ ) {
		if ( a.search == '' ) a.search = '?ALLSTEPS';
	}
})();

