// ==UserScript==
// @name        保存学校照片
// @namespace   xuexiao
// @description tool for being able to right click save picture 
// @include     http://www.neworiental-k12.org/class_site/pic_show.asp*
// @version     1
// @grant       none
// @require        http://userscripts.org/scripts/source/159638.user.js
// ==/UserScript==
$("iframe").load(function(){
   $(this).contents().find("map")[0].remove();
});
