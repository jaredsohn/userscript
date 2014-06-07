// ==UserScript==
// @name           Spoiler-restore
// @namespace      http://userscripts.org/users/133663
// @description    Replace spoiler images on /jp/ with the old spoiler image.
// @include        http://boards.4chan.org/jp/*
// ==/UserScript==

var imgs = document.getElementsByTagName('img');
var len =imgs.length;
for(var i=0;i<len;i++){
  imgs[i].src=imgs[i].src.replace("spoiler-jp","spoiler");
}