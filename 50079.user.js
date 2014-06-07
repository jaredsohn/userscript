// privi.hu link fix
// version 0.1 beta
// 2009-05-26
// Copyright (c) 2009, Daniel Adamy; coded by Tim Smart
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
// select "privi.hu link fix", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          privi.hu link fix
// @namespace     http://userscripts.org/topics/27584
// @description   replace the annoying javascript links to standard links
// @include       http://privi.hu/*
// ==/UserScript==
var links=document.evaluate("//a[contains(@href,'goo(')]",document,null,6,null);
var i=0;
while(link=links.snapshotItem(i++))
{
    link.href='http://privi.hu/'+link.href.match(/goo\('(.*)'\)/)[1];
}
delete i;