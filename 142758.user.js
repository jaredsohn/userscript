// ==UserScript==
// @name        HwmPart
// @namespace   z
// @include     http://www.heroeswm.ru/home.php
// @description http://hwmguide.ru/
// @version     0.2
// @author      -Партизанэн-
// ==/UserScript==

var tblock = document.querySelector('table[width="100%"]');

 divOuter1 = document.createElement( 'div' );
 divOuter1.innerHTML = '<center><a href="http://hwmguide.ru/services/" target="_blank" style="text-decoration: none;">Сервисы</a> | '
  +'   <a href="http://hwmguide.ru/" target="_blank" style="text-decoration: none;">Статистика персонажа</a> | '
  +'   <a href="http://hwmguide.ru/services/anti_thief/" target="_blank" style="text-decoration: none;">Антивор</a> | '
  +'   <a href="http://hwmguide.ru/hwm/" target="_blank" style="text-decoration: none;">База знаний</a> | '
  +'   <a href="http://hwmguide.ru/articles/" target="_blank" style="text-decoration: none;">Статьи</a> </center>';
 tblock.appendChild(divOuter1);