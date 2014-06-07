// WiredPrinterFriendlyRedirect
// version 0.1
// 2005-04-08
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
// select "Wired - Printer Friendly Redirect", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Wired - Printer Friendly Redirect
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     Redirects to the printer-friendly version of Wired pages when one is detected.
//
// @include         http://wired.com/*
// @include         http://*.wired.com/*

// ==/UserScript==
	
// all the links whose href attribute contains /print/
var xpath = "//a[contains(@href,'/print/')]";
var res = document.evaluate(xpath, document, null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var linkIndex, printerLink;
if (res.snapshotLength == 2) 
{
    document.location.href = res.snapshotItem(0);
}
    
// add CSS on printer-friendly page: body { margin: 80px }
var addGlobalStyle = function(css) {
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(style);
};
        
if (document.location.href.match(/\/print\//) != null) {
    addGlobalStyle("body { margin: 80px }");
}
