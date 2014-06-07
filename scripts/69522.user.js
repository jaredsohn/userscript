// ==UserScript==
// @name           fastmail
// @namespace      http://vk.com
// @description    Fastmail in menu
// @include        http://vk.com*
// @include        http://www.vk.com*
// ==/UserScript==

var myfriends = document.getElementById('myfriends');
var abr = document.createElement('li');
abr.innerHTML = "<a href='/mail.php'>Мои Сообщения</a> <a onclick='im_popup(); return false;' target='_blank' href='/im.php?act=a_box&amp;popup=1'>Быстрые Сообщения</a>"
myfriends.parentNode.insertBefore(abr, myfriends.nextSibling);





