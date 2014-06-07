// ==UserScript==
// @name           ADCB virtual keyboard fix
// @namespace      ADBC
// @description    removes restrictions on vertual kbd
// @include        https://adcbactive.com/RRUser/*
// @copyright      AhmadDukhan
// @version        1.0
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

$(function() {

    $('#cidnumber').attr('onkeypress', '');
    $('#cidnumber').attr('onkeyup', '');
    $('#cidnumber').attr('autocomplete', 'on');
    $('#cidnumber').attr('onkeyup', 'on');
    
    $('input[type=password]').attr('onkeypress', '');
    $('input[type=password]').attr('onfocus', '').delay(1000);
    
    $('#cidnumber').focus(function(){
    setTimeout(function(){
    window.chkFocus();
    }, 100);
    $('#cidnumber').unbind('focus');
    $(this).focus();
    
    });
});
