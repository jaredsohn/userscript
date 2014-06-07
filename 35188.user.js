// ==UserScript==
// @name           crunchyroll always h.264 def
// @namespace      http://userscripts.org/users/51800
// @description    adds ?h264=1 to crunchy vid urls
// @include        http://www.crunchyroll.com/media-*
// @exclude        http://www.crunchyroll.com/media-*?h264=1
// ==/UserScript==

location.href+='?h264=1';