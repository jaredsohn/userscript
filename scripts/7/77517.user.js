//
//  Youtube has several keyboard shortcuts, which are great for power-users.
//  Unfortunately, they only work when the video has focus and it does not, upon page load.
//
//  This script corrects that, so that no foolish mouse-waving is needed.
//  It also works well with the FlashBlock extension.
//
//  For reference, the known keyboard shortcuts are currently:
//
//      Spacebar        = Play or Pause a video
//
//      Left Arrow      = Rewind 10%
//      Right Arrow     = Fast forward  10%
//
//      Up Arrow        = Increase Volume
//      Down Arrow      = Decrease Volume
//
//      F key           = Full screen view
//      Esc key         = Exit full screen view
//
//      The control, shift and alt keys don't seem to have any effect on arrow magnitude.
//
//
// ==UserScript==
// @name            Youtube Set Focus to the Video
// @namespace       http://www.youtube.com/
// @description     This script sets the focus to the video so that the various keyboard shortcuts can be used.  Works well with FlashBlock.
// @match           http://*.youtube.com/watch*
// @match           https://*.youtube.com/watch*
// @updateURL       https://userscripts.org/scripts/source/77517.meta.js
// @downloadURL     https://userscripts.org/scripts/source/77517.user.js
// @version         3.1
// @grant           GM_addStyle
// ==/UserScript==
/*
    Change log:
    Jan 9, 2013     Refactored for changed YT layout.  Used smart timers to handle delays and AJAX
                    in lieu of Mutation events (which are now deprecated).  Switched to allow run
                    on https page. Tested with Chrome also. Activated auto-update feature.
                    Used @grant to switch the sandbox back on like it always should be.
                    The focus should be faster, too, since the script no longer waits for the
                    load event.  Blocked unneeded runs in iframes.
                    Finally, the page title refactoring is no longer needed.  YouTube fixed it.
*/

//-- Run in main page only, not iframes.
if (window.top === window.self) {
    var failSafeCheck = false;    //-- Used to alert to fatal page changes by Youtube.

    /*--- Find the Flashblock overlay, if any, and focus it just once.  But use continous polling
        to allow for AJAX page loads.
    */
    var flashBlockTimer = setInterval (
        function () {
            var flashBlockDiv = document.querySelector (
                "#content div.flash-player > div[srcattribute]"
                + ", #player-api > div[srcattribute]"
            );
            if (flashBlockDiv) {
                if ( ! flashBlockDiv.dataset.hasBeenFocused) {
                    flashBlockDiv.focus ();
                    flashBlockDiv.dataset.hasBeenFocused    = true;
                    failSafeCheck                           = true;
                }
            }
        },
        333
    );

    /*--- When a movie node appears, focus it just once.  Use continous polling
        to allow for AJAX page loads.
    */
    var movieNodeTimer = setInterval (
        function () {
            var videoNode = document.getElementById ('movie_player');
            if (videoNode) {
                if ( ! videoNode.dataset.hasBeenFocused) {
                    videoNode.focus ();
                    videoNode.dataset.hasBeenFocused    = true;
                    failSafeCheck                       = true;
                }
            }
        },
        222
    );

    setTimeout (
        function () {
            if ( !failSafeCheck) {
                alert ('Unable to find key nodes. YouTube layout has changed; update this GM script.', '');
                throw new Error ('Unable to find key nodes. YouTube layout has changed; update this GM script.', '');
            }
        },
        1000 * 60 * 3   //-- 3 minutes
    );
}
