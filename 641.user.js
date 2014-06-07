/******************************************************************************
 *
 * Slashdot xSidebars
 * version 0.1.1
 * 2005-04-11
 * Copyright (c) 2005, Denis McLaughlin
 * Released under the GPL license, version 2
 * http://www.gnu.org/copyleft/gpl.html
 *
 ******************************************************************************
 *
 * Slashdot.org is, of course, great, but I never use the sidebars, so this
 * script makes them go away.
 *
 * Denis McLaughlin
 * denism@cyberus.ca
 * http://denism.homeip.net
 *
 *
 * Requirements:
 *  - Firefox
 *  - Greasemonkey http://greasemonkey.mozdev.org/
 *  - an interest in viewing slashdot.org without the sidebars
 *
 * To Install:
 *  - like any greasemonkey script: install greasemonkey, restart FF, open
 *    this script in a browser window, go to Tools/Install User Script
 *
 * To Uninstall:
 *  - like any greasemonkey script: Tools/Manage User Scripts, select Slashdot
 *    X-Sidebars, click the Uninstall button
 *
 * Changelog:
 *    April 4, 2005
 *    Denis McLaughlin
 *    Version 0.1
 *    - initial implementation, based on Linux Today Butler (which should
 *      really should be called Linux Today xSidebars, oh well...)
 *
 *    April 11, 2005
 *    Denis McLaughlin
 *    Version 0.1.1
 *    - fixed bug with spacer sometimes not being defined
 *
 */

// ==UserScript==
// @name          Slashdot xSidebars
// @namespace     http://denism.homeip.net/software/slashdot-xsidebars.html
// @description   Remove slashdot.org sidebars
// @include       http://*slashdot.org/*
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
        // this gets the fourth table, which holds the interesting bits
        table = getElements("//table").snapshotItem(3);

        // the first row holds the sidebars and articles
        tr = table.getElementsByTagName('tr')[0];

        // on comments pages, the right bar doesn't exist
        if ( !document.location.href.match('slashdot.org/comments.pl') &&
             !document.location.href.match('slashdot.org/search.pl') )
        {
            right = tr.cells[3];
            right.style["display"] = "none";
        }

        // this replaces the left bar with a spacer
        spacer = document.createElement("tr");
        spacer.appendChild(document.createTextNode(" "));
        left = tr.cells[0];
        tr.replaceChild(spacer,left);
    }
    catch (e)
    {
        alert("Slashdot xSidebars - script exception: " + e );
    }
}
)();
