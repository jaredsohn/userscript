// ==UserScript==
// @name YouTube Disable HTML5 Codec
// @description Disables HTML5 video on YouTube
// @homepageURL http://userscripts.org/scripts/show/390525
// @updateURL http://userscripts.org/scripts/source/390525.meta.js
// @version 1.0
// @namespace http://userscripts.org/users/funkjedi
// @include http://www.youtube.com/*
// @include https://www.youtube.com/*
// @match http://www.youtube.com/*
// @match https://www.youtube.com/*
// @run-at document-start
// ==/UserScript==

document.createElement('video').constructor.prototype.canPlayType = function(type) { 
    return '';
};
