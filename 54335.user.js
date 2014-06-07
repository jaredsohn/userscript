// ==UserScript==
// @name           Youtube comments piss me off
// @namespace      no comments
// @description    removes the entire comment section from every youtube page. Let me watch my videos in peace.
// @include        http://*.youtube.com/*
// ==/UserScript==
//you will see no comments on any profile page or video page.
(function() {
var noCommentsPlzProfile = document.getElementById('user_comments-body');
var noCommentsAllVideos = document.getElementById('recent_comments', 'comments');
if (noCommentsAllVideos) {
    noCommentsAllVideos.parentNode.removeChild(noCommentsAllVideos);
}
if (noCommentsPlzProfile) {
    noCommentsPlzProfile.parentNode.removeChild(noCommentsPlzProfile);
}

})();