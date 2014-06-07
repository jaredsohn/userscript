// ==UserScript==
// @name           ResearchChannel - Fix Titles
// @namespace      http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description    Fix the title on ResearchChannel
// @include        http://www.researchchannel.org/*
// ==/UserScript==

var xpath = "//td[@class='SHwhite']";
var res = document.evaluate(xpath, document, null,
                           XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

if (res.snapshotLength >= 1) 
{
    var newText = res.snapshotItem(0).firstChild.nodeValue;
    document.title = "ResearchChannel: " + newText;
} 
