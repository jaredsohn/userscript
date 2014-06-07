// ==UserScript==
// @name           YouTube Rewriter
// @namespace      www.prism.gatech.edu/~mflaschen3/
// @description    Rewrites YouTube embed links to the full URL
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

var ythost = "http://www.youtube.com/";
var ytquery = "watch?v=";

function convertURL(url)
{
     var end;
     var ampersand = url.indexOf("&");
     
     if(ampersand != -1)
     {
	  end = ampersand;
     }
     else
     {
	  end = url.length;
     }
     
     id = url.substring(url.lastIndexOf("/") + 1, end);
     var newURL = ythost + ytquery + id;
     return newURL;
}

var youTubeParams = document.evaluate("//PARAM[@name='movie' and contains(@value, 'youtube')]",
				     document,
				     null,
				     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				     null);

var item;

for(var i = 0; i < youTubeParams.snapshotLength; i++)
{
     item = youTubeParams.snapshotItem(i);
     item.setAttribute("value", convertURL(item.getAttribute("value")));
}

var youTubeEmbeds = document.evaluate("//EMBED[contains(@src, 'youtube')]",
				     document,
				     null,
				     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				     null);

for(var i = 0; i < youTubeEmbeds.snapshotLength; i++)
{
     item = youTubeEmbeds.snapshotItem(i);
     item.setAttribute("src", convertURL(item.getAttribute("src")));
}
