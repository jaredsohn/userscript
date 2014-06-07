// FB2PDF - download FB2 books in SonyReader-optimized PDF
// version 0.5
// 2007-08-30
// Copyright (c) 2005, Vadim Zaliva
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          fb2pdf
// @namespace     http://fb2pdf.com/
// @description   Suppliment links to .fb2 files with links to .pdf files for SonyReader converted via FB2PDF converter
// @include       *
// @exclude       http://codeminders.com/fb2pdf/*
// @exclude       http://www.codeminders.com/fb2pdf/*
// @exclude       http://fb2pdf.com/*
// @exclude       http://www.fb2pdf.com/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==

var replaceLinks = function() {
    var allLinks, thisLink;
    allLinks = document.evaluate(
        "//a[@href]",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (var i = 0; i < allLinks.snapshotLength; i++) {
        thisLink = allLinks.snapshotItem(i);
        if(thisLink.href.match(/^http:\/\/.*\.fb2$/i) || 
           thisLink.href.match(/^http:\/\/.*\.fb2\.zip$/i) ||

           thisLink.href.match(/^http:\/\/(www\.)?lib.rus.ec\/pl\/2\.pl\?[0-9]+/i) ||
           (thisLink.href.match(/^\/pl\/2\.pl\?[0-9]+/i) && document.location.match(/^http:\/\/(www\.)?lib\.rus\.ec\//i)) ||

           thisLink.href.match(/^http:\/\/(www\.)?fenzin\.org\/downloadfb2\.php\?book\=[0-9]+/i) ||
           (thisLink.href.match(/^\/downloadfb2\.php\?book\=[0-9]+/i) && document.location.match(/http:\/\/(www\.)?fenzin\.org\//i))
           
          ) {
            //alert("link: "+thisLink);
            newElement = document.createElement('span');
            postUrl = 'http://www.fb2pdf.com/convert.php?auto=yes&url=' + encodeURIComponent(thisLink.href);
            newElement.innerHTML='&nbsp[<a target=\'_blank\' href="' + postUrl + '">SonyReader PDF</a>]';
            thisLink.parentNode.insertBefore(newElement, thisLink.nextSibling);
        }
    }
}

window.addEventListener('load',  replaceLinks, true);
