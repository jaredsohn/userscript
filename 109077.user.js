// ==UserScript==
// @name vk
// @version 1.2
// @description Наслаждайтесь полноценными изображениями &laquo;В Контакте&raquo; без лишних кликов
// @author Мусаткин Роман
// @include http://vk.com/*
// @include http://vkontakte.ru/*
// @include http://*.vk.com/*
// @include http://*.vkontakte.ru/*
// ==/UserScript==
function c() {var a = document.getElementsByTagName("a"); for(var i = 0; i < a.length; ++i) { var x = a[i]; if(x.className == "photo") { var reg = /x_src: "([^"]+)/i; var y = reg.exec(x.getAttribute("onclick")); x.children[0].src = y[1]} }; var sheet = document.createElement('style');sheet.innerHTML = ".wall_module .photo img {max-height:500px; max-width:310px;}";document.body.appendChild(sheet);return false; } setInterval(function() {document.onmousemove = c()}, 500)

