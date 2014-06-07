// ==UserScript==
// @name		gameminer ajax
// @version		1.0
// @namespace	http://gameminer.ru/ajax
// @description	AJAX for gameminer.ru
// @include		http://gameminer.ru/*
// @include		http://www.gameminer.ru/*
// ==/UserScript==
function add(c){var a=document.createElement("script");a.setAttribute("src","https://cdnjs.cloudflare.com/ajax/libs/zepto/1.0rc1/zepto.min.js");a.addEventListener("load",function(){var b=document.createElement("script");b.textContent="("+c.toString()+")();";document.body.appendChild(b)},!1);document.body.appendChild(a)}
function main(){$(".giveaway__action form").submit(function(){var c=$(this),a=c.attr("action"),b;$.post(a,c.serialize(),function(a){b="\u0423\u0436\u0435 \u0443\u0447\u0430\u0441\u0442\u0432\u0443\u0435\u0442\u0435";-1<a.indexOf("\u043d\u0435\u0442 \u0438\u0433\u0440\u044b \u0434\u043b\u044f \u044d\u0442\u043e\u0433\u043e DLC")&&(b="\u043d\u0435\u0442 \u0438\u0433\u0440\u044b \u0434\u043b\u044f \u044d\u0442\u043e\u0433\u043e DLC");c.replaceWith(b)});return!1})}add(main);