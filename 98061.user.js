// ==UserScript==
// @name          MeneameSneakStop
// @description   Stop and start message stream in Menéame and clones' chat
// @include       */sneak.php*
// ==/UserScript==

/*
 * Removed jQuery calls for compatibility
 * 
 * Added event system detecting when everything is loaded
 *
 */

function do_connection () {
    msg = document.getElementById('items')

    msg.addEventListener("mouseover", do_pause, false);
    msg.addEventListener("mouseout", do_play, false);
}

window.addEventListener("load", do_connection, false);