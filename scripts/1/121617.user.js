// ==UserScript==
// @name           YouTube Auto-Like
// @description    Automatically "likes" a YouTube video upon visiting the video's page.
// @include        http*://*.youtube.com/watch?v=*
// @include        http*://youtube.com/watch?v=*
// ==/UserScript==

// This script automatically "likes" a YouTube video upon visiting the video's page.
unsafeWindow.document.getElementById("watch-like").click()