// ==UserScript==
// @name           Big anidb
// @namespace      AniDB
// @description    AniDB bigger thumbnails in search area
// @include        http://anidb.net/*
// ==/UserScript==

for(var i=0; i < document.images.length; i++)
{
   if (document.images[i].getAttribute('alt') == 'image') {
        document.images[i].src = document.images[i].src.replace("50x65", "150");
   }
}