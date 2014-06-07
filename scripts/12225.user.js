// ==UserScript==
// @name           Wrzuta.pl Audio Downloader v1
// @namespace      Empty
// @description    This Script allow you to download Audio file from wrzuta.pl site.
// @include        http://*.wrzuta.pl/audio/*
// ==/UserScript==

var DownloadUrl =  'http://wrzuta.pl/aud/file/';
var playerDiv = document.getElementById('wrzuta_plik')
var flashvars = document.evaluate("attribute:: src", playerDiv, null, XPathResult.STRING_TYPE, 

null).stringValue;
var tt        = flashvars.match(/tt=([^(\&|$)]*)/)[1];
var file_key  = flashvars.match(/file_key=([^(\&|$)]*)/)[1];
var Audio_URL = DownloadUrl + file_key + '/' + tt;

var place = document.getElementById('file_info_media');

var logo = document.createElement("div");
logo.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #ffffff; margin-bottom: 5px; ' +
    'font-size: small; background-color: #ffffff; ' +
    'color: #000000;"><p style="margin: 2px 0 1px 0;"> ' +
    '<a href="'+Audio_URL+'" target="new" >>> &#346;ci&#261;gnij plik <<</a>'+
    '</p></div>';
place.appendChild(logo);