/*
Flickr remove spaceball
Version 0.3
(C) 2005 Lenny Domnitser
(C) 2011 pankkake
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

2007-02-18 - fix for new img src
2010 - Fix for new class
2011-11-21 - Fix for new class
*/

// ==UserScript==
// @name          Flickr remove spaceball
// @description   Removes the empty image (download deterrent) positioned over some photos on Flickr
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*
// @include       https://secure.flickr.com/photos/*
// ==/UserScript==

var spaceball = document.getElementById("photo-drag-proxy");
if(spaceball) {
    spaceball.style.display = 'none';
}
