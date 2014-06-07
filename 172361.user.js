// ==UserScript==
// @name       for twitter messages
// @namespace  http://imacros.mastrid.ru
// @version    0.1
// @description  for twitter messages
// @include    https://twitter.com/*
// @copyright  2013, vk.com/rstrukt
// @grant       none
// ==/UserScript==

var pole_txt = document.getElementById('tweet-box-mini-home-profile');
var for_copy = document.getElementById('search-query');

function zapolnenie() {
	pole_txt.innerHTML = for_copy.value;
	return false;
}
pole_txt.onclick = zapolnenie;