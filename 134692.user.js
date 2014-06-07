// ==UserScript==
// @name          FacebookHugo
// @require	  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @description	  Show facebook the way Hugo likes.
// @include       http://facebook.com/*
// @include       http://www.facebook.com/*
// @include       https://facebook.com/*
// @include       https://www.facebook.com/*
// @include       https://www.facebook.com/
// ==/UserScript==

jQuery(document).ready(function(){
  jQuery("#rightCol").remove();
  jQuery("#contentArea").width("100%");
  jQuery(".fbUfi").width("100%");
  jQuery("#leftCol").css('position', 'fixed');
  jQuery("#leftCol").css('left', 'auto');
  jQuery("#leftCol").css('margin-left', 'auto');
  console.log('alterado');
});