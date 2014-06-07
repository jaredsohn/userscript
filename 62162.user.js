// ==UserScript==
// @name           vkontakte_friends_fix
// @author         DenisN
// @description    'My friends' links to Friends Online
// @namespace      http://userscripts.org/scripts/show/62162
// @include        http://vk.com/*
// @include        http://vkontakte.ru/*
// ==/UserScript==

var mf = document.getElementById('myfriends');
var as = mf.getElementsByTagName('a');
as[0].setAttribute('href', '/friends.php?filter=online');
