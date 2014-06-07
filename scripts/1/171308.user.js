// ==UserScript==
// @name         Disable NoParticipation
// @description  Cancels the np CSS without redirection
// @version      1.1.0
// @license      Public Domain
// @include      http*://*.reddit.com/*
// @grant        none
// ==/UserScript==

if (document.documentElement.lang === 'np') {
    document.documentElement.lang = 'en-us';
}
document.body.classList.add('subscriber');
