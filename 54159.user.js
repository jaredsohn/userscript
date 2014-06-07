// ==UserScript==
// @name           Dailymotion <div/> remover
// @namespace      http://www.linkmauve.fr/dev/greasemonkey/
// @description    Removes the <div/> on top of any Dailymotion’s Theora video to make the <video/> controls usable.
// @include        http://openvideo.dailymotion.com/*
// ==/UserScript==

var video_overlay = document.getElementsByClassName('video_overlay')[0];
video_overlay.parentNode.removeChild(video_overlay);
