// ==UserScript==
// @name        HabrCache
// @namespace   dotneter
// @include     http://habrahabr.ru/*
// @updateURL   http://userscripts.org/scripts/source/136481.meta.js
// @downloadURL http://userscripts.org/scripts/source/136481.user.js
// @version     1.2
// ==/UserScript==

var h1 = document.querySelector("h1");
if(h1.innerHTML == "Доступ к публикации закрыт"){
	var link = "http://webcache.googleusercontent.com/search?q=cache:" + window.location;
	if(history.length <= 1){
		window.location = link;
	}else{
		h1.innerHTML += "<a href='" + link + "'>[Cache]</a>";
	}
}


