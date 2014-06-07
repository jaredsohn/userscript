// ==UserScript==

// @name           danbooru

// @namespace      http://userscripts.org/users/137201/scripts
// @description    Opens the images directly.

// @include        http://danbooru.donmai.us/post/show/*

// ==/UserScript==



document.location = document.images[2].src;