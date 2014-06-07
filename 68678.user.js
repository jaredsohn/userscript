// ==UserScript==
// @name GS Outsider
// @description Identifies NUEsers, outside link
// @include http://*endoftheinter.net/*
// ==/UserScript==

var newElement = document.createElement("span");
newElement.innerHTML = '<span> (LUEser)</span>';
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
if(thisLink.href.match(/[0123456789]+/) > 20176)
{
var newElement = document.createElement("span");
newElement.innerHTML = ' (gs))\u2074';
thisLink.parentNode.insertBefore(newElement, thisLink.nextSibling);
}

else if(thisLink.href.match(/[0123456789]+/) > 15258)
{
var newElement = document.createElement("span");
newElement.innerHTML = ' (gs)³';
thisLink.parentNode.insertBefore(newElement, thisLink.nextSibling);
}

else if(thisLink.href.match(/[0123456789]+/) > 13498)
{
var newElement = document.createElement("span");
newElement.innerHTML = ' (gs)²';
thisLink.parentNode.insertBefore(newElement, thisLink.nextSibling);
}

else if(thisLink.href.match(/[0123456789]+/) > 10088)
{
var newElement = document.createElement("span");
newElement.innerHTML = ' (gs)';
thisLink.parentNode.insertBefore(newElement, thisLink.nextSibling);
}

}
