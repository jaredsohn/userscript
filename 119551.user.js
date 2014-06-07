// ==UserScript==
// @name           YouTube Video-Sidebar Remover
// @namespace      Kafke
// @description    Removes Video-Sidebar from Youtube homepage. This includes recommended videos, featured, and spotlight.
// @include        http://*.youtube.com/*
// ==/UserScript==

document.getElementById("video-sidebar").style.display = "none";