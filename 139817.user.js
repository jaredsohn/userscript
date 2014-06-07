// ==UserScript==
// @name        Weather.com Fix
// @description Removes all the annoyances on weather.com so you can just actually see the weather and forecasts.
// @namespace   net.bwilson.dev
// @include     http://www.weather.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version     1
// ==/UserScript==

$('.wx-social').remove();
$('#wx-rail').remove();
$('[id^=pagelet_mod_]').remove();
$('.wx-grid2of6').remove();
$('div.wx-next').remove();
$('#wx-twc-logo-container').remove();
$('.wx-prev').remove();
//$('ul.wx-pagination').show();