// ==UserScript==
// @name      Adrenaline Auto Refresher
// @namespace  http://vk.com/app1757876_180199683
// @version    1.0
// @description  auto refresh script for Adrenaline
// @match      http://vk.com/*
// @copyright  2012, Garmash Nikolay
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// ==/UserScript==

GM_registerMenuCommand("Включить автообновление", function(){GM_setValue("ar_enabled", true);});
GM_registerMenuCommand("Отключить автообновление", function(){GM_setValue("ar_enabled", false);});

if(GM_getValue('ar_enabled') == true){

var timeout = Math.floor(Math.random() * 10) + 15;
console.debug(timeout);

$('head').append("<meta http-equiv='refresh' content='"+timeout+"'>");

}