// ==UserScript==
// @name           e36
// @namespace      e36
// @include        http://*e36club.ru/* 
// @require        http://code.jquery.com/jquery-latest.js
// ==/UserScript==



$(document).ready(function(){
  document.body.style.background="url(http://www.valar.ru/gallery/0311/36_bg.gif)";
  
  //--Smena_LOGO--//
  var img = document.evaluate("//img[contains(@src, 'logo_phpBB.gif')]",document,null,9,null).singleNodeValue;
  if (img){img.src = "http://cs9531.vkontakte.ru/u5952967/11665673/x_f1e30bd0.jpg"};
  img.style.margin='0 0 0 10px';
  
  var abc = document.getElementById("header_right_cell");
  if(abc != null){abc.parentNode.removeChild(abc);}

  $('table:first').remove();
  $('iframe[width=728]').remove();
  

});