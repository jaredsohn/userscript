// ==UserScript==
// @name           Youtube Hide Top Bar
// @version        2.1
// @author         ohmayk
// @description    Hide Top Bar in Youtube
// @include        https://www.youtube.com/*
// @include        https://www.youtube*
// @include        https://*.youtube.*
// @include        http://www.youtube.com/*
// @include        http://www.youtube.*
// @include        http://*.youtube.*
// @exclude        https://www.youtube.com/results*
// @exclude        https://www.youtube.com/
// @run-at         document-end
// @grant          none
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// ==/UserScript==




var ycss = ""+
"<style> " +
"#youtube-hide-button { " +
"position: absolute; " +
"margin: 0.6em; " +
"padding: 0.2em 1.5em; " +
"font-size: 0.7em; " +
"text-transform: uppercase; " +
"border-radius: .3em; " +
"border: 0.1em solid black; " +
"background: #222630; " +
"box-shadow: inset 0 .1em rgba(255,255,255,0.1), 0 .1em .1em black, 0 0.2em rgba(255,255,255,0.1), 0 0 0 .2em rgba(0,0,0,0.1); " +
"color: #f30; " +
"text-shadow: 0 0.1em rgba(255,255,255,0.1), 0 -0.1em rgba(0,0,0,0.2); " +
"top: 50px; " +
"left: 0; " +
"cursor: pointer " +
"} " +
"</style> ";

$(ycss).appendTo('head');

$('head').append('<link rel="stylesheet" type="text/css" media="screen" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.css" />');

$('#masthead-positioner').delay(3000).hide( "slow" );

$("#masthead-positioner-height-offset").delay(3005).css("display", "none");

$('body').after('<button id="youtube-hide-button" type="button"> <i class="fa fa-eye"></i> </button>');

$( "#youtube-hide-button" ).click(function() {
    $( "#masthead-positioner" ).toggle( "slow" );
});