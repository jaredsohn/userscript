// ==UserScript==
// @name          Disable font smoothing
// @description   Script that disables font smoothing in WebKit browsers.
// @version       0.1
// @date          2013-10-14
// @author        tombuutkamp
// @contact       tombuutkamp@gmail.com
// @include       *
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js

// ==/UserScript==

$('html').css('font-family','sans-serif, Helvetica');
$('html').css('-webkit-font-smoothing', 'none');
$('html').css('text-rendering', 'optimizeSpeed');
$('input[type="text"]').css('-webkit-font-smoothing','none');
$('button').css('-webkit-font-smoothing','none');
$('input').css('-webkit-font-smoothing','none');