// ==UserScript==
// @name		Konachan: Fix Tag Completion Colors
// @namespace	Zolxys
// @description	Fixes the colors for circle and style tags in the tag completion boxes.
// @include	http://konachan.com/*
// @include	http://konachan.net/*
// @version	1.1
// ==/UserScript==
var ne = document.createElement('script');
ne.setAttribute('type','text/javascript');
ne.innerHTML='Post.tag_type_names[5] = "style";\nPost.tag_type_names[6] = "circle";';
document.head.appendChild(ne);
