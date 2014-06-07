// ==UserScript==
// @name           Blingo Ad Blocker
// @description    Blocks Blingo "sponsored links" and useless "Did I Win?"
// @include        *blingo.com/*
// ==/UserScript==

/*  Copyright (C) 2006 Matthew Flaschen <matthew DOT flaschen AT gatech DOT edu>

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along
    with this program; if not, write to the Free Software Foundation, Inc.,
    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

    The GPL is also available from my site, at http://www.prism.gatech.edu/~mflaschen3/gpl.txt 
*/

//Next line will find all the ad divs by class.
var adStuff= document.evaluate(
"//*[@class='sponsoredSectionTitle'] | //*[@class='sponsoredSection'] | //*[@class='bottomSponsoredSection'] | //*[@class='resultsSectionSeparator'][last()] | //*[@class='winIndicator']",
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);
var workItem;
for(var i=0;i<adStuff.snapshotLength;i++)
{
workItem=adStuff.snapshotItem(i);
workItem.parentNode.removeChild(workItem); //removes the ad div referenced by workItem
}
