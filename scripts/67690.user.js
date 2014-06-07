// ==UserScript==
// @name           noads_oplt
// @namespace      www.edholm.com/grease
// @description    Remove ads from op.se and ltz.se
// @include        http://op.se/*
// @include        http://ltz.se/*
// @version        2010-07-02 15:46
// ==/UserScript==

/*  =====================================================================

    Copyright 2010  Jan Edholm

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

(function doIt() {
    var node, node2, list, arr, i, regex1, regex2, width, count;

    // Remove named elements
    node = document.getElementById('adTop');
    if (node) {
        node.parentNode.removeChild(node);
    }
    node = document.getElementById('LinneanAd');
    if (node) {
        node.parentNode.removeChild(node);
    }
    node = document.getElementById('mainBottom');
    if (node) {
        node.parentNode.removeChild(node);
    }

    // Remove "ad column" divs 
    arr = document.getElementsByTagName('DIV');
    regex1 = new RegExp("(^|\\s)column(\\s|$)"); 
    regex2 = new RegExp("(^|\\s)adColumn(\\s|$)"); 
    for (i = arr.length - 1; i >= 0; i--) {
        node = arr[i];
        if (regex1.test(node.className) && (regex2.test(node.className))) {
            node.parentNode.removeChild(node);
        }
    }

    // Remove other "ad class" divs
    arr = document.getElementsByTagName('DIV');
    regex1 = new RegExp("(^|\\s)themeBlockContainer(\\s|$)"); 
    regex2 = new RegExp("(^|\\s)annons\_"); 
    for (i = arr.length - 1; i >= 0; i--) {
        node = arr[i];
        if (regex1.test(node.className) && (regex2.test(node.className))) {
            node.parentNode.removeChild(node);
        }
    }

    // Remove right column ads w pattern "Annons" <BR /> #text [<scripts>] <DIV (ad) >
    node = document.getElementById('lokussearch'); // Assume Lokus element is always present
    if (node && node.parentNode) {
        arr = [];
        list = node.parentNode.getElementsByTagName("BR");
        for (i = 0; i < list.length; i++) {
            try {
                if (list[i].previousSibling.nodeName == "#text" &&
                    list[i].previousSibling.textContent.match(/Annons/) &&
                    list[i].nextSibling.nodeName == "#text")
                {
                    for (node = list[i].nextSibling; node; node = node.nextSibling) {
                        if (node.nodeName == "SCRIPT" || node.nodeName == "#text") {
                            // May still match pattern, check next sibling
                            continue;
                        } else if (node.nodeName == "DIV") {
                            // We have a match - Remove
                            arr.push(list[i].previousSibling);
                            arr.push(list[i]);
                            arr.push(list[i].nextSibling);
                            arr.push(node);
                        }
                        break;
                    }
                }
            }
            catch (e) {
                // Does not match pattern, move on to next in list
            }
        }
        for (i = arr.length - 1; i >= 0; i--) {
            node = arr.pop();
            node && node.parentNode.removeChild(node);
        }
    }


    // Adjust "main content div's" width to its container's width
    arr = document.getElementsByTagName('DIV');
    regex1 = new RegExp("(^|\\s)column(\\s|$)"); 
    regex2 = new RegExp("(^|\\s)mainContainer(\\s|$)"); 
    for (i = arr.length - 1; i >= 0; i--) {
        node = arr[i];
        if (regex1.test(node.className) && (regex2.test(node.className))) {
            if (node.hasAttribute('width') && document.getElementById('mainWrapper').hasAttribute('width')) {
                node.width = document.getElementById('mainWrapper').width || node.width;
            }
        }
    }
}());