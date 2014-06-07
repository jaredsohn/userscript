// SMH single page script
// version 1.0
// 13/08/2006
// Copyright (c) 2006, Hugo Byrne

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
// select "SMH single page", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name SMH single page
// @description Defaults Sydney Morning Herald  format to single page (no pagination)
// @include http://www.smh.com.au/*
// ==/UserScript==

var aScripts = document.body.getElementsByTagName("SCRIPT");
var oScript
var iFound

if (document.location.href.indexOf('fullpage') < 0)
{
		 for (var i = 0; i < aScripts.length; i++)
		 {
		    oScript = aScripts.item(i);
		    iFound = oScript.text.indexOf('?page=fullpage');
		    if (iFound > 0 )
		    {
		    		 document.location.href = document.location.href + '?page=fullpage';
		    }
		 }
}