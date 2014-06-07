// ==UserScript==
// @name           BartekJot Audio Wrzuta Download (updated 24.11.2008)
// @namespace      Empty
// @description    This Script allows you to download Audio files from http://wrzuta.pl site. Updated 24.11.2008 by me_
// @include        http://*.wrzuta.pl/audio/*
// @include        http://wrzuta.pl/audio/*
// ==/UserScript==

var DownloadUrl =  'http://wrzuta.pl/aud/file/';
var playerDiv = document.getElementById('file_info_media').getElementsByTagName('embed')[0];
var flashvars = document.evaluate("attribute:: src", playerDiv, null, XPathResult.STRING_TYPE, null).stringValue;
var tt        = flashvars.match(/tt=([^(\&|$)]*)/)[1];
var file_key  = flashvars.match(/file_key=([^(\&|$)]*)/)[1];
var Audio_URL = DownloadUrl + file_key + '/' + tt + '.mp3';
var place = document.getElementById('file_info_media');
var logo = document.createElement("div");
logo.innerHTML = '<div style="margin: 0 auto 0 auto">' +
    '<a href="'+Audio_URL+'" target="_BLANK">' +
    '<b>&raquo;&nbsp;POBIERZ PLIK!&nbsp;&laquo;</b>'+
    '</a></div><br />';

place.appendChild(logo);