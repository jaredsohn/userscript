// arXivPDF 
// version 0.0 - and final :)
// 20080520
// Copyright (c) 2008, Janus H. Wesenberg
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
// If you want to hack, see the excelent intro at 
// http://diveintogreasemonkey.org
//
// To uninstall, go to Tools/Manage User Scripts,
// select "arXivPDF", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          arXivPDF
// @namespace     http://www.halwe.dk/janus/
// @description   Force pdf-links on arxiv.org/abs to supply files named <foo>.pdf. This is an issue for FF3rc1 on Mac OS X. See this thread: http://tinyurl.com/5bjekj.
// @include       http://arxiv.org/abs/*
// @include       http://www.arxiv.org/abs/*
// ==/UserScript==


// First, find the full-text div with an xpath query
var divFullText=document.evaluate(
    "//div[@class='full-text']",
    document, 
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
// Then, find the pdf-link inside this div (identified by the 'f' accesskey)
if(divFullText.snapshotLength>0) {
    var aPDF=document.evaluate(
        "//a[@accesskey='f']",
        divFullText.snapshotItem(0), 
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    // Finally add the .pdf if it isn't there
    if(aPDF.snapshotLength>0 && 
       !aPDF.snapshotItem(0).href.match('\.pdf$') ) {
        aPDF.snapshotItem(0).href+='.pdf';
    }     
}