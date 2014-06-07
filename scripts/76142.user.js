// ==UserScript==
// @name         CrunchyRoll message box remover
// @namespace    http://userscripts.org/scripts/show/76142
// @description  Removes Crunchyroll's annoying message boxes
// @author       wn
// @include      http://*.crunchyroll.com/*
// ==/UserScript==

(function() {
    var mb = document.getElementById('message_box');
    if (mb != null) {
        mb.parentNode.removeChild(mb);
    }
})();