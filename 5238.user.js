// ==UserScript==
// @name           Freeport News Remover
// @namespace      http://freelancing.eveguardian.net/
// @description    Removes news items from the freeport forums
// @include        http://freelancing.eveguardian.net/*
// ==/UserScript==

var news = document.getElementsByTagName("ul")[0];
var data = document.createElement("p");
data.innerHTML = "<strong>News removed by Greasemonkey</strong>";
news.parentNode.replaceChild( data, news );



