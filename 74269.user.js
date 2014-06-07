// ==UserScript==

// @name           Iha.ee for free
// @description    free VIP account! :)
// @include        http://*.iha.ee/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js

// ==/UserScript==



$('td[background] a img[align="middle"]').css('opacity','0');
$('input[type="radio"]').prop('disabled', false);
$('input[type="radio"]').attr('onclick', 'submit();');
