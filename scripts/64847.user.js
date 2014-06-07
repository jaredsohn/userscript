// ==UserScript==
// @name           Wrzuta HTML5-ifier
// @author         look997
// @description    Zamienia domyślny odtwarzacz audio(we Flash-u) wrzuty na tag audio HTML5.
// @version        1.0
// @license        MIT License
// @resource       metadata http://userscripts.org/scripts/source/64847.meta.js
// @include        http://*.wrzuta.pl/audio/*
// ==/UserScript==

var adresURL = window.location.href;

finalURL = adresURL.replace('wrzuta.pl/audio', 'wrzuta.pl/sr/f');

var FIM = document.getElementById("file_info_media");

FIM.innerHTML = "<br><audio src='"+finalURL+".mp3' controls='controls'>Your browser does not support audio tag</audio><br>";