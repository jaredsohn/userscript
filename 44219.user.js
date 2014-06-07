// ==UserScript==
// @name           MDBG Search Shortcut
// @version        1.0
// @namespace      ricli85@gmail.com,2009-03-14
// @description    Adds the forward slash "/" key as a shortcut for the search field on MDBG.
// @include        http://*.mdbg.net*
// ==/UserScript==
//
// Version history:
//
// 1.0 - 2009-03-14 - First version

window.addEventListener("keydown", function keyHandler(event) {
    if (event.which == 191) { // Forward slash
        searchField = document.getElementById("txt_wdqb")
        if (searchField) {
            searchField.select();
            searchField.focus();
            event.stopPropagation();
            event.preventDefault();
            return true;
        }
    }
    return false;
}, false);
