// ==UserScript==
// @name          WaniKani Audio Auto-Play
// @namespace     http://userscripts.org/users/25278
// @description   Automatically plays audio on WaniKani review pages
// @include       http://www.wanikani.com/*
// @grant none
// ==/UserScript==

try {
    audiojs.settings.autoplay = true;
} catch (e) {
    console.log("WaniKani Audio Auto-Play: Audiojs could not be found!")
}