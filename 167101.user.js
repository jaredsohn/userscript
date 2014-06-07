// ==UserScript==
// @name        simplecd.me复制用可选择工具
// @namespace   http://slayercat.com
// @include     http://www.simplecd.me/download/?mode=copy&rid=*
// @include     http://www.simplecd.me/download/?rid=*&mode=copy
// @include     http://simplecd.me/download/?mode=copy&rid=*
// @include     http://simplecd.me/download/?rid=*&mode=copy
// @version     1
// ==/UserScript==

var s = $('#showall').find('td');
for(var i = 0; i < s.length; ++i)
   s[i].innerHTML=s[i].innerHTML.trim();