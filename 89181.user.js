// ==UserScript==
// @name           LocalDDI
// @include        http://iplay4e.appspot.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    $("a[href^='http://www.wizards.com/dndinsider/compendium']").each(function() {
      $(this).attr('href',$(this).attr('href').replace("http://www.wizards.com/dndinsider/compendium","http://localhost/ddi").replace("aspx","php"));
    });
});