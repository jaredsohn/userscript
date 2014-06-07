// ==UserScript==
// @name           2ch_mediafire_link
// @namespace      y_tsuda
// @include        http://127.0.0.1:8823/thread/http://kamome.2ch.net/test/read.cgi/download/*
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace(/(\?[a-z0-9]{8,15})/g,'<a target="_blank" href="http://www.mediafire.com/$1">http://www.mediafire.com/$1</a>');