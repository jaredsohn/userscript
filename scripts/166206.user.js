// ==UserScript==
// @author      Michael Mangino
// @name        Feedly - Disable Middle-Click On Titles
// @namespace   http://mangino.net/greasemonkey
// @description Disables the default middle-click action on Feedly article titles.
// @include     http://feedly.com/*
// @include     https://feedly.com/*
// @grant       GM_info
// @downloadURL https://userscripts.org/scripts/source/166206.user.js
// @updateURL   https://userscripts.org/scripts/source/166206.meta.js
// @icon        http://imageshack.us/a/img341/3171/feedlydisablemiddleclic.png
// @version     1.3
// ==/UserScript==

console.log("Loading userscript \"" + GM_info.script.name + "\" v" + GM_info.script.version);

document.addEventListener("mouseover", function(event) {
    if (event.target.id.match(".+_main_title")) {
        event.target.style.pointerEvents = "none";
    }
}, true);
