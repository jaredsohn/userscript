// WSJ Paywall
// version 0.2 - temporarily disabled auto-redirect from google
// version 0.1
// 0.1 initial version created
// last change: 26/03/2010
// Copyright (c) 2010, dmn001<at>gmail
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "WSJ Paywall", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          WSJ Paywall
// @namespace     
// @description   redirect WSJ to content via google
// @include       http://*.wsj.com/*
// @include 	  http://www.google.co.uk/url?*
// ==/UserScript==


temp = document.evaluate(
    "//div[@class='article story']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var s = location.href;
if (temp.snapshotItem(0)!=null){
var x = temp.snapshotItem(0).innerHTML;
var y = x.substring(x.length-7,x.length);
if (y=='...</p>'){  
  var z = "http://www.google.co.uk/url?sa=t&source=web&url=http://online.wsj.com/article/";
  var z2 = s.substring(s.indexOf('article/')+8,s.indexOf('.html'));
  var z3 = '.html';
  window.location.href = z+z2+z3;
}
}
var u = window.location.href;
if(u.indexOf('http://www.google.co.uk/url?')!=-1 && u.indexOf('wsj')!=-1 ){
    //window.location.replace(document.links[0]);
}