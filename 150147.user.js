// ==UserScript==
// @name            HiRes Play Store Screenshots
// @version         2.0
// @description     Shows hi-res screenshots in lightbox
// @include         https://play.google.com/store/apps/details*
// @author          Afzal Najam
// @changelog       Updated for the new Play Store (July 2013)
// @downloadURL     https://www.userscripts.org/scripts/source/150147.user.js
// ==/UserScript==
 
scr = document.getElementsByClassName("full-screenshot clickable");

for (i = 0; i < scr.length; i++) {
    attr = scr[i].getAttribute("src").replace("=h900-rw", "=h2000");
    scr[i].setAttribute("src", attr);
}