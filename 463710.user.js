// ==UserScript==
// @name        Phoronix: native search
// @namespace   https://userscripts.org/users/Aspi
// @author      https://userscripts.org/users/Aspi
// @description replace Phoronix' use of Google with it's native search
// @include     /^https?://www.phoronix.com(/.*)?$/
// @updateURL   https://userscripts.org/scripts/source/463710.meta.js
// @downloadURL https://userscripts.org/scripts/source/463710.user.js
// @grant       none
// @version     0.01
// ==/UserScript==

// ==ChangeLog==
// @history     0.01 (2014april13) initial release
// ==/ChangeLog==

// ==License==
/*
@licstart
Copyright (C) 2014  Free Software Foundation, Inc
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
        searchEngine = 'http://www.phoronix.com/scan.php',

        // less changeable shizz
        i, j,
        initialized = false,
        searchForms = document.forms,
        curr, elmsToRemove, elmsToAdd;

    // loop through, and modify, forms
    i = searchForms.length;
    while (i--) {
        // if it is a form at all
        if (searchForms[i].tagName && searchForms[i].tagName.toLowerCase() === 'form') {
            // if not initialized yet, do now
            if (!initialized) {
                elmsToAdd = [];

                // Phoronix' search page is at /scan.php?page=search
                curr = document.createElement('input');
                curr.type = 'hidden';
                curr.name = 'page';
                curr.value = 'search';
                elmsToAdd.push(curr);

                initialized = true;
            }

            // make it's action custom
            searchForms[i].action = searchEngine;

            // loop form elements
            // array to hold elements to remove
            elmsToRemove = [];

            j = searchForms[i].elements.length;
            while (j--) {
                curr = searchForms[i].elements[j];

                // remove unwanted elements
                switch (curr.name) {
                case 'q':
                    break;
                // don't kill search button, just neutralize it
                case 'sa':
                    curr.name = '';
                    break;
                default:
                    elmsToRemove.push(curr);
                }
            }

            // remove elements to remove after loop is done, to not clutter up the loop
            j = elmsToRemove.length;
            while (j--) {
                elmsToRemove[j].parentNode.removeChild(elmsToRemove[j]);
            }

            // add wanted elements
            j = elmsToAdd.length;
            while (j--) {
                searchForms[i].appendChild(elmsToAdd[j]);
            }
        }
    }
}());
