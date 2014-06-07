// ==UserScript==
// @name       gmail AdBlock
// @namespace  https://mail.google.com
// @version    0.1
// @description  hide gmail adds
// @match      https://mail.google.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @copyright  2013+, Ricardo
// ==/UserScript==

 $(document).ready(function(){
     var timer = setInterval(function(){
         var add = $('.BltHke .mq');
         add.hide();
         if(add.css('display') == 'undefined'){
         	clearInterval(timer);
         }
     }, 200);
 });