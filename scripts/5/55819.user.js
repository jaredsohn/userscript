// ==UserScript==
// @name           abtwitter icon
// @namespace      http://twitter.com/rokudenashi
// @description    あぶついったーにアイコン表示
// @include        http://worstman.net/abtwitter/
// ==/UserScript==

document.body.innerHTML=document.body.innerHTML.replace(/<a href="http:\/\/twitter.com\/(\w+)" target="_blank">/g,'<a href="http:\/\/twitter.com\/$1" target="_blank"><img src="http://usericons.relucks.org/twitter/$1" width="24" height="24">')
