// Iowa State University WebCT Downloader // version 0.1 BETA!
// 17-05-2008
// Copyright (c) 2008, Marc Powell <marc DOT powell AT yahoo DOT com>
// 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// Allows Iowa State University distance-education students to download 
// PDF articles posted in WebCT class folder.
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "WebCT Document Downloader", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           WebCT Document Downloader
// @namespace      http://www.caliparisien.com/dev/greasemonkey/
// @description    For downloading PDFs and other stuff from WebCT
// @include        https://webct.its.iastate.edu/webct/*
// ==/UserScript==
//
//  Version 0.1:
//   - Initial version!

//<a href="javascript:submitLoad('656544242031','PAGE_TYPE', false)"

var debug = false;
var links = document.getElementsByTagName( 'a' );
var element;

for ( var i = 0; i < links.length; i++ ) 
{
    element = links[ i ];

    var oldUrl = element.href;
    if ( oldUrl.indexOf( "javascript:submitLoad" )==0 && oldUrl.indexOf("PAGE_TYPE")>0) 
    {
        var newUrl = oldUrl.replace(/false/,"true");
        element.href = newUrl;
        if(debug) GM_log(i+": "+oldUrl+" -> "+newUrl);
    }
}