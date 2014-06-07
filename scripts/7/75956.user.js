// ==UserScript==
// @name		Steam Store News Mover
// @namespace	http://userscripts.org/users/wxMichael
// @description	Moves the news block from the bottom of the Steam Store page to the right side, like the old store was.
// @include		http://store.steampowered.com/
// ==/UserScript==

var news = document.getElementById('news_block');
var col = document.getElementsByClassName('rightcol')[0];

col.innerHTML = '<div class="block" id="news_block">' + news.innerHTML + '</div>' + col.innerHTML;
news.parentNode.removeChild(news);