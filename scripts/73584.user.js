// ==UserScript==
// @name           Display Douban Radio Favicon
// @namespace      http://mewbunny.blogspot.com/
// @include        http://douban.fm/*
// ==/UserScript==



var head = document.getElementsByTagName('head')[0];
var icon = document.createElement('link');
icon.setAttribute('type', 'image/x-icon');
icon.setAttribute('rel', 'shortcut icon');
icon.setAttribute('href', 'http://t.douban.com/favicon.ico');
head.appendChild(icon)


