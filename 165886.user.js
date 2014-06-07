// ==UserScript==
// @name        Olras clients note
// @description Fixes client note displayed when the mouse is left over a note (was only working on IE)
// @include     *olras.com*
// @grant       none
// @version     1.01
// @homepageURL    http://userscripts.org/scripts/show/165886
// @updateURL      https://userscripts.org/scripts/source/165886.meta.js
// @icon           http://www.oras.com/_layouts/OrasStyles/images/favicon.ico
// ==/UserScript==

myNotes = document.getElementsByTagName("img");

for each (currNote in myNotes) {
    if (currNote.nodeType == 1 && currNote.getAttribute("src") == "images/suivants/fiche.gif")  {
            myAlt = currNote.getAttribute("alt");
            currNote.setAttribute("title", myAlt);
            }
}