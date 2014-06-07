// Remove sidebars from Bigpicture.typepad.com pages
// Release 0.0.2 - adapted to BP's new layout
// 
// $Id: cleanup_bigpicture.user.js 59 2007-04-08 18:21:29Z knut $
// Copyright 2006 knb
//
// About: Removes most content from the long sidebars in Bigpicture.typepad.com  
// May need a little startup time (a few seconds on my machine)
// ==UserScript==
// @name          CleanupBigPicture
// @namespace     knbknb.greasemonkey.org/
// @description   Cleanup the finance blog bigpicture.typepad.com: Get rid of some layout elements in sidebars 
// @include       http://bigpicture.typepad.com/*
// ==/UserScript==
var ids = Array("side", 
"nav",
"leftcolumn",
"calendar",
"rightcolumn",
"idSiteMeterHREF",
"footer");

var classes = Array("apprenticed",
"category",
"clear",
"date",
"economy",
"energy",
"essays",
"favorites",
"fedreserve",
"google",
"housing",
"link-note",
"links",
"markets",
"media",
"module-header",
"photo",
"photoimg",
"posted",
"reviews",
"ritholtz");
//var n = ids[m];
//var d = document.getElementById(n).style.display="none";

for (var m=0; m<ids.length; m++){ 
   expression = "//div[@id='" + ids[m] + "']";
	 ns1 = document.evaluate(expression,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   for (var i = 0; i < ns1.snapshotLength; i++) {
    //ns1.snapshotItem(i).innerHTML = "";
ns1.snapshotItem(i).style.display="none";
   }

}

for (var m=0; m<classes.length; m++){ 
   expression = "//div[@class='" + classes[m] + "']";
	 ns1 = document.evaluate(expression,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   for (var i = 0; i < ns1.snapshotLength; i++) {
    //ns1.snapshotItem(i).innerHTML = "";
    ns1.snapshotItem(i).style.display="none";

   }

}