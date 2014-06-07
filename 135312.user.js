// ==UserScript==
// @name           8tracks Cleaner
// @namespace      8tracks
// @version        2
// @description    Cleans 8tracks from usless adds
// @include        http://8tracks.com/*
// @include        https://8tracks.com/*
// @include        http://www.8tracks.com/*
// @include        https://www.8tracks.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

var removables = ['#headerboard', '#sidebar_ad_wrapper', '#iphone_promo_form', '#eighttracks_message'];
$(document).ready(function(){
    var i=0;
    var length = removables.length;
    for(;i<length; i++){
    	$(removables[i]).remove();
    }
});
