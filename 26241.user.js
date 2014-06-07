// ==UserScript==
// @name           IMDB to VCD Quality
// @description    Adds VCD Quality links to IMDB pages
// @include        http://imdb.com/title/*
// @include		   http://www.imdb.com/title/*
// ==/UserScript==

var title = document.getElementById('tn15title');
var text = title.innerHTML;
text = text.replace(/<span>.*/, "");
text = text.replace(/<h1>/, "");
text = text.replace(/^\s*"?/, "");
text = text.replace(/"?\s*$/, "");
var url = '<a href=\'http://www.vcdquality.com/index.php?searchstring=' + text + '\'>' + text + '</a>';
var fullurl = title.innerHTML;
fullurl = fullurl.replace(text, url);
title.innerHTML = fullurl;
