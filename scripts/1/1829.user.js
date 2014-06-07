/*
 Bloglines - Weblogs, Inc - fixer
 version 0.1
 2005-09-27
 Copyright (c) 2005, Steven Chai (email: gm AT yankovic DOT org )
 Released under the GPL license
 http://www.gnu.org/copyleft/gpl.html

 This is a Greasemonkey user script 
 http://greasemonkey.mozdev.org/
*/
// ==UserScript==
// @name          Bloglines Weblogs post fixer
// @namespace     http://www.yankovic.org/happy/gmonkey/
// @description   Fixes the staircase Bloglines posts showing best of Weblogs Inc.
// @include       http://bloglines.com/myblogs_display*
// @include       http://www.bloglines.com/myblogs_display*
// @include       http://bloglines.com/preview*
// @include       http://www.bloglines.com/preview*
// ==/UserScript==

(function() {
	var xpath='//div[@class="content-main"]/descendant::img[starts-with(@src,"http://www.adjab.com/")]/..';
	var elms = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0, e=null; e=elms.snapshotItem(i); i++) {
		e.style.clear = 'left';
	}
})();



