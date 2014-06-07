// Removing all Paintball Nation ads
// version 0.2
// 2008-05-29 - Initial Release - Latest Update Log at Bottom
// Copyright (c) 2008
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Remove PbNation.com Ads
// @namespace     http://w3.org/1999/xhtml
// @description   Removes all the annoying ads on Pbnation.com
// @include	  http://*pbnation.com*
// @include       http://*paintballnation.com*
// ==/UserScript==


// -----------------------------------------------------
// REMOVING THE TOP AD
// -----------------------------------------------------


var snaps=document.evaluate("//img[contains(@src,'/ads/')]/ancestor::tr",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
for (var num1=0;num1<snaps.snapshotLength;num1++) 
{
  var link1=snaps.snapshotItem(num1);
  link1.parentNode.removeChild(link1);
}

// -----------------------------------------------------
// REMOVING THE FIELD SEARCH BECAUSE IT SUCKS
// -----------------------------------------------------


var allTds, thisTds;

allTds = document.evaluate(
    "//td[@rowspan='2']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allTds.snapshotLength; i++) {
    thisTds = allTds.snapshotItem(i);

	thisTds.parentNode.removeChild(thisTds)
    // do something with thisTds
}


// ------------------------------------------------------
// THIS SECTION REMOVES ALL IFRAMES AND THEIR CORRESPONDING ADS
// ------------------------------------------------------

var alliFrames, thisiFrame;
alliFrames = document.getElementsByTagName('iframe');
for (var i = 0; i < alliFrames.length; i++) {
    thisiFrame = alliFrames[i];
    // do something with iFrame
	thisiFrame.width = 0;
	thisiFrame.height = 0;
}


// -------------------------------------------------------
// THIS SECTION CONVERTS PBNATION TO PEANUT BUTTER NATION
// -------------------------------------------------------

(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    
    "PbNation": "Peanut Butter Nation",
    "PbN": "Peanut Butter Nation",
    "up'ed": "upgraded",
    "!+": "!",
    "-+": "-",

    };

regex = {}; 
for (key in replacements) { 
    regex[key] = new RegExp(key, 'g'); 
} 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 
    s = node.data; 
    for (key in replacements) { 
        s = s.replace(regex[key], replacements[key]); 
    } 
    node.data = s; 
} 

})();


/*

CHANGE LOG
05-29-2008 - Initial Release
06-03-2008 - Fixed the Missing Tables

*/