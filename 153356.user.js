// ==UserScript==
// @name           Nxtgn header image
// @namespace      Script by Minus
// @include        http*://*nxtgn.org/*
// @exclude        http*://nxtgn.org/moresmilies.php*
// @exclude        http*://nxtgn.org/ajax/*
// @version        0.2b
// ==/UserScript==
var logo = document.getElementsByTagName("img")[0];
logo.src = "https://i.imgur.com/5J4UEMf.png"; //link to image
logo.width = "990"; //width of the image 990 - no banner = 0
logo.height = "200"; //height of the image 140 - no banner = 0