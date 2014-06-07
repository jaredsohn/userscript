// ==UserScript==
// @name           Remove dots
// @description    Remove the dots "•" before the menus links
// @include        http://www*.cs-manager.com/csm/*
// ==/UserScript==

var menu=document.getElementById('menu');
menu.innerHTML=menu.innerHTML.replace(/• /ig,"");