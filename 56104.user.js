// ==UserScript==
// @name          YouTube Silencer
// @description   Hides Youtube comments.
// @include       http://*.youtube.com/*
// ==/UserScript==
(function() {

var commentsDiv = document.getElementById('watch-comment-panel');
if (commentsDiv)
    commentsDiv.parentNode.removeChild(commentsDiv);

})();