// ==UserScript==
// @name           Delete colours
// @namespace      http://melnitsa.net/forum/*
// @description    Удалить нафиг!
// @include	http://melnitsa.net/forum/*
// @include	http://www.melnitsa.net/forum/*
// ==/UserScript==
//Получаем все div c id postbody
var posts = document.getElementsByClassName('postbody');

//перебираем, ищем все подписи
for(var i=0;i<posts.length;i++){
	if(posts[i].innerHTML.indexOf("_________________")>=0){
//alert('s\');		
//ищем и вытираем любое форматирование
var spans =posts[i].getElementsByTagName("span");
	for (var j=0;j<spans.length;j++)
		spans[j].removeAttribute("style");
		//spans[j].removeAttribute("style");
		//alert(spans[j].innerHTML);
	}
	

}
