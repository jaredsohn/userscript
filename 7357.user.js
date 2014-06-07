// Slashdot Script
// version 0.1 BETA!
// 2007-01-31
// Copyright (c) 2007, David Rysdam
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "CNN Script", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Slashdot
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Good news for Linux!
// @include       http://slashdot.org/
// @include       http://www.slashdot.com/
// ==/UserScript==

function getElementsByClass(classname){
 var els=new Array();
 var inc=0;
 var alltags=document.all? document.all : document.getElementsByTagName("*");
 for (i=0; i<alltags.length; i++){
   if (alltags[i].className==classname)
     els[inc++]=alltags[i];
 }
 return els;
} 

els = getElementsByClass('generaltitle');
for (i=0; i<els.length; i++) {
  title = els[i].childNodes[1];
  h3 = title.childNodes[1];
  for (j=0; j<h3.childNodes.length; j++) {
    if (typeof(h3.childNodes[j].href) != 'undefined') {
      link = h3.childNodes[j];
    }
  }
  link.textContent = 'Good News for Linux?';
}
