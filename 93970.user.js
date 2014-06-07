// ==UserScript==
// @name           Add 'Search IMDb' link to Video Buster
// @namespace      http://www.videobuster.de/
// @description    Adds a 'Search IMDb' link to each Video Buster movie page. The search is performed using the original title of the movie. 
// @include        https://www.videobuster.de/titledtl.php/*
// @include        http://www.videobuster.de/titledtl.php/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var titleElement = $("div.label:contains('Originaltitel') ~ div");
var title = titleElement.text()
// strip the subtitle
var pos = title.indexOf(' - ');
if (pos > 0) title = title.substring(0, pos);
titleElement.append(' - <a href="http://www.imdb.com/find?s=tt&q=' + title + '">Search IMDb</a>');