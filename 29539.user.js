// RemoveDuplicateAccessKeys
//
// This Greasemonkey user script deletes duplicate accesskeys.  This became an issue when I upgraded
// to Firefox 3.  It does not invoke the action associated with an accesskey if there are duplicates on
// a page.  Instead it moves the focus between each duplicate and you must press Enter to invoke the
// action.  My e-mail client (Horde IMP) has duplicate accesskeys.
//
// The first occurrence of a particular accesskey on a page will be left intact.  All later duplicates
// are removed.
//
// Copyright 2008 Brian Westphal (westphal@umich.edu)
//
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU
// General Public License as published by the Free Software Foundation, either version 3 of the License,
// or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
// even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// General Public License for more details.
//
// You should have received a copy of the GNU General Public License along with this program.  If not,
// see <http://www.gnu.org/licenses/>.
//
// ==UserScript==
// @name           RemoveDuplicateAccessKeys
// @namespace      http://www.westphals.net
// @description    Removes duplicate accesskey attributes on a page.  Only the first one will survive.
// @include        *
// ==/UserScript==

var allElements;
var currentElement;
var index;
var currentKey;
var tracker;

allElements = document.evaluate('//*[@accesskey]', document, null,
                                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    
tracker = new Object();
    
for(index = 0; index < allElements.snapshotLength; index++)
{
    currentElement = allElements.snapshotItem(index);
    currentKey = currentElement.getAttribute('accesskey');
    
    if(tracker.hasOwnProperty(currentKey))
    {
        currentElement.removeAttribute('accesskey');
    }
    else
    {
        tracker[currentKey] = 1;
    }
}