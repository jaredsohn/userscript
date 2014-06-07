/******************************************************************************
 *
 * ColbyCosh xSidebars
 * version 0.1
 * 2005-07-12
 * Copyright (c) 2005, Denis McLaughlin
 * Released under the GPL license, version 2
 * http://www.gnu.org/copyleft/gpl.html
 *
 ******************************************************************************
 *
 * Colby Cosh's blog at http://colbycosh.com is an interesting, rightish
 * Canadian/Albertan politics-and-whatever site.  However, like many sites,
 * it hosts an irritating and largely useless sidebar.  And this makes it
 * go away.
 *
 * Denis McLaughlin
 * denism@cyberus.ca
 * http://denism.homeip.net
 *
 *
 * Requirements:
 *  - Firefox
 *  - Greasemonkey http://greasemonkey.mozdev.org/
 *  - an interest in viewing linuxtoday.com without the sidebars
 *
 * To Install:
 *  - like any greasemonkey script: install greasemonkey, restart FF, open
 *    this script in a browser window, go to Tools/Install User Script
 *
 * To Uninstall:
 *  - like any greasemonkey script: Tools/Manage User Scripts, select Colby
 *    xSidebars, click the Uninstall button
 *
 * Changelog:
 *    July 12, 2005
 *    Denis McLaughlin
 *    - initial implementation
 */

// ==UserScript==
// @name          Colby xSidebars
// @namespace     http://denism.homeip.net/software/greasemonkey.html
// @description   Remove http://colbycosh.com sidebar
// @include       http://*colbycosh.com/*
// ==/UserScript==


(function()
{
    // passed an element type, it returns an array of all those elements
    window.getElements = function(type)
    {
        return document.evaluate(
          type, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    }

    try
    {
        // this gets the first row
        tr = getElements("//tr").snapshotItem(0);

        // this deletes it
        if (tr) { tr.deleteCell(0); }
    }
    catch (e)
    {
        alert("Colby Cosh xSidebars - script exception: " + e)
    }
}
)();
