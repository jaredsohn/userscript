// ==UserScript==
// @name        Bing Images: direct link
// @namespace   https://userscripts.org/users/Aspi
// @description Makes the images on Bing direct links. Only works by opening in new tab!
// @include     /^https?://(www\.)?bing\.com/images/.*/
// @updateURL   http://userscripts.org/scripts/source/184528.meta.js
// @downloadURL http://userscripts.org/scripts/source/184528.user.js
// @version     0.02
// @grant       none
// ==/UserScript==

// ==ChangeLog==
// @history     0.02 [2014.02.27] Moved to MutationObserver and improved shizz.
// @history     0.01 [2013.10.24] Initial release.
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

    // globals
    var i, c, j, d,
        queue, curr,
        observers = {
            documentObserve : {
                observer : undefined,
                config : undefined
            }
        },
        containers, containerClassName = 'dg_u',
        aContainerClassName = 'dv_i', aJSONAttribute = 'm', aIndexAttribute = 'idx', aMouseOverOverlayAttribute = 'ihk', aImageIDAttribute = 'mid',
        imgPreviewSacredIdentifiableAttribute = 'src2',
        urlObjectName = 'imgurl', urlObjectRegex,
        // this is a list of attributes to preserve. if functionality is broken, it's very likely fixed by adding an attribute here.
        interestingAttributes = {};
        interestingAttributes['class'] = true;
        interestingAttributes['style'] = true;
        // 'aImageIDAttribute' is for preserving functionality of 'More Sizes'
        interestingAttributes[aImageIDAttribute] = true;
        // 'aIndexAttribute' is for getting the right item when clicking the link
        interestingAttributes[aIndexAttribute] = true;
        // 'aMouseOverOverlayAttribute' is for popup when mousing over image
        interestingAttributes[aMouseOverOverlayAttribute] = false;

        // 'argQueue' is an array.
        // 'argWorkFunc' must return 0 at success, and !0 at fail.
        var bfs = function (argQueue, argWorkFunc) {
            var curr, i;

            // add children to queue
            while (argQueue.length) {
                curr = argQueue.pop();

                if (!argWorkFunc(curr)) {
                    break;
                }

                i = curr.childNodes.length;
                while (i--) {
                    argQueue.push(curr.childNodes[i]);
                }
            }
            
            return argQueue;
        }, run = function () {
            var container, imgURL, imgPreviewURL, game, aElm, imgElm, aAttributes;

            // loop through each container, and work them right
            for (i = 0, c = containers.length; i < c; ++i) {
                container = containers[i];

                // if has been manipulated, skip this one.
                if (container.getAttribute('ismanipulated')) {
                    continue;
                }

                // get child element with 'aJSONAttribute' attribute.
                // loop through all children of all children of parent. BFS
                // start with container
                queue = [container];
                bfs(queue, function (elm) {
                    // look for data
                    game = elm.getAttribute(aJSONAttribute);
                    if (game) {
                        // if ...
                        // string is a Javascript Object. cannot allow to use eval(), so must parse ourselves. f'in' Micro(brain)soft
                        // match first quoted content after "urlObjectName".
                        urlObjectRegex = new RegExp(urlObjectName + '.*"(.*)"');
                        // [0] is match without capture, [1] is captured.
                        game = game.match(urlObjectRegex)[1];

                        if (game) {
                            // ... data is found:
                            imgURL = game;
                            return 0;
                        }
                    }

                    // housekeeping
                    game = undefined;

                    return !0;
                });

                // if search was fruitful
                if (imgURL) {
                    // manipulate

                    // -- ver0: manipulate Bing's original layout
                    // search for A child
                    queue = [];
                    // add children to queue
                    i = container.childNodes.length;
                    while (i--) {
                        queue[queue.length] = container.childNodes[i];
                    }
                    bfs(queue, function (elm) {
                        if (elm.tagName && elm.tagName.toLowerCase() === 'a') {
                            aElm = elm;
                            return 0;
                        }
                        return !0;
                    });

                    // if the search was fruitless
                    //     all hope might be lost?
                    //   behold
                    //         alternatives arise
                    if (!aElm) {
                        // -- ver1: hijack with custom IMG within a A
                        imgElm = document.createElement('img');

                        // we need an IMG source, and we'll use Bing's preview images.
                        queue = [];
                        j = container.childNodes.length;
                        while (j--) {
                            queue[queue.length] = container.childNodes[j];
                        }
                        bfs(queue, function (elm) {
                            // try and find by seeing if the element has equal height to container
                            if (elm.getAttribute(imgPreviewSacredIdentifiableAttribute)) {
                                console.log(elm);
                                imgPreviewURL = elm.src;
                                return 0;
                            }

                            return !0;
                        });

                        // if the search was fruitful
                        if (imgPreviewURL) {
                            imgElm.src = imgPreviewURL;
                        // else, we must abort our modding
                        } else {
                            continue;
                        }

                        // we can proceed to create a link
                        aElm = document.createElement('a');
                        aElm.className = aContainerClassName;
                        aElm.appendChild(imgElm);

                        // make container childless
                        while (container.hasChildNodes()) {
                            container.removeChild(container.lastChild);
                        }

                        // go nesting
                        container.appendChild(aElm);

                    // if A previous was found, remove crap
                    } else {
                        // remove uninteresting attributes
                        for (j = 0, d = aElm.attributes.length; j < d; ++j) {
                            curr = aElm.attributes[j];
                            // if not a member of interesting attributes, massacre it
                            if (!interestingAttributes[curr.name]) {
                                aElm.attributes[j].value = '';
                            }
                        }
                    }

                    if (aElm) {
                        // set interesting attributes
                        aElm.href = imgURL;

                        // mark as manipulated
                        container.setAttribute('ismanipulated', 'false'); // is Microsoft capable of negation?
                    }
                }

                // housekeeping
                container = undefined;
                queue = undefined;
                imgURL = undefined;
                imgPreviewURL = undefined;
                curr = undefined;
                game = undefined;
                aElm = undefined;
                imgElm = undefined;
                aAttributes = undefined;
            }
        }, containersArePresent = function () {
            curr = document.getElementsByClassName(containerClassName);
            if (curr.length) {
                containers = curr;
                return true;
            }
            // return false;
        }, watch = function () {
            if (containersArePresent()) {
                run();
                // housekeeping
                containers = undefined;
            }
        };

    // add a watcher, because Bing Images is dynamic
    // window.addEventListener('DOMNodeInserted', watch, false);
    observers.documentObserve.observer = new MutationObserver(watch);
    observers.documentObserve.config = {
        childList : true,
        subtree : true
    };
    observers.documentObserve.observer.observe(document || document.body, observers.documentObserve.config);
}());
