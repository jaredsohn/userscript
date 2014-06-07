// ==UserScript==
// @name        Notabenoid toggle translation variants
// @namespace   mishavolkin@gmail.com/NotabenoidTTV
// @description Double click to hide/show translation variant. Двойной клик по версии перевода скроет её или вернет обратно.
// @include     http://notabenoid.com/book/*
// @version     0.1.0
// @grant       none
// ==/UserScript==


// Each traslation variant is a DIV located at "t" column of the table.
// Each DIV contains a few P, one of them is a member of "text" class 
// and contain all translation variant text.
$(document).ready(function(){
  $("td.t > div").dblclick(function(){
    $(this).children(".text").fadeToggle();
  });
});