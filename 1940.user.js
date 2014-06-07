// rapidshare deceit script
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
// @name           rapidshare deceit
// @description    Removes ads and counter from rapidshare links
// @include        http://rapidshare.de/* 
// @include        http://www.rapidshare.de/*
// ==/UserScript==

 var fstr, index, resstr, newContent, sstr;

 fstr = "<form action=\"http://rapidshare.de\" method=\"post\">";
 index = document.body.parentNode.innerHTML.indexOf(fstr);
 // first page
 if (index != -1)
 {
  document.forms[0].startdl[0].click();
 }
 else
 {
  sstr = "document.getElementById(\"dl\").innerHTML = unescape('";
  index = document.body.parentNode.innerHTML.indexOf(sstr);
  // realy - second page
  if (index != -1)
  {
   resstr = "";
   index += sstr.length;
   while(true)
   {
    chr = document.body.parentNode.innerHTML.substring(index, index + 1);
    if (chr == "'")
    {
     break;
    }
    resstr+=chr;
    index++;
   }
   resstr =  unescape(resstr)
   document.body.parentNode.innerHTML = "<p align='center'>" + resstr + "</p>";
 }


 }

