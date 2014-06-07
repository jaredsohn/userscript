// YnetUrls
// version 0.4 BETA!
// 2005-12-20
// Copyright (c) 2005, Ido Abramovich
// Modified by Alex Shnitman
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Changelog:
// 13/05/2005 - initial release.
// 14/05/2005 - fixed non handeling null issue.
// 17/05/2005 - added handeling with openInnewWindow and openWin JS links.
// 20/12/2005 - (AlexSh) Fixed for Firefox 1.5 & made it remove more cruft
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.2.6 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "YnetUrls", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          YnetUrls
// @description   Replaces javascript links with normal links on ynet.co.il
// @include       http://ynet.co.il/*
// @include       http://*.ynet.co.il/*
// ==/UserScript==

(function() {
    
    ///////////////////////////////////
    // handle class 'bluelink' links //
    ///////////////////////////////////
    
    var all_JS_urls, thisUrl, replaceUrl;
    var re = new RegExp('this.href="(.*)"');
    
    //Get all urls which have the class 'bluelink'
    all_JS_urls = document.evaluate(
        "//a[@class='bluelink']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    
    // traverse over the urls, remove the onclick and change the href to
    // the real url.
    for (var i = 0; i < all_JS_urls.snapshotLength; i++) {
        thisUrl = all_JS_urls.snapshotItem(i);
        replaceUrl = re.exec(thisUrl.getAttribute('onClick'));
        // sometimes a 'bluelink' is only a bluelink...
        if (null == replaceUrl) {
            continue;
        }
        thisUrl.setAttribute("href",replaceUrl[1]);
        thisUrl.setAttribute("onclick", "");
        thisUrl.setAttribute("onmouseover", "");
        thisUrl.setAttribute("onmouseout", "");
        thisUrl.setAttribute("oncontextmenu", "");
        thisUrl.setAttribute("ondeactivate", "");
        thisUrl.setAttribute("onblur", "");
    }

    /////////////////
    // other links //                          
    /////////////////
    ylinks = document.links;
    for (i = 0; i < ylinks.length; i++) {
        if (ylinks[i].href.indexOf('javascript:open') >= 0) {
            //////////////////////////////////////////////////
            // handle "openInnewWindow" and "openWin" links //
            //////////////////////////////////////////////////
            rlink = String(ylinks[i].href).match(/open(?:Innew)?Win(?:dow)?\((?:\"|\'|\s)+(.*?)(?:\"|\'|\s)+/i);
            if (rlink) {
                ylinks[i].href = rlink[1]; ylinks[i].onclick = '';
                continue;
            }
        }
    }
    
})();

