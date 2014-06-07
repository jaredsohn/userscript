// ==UserScript==
// @name           Facebook Cleanser
// @author         Leonard Challis
// @namespace      http://blog.leonardchallis.com/quick-tips/cleanse-facebo…-greasy-monkey/ ‎
// @description    Cleanse the filth from Facebook
// @icon           https://fbstatic-a.akamaihd.net/rsrc.php/yP/r/Ivn-CVe5TGK.ico
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @include        https://*.facebook.com/
// @include        https://*.facebook.com/*
// @include        https://facebook.com/*
// @include        http://*.facebook.com/
// @include        http://*.facebook.com/*
// @include        http://facebook.com/*
// @version        0.1
// ==/UserScript==
$('#mainContainer').css('border-right', 'none');
$('.hasLeftCol .homeWiderContent div#contentArea,.UFIContainer,.shareRedesign').css('width', '100%');
$('span:contains( · Suggested Page)').parents('.uiStreamStory').remove();
$('#pagelet_pymk_timeline,#rightCol').remove();