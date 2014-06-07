// ==UserScript==
// @name       Recolor the YouTube like/dislike bar
// @version    0.1
// @description  Makes the YouTube like bar green again and the dislike bar red, like it's supposed to be. Ya' know?
// @include     *youtube.com/*
// @icon http://i.imgur.com/Ihrd6zU.jpg
// ==/UserScript==

GM_addStyle(".video-extras-sparkbar-likes {background: #5BA016 !important }");
GM_addStyle(".video-extras-sparkbar-dislikes {background: #ca2d24 !important }");
