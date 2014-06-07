// ==UserScript==
// @name          BuO Green Theme
// @namespace     Дьяволаччо
// @author        Дьяволаччо (http://otvety.google.ru/otvety/user?userid=15818589940208089811)
// @description   Изменение основного, синего, цвета на зелёный. Для ВиО...
// @version       1.0
// @include       http://otvety.google.ru/*
// @include       http://www.otvety.google.ru/*
// ==/UserScript==


function gTheme() {
document.getElementById('wvlp').children[0].children[0].style.backgroundColor='#ddf7da';
}

(function() {
  if (document.readyState == "complete") {
    gTheme();
  } else {
    window.addEventListener('load', function() { gTheme(); }, true);
  }
})();