// ==UserScript==
// @name         Twitch.tv Redirect to Following
// @description  Redirect to following page.
// @include      *.twitch.tv/*
// @grant        none
// @run-at       document-start
// @version      1.0
// ==/UserScript==

if (window.location.pathname == '/') {
    window.location.pathname[window.location.pathname.length - 1] == '/' ? window.location += 'directory/following' : window.location += '/directory/following';
}