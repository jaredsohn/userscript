// Business2.0PrinterFriendly
// version 0.1
// 2005-04-09
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
// select "Business2.0PrinterFriendly", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// Is only useful if you have access to the online version of Business 2.0 
//     (if you have the code included in the paper magazine, or if you
//     have a subscription).
// Re-writes links to articles to go to the printer-friendly version. And 
//     if you land on an article page, the browser will be redirected to 
//     the printer-friendly version.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Business2.0PrinterFriendly
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     Re-writes article links to the printer-friendly version. Redirects to the printer-friendly version of Business 2.0 pages. 
//
// @include         http://business2.com/*
// @include         http://*.business2.com/*
// ==/UserScript==
	
(function() {
    // todo: maybe the two scenarios can be handled with a single function?
    
    var redirectToPrinterFriendly = function() {
        // all the links whose src attribute contain /print/
        var xpath = "//a[contains(@href,'/print/')]";
        var res = document.evaluate(xpath, document, null,
                                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        if (res.snapshotLength == 1) 
        {
            document.location.href = res.snapshotItem(0);
        }
    }
    

    // Re-write the first kind of url to the second format:
    // http://www.business2.com/b2/web/articles/0,17863,1037197,00.html
    // http://www.business2.com/b2/subscribers/articles/print/0,17925,1037197,00.html
    var processArticleLinks = function() {
        var xpath = "//a[contains(@href,'/web/articles/')]";
        var res = document.evaluate(xpath, document, null,
                                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                                    
        var linkIndex, articleLink;
        for (linkIndex = 0; linkIndex < res.snapshotLength; linkIndex++) { 
            articleLink = res.snapshotItem(linkIndex);
            
            var matches = articleLink.href.match(/^(.*)\/web\/articles\/(.*),17863,(.*)$/);
            var newLink = matches[1] + "/subscribers/articles/print/" + matches[2] + ",17925," + matches[3];
            articleLink.href = newLink;
        } 
    }

    redirectToPrinterFriendly();
    processArticleLinks();
})();
