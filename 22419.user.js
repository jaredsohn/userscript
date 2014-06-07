// Reddit -  Hide by subreddit
// version 0.1
// 2008-02-06
// Copyright (c) 2007, Gabriel Getzie
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//-----------------------------------------
//
// This is a Greasemonkey user script.
//
// To install you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script.
// Accept the default configuration and install.
// This script has only been tested with Greasemonkey 0.3 or later.
//
//----------------------------------------
//
// Please uninstall any old versions of this script before installing
// the newest version.
//
//
// ==UserScript==
// @name Reddit - Hide by Subreddit
// @namespace tag;ggetzie@gmail.com,2008-02-06:rhbs
// @description Automatically hide all stories from a particular subreddit(s).
// @include http://reddit.com/
// @include http://reddit.com/?count*
// @include http://reddit.com/new*
// @include http://reddit.com/recommended*

var hideLink, hideId, ev, thisSr, hideThese;

function hideWhich() {
    hideThese = prompt("Please enter the subreddits you wish to hide.\n" +
		       "e.g. science, business, politics", hideThese ? 
		       hideThese.replace(/[\n]+/g, ", ") : "");
    hideThese = hideThese.replace(/[ ,;]+/g, "\n");
    if (confirm("The following subreddits will be hidden automatically:\n" +
		hideThese)) {
	if (hideThese) {
	    GM_setValue('hideThese', hideThese);}
	else {
	    GM_setValue('hideThese', "none");}}
    else {
	hideWhich();}}

GM_registerMenuCommand("Choose which subreddits to hide", hideWhich);



if (!GM_getValue) {
    alert("Please upgrade to the latest version of Greasemonkey.");
    return;}
else {
    if (!GM_getValue('hideThese')) {
	hideWhich();}
    else {
	hideThese = GM_getValue('hideThese');}}



var srs = document.evaluate ("//a[@class='link-subreddit']",
			     document,
			     null,
			     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			     null);

for (var i = 0; i < srs.snapshotLength; i++) {
    thisSr = srs.snapshotItem(i);
    if (hideThese.match(thisSr.innerHTML.
			substring(1,thisSr.innerHTML.length - 1))) {
	hideId = thisSr.parentNode.id.replace(/titlerow/, "hide") + "_a";
	hideLink = document.getElementById(hideId);
	ev = document.createEvent('MouseEvents');
	ev.initMouseEvent('click', true, true, window, 1, 12, 345, 7, 220,
			  false, false, true, false, 0, null);
	hideLink.dispatchEvent(ev);}}