// ==UserScript==
// @name           VKontakte title parser
// @namespace      http://userscripts.org/scripts/show/77894
// @description    Removes "VKontakte | " like from page title
// @include        http://*vkontakte.ru/*
// @include        http://*vk.com/*
// ==/UserScript==

var spl = document.title.split(" | ");
var res = "";
for (var i = 1; i < spl.length-1; i++) res += spl[i] + " | ";
res += spl[spl.length-1];
document.title = res;