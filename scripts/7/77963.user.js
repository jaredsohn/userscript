// ==UserScript==
// @name          #nespim
// @namespace     http://userscripts.ru/js/textarea-backup/
// @description   Добавляет тег #nespim в ночь с 00:00 до 06:00, для чего тег этот и предназначен
// @include       http://twitter.com/
// @include 	  https://twitter.com/
// @author        Vadik Klimenko
// @version       0.1
// ==/UserScript==

var d = 0; /* Поправки к местному времени. Но оно никому не нужно, так как «Тег употребляется с 0 до 6 часов ночи по местному времени» */

function $(id){return document.getElementById(id);}
var t = new Date().getHours();

if(t<6+d){
var t = $("status").value; $("status").innerHTML = t+" #nespim"; $("status").setSelectionRange(0,0) // Костыль, чтобы курсор помещался на начало строки
var s = $("status-field-char-counter").innerHTML;$("status-field-char-counter").innerHTML = s-8;
};