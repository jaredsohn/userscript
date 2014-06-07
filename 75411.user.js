// ==UserScript==
// @name   music.dirty.ru CSS
// @namespace   http://music.dirty.ru/*
// @include   http://*music.dirty.ru/*
// @description   Для music.dirty.ru. Возвращает старый music.css и вид страничек на место.
// ==/UserScript==

var headNode = document.getElementsByTagName("head")[0];

// Возвращает music.dirty.ru/css/music.css
var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://web.archive.org/web/20070711182630/music.dirty.ru/css/music.css';
headNode.appendChild(cssNode);

// Возвращает music.dirty.ru/js/utils.js
var jsNode = document.createElement('script');
jsNode.type = 'text/javascript';
jsNode.language = 'JavaScript';
jsNode.src = 'http://web.archive.org/web/20070711182648/music.dirty.ru/js/utils.js';
headNode.appendChild(jsNode);

// Возвращает dirty.ru/help/pop.htm - это help на странице добавления поста в Дискотеку
window.setTimeout(function() {
  window.techHelp = function() {
    width=417;height=350;
    if (parseInt (navigator.appVersion) >= 4 ) {
      X=(screen.width  - width )/2;
      Y=(screen.height - height)/2;
    }
    var extra='width='+width+',height='+height+',top='+Y+',left='+X+',resizable=0,scrollbars=1,location=no,directories=no,status=no,menubar=no,toolbar=no';
    window.open('http://web.archive.org/web/20070418025527/http://dirty.ru/help/pop.htm','dhelp',extra);
  }
}, 4000);


