// This script displays, crudely, at the top of the page,
// the ratio of users in the current thread whose user
// number is below yours. For example, a rating of 95%
// means 95% of posters in the thread are more established
// MeFi users than you. You should bow down to their inherent
// superiority until another 10,000 or so users sign up and
// you feel like less of a noob.
//
// ==UserScript==
// @name          Noobitude
// @description   Automatic MeFi self-worth meter
// @include       http://metafilter.com/*
// @include       http://metatalk.metafilter.com/*
// @include       http://ask.metafilter.com/*
// @include       http://www.metafilter.com/*
// ==/UserScript==
var leets = 0; 
var count = 0;
var title, newElement;
var allLinks, thisLink;
var currentUserLinks, currentUserLink, currentUser;

currentUserLinks = document.evaluate(
    "//a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);
for (var i = 0; i < currentUserLinks.snapshotLength; i++) {
    currentUserLink = currentUserLinks.snapshotItem(i);
    var match = /\/usercontacts\/([0-9]*)/.exec(currentUserLink);
    if (match) currentUser = match[1];
}

allLinks = document.evaluate(
    "//span[@class='smallcopy']/a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    var match = /\/user\/([0-9]*)/.exec(thisLink);
    if (match) {
	count += 1;
	if (match[1] < currentUser) {
		leets += 1;
	}
}
}
title = document.getElementById('yellowbar');
newElement = document.createElement('p');
newElement.innerHTML= "Your noobitude: " + Math.round(leets/count * 100) + "%";
title.parentNode.insertBefore(newElement, title);
