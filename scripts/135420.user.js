// ==UserScript==
// @name        GLinkRemover
// @namespace   exborun
// @description Rimuove i link superflui da google
// @include     “http://www.google.it/*”
// @version     1
// ==/UserScript==
    
    function $(id) {
        return document.getElementById(id);
    }

    function clearInterface(){