// ==UserScript==
// @name Hide Pikabu Posts
// @description Скрывает посты на Pikabu, если их рейтинг меньше заданного значения. Обязательное условие: постраничный вывод статей, работает в опере и хроме.
// @author Multik
// @version 1.2
// @include http://pikabu.ru/*
// @exclude http://pikabu.ru/story/*
// ==/UserScript==

(function(){
	var MIN_RATING = 400;
	var posts = document.getElementsByTagName('table');
	var k = 0;
	for (var i=posts.length-1; i>=0 ; i--){
		if (posts[i].id.indexOf('inner_wrap_') != -1) {
			var rating = posts[i].getElementsByClassName('curs');
			if (Number(rating[0].innerHTML) < MIN_RATING) {
				posts[i].parentNode.removeChild(posts[i]);
			}
		}
	}
})();