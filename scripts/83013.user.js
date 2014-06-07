// ==UserScript==
// @name           Google Jazz UI Auto Expand Options
// @namespace      http://mewbunny.blogspot.com/
// @include        http://www.google.tld/search?*
// @include        https://www.google.tld/search?*
// @include        https://encrypted.google.com/search?*
// ==/UserScript==


function wait() {
    if (!unsafeWindow.google.srp) {
        setTimeout(wait, 100)
    } else {
        if (document.getElementById("ms").className.indexOf("open") < 0) {
            unsafeWindow.google.srp.toggleModes()
        }
    }
}

wait();

