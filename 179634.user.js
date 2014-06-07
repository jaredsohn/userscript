// ==UserScript==
// @name        JoggerFilter
// @namespace   http://userscripts.org
// @description Filtr do strony głównej jogger.pl
// @include     http://www.jogger.pl/*
// @version     1
// @grant       none
// ==/UserScript==

var blockedUsers = [

];

$(document).ready(function() {
    // wpisy
    $('.entry').each(function() {
        var currentAuthor = $(this).find('.header p a').text();
        if($.inArray(currentAuthor, blockedUsers) != -1)
            $(this).remove();
    });
    
    // najczęściej odwiedzane
    $('table[summary=\'Pięć najpopularniejszych (względem odsłon) wpisów na Jogger.pl w ciągu ostatniej doby\'] tbody tr').each(function() {
        var currentAuthor = $(this).find('.author a').text();
        if($.inArray(currentAuthor, blockedUsers) != -1)
            $(this).remove();
    });
    
    // najczęściej komentowane
    $('table[summary=\'Pięć najpopularniejszych (względem komentarzy) wpisów na Jogger.pl w ciągu ostatnich dwóch dni\'] tbody tr').each(function() {
        var currentAuthor = $(this).find('.author a').text();
        if($.inArray(currentAuthor, blockedUsers) != -1)
            $(this).remove();
    });
});
