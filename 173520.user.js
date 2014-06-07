// ==UserScript==
// @name           Incremental URL
// @include        http://www.kaskus.co.id/*
// ==/UserScript==

var url = 'http://www.kaskus.co.id/profile/beafriend/1159',
    start = '1159',
    prepend = '0',
    limit = 10,
    timeout = 100*12,

    regex = new RegExp('^' + url + '(' + prepend + (limit-1) + start + '$');
    matches = window.location.href.match(regex);


if(matches) {
    setTimeout(function() {
    	window.location.href = url + prepend + matches[1] + start;
    }, timeout);
}