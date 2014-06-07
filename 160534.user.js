// ==UserScript==
// @name        Better Infowars
// @namespace   infowars.com
// @description Fixes up infowars.com
// @include     http://*.infowars.com/*
// @author      John Woods
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js
// @require     http://datatables.net/download/build/jquery.dataTables.min.js
// @version     0.0.1
// ==/UserScript==

$(document).ready(function() {
  $('.sliderNew').remove();
  $('.nFeaturedStoriesImage').remove();
  $('#nBodyRight').remove();
  $('#youtube_player').remove();
  $('#nBodyLeft').css('width', '955px');
  $('#nFeaturedStories').css('width', '955px');

  $('.single').css('font-size', '120%');
  $('.subheadlinemain a').css('font-weight', 'bold');
});
