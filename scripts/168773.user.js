// ==UserScript== 
// @name /mlp/ music stopper
// @namespace 4chan
// @description For when you just can't handle the music
// @include http://boards.4chan.org/mlp/*
// @match http://boards.4chan.org/mlp/*
// ==/UserScript==

var embed_div = (document.getElementsByClassName("embed"))[0];
embed_div.parentNode.removeChild(embed_div);
