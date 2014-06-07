// ==UserScript==
// @name          Remove Tuba FM not-important HTML
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @include       http://fm.tuba.pl/stacja-radiowa/*
// ==/UserScript==

// Append some text to the element with id someText using the jQuery library.
$('#header').next().remove();
$('#radio').children('h3').remove();
$('#radio').children('form').remove();
$('#big-search,#column-central,#column-right,#comments').remove();