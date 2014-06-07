// ==UserScript==
// @name           Battlelog 1337 Dog Tag
// @description    Adds the 1337 platoon dog tag
// @include        http://battlelog.battlefield.com/*
// @copyright      Yasir_Abu_Saif
// @version        1.0 beta
// ==/UserScript==

var dogtagDiv       = document.querySelector ("#dogtag2-render");
dogtagDiv.innerHTML = '<img src="http://i.imgur.com/Ba3pW.png" />';
