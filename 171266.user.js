// ==UserScript==
// @name           Scrap.tf Item Information
// @author         NMGod
// @description    Scrap.tf Item Information
// @version        1.1
// @include        http://scrap.tf/weapons/*
// @include        http://scrap.tf/hats/*
// @updateURL      http://userscripts.org/scripts/source/171266.meta.js
// @installURL     http://userscripts.org/scripts/source/171266.user.js
// @copyright      NMGod
// ==/UserScript==

var items = document.getElementsByClassName("item");
for(i = 0; i < items.length; i++) {
	items[i].innerHTML = items[i].getAttribute("data-content").replace("Craft number", "<br><br><br><br>Craft no");
	items[i].style.fontSize = "10px";
	items[i].style.textAlign = "left";
	items[i].style.lineHeight = "11px";
}