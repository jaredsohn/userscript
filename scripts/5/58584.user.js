// ==UserScript==
// @name           YouTube Comment Remover
// @namespace      http://www.webmaster-source.com
// @description    YouTube comments are horribly spelled, and not very nice overall. Save yourself unneeded stress.
// @include        http://*.youtube.com/*
// ==/UserScript==

var YoutubeComments = document.getElementById('watch-comment-panel');
if (YoutubeComments) {
    YoutubeComments.parentNode.removeChild(YoutubeComments);
}