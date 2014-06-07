// ==UserScript==
// @name        9gag socially clean
// @namespace   http://userscripts.org/users/541882
// @include     http://9gag.com/*
// @include     https://9gag.com/*
// @version     2
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.js
// ==/UserScript==

$('.sticky-social').css('display', 'none');
$('.post-afterbar-a').css('display', 'none');
    
$(document).on( 'mouseover', 'article', function() {
    $('.sticky-social').css('display', 'none');
    $('.post-afterbar-a').css('display', 'none');
});