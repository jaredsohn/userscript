// HowStuffWorksPrinterFriendly
// version 0.1
// 2005-04-12
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
// select "HowStuffWorksPrinterFriendly", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            How Stuff Works - Printer Friendly
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     Redirects and re-write links to the printer-friendly version of "How Stuff Works" pages. Also prevents the links from opening in a new window.
//
// @include         http://howstuffworks.com/*
// @include         http://*.howstuffworks.com/*

// ==/UserScript==
	
(function() {
    var redirectToPrinterFriendly = function() {
        if (document.location.href.match(/.htm$/) != null) 
        {
            document.location.href = document.location.href + "/printable";
        }
    }
    
    var processArticleLinks = function() {
        var links = document.links;
        for (var i = 0; i < links.length; i++) 
        {
            articleLink = links[i];
            articleLink.target = "";
            if (articleLink.href.match(/.htm$/) != null) 
            {
                articleLink.href = articleLink.href + "/printable";
            }
        }
    }
    
    redirectToPrinterFriendly();
    processArticleLinks();
})();
