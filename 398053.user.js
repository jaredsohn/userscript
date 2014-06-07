// ==UserScript==
// @name           anti-paranoia
// @namespace      https://userscripts.org/users/Aspi
// @author         https://userscripts.org/users/Aspi
// @description    don't panic
// @include        *
// @domain         *
// @match          *
// @updateURL      https://userscripts.org/scripts/source/398053.meta.js
// @downloadURL    https://userscripts.org/scripts/source/398053.user.js
// @grant          none
// @version        0.04
// ==/UserScript==

// ==ChangeLog==
// @history        0.04 (2014feb24) the cobra waits
// @history        0.03 (2014feb24) cleanups. accolades to Crockford
// @history        0.02 (2014feb24) html popups
// @history        0.01 (2014feb24) initial release
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

/**
 * This script is a remake of Johannes Buchner's "Anti-Paranoia" Firefox Add-on,
 * that sadly does not work anymore. Creds to him for the idea.
 * https://addons.mozilla.org/en-US/firefox/addon/anti-paranoia/
 * http://antiparanoia.mozdev.org/
 * http://johbuc6.coconia.net/doku.php/anti-paranoia (might need archive.org for access)
**/

(function () {
    'use strict';

    var
        debug = false,
        i, c,
        weAreWithEnemies,

        // system functions
        rnd = function (ceil) {
            return Math.floor(Math.random() * ceil);
        };

    // if normal site
    if (window.location.href.toLowerCase().indexOf('google') === -1) {
        // should we commence? do at each 2%
        if (rnd(100) < 2 || debug) {
            weAreWithEnemies = false;
        }
    // do a special one for Google
    } else {
        if (!rnd(7) || (debug && !weAreWithEnemies)) {
            weAreWithEnemies = true;
        }
    }

    // don't use time on init if we shan't
    if (weAreWithEnemies === undefined) {
        return;
    }

    Math.GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;

    // globals
    var
        /**
         * YOU CAN SET THESE SETTINGS :)
        **/
        // in seconds
        msgDuration = 10,

        // general functions
        logFunc = window.console,
        cLog = function (arg) {
            logFunc.log(arg);
        },
        dbgLog = function (arg) {
            if (debug) {
                cLog(arg);
            }
        },

        // timeUnit is seconds
        fade = function (elm, from, to, duration, updateInterval, callback) {
            // delta opacity / needed calculations
            var step = (to - from) / (duration / updateInterval);

            (function faid(now) {
                elm.style.opacity = now.toString();

                if ((step > 0 && now < to) || (step < 0 && now > to)) {
                    // fade a little more
                    setTimeout(function () {
                        faid(now + step);
                    }, updateInterval * 1000);
                // time to call it a time
                } else {
                    if (callback) {
                        callback();
                    }
                }
            }(from));
        },

        // data
        paranoia = [
            ['Stay calm.', 'G, U R U!'],
            ['Everything is good.', 'you know, like 9PM good'],
            ['No one is against you.', 'they are before you, closely holding their binoculars fixed on yer 1s and 0s'],
            ['The world is a good place.', 'was*'],
            ['Nobody is watching you.', 'yeah right'],
            ['Everything will be much better soon.', 'just close your eyes'],
            ['It isn\'t your fault.', 'it\'s not fucking mine either!']
        ],
        goggles = [
            ['Interesting search ...', '*stored*'],
            ['Might I suggest visiting Google+?', 'it\'s a completely safe alternative to Facebook,\nand is in no way made for the sole purpose of surveying you'],
            [['We\'ll make sure nobody else gets to watch', 'your recorded browsing habits.'], 'the NSA does pay pretty well, in fact'],
            ['That we sell your browsing habits, is for your own benefit.', 'you will hereby be tracked by more determined, targeted predators, for free'],
            ['Our quantum computer is for Anroid security research.', 'and it works'],
            ['Ctrl+S', 'best hotkey ever'],
            ['Interesting, your neighbour also searched for that today!', 'intranational correlation is an interesting phenomena'],
            ['Please don\'t clear your cookies.', 'not that we in any way highly value your PREFID'],
            ['We are not participating in PRISM.', 'how could we ever commit to such crimes? global mapping?! *ptew*\n(Project Tango?)']
        ],
        contProperties = {
            // don't calculate before we need it :)
            sideMargin : (Math.pow(Math.GOLDEN_RATIO, 3)).toString() + 'em',
            headMargin : (Math.pow(Math.GOLDEN_RATIO, 2)).toString() + 'em'
        },

        // specific functions
        // inputArr === [msg === [], title === '']
        soothe = function (inputArr) {
            // fade in, live for x seconds, fade out

            var
                appendTo = document.body,
                ocont = document.createElement('div'),
                icont,
                // elmArr = collection
                createCont = function (elmArr, contElmType) {
                    var elm = document.createElement(contElmType);
                    // for i in collection
                    for (i = 0, c = elmArr.length; i < c; ++i) {
                        // if string
                        if (typeof elmArr[i] === 'string') {
                            elm.appendChild(document.createTextNode(elmArr[i]));
                        // else, if collection
                        } else if (elmArr[i].length) {
                            elm.appendChild(createCont(elmArr[i], 'span'));
                        // else, assume obiect
                        } else {
                            elm.appendChild(elmArr[i]);
                        }

                        // add the BR, if not at the end of a collection
                        if (i !== c - 1) {
                            elm.appendChild(document.createElement('br'));
                        }
                    }
                    return elm;
                },
                rndA = rnd(2), rndB;

            // if nothing to append to, quit the job
            if (!appendTo) {
                return;
            }

            ocont.id = 'anti-paranoia';
            // take second argument as title
            ocont.title = inputArr[1];

            // style it
            ocont.style.opacity = 0;
            ocont.style.backgroundColor = '#EEE';
            ocont.style.position = 'fixed';
            ocont.style.zIndex = 1001;
            ocont.style.border = '1px solid';
            ocont.style.borderColor = '#DDD';
            ocont.style.borderRadius = '1em';
            ocont.style.padding = ((Math.GOLDEN_RATIO % 1) / Math.E).toString() + 'em ' + (Math.GOLDEN_RATIO % 1).toString() + 'em';

            // randomize where we intrude
            // hopefully, a little more has happened since last pseudo-random number generation
            rndB = rnd(2);
            if (rndA) {
                ocont.style.top = contProperties.headMargin;
            } else {
                ocont.style.bottom = contProperties.headMargin;
            }
            if (rndB) {
                ocont.style.left = contProperties.sideMargin;
            } else {
                ocont.style.right = contProperties.sideMargin;
            }

            // create a container for each collection (array, hopefully) we find,
            // if string, convert to text node,
            // else, just append the element
            //     add a BR after each appendation
            // must send input as a collection
            icont = createCont([inputArr[0]], 'div');

            ocont.appendChild(icont);

            appendTo.appendChild(ocont);
            fade(ocont, parseFloat(ocont.style.opacity), Math.GOLDEN_RATIO % 1, 1, 0.025, function () {
                setTimeout(function () {
                    fade(ocont, parseFloat(ocont.style.opacity), 0, 1, 0.025, function () {
                        ocont.parentNode.removeChild(ocont);
                    });
                }, msgDuration * 1000);
            });
        },
        msg = weAreWithEnemies ?
                goggles[rnd(goggles.length)] :
                paranoia[rnd(paranoia.length)];

    // init in x secs
    setTimeout(function () {
        soothe(msg);
    }, Math.E * Math.E * 1000);
}());
