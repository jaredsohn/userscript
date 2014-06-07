// ==UserScript==
// @name           ytsidevideotoggle
// @namespace      satis_verborum@hotmail.com
// @include        http*://www.youtube.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// @grant          none
// @version        1.8
// ==/UserScript==
// adds a button to YouTube video pages that let's the user toggle the sidebar videos. Revised for new YouTube layout.
$(document).ready(function() {
  $('<input type="button" value="Toggle Videos" class="yt-uix-button start link-gplus-lightbox yt-uix-sessionlink yt-uix-button-hh-default" style="color:green;" id="toggleButton">').insertBefore('#watch-like');
  $('#toggleButton').click(function() {
    $('.watch-sidebar-section').toggle();
     });
   $('.branded-page-v2-secondary-col').remove();
});