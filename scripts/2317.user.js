// Comedy Central.com Motherload to Media Player Redirector
// version 0.1
// 2005-06-01
// Copyright (c) 2005, Bob Marley dumbass22@mail.com (not my real name...and a junk email address)
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
// Whenever a page is loaded in http://*comedycentral.com/motherload/, the browser 
//  will instead load the corresponding siteworld site.  This script is based 99.999% on Julien Couvreur's SitePoint - Printer Friendly Redirect  script.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Comedy Central Redirector
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     Redirects comedy central from motherload to siteworld.
//
// @include         http://comedycentral.com/*
// @include         http://*.comedycentral.com/*

// ==/UserScript==
var redirectToPrinterFriendly = function() {
    if (document.location.href.match(/motherload/player) != null) 
    {
        document.location.href = document.location.href.replace("/motherload/player.jhtml?ml_video=", "/sitewide/media_player/play.jhtml?itemId=");
    }
}

redirectToPrinterFriendly();

