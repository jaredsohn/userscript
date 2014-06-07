// ==UserScript==
// @name        NewTube 2013 !
// @author      AAIIKK
// @version		0.4
// @description If you have Full HD screen u must be mad on YouTube(Google) for changing layout (wasting space!). CHANGE IT!
// @include     https://www.youtube.com*
// @include     http://www.youtube.com*
// ==/UserScript==

var overrideCSS = " \
.watch-medium .watch7-playlist-bar-left { width: 945px; } \
.watch-wide #watch7-playlist-bar-toggle-button { display: none; } \
.watch-playlist-collapsed #watch7-playlist-tray-container { opacity: 100; } \
.watch-medium #watch7-playlist-tray-container { height: 562px; border-bottom: #1B1B1B solid 2px;} \
.sidebar-expanded .watch7-playlist-bar-right { width: 445px; } \
.watch-medium #player-api { width: 945px; height: 564px; } \
";
GM_addStyle(overrideCSS);