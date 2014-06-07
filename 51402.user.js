// ==UserScript==
// @name           HabraGoogle
// @namespace      iShift
// @description    Google Search for HabraHabr.ru
// @include        http://*habrahabr.ru/*
// @source         iShift
// @version        0.1
// ==/UserScript==

var yaButton = document.createElement('input');
yaButton.setAttribute('type', 'button');
yaButton.setAttribute('name', 'gsearch');
yaButton.setAttribute('value', 'Поиск в гугле >');
yaButton.setAttribute('style', 'margin-right:12px');
yaButton.setAttribute('onClick', "document.location='http://www.google.ru/search?q=' + document.getElementById('search_field').value + ' site:habrahabr.ru'");

var yaContainer = document.getElementById('search_field').parentNode.parentNode;
yaContainer.appendChild(yaButton);
