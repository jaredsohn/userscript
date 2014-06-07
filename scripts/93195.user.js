// ==UserScript==
// @name           Improve Just-Eat
// @description    Improves Just-Eat in various ways.
// @author         Sebastian Paaske Tørholm
// @include        http://*just-eat.tld/*
// @include        http://*just-eat.dk/*
// @version        1.0
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js
// ==/UserScript==

// Make buttons in restaurant-listing normal links, not fancy JS stuff
// (which means you can middle-click them, woo!)
$('input[name$="ButtonOrderNow"]').each( function() {
    var target = ($(this).attr('onclick') + "").match(/location\.href='(.*?)'/)[1];
    $(this).removeAttr('onclick');
    $(this).get(0).type = 'button';
    $(this).wrap('<a href="'+target+'"></a>');
});