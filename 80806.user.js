// ==UserScript==
// @name           noads_passagen
// @namespace      http://www.edholm.com/grease/
// @description    Remove ads from passagen.se
// @include        http://alias.passagen.se/*
// @include        http://www.passagen.se/*
// @version        2010-07-05 10:52
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
    var i, node, list;

    // Remove named elements
    node = document.getElementById('networkheader');
    if (node) {
        node.parentNode.removeChild(node);
    }

    // Remove top banner
    node = document.getElementById('wrap');
    if (node) {
        list = node.getElementsByClassName('giantbanner');
        if (list.length >= 1) {
            list[0].parentNode.removeChild(list[0]);
        }
    }
}());