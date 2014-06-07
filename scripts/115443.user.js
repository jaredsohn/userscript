// ==UserScript==
// @name          YouTube Cosmic Panda Full Description
// @date          10-2011
// @description   Automatically shows the full description on YouTube video pages with Cosmic Panda layout.
// @copyright     Copyright 2011 Thisegzz
// @include       http://youtube.com/watch?*
// @include       http://*.youtube.com/watch?*
// ==/UserScript==

document.getElementById('watch-description').className = 'yt-uix-expander yt-uix-expander-animated';
document.getElementById('watch-description-text').style.height = "100%";