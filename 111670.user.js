// ==UserScript==
// @name          BuO Orange Notifier
// @namespace     Социолог
// @author        Социолог (http://otvety.google.ru/otvety/user?userid=15818589940208089811)
// @description   Старый добрый оранжевый оповеститель, вместо невзрачного нынешнего. Для ВиО...
// @version       1.0.1
// @include       http://otvety.google.ru/*
// @include       http://www.otvety.google.ru/*
// ==/UserScript==

function buoon() {
  var topestPanel = document.getElementById('gbe');
  var topPanel = document.getElementById('gbe');
  if (topPanel) {
   if(topPanel.children[0].innerText != "Справка по Вопросам и ответам") {
   if(topPanel.children[0].innerText != "Оповещения") {
    topPanel.children[0].removeAttribute('class');
    topPanel.children[0].style.color=" #FF8000";
    topPanel.children[0].style.fontWeight="bold";
    topPanel.children[0].style.textDecoration="underline";
   }
   }
  }
    topPanel.children[1].innerText="Профиль";
    topPanel.children[2].innerText="Справка";
}

(function() {
  if (document.readyState == "complete") {
    buoon()
  } else {
    window.addEventListener('load', function() { buoon() }, true);
  }
})();