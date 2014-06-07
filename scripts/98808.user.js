// ==UserScript==
// @name           porcinettize
// @namespace      http://*
// @description    replace "Firstname Lastname" by "Porcinette"; 
//                 just replace "firstname Lastname" by the name of your 
//                 favorite girl, I already chose mine :)
// ==/UserScript==
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = new RegExp('Firstname Lastname','gi');
var replace = 'Porcinette';

for (var i=0;i<textNodes.snapshotLength;i++) 
{
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace); 
}