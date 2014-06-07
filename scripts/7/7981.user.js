// No YouNoobs
// version 0.1
// March 16, 2007
// Copyright (c) 2007, Nicholas Francisco
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name          No YouNoobs
// @namespace     http://franciscodesign.com/junk/
// @description   YouTube comments are useless.
// @include       http://*.youtube.com/*

(function() {

var removeComments = document.getElementById('commentsDiv','all_comments');
if (removeComments) {
    removeComments.parentNode.removeChild(removeComments);
}

})();