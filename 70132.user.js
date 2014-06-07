// ==UserScript==
// @name           Aftonbladet - No sport news
// @namespace      http://www.example.com/jQueryPlay/
// @description    Removes all the sport news from the swedish news site aftonbladet.se
// @include        http://*.aftonbladet.se/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

//Removes the sport news items from the main page
$('.abBoxSportbladet').parents().filter('.abItemHLine').remove();

//Removes the sport items from the bar on the right hand
$("a[href*=http://www.aftonbladet.se/sportbladet/]").parents().filter('.abEqualGutter').remove();

// Removes the Sport-blogs from the bar on the left hand
$("a[href*=http://bloggar.aftonbladet.se/hockeydirekt]").parents().filter('.abItem').remove();

//Removes the "Sport" button on the red navigation bar
$("a[href*=http://www.aftonbladet.se/sportbladet/]").parents().filter('li').remove();