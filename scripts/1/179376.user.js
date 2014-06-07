// ==UserScript==
// @id             sparkless
// @name           Sparkless
// @version        1.2
// @namespace      https://github.com/stephenmac7
// @author         Stephen McIntosh
// @description    Removes distractions from SparkNotes
// @include        http://www.sparknotes.com/*
// @run-at         document-end
// @require        http://mml.stephenmac.com/static/js/jquery-latest.js
// ==/UserScript==

$(document).ready(function(){
    $('#leftAd').remove();
    $('div.top-ad').remove();
    $('div.floatingad').remove();
    $('iframe').remove();
    $('ins').remove();
    $('div.lit-guides-social').remove();
    $('div.blog-feature').remove();
    $('div.col-mid').css('width', '926px');
    $('div.next-title').css('width', '86%');
});