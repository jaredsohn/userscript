// ==UserScript==
// @id             yt-no-lng-pref-msg
// @name           Youtube - no language preference message
// @version        0.1a
// @author         RainyAyne
// @description    Remove that anoying language preference message
// @include        http://www.youtube.com/*
// @include        https://www.youtube.com/*
// @run-at         document-end
// ==/UserScript==

(function() {
    // Find message
    var ytAlert = document.getElementById("alerts");
    // Check if it is the language preference message
    if(ytAlert.innerHTML.indexOf("displayLang()") != -1) {
        // Delete it
        ytAlert.parentNode.removeChild(ytAlert);
    }
})();
