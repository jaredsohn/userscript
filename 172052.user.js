// ==UserScript==
// @name            Hack Forums - Removes nsfw from sites
// @namespace       Snorlax
// @description     If you visit a site with nsfw in the link, then it will redirect to site without nsfw
// @include         *nsfw.hackforums.net/*
// @version         1.0
// ==/UserScript==

var url = location.href;
if (url.match(/nsfw/)) {
    window.location.href = url.replace(/nsfw/, 'www');
}