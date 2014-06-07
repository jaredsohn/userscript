// YouTube Comment BLocker
// 1.0-FINAL
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name	YouTube Comment Blocker
// @namespace	http://userscripts.org/users/172720
// @description Silence the ceaseless yammering of morons
// @include	http://*.youtube.com/*
// ==/UserScript==

(function() {

var comments = document.getElementById('comments-view');
if (comments) {
    comments.parentNode.removeChild(comments);
}
comments = document.getElementById('comments-post');
if (comments) {
    comments.parentNode.removeChild(comments);
}

})();