// ==UserScript==
// @name           Facebook - Show exact timestamp of posts
// @namespace      Facebook
// @description    Shows the exact timestamp for facebook posts
// @include        http://*.facebook.com/*
// @author         Bernd Bestel
// ==/UserScript==

document.addEventListener("load", DisplayTimestamp());

function DisplayTimestamp() {
    var i;

    if (document.getElementsByTagName && document.getElementsByTagName("abbr").length > 0) {
        for (i = 0; i < document.getElementsByTagName("abbr").length; i++) {
            document.getElementsByTagName("abbr")[i].innerHTML += " (" + new Date(document.getElementsByTagName("abbr")[i].title).toLocaleString() + ")";
        }
    }
}