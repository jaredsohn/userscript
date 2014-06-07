// tumblr-hide-sponsored-posts.user.js
// Save as the above filename and drag into Chrome Extensions screen.

// ==UserScript==
// @name           Tumblr Hide Sponsored Posts
// @namespace      localghost
// @match          http://*.tumblr.com/dashboard
// @version        0.0.1
// ==/UserScript==

GM_addStyle(".sponsored_post { display: none; }");