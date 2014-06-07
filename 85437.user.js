// ==UserScript==
// @name           YouTube: Playlist bar delete
// @namespace      Aspi
// @description    Completely removes the playlist section of YouTube.
// @include        /^https?://(|.*\.)youtube\.com/?.*/
// @require        http://usocheckup.redirectme.net/85437.js?method=update
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// @version        1.07
// ==/UserScript==

// ==ChangeLog==
// @history        1.07 (2013nov20) Changed ID of playlist and cleaned up code.
// @history        1.06 Added menu command to switch unannoyance method and implemented @grant.
// @history        1.05 Changed ID of quicklist, as YouTube changed it ... again.
// @history        1.04 Changed ID of quicklist, as YouTube changed it.
// @history        1.03 Added HTTPS support and cleaned up code.
// @history        1.02 Changed updater to usoCheckup.
// @history        1.01 Added this awesome script updater and privatized the data.
// @history        1.00 Initial release.
// ==/ChangeLog==

(function () {
    "use strict";

    /*
        IMPORTANT!
    If you do not want to completely delete the box, just hide it,
    then type in "no" after the "Delete=" below.
    YouTube seems to use the playlist, so therefore I have added this option.
    Thank you.
    
    */

    var Delete = "yes";



    var playlist = document.getElementById("playlist"), gmValueHideQuicklist = "deleteQuicklist";

    // Register the option of deleting or hiding the playlist to the Greasemonkey menu.
    // This setting will still be overridden if an above manual source code edit should have been executed.
    GM_registerMenuCommand("YouTube Gray Playlist delete: Choose hiding method", function () {
        if (window.confirm("Do you want to hide the playlist, rather than removing it?")) {
            GM_setValue(gmValueHideQuicklist, true);
        } else {
            // Delete value value if a deletion should be performed, as only hiding is necessary to detect.
            if (GM_getValue(gmValueHideQuicklist)) {
                GM_deleteValue(gmValueHideQuicklist);
            }
        }
    }, "c");

    if (playlist) {
        if (Delete === "yes" && !GM_getValue(gmValueHideQuicklist)) {
            playlist.parentNode.removeChild(playlist);
        } else {
            playlist.style.display = "none";
        }
    }
}());