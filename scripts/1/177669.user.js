// ==UserScript==
// @name        Clear LJ top
// @namespace   http://stasorenburg.livejournal.com/
// @description Clear livejournal top from banned users posts
// @include     http://www.livejournal.com/
// @version     1
// @grant     none
// ==/UserScript==

window.addEventListener('load', function() {
    var wrapper = document.getElementsByClassName("b-entryunit-state-restored");
    for (var i=0; i<wrapper.length; i++){
        wrapper[i].style.display = "none";
    };
}, false);