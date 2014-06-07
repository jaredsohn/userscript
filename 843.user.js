// ==UserScript==

// @name            PaulGraham.com Text Widther
// @namespace       http://sharedobject.org/greasemonkey
// @description     Changes the width of the text table column
// @include         http://paulgraham.com/*
// @include         http://www.paulgraham.com/*

// ==/UserScript==

(function() {

    var tables = window._content.document.getElementsByTagName("table");
    tables[1].style["width"] = "800";
    tables[2].style["width"] = "800";

})();
