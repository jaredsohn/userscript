// ==UserScript==
// @name           Fark Auto-Reload
// @description    Reloads Fark page after submitting comment
// @include        http://forums.fark.com/cgi/fark/comments.pl
// ==/UserScript==

/*  Copyright (C) 2007 Matthew Flaschen <matthew DOT flaschen AT gatech DOT edu>

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

if(document.evaluate("//div[@class='mainerr']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.firstChild.nodeValue.indexOf("Adding comment...") != -1)
     window.location.href+="?IDLink="+document.evaluate("//*[@name='IDLink']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.value;
