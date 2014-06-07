// ==UserScript==
// @name            Hide Gmail Right Side Ads
// @namespace       none
// @description     Modified Hide Gmail Right Side Ads, also removes the 'about these links' bit.
// @include         http://mail.google.tld/*
// @include         https://mail.google.tld/*
// ==/UserScript==

(function() { var style = document.createElement('style'); style.setAttribute('id', 'ra'); document.getElementsByTagName('head')[0].appendChild(style); document.getElementById('ra').sheet.insertRule('#ra {display:none}', 0);})();

(function() { var style = document.createElement('style'); style.setAttribute('id', 'rb'); document.getElementsByTagName('head')[0].appendChild(style); document.getElementById('rb').sheet.insertRule('#rb {display:none}', 0);})();