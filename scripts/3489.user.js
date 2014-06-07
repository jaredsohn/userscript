// ==UserScript==
// @name           Kill BLINK
// @description    Destroys blink element and style
// @include        *
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

var NEW_STYLE = "inherit";

var blinkTags=document.getElementsByTagName("blink");
for(var i=0;i<blinkTags.length;i++)
{
	blinkTags[i].style.textDecoration = NEW_STYLE;
}

var blinkStyles=document.evaluate("//*[contains(@style,'blink')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var j=0;j<blinkStyles.snapshotLength;j++)
{
	blinkStyles.snapshotItem(j).style.textDecoration = NEW_STYLE;
}

/**
 * Commented out due to the likely performance impact.
 */

/*
for(var k=0;k<document.styleSheets.length;k++)
{
  for(var l=0;l<document.styleSheets[k].cssRules.length;l++)
  {
    if(document.styleSheets[k].cssRules[l].style.textDecoration.indexOf("blink")!=-1)
    {
	    document.styleSheets[k].cssRules[l].style.textDecoration = NEW_STYLE;
    }

  }
}
*/