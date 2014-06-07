// ==UserScript==
// @name       Remove That Annoying TDWFB Ad From Derpibooru
// @namespace  http://revelromp.com/
// @version    0.1
// @description A hastily-slapped-together script to hide the distracting anti-NSA ad-> http://news.derpiboo.ru/post/76259965810/the-day-ponies-fight-back Probably gonna be useless after the day's end.
// @match      *://derpibooru.org/*
// @match      *://derpiboo.ru/*
// @copyright  2014+, Carlis Moore
// @require http://userscripts.org/scripts/source/100842.user.js
// ==/UserScript==

setTimeout(function(){document.getElementById("tdwfb-container").style.height="0%";}, 200);