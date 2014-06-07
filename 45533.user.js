// ==UserScript==
// @name           What's the weather - less forecasts
// @namespace      maeki.org
// @description    Only display 3 temperatures in the forecast
// @include        http://whatstheweather.net/*
// ==/UserScript==

var allTemps = document.getElementById('more-temps');
var re = /(<strong>.*<\/sup>[^<]+)/g;
allTemps.innerHTML = allTemps.innerHTML.match(re)[0]+allTemps.innerHTML.match(re)[1]+allTemps.innerHTML.match(re)[2];
