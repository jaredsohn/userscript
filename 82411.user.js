// ==UserScript==
// @name           reddit/imgur bandwidth saver
// @namespace      http://reddit.com
// @namespace      http://www.reddit.com
// @description    links to a 640 pixel width compressed version of the image instead of the full image
// @include        http://*.reddit.com/*
// @include        http://reddit.com/*
document.body.innerHTML = document.body.innerHTML.replace(/imgur.com\/([^ \"])([^ \"])([^ \"])([^ \"])([^ \"])\.png/g, "imgur.com/$1$2$3$4$5l.png");
document.body.innerHTML = document.body.innerHTML.replace(/imgur.com\/([^ \"])([^ \"])([^ \"])([^ \"])([^ \"])\.jpg/g, "imgur.com/$1$2$3$4$5l.jpg");
document.body.innerHTML = document.body.innerHTML.replace(/imgur.com\/([^ \"])([^ \"])([^ \"])([^ \"])([^ \"])\"/g, "imgur.com/$1$2$3$4$5l.jpg\"");
// ==/UserScript==
