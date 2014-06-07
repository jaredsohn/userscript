// ==UserScript==
// @name           mitx-hide-subtitles
// @namespace      ion
// @version        0.1
// @description    Hide the closed captions automatically
// @include        https://6002x.mitx.mit.edu/*
// ==/UserScript==

function add_listeners() {
    for (var i = 1, a = document.querySelector("#tt_" + i);
         a;
         i++, a = document.querySelector("#tt_" + i)) {
        a.addEventListener("DOMAttrModified", function(e) {
            if (e.attrName === "class"
                && e.prevValue === ""
                && e.newValue === "seq_video_active") {
                hide_subtitles();
            }
        });
    }
}

function hide_subtitles() {
    var as = document.querySelectorAll("a.hide-subtitles");
    for (var i = 0; i < as.length; i++) {
        var a = as[i];
        a.click();
    }
}

window.addEventListener("DOMContentLoaded", hide_subtitles);
window.addEventListener("DOMContentLoaded", add_listeners);

// vim:set et sw=4 sts=4:
