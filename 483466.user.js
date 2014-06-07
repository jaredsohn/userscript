// ==UserScript==
// @name         Tweak Skunk
// @version      0.2
// @description  Add iHealth button, Modify the width of displayed content
// @exclude      https://tron.es.f5net.com/sr/dashboard/
// @exclude      https://tron.es.f5net.com/sr/
// @match        https://tron.es.f5net.com/sr/*
// @author       Migara Ekanayake
// ==/UserScript==

$(document).ready(function() {

    $('.navbar-left').append('<a href="'+$("a#button-sr-details-ihealth").attr("href")+'" id="cust_ihealth_btn" role="button" class="xpull-right btn btn-sm btn-default">iHealth</a>');
    
    $('#cust_ihealth_btn').attr('target','_blank');
    $('.container').width('65%');
    $('#comment').css('resize', '');
   
});