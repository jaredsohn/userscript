// ==UserScript==
// @name          Show hidden user photos in Vkontakte
// @namespace
// @description   Показывает фото пользователей, запретивших это в настройках
// @include       http://vkontakte.ru/search.php?id=*
// ==/UserScript==

(function(){
//	http://kosiakk.livejournal.com/profile
//  http://vkontakte.ru/id88750

	var a = document.createElement("a");
	a.setAttribute("href", document.URL.replace("search", "photos"));
	a.appendChild(document.createTextNode("show photos"));
	document.getElementById("searchResults").appendChild(a);
})()