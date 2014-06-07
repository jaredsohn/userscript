// ==UserScript==
// @name youtube anti-div
// @namespace html5hackery
// @include http://.youtube./*
// This script gets rid of the stupid video-blocker element that rapes the user-html5videoplayer bondage that happens on YouTube if you are in the HTML5 player beta.
// ==/UserScript==

// video-blocker
function addGlobalStyle(css) {
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}

addGlobalStyle('#video-player .video-blocker { display:none;');