// ==UserScript==
// @name           astrology
// @description    nothing
// @include        http://*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.js
// ==/UserScript==

$(document).ready(function(){
    omniture_tracking_elements = $('a.m-omniture_tracking');
    tracking_code_elements = $('.m-tracking_code');
    omniture_tracking_elements.each(function() {
        $(this).append("<div style=' color: rgb(0, 0, 0); background: none repeat scroll 0% 0% rgb(255, 255, 255); font-weight: normal; font-size: 9px; width: auto;'>"+ $(this).attr('name') +"</div>" )
        });
    tracking_code_elements.each(function() {
        $(this).append("<div style=' color: rgb(0, 0, 0); background: none repeat scroll 0% 0% rgb(255, 255, 255); font-weight: normal; font-size: 9px; width: auto;'>"+ $(this).attr('name') +"</div>" )
        });
});