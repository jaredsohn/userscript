// ==UserScript==
// @name no_watermark_anymore
// @namespace http://2ch.so/b/
// @include http://2ch.so/b/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==
$('center').hide();
$('[name*="watermark"]').remove();
