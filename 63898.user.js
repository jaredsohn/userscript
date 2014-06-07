// LLInRec Greasemonkey Script
// version 13.38
// 02/27/09
//
// ==UserScript==
// @name LLInRec
// @description Adds a (gs) by NUEsers' names, (gs)² by the new NUEsers' names.
// @include http://endoftheinter.net/*
// @include http://*.endoftheinter.net/*
// ==/UserScript==

var newElement = document.createElement("div");
newElement.innerHTML = '<div> (gs)</div>';
var allLinks, thisLink;
allLinks = document.evaluate(
'//a[@href]',
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
thisLink = allLinks.snapshotItem(i);
if(thisLink.href.match(/profile\.php/))
if(thisLink.href.match(/[0123456789]+/) > 10088)
if(thisLink.href.match(/[0123456789]+/) < 13500)
thisLink.innerHTML += " (gs)";
}


var newElement = document.createElement("div");
newElement.innerHTML = '<div> (gs)²</div>';
var allLinks, thisLink;
allLinks = document.evaluate(
'//a[@href]',
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
thisLink = allLinks.snapshotItem(i);
if(thisLink.href.match(/profile\.php/))
if(thisLink.href.match(/[0123456789]+/) > 13500)
thisLink.innerHTML += " (gs²)";
}