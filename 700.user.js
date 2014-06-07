/******************************************************************************
 *
 * SMH and Age RemoveAds
 * version 0.3.2
 * 2005-11-18
 *
 * Released under the GPL license, version 2
 * http://www.gnu.org/copyleft/gpl.html
 *
 * SMH and Age RemoveAds
 * Copyright (C) 2005 Alexander Else
 * 
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 * 
 * v0.3.3 - fixed uninstall instructions to reference correct script name
 * v0.3.2 - 1. Fix copyright and license text
 *          2. Remove print sponsor
 * v0.3.1 - 1. unb0rk support for old layout
 *          2. add even more ways to clobber junk
 *          3. hopefully remove pop up ads that aren't blocked by Firefoxes 
 *             popup blocker
 * v0.3.0 - added support for new site layout
 * v0.2.2 - added includes for The Age, which has same site layout
 *
 * Additional code in v0.3 by Peter Ortner, peterortner@mail.com
 *******************************************************************************
 * 
 *  This is a Greasemonkey user script.  To install it, you need
 *  Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
 *  Then restart Firefox and revisit this script.
 *  Under Tools, there will be a new menu item to "Install User Script".
 *  Accept the default configuration and install.
 * 
 *  To uninstall, go to Tools/Manage User Scripts,
 *  select "SMH and Age RemoveAds", and click Uninstall.
 * 
 ******************************************************************************/

// ==UserScript==
// @name          SMH and Age RemoveAds
// @namespace     http://else.id.au
// @description   Remove advertisements cluttering the page on The Age and The Sydney Morning Herald
// @include       http://www.smh.com.au/*
// @include       http://smh.com.au/*
// @include       http://www.theage.com.au/*
// @include       http://theage.com.au/*
// ==/UserScript==


(function()
{
    var idDiv, idDivs, content, contentStyle, reAdSpot, reCSwp;

    function xpath(query) {
        return document.evaluate(query, document, null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    }

    function killNode(target) {
        if(target.parentNode) {
            target.parentNode.removeChild(target);
        } else {
            delete(target);
        }
    }

    reAdSpot = new RegExp("^adSpot");
    reCSwp = new RegExp("^contentSwap");

    idDivs = xpath("//div");

    for(var i = 0; i < idDivs.snapshotLength; i++) {
        idDiv = idDivs.snapshotItem(i);

	switch(idDiv.id) {
            case 'mtmh':
            case 'networkStripTop':
            case 'printout-sponsor':
            //case 'sidebar': // I Don't hide the right hand side.
                killNode(idDiv);
                break;
            default:
        }

        if (reAdSpot.test(idDiv.id)) 
            killNode(idDiv);

        // Display all "pages" at once
        if (reCSwp.test(idDiv.id)) 
            idDiv.style.display = "inline";

        switch(idDiv.className) {
            case 'banner':
            case 'islandad':
            case 'hotspot':
            case 'ad-default':
            case 'textad':
                killNode(idDiv);
                break;
            default:
        }

        if (reAdSpot.test(idDiv.className)) 
            killNode(idDiv);
    }

    // Kill Page 1, 2, 3 rot
    var idULs, thisUL;
    idULs = xpath("//ul");

    for(var i = 0; i < idULs.snapshotLength; i++) {
        thisUL = idULs.snapshotItem(i);
        switch(thisUL.className) {
            case 'pages':
                thisUL.style.display = 'none';
                break;
            default:
        }
    }

    // Create anonymous onLoad function to delete advertising iframes later
    window.addEventListener("load", function(e) {
        // IFRAMES loaded from ffxcam.* are deleted here, because not 
        // all are visible during inital document construction.
        var reCam, ifrs, thisIfr;
        reCam = new RegExp("^http://ffxcam");
        ifrs = document.evaluate("//iframe", document, null, 
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for(var i = 0; i < ifrs.snapshotLength; i++) {
            thisIfr = ifrs.snapshotItem(i);
            if (reCam.test(thisIfr.src)) 
                delete(thisIfr);
        }
        // Get rid of those annoying pop-ups that occasionally occur after 
        // page is loaded, and when you click in the document.
        document.onclick = function(e){};
    }, false);

}
)();
