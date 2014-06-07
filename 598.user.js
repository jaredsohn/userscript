// SitePointPrinterFriendlyRedirect
// version 0.1
// 2005-06-01
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
// select "SitePoint - Printer Friendly Redirect", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// Whenever a page is loaded in http://sitepoint.com/article/, the browser 
//  will instead load the corresponding printer friendly page.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            SitePoint - Printer Friendly Redirect
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     Redirects to the printer-friendly version of SitePoint pages when one is detected.
//
// @include         http://sitepoint.com/*
// @include         http://*.sitepoint.com/*

// ==/UserScript==
var redirectToPrinterFriendly = function() {
    if (document.location.href.match(/article/) != null) 
    {
        document.location.href = document.location.href.replace("/article/", "/print/");
    }
}

redirectToPrinterFriendly();
