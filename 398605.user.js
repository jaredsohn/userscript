// ==UserScript==
// @name        Phoronix: use DuckDuckGo
// @namespace   https://userscripts.org/users/Aspi
// @author      https://userscripts.org/users/Aspi
// @description Replace Phoronix' use of Google with DuckDuckGo
// @include     /^https?://www.phoronix.com(/.*)?$/
// @updateURL   https://userscripts.org/scripts/source/398605.meta.js
// @downloadURL https://userscripts.org/scripts/source/398605.user.js
// @grant       none
// @version     0.03
// ==/UserScript==

// ==ChangeLog==
// @history     0.03 (2014feb25) added settings and did housekeeping
// @history     0.02 (2014feb25) added updater
// @history     0.01 (2014feb24) initial release
// ==/ChangeLog==

// ==License==
/*
@licstart
Copyright (C) 2010-2014  Free Software Foundation, Inc
51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You may have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
@licend
*/
// ==/License==

(function () {
    'use strict';

    // Get search forms.
    var
        /**
         * YOU CAN CHANGE THESE SETTINGS :)
        **/
        sortByDate = true,
        searchEngine = 'https://duckduckgo.com/',
        
        // less changeable shizz
        i, j,
        searchForms = document.forms,
        searchString,
        searchFieldBlurListener = function () {
            if (this.value.indexOf('site:') !== -1) {
                this.value = searchString;
            }
        },
        curr, elementsToRemove;

    // loop through, and modify, forms
    i = searchForms.length;
    while (i--) {
        // if it is a form at all
        if (searchForms[i].tagName && searchForms[i].tagName.toLowerCase() === 'form') {
            // make it's action DuckDuckGo
            searchForms[i].action = searchEngine;

            // loop through elements to modify them
            // array to hold elements to remove
            elementsToRemove = [];

            j = searchForms[i].elements.length;
            while (j--) {
                curr = searchForms[i].elements[j];

                // remove unwanted elements
                switch (curr.name) {
                case 'q':
                    // function to replace "searchquery settings" with "searchquery"
                    curr.addEventListener('blur', searchFieldBlurListener, false);
                    break;
                case 'sa':
                    curr.name = '';
                    break;
                default:
                    elementsToRemove.push(curr);
                }
            }

            // remove elements to remove after loop is done, to not clutter up the loop
            j = elementsToRemove.length;
            while (j--) {
                elementsToRemove[j].parentNode.removeChild(elementsToRemove[j]);
            }

            // add listener to add " settings" to search query
            searchForms[i].addEventListener('submit', function () {
                i = this.elements.length;
                while (i--) {
                    if (this.elements[i].name === 'q') {
                        // copy searchstring for later replacement
                        searchString = this.elements[i].value;

                        // add " site:domain.tld" to search query
                        // also, add " sort:date" to sort by date
                        this.elements[i].value += ' site:' + window.location.host + (sortByDate ? ' sort:date' : '');
                    }
                }
            }, false);
        }
    }
}());
