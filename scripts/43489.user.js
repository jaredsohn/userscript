// ==UserScript==
// @name          Vkontakte.ru Context Ads Off
// @namespace     http://youngerson.livejournal.com
// @description   Turns context ads on Vkontakte.ru off
// @include       http://vkontakte.ru/*
// @include       http://vk.com/*
// ==/UserScript==

var ads = document.getElementsByClassName("ad_box");
for (var ad = 0; ad<ads.length;ad++){
   var item = ads[ad];
	item.style.display = "none";
}
var sidebar = document.getElementById("sideBar"); //Remove "Что это?" link

sidebar.innerHTML = sidebar.innerHTML.replace(/(<a href="http:\/\/vkontakte.ru\/help.php\?page=target">)([\s\S]*)(<\/a>)/, "");

sidebar.innerHTML = sidebar.innerHTML.replace(/(<a href="http:\/\/vk.com\/help.php\?page=target">)([\s\S]*)(<\/a>)/, "");