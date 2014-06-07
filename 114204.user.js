// ==UserScript==
// @name           Link href popup
// @namespace      http://*
// @description    Link href popup
// @include        *
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
//
$("a").each(function(){
   href = $(this).attr("href");
   $(this).attr("title", href);
});
