// ==UserScript==
// @name           Mafiosi Paarden Ster
// @namespace      Mafiosi Paarden Ster
// @include        http://mafiosi.nl/paarden.php
// @include        http://www.mafiosi.nl/paarden.php
// ==/UserScript==

var aantal = document.getElementsByTagName('img').length;

for(i=0;i<aantal;i++){
if(document.getElementsByTagName('img')[i].src.indexOf('images/ster.jpg') > 0){
document.getElementsByTagName('img')[i].src = 'http://mafiosi.jordykroeze.com/star.png';
document.getElementsByTagName('img')[i].width = '16';
document.getElementsByTagName('img')[i].height = '16';
}
}