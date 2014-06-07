// ==UserScript==
// @name           What.CD :: Invite amount hider
// @namespace      http://www.what.cd
// @description    Hides the number of invites besides the link
// @include        http*://*what.cd*
// ==/UserScript==

(function () {
    "use strict";
    var HIDE_COMPLETELY, REPLACEMENT, INVITE_LINK_DIV_ID, inviteLinkDiv;

    // Settings
    HIDE_COMPLETELY = false; // If true, the REPLACEMENT text isn't displayed
    REPLACEMENT = 'Invite';  // Text to display if HIDE_COMPLETELY is false

    // Constants
    INVITE_LINK_DIV_ID = 'nav_invite';

    // Hidding the invites link or replacing it with string in REPLACEMENT
    inviteLinkDiv = document.getElementById(INVITE_LINK_DIV_ID);
    if (HIDE_COMPLETELY) {
        inviteLinkDiv.parentNode.removeChild(inviteLinkDiv);
    } else {
        inviteLinkDiv.firstChild.textContent = REPLACEMENT;
    }
}());