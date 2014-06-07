// ==UserScript==
// @name           Disable StarTribune page refresh
// @namespace      http://umn.edu/~hick0088
// @description    Disable the annoying automatic page refreshes on articles and other pages of the StarTribune website
// @include        http://startribune.com/*
// @include        http://www.startribune.com/*
// ==/UserScript==

(function() {
    function killRefresh () {
        window.clearTimeout (reloadTimer);
    }

    // insert a copy of the above function directly into the page so it can
    // access the "reloadTimer" variable defined there.
    document.body.appendChild (document.createElement("script")).innerHTML="(" +
        killRefresh + ")();";
})();

// vim:set sw=4 expandtab smarttab:
