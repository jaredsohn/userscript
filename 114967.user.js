// ==UserScript==
// @name            DoA Power Tools Reloaded
// @namespace       http://www.mmogwiki.com/scripts/dragonsofatlantis
// @description     Power Tools for Dragons of Atlantis
// @include         *://apps.facebook.com/dragonsofatlantis/*
// @include         *://*.castle.wonderhill.com/platforms/facebook/game
// @exclude         *://apps.facebook.com/dragonsofatlantis/rubies
// @match           *://apps.facebook.com/dragonsofatlantis/*
// @match           *://*.castle.wonderhill.com/platforms/facebook/game
// @include         *://plus.google.com/games/659749063556*
// @include         *://*.googleusercontent.com/gadgets/ifr?url=app://659749063556*
// @match           *://plus.google.com/games/659749063556*
// @match           *://*.googleusercontent.com/gadgets/ifr?url=app://659749063556*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @version         0.0.5
// @icon            http://www.mmogwiki.com/scripts/dragonsofatlantis/powertools/logo.png
// ==/UserScript==

/********************************************************************************
 * INFORMATION                                                                  *
 *                                                                              *
 * Name: DoA Power Tools Reloaded                                               *
 * Version: 0.0.5                                                               *
 * Last Modified: Wednesday, 11 October 2011 11:50PM GMT+9.5                    *
 * Author: Runey                                                                *
 *                                                                              *
 * ACKNOWLEDGEMENTS                                                             *
 *                                                                              *
 * DoA Power Tools Reloaded has been written from the ground up and is not      *
 * considered a fork of any other project. However it could never of happened   *
 * without the work done by many scriptwriters on the original DoA Power Tools  *
 * and its many mods.                                                           *
 *                                                                              *
 * DoA Power Tools by George Jetson                                             *
 *  - <http://userscripts.org/scripts/show/102481>                              *
 * DoA Power Tools Plus by Runey                                                *
 *  - <http://userscripts.org/scripts/show/104301>                              *
 * DoA Power Tools Mod by Wham                                                  *
 *  - <http://userscripts.org/scripts/show/103833>                              *
 * DoA Power Tools Plus II by La Larva                                          *
 *  - <http://userscripts.org/scripts/show/114012>                              *
 *                                                                              *
 * DEVELOPMENT                                                                  *
 *                                                                              *
 * If you wish to contribute to the development of DoA Power Tools Reloaded you *
 * can do so at <INSERT WIKI ADDRESS HERE WHEN DONE>.                           *
 *                                                                              *
 * If you wish to fork this project then you may do so as long as the following *
 * conditions are met.                                                          *
 *  - The GNU General Public License version 3 or later is used                 *
 *  - All acknowledgements MUST be included in the source code                  *
 *  - A link to the API at MMOG Wiki MUST be included in the source code        *
 *  - It MUST be free (though as per the GNU Public License a small fee for     *
 *    distribution and/or support may be charged)                               *
 *                                                                              *
 * LICENSE                                                                      *
 *                                                                              *
 * Released under the GPL license                                               *
 * http://www.gnu.org/copyleft/gpl.html                                         *
 *                                                                              *
 * This program is free software: you can redistribute it and/or modify it      *
 * under the terms of the GNU General Public License as published by the        *
 * Free Software Foundation, either version 3 of the License, or                *
 * (at your option) any later version.                                          *
 *                                                                              *
 * This program is distributed in the hope that it will be useful, but          *
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY   *
 * or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License     *
 * for more details.                                                            *
 *                                                                              *
 * You should have received a copy of the GNU General Public License along with *
 * this program.  If not, see <http://www.gnu.org/licenses/>.                   *
 ********************************************************************************/

function main() {
    "use strict";
    var IFRAME,
        $J = jQuery.noConflict(), /* Change jQuery alias */
        PLATFORM,
        OBJECT = "#castlemania_swf", /* All platforms use the same object */
        WINDOW = window;

    function initScript() {
        /********************************************************************************
         * Setup global variables that can be used anywhere within the script           *
         *                                                                              *
         * NAMING CONVENTIONS (http://javascript.crockford.com/code.html)               *
         *  - variables and functions should begin with a lowercase letter              *
         *  - constructor functions should begin with a capital letter                  *
         *  - global variable should be all capitals                                    *
         ********************************************************************************/
        var API_SERVER, /* Global variables from object flashvars (see getFlashvars) */
            DRAGON_HEART,
            FACEBOOK_ID,
            LOCALE,
            SESSION_ID,
            USER_HASH,
            USER_ID,
            USER_TIME;

        /********************************************************************************
         * Extract the flashvars from the SWF object and initialise the appropriate     *
         * global variables.                                                            *
         *                                                                              *
         * USED                                                                         *
         *  - api_server                                                                *
         *  - dragon_heart                                                              *
         *  - facebook_id                                                               *
         *  - locale                                                                    *
         *  - session_id                                                                *
         *  - user_hash                                                                 *
         *  - user_id                                                                   *
         *  - user_time                                                                 *
         *                                                                              *
         * UNUSED                                                                       *
         *  - building_cachebreaker                                                     *
         *  - lazy_loaded_swf_cachebreaker                                              *
         *  - primary_ui_cachebreaker                                                   *
         *  - pub_port                                                                  *
         *  - pub_server                                                                *
         *  - second_ui_cachebreaker                                                    *
         *  - sound_cachebreaker                                                        *
         *  - s3_server                                                                 *
         *  - s3_swf_prefix                                                             *
         ********************************************************************************/
        function getFlashvars() {
            var flashvars = $J(OBJECT + " param[name='flashvars']").attr("value").split("&"),
                keyValue,
                rslt = {};
            $J.each(flashvars, function () {
                keyValue = this.split("=");
                rslt[keyValue[0]] = keyValue[1];
            });
            API_SERVER = rslt.api_server;
            DRAGON_HEART = rslt.dragon_heart;
            FACEBOOK_ID = rslt.facebook_id;
            LOCALE = rslt.locale;
            SESSION_ID = rslt.session_id;
            USER_HASH = rslt.user_hash;
            USER_ID = rslt.user_id;
            USER_TIME = rslt.user_time;
            alert(API_SERVER);
        }

        getFlashvars();
    }

    /********************************************************************************
     * Check to see if script is running in an iframe or not and removes            *
     * unnecessary elements before continuing.                                      *
     *                                                                              *
     * Current actions:                                                             *
     *  - Set width all parent div of iframe to 100%                                *
     *  - Hide unwanted div in window.top                                           *
     *  - Hide unwanted div in iframe                                               *
     *  - Set width of #content div to 760px                                        *
     *                                                                              *
     * To avoid conflict with other libraries, that may be running on the same      *
     * page, the default alias of $ is changed to $J.                               *
     ********************************************************************************/
    function preparePage() {
        function setHigh() {
            clearTimeout();
            if ($J(OBJECT).length < 1) {
                setTimeout(setHigh, 100);
                return;
            }
            switch (PLATFORM) {
            case "facebook":
                $J("#hd > div").css("display", "none");
                $J("#ft").css("display", "none");
                $J("#cn").parent().append($J("#hd"));
                break;
            case "google":
                $J("#pane_hd").css("display", "none");
                break;
            }
            $J("#container").width("760px");
            initScript();
        }

        function setWide() {
            clearTimeout();
            if ($J(IFRAME).length < 1) {
                setTimeout(setWide, 100);
                return;
            }
            switch (PLATFORM) {
            case "facebook":
                $J("#rightCol").css("display", "none");
                break;
            case "google":
                $J(".Pca").css("display", "none");
                break;
            }
            $J(IFRAME).parents().width("100%");
        }

        // Check which platform the script is loading on and set variables appropriately
        if (WINDOW.location.href.indexOf("facebook") !== -1) {
            IFRAME = "#iframe_canvas";
            PLATFORM = "facebook";
        } else if (WINDOW.location.href.indexOf("google") !== -1) {
            IFRAME = "#oz-gadgets-canvas-iframe-659749063556";
            PLATFORM = "google";
        }

        // Check is window is accessible otherwise use unsafeWindow (mostly for compatibility with older versions of Firefox)
        if (!WINDOW) {
            WINDOW = unsafeWindow;
        }

        // If currently running in the top document run setWide otherwise run setHigh is running in an iframe
        if (WINDOW.top === WINDOW.self) {
            setWide();
        } else {
            setHigh();
        }
    }

    preparePage();
}

/********************************************************************************
 * Load a JavaScript library                                                    *
 *                                                                              *
 * Current actions:                                                             *
 *  - Loads jQuery 1.6.4                                                        *
 *                                                                              *
 * Notes:                                                                       *
 *  - Firefox uses @require in the Metadata Block                               *
 *  - Safari includes the library as part of the extension                      *
 ********************************************************************************/
function addLibrary(callback) {
    "use strict";
    var script = document.createElement("script");
    script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

// Add jQuery if not already loaded otherwise continue with main
if (typeof jQuery === "undefined") {
    addLibrary(main);
} else {
    main();
}