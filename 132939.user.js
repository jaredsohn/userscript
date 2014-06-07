// ==UserScript==
// @name           ik_unires
// @namespace      ikariam.ru
// @include        http://s*.*.ikariam.com/*
// @require        http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function(){

   var wood1 = $('#js_GlobalMenu_wood').html(); wood2=wood1.replace(/\,/,'');
   var wine1 = $('#js_GlobalMenu_wine').html(); wine2=wine1.replace(/\,/,'');
   var marble1 = $('#js_GlobalMenu_marble').html(); marble2=marble1.replace(/\,/,'');
   var crystal1 = $('#js_GlobalMenu_crystal').html(); crystal2=crystal1.replace(/\,/,'');
   var sulfur1 = $('#js_GlobalMenu_sulfur').html(); sulfur2=sulfur1.replace(/\,/,'');
   
   var wood = parseInt(wood2);
   var wine = parseInt(wine2);
   var marble = parseInt(marble2);
   var crystal = parseInt(crystal2);
   var sulfur = parseInt(sulfur2);
   var unires = wood+wine+marble+crystal+sulfur;
   
   $('div.image_trader').mouseover(function(){
    $(this).next().html("<div style='font-size:13px;'>UR= "+unires+"</div>");
   });
   

});