// ==UserScript==
// @name           mixtape_on_my_discogs
// @namespace      mixtape
// @description    Enhancing the abilities of discogs with the power of mixtape.me - replaces artist name with a link to mixtape search
// @include        http*://*discogs.com/artist/*
// ==/UserScript==

var re = /<h1>(.+)<\/h1>/; 
document.body.innerHTML = document.body.innerHTML.replace(re, "<h1><a href='http://mixtape.me/#/search/?q=$1' target='_blank'>$1</a></h1>");
