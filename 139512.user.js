// ==UserScript==
// @name         Coursera Video Player Shortcuts Fix
// @description  Re-enables cmd+h on OS X and enables space bar to play/pause the video (Tested on Safari 6.0.5)
// @namespace    http://loopkid.net/
// @version      0.1.3
// @include      https://class.coursera.org/*/lecture/view?lecture_id=*
// @include      https://class.coursera.org/*/lecture/preview_view?lecture_id=*
// ==/UserScript==

function contentEval(source) {
    if ('function' == typeof source) {
        source = '(' + source + ')();';
    }
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;
    document.body.appendChild(script);
    document.body.removeChild(script);
}


function fixVideoPlayerShortcuts() {

    // Check every 300ms if video player has finished loading
    var qlchecker = window.setInterval(function () {
        checkForQL_player();
    }, 300);

    function checkForQL_player() {
        if (typeof QL_player != "undefined") {

            // Disable checking of video player load status
            window.clearInterval(qlchecker);

            PLAY_PAUSE_KEY = [32]; // press space bar to play/pause the video
            SHORTCUT_TABLE_KEY = [84]; // press t to show/hide the shortcuts table

            // This will obviously break easily if they decide to change the shortcuts (see also below)
            // 2013-09-25: 11 key actions defined (0..10)

            QL_player.mediaelement_handle.options.keyActions[0] = {
                keys: PLAY_PAUSE_KEY,
                action: function (player, media) {
                    if (media.paused || media.ended) {
                        media.play();
                    } else {
                        media.pause();
                    }
                }
            }

            QL_player.mediaelement_handle.options.keyActions[7] = {
                keys: SHORTCUT_TABLE_KEY,
                action: function (player, media) {
                    toggleShortcuts();
                }
            }
        }
    }
}

contentEval(fixVideoPlayerShortcuts);