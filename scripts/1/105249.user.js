// ==UserScript==
// @name           lebuzzdujour.org
// @namespace      ldi38
// @include        http://www.lebuzzdujour.org/*
// ==/UserScript==

var menu2=document.getElementById("menu_context");
menu2.parentNode.removeChild(menu2);

var player2=document.getElementById("player");
player2.style.display='block';

var facebook2=document.getElementById("facebook");
facebook2.parentNode.removeChild(facebook2);

