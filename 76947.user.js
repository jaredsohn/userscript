// ==UserScript==
// @name          MbutoZone FF Fix
// @namespace     none
// @description   elimina lo spiacevole "omino" sopra il testo in FF
// @include       http://www.mbutozone.it/spartiti/*
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
removeElement("//table[@class='autore']"); 