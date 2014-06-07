// ==UserScript==
// @name       FactChecking button
// @namespace  http://ahref.github.com/
// @version    0.1.3
// @description  Insert the FC button on known sites.
// @match      http://*.corriere.it/*
// @copyright  2012+, AhrefDev
//
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// ==/UserScript==

function button (width) {
    var button = $('<a>').attr('href', 'http://factchecking.civiclinks.it/push/');
    button.append($('<img>').attr('src', 'http://placehold.it/' + width +'x40'));
    
    return button;
}

$(function(){
    $('#share-article-box').after(button(200));
    $('.main-blog .quote_text').append(button(120));
});