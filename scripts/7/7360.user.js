// OBS
// version 0.1
// 01-02-2007
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script that removes all CSS styles
// from selected sites.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Unstyle", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          OBS
// @namespace     http://www.iyte.net/
// @description   İYTE Öğrenci Bilgi Sisteminin Firefox'da kullanılmasını sağlar
// @include       http://obs.iyte.edu.tr/*
// @include       http://obs.iyte.edu.tr:9080/*
// ==/UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2005 Mark Pilgrim

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://diveintomark.org/projects/greasemonkey/COPYING
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK */

(function() {
    var stylesheets, i, all, element;

    // this disables all externally linked stylesheets
    stylesheets = document.styleSheets;
    for (i = 0; i < stylesheets.length; i += 1) {
        stylesheets[i].disabled = true;
    }

    all = document.getElementsByTagName('*');
    for (i = 0; i < all.length; i += 1) {
        element = all[i];
        if (element.nodeName == 'STYLE') {
            // this removes <style> elements defined in the page <head>
            element.parentNode.removeChild(element);
        } else {
            // this removes per-element styles and a variety of deprecated attributes
            element.setAttribute('style', '');
            element.setAttribute('size', '');
            element.setAttribute('face', '');
            element.setAttribute('color', '');
            element.setAttribute('bgcolor', '');
            element.setAttribute('background', '');
        }
    }
})();