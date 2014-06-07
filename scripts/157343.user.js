// ==UserScript==
// @name         Improved YouTube-logo
// @version	 1.1
// @namespace    TurboToaster
// @description  Make the YouTube-logo redirect to "Your subscriptions > Uploads only"
// @match	 http://*.youtube.com/*
// @match	 https://*.youtube.com/*
// @run-at       document-end
// @copyright    2013, TurboToaster
// ==/UserScript==

document.getElementById('logo-container').setAttribute('href', '/feed/subscriptions');
document.getElementById('logo-container').setAttribute('title', 'YouTube > Uploads only');