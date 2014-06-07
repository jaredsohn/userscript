// ==UserScript==
// @name           Freesound Direct Mp3/Ogg Links
// @namespace      Freesound
// @description    Adds direct Mp3 and Ogg audio file download links on freesound.org
// @include        http://www.freesound.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @author         drhouse
// @version        1.0.1
// ==/UserScript==

$(document).ready(function () {
    
    var mod = $('.ogg_file').attr('href');
    var mod2 = $('.mp3_file').attr('href');
    var link = '<br><a href="'+mod2+'">Direct Mp3 Link</a><br><a href="'+mod+'">Direct Ogg Link</a>';
    var title = '#single_sample_header > a';
    $(title).append(link);
    
});
