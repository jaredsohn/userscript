// No Crosspost
// version 0.1 BETA!
// 2005-04-22
// Copyright (c) 2006, Castagno Raffaele (raffaele.castagnoATgmail.com)
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
// select "No Crosspost", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name No Crosspost
// @namespace 
// @description Removes crossposting when replying on google groups
// @include http://groups.google.com/*
// @include http://groups-beta.google.com/*
// ==/UserScript==

var frmName = document.forms[0].name;
var usenet_groups_to = document.getElementById('usenet_groups_to');

if(frmName = "postform")
{
  fmrAction = document.forms[0].action;
  
  var frmActionArray=fmrAction.split("/");

  var part_num=0;
  while (part_num < frmActionArray.length)
  {
    var token = frmActionArray[part_num];
    part_num+=1;
    if(token == 'group')
    {
      usenet_groups_to.value = frmActionArray[part_num];
      return;
    }
  }

}