// ==UserScript==
// @name       goshare.info
// @namespace  goshare.info
// @version    1.0
// @description  redirect goshare.info
// @include http://www.goshare.info/photo/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// ==/UserScript==



$(document).ready(function (){
    var imageUrl = $('.photoframe img').attr('src');
    window.open(imageUrl, "_self");
});
