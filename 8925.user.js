/*
PolyMatchMaker.com Link Fixer

Based on "Hotmail javascript link fixer" by znerp:
http://userscripts.org/scripts/show/7830
*/

// ==UserScript==
// @name          PolyMatchMaker.com link fixer
// @description   Turns javascript:NewWindow links to normal links
// @include       http://polymatchmaker.com/* 
// @include       http://www.polymatchmaker.com/* 
// ==/UserScript==

// Example offending link:
// <A HREF="JavaScript:NewWindow('http://polymatchmaker.com/pmm3/main.mv?Screen=VIEWPROFILE&View_Key=46497',46497,639,440)">

var requiredLinkPattern = "^[jJ]ava[sS]cript:[nN]ew[wW]indow";

document.wrappedJSObject.onclick = null;
var allLinks = document.getElementsByTagName('a')
for (var i = allLinks.length - 1; i >= 0; i--) {
  var thisLink = allLinks[i];
  if (thisLink.href.match(requiredLinkPattern) != null) {
    var jsUrl = thisLink.href;
    var ustart = jsUrl.indexOf("'")+1;
    thisLink.href = jsUrl.substring(ustart,jsUrl.indexOf("'",ustart));
  } //if
} //for