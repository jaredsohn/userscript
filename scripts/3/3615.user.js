/*
    resizes the center column of tagesschau
    (c) 2005 Thomas Richter
    http://www.thomas-richter.de/

    Copy, use, modify, spread as you see fit.
*/

// ==UserScript==
// @name            TagesschauCenterColResize
// @namespace       http://www.thomas-richter.de/
// @description     resizes the center column of tagesschau
// @include         http://www.tagesschau.de/aktuell/meldungen/*.html
// ==/UserScript==

(function() {
     document.getElementById('centerCol').style.width = "37em";
})();

