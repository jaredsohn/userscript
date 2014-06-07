// ==UserScript==
// @author        Activa
// @version       1.1.1
// @name          Vkontakte popular
// @description   Добавляет ссылку на "Популярное" на vkontakte.ru и vk.com
// @namespace     http://userscripts.org/scripts/show/100132
// @Download      http://userscripts.org/scripts/source/100132.user.js
// @require        http://userscripts.org/scripts/source/75442.user.js
// @resource  meta http://userscripts.org/scripts/source/100132.meta.js
// @include	  http://vkontakte.ru/feed*
// @include	  http://vk.com/feed*
// ==/UserScript==

var head=document.getElementsByTagName('head')[0]; 
var elem=document.createElement('script'); 
var oScript=head.appendChild(elem); 
oScript.setAttribute("src","http://code.jquery.com/jquery-1.6.min.js"); 
oScript.setAttribute("type","text/javascript");

document.addEventListener("DOMContentLoaded", function()
{

var link1 = '<a class="tab_word" id="my_link" href="/feed?section=popular">Популярное</a>';
var link2 = '<li id="my_popular" class="">' + link1 + '</li>';

$(".t0").append(link2);
$("#my_link").css({"padding-left":"10px","padding-right":"15px","padding-top":"5px","padding-bottom":"5px","margin":"0px"});

} , false )