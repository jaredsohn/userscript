// ==UserScript==
// @name        font facebook
// @namespace   Font facebook
// @description Droid Font Added
// @include     https://www.facebook.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @resource    customCSS http://fonts.googleapis.com/earlyaccess/droidarabicnaskh.css
// @version     1
// @grant       GM_addStyle
// @grant       GM_getResourceText
// ==/UserScript==

var newCSS = GM_getResourceText("customCSS");
GM_addStyle(newCSS);

$(document).ready(function(){
  $('._5pbx').css('font-family','"Droid Arabic Naskh",tahoma,arial');
  $(".UFICommentBody").css('font-family','tahoma,arial,serif');
  $('._5pbx').css('font-size','inherit');
  $('._wk').css('font-family','"Droid Arabic Naskh",tahoma,arial');
    

window.setInterval(function(){
  $('._5pbx').css('font-family','"Droid Arabic Naskh",tahoma,arial');
  $(".UFICommentBody").css('font-family','tahoma,arial,serif');
  $('._5pbx').css('font-size','inherit');
  $('._wk').css('font-family','"Droid Arabic Naskh",tahoma,arial'); 
}, 3000);

});