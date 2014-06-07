// ==UserScript==
// @name        E-Hentai Show Filenames
// @namespace   95.211.209.53-e85f8079-b847-455f-b080-8467e2977711@sanitysama
// @include     http://exhentai.org/g/*/*/*
// @include     http://g.e-hentai.org/g/*/*/*
// @description Shows filenames under images in galleries
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @version     1.1
// ==/UserScript==

$(document).ready(function() {

    $('.gdtl').attr('style','height: 327px');
    $('.gdtl a').attr('style','word-wrap: break-word').each(function() {
        var fn = $(this).find('img').map(function() {
            return this.title;
        }).get();
        $(this).append(' - ' + fn);
    });

});