// ==UserScript==
// @name           Google Jazz UI Auto Expand More Search Tools
// @namespace      http://mewbunny.blogspot.com/
// @include        http://www.google.tld/search?*
// @include        https://www.google.tld/search?*
// @include        https://encrypted.google.com/search?*
// ==/UserScript==


function wait() {
    try {
        unsafeWindow.google.Toolbelt.togglePromotedTools(null, null);
    } catch(e) {
        setTimeout(wait, 200);
    }
}

wait();

