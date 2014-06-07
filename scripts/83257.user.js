// ==UserScript==
// @name         twitter: hide "how to follow"
// @description  Hide/remove "Who to follow" box on twitter.
// @include      http://twitter.com/*
// @include      https://twitter.com/*
// @match        http://twitter.com/*
// @match        https://twitter.com/*
// ==/UserScript==

document.getElementById('recommended_users').style.display = 'none';
document.getElementById('profile').style.marginBottom = '9px';