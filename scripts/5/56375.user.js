// ==UserScript==
// @name           navigate-crucible
// @namespace      navigate-grucible
// @description    Provides keyboard navigation through crucible
// @include        */fisheye/cru/*
// ==/UserScript==

(function() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://werkbold.de/~felix/navigate-crucible/navigate-crucible.js";
    document.getElementsByTagName("head")[0].appendChild(script);
})();
