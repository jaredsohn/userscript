// ==UserScript==
// @name           Aftonbladet - No sport news
// @namespace      http://www.example.com/jQueryPlay/
// @description    Removes all the sport news from the swedish news site aftonbladet.se
// @include        http://*.aftonbladet.se/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

//Removes the PLUS (Premium) Contents

//Removes content on the main page
$('.abStreamerPremium').parents().filter('.abItemHLine').remove();
$('.abPfxPremiumService').parents().filter('.abItemHLine').remove();

//Removes content from the bar on the right hand
$('.abTeaser').parents().filter('.abEqualGutter').remove();
$('.abTeaser').remove();
$('.abPfxPremiumService').parents().filter('.abEqualGutter').remove();