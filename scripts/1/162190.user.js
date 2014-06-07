// ==UserScript==
// @name           yazar engelle
// @namespace      http://avare.be
// @include        http://avare.be/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

var ignore = new Array("as above so below"); //default orospu çocuğu

jQuery.each(ignore, function() {
 $("li.entryidstyle > font:contains('"+ this +"')").parent().remove();
});
