// vorarlberg online (vol.at) kommentare entfernen
// version 0.1
// February 11, 2009
// Copyright (c) 2009, Atilla Kiran
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name		vorarlberg online (vol.at) kommentare entfernen
// @description	keine rassistischen, dummen und sinnlosen vol.at kommentare mehr.
// @namespace		http://atilla.at/zeuch/
// @include		http://*.vol.at/*
// ==/UserScript==


(function() {

var removeComments = document.getElementById('ArticleForumMessages');

if (removeComments) {
    removeComments.parentNode.removeChild(removeComments);
}

})();