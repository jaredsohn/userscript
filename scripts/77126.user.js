// No YouNoobs
// version 0.3
// March 27, 2009
// Copyright (c) 2007, Nicholas Francisco
// Edited by Timothy Butwinick November 2008, March 2009
//           Null Graves May 2010
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name          No YouNoobs May 2010
// @namespace     http://franciscodesign.com/junk/
// @description   YouTube comments are useless.
// @include       http://*.youtube.com/*
// ==/UserScript==

(function() {

var removeComments = document.getElementById('watch-discussion');
if (removeComments) {
    removeComments.parentNode.removeChild(removeComments);
}

})();