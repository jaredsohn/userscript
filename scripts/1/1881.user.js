// megaupload deceit script
// version 0.1
// 2005-10-05
// Copyright (c) 2005, paullus
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
//
// --------------------------------------------------------------------
//
// ChangeLog
// 2005-10-05 - 0.1 - Initial release
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           megaupload deceit
// @description    Removes ads and counter from megaupload links
// @include        http://www.megaupload.com/*
// ==/UserScript==

 var sstr, index, resstr, newContent;
 sstr = "document.getElementById(\"downloadhtml\").innerHTML = '<a href=\"";
 index = document.body.parentNode.innerHTML.indexOf(sstr);
 resstr = "";
 index += sstr.length;
 while(true)
 {
  chr = document.body.parentNode.innerHTML.substring(index, index + 1);
  if (chr == '"')
  {
   break;
  }
  resstr+=chr;
  index++;
 }
 resstr = encodeURI(resstr);
 newContent = "<p align='center'><a href=\"" + resstr + "\">"+resstr+"</a></p>";
 document.body.parentNode.innerHTML = newContent;

