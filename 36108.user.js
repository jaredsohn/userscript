// ==UserScript==
// @name           HabraYandex
// @namespace      http://silinio.webhost.ru
// @description    Yandex Search for HabraHabr.ru
// @include        http://*habrahabr.ru/*
// @source         http://silinio.webhost.ru
// @version        0.1
// ==/UserScript==

var yaButton = document.createElement('input');
yaButton.setAttribute('type', 'button');
yaButton.setAttribute('name', 'ysearch');
yaButton.setAttribute('value', 'HabraYandex >');
yaButton.setAttribute('style', 'margin-right:12px');
yaButton.setAttribute('onClick', "document.location='http://www.yandex.ru/yandsearch?text=' + document.getElementById('search_field').value + '&site=http%3A%2F%2Fhabrahabr.ru'");

var yaContainer = document.getElementById('search_field').parentNode.parentNode;
yaContainer.appendChild(yaButton);
