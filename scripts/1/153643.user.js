// ==UserScript==
// @name       Center new YouTube
// @namespace  http://www.chrisbradbury.net
// @version    0.1
// @description  centers the new youtube design on the page
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @match      http*://*.youtube.com/*
// @copyright  2012+, You
// ==/UserScript==

$('#body-container').css('text-align','center');
$('#page-container').css('text-align','left').css('display','inline-block');
$('#yt-masthead-container').css('text-align','left').css('display','inline-block');