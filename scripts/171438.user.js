// ==UserScript==
// @name       ReggieNet Tests and Quizzes 2
// @namespace  dtwitch@ilstu.edu
// @version    0.2
// @description  enter something useful
// @include      https://reggienet.illinoisstate.edu/xsl-portal/tool/*/author/*
// @copyright  2013+, dtwitch
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// ==/UserScript==
$(".tier3").each(function( index ) {
  $(this).replaceWith($(this).text().substring(0,100));
});
