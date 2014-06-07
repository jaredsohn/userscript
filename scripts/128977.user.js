// ==UserScript==
// @name       Tokyo City Fix
// @namespace  http://from-nothing.ru/
// @version    0.1
// @require  https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @description  Tokyo City Fix
// @match      http://tokyo-city.ru/menu.html*
// @copyright  mail@from-nothing.ru
// ==/UserScript==

$(document).ready(function(){
    $("#menu-page").prependTo(".content");
    $(".scroll-wrap").remove();
});
