// ==UserScript==
// @name       eRepublik Hider
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Hide some unwanted things on eRepublik.
// @match          http://*.erepublik.com/*
// @include        http://*.erepublik.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @copyright  PoopZemli
// ==/UserScript==

$(".facebook_like").css("display","none");
$(".area.training_grounds > img").css("display","none");