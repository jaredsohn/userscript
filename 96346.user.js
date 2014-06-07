// ==UserScript==
// @name           BlueSystem - Magnifying Pictures
// @description    Увеличивает картинки в режиме просмотра профиля
// @namespace      http://date.bluesystem.ru/*
// @include        http://date.bluesystem.ru/*
// ==/UserScript==
var images = document.getElementsByTagName("img");
for (i = 0; i < images.length; i++){
	var w = images[i].getAttribute("width");
	if(w == "102")
	{
	var s = images[i].getAttribute("src");
	s = "http://date.bluesystem.ru/members/fs/" + s.slice(37);
	images[i].setAttribute("src",s);
	images[i].setAttribute("width","auto");
	images[i].setAttribute("height","auto");
	}
};