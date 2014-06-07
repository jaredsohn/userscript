// ==UserScript==
// @name       Video2Mp3 Go to DL page #2
// @namespace  http://ahaverty.com
// @version    0.1
// @description  Go to the DL page
// @match      http://www.video2mp3.net/promo.php?dlink=./*
// @copyright  2012+, AlanH
// ==/UserScript==

var str = window.location.href;
str = str.replace("promo.php?dlink=./", "");

window.location.href = str;