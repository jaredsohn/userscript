// ==UserScript==
// @name           anidb
// @namespace      AniDB
// @description    AniDB  bigger thumbnail images
// @include        http://anidb.net/*
// ==/UserScript==

for(var i=0; i < document.images.length; i++)
{
   document.images[i].src = document.images[i].src.replace("50x65", "150");
}