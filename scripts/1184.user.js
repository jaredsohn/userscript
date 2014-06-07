// Consumer Report Pop-up remover script
// version 0.1 BETA!
// 2005-07-04
// Copyright (c) 2005, Brice McIver
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
// select "Consumer Reports Pop-up remover", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Consumer Report Pop-up remover
// @namespace     http://home.kc.rr.com/bmciver/
// @description   Open external links in tabs instead of pop-ups
// @include       http://www.consumerreports.org/*
// @include       http://consumerreports.org/*

// ==/UserScript==

(function()
{
   var ConsumerReports =
   {
      findLinks : function()
      {
         var allLinks, thisLink, tmpArr, tmpString;
         allLinks = document.evaluate(
             '//a[starts-with(@href,"javascript:Start")]',
             document,
             null,
             XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
             null);

         for (var i = 0; i < allLinks.snapshotLength; i++)
         {
             thisLink = allLinks.snapshotItem(i);
             tmpString = thisLink.href;
             tmpArr = tmpString.split("'");
             thisLink.href = tmpArr[1];
         }
      }
   };

   ConsumerReports.findLinks();

})();