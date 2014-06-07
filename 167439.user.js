// ==UserScript==
// @name       Ekstra Bladet fjern Ekstra-sektion
// @namespace  http://eb-fjern-ekstra.fdsa.dk/
// @version    1.0
// @description  Fjern sektionen med "Ekstra" materiale på Ekstra Bladets hjemmeside
// @match      http://ekstrabladet.dk/*
// @copyright  2013+, N/A
// @require  http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.0/jquery.min.js
// ==/UserScript==



$(document).ready(function($) {
    var firstContainer = $('.widgetcontainer a[onclick*="Forside_EKSTRA"]').parent();
    firstContainer.hide();
    firstContainer.next().hide();
});