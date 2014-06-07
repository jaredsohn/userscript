// ==UserScript==
// @name        Ignore SXSW/SXSWi twitter updates
// @description Prunes your twitter feed of SXSW/SXSWi related status updates
// @namespace   http://rewinder.ca
// @include     http://twitter.com/*
// @include     https://twitter.com/*
// ==/UserScript==

function nosxsw() {
    var timeline = document.getElementById("timeline");
    if (!timeline) { return; }
    var statuses = timeline.childNodes;
    for (var i=0; i<statuses.length; i++) {
        var status = statuses[i].getElementsByTagName("span")[1].getElementsByTagName("span")[0].innerHTML.toLowerCase();
        if(status.indexOf("sxsw") != -1) {
            statuses[i].style.display = "none";
        }
    }
}

window.addEventListener("load", function() {
    nosxsw();
}, false);