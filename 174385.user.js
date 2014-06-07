// No YouNoobs
// version 0.5
// July 2013
// Copyright (c) 2007, Nicholas Francisco
// Edited by Alexander Cobleigh, July 2013
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name          No YouNoobs July 2013
// @namespace     http://cblgh.org
// @description   YouTube comments are useless.
// @include       http*://*.youtube.com/*
// ==/UserScript==

(function() {

var removeComments = document.getElementById('watch-discussion');
if (removeComments) {
    removeComments.parentNode.removeChild(removeComments);
}

})();