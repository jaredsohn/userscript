// ==UserScript==
// @name          Hello World
// @namespace     http://http://vkontakte.ru/
// @description   add text
// @include       http://vkontakte.ru/*
// @include       http://vkontakte.ru/
// ==/UserScript==


(function(){
	var userId = document.location.href.substr(22);
	window.addEventListener("load",function(){
	document.getElementById("profileActions").innerHTML += '<a style="color:red;" href="http://vkontakte.ru/photos.php?id='+userId+'">Скрытые фотки</a>'; 	
	}
	,false);


})();



