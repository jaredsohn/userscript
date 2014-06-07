// ==UserScript==
// @name          no_yandex_bar_ads
// @namespace     http://lermont.ru/
// @description   Hide Yandex.Bar ads on Yandex root page  
// @include       http://www.yandex.ru/
// @include       http://www.yandex.ru/?ncrnd=*
// ==/UserScript==
//
// Notes
// version 0.1

var divs = document.getElementsByClassName('b-bar');
if(divs)
 divs[0].style.display = "none";
