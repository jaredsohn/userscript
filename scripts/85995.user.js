// ==UserScript==
// @name           Auto-dislike Justin Bieber's "Baby" video [1/2]
// @namespace      Aspi
// @description    Automatically dislikes Justin Bieber's "Baby" video and removes the ugly video.
// @include        http://*youtube.com/watch?v=kffacxfA7G4*
// ==/UserScript==

h=document.getElementById('watch-container');
c=document.getElementById('watch-video-container');
h.removeChild(c);
window.addEventListener("load",document.getElementById('watch-unlike').click(),false)