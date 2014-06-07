// ==UserScript==
// @name           Pandora Unlimited 2
// @namespace      dbpatterson.com
// @include        https*://www.pandora.com/*
// ==/UserScript==

function loop() {
    if (document.querySelectorAll("a.still_listening").length != 0){
        document.querySelectorAll("a.still_listening")[0].click();
    }
    setTimeout(loop,10000);
}

loop();