// ==UserScript==
// @name           reddit imgur unblocker
// @namespace      http://reddit.com
// @namespace      http://www.reddit.com
// @description    switch imgur image links to filmot.com mirror
// @include        http://*.reddit.com/*
// @include        http://reddit.com/*
document.body.innerHTML = document.body.innerHTML.replace(/imgur.com\/([^ \"])([^ \"])([^ \"])([^ \"])([^ \"])\.png/g, "filmot.com/$1$2$3$4$5.png");
document.body.innerHTML = document.body.innerHTML.replace(/imgur.com\/([^ \"])([^ \"])([^ \"])([^ \"])([^ \"])\.jpg/g, "filmot.com/$1$2$3$4$5.jpg");
document.body.innerHTML = document.body.innerHTML.replace(/imgur.com\/([^ \"])([^ \"])([^ \"])([^ \"])([^ \"])\.gif/g, "filmot.com/$1$2$3$4$5.gif");
document.body.innerHTML = document.body.innerHTML.replace(/imgur.com\/([^ \"])([^ \"])([^ \"])([^ \"])([^ \"])\"/g, "filmot.com/$1$2$3$4$5.jpg\"");
// ==/UserScript==
