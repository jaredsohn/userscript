/*
Copyright 2009 ftvs

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// ==UserScript==
// @name            YouTube Feather Super
// @description		Within YouTube, this script replaces links to YouTube videos with links to the flash object.
// @include 		http://www.youtube.com*
// ==/UserScript==


// if watch page && feather (check for the div with "in feather beta" id oo)
if ((document.getElementById("oo") != null)
        && (window.location.href.match(new RegExp("watch\?")) != null))
{
    window.location.href = window.location.href.replace("watch?v=", "v/") + "&autoplay=1";
}
/* this seems to fail due to isContentEditable == false
var allLinks = document.getElementsByTagName("a");

for (i in allLinks) // loop through allLinks, i being index
{
    // check for links to youtube watch pages and replace with flash object
    allLinks[i].href = allLinks[i].href.replace("watch?v=", "v/");
}
*/
// intercept clicks? middle click won't work