// ==UserScript==
// @name       SMF Forums cleanup
// @version    0.1
// @description  Fixing it according to my preferences
// @match      http://*the-bwc.com/smf/*
// @copyright  2012+, TetsuBo
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==
$(document).ready(function(){
    $(".smalltext img[src*=ranks]").css( 'width', '40px' );
    $(".smalltext img.avatar").css("max-height", "60px" ).css("max-width", "50px");
    $("td[width*=16]").css("width", "5%");
});