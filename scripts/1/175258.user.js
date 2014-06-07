// ==UserScript==
// @name         drive2.ru
// @namespace    http://soaproject.hut.ru/
// @version      0.1
// @description  Убираем приглашение на регистрацию
// @copyright    knight (C) 2013
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include      http://www.drive2.ru/*
// ==/UserScript==


   

jQuery(document).ready(function()
{
  setTimeout(function() { $(".dialog-close").click(); }, 1000);

});


    
    
    
    
