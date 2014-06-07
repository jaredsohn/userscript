/*
 Bloglines Add
 version 2
 2006-07-31
 Copyright (c) 2005, Steven Chai (email: gm AT yankovic DOT org )
 Released under the GPL license
 http://www.gnu.org/copyleft/gpl.html

 This is a Greasemonkey user script
 http://greasemonkey.mozdev.org/
*/
// ==UserScript==
// @name          Bloglines Add
// @namespace     http://www.userscripts.org/scripts/show/1089
// @description	  Changes default options on Blogline's Add Feed page
// @include       http://bloglines.com/sub/*
// @include       http://www.bloglines.com/sub/*
// @include       https://bloglines.com/sub/*
// @include       https://www.bloglines.com/sub/*
// ==/UserScript==

(function(){

// Change these values to your personal preference

var def_updated_items = 1;
// 0 == Display as New
// 1 == Ignore

var def_display_pref = 0;
// 0 == Default
// 1 == Complete Entries
// 2 == Summaries if Available
// 3 == Titles

var def_monitored = false;
// true  = Monitored by Bloglines Notifier
// false = Not Monitored

var def_mobile = false;
// true  = Monitored by Bloglines Mobile
// false = Not Monitored

var def_access = 1;
// 0 = Private
// 1 = Public


var updated_items = document.evaluate(
	"//input[@id='rdo_newitemsonly_" + def_updated_items + "']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
);
updated_items.snapshotItem(0).checked = true;

var display_prefs = document.evaluate(
	"//input[@id='rdo_display_" + def_display_pref + "']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
);
display_prefs.snapshotItem(0).checked = true;

var mon = document.evaluate(
	"//input[@name='Ignore']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
);
mon.snapshotItem(0).checked = def_monitored;

var mon = document.evaluate(
	"//input[@name='DisplayMobile']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
);
mon.snapshotItem(0).checked = def_mobile;

var acc = document.evaluate(
	"//input[@id='rdo_access_" + def_access + "']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
);
acc.snapshotItem(0).checked = true;

})();
