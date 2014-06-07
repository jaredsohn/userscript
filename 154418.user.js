// ==UserScript==
// @name       Usable Youtube 1.0
// @namespace  http://www.youtube.com/
// @version    1.0
// @description  Only 2 tiny thing
// @match      http://www.youtube.com/*
// @copyright  2012+, Sziráki Gábor
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// ==/UserScript==
$("#logo-container").attr('href','http://www.youtube.com/feed/subscriptions/u');
$(".branded-page-related-channels").remove();