// ==UserScript==
// @name Joyreactor background changer
// @namespace Joyreactor
// @include http://*.joyreactor.cc/*
// @include http://joyreactor.cc/*
// @version 0.1
// @Author Oberon812
// @grant none
// ==/UserScript==

document.getElementById("background").style.backgroundImage='none';
//убираем фоновую обрамляющую картинку, если она есть. Или ставим тут свою, через ='url("http://...")';
document.getElementById("header").style.height='80px';
//задаем нужный отступ сверху (высоту шапки), в пикселях. Хотя можете и в процентах, дело ваше.
document.getElementById("container").style.backgroundColor='#000000';
//ставим нужный цвет заливки фона, подобрать можно при помощи Яндекса: http://yandex.ru/yandsearch?text=%23000000&lr=2
document.getElementById("container").style.backgroundImage='url("http://site.com/my_cool_image.png")';
//собственно, нафига мы сюда пришли, задаем картинку. Чтобы не париться с настройками безопасности для чтения данных с диска, берем по URL.
document.getElementById("container").style.backgroundAttachment='fixed';
//если жадность заставила поставить сразу обои, занимающие все пространство страницы, то рекомендую включить фиксированное положение фона. Если же нет, то просто не пишите эту строчку.
document.getElementById("header").childNodes[1].childNodes[0].style.backgroundImage='url("../images/joyreactor.png")';
//опционально - возвращаем нормальное лого JoyReactor'а