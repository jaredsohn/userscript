// ==UserScript==
// @name           Buy potions for bitefight.ru
// @namespace	   Buy potions for bitefight.ru
// @description    Buy potions for bitefight.ru
// @version	   1.0
// @include        http://*.bitefight.ru/city/shop*
// ==/UserScript==


(function() {
var strHTML = document.getElementsByTagName("html")[0].innerHTML;
var src = strHTML.match(/token=\S+\s/);
var proverka = strHTML.match(/Добро пожаловать в мою скромную лавку/);
if (proverka == "Добро пожаловать в мою скромную лавку"){
var Buttons = document.getElementsByTagName('div')[22];
if (!Buttons) return;
var div = document.createElement('div');
div.innerHTML = '<a href="/city/shop/potions/buy/20/1/&amp;page=1?__'+src+'"><img src="http://bitefight.ru/img/items/2/20.jpg" width="20px" height="20px" alt="" /></a>&nbsp;<a href="/city/shop/potions/buy/7/1/&amp;page=1?__'+src+'"><img src="http://bitefight.ru/img/items/2/7.jpg" width="20px" height="20px" alt="" /></a>&nbsp;<a href="/city/shop/potions/buy/17/1/&amp;page=1?__'+src+'"><img src="http://bitefight.ru/img/items/2/17.jpg" width="20px" height="20px" alt="" /></a>&nbsp;<a href="/city/shop/potions/buy/1/1/&amp;page=1?__'+src+'"><img src="http://bitefight.ru/img/items/2/1.jpg" width="20px" height="20px" alt="" /></a>';
Buttons.appendChild(div);
}
})()