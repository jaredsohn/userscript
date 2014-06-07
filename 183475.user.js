// ==UserScript==
// @name       SVAR Image Viewer Skin
// @namespace  https://github.com/jonasth
// @version    0.1
// @description  SVAR image viewer skin
// @match      *://sok.riksarkivet.se/bildvisning/*
// @match      *://sok.riksarkivet.se/BildVisning/*
// @copyright  2013+, jonasth
// ==/UserScript==

$('#navigering .pagination-images ul li a')
    .css('background-color', 'lightgrey')
    .mouseenter(function() { $(this).css('background-color', 'white'); })
    .mouseleave(function() { $(this).css('background-color', 'lightgrey'); });

var $header = $('<div>')
    .append($('#navigering').detach());

var $content = $('<div>')
    .css('height', $('#ctrlDjvu').get(0).style.height)
    .append($('<embed/>', {
        width: '100%',
        height: '100%',
        src: $('#ctrlDjvu embed').get(0).src.replace('zoom=page', 'zoom=stretch'),
        type: 'image/x.djvu'
    }));

var $footer = $('<div>')
    .append($('#kalla').detach())
    .css('margin-top', '50px')
    .css('color', 'black');

$('body')
    .empty()
    .append($header, $content, $footer)
    .css('background-color', 'darkgrey');
