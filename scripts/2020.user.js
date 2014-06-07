//
// filefactory deceit script
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
// @name           filefactory deceit
// @description    Removes ads and counter from filefactory links
// @include        http://www.filefactory.com/*
// ==/UserScript==

 var fstr, index, resstr, newContent, sstr;

 fstr = "document.getElementById(\"waiting\").innerHTML = '<a href=\"h";
 index = document.body.parentNode.innerHTML.indexOf(fstr);

 // first page
 if (index != -1)
 {
   resstr = "h";
   index += fstr.length;
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
   resstr+=c + '&b=' + b;
   document.location = resstr;
 }
 else
 {

  fstr = "document.getElementById(\"waiting\").innerHTML = '<a href=\"f";
 index = document.body.parentNode.innerHTML.indexOf(fstr);
 if (index != -1)
 {
   resstr = "f";
   index += fstr.length;
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
  newContent = "<p align='center'><a href=\"" + resstr + "\">"+resstr+"</a></p>";
  document.body.parentNode.innerHTML = newContent;

 }
else
{
}
}


 

