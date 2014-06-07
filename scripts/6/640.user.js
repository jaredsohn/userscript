/******************************************************************************
 *
 * Linux Today Butler
 * version 0.1.1
 * 2005-03-24
 * Copyright (c) 2005, Denis McLaughlin
 * Released under the GPL license, version 2
 * http://www.gnu.org/copyleft/gpl.html
 * Inspired by Julien Couvreur's BoingBoing Butler
 *
 ******************************************************************************
 *
 * Well, the folks who run Linux Today do a fine job of collecting Linux
 * related articles, but those sidebars squeezing the content are just nasty.
 * So this sorts that out, inspired in principal by the BoingBoing Butler,
 * and with details from other Greasemonkey scripts, since I don't know
 * jack about javascript.
 *
 * The formats of Linux Today's front page and the per-article pages are
 * slightly different, so I've distinguished between them.  Since the various
 * tables don't use names, I just set the visibility of the specific tables
 * to none: if the format of the page changes, this script may break.
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
 *  - like any greasemonkey script: Tools/Manage User Scripts, select Linux
 *    Today Butler, click the Uninstall button
 *
 * Changelog:
 *    March 30, 2005
 *    Denis McLaughlin
 *    - tweaked to follow latest format linuxtoday.com structure
 *    - added slightly more robust table removal
 *    - changed documentation to describe removal of sidebars, rather
 *      than just ads
 */

// ==UserScript==
// @name          Linux Today Butler
// @namespace     http://denism.homeip.net/software/greasemonkey.html
// @description   Remove linuxtoday.com non-content
// @include       http://*linuxtoday.com/*
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
        // this gets the bits of the doc we care about
        head = window._content.document.getElementsByTagName('head')[0]
        table = getElements("//table");

        // this removes the left hand bar
        tr = getElements("//tr").snapshotItem(4);
        if (tr) { tr.deleteCell(0); }

        // check that we have a structure to parse
        if ( ! table )
        { alert("Linux Today Butler - couldn't get list of tables?"); return; }

        // this is true if we're on the front page
        if ( head.innerHTML.match('On Internet Time') )
        {
            // this removes the right hand bar
            table.snapshotItem(31).style["display"] = "none"

            // this removes the login box
            table.snapshotItem(57).style["display"] = "none"

            // this removes the top story box
            table.snapshotItem(59).style["display"] = "none"
        }
        else // else we're on a per-article page
        {
            // this removes the right hand bar
            table.snapshotItem(30).style["display"] = "none"
        }
    }
    catch (e)
    {
        alert("Linux Today Butler - script exception: " + e)
    }
}
)();
