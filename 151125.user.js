// ==UserScript==
// @name				MangaFox Plugin
// @author				EulerIntegral
// @version				0.1
// @namespace			http://userscripts.org/scripts/show/151125
// @description			Preload MangaFox
// @match				http://mangafox.me/manga/*
// @require				http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==


// Get from JS the page details.
var manga_details = $('#body script').filter(':contains("current_page")').text();
// Make it functional latter
var series_code     = manga_details.match(/series_code="(.+)";/    )[1];
var current_chapter = manga_details.match(/current_chapter="(.+)";/)[1];
var current_page    = parseInt(manga_details.match(/current_page=(.+);/)[1], 10);
var total_pages     = parseInt(manga_details.match(/total_pages=(.+);/ )[1], 10);

var series_url = '/manga/' + series_code;

if (current_page < total_pages ) {
    for (var n_chap = current_page + 1; n_chap <= total_pages; n_chap++) {
        var last_image = $('#viewer img').eq(-1).parent();
        
        // Create a new element to put the image and fetch it
        //// When you click a image, it goes to the page of that image, so you can bookmark where you stoped.
        var new_image = $('<a>').attr('href', n_chap + '.html').append('<img>');
        var new_image_url = series_url + '/' + current_chapter + '/' + n_chap + '.html';
        new_image.load(new_image_url + '#viewer img:first');
        last_image.after(new_image);
    }
}