// Google Search Re/Move Left-hand Sidebar
// version 1.7.0
// 2011-08-01
// Copyright (c) 2010, Danilo Roascio
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
// This script moves the new Google Search navigation/search tools
// sidebar to the right of the page shifting the search results back to
// the left.
//
// This reverts the page to the "usual" Google Search look.
//
// HISTORY:
//    08/01/2011: Works with new Google layout.
//    09/08/2010: Now works with Instant search!
//    09/07/2010: Safer and improved includes, now should trigger in
//                  every Google use case. Better performances too.
//    08/30/2010: Works with the new JS-loaded Web search pages!
//                Works with the new Images search!
//                Added option to remove advertising! (ON by default, 
//                  see source code to disable.)
//                Works better with advertising enabled.
//                Improved performance, most of the times sidebar is 
//                  moved before the page appears.
//                Added auto-updater.
//                Updated Google SSL compatibility.
//                Updated Wonder wheel compatibility.
//    06/03/2010: Google SSL (https://www.google.com) is now included.
//    05/27/2010: Now works in Images and renders better in some other
//                occasions.
//    05/07/2010: Added option to completely remove the new bar. See
//                source code for configuration variable.
//    05/05/2010: Now works with Wonder wheel too.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Google Search Re/Move Left-hand Sidebar
// @namespace      tag:danilo@roascio.fakemail.it,2010-05-05:GoogleRightNav
// @description    This script moves the new Google Search navigation/tools sidebar to the right of the page, shifting the search results back to the left.
// @copyright      2011, Danilo Roascio
// @license        GPL v3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @version        1.7.0
// @include        http*://*.google.tld/
// @include        http*://*.google.tld/*#*
// @include        http*://*.google.tld/webhp*
// @include        http*://*.google.tld/search*
// @include        http*://*.google.tld/images*
// @require        http://usocheckup.redirectme.net/75987.js?maxage=7&id=usoCheckup&custom=yes
// @require        http://userscripts.org/scripts/source/61794.user.js
// ==/UserScript==

///////////////////////////////////////////////////
// change false to true in the following lines
// to hide the new sidebar or the sponsored links
var removeSidebarCompletely = false;
var removeSponsoredLinks = true;
///////////////////////////////////////////////////

// from Peter-Paul Koch @ http://www.quirksmode.org/dom/getstyles.html
function getStyle(x, styleProp, def)
{
    var y = def;
    if (x.currentStyle)
        y = x.currentStyle[styleProp];
    else if (window.getComputedStyle)
        y = document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
    return y;
}

var manglePage = function()
{
    if (manglePageTriggers > 300)
    {
        document.removeEventListener('DOMNodeInserted', manglePage, true);
        manglePageTriggers = -1;
        return;
    }
    else if (manglePageTriggers < 0)
    {
        manglePageTriggers = 0;
        document.addEventListener('DOMNodeInserted', manglePage, true);
        return;
    }
    else
        manglePageTriggers++;
    
    var centerCol, leftNav;
    if ((centerCol = document.getElementById('center_col')) && 
        (leftNav = document.getElementById('leftnav')))
    {
        manglePageTriggers = 0;

        var adverts = document.getElementById('rhs');
        if (adverts)
        {
            if (removeSponsoredLinks) {
                adverts.style.display = 'none';
                if (adverts = document.getElementById('tads'))
                    adverts.style.display = 'none';
            }
            else
                adverts.style.top = getStyle(leftNav, 'height', '342px');
        }
        
        var tsf = document.getElementById('tsf');
        if (tsf)
        {
            tsf.style.marginLeft = '0px';
            tsf = document.getElementById('cnt');
            tsf.style.marginLeft = '0px';
        }
        
        if ((getStyle(centerCol, 'margin-left', '') != '0px') ||
            (getStyle(leftNav, 'right', '').length > 4))
        {
            do
            {
                var leftNavWidth = getStyle(leftNav, 'width', '151px');
                centerCol.style.marginLeft = '0px';
                leftNav.style.right = getStyle(centerCol, 'padding-left', '8px');
                centerCol.style.marginRight = leftNavWidth;
                centerCol.style.borderLeftStyle = 'none';
                leftNav.style.borderRightStyle = 'none';
                
                if (removeSidebarCompletely)
                    leftNav.style.display = 'none';
                
                if ((leftNav.parentNode.className == 'lhshdr') ||
                    (leftNav.parentNode.className == 'lshdr'))
                    leftNav = leftNav.parentNode;
                else
                    leftNav = null;
            } while (leftNav)
        }
        
        var wonderWh, results;
        if ((wonderWh = document.getElementById('tbt8')) &&
            (getStyle(wonderWh, 'left', '') != '0px') &&
            (results = document.getElementById('res')))
        {
            wonderWh.style.left = '0px';
            results.style.paddingRight = leftNavWidth;
        }
    }
}

var manglePageTriggers = 0;
document.addEventListener('DOMNodeInserted', manglePage, true);
document.addEventListener('submit', manglePage, true);
document.addEventListener('click', manglePage, true);
