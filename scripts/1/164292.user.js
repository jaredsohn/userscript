// ==UserScript==
// @name          Скрытие вопросов от Без имени на ВиО
// @namespace     ПС Последний Герой
// @author        И Ц Н
// @description   Скрытие вопросов от пользователей Без имени на ВиО (otvety.google.ru)
// @version       1.0
// @include       http://otvety.google.ru/*
// @include       http://www.otvety.google.ru/*
// ==/UserScript==

var elements = document.getElementsByClassName("wpr2ctgaCSS");
for (i=0;i<elements.length;i++)
{
   var element = elements[i].getElementsByClassName("etxt");
   if( element[0].innerHTML == "\nБез имени\n" )
   {
       elements[i].innerHTML = "";
   }
}