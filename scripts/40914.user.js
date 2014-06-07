// ==UserScript==
// @name           Wrzuta.pl Downloader!
// @namespace      simplygood
// @author         Jakub Warmuz
// @description    Download audio and video files from http://wrzuta.pl!
// @include        http://*.wrzuta.pl/audio/*
// @include        http://*.wrzuta.pl/film/*
// ==/UserScript==
//
// Great thanks for the authors of those scripts:
//	http://userscripts.org/scripts/show/12225
//	http://userscripts.org/scripts/show/46603
//

var playerDiv = document.getElementById('file_info_media');
var flashvars = playerDiv.getElementsByTagName('script')[0].innerHTML;

var fileKey = flashvars.match(/file_key'\s*:\s*'([^']+)/)[1];
var login = flashvars.match(/login'\s*:\s*'([^']+)/)[1];
var title = flashvars.match(/tt'\s*:\s*'([^']+)/)[1];

if (document.location.toString().match('audio')) {
    var baseURL =  'http://' + login + '.wrzuta.pl/sr/f/';
    var ext = 'mp3';
} else {
    var baseURL =  'http://' + login + '.wrzuta.pl/sr/v/';
    var ext = 'flv';
}

var fileURL = baseURL + fileKey + '/' + title + '.' + ext;

var place = document.getElementById('file_info').getElementsByTagName('h2')[0];
place.innerHTML = place.innerHTML + ' <a href="' + fileURL + '"  style="color: #ED0080">(DOWNLOAD)</a>';
