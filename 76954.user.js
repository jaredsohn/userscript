// ==UserScript==
// @name          Film-Anime-Serie DB fixer
// @namespace     none
// @description   Rende le pagine "navigabili"
// @include       http://*dblink.blogspot.com/*
// ==/UserScript==

function removeElement(ElementXpath)
{
var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (i=0; i<alltags.snapshotLength; i++)
{
element = alltags.snapshotItem(i);
element.parentNode.removeChild(element); // Remove this element from its parent.
}
}
 
removeElement("//iframe");