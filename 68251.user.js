// ==UserScript==
// @name           Google link to yandex
// @namespace      google
// @description    Add link to yandex from google search
// @include        http://www.google.ru/search?*
// ==/UserScript==
var title=document.title.split(String.fromCharCode(8211));
var title=title[0].substr(0,title[0].length-17);
document.getElementById('bsf').innerHTML += "<strong><a href='http://yandex.ru/yandsearch?text="+title+"' class=\"r\">"+"Искать в Яндексе"+"</a></strong>";
