// Google Search No Evil Link Redirects
// version 1.1.0
// 2013-01-15
// Copyright (c) 2013, Danilo Roascio
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
// select "Google Search Right Navigation Menu", and click Uninstall.
//
// --------------------------------------------------------------------
//
// This script transforms Google Search results evil redirect to take 
// place on left click only, so that you can copy the site URL with a 
// right click or avoid the redirect totally with a middle click.
//
// An option is provided to completely remove the redirect setting true
// the removeRedirectCompletely variable (see source code).
//
// HISTORY:
//    01/15/2013: GM1.0 compatibility fix (usoCheckup issue).
//    11/04/2010: Initial release.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Google Search No Evil Link Redirects
// @namespace      tag:danilo@roascio.fakemail.it,2010-11-04:GoogleRedirect
// @description    This script transforms Google Search results redirect so that it takes place on left click only, so you can copy the site URL with a right click or you can avoid the redirect with a middle click.
// @copyright      2013, Danilo Roascio
// @license        GPL v3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @version        1.1.0
// @include        http*://*.google.tld/
// @include        http*://*.google.tld/*#*
// @include        http*://*.google.tld/webhp*
// @include        http*://*.google.tld/search*
// @include        http*://*.google.tld/images*
// @require        http://usocheckup.redirectme.net/89694.js?maxage=7&id=usoCheckup&custom=yes
// @require        http://userscripts.org/scripts/source/61794.user.js
// @grant          GM_getValue
// @grant          GM_log
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// ==/UserScript==

///////////////////////////////////////////////////
// change false to true in the following line to
// remove redirect completely
var removeRedirectCompletely = false;
///////////////////////////////////////////////////

var myRewrite = function(event)
{
    mangleLinksTriggers = 0;
    if (event.which == 1)
    {
        var link = event.target.wrappedJSObject;
        // climb up dom hierarchy to find anchor tag
        while (!link.href && (link = link.parentNode));
        if (link && link.hasAttribute('oldMouseDown')) {
            var mdown = link.getAttribute('oldMouseDown');
            // make google rwt function accessible
            var rwt = unsafeWindow.rwt;
            // declare mousedown handler
            eval(mdown, this);
            // call mousedown handler on link
            if (onmousedown)
                onmousedown.call(link, event);
        }
    }
}

var mangleLinks = function()
{
    if (mangleLinksTriggers > 500)
    {
        document.removeEventListener('DOMNodeInserted', mangleLinks, true);
        mangleLinksTriggers = -1;
        return;
    }
    else if (mangleLinksTriggers < 0)
    {
        mangleLinksTriggers = 0;
        document.addEventListener('DOMNodeInserted', mangleLinks, true);
        return;
    }
    else
        mangleLinksTriggers++;
    
    for (var i = 0; i < allLinks.length; i++) {
        var thisLink = allLinks[i].wrappedJSObject;
        if (thisLink.onmousedown && !thisLink.hasAttribute('oldMouseDown')) {
            thisLink.setAttribute('oldMouseDown', thisLink.onmousedown);
            thisLink.onmousedown = null;
            if (!removeRedirectCompletely)
                thisLink.addEventListener('mousedown', myRewrite, true);
        }
    }
}

// this is live
var allLinks = document.getElementsByClassName('l');
var mangleLinksTriggers = 0;
document.addEventListener('DOMNodeInserted', mangleLinks, true);
document.addEventListener('submit', mangleLinks, true);
document.addEventListener('click', mangleLinks, true);
mangleLinks();
