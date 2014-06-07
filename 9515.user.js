/** 
 ** Name : StraitsTimes ads remover
 ** Version : 0.4
 ** Author : limkokfang at yahoo dot com
 ** 
 ** Description:
 ** This greasemonkey script will remove the
 ** top banner, flash and Google Ad table.
 ** Use AdBlock in conjunction with greasemonkey.
 **
 ** 0.1: initial release (remove top banner & embedded iframe ads).
 ** 0.2: resize page width to full resolution.
 ** 0.2.1: exclude *popup* pages to enable image popup.
 ** 0.3: update to match new page layout for site.
 ** 0.4: update to remove Flash and Google Ads table.
 **
 ** This is a greasemonkey script for use with the Firefox 
 ** More info: http://www.greasespot.net/
 **/

// ==UserScript==
// @name          StraitsTimes Ads
// @version       0.4
// @include       http://comment.straitstimes.com/*
// @include       http://www.straitstimes.com/*
// @exclude       http://www.straitstimes.com/*popup/*
// @description	Remove top banner and Google ads.
// ==/UserScript==

// remove top banner
var tables = document.getElementsByTagName("table");
mytable = tables[0];
var myTDs = mytable.getElementsByTagName("td");
myTDs[0].style.display="none";

// remove Flash and Google Ads DIV
var divs = document.getElementsByTagName("div");
for ( var i = 0; i < divs.length; i++ ) {
    div = divs[ i ];
    if ( div.className == "pad9" ) {
        div.style.display = "none";
    }
    if ( div.id == "flashad" ) {
        div.style.display = "none";
    }
}
