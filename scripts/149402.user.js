// ==UserScript==
// @name       Twitter - Remove Page-Container Background
// @version    0.1.1
// @description  Remove the black (or white) page container from the twitter page, so all the background shows through not just what's on either side
// @match      https://*.twitter.com/*
// @copyright  2012, Chris Bradbury
// ==/UserScript==

document.getElementById('page-container').style.background='none';