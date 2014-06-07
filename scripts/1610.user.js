// Dave Pollard - Fix Titles
// version 0.1
// 2005-09-30
// Copyright (c) 2005, Julien Couvreur
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "Dave Pollard - Fix Titles", and click Uninstall.
//
// --------------------------------------------------------------------
// WHAT IT DOES:
// It fixes Dave Pollard's blog, by including the titles
//  of the essays in the page, into the title of the page.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Dave Pollard - Fix Titles
// @namespace      http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description    Fix the <title> on Dave Pollard's "How to Save the World" blog
// @include        http://blogs.salon.com/0002007/*
// ==/UserScript==

var xpath = "//a[@class='weblogItemTitle']";
var res = document.evaluate(xpath, document, null,
                           XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

if (res.snapshotLength >= 1) 
{
    document.title += ": " + res.snapshotItem(0).firstChild.nodeValue;;
} 


for (var i = 1; i < res.snapshotLength; i++)
{
    document.title += " -- " + res.snapshotItem(i).firstChild.nodeValue;
} 
