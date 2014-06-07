// ==UserScript==
// @name           YouTube - Get comment parent
// @namespace      http://lachlanarthur.com
// @description    Shows a link to display a comment's parent.
// @include        http://www.youtube.com/*
// ==/UserScript==

// Hosted off-site. This way it will update automatically. We all know how often YouTube updates  :\
var script = document.createElement('script');
script.src = "http://lach.la/yt/parent.js?_=" + Math.random().toString().substr(2);
(document.body || document.head || document.documentElement).appendChild(script);