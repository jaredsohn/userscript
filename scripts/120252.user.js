// ==UserScript==
// @name           DCTP Spoilers
// @namespace      http://forum.dctp.ws
// @description    Reveal All Spoilers
// @include        http://forum.dctp.ws/index.php?topic*
// ==/UserScript==

spoilerblocks = document.getElementsByClassName("spoilerbody");
if (spoilerblocks !== null) {
    for (s=0; s < spoilerblocks.length; s++) {
        spoilerblocks[s].style.display = 'block';
    }
}
