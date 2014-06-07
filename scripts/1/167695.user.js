// ==UserScript==
// @name        Cleaner OuedKniss
// @namespace   http://stackoverflow.com/users/162671/
// @description Cleaner OuedKniss.com
// @include     http://www.ouedkniss.com/fr/annonces/details/*
// @version     1.1
// @date        2013-05-17
// @grant       none
// ==/UserScript==

function makeBetter() {
    $('body').css('background','white');
    $('#page_left').remove();
    $('#header').remove();
    $('#bottom').remove();
    $('#page_right').css('float','none');
    $('#page_right').css('width','860px');
    $('#page_right').css('margin-left','auto');
    $('#page_right').css('margin-right','auto');
}

window.addEventListener('load', makeBetter, true);