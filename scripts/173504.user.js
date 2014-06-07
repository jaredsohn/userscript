// ==UserScript==
// @name        Nhaccuatui Playlist Downloader
// @namespace   com.thanhquanky
// @description Help download from nhaccuatui with Downthemall
// @version     1
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);
console.log("Author: Thanh Ky Quan");
var apiUrl = 'http://m.nhaccuatui.com/flash/xml?listkey=' 
    + document.location.href.split('.')[3]
    + '&cur=0&as=1';
console.log("Url: " + apiUrl);
$(document.body).append('<div id="download_links" style="display: none"></div>');

var dfd = $.Deferred();
$.get(apiUrl)
.done(function(data) {
    var songs = [];
    $(data).find('track').each(function() {
        var track = $(this);
        var song = {
            title: $(track.children()[0]).text().trim(),
            url: $(track.children()[1]).text().trim()
        };
        songs.push(song);
    });
    dfd.resolve(songs);
});
dfd.done(function(songs) {
    var allLinks = '';
    $.each(songs, function(index, song) {
        $('#download_links').append($('<a></a>').attr('href', song.url).text(song.title))   ;
    });
});

