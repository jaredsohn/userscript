// ==UserScript==
// @name           klavogonki - hide typetext
// @namespace      klavogonki
// @include        http://klavogonki.ru/play/*
// ==/UserScript==
function changeTextColor() {
	var text_color=window.getComputedStyle(document.getElementById('typetext'), null).getPropertyValue('color');
	var typefocus_color=window.getComputedStyle(document.getElementById('typefocus'), null).getPropertyValue('color');
	document.getElementById('typetext').style.color=(text_color == "rgb(0, 0, 0)") ? "#EBEBEB" : "#000000";
	document.getElementById('typefocus').style.color=(typefocus_color == "rgb(51, 51, 170)") ? "#EBEBEB" : "#3333AA";
}
var s=document.createElement('script');
s.innerHTML=changeTextColor;
document.body.appendChild(s);
var btn=document.createElement('div');
btn.innerHTML="<input type=\"button\" onClick=\"changeTextColor()\" value=\"показать/скрыть текст\">";
document.getElementById('invite').parentNode.insertBefore(btn, document.getElementById('invite'));