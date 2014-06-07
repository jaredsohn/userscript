// ==UserScript==
// @name           noads_svd
// @namespace      www.edholm.com/grease
// @description    Remove ads from svd.se
// @include        http://www.svd.se/*
// @version        2011-04-16 20:06
// ==/UserScript==

/*  =====================================================================

    Copyright 2010,2011  Jan Edholm

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

    ===================================================================== */

function doIt() {
    var i, node, list;

    if (window.top != window.self)  //don't run on frames or iframes
    {
        // GM_log('Script running in frame');
        return;
    }

    // Remove top ad banner (and adjust padding)
    node = document.getElementById('panorama');
    if (node) {
        node.parentNode.removeChild(node);
        node = document.getElementById('header');
        if (node) {
            list = node.getElementsByClassName("popup-ad");
            for (i = list.length - 1; i >= 0; i--) {
                list[i].parentNode.removeChild(list[i]);
            }
        }
        node.style.paddingTop = "19px";
    }

    // Remove right ad column
    node = document.getElementById('page');
    if (node) {
        list = node.getElementsByClassName("ad-column");
        for (i = list.length - 1; i >= 0; i--) {
            list[i].parentNode.removeChild(list[i]);
        }
    }

    // Remove ad divs in 'content' div
    node = document.getElementById('content');
    if (node) {
        list = node.getElementsByClassName('articlead');
        for (i = list.length - 1; i >= 0; i--) {
            list[i].parentNode.removeChild(list[i]);
        }
        list = node.getElementsByClassName('ad');
        for (i = list.length - 1; i >= 0; i--) {
            list[i].parentNode.removeChild(list[i]);
        }
    } 

    // Remove ad li:s in 'section-additional' div
    node = document.getElementById('section-additional');
    if (node) {
        list = node.getElementsByClassName('partner-ad');
        for (i = list.length - 1; i >= 0; i--) {
            list[i].parentNode.removeChild(list[i]);
        }
    }
}

// Do it!
doIt();

