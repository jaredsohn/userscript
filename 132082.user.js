// ==UserScript==
// @name          BuO in the GBar
// @namespace     Custom Google Bar
// @author        Уже.(http://otvety.google.ru/otvety/user?userid=15577961603827063246)
// @description   Изменяет ссылку на Google Play в верхнем баре на ссылку на Вопросы и Ответы.
// @version       1.0.0
// @license       GNU GPL
// @include       http://google.ru/*
// @include       http://www.google.ru/*
// ==/UserScript==

function renamebtn()
{
var stackbtn = document.getElementById('gb_78').innerHTML;
document.getElementById('gb_78').innerHTML = stackbtn.replace('Play', 'Вопросы и ответы');
document.getElementById('gb_78').href = 'http://otvety.google.ru/otvety/';
}

(function() {
  if (document.readyState == "complete") {
    renamebtn();
  } else {
    window.addEventListener('load', function() { renamebtn(); }, true);
  }
})();