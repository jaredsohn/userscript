// ==UserScript==
// @name       Boliga ejendomsmægler viderestilling
// @namespace  http://fdsa.dk/
// @version    0.3
// @description  Viderestil automatisk Boligas sider direkte til ejendomsmæglerens side, så man ikke skal trykke "Vis boligen hos mægler" hver gang. Betyder ligeledes, at der ikke åbnes en ekstra tab hver gang.
// @match      http://www.boliga.dk/*
// @copyright  2012+, fdsa
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==
jQuery(document).ready(function($) {
    $("a#brokerLink").each(function(index) {
        window.location.href = $(this).attr('href');
    });
    $("a.brokerLink").each(function(index) {
        window.location.href = $(this).attr('href');
    });
});