// ==UserScript==
// @name           IMDB to Apple Trailer
// @description    Adds Apple Trailer links to IMDB pages
// @include        http://imdb.com/title/*
// @include		   http://www.imdb.com/title/*
// ==/UserScript==

var title = document.getElementById('tn15title');
var text = title.innerHTML;
text = text.replace(/<span>.*/, "");
text = text.replace(/<h1>/, "");
text = text.replace(/^\s*"?/, "");
text = text.replace(/"?\s*$/, "");
var url = '<a href=\'http://www.google.com/search?btnI=I%27m+Feeling+Lucky&ie=UTF-8&oe=UTF-8&q=site:apple.com/trailers%20"' + escape(text) + '"\'>' + text + '</a>';
var fullurl = title.innerHTML;
fullurl = fullurl.replace(text, url);
title.innerHTML = fullurl;
