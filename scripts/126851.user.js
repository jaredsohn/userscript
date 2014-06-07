// ==UserScript==
// @name           Google Hide Install Google Chrome
// @version        1.7
// @author         ohmayk
// @description    Hide Install Google Chrome on Google page
// @include        https://encrypted.google.com/*
// @include        https://encrypted.google.com.*
// @include        https://www.google.com/*
// @include        https://www.google*
// @include        https://*.google.*
// @include        http*://*.google.*/*

// @include        http://*.google.*/*
// @include        http://*.google.*
// @include        http://www.google.com/*
// @include        http://www.google.*
// @exclude        http://www.google.com/reader/*
// @exclude        https://www.google.com/reader/*
// @run-at         document-end
// @grant          none
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// ==/UserScript==

// Selector #pushdown #prt #pmocntr2 #pushdown body

$('#pmocntr2').css('display', 'none');
$('#prt').css('display', 'none');
$('#pushdown').css('display', 'none');
$('.pmoabs').css('display', 'none');

$(window).load(function() {
    jQuery.fn.exists = function(){return this.length>0;}

    if ($('#pushdown').exists()) {
        $('#pushdown').css('display', 'none');
    }
});

// For Test Purpose
//$('body').css('background-color', 'grey');