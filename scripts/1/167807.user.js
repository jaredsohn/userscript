// ==UserScript==
// @name        brozieblock
// @namespace   elmisto
// @description Block brozie chat widget on gifland.us
// @author      Aszalós Gábor
// @homepage    https://github.com/elmisto/gifland-prod
// @include     http://*gifland.us/*
// @run-at      document-start
// @version     1.0
// ==/UserScript==

// Search and destroy brozie-widget.js
window.addEventListener('beforescriptexecute', function(e) {
    src = e.target.src;
    if(src.search("brozie-widget.js") != -1) {
        e.preventDefault();
    };
}, true);
