// ==UserScript==
// @name           hamsolo474's cracked fixer
// @description    Gets rid of things that piss me off
// @include        http://www.cracked.com/*
// @exclude        http://www.cracked.com/
// @exclude        http://www.cracked.com
// @version        1.0
// ==/UserScript==

var div = document.getElementById("pshare-container");
div.parentNode.removeChild(div);
div = document.getElementById("persistent-share");
div.parentNode.removeChild(div);
div = document.getElementById("googlead_1");
div.parentNode.removeChild(div);