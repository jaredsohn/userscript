// ==UserScript==
// @name           ExamSoft Categories Expand ALL
// @namespace      ExamSoft Categories Expand ALL
// @description    Automatically expands all categories on all page load.
// @include        https://ei3.examsoft.com/STW-war/ei/categories/*
// @version        1.0
// ==/UserScript==

/**
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

window.onload = function() {
    window.document.body.onload = expandAllESTree(); // note removed parentheses
};

function expandAllESTree() {
    if (document.getElementById("categoriesListingTreeDiv")) {
        ESTree.expandAll('categoriesListingTreeDiv');
    }
}