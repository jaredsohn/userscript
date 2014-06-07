// ==UserScript==
// @name       BTTV Scroll Fix
// @author     SubHype
// @version    0.1
// @description  Fixes the scrolling problem with the new group chat
// @match      *://*.twitch.tv/*
// ==/UserScript==

(function() {
    (function load() {
        if (!jQuery) {
            setTimeout(load, 1000);
            return;
        }

        // scroll issue
        $(".chat-messages").css("bottom", "130px");
        
        // annoying white bar of hell
        darkMode = localStorage.getItem("darkenedMode");
        if (darkMode === "true") {
            $(".chat-header").css("background", "#141414");
            $(".chat-header").css("border-bottom-color", "#2e2e2e");
            $(".chat-menu-button-container.left").css("border-right-color", "#2e2e2e");
        }
        
        console.log("BTTV scroll fix applied.");
    })();
})();