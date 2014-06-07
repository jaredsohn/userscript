// ==UserScript==
// @name          Your Vkontakte.ru Not Mine
// @namespace     http://fonzi.posterous.com
// @description   Hides stupid "My" prefix in menus on Vkontakte.ru
// @include       http://vkontakte.ru/*
// ==/UserScript==

var sidebar = document.getElementById("sideBar"); // affecting the entire page will cause some script problems

// Russian
sidebar.innerHTML = sidebar.innerHTML.replace(/\">Моя /, "\">");
sidebar.innerHTML = sidebar.innerHTML.replace(/\">Мои /g, "\">");

// Ukrainian
sidebar.innerHTML = sidebar.innerHTML.replace(/\">Моя /, "\">");
sidebar.innerHTML = sidebar.innerHTML.replace(/\">Мої /g, "\">");

// Belarusian
sidebar.innerHTML = sidebar.innerHTML.replace(/\">Мая /, "\">");
sidebar.innerHTML = sidebar.innerHTML.replace(/\">Мае /g, "\">");

// English
sidebar.innerHTML = sidebar.innerHTML.replace(/\">My /g, "\">");