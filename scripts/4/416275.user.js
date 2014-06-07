// ==UserScript==
// @name           Autoblog.nl cleaner
// @namespace      http://userscripts.org/users/609007
// @include        http://www.autoblog.nl/*
// @grant          none
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// ==/UserScript==

var url = location.href;
var split = url.split('/');

if(split[3] == "nieuws") {
    // doe niets met 't artikel, nieuwsitem
} else {
    $('article').first().remove();
    $('.advertisement').remove();
}

$('#right').remove();