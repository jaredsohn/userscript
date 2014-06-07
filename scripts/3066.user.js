// MT-Blacklist Adder
// version 0.1 BETA!
// 2005-05-28
// Copyright (c) 2005, Mark Mascolino
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
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          MT-Blacklist adder
// @namespace     http://people.etango.com/~markm/greasemonkey/
// @description   Script to add MT-Blacklist links to MT's admin pages
// @include       http://example.org/cgi-bin/mt.cgi*
// ==/UserScript==

function xpath(query) {
   return document.evaluate(query, document, null,
       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpathForElement(query, theElem) {
   return document.evaluate(query, theElem, null,
       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function makeBlacklistURL(commentLink) {
   var l = document.location;
   var theURL = l.protocol + "//" + l.hostname;
   reFindInstallPath = /(.*)\/.*/; //Finds the directory (minus the trailing slash) where MT is installed
   matchInstallPath = reFindInstallPath.exec(l.pathname);
   theURL = theURL + matchInstallPath[1] + "/mt-blacklist.cgi?__mode=despam&_type=comment&id=";

   //Add coment id in here
   reFindCommentID = /.*&id=(.*?)&.*/;
   matchCommentID = reFindCommentID.exec(commentLink.search);
   theURL = theURL + matchCommentID[1];

   return theURL;
}

var xPathBlogbox = "//div[@class='blogbox']";
var blogboxElems = xpath(xPathBlogbox);
for (var i = 0; i < blogboxElems.snapshotLength; i++) {
   var blogboxDiv = blogboxElems.snapshotItem(i);
   var xPathPageTitle = ".//font[text()='Five Most Recent Comments']";
   var commentsElems = xpathForElement(xPathPageTitle, blogboxDiv);
   if (commentsElems.snapshotLength > 0) {
       var allanchors = xpathForElement(".//a[@href]", blogboxDiv);
       var arrayOfAnchors = [];
       var arrayIdx = 0;
       for (var j = 0; j < allanchors.snapshotLength; j++) {
           arrayOfAnchors[ arrayIdx ] = allanchors.snapshotItem(j);
           arrayIdx++;
       }

       for (var k = 0; k < arrayOfAnchors.length; k++) {
           var commentitem = arrayOfAnchors[k];//allanchors.snapshotItem(j);
           blacklisturl = makeBlacklistURL(commentitem);

           //alert("href= " + commentitem.href);
           //GM_log("href= " + commentitem.href);

           var blacklistlink = document.createElement("span");
           blacklistlink.innerHTML = "<a href='" + blacklisturl + "'>Blacklist</a>&nbsp;";
           var theparent = commentitem.parentNode;

           //alert("innerHTML = " + theparent.innerHTML);
           //GM_log("innerHTML = " + theparent.innerHTML);

           commentitem.parentNode.insertBefore(blacklistlink, commentitem);
       }
   }
}
