// ==UserScript==
// @name          Autotask Helvetica Neue Font
// @description   Changes overall font family from Tahoma to Helvetica Neue
// @version       0.1
// @homepage      https://userscripts.org/scripts/show/176413
// @downloadURL   https://userscripts.org/scripts/source/176413.user.js
// @installURL    https://userscripts.org/scripts/source/176413.user.js
// @updateURL     https://userscripts.org/scripts/source/176413.meta.js
// @date          2013-08-24
// @author        dstotijn
// @contact       dstotijn@gmail.com
// @license       MIT License http://nrm.mit-license.org/2012
// @include       https://*.autotask.net/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js

// ==/UserScript==

$('body').css('font-family', 'Helvetica Neue, sans-serif');
$('a').css('font-family', 'Helvetica Neue, sans-serif');
$('.txtBlack8Class').css('font-family', 'Helvetica Neue, sans-serif');
$('.lblNormalClass').css('font-family', 'Helvetica Neue, sans-serif');

$('body').css('text-rendering', 'optimizelegibility');