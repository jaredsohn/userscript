// ==UserScript==
// @name           Lepro lol Replacer
// @author         Demir0
// @description    Автозамена
// @include        http://vkontakte.ru/*
// @include        http://*.vkontakte.ru/*
// @include        http://*.vk.com/*
// @include        http://vk.com/*
// ==/UserScript==

(function() {

	var id;
	
	function username_replacer(e) {
		for(i=0;i<e.length;i++) {
			//e[i].innerHTML = e[i].innerHTML.replace(/лол/gi, "Пару дней назад я познакомился с мальчиком и с тех пор постоянно думаю о нем. У него невероятно красивые голубые глаза, темные волосы, и огромный, толстый член, который еле помещается в мою за… Черт, по-моему не туда пишу…");
			//e[i].innerHTML = e[i].innerHTML.replace(/lol/gi, "Пару дней назад я познакомился с мальчиком и с тех пор постоянно думаю о нем. У него невероятно красивые голубые глаза, темные волосы, и огромный, толстый член, который еле помещается в мою за… Черт, по-моему не туда пишу…");
			//e[i].innerHTML = e[i].innerHTML.replace(/!!!!!!!/gi, "Я идиот!! Убейте меня кто нибудь!");
			e[i].innerHTML = e[i].innerHTML.replace(/витя/gi, "Шлёцик");
		}
	}
	function replace(){
		username_replacer(document.getElementsByClassName('wrapped'));
	}
	id = setInterval(replace, 1000);
	//replace();
})();