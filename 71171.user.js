// ==UserScript==
// @name           Always use SSL on Facebook
// @namespace      Markussss
// @description    Always use SSL on Facebook
// @include        *.facebook.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

$(document).ready(function(){
 $(a).each(function(this) {
  if( $(this).attr('href').text().search('/facebook.com/') ) {
   $(this).attr('href') = $(this).attr('href').replace('http://', 'https://');
  }
 });
});