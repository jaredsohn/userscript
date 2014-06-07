// ----------Куча комментариев----------------------------------------------
//
// ==UserScript==
// @name          Hello World
// @namespace     http://absolvo.ru/
// @description   Этот скрипт покажет вам алерс с "hello word" на каждой странице, кроме исключений!
// @include       http://vkontakte.ru/*
// ==/UserScript==

/*
var ab = document.getElementsByClassName('nNav');
for(i=0;i<ab.length;i++){
		ab[i].innerHTML = '<li style="margin-left:0px"><b class="nc"><b class="nc1"><b></b></b><b class="nc2"><b></b></b></b><span class="ncc"><a title="Ctrl+Enter" href="javascript: send_message()">Ответmmить</a></span><b class="nc"><b class="nc2"><b></b></b><b class="nc1"><b></b></b></b></li><li><b class="nc"><b class="nc1"><b></b></b><b class="nc2"><b></b></b></b><span class="ncc"><a href="javascript:history.go(-1)">Закрmmыть</a></span><b class="nc"><b class="nc2"><b></b></b><b class="nc1"><b></b></b></b></li>';
	};*/

function str_replace(search, replace, subject) {
	return subject.replace(new RegExp (search, 'g'), replace);
}
// str_replace("что заменяем", "чем заменяем", "исходная строка")

var menu = document.getElementById("nav");
outerHTML = new XMLSerializer (). serializeToString (menu);
//alert(outerHTML);
outerHTML = str_replace("Моя Страница", "Мой паспорт", outerHTML);
outerHTML = str_replace("Мои Друзья", "Мои Собутыльники", outerHTML);
outerHTML = str_replace("Мои Фотографии", "Мои аватарки", outerHTML);
outerHTML = str_replace("Мои Видеозаписи", "Мои видосы", outerHTML);
outerHTML = str_replace("Мои Аудиозаписи", "Мой плейлист", outerHTML);
outerHTML = str_replace("Мои Сообщения", "Мои SMS", outerHTML);
outerHTML = str_replace("Мои Заметки", "Мой органайзер", outerHTML);
outerHTML = str_replace("Мои Группы", "Групировки", outerHTML);
outerHTML = str_replace("Мои Встречи", "Моя тусовки", outerHTML);
outerHTML = str_replace("Мои Новости", "Газета", outerHTML);
outerHTML = str_replace("Мои Закладки", "Важное", outerHTML);
outerHTML = str_replace("Мои Желания", "Мой Джамшута", outerHTML);
outerHTML = str_replace("Предложения", "Предложения руки и сердца", outerHTML);
outerHTML = str_replace("Мнения", "Кто я???", outerHTML);
outerHTML = str_replace("Приложения", "Джавики", outerHTML);
outerHTML = str_replace("Объявления", "Объявы", outerHTML);

menu.innerHTML = outerHTML;

var work = document.createElement("div");
work.innerHTML = '<div style="position: absolute; margin: 0pt auto; width: 20px; height: 20px; text-align:center; border-style:solid; border-width:5px;"><h1 style="margin: 0px;">OK</h1></div>';
document.body.insertBefore(work, document.body.firstChild);