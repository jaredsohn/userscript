// ==UserScript==
// @name           Remove x-ads
// @namespace      
// @description    Убирает крестики "я не хочу больше это видеть"
// @include        http://*leprosorium.ru/*
// ==/UserScript==
var xs = document.getElementsByClassName('pro_hide_post_button'); for (i=0;i<xs.length;i++){ xs[i].parentNode.removeChild(xs[i].previousSibling); xs[i].style.display='none'; }