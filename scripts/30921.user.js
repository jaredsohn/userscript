/*
 * Copyright 2008 Proven Corporation Co., Ltd., Thailand
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; version 2 dated June, 1991.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
*/

// ==UserScript==
// @name          quickoDeskProfile
// @namespace     http://proven-corporation.com/
// @description   A quick link to view your public profile from anywhere within oDesk
// @include       http://www.odesk.com/*
// @include       https://www.odesk.com/*
// ==/UserScript==

/* A simple wrapper for quick debug messages. */
function debug(message) {
    unsafeWindow.console.debug(message);
}

/* Conveniently search via XPath.  If nothing matches,
 * return null.  For one match, return the element.  For multiple matches,
 * return an array of elements.  The forceList option will force the
 * function to return a list, regardless of the result.
 */
function xpath(path, forceList, node) {
    if(forceList === undefined)
        forceList = false;
    if(node === undefined)
        node = document

    var result = [];
    var nodes = document.evaluate(path, node, null,
                                  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
    for(var a = 0; a < nodes.snapshotLength; a++)
        result.push(nodes.snapshotItem(a));
    if(forceList)
        return result;

    if(result.length == 0)
        return null;
    else if(result.length == 1)
        return result[0];
    else
        return result;
}

/* This is the main program entry after the page loads completely. */
function main() {
    /* Add the config section after the "Logged in as..." stuff. */
    var greeting = xpath('//ul[@id="logline"]/li[1]');
    if(!greeting) {
        /* TODO disable this script because it seems to fail to work with the site's HTML. */
        debug("Cannot find greeting");
        return;
    }
    else {
        /* Insert a new list item with a link to my profile. */
        debug("Found greeting");
        var myHeading = xpath('strong', false, greeting);
        var myName    = myHeading.innerHTML;

        myHeading.innerHTML = '<a style="font-weight: inherit;" href="/d/view_profile.php">' + myName + '</a>';
        debug('done');
    }
}

window.addEventListener('load', main, true);
