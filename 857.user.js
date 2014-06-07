/** 
 ** Name : StraitsTimes ads remover and expand page width
 ** Version : 0.2.1
 ** Author : limkokfang at yahoo dot com
 ** 
 ** Description:
 ** This greasemonkey script is an accumulation of hacks that remove the
 ** top banner,embedded iframe and the right ad column in straitstimes website.
 ** Using AdBlock will only remove the ad but it leaves behind a white
 ** block of space. This script will remove the entire tag space related to
 ** that banner. In addition, it resizes the news section to use the entire
 ** screen space. It looks nicer since "BEST VIEWED IN 800X600 RESOLUTION"
 ** was the web standard 5 years ago. :)
 **
 ** 0.1: initial release (remove top banner & embedded iframe ads).
 ** 0.2: resize page width to full resolution.
 ** 0.2.1: exclude *popup* pages to enable image popup.
 **
 ** TODO:
 ** 1) Fix the width of each news section's main page (Asia, Money...)
 ** 
 ** This is a greasemonkey script, intended for use with the Firefox 
 ** extension Greasemonkey. More info: http://greasemonkey.mozdev.org/
 **/

// ==UserScript==
// @name          StraitsTimes Ads & Width
// @namespace     http://sps.nus.edu.sg/~limkokfa/
// @include       http://straitstimes.asia1.com.sg/*      
// @exclude       http://straitstimes.asia1.com.sg/*popup/*
// @description	  Adjust width & remove Ads
// ==/UserScript==


(function() {
    // remove top banner
    var tables = document.getElementsByTagName("table");
    mytable = tables[0];
    var myTDs = mytable.getElementsByTagName("td");
    myTDs[0].style.display="none";

    // remove embedded iframe with ads
    var tables = document.getElementsByTagName("table");
    mytable = tables[0];
    var myTDs = mytable.getElementsByTagName("td");
    myTDs[0].style.display="none";

    // replace table widths to 100%
    var xpath = "//table[@width=780]";
    var res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
    var i, link;
    for (i = 0; link = res.snapshotItem(i); i++) {
        link.width = "100%";
    }

    // replace news td widths to 100%
    // set news background to 100% and pushes out the rightmost ad column
    xpath = "//td[@width=639]|//td[@width=160]";
    res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
    for (i = 0; link = res.snapshotItem(i); i++) {
        if (link.width == 639) {
            link.width = "100%";
        }
        else if (link.width == 160) {
            link.width = "0%";
        }
    }

    // expands classname=whitebg|peachbg table to 100%
    var myTs = document.getElementsByTagName("table");
    for (var i = 0; i < myTs.length; i += 1) {
        if ((myTs[i].className == "whitebg")||(myTs[i].className == "peachbg")) {
            myTs[i].setAttribute('width', '100%');
        }
    }
})();
