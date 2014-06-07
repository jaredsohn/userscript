 // ==UserScript==
    // @name         Stop/Reload button: Safari 4 way
    // @namespace   http://userstyles.org/styles/17818
    // @description Put Stop/Reload button in location bar like Safari 4
    // @description Original: http://userstyles.org/styles/2131
    // @version     1.0
    // @include     main
    // @license     CC0 1.0 (or later) Universal; http://creativecommons.org/publicdomain/zero/1.0/
    // ==/UserScript==

    // Move Smart Stop/Reload button into the location bar right before the Go button
    document.getElementById("urlbar-icons").insertBefore(
    document.getElementById("reload-button"),
    document.getElementById("go-button")
    );
        document.getElementById("urlbar-icons").insertBefore(
        document.getElementById("stop-button"),
        document.getElementById("reload-button")
    );
    // Prevent location bar from gaining focus after Stop or Reload are activated
    document.getElementById("stop-button").setAttribute("onclick", "event.stopPropagation();");
    document.getElementById("reload-button").setAttribute("onclick", "event.stopPropagation();");
    // Add platform CSS selection
    document.getElementById("main-window").setAttribute("platform", navigator.platform);