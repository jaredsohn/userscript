// ==UserScript==
// @name           pixel2life Remove Ads between Articles
// @namespace      test23
// @description    pixel2life Remove Ads
// @include        http://www.pixel2life.com/*
// @include        http://*.pixel2life.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version        0.0.3
// ==/UserScript==


//remove ads
$('div[id^="tutad"]').hide();

//make article titles black
$('div.midtut_title a').css('color','black');

//make links bigger
$('a').css('font-size','16px');

// make full width page
$('#container').css('width','100%');