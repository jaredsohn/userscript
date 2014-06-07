// ==UserScript==
// @name           Disable HDC's Exchage Title Button
// @namespace      HDChina
// @description    Disable this button to avoid bonus lost:)
// @include        http://*.hdchina.org/mybonus.php
// @include        https://*.hdchina.org/mybonus.php
// @include        http://hdchina.org/mybonus.php
// @include        https://hdchina.org/mybonus.php
// ==/UserScript==
// auther:  lucaslee http://hi.baidu.com/lucas/profile
// version: 0.1 2010-02-03
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// =============================


var form = document.getElementsByTagName('form');
if (form.length){
   form[6].addEventListener("submit",checkTitle,false);
};
function checkTitle(e){
   var tit = document.getElementsByName("cust_title");
   if(tit[0].value==""){
       alert("没有填写称号啊。小心两万分浮云了~~~");
       if (e && e.preventDefault) e.preventDefault();
   }
};