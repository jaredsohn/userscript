// ==UserScript==
// @name           AnandTech Hide Stickies
// @namespace      AnandTech
// @description    AnandTech Hide Stickies
// @include        forums.anandtech.com/*
// ==/UserScript==

//find all images that are the sticky icon.
anchors=document.evaluate("//img[@src='images/misc/sticky.gif']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

// for each icon, hide the table row that contains it.  The table row is 4 parents above the td that contains the image
for (var i = 0; anchor=anchors.snapshotItem(i++);) 
{    
    anchor.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
}// now hidden.  Have a beer.