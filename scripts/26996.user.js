// Redirect to clean toorgle.com
// version 1.0
// Copyright (c) 2008, AppleGrew
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Access Bar", and click Uninstall.
//
// Usage: When using this script then a new word 'Print' will appear
// beside every post's posting date header.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Clean Toorgle.com
// @namespace     http://applegrew.blogspot.com/search/label/Greasemonkey%20Scripts/
// @description   Redirects to the cleaner page of toorgle.com which is provided by Google.
// @include       http://www.toorgle.com/*
// ==/UserScript==  

function querySt(ji) {
        hu = window.location.search.substring(1);
        gy = hu.split("&");
        for (i=0;i<gy.length;i++) {
                ft = gy[i].split("=");
                if (ft[0] == ji) {
                        return ft[1];
                }
        }
}

var querysearch = querySt("q");
if(querysearch)
        location.replace("http://www.google.com/cse?cx=009817295251880643908%3Amtoxh90yxnq&sa=Search&q=" + querysearch);
else
        location.replace("http://www.google.com/coop/cse?cx=009817295251880643908%3Amtoxh90yxnq");
        