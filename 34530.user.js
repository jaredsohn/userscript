/*

Another old-facebook redirect

Public Domain - created by Donald Hayward (2008)
Updated by Etcetera

*/

// ==UserScript==
// @name        Another old-facebook redirect
// @description Redirects to the old facebook
// @version     1
// @include     http://www.facebook.com/*
// @include     http://www.new.facebook.com/*
// @include     https://secure.facebook.com/*
// @include	http://apps.new.facebook.com/*
// ==/UserScript==

if (window.location.href.match("http://")) {
if (!window.location.href.match("http://www.new.facebook.com/pages/")) {
if (!window.location.href.match("http://apps.new.facebook.com/")) {
var facebookUrl = window.location.href;
var urlArray = facebookUrl.split("com/");
var targetUrl = "https://secure.facebook.com/" + urlArray[1];
window.location = targetUrl;
}}}

var links = document.evaluate("//a[contains(@href,'facebook')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var pageLinks = document.evaluate("//a[contains(@href,'/pages/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var appLinks = document.evaluate("//a[contains(@href,'apps.')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var search = document.evaluate("//form[contains(@action,'facebook.com/s.php')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i = 0; i < links.snapshotLength; i++)
{
	var this_link = links.snapshotItem(i);
	var linkUrlArray = this_link.getAttribute("href").split("com/");
	var linkNewUrl = "https://secure.facebook.com/" + linkUrlArray[1];
	this_link.setAttribute("href", linkNewUrl);

}
for(var i = 0; i < pageLinks.snapshotLength; i++)
{
	var this_link = pageLinks.snapshotItem(i);
	var linkUrlArray = this_link.getAttribute("href").split("com/");
	var linkNewUrl = "http://www.new.facebook.com/" + linkUrlArray[1];
	this_link.setAttribute("href", linkNewUrl);

}
for(var i = 0; i < appLinks.snapshotLength; i++)
{
	var this_link = appLinks.snapshotItem(i);
	var linkUrlArray = this_link.getAttribute("href").split("com/");
	var linkNewUrl = "http://apps.new.facebook.com/" + linkUrlArray[1];
	this_link.setAttribute("href", linkNewUrl);

}
for(var i = 0; i < search.snapshotLength; i++)
{
	var this_link = search.snapshotItem(i);
	var linkUrlArray = this_link.getAttribute("action").split("com/");
	var linkNewUrl = "https://secure.facebook.com/" + linkUrlArray[1];
	this_link.setAttribute("action", linkNewUrl);

}



