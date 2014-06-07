// ==UserScript==
// @name           Photobucket is almost as shitty as tinypic
// @namespace      http://hurrr.durr/
// @include        http://media.photobucket.com/*.bmp
// @include        http://media.photobucket.com/*.jpg
// @include        http://media.photobucket.com/*.jpeg
// @include        http://media.photobucket.com/*.png
// @include        http://media.photobucket.com/*.gif
// ==/UserScript==

location.href = document.getElementById("fullSizedImage").src;
