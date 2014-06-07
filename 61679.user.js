// ==UserScript==
// @name           TinyPic is a gigantic pile of shit.
// @namespace      http://tinypic.com/is/shit
// @description    Gets rid of the shit on tinypic image pages and goes straight to the image.
// @include        http://tinypic.com/view.php?*
// ==/UserScript==

location.href = document.getElementById("imgElement").src;
