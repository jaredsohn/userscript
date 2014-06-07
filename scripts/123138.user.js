// ==UserScript==
// @name           Block Gifs
// @namespace      Magistream
// @include        http://magistream.com/8-community-discussion.html/*
// ==/UserScript== 
   $('img[src$=".gif"]').each(function(){ if ($(this).width() > 120) {$(this).hide();} });