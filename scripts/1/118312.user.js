// ==UserScript==
// @name           Expand YouTube description automatically
// @namespace      http://www.youtube.com/
// @description    Automatically uncollapses the detailed description on YouTube
// @include        http://www.youtube.com/watch*
// @include        https://www.youtube.com/watch*
// ==/UserScript==

document.querySelector('#watch-description').classList.remove('yt-uix-expander-collapsed');