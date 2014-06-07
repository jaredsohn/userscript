// ==UserScript==
// @name        Facebook: HTML5 video
// @namespace   https://userscripts.org/users/Aspi
// @description Replace Facebook's Flash video player with a generic HTML5 video element.
// @include     /^https?://(www\.)?facebook\.com(/.*)?$/
// @updateURL   http://userscripts.org/scripts/source/174635.meta.js
// @downloadURL http://userscripts.org/scripts/source/174635.user.js
// @grant       none
// @version     0.5
// ==/UserScript==

// ==ChangeLog==
// @history     0.5 [2014.02.27] Cleaned up metadata further.
// @history     0.4 [2014.02.24] Cleaned up metadata.
// @history     0.3 [2013.11.28] A little rewrite.
// @history     0.2 [2013.11.28] Moved to MutationObserver and bugfix.
// @history     0.1 [2013.07.31] Attempted performance improvement.
// @history     0.0 [2013.07.31] Initial release.
// ==/ChangeLog==

// ==License==
/*
@licstart
Copyright (C) 2013-2014  Free Software Foundation, Inc
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

/*
* 
* Thanks a TONNNN to Douglas Crockford, here especially for JSLint. Who knows where browsers would be today, without this noble soul. Cheers!
* 
*/

(function () {
    "use strict";

    var observers = {
            documentObserve : {
                observer : undefined,
                config : undefined
            }
        },

        cuckoo = function () {
            // Look for videos and init vars.
            var i, j,
                swfPlayerClasses = [
                    'swfObject'
                ],
                swfPlayers,
                swfPlayerContainer, swfId, swfObj, swfObjParams, swfVideoData, videoSrc, videoWidth, videoHeight,
                player;

            // loop through possible class names
            i = swfPlayerClasses.length;
            while (i--) {
                swfPlayers = document.getElementsByClassName(swfPlayerClasses[i]);

                // if found, execute
                if (swfPlayers.length) {

                    // Find old players and make them childless, place a cuckoo's egg and gtho of thar.
                    j = swfPlayers.length;
                    while (j--) {
                        // store parent, as it's hard to retrieve if child is removed
                        swfPlayerContainer = swfPlayers[j].parentNode;

                        // Look for swf ID.
                        swfId = swfPlayers[j].getAttribute('data-swfid');
                        if (swfId && swfId.indexOf('swf_id_') >= 0) {
                            swfObj = window[swfId];

                            if (swfObj) {
                                // Gather swf data.
                                swfObjParams = JSON.parse(window.unescape(swfObj.variables.params));
                                // check if the data is inside an array, or just in the object
                                swfVideoData = swfObjParams.video_data[0].video_duration ? swfObjParams.video_data[0] : swfObjParams.video_data;
                                videoSrc = swfVideoData.hd_src || swfVideoData.sd_src;
                                // videoWidth = swfObj.variables.width || swfVideoData.thumbnail_width;
                                // videoHeight = swfObj.variables.height || swfVideoData.thumbnail_height;
                                videoWidth = swfObj.variables.width;
                                videoHeight = swfObj.variables.height;

                                // Create and insert HTML5 player.
                                if (videoSrc) {
                                    player = document.createElement('video');
                                    player.setAttribute('src', videoSrc);
                                    player.className = 'mvp_player';
                                    player.setAttribute('controls', 'controls');
                                    if (videoWidth) {
                                        player.setAttribute('width', videoWidth);
                                    }
                                    if (videoHeight) {
                                        player.setAttribute('height', videoHeight);
                                    }

                                    while (swfPlayerContainer.hasChildNodes()) {
                                        // and there goes generation Z ...
                                        swfPlayerContainer.removeChild(swfPlayerContainer.lastChild);
                                    }

                                    // Someone's nesting -._
                                    swfPlayerContainer.appendChild(player);
                                }
                            }
                        }
                    }
                }
            }
        };

    observers.documentObserve.observer = new MutationObserver(cuckoo);
    observers.documentObserve.config = {
        childList : true,
        subtree : true
    };
    observers.documentObserve.observer.observe(document || document.body, observers.documentObserve.config);
}());
