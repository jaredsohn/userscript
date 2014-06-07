// ==UserScript==
// @name          Facebook Videos - Remove Title Prefix  
// @description   Removes the "Video Posted by " prefix from facebook titles, so you better can see which page is which in the browser tab bar. Assumes you show favicons in the tab bar, so you can tell the site that way.
// @include       http://www.facebook.com/video/*
// ==/UserScript==

document.title = document.title.replace(/^Videos Posted by /, '')