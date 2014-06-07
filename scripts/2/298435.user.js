// ==UserScript==
// @name           Comicslate MenuHighlighter
// @description    comicslate.org подсвечивает текущую папку в левом меню
// @version        1.0
// @include        http://comicslate.org/*
// @icon           http://comicslate.org/lib/tpl/tempe/logo/flo.png
// @grant          none
// ==/UserScript==

var menu_url = document.location.href, menu_root = 'http://comicslate.org', menu_count = 0,
menu_menu = document.getElementsByClassName('cl_menu2')[0].getElementsByTagName('a');

// замена в урле двоеточий на слеши (для DokuWiki)
menu_url = menu_url.replace(/:(\w)/g,"/$1")
// задать позицию первого слеша в урле
var menu_pos = menu_url.indexOf("/")
// подсчитать слеши в урле
while ( menu_pos != -1 ) { menu_count++; menu_pos = menu_url.indexOf("/",menu_pos+1) }
// по этому счётчику обрезать урл до нужного слеша
while ( menu_count > 4 ) { menu_url = menu_url.replace(/\/[^\/]+$/g,""); menu_count-- }

// обход ссылок в меню
for (var i = 0; i < menu_menu.length; i++) {
// обрезать ссылку до нужного слеша
 var menu_short = menu_menu[i].href.replace(/\/[^\/]+$/g,"");
// если короткое совпало с коротким урлом и урл не корневой
 if ((menu_url == menu_short) && (menu_url != menu_root)) {
// добавить совпавшему нужный класс
  menu_menu[i].className += ' cl_bold';
 }
}