// ==UserScript==
// @name        badoo parser images
// @namespace   badoo
// @include     http://*.badoo.com/encounters/*
// @include     http://badoo.com/encounters/*
// @include     http://badoo.com/*
// @include     http://badoo.com/*/*
// @version     0.1
// @grant       none
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==
function imgparse(){
    $('#pv_likes a:last-child').empty();
    setTimeout(function () {
 var imgsrc = $('.pv_img_wrap .pv-big').attr('src');
     
 $( "#pv_likes" ).append( "<a href="+imgsrc+" style='color:red;'>Сохранить фотографию</a>" );
    
          }, 1000); 
}

$(document).ready(function()
{
    alert('Загрузились');
    $('.pf_phts_b').click(function(){
          setTimeout(function () {
              
              $('.pv-next').click(function(){imgparse(); });
               $('.pv-prev').click(function(){imgparse(); });
          }, 2000);                     
        
                               });
    
    
});