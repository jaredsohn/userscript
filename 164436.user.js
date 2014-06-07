// ==UserScript==
//
//Displayable Name of your script 
// @name           Shinden Fix 
//
// brief description
// @description    Fix Shinden Player with AdBlock  
//
//Version Number
// @version        1.0
//
// Urls process this user script on
// @include        http://www.anime-shinden.info/*
//
// Add any library dependencies here, so they are loaded before your script is loaded.
//
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
//
// @history        1.0 first version
//
// ==/UserScript==
$('.tabNavigation li a').click(function(){
$('.video_tabs').hide();
$($(this).attr('href')).toggle();
return false;
});