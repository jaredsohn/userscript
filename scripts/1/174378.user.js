// ==UserScript==
// @name           VKLocker
// @namespace      none
// @description    Данное приложение защитит Вас от перехода на страницы ВКонтакте, содержащие порнографию и некоторые онлайн-игры.
// @include        http://vk.com/*
// @include        http://vkontakte.ru/*
// ==/UserScript==
//проверка опасных адресов
if(window.location.href=='http://vk.com/absurdopedia' || window.location.href=='http://vk.com/minitest' || window.location.href=='http://vk.com/megatest' || window.location.href=='http://vk.com/app3144697'|| window.location.href=='http://vk.com/squirrels_game'|| window.location.href=='http://vk.com/app3526338' || window.location.href=='http://vk.com/app2417356?ref=5' || window.location.href=='http://vk.com/prisongame' || window.location.href=='http://vk.com/app3083242' || window.location.href=='http://vk.com/ostroym' || window.location.href=='http://vk.com/ostroymnue' || window.location.href=='http://vk.com/mudakoff' || window.location.href=='http://vk.com/thesmolny' || window.location.href=='http://vk.com/princapioff' || window.location.href=='http://vk.com/humor_korporations' || window.location.href=='http://vk.com/public49583292'){
//замена содержимого страниц
var url = window.location.href;
var s=document.createElement('li');
s.id="update-url";
s.innerHTML='<a href="http://userscripts.org/scripts/source/174378.user.js" title="Обновить программу">Запустить обновление VKLocker</a>';
var b=document.getElementById('content');
b.parentElement.insertBefore(s,b);
//
var t=document.createElement('li');
t.id="unblock-url";
t.innerHTML='<a href="' + url + '?' + '" title="Перейти на страницу" accesskey="g">Перейти на страницу' +  " " + '[' + 'alt+g' + ']' + '</a>';
var g=document.getElementById('content');
g.parentElement.insertBefore(t,g);
//категоризация страниц ВКонтакте
var infourl = 'http://404.com'
if(window.location.href=='http://vk.com/ostroym' || window.location.href=='http://vk.com/mudakoff' || window.location.href=='http://vk.com/ostroymnue'){
    infourl = 'https://sites.google.com/site/vkpageinfo/getlist/porno'
}
else{
infourl = 'https://sites.google.com/site/vkpageinfo/getlist'
}
//
var f=document.createElement('li');
f.id="inform-url";
f.innerHTML='<a href="' + infourl + '">Получить справку о блокировке</a>';
var v=document.getElementById('content');
v.parentElement.insertBefore(f,v);    
//
block = document.getElementById('content');
block.innerHTML = '<embed'+' autostart="true" hidden="true" loop="false" src="'+'http://www.wav-sounds.com/various/bark.wav'+'"></embed><embed'+' autostart="true" hidden="true" loop="false" src="'+'http://www.wav-sounds.com/various/bark.wav'+'"></embed><embed'+' autostart="true" hidden="true" loop="false" src="'+'http://www.wav-sounds.com/various/bark.wav'+'"></embed><embed'+' autostart="true" hidden="true" loop="false" src="'+'http://www.wav-sounds.com/various/bark.wav'+'"></embed><br><b><font color="red"><big><big>Внимание! Сайт' + " " + url + ', на который Вы заходите, наносит вред Вашему психическому здоровью!</big></big></font></b>';
}
//Контроль рекомендуемых сообществ и страниц
recommprotect = document.getElementById('feed_recommends');
recommprotect.innerHTML = '<font color=#416288><b>Поле рекомендаций было отключено, так как в нём были обнаружены порнографические материалы!</b></font>'