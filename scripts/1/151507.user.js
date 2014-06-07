// ==UserScript==
// @name       MWO Forums cleanup
// @version    0.1
// @description  Fixing it according to my preferences
// @match      http://*mwomercs.com/forums/*
// @copyright  2012+, TetsuBo
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==
$(document).ready(function(){
    $("#stubPage .container").css( 'width', '1400px' );
    $(".group_icon").hide();
});