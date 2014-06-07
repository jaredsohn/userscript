// ==UserScript==
// @name        F1r3Sph3r3 on tweakers.net
// @namespace   http://tweakers.net/F1r3Sph3r3
// @include		http://tweakers.net/*
// @include		https://tweakers.net/*
// @include		http://gathering.tweakers.net/*
// @include		https://gathering.tweakers.net/*
// @version     1
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant       none
// ==/UserScript==
$.noConflict();
jQuery(document).ready(function($) {
   $("h1:contains('Firesphere'),title:contains('Firesphere'),textarea:contains('Firesphere'),span:contains('Firesphere'),a:contains('Firesphere')").html(function() {
      return $(this).html().replace('Firesphere','F1r3Sph3r3');
   });
});