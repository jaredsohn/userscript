// ==UserScript==
// @name          BuO G+ Panel
// @namespace     Дьяволаччо
// @author        Дьяволаччо (http://otvety.google.ru/otvety/user?userid=12211945266426691530)
// @description   Google+-подобная верхняя чёрная панель. Для ВиО...
// @version       1.0
// @include       http://otvety.google.ru/*
// @include       http://www.otvety.google.ru/*
// ==/UserScript==

function blacktop() {
  var topvioPanel = document.getElementById('gbar').parentNode;
  if (topvioPanel) {
   topvioPanel.style.backgroundColor='black';
   topvioPanel.style.color='white';
   if(document.getElementById('gbe').children[0].innerText == "Оповещения") {
   topvioPanel.innerHTML=topvioPanel.innerHTML.replace('Оповещения', '<font color=white>Сообщения</font>');
   }
   topvioPanel.innerHTML=topvioPanel.innerHTML.replace('Профиль', '<font color=white>Профиль</font>');
   topvioPanel.innerHTML=topvioPanel.innerHTML.replace('Справка', '<font color=white>Справка</font>');
   topvioPanel.innerHTML=topvioPanel.innerHTML.replace('Мой аккаунт', '<font color=white>Мой аккаунт</font>');
   topvioPanel.innerHTML=topvioPanel.innerHTML.replace('Выйти', '<font color=red><b>Выйти</b></font>');
   topvioPanel.innerHTML=topvioPanel.innerHTML.replace('Веб', '<font color=white>Веб</font>');
   topvioPanel.innerHTML=topvioPanel.innerHTML.replace('Картинки', '<font color=white>Картинки</font>');
   topvioPanel.innerHTML=topvioPanel.innerHTML.replace('Видео', '<font color=white>Видео</font>');
   topvioPanel.innerHTML=topvioPanel.innerHTML.replace('Карты', '<font color=white>Карты</font>');
   topvioPanel.innerHTML=topvioPanel.innerHTML.replace('Новости', '<font color=white>Новости</font>');
   topvioPanel.innerHTML=topvioPanel.innerHTML.replace('Переводчик', '<font color=white>Переводчик</font>');
   topvioPanel.innerHTML=topvioPanel.innerHTML.replace('Почта', '<font color=white>Почта</font>');
   topvioPanel.innerHTML=topvioPanel.innerHTML.replace('ещё', '<font color=white>ещё</font>');
   topvioPanel.innerHTML=topvioPanel.innerHTML.replace('▼', '<font color=white>▼</font>');
   topvioPanel.innerHTML=topvioPanel.innerHTML.replace('Gmail', '<font color=white>GMail</font>');
   topvioPanel.innerHTML=topvioPanel.innerHTML.replace(' по Вопросам и ответам', '<font color=white> по ВиО</font>');
   topvioPanel.innerHTML=topvioPanel.innerHTML.replace('Войти', '<font color=green><b>Вход</b></font>');
   topvioPanel.children[2].outerHTML='';
   topvioPanel.children[2].outerHTML='';
   }
}

(function() {
  if (document.readyState == "complete") {

    blacktop();
  } else {
    window.addEventListener('load', function() { 

blacktop();
 }, true);
  }
})();