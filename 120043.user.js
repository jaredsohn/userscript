// ==UserScript==
// @name          New-new-twitter ES
// @include       https://twitter.com/*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

$("#global-actions").remove();
$(".pull-right").remove();
$(".dashboard").remove();
$(".wrapper").css({ background: '' });
$(".content-main").css({ width: '100%' });