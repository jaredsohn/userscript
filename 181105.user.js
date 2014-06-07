// ==UserScript==
// @name        YouTube logo link fixer
// @namespace   www.youtube.com/*
// @description Links you to "My Subscriptions" when clicking the YouTube icon
// @include     http://www.youtube.com/*
// @version     1
// @grant       none
// ==/UserScript==
document.querySelector('#logo-container map area').href = '/feed/subscriptions';